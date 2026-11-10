// Ilustraciones del curso: convierte las escenas y los retratos de Imágenes/personajes/
// (carpeta local, fuera de git) a WebP de menos de 100 KB y actualiza `image` en cada unidad.
// Cada escena sale además en dos tamaños para el srcset de la unidad (Google Discover):
// uNN-480.webp (móvil) y uNN-1200.webp (1200 px; es el og:image y no tiene el límite de 100 KB).
//
//   npm run course:images                       → convierte y actualiza src/width/height
//   npm run course:images -- --alts alts.json   → además añade `image` a las unidades que no lo tienen
//                                                 (alts.json: { "1": "alt en japonés", … })
//
// El `alt` se redacta a mano y el script nunca lo cambia.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const SRC = 'Imágenes/personajes';
const OUT_UNITS = 'public/images/course/units';
const OUT_CAST = 'public/images/course/cast';
const UNITS = 'src/content/units';
const LIMIT = 100 * 1024;
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const CAST = ['mina', 'kenta', 'yui', 'daniel', 'carmen'];

const altsArg = process.argv.indexOf('--alts');
const alts = altsArg > -1 ? JSON.parse(readFileSync(process.argv[altsArg + 1], 'utf8')) : {};

if (!existsSync(SRC)) {
  console.error(`No se encuentra ${SRC}: las ilustraciones originales no están en el repositorio.`);
  process.exit(1);
}
mkdirSync(OUT_UNITS, { recursive: true });
mkdirSync(OUT_CAST, { recursive: true });

// Baja ancho y calidad hasta quedar por debajo de 100 KB.
async function encode(input, out, { width, square = false }) {
  const meta = await sharp(input).metadata();
  const side = Math.min(meta.width, meta.height);
  const crop = square && { left: Math.round((meta.width - side) / 2), top: Math.round((meta.height - side) / 2), width: side, height: side };
  for (const w of [width, Math.round(width * 0.85), Math.round(width * 0.72)]) {
    for (let q = 80; q >= 50; q -= 5) {
      const img = crop ? sharp(input).extract(crop) : sharp(input);
      const buf = await img.resize({ width: w }).webp({ quality: q, effort: 6 }).toBuffer();
      if (buf.length < LIMIT) {
        writeFileSync(out, buf);
        const m = await sharp(buf).metadata();
        return { width: m.width, height: m.height, kb: Math.round(buf.length / 1024) };
      }
    }
  }
  throw new Error(`No baja de 100 KB: ${out}`);
}

// Tamaño fijo para el srcset (sin el límite de 100 KB: la versión de 1200 px es la de Google Discover).
async function encodeAt(input, out, width, quality) {
  const buf = await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toBuffer();
  writeFileSync(out, buf);
  return Math.round(buf.length / 1024);
}

// unidad → archivo .mdx
const unitFiles = new Map();
for (const level of readdirSync(UNITS)) {
  for (const name of readdirSync(join(UNITS, level))) {
    const text = readFileSync(join(UNITS, level, name), 'utf8');
    const n = Number(text.match(/^unit: (\d+)/m)?.[1]);
    if (n) unitFiles.set(n, join(UNITS, level, name));
  }
}

const missingAlt = [];
for (const level of LEVELS) {
  const dir = join(SRC, level);
  if (!existsSync(dir)) continue;
  for (const name of readdirSync(dir).sort()) {
    const n = Number(name.match(/^u(\d{2})/)?.[1]);
    if (!n) continue;
    const id = String(n).padStart(2, '0');
    const src = `/images/course/units/u${id}.webp`;
    const { width, height, kb } = await encode(join(dir, name), join(OUT_UNITS, `u${id}.webp`), { width: 1200 });
    const kb480 = await encodeAt(join(dir, name), join(OUT_UNITS, `u${id}-480.webp`), 480, 75);
    const kb1200 = await encodeAt(join(dir, name), join(OUT_UNITS, `u${id}-1200.webp`), 1200, 82);
    const file = unitFiles.get(n);
    let text = readFileSync(file, 'utf8');
    const eol = text.includes('\r\n') ? '\r\n' : '\n';
    const line = /^image: \{ src: "[^"]*", width: \d+, height: \d+, alt: ("(?:[^"\\]|\\.)*") \}$/m;
    if (line.test(text)) {
      text = text.replace(line, (_, alt) => `image: { src: "${src}", width: ${width}, height: ${height}, alt: ${alt} }`);
    } else if (alts[n]) {
      text = text.replace(/^draft: /m, `image: { src: "${src}", width: ${width}, height: ${height}, alt: ${JSON.stringify(alts[n])} }${eol}draft: `);
    } else {
      missingAlt.push(n);
      continue;
    }
    writeFileSync(file, text);
    console.log(`u${id} ${width}x${height} ${kb} KB · 480: ${kb480} KB · 1200: ${kb1200} KB`);
  }
}

for (const id of CAST) {
  const input = join(SRC, `${id.charAt(0).toUpperCase()}${id.slice(1)}-retrato.jpg`);
  const big = await encode(input, join(OUT_CAST, `${id}.webp`), { width: 640, square: true });
  const small = await encode(input, join(OUT_CAST, `${id}-96.webp`), { width: 96, square: true });
  console.log(`${id} ${big.kb} KB / ${small.kb} KB`);
}

if (missingAlt.length) {
  console.error(`Sin alt (no se ha añadido image): unidades ${missingAlt.join(', ')}. Pásalo con --alts.`);
  process.exit(1);
}
