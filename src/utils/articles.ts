import type { CollectionEntry } from 'astro:content';
import { slugToJa } from '../config/breadcrumbs';

const pillarLabels: Record<string, string> = {
  travel: 'スペイン旅行',
  food: 'スペイン料理',
  language: 'スペイン語',
  living: 'スペインに住む',
  culture: 'スペイン文化',
  football: 'スペインサッカー',
};

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

/**
 * Única fuente de verdad para el breadcrumb de un artículo — usado tanto
 * para el <Breadcrumb> visual como para el BreadcrumbList JSON-LD, para
 * que nunca se desincronicen entre sí. Siempre termina en el propio
 * artículo (Home › Pilar [› Cluster] › Título), incluyendo el caso
 * "artículo insignia" (ver getArticleUrl).
 */
export function getArticleBreadcrumbs(entry: CollectionEntry<'articles'>): Array<{ name: string; url: string }> {
  const { pillar, cluster, title } = entry.data;
  const articleUrl = getArticleUrl(entry);
  const canonical = `https://supein.club${articleUrl}`;
  const pillarLabel = pillarLabels[pillar] ?? pillar;
  const clusterUrl = `/${pillar}/${cluster}/`;
  const isFlagship = articleUrl === clusterUrl;

  return isFlagship
    ? [
        { name: 'ホーム', url: '/' },
        { name: pillarLabel, url: `/${pillar}/` },
        { name: title, url: canonical },
      ]
    : [
        { name: 'ホーム', url: '/' },
        { name: pillarLabel, url: `/${pillar}/` },
        { name: slugToJa(cluster), url: clusterUrl },
        { name: title, url: canonical },
      ];
}
