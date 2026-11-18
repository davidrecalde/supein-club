// Mapas de España en línea a partir de public/spain-provinces.svg, recortado como en SpainMapSVG.astro:
// - provinceMap(): cabecera de cada provincia (ProvinceGuideLayout), con la provincia y sus vecinas marcadas.
// - communityMap(): hub /food/spain-map/, cada provincia con el color de su comunidad y enlace a su guía.
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

type PathInfo = { id: string; d: string; transform?: string };

/**
 * Recorre los trazados de las provincias y deja que `render` decida qué escribir en su lugar.
 * Canarias, Ceuta y Melilla llevan además transform="translate(…) scale(…)" (recuadros aparte).
 * Coordenadas a 1 decimal: el mapa se ve a menos de 500 px y pesa la mitad.
 */
function mapSvg(attrs: string, render: (p: PathInfo, path: string) => string) {
  return baseSvg()
    .slice(baseSvg().indexOf('<svg'))
    .replace('width="418.45123"', `viewBox="0 0 ${VIEW_W} ${VIEW_H}" preserveAspectRatio="xMidYMid meet" ${attrs}`)
    .replace(/\s*height="468\.63733"/, '')
    .replace(/\s+title="[^"]*"/g, '')
    .replace(/<path\s+d="([^"]+)"([^>]*?)\s+id="(ES-[A-Z]+)"\s*\/>/g, (_m, d: string, rest: string, id: string) => {
      const transform = rest.match(/transform="([^"]+)"/)?.[1];
      const dShort = d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));
      return render({ id, d, transform }, `<path d="${dShort}"${transform ? ` transform="${transform}"` : ''} id="${id}"`);
    });
}

/** Centro superior de una provincia, en % del mapa (para colocar una etiqueta encima). */
function anchorOf({ d, transform }: PathInfo) {
  const b = pathBox(d);
  const [tx, ty] = (transform?.match(/translate\(([-\d.]+)[ ,]+([-\d.]+)\)/)?.slice(1).map(Number)) ?? [0, 0];
  const k = Number(transform?.match(/scale\(([-\d.]+)\)/)?.[1] ?? 1);
  return { x: ((tx + k * (b.minX + b.maxX) / 2) / VIEW_W) * 100, y: ((ty + k * b.minY) / VIEW_H) * 100 };
}

/** Provincia `current` (data-current) y `neighbors` (data-neighbor) marcadas, y dónde poner su etiqueta. */
export function provinceMap(current: string, neighbors: string[] = []) {
  const near = new Set(neighbors);
  let label = { x: 50, y: 50 };
  const svg = mapSvg('aria-hidden="true" focusable="false"', (p, path) => {
    if (p.id === current) label = anchorOf(p);
    const mark = p.id === current ? ' data-current=""' : near.has(p.id) ? ' data-neighbor=""' : '';
    return `${path}${mark}/>`;
  });
  return { svg, label };
}

/**
 * Cada provincia con el color de su comunidad, envuelta en un enlace a su guía (funciona sin
 * JavaScript; el hub lo intercepta para mostrar antes una tarjeta con el nombre). Con links: false,
 * solo el dibujo (para meterlo dentro de un único enlace, como en /food/).
 */
export function communityMap(provinces: Record<string, { slug: string; name: string; community: string; color: string }>, { links = true } = {}) {
  return mapSvg(links ? 'role="img" aria-label="スペインの県の地図"' : 'aria-hidden="true" focusable="false"', (p, path) => {
    const info = provinces[p.id];
    if (!info) return `${path}/>`;
    if (!links) return `${path} style="fill:${info.color}"/>`;
    return `<a href="/food/spain-map/${info.slug}/" aria-label="${info.name}" data-name="${info.name}" data-community="${info.community}">${path} style="fill:${info.color}"/></a>`;
  });
}
