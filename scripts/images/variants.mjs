// Versiones de una imagen nueva en 1200, 800 y 480 px (WebP), para el srcset y Google Discover.
//
//   npm run images:variants -- <original> <destino-sin-extensión>
//   p. ej.: npm run images:variants -- "Artículos/fiesta/cartel.jpg" public/images/press/fiesta-2026
//   → fiesta-2026-1200.webp, fiesta-2026-800.webp y fiesta-2026-480.webp
//
// Las imágenes principales de los artículos (heroImage en src/assets/hero/) no lo necesitan: basta
// con guardar el original a 1200 px y Astro genera los tamaños en el build (src/utils/images.ts).
// Este script es para las imágenes de public/ (notas de prensa, imágenes del cuerpo, home…).
// La versión de 480 px se ajusta para quedar por debajo de 100 KB; la de 1200 px no tiene límite.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import sharp from 'sharp';

const [input, base] = process.argv.slice(2);
if (!input || !base) {
  console.error('Uso: npm run images:variants -- <original> <destino-sin-extensión>');
  process.exit(1);
}
sharp.cache(false);
mkdirSync(dirname(base), { recursive: true });
const meta = await sharp(input).metadata();
if (meta.width < 1200) console.warn(`Aviso: el original mide ${meta.width} px; la versión de 1200 px será una ampliación.`);
for (const [width, quality] of [[1200, 85], [800, 80], [480, 75]]) {
  let q = quality, buf;
  do {
    buf = await sharp(input).rotate().resize({ width }).webp({ quality: q, effort: 6 }).toBuffer();
    q -= 5;
  } while (width === 480 && buf.length > 100 * 1024 && q >= 40);
  const out = `${base}-${width}.webp`;
  writeFileSync(out, buf);
  const m = await sharp(buf).metadata();
  console.log(`${out} ${m.width}x${m.height} ${Math.round(buf.length / 1024)} KB`);
}
