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
import { createSession, loadVoices, trackProblems } from './gemini.mjs';

const TRACKS = 'docs/language/simulacros-audio.json';
const OUT = 'audio-src/simulacros';
const PUBLIC = 'public/audio/units';
const DATA = 'src/data/exam-audio.json';

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const value = (n) => (args.indexOf(`--${n}`) > -1 ? args[args.indexOf(`--${n}`) + 1] : undefined);
const ONLY = value('track');

const config = loadVoices();
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
  for (const [, line] of t.lines) {
    if (!unitText[t.unit]?.includes(norm(line))) { console.error(`${t.id}: el texto no está en la unidad ${t.unit}: «${line.slice(0, 60)}…»`); problems++; }
  }
  for (const p of trackProblems(t, config)) { console.error(p); problems++; }
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
const session = createSession(config);
const pending = tracks.filter((t) => (ONLY ? t.id === ONLY : !existsSync(wavOf(t))));
console.log(`Pistas pendientes: ${pending.length} de ${tracks.length} · ${session.status()}`);
for (const t of pending) console.log(`  ${t.id.padEnd(6)} ${session.describe(t)}`);
if (flag('dry-run')) process.exit(0);

mkdirSync(OUT, { recursive: true });
for (const t of pending) {
  const stop = session.stopReason();
  if (stop) { console.log(stop); break; }
  try {
    const audio = await session.synthesize(t);
    writeFileSync(wavOf(t), wav(audio.pcm, audio.rate));
    console.log(`${t.id}: ok · ${(audio.pcm.length / 2 / audio.rate).toFixed(1)} s`);
  } catch (e) {
    console.error(`${t.id}: ${e.message}`);
    if (e.quota) break;
  }
}
console.log(session.summary());
