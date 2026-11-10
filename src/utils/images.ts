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
