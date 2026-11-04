// Comprime para la web el audio aprobado del curso (fase 2 del pipeline, tras tts:generate).
//
//   npm run tts:encode -- --approve 2-5   → marca como aprobadas por David las frases de las unidades 2 a 5
//   npm run tts:encode                    → convierte a MP3 todo lo aprobado y actualiza src/data/course-audio.json
//
// Cada frase sale en dos velocidades: natural y lenta (×0,8, sin cambiar el tono), en MP3 mono de
// 48 kbps con el volumen normalizado (-16 LUFS). Solo se publica lo que David ha escuchado y
// aprobado: el reproductor de las unidades lee course-audio.json y nunca muestra una frase sin archivo.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MANIFEST = 'audio-src/manifest.json';
const OUT = 'public/audio/units';
const DATA = 'src/data/course-audio.json';
const SLOW = 0.8;

const args = process.argv.slice(2);
const approveArg = args.indexOf('--approve') > -1 ? args[args.indexOf('--approve') + 1] : undefined;

if (!existsSync(MANIFEST)) {
  console.error(`No se encuentra ${MANIFEST}: primero hay que generar el audio (npm run tts:generate).`);
  process.exit(1);
}
const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const items = Object.values(manifest.items);

// ── Aprobación (David escucha y aprueba por unidades) ───────────────────
if (approveArg) {
  const units = new Set();
  for (const part of approveArg.split(',')) {
    const [a, b] = part.split('-').map(Number);
    for (let n = a; n <= (b || a); n++) units.add(n);
  }
  let count = 0;
  for (const item of items) {
    if (units.has(item.unit) && item.status === 'ok' && item.review !== 'aprobada') {
      item.review = 'aprobada';
      item.reviewedAt = new Date().toISOString();
      count++;
    }
  }
  writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
  console.log(`Aprobadas ${count} frases de las unidades ${[...units].join(', ')}.`);
}

// ── ffmpeg (gratuito) ───────────────────────────────────────────────────
function findFfmpeg() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
    return 'ffmpeg';
  } catch {
    const winget = join(process.env.LOCALAPPDATA ?? '', 'Microsoft/WinGet/Links/ffmpeg.exe');
    if (existsSync(winget)) return winget;
    console.error('No se encuentra ffmpeg (instalación: winget install Gyan.FFmpeg).');
    process.exit(1);
  }
}
const FFMPEG = findFfmpeg();
const LOUDNORM = 'loudnorm=I=-16:TP=-1.5:LRA=11';
const encode = (input, output, filter) =>
  execFileSync(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', '-i', input, '-af', filter, '-ac', '1', '-ar', '24000', '-c:a', 'libmp3lame', '-b:a', '48k', output]);

// ── Conversión de lo aprobado ───────────────────────────────────────────
const data = existsSync(DATA) ? JSON.parse(readFileSync(DATA, 'utf8')) : {};
let encoded = 0;
for (const item of items.filter((i) => i.status === 'ok' && i.review === 'aprobada').sort((a, b) => a.unit - b.unit || a.index - b.index)) {
  const id = `u${String(item.unit).padStart(2, '0')}`;
  const name = `${id}-${String(item.index + 1).padStart(2, '0')}`;
  const dir = join(OUT, id);
  const list = (data[item.unit] ??= []);
  const current = list.find((e) => e.index === item.index);
  if (current?.hash === item.hash && existsSync(join(dir, `${name}.mp3`)) && existsSync(join(dir, `${name}-slow.mp3`))) continue;
  mkdirSync(dir, { recursive: true });
  encode(item.file, join(dir, `${name}.mp3`), LOUDNORM);
  encode(item.file, join(dir, `${name}-slow.mp3`), `atempo=${SLOW},${LOUDNORM}`);
  const entry = {
    index: item.index,
    text: item.text,
    speaker: item.speaker,
    src: `/audio/units/${id}/${name}.mp3`,
    slow: `/audio/units/${id}/${name}-slow.mp3`,
    seconds: item.seconds,
    hash: item.hash,
  };
  if (current) list.splice(list.indexOf(current), 1, entry);
  else list.push(entry);
  list.sort((a, b) => a.index - b.index);
  encoded++;
}
const sorted = Object.fromEntries(Object.entries(data).sort((a, b) => Number(a[0]) - Number(b[0])));
writeFileSync(DATA, JSON.stringify(sorted, null, 2) + '\n');
const total = Object.values(sorted).reduce((n, l) => n + l.length, 0);
console.log(`Convertidas ahora: ${encoded} frases · publicadas en total: ${total} (unidades ${Object.keys(sorted).join(', ') || 'ninguna'}).`);
