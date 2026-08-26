import { getCollection, type CollectionEntry } from 'astro:content';
import { courseSequence } from '../data/course-sequence';
import { getArticleUrl } from './articles';

export type CourseSequencePosition = {
  kind: 'step' | 'dele';
  index: number; // 0-based
  total: number;
  prev?: CollectionEntry<'articles'>;
  next?: CollectionEntry<'articles'>;
};

const idNoExt = (entry: CollectionEntry<'articles'>) => entry.id.replace(/\.(md|mdx)$/, '');

/**
 * Resuelve en qué punto de courseSequence.step o courseSequence.dele cae
 * la URL actual (Astro.url.pathname), comparando contra getArticleUrl()
 * de cada entry real — así nunca se desincroniza con la única fuente de
 * verdad de construcción de URLs. Devuelve undefined si el artículo no
 * pertenece a ninguna de las dos secuencias (その他).
 */
export async function resolveCourseSequencePosition(pathname: string): Promise<CourseSequencePosition | undefined> {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const allArticles = await getCollection('articles', ({ data }) => !data.draft);
  const byId = new Map(allArticles.map((a) => [idNoExt(a), a]));

  for (const kind of ['step', 'dele'] as const) {
    const list = courseSequence[kind];
    const index = list.findIndex((id) => {
      const entry = byId.get(id);
      return !!entry && getArticleUrl(entry) === normalized;
    });
    if (index !== -1) {
      const prevId = index > 0 ? list[index - 1] : undefined;
      const nextId = index < list.length - 1 ? list[index + 1] : undefined;
      return {
        kind,
        index,
        total: list.length,
        prev: prevId ? byId.get(prevId) : undefined,
        next: nextId ? byId.get(nextId) : undefined,
      };
    }
  }
  return undefined;
}
