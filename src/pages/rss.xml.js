import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getArticleUrl } from '../utils/articles';

export async function GET(context) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const sorted = articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'スペイン倶楽部｜新着記事',
    description: 'スペイン倶楽部が公開した最新記事のフィード。旅行・料理・語学・文化・生活・サッカーなど、スペインに関する新着情報を配信しています。',
    site: context.site,
    items: sorted.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: getArticleUrl(article),
      categories: [article.data.pillar],
    })),
    customData: '<language>ja</language>',
  });
}
