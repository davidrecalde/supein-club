// Versiones de una imagen nueva en 1200, 800 y 480 px (WebP), para el srcset y Google Discover.
//
//   npm run images:variants -- <original> <destino-sin-extensión> [--schema]
//   p. ej.: npm run images:variants -- "Artículos/fiesta/cartel.jpg" public/images/press/fiesta-2026 --schema
//   → fiesta-2026-1200.webp, fiesta-2026-800.webp y fiesta-2026-480.webp
//   --schema: además, recortes 16:9, 4:3 y 1:1 para el ImageObject del schema (-16x9, -4x3, -1x1;
//   recorte «attention», sin ampliar). Para imágenes principales (notas de prensa).
//
// Las imágenes principales de los artículos (heroImage en src/assets/hero/) no lo necesitan: basta
// con guardar el original a 1200 px y Astro genera los tamaños en el build (src/utils/images.ts).
// Este script es para las imágenes de public/ (notas de prensa, imágenes del cuerpo, home…).
// Las versiones de 480 y 800 px (las que carga el móvil) se ajustan para quedar por debajo de 100 KB;
// la de 1200 px no tiene límite.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import sharp from 'sharp';

const args = process.argv.slice(2);
const withSchema = args.includes('--schema');
const [input, base] = args.filter((a) => a !== '--schema');
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
  } while (width <= 800 && buf.length > 100 * 1024 && q >= 40);
  const out = `${base}-${width}.webp`;
  writeFileSync(out, buf);
  const m = await sharp(buf).metadata();
  console.log(`${out} ${m.width}x${m.height} ${Math.round(buf.length / 1024)} KB`);
}
if (withSchema) {
  for (const [ratio, w, h] of [['16x9', 16, 9], ['4x3', 4, 3], ['1x1', 1, 1]]) {
    // El 16:9 es la imagen principal para Google Discover: siempre 1200×675 (amplía si el original
    // es más pequeño, con aviso). El 4:3 y el 1:1 no se amplían (basta con ≥50.000 píxeles).
    let width = Math.min(1200, meta.width, Math.floor((meta.height * w) / h));
    if (ratio === '16x9' && width < 1200) {
      console.warn(`Aviso: el recorte 16:9 se amplía de ${width} a 1200 px de ancho.`);
      width = 1200;
    }
    const height = Math.round((width * h) / w);
    const buf = await sharp(input).rotate().resize({ width, height, fit: 'cover', position: 'attention' }).webp({ quality: 82, effort: 6 }).toBuffer();
    writeFileSync(`${base}-${ratio}.webp`, buf);
    console.log(`${base}-${ratio}.webp ${width}x${height} ${Math.round(buf.length / 1024)} KB`);
  }
}
