import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/**
 * Imágenes principales en varios tamaños (Google Discover).
 *
 * La página carga el tamaño que necesita cada pantalla (srcset): el móvil, ~480-800 px y ligero;
 * el escritorio y las pantallas de alta densidad, hasta 1200 px. El og:image (y el schema) apunta
 * siempre a la versión grande de 1200 px, la que Google Discover exige para la vista previa grande
 * junto con `max-image-preview:large`. Los anchos mayores que el original se omiten (sin ampliar).
 */
export const HERO_WIDTHS = [480, 800, 1200];
/** El hero de los artículos mide como máximo 860 px de ancho; en móvil, el ancho de la pantalla. */
export const HERO_SIZES = '(max-width: 900px) 100vw, 860px';
/** Hero a sangre completa (guías de provincia): siempre el ancho de la pantalla. */
export const FULL_BLEED_SIZES = '100vw';
export const DISCOVER_WIDTH = 1200;

export async function discoverImage(src: ImageMetadata): Promise<{ src: string; width: number; height: number }> {
  const width = Math.min(DISCOVER_WIDTH, src.width);
  const height = Math.round((src.height * width) / src.width);
  const img = await getImage({ src, width, format: 'webp', quality: 82 });
  return { src: img.src, width, height };
}

/**
 * Imágenes para el schema (ImageObject): Google recomienda varias versiones en alta resolución con
 * proporciones 16:9, 4:3 y 1:1 (mínimo 50.000 píxeles; la principal, ≥1200 px de ancho para Discover).
 * Las versiones pequeñas del srcset (480/800) NO van al schema: Google podría elegir una pequeña.
 * Recorte inteligente (sharp «attention»): conserva la zona importante (texto, escudo, persona).
 */
export type SchemaRatio = '16x9' | '4x3' | '1x1';
export interface SchemaImage {
  ratio: SchemaRatio;
  url: string;
  width: number;
  height: number;
}
export const SCHEMA_RATIOS: Array<{ ratio: SchemaRatio; w: number; h: number }> = [
  { ratio: '16x9', w: 16, h: 9 },
  { ratio: '4x3', w: 4, h: 3 },
  { ratio: '1x1', w: 1, h: 1 },
];

/**
 * Versiones a medida para el schema: src/assets/hero/schema/<nombre>-4x3.webp y -1x1.webp. Las usan
 * las cabeceras tipográficas (color plano + texto), que no se pueden recortar sin cortar el texto:
 * el fondo se amplía con el mismo color hasta la proporción. Si existe, sustituye al recorte.
 */
const SCHEMA_OVERRIDES = new Map(
  Object.entries(import.meta.glob<{ default: ImageMetadata }>('/src/assets/hero/schema/*.webp', { eager: true })).map(([p, m]) => [
    p.split('/').pop()!.replace(/\.webp$/, ''),
    m.default,
  ]),
);
/** Nombre del archivo original («hero-b1-grammar») a partir del src del build («/_astro/hero-b1-grammar.CvJ8H5x0.webp»). */
const assetName = (src: ImageMetadata) => decodeURIComponent(src.src.split('?')[0].split('/').pop() ?? '').replace(/(\.[A-Za-z0-9_-]{8})?\.(webp|png|jpe?g|avif)$/i, '');

/** Recortes 16:9, 4:3 y 1:1 de una imagen de src/assets (sin ampliar; 1200 px de ancho como máximo). */
export async function schemaImages(src: ImageMetadata): Promise<SchemaImage[]> {
  const name = assetName(src);
  return Promise.all(
    SCHEMA_RATIOS.map(async ({ ratio, w, h }) => {
      const override = SCHEMA_OVERRIDES.get(`${name}-${ratio}`);
      if (override) {
        const width = Math.min(DISCOVER_WIDTH, override.width);
        const height = Math.round((override.height * width) / override.width);
        const img = await getImage({ src: override, width, format: 'webp', quality: 85 });
        return { ratio, url: img.src, width, height };
      }
      const width = Math.min(DISCOVER_WIDTH, src.width, Math.floor((src.height * w) / h));
      const height = Math.round((width * h) / w);
      const img = await getImage({ src, width, height, fit: 'cover', position: 'attention', format: 'webp', quality: 82 });
      return { ratio, url: img.src, width, height };
    }),
  );
}

/**
 * Recortes de una imagen de public/ generados por script (npm run images:variants -- … --schema o
 * npm run course:images): <base>-16x9.webp, <base>-4x3.webp y <base>-1x1.webp. Para el 16:9 sirve
 * también <base>-1200.webp si ya tiene esa proporción. Lee las medidas reales en el build.
 */
export async function publicSchemaImages(src: string): Promise<SchemaImage[] | undefined> {
  const { existsSync } = await import('node:fs');
  const sharp = (await import('sharp')).default;
  const base = src.replace(/\.(webp|png|jpe?g)$/i, '');
  const out: SchemaImage[] = [];
  for (const { ratio, w, h } of SCHEMA_RATIOS) {
    const candidates = ratio === '16x9' ? [`${base}-16x9.webp`, `${base}-1200.webp`] : [`${base}-${ratio}.webp`];
    for (const url of candidates) {
      if (!existsSync(`public${url}`)) continue;
      const m = await sharp(`public${url}`).metadata();
      if (!m.width || !m.height || Math.abs(m.width / m.height - w / h) > 0.02) continue;
      out.push({ ratio, url, width: m.width, height: m.height });
      break;
    }
  }
  return out.length ? out : undefined;
}

/** Medidas reales de un archivo de public/ (en el build). */
export async function publicImageSize(url: string): Promise<{ width: number; height: number } | undefined> {
  const { existsSync } = await import('node:fs');
  if (!existsSync(`public${url}`)) return undefined;
  const m = await (await import('sharp')).default(`public${url}`).metadata();
  return m.width && m.height ? { width: m.width, height: m.height } : undefined;
}
