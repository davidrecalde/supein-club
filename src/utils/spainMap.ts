// Minimapa de España para la cabecera de cada provincia (ProvinceGuideLayout): el SVG base de
// public/spain-provinces.svg, recortado como en SpainMapSVG.astro, con la provincia actual y sus
// vecinas marcadas por atributos (el color lo pone el CSS de la página).
import { readFileSync } from 'node:fs';
import path from 'node:path';

const VIEW_W = 418.46;
const VIEW_H = 328;

let cache: string | null = null;
const baseSvg = () => (cache ??= readFileSync(path.resolve(process.cwd(), 'public/spain-provinces.svg'), 'utf-8'));

/** Caja de un trazado del SVG base (solo usa «m» relativo con lineto implícito y «z»), sin su transform. */
function pathBox(d: string) {
  let x = 0, y = 0, startX = 0, startY = 0;
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const seg of d.split(/(?=[mz])/i)) {
    const cmd = seg[0];
    if (cmd === 'z' || cmd === 'Z') { x = startX; y = startY; continue; }
    const nums = seg.slice(1).trim().split(/[\s,]+/).filter(Boolean).map(Number);
    for (let i = 0; i + 1 < nums.length; i += 2) {
      x += nums[i];
      y += nums[i + 1];
      if (i === 0) { startX = x; startY = y; }
      minX = Math.min(minX, x); maxX = Math.max(maxX, x);
      minY = Math.min(minY, y); maxY = Math.max(maxY, y);
    }
  }
  return { minX, minY, maxX, maxY };
}

/**
 * SVG en línea con la provincia `current` (data-current) y las `neighbors` (data-neighbor), y el
 * punto donde colocar la etiqueta con su nombre: centro superior de la provincia, en % del mapa.
 */
export function provinceMap(current: string, neighbors: string[] = []) {
  const near = new Set(neighbors);
  let label = { x: 50, y: 50 };
  const svg = baseSvg()
    .slice(baseSvg().indexOf('<svg'))
    .replace('width="418.45123"', `viewBox="0 0 ${VIEW_W} ${VIEW_H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false"`)
    .replace(/\s*height="468\.63733"/, '')
    .replace(/\s+title="[^"]*"/g, '')
    // Canarias, Ceuta y Melilla llevan además transform="translate(…) scale(…)" (recuadros aparte).
    .replace(/<path\s+d="([^"]+)"([^>]*?)\s+id="(ES-[A-Z]+)"\s*\/>/g, (_m, d: string, attrs: string, id: string) => {
      const transform = attrs.match(/transform="([^"]+)"/)?.[1];
      if (id === current) {
        const b = pathBox(d);
        const [tx, ty] = (transform?.match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/)?.slice(1).map(Number)) ?? [0, 0];
        const k = Number(transform?.match(/scale\(([-\d.]+)\)/)?.[1] ?? 1);
        label = { x: ((tx + k * (b.minX + b.maxX) / 2) / VIEW_W) * 100, y: ((ty + k * b.minY) / VIEW_H) * 100 };
      }
      const mark = id === current ? ' data-current=""' : near.has(id) ? ' data-neighbor=""' : '';
      // Coordenadas a 1 decimal: el mapa se ve a menos de 500 px y pesa la mitad.
      const dShort = d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));
      return `<path d="${dShort}"${transform ? ` transform="${transform}"` : ''} id="${id}"${mark}/>`;
    });
  return { svg, label };
}
