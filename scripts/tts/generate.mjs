// Audio del curso con Gemini TTS (docs/language/tts-voices.json es la fuente de verdad de las voces).
//
//   npm run tts:generate -- --dry-run        → plan: frases, peticiones y días, sin llamar a la API
//   npm run tts:generate                     → genera hasta agotar la cuota diaria y se detiene
//   npm run tts:generate -- --max 3          → como mucho 3 peticiones en esta ejecución
//   npm run tts:generate -- --unit 3         → solo la unidad 3
//   npm run tts:generate -- --retry          → vuelve a intentar los lotes que no se pudieron cortar
//   npm run tts:generate -- --sample narrator → solo la frase de prueba de ese hablante, en audio-src/pruebas-voces/
//
// Una petición por unidad y hablante: las frases van seguidas y el audio se corta por los
// silencios. Si el número de trozos no coincide con el de frases, el lote queda marcado para
// revisar y no se guarda ninguna frase suelta. El avance se guarda en audio-src/manifest.json,
// así que cada día se sigue donde se dejó. La clave se lee de GEMINI_API_KEY y nunca se imprime.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { splitBySilence, wav } from './audio.mjs';

const CONFIG = 'docs/language/tts-voices.json';
const UNITS = 'src/content/units';
const OUT = 'audio-src/unidades';
const MANIFEST = 'audio-src/manifest.json';

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const value = (name) => (args.indexOf(`--${name}`) > -1 ? args[args.indexOf(`--${name}`) + 1] : undefined);
const DRY = flag('dry-run');
const ONLY_UNIT = value('unit') ? Number(value('unit')) : undefined;
const MAX_RUN = value('max') ? Number(value('max')) : Infinity;
const SAMPLE = value('sample');

const config = JSON.parse(readFileSync(CONFIG, 'utf8'));
const usable = (key) => {
  const s = config.speakers[key];
  return s && s.voice && (s.status === 'aprobada' || s.status === 'propuesta');
};

// ── Unidades y hablantes ────────────────────────────────────────────────
const norm = (s) => s.replace(/[«»"“”]/g, '').replace(/\s+/g, ' ').trim();
function loadUnits() {
  const units = [];
  for (const level of readdirSync(UNITS)) {
    for (const name of readdirSync(join(UNITS, level))) {
      const text = readFileSync(join(UNITS, level, name), 'utf8').replace(/\r\n/g, '\n');
      const unit = Number(text.match(/^unit: (\d+)/m)?.[1]);
      const block = text.match(/^audio:\n((?:  - .*\n)+)/m);
      if (!unit || !block) continue;
      const sentences = block[1].trimEnd().split('\n').map((l) => JSON.parse(l.replace(/^\s*- /, '').trim().replace(/^(?!")(.*)$/, '"$1"')));
      const body = text.split('\n---\n').slice(1).join('\n');
      const dialogue = [...body.matchAll(/^- ([A-ZÁÉÍÓÚ][\wáéíóúñ ]*?): (.+)$/gm)].map((m) => [m[1], norm(m[2].replace(/（.*$/, ''))]);
      units.push({ unit, level, slug: name.replace(/\.mdx$/, ''), sentences, dialogue });
    }
  }
  return units.sort((a, b) => a.unit - b.unit);
}
const LEARNERS = new Set(['mina', 'kenta', 'yui']);
function speakerFor(u, index, sentence) {
  const override = config.overrides[`${u.unit}:${index}`];
  if (override) return override;
  const s = norm(sentence);
  const hit = u.dialogue.find(([, line]) => line.includes(s) || s.includes(line));
  const key = (hit && config.roles[hit[0]]) || 'narrator';
  // Las palabras sueltas y expresiones de 1-2 palabras son modelos de pronunciación: nunca las
  // leen los personajes japoneses (con acento), aunque aparezcan dentro de una de sus frases.
  if (LEARNERS.has(key) && s.split(/\s+/).filter(Boolean).length < 3) return 'narrator';
  return key;
}

// ── Manifiesto ──────────────────────────────────────────────────────────
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : { days: {}, items: {} };
const saveManifest = () => {
  mkdirSync('audio-src', { recursive: true });
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
};
// El día de la cuota de Gemini termina a medianoche de la hora del Pacífico.
const quotaDay = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());
const usedToday = () => manifest.days[quotaDay()] ?? 0;
const hashOf = (speakerKey, text) => {
  const s = config.speakers[speakerKey];
  return createHash('sha1').update([config.model, config.temperature, config.promptTemplate.text, s.voice, s.profile, text].join('\u0000')).digest('hex').slice(0, 16);
};

// ── Lotes: una petición por unidad y hablante ───────────────────────────
const units = loadUnits().filter((u) => !ONLY_UNIT || u.unit === ONLY_UNIT);
const jobs = [];
const blocked = new Map();
for (const u of units) {
  const groups = new Map();
  u.sentences.forEach((text, index) => {
    const key = speakerFor(u, index, text);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ index, text });
  });
  for (const [speaker, items] of groups) {
    if (!usable(speaker)) {
      blocked.set(speaker, (blocked.get(speaker) ?? 0) + items.length);
      continue;
    }
    // Pendiente: sin generar o con voz, perfil o texto cambiados. Los lotes que no se pudieron
    // cortar solo se repiten con --retry, para no gastar la cuota cada día en el mismo error.
    const pending = items.filter(({ index, text }) => {
      const item = manifest.items[`${u.unit}:${index}`];
      return !item || item.hash !== hashOf(speaker, text) || (item.status === 'revisar-corte' && flag('retry'));
    });
    if (pending.length) jobs.push({ u, speaker, items });
  }
}

const daily = config.quota.maxRequestsPerDay - config.quota.reservePerDay;
console.log(`Unidades: ${units.length} · lotes pendientes: ${jobs.length} · frases pendientes: ${jobs.reduce((n, j) => n + j.items.length, 0)}`);
if (blocked.size) console.log(`Sin voz aprobada (no se generan todavía): ${[...blocked].map(([k, n]) => `${k} (${n})`).join(', ')}`);
console.log(`Cuota: ${usedToday()} de ${daily} peticiones usadas hoy (día del Pacífico ${quotaDay()}) · días estimados: ${Math.ceil(jobs.length / daily)}`);
if (DRY) {
  for (const j of jobs.slice(0, 12)) console.log(`  u${String(j.u.unit).padStart(2, '0')} ${j.speaker.padEnd(13)} ${j.items.length} frases`);
  if (jobs.length > 12) console.log(`  … y ${jobs.length - 12} lotes más`);
  process.exit(0);
}

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error('Falta la variable de entorno GEMINI_API_KEY.');
  process.exit(1);
}
if (config.promptTemplate.status !== 'confirmada') {
  console.error('La plantilla del prompt no está confirmada con el «Get code» de AI Studio (docs/language/tts-voices.json → promptTemplate).');
  process.exit(1);
}

// ── API ─────────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let lastRequest = 0;
async function synthesize(speakerKey, transcript) {
  const s = config.speakers[speakerKey];
  const text = config.promptTemplate.text.replace('{profile}', s.profile).replace('{transcript}', transcript);
  const body = {
    contents: [{ role: 'user', parts: [{ text }] }],
    generationConfig: {
      temperature: config.temperature,
      responseModalities: ['AUDIO'],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: s.voice } } },
    },
  };
  for (let attempt = 1; attempt <= 4; attempt++) {
    const wait = lastRequest + config.quota.minIntervalSeconds * 1000 - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequest = Date.now();
    manifest.days[quotaDay()] = usedToday() + 1;
    saveManifest();
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data = await res.json();
      const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
      if (!part) throw new Error('La respuesta no trae audio.');
      const rate = Number(part.inlineData.mimeType.match(/rate=(\d+)/)?.[1] ?? config.output.sampleRate);
      return { pcm: Buffer.from(part.inlineData.data, 'base64'), rate };
    }
    const detail = await res.text();
    if (res.status === 429) {
      const daily = /PerDay|per day|daily/i.test(detail);
      throw Object.assign(new Error(`Aviso de cuota (429${daily ? ', diaria' : ''}): el proceso se detiene. Revisa la cuota en AI Studio antes de seguir.`), { quota: true });
    }
    if (res.status >= 500) {
      console.log(`  ${res.status}: reintento ${attempt} de 3 dentro de ${attempt * 30} s`);
      await sleep(attempt * 30_000);
      continue;
    }
    throw new Error(`Error ${res.status}: ${detail.slice(0, 300)}`);
  }
  throw new Error('Demasiados reintentos.');
}

// ── Muestra de un hablante (no entra en el curso ni en el manifiesto de frases) ──
if (SAMPLE) {
  const s = config.speakers[SAMPLE];
  if (!s?.voice || !s.testSentence) {
    console.error(`El hablante «${SAMPLE}» no tiene voz o frase de prueba en ${CONFIG}.`);
    process.exit(1);
  }
  if (usedToday() >= config.quota.maxRequestsPerDay) {
    console.error('La cuota de hoy ya está agotada.');
    process.exit(1);
  }
  try {
    const audio = await synthesize(SAMPLE, s.testSentence);
    mkdirSync('audio-src/pruebas-voces', { recursive: true });
    const file = `audio-src/pruebas-voces/${SAMPLE}-${s.voice.toLowerCase()}.wav`;
    writeFileSync(file, wav(audio.pcm, audio.rate));
    console.log(`Muestra guardada: ${file} (${(audio.pcm.length / 2 / audio.rate).toFixed(1)} s, voz ${s.voice}).`);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
  console.log(`Peticiones usadas hoy: ${usedToday()}.`);
  process.exit(0);
}

// ── Ejecución ───────────────────────────────────────────────────────────
let done = 0;
for (const job of jobs) {
  if (done >= MAX_RUN || usedToday() >= daily) {
    console.log('Fin de la tanda de hoy: se sigue en la próxima ejecución.');
    break;
  }
  const id = `u${String(job.u.unit).padStart(2, '0')}`;
  const dir = join(OUT, job.u.level, id);
  mkdirSync(dir, { recursive: true });
  console.log(`${id} ${job.speaker}: ${job.items.length} frases`);
  let audio;
  try {
    audio = await synthesize(job.speaker, job.items.map((i) => i.text).join('\n\n'));
  } catch (e) {
    console.error(`  ${e.message}`);
    if (e.quota) break;
    continue;
  }
  done++;
  writeFileSync(join(dir, `_lote-${job.speaker}.wav`), wav(audio.pcm, audio.rate));
  const pieces = splitBySilence(audio.pcm, audio.rate, job.items.length);
  job.items.forEach(({ index, text }, k) => {
    const file = join(dir, `${id}-${String(index + 1).padStart(2, '0')}-${job.speaker}.wav`);
    const ok = pieces && pieces[k];
    if (ok) writeFileSync(file, wav(pieces[k], audio.rate));
    manifest.items[`${job.u.unit}:${index}`] = {
      unit: job.u.unit, index, text, speaker: job.speaker, voice: config.speakers[job.speaker].voice,
      hash: hashOf(job.speaker, text), file: ok ? file.replaceAll('\\', '/') : null,
      seconds: ok ? +(pieces[k].length / 2 / audio.rate).toFixed(2) : null,
      status: ok ? 'ok' : 'revisar-corte', review: 'pendiente', generatedAt: new Date().toISOString(),
    };
  });
  if (!pieces) console.log('  No se pudo cortar en frases: lote marcado como «revisar-corte».');
  saveManifest();
}
console.log(`Peticiones usadas hoy: ${usedToday()} de ${daily}.`);
