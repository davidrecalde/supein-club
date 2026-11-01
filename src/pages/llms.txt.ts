import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getArticleUrl } from '../utils/articles';

export const prerender = true;

const siteUrl = 'https://supein.club';

// IDs reales de la colección `articles` (ruta de archivo sin extensión) —
// mismo criterio que course-sequence.ts. Se busca por `.id` en vez de
// `getEntry(..., slug)` porque el slug autogenerado de un archivo
// "index.mdx" colapsa el segmento final, mientras que `.id` lo conserva.
const languageHighlightIds = [
  'language/learn-spanish/index',
  'language/learn-spanish/dele/index',
  'language/learn-spanish/verb-conjugation',
  'language/learn-spanish/zipf-law-methodology',
];

export const GET: APIRoute = async () => {
  const allArticles = await getCollection('articles', ({ data }) => !data.draft);

  const languageLinks = languageHighlightIds
    .map((id) => allArticles.find((a) => a.id.replace(/\.(md|mdx)$/, '') === id))
    .filter((entry) => entry !== undefined)
    .map((entry) => `  - [${entry.data.title}](${siteUrl}${getArticleUrl(entry)})`)
    .join('\n');

  const body = `# スペイン倶楽部 (Club Español en Japón)

> 日本語でスペインの旅行・料理・語学・生活・文化・サッカーを伝えるカルチャーメディア。2018年、東京で創設。

スペイン倶楽部（supein.club）は、日本人読者向けにスペインに関する情報を日本語で発信する総合メディアです。現地在住者・専門家による、実体験に基づいた記事を掲載しています。

## 主なカテゴリ

- [スペイン旅行](${siteUrl}/travel/): 観光スポット、モデルコース、都市別ガイド
- [スペイン料理](${siteUrl}/food/): パエリア、タパス、ワイン、地方別グルメガイド（スペイン全53県マップ）
- [スペイン語](${siteUrl}/language/): 学習ロードマップ、DELE対策、語学学校
${languageLinks}
- [スペインに住む](${siteUrl}/living/): 留学、就労、ビザ、現地生活の実情
- [スペイン文化](${siteUrl}/culture/): 歴史、フラメンコ、伝統行事
- [スペインサッカー](${siteUrl}/football/): ラ・リーガ、クラブ史、代表チーム、日本人選手

## その他

- [運営会社について](${siteUrl}/about-us/)
- [お問い合わせ](${siteUrl}/contact/)
- [サイトマップ](${siteUrl}/sitemap-index.xml)
- [新着記事フィード（RSS）](${siteUrl}/rss.xml)
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
