// Audio de la prueba auditiva (聴解) de los simulacros DELE: docs/language/simulacros-audio.json.
//
//   node scripts/tts/exam.mjs --dry-run      → comprueba que cada texto está en su unidad y muestra el plan
//   node scripts/tts/exam.mjs                → genera los WAV que falten en audio-src/simulacros/
//   node scripts/tts/exam.mjs --track u12-1  → vuelve a generar solo esa pista
//   node scripts/tts/exam.mjs --encode       → tras la aprobación de David: MP3 en public/audio/units/uNN/
//                                              y src/data/exam-audio.json (lo lee ExamAudio.astro)
//
// Usa las voces de docs/language/tts-voices.json y la misma cuota y cuenta de gasto que el curso
// (scripts/tts/billing.mjs). La clave se lee de GEMINI_API_KEY y nunca se imprime.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { wav } from './audio.mjs';
import { createPacer, estimateTokens, isBillingError, overBudget, recordSpend, spentJpy, usageOf, yen } from './billing.mjs';

const TRACKS = 'docs/language/simulacros-audio.json';
const OUT = 'audio-src/simulacros';
const MANIFEST = 'audio-src/manifest.json';
const PUBLIC = 'public/audio/units';
const DATA = 'src/data/exam-audio.json';

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const value = (n) => (args.indexOf(`--${n}`) > -1 ? args[args.indexOf(`--${n}`) + 1] : undefined);
const ONLY = value('track');

const config = JSON.parse(readFileSync('docs/language/tts-voices.json', 'utf8'));
const { tracks } = JSON.parse(readFileSync(TRACKS, 'utf8'));
const pad = (n) => String(n).padStart(2, '0');
const wavOf = (t) => join(OUT, `${t.id}.wav`);

// ── Comprobación: el texto de cada pista está en la transcripción de su unidad ──
const norm = (s) => s.replace(/[«»"“”]/g, '').replace(/\s+/g, ' ').trim();
const unitText = {};
for (const level of readdirSync('src/content/units')) {
  for (const name of readdirSync(join('src/content/units', level))) {
    const text = readFileSync(join('src/content/units', level, name), 'utf8');
    const unit = Number(text.match(/^unit: (\d+)/m)?.[1]);
    if (unit) unitText[unit] = norm(text);
  }
}
let problems = 0;
for (const t of tracks) {
  for (const [who, line] of t.lines) {
    if (!t.speakers[who]) { console.error(`${t.id}: «${who}» no tiene voz asignada.`); problems++; }
    if (!unitText[t.unit]?.includes(norm(line))) { console.error(`${t.id}: el texto no está en la unidad ${t.unit}: «${line.slice(0, 60)}…»`); problems++; }
  }
  for (const key of Object.values(t.speakers)) if (!config.speakers[key]?.voice) { console.error(`${t.id}: la clave de voz «${key}» no existe.`); problems++; }
  if (Object.keys(t.speakers).length > 2) { console.error(`${t.id}: más de dos voces en una pista.`); problems++; }
}
if (problems) process.exit(1);

// ── Conversión a MP3 (solo tras la aprobación de David) ─────────────────
if (flag('encode')) {
  const data = {};
  for (const t of tracks) {
    if (!existsSync(wavOf(t))) { console.log(`${t.id}: sin WAV, no se publica.`); continue; }
    const dir = join(PUBLIC, `u${pad(t.unit)}`);
    mkdirSync(dir, { recursive: true });
    const file = `u${pad(t.unit)}-auditiva-${t.task}.mp3`;
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', wavOf(t), '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ac', '1', '-ar', '24000', '-c:a', 'libmp3lame', '-b:a', '48k', join(dir, file)]);
    const seconds = +(readFileSync(wavOf(t)).length - 44) / 2 / 24000;
    (data[t.unit] ??= {})[t.task] = { src: `/audio/units/u${pad(t.unit)}/${file}`, seconds: +seconds.toFixed(1) };
    console.log(`${t.id}: ${file} (${seconds.toFixed(1)} s)`);
  }
  writeFileSync(DATA, JSON.stringify(data, null, 2) + '\n');
  console.log(`Escrito ${DATA}.`);
  process.exit(0);
}

// ── Generación ──────────────────────────────────────────────────────────
const manifest = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : { days: {}, items: {} };
const saveManifest = () => writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
const quotaDay = () => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles' }).format(new Date());
const usedToday = () => manifest.days[quotaDay()] ?? 0;
const limit = config.quota.maxRequestsPerDay - config.quota.reservePerDay;

const pending = tracks.filter((t) => (ONLY ? t.id === ONLY : !existsSync(wavOf(t))));
console.log(`Pistas pendientes: ${pending.length} de ${tracks.length} · cuota: ${usedToday()} de ${limit} (día del Pacífico ${quotaDay()}) · gasto estimado: ${yen(spentJpy(manifest))} de ${yen(config.billing.maxSpendJpy)}`);
for (const t of pending) console.log(`  ${t.id.padEnd(6)} ${Object.entries(t.speakers).map(([n, k]) => `${n} (${config.speakers[k].voice})`).join(' + ')}`);
if (flag('dry-run')) process.exit(0);
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error('Falta la variable de entorno GEMINI_API_KEY.'); process.exit(1); }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pacer = createPacer(config.quota);
async function synthesize(t) {
  const names = Object.keys(t.speakers);
  const profile = names.map((n) => `${n}: ${config.speakers[t.speakers[n]].profile}`).join('\n') + `\nDirección de esta escena: ${t.direction}`;
  const transcript = names.length > 1 ? t.lines.map(([s, l]) => `${s}: ${l}`).join('\n') : t.lines.map(([, l]) => l).join('\n\n');
  const text = config.promptTemplate.text.replace('{profile}', profile).replace('{transcript}', transcript);
  const voice = (n) => ({ prebuiltVoiceConfig: { voiceName: config.speakers[t.speakers[n]].voice } });
  const speechConfig = names.length > 1
    ? { multiSpeakerVoiceConfig: { speakerVoiceConfigs: names.map((n) => ({ speaker: n, voiceConfig: voice(n) })) } }
    : { voiceConfig: voice(names[0]) };
  const body = { contents: [{ role: 'user', parts: [{ text }] }], generationConfig: { temperature: config.temperature, responseModalities: ['AUDIO'], speechConfig } };
  for (let attempt = 1; attempt <= 4; attempt++) {
    await pacer.wait(estimateTokens(text));
    manifest.days[quotaDay()] = usedToday() + 1;
    saveManifest();
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${config.model}:generateContent`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY }, body: JSON.stringify(body) });
    if (res.ok) {
      const data = await res.json();
      const part = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
      if (!part) {
        if (attempt < 4) { console.log(`  sin audio (finishReason: ${data.candidates?.[0]?.finishReason ?? '—'}): reintento ${attempt} de 3`); continue; }
        throw new Error('La respuesta no trae audio.');
      }
      const rate = Number(part.inlineData.mimeType.match(/rate=(\d+)/)?.[1] ?? 24000);
      const pcm = Buffer.from(part.inlineData.data, 'base64');
      const usage = usageOf(data, pcm.length / 2 / rate, config.billing);
      pacer.record(usage.input);
      recordSpend(manifest, config.billing, quotaDay(), usage);
      saveManifest();
      return { pcm, rate };
    }
    const detail = await res.text();
    if (res.status === 429) throw Object.assign(new Error('Aviso de cuota (429): el proceso se detiene.'), { quota: true });
    if (isBillingError(res.status, detail)) throw Object.assign(new Error(`Aviso de facturación (${res.status}): el proceso se detiene. Revisa el saldo de prepago en AI Studio.`), { quota: true });
    if (res.status >= 500) { console.log(`  ${res.status}: reintento ${attempt} de 3`); await sleep(attempt * 30_000); continue; }
    throw new Error(`Error ${res.status}: ${detail.slice(0, 300)}`);
  }
  throw new Error('Demasiados reintentos.');
}

mkdirSync(OUT, { recursive: true });
const spentAtStart = spentJpy(manifest);
for (const t of pending) {
  if (usedToday() >= limit) { console.log('Cuota de hoy agotada: se sigue en la próxima ejecución.'); break; }
  if (overBudget(manifest, config.billing)) { console.log(`Tope de gasto: ${yen(spentJpy(manifest))} estimados. El proceso se detiene.`); break; }
  try {
    const audio = await synthesize(t);
    writeFileSync(wavOf(t), wav(audio.pcm, audio.rate));
    console.log(`${t.id}: ok · ${(audio.pcm.length / 2 / audio.rate).toFixed(1)} s`);
  } catch (e) {
    console.error(`${t.id}: ${e.message}`);
    if (e.quota) break;
  }
}
console.log(`Gasto estimado: ${yen(spentJpy(manifest) - spentAtStart)} en esta ejecución · ${yen(spentJpy(manifest))} acumulados de ${yen(config.billing.maxSpendJpy)}.`);
