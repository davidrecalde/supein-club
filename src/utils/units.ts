import { getCollection, type CollectionEntry } from 'astro:content';
import { COURSE_URL, TOTAL_UNITS, getCourseLevel, levelUrl } from '../data/course';

export type Unit = CollectionEntry<'units'>;

// Los borradores se renderizan (con noindex y aviso) en `astro dev` y en los
// previews de Cloudflare Pages (ramas distintas de main), para revisarlos antes
// de publicar. El build de producción nunca los genera. La rama la lee
// astro.config.mjs: aquí `process.env` es un polyfill vacío del adaptador.
declare const __SHOW_COURSE_DRAFTS__: boolean;
export const SHOW_DRAFTS = import.meta.env.DEV || __SHOW_COURSE_DRAFTS__;

let cache: Unit[] | undefined;

export async function getAllUnits(): Promise<Unit[]> {
  cache ??= (await getCollection('units')).sort((a, b) => a.data.unit - b.data.unit);
  return cache;
}

/** Bloques del curso en el hub y en las páginas de nivel: en producción, solo
 *  cuando las 62 unidades están publicadas. Decisión de David (2026-11-02): el
 *  curso no se muestra a los visitantes hasta estar 100 % terminado. El build
 *  falla si se publica solo una parte (course-link-check en astro.config.mjs). */
export async function isCourseVisible(): Promise<boolean> {
  const units = await getAllUnits();
  return SHOW_DRAFTS || (units.length === TOTAL_UNITS && units.every((u) => !u.data.draft));
}

/** La unidad se genera con su plantilla. Una unidad «existente» en borrador no:
 *  su URL la sigue sirviendo la colección `articles` hasta que se publique. */
export function isRoutable(u: Unit): boolean {
  return !u.data.draft || (SHOW_DRAFTS && !u.data.existing);
}

/** Hay una página real detrás de la URL (unidad renderizada o artículo existente). */
export function hasPage(u: Unit): boolean {
  return isRoutable(u) || u.data.existing;
}

export function unitLabel(u: Unit): string {
  return `ユニット ${u.data.unit} / ${TOTAL_UNITS}`;
}

export function levelLabel(code: string): string {
  const level = getCourseLevel(code);
  return level ? `${level.code} ${level.name}` : code;
}

/** Ruta del catch-all de /language/[cluster]/[...article] a partir de la URL de la unidad. */
export function unitRouteParams(u: Unit): { cluster: string; article: string } {
  const [, cluster, ...rest] = u.data.url.split('/').filter(Boolean);
  return { cluster, article: rest.join('/') };
}

export function unitBreadcrumbs(u: Unit): Array<{ name: string; url: string }> {
  return [
    { name: 'ホーム', url: '/' },
    { name: 'スペイン語', url: '/language/' },
    { name: 'コース', url: COURSE_URL },
    { name: levelLabel(u.data.level), url: levelUrl(u.data.level) },
    { name: `ユニット${u.data.unit} ${u.data.shortTitle}`, url: `https://supein.club${u.data.url}` },
  ];
}
