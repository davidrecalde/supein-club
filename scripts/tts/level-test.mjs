// Audio de las preguntas de comprensión auditiva (聴解) del test de nivel: src/data/level-test-audio.json.
//
//   node scripts/tts/level-test.mjs --dry-run      → comprueba las pistas y muestra el plan
//   node scripts/tts/level-test.mjs                → genera los WAV que falten en audio-src/level-test/
//   node scripts/tts/level-test.mjs --track lt-a1-1 → vuelve a generar solo esa pista
//   node scripts/tts/level-test.mjs --encode       → MP3 en public/audio/level-test/ y
//                                                    src/data/level-test-audio-files.json (lo lee el test)
//
// Misma cuota, voces y cuenta de gasto que el curso (scripts/tts/gemini.mjs). Se publica solo a
// velocidad natural. Una pregunta de audio aparece en el test solo cuando su MP3 está publicado.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { wav } from './audio.mjs';
import { createSession, loadVoices, trackProblems } from './gemini.mjs';

const TRACKS = 'src/data/level-test-audio.json';
const TEST = 'src/content/articles/language/learn-spanish/level-test.mdx';
const OUT = 'audio-src/level-test';
const PUBLIC = 'public/audio/level-test';
const DATA = 'src/data/level-test-audio-files.json';

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const value = (n) => (args.indexOf(`--${n}`) > -1 ? args[args.indexOf(`--${n}`) + 1] : undefined);
const ONLY = value('track');

const config = loadVoices();
const { tracks } = JSON.parse(readFileSync(TRACKS, 'utf8'));
const wavOf = (t) => join(OUT, `${t.id}.wav`);

// ── Comprobación: voces válidas y cada pista usada por una sola pregunta del test ──
const used = [...readFileSync(TEST, 'utf8').matchAll(/^\s+audio:\s*([\w-]+)\s*$/gm)].map((m) => m[1]);
let problems = 0;
for (const t of tracks) {
  for (const p of trackProblems(t, config)) { console.error(p); problems++; }
  const n = used.filter((id) => id === t.id).length;
  if (n !== 1) { console.error(`${t.id}: lo usan ${n} preguntas del test (debe ser 1).`); problems++; }
}
for (const id of used) if (!tracks.some((t) => t.id === id)) { console.error(`El test usa la pista «${id}», que no existe en ${TRACKS}.`); problems++; }
if (problems) process.exit(1);

// ── Conversión a MP3 ────────────────────────────────────────────────────
if (flag('encode')) {
  mkdirSync(PUBLIC, { recursive: true });
  const data = {};
  for (const t of tracks) {
    if (!existsSync(wavOf(t))) { console.log(`${t.id}: sin WAV, no se publica.`); continue; }
    const file = `${t.id}.mp3`;
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', wavOf(t), '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ac', '1', '-ar', '24000', '-c:a', 'libmp3lame', '-b:a', '48k', join(PUBLIC, file)]);
    const seconds = (readFileSync(wavOf(t)).length - 44) / 2 / 24000;
    data[t.id] = { src: `/audio/level-test/${file}`, seconds: +seconds.toFixed(1) };
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
for (const t of pending) console.log(`  ${t.id.padEnd(8)} ${session.describe(t)}`);
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
