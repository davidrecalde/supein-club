import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;

/**
 * 各記事のヒーロー画像上に表示するカテゴリラベルを、各ピラーのハブページ
 * （/food/, /culture/, /travel/, /football/, /living/, /language/ の
 * index.astro）が使っているカテゴリ分類ロジックと同じ基準で算出する。
 * ハブ側のカテゴリ定義を変更した場合は、ここも合わせて更新すること。
 */

const tagCategories: Record<string, { tag: string; label: string }[]> = {
  culture: [
    { tag: 'フラメンコ', label: 'フラメンコ' },
    { tag: 'サルスエラ', label: 'サルスエラ' },
    { tag: '歴史', label: 'スペインの歴史' },
    { tag: '伝統と祭り', label: '伝統と祭り' },
    { tag: '基本情報', label: '基本情報' },
    { tag: '季節のフェスティバル', label: '季節のフェスティバル' },
    { tag: '自治州の日', label: '自治州の日' },
  ],
  travel: [
    { tag: '目的地', label: '目的地' },
    { tag: 'モデルコース・ツアー', label: 'モデルコース・ツアー' },
    { tag: '旅行費用', label: '旅行費用' },
    { tag: '旅行準備', label: '旅行準備' },
  ],
  football: [
    { tag: '選手', label: '選手' },
    { tag: 'エル・クラシコ', label: 'エル・クラシコ' },
    { tag: '歴史', label: '歴史' },
    { tag: 'チーム', label: 'チーム' },
    { tag: 'リーグ', label: 'リーグ' },
    { tag: '用語', label: '用語' },
    { tag: '教育', label: '教育' },
  ],
};

const foodClusterCategories: { clusters: string[]; label: string }[] = [
  { clusters: ['food-routes'], label: '地方グルメルート' },
  { clusters: ['paella', 'jamon-iberico', 'souvenirs', 'spanish-desserts', 'olive-oil'], label: '名物料理・食材ガイド' },
  { clusters: ['columbian-exchange'], label: '食の歴史' },
  { clusters: ['spanish-wine'], label: 'スペインワイン' },
  { clusters: ['tapas', 'spain-bar-restaurant', 'spain-dining-times'], label: 'バル・レストラン文化' },
  { clusters: ['spanish-vocabulary'], label: 'グルメ語彙' },
];

const livingClusterCategories: { clusters: string[]; label: string }[] = [
  { clusters: ['cervantes-webinar-experiencias-espana'], label: 'ウェビナー' },
  { clusters: ['i-need-spain'], label: 'インタビュー' },
];

export function getCategoryBadgeLabel(entry: Article): string | undefined {
  const { pillar, cluster, tags, articleRole, level } = entry.data;

  if (pillar === 'food') {
    if (cluster.startsWith('spain-map-') || cluster === 'spain-map') return 'スペイン美食マップ';
    return foodClusterCategories.find((c) => c.clusters.includes(cluster))?.label;
  }

  if (pillar === 'living') {
    return livingClusterCategories.find((c) => c.clusters.includes(cluster))?.label;
  }

  if (pillar === 'language') {
    if (cluster === 'spanish-apps') return '学習リソース';
    if (cluster !== 'learn-spanish') return 'スペイン語学校';

    const isDele =
      entry.id.includes('learn-spanish/dele/') ||
      entry.id.includes('dele-vs-seiken') ||
      entry.id.includes('dele-b1-tips');
    if (isDele) return 'DELE';

    const introRoles = ['pilar', 'onboarding', 'diagnostico'];
    const isIntro = introRoles.includes(articleRole ?? '') || entry.id.includes('zipf-law-methodology');
    if (isIntro) return 'はじめに';

    // レベル別記事（A1〜C2）はレベルバッジ自体がカテゴリの代わりになるため
    // ここではラベルを出さない。
    if (level) return undefined;

    return '学習リソース';
  }

  if (pillar === 'culture' || pillar === 'travel' || pillar === 'football') {
    return tagCategories[pillar]?.find((c) => tags.includes(c.tag))?.label;
  }

  return undefined;
}
