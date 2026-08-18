import type { CollectionEntry } from 'astro:content';

/**
 * Única fuente de verdad para construir la URL (ruta relativa, con barra
 * final) de un artículo de la colección `articles`.
 *
 * Regla: /pillar/cluster/slug/ — salvo cuando el slug del archivo
 * coincide con el cluster ("artículo insignia"), en cuyo caso colapsa a
 * /pillar/cluster/ (ej. src/content/articles/football/fcbarcelona/fcbarcelona.mdx
 * → /football/fcbarcelona/).
 */
export function getArticleUrl(entry: CollectionEntry<'articles'>): string {
  const parts = entry.id.replace(/\.(md|mdx)$/, '').split('/');
  const cluster = entry.data.cluster;
  const articleSlug = parts[2] ?? cluster;
  return articleSlug === cluster
    ? `/${entry.data.pillar}/${cluster}/`
    : `/${entry.data.pillar}/${cluster}/${articleSlug}/`;
}
