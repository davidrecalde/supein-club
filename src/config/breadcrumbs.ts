export const slugToJapanese: Record<string, string> = {
  // Pillars
  'travel': 'スペイン旅行',
  'food': 'スペイン料理',
  'language': 'スペイン語',
  'living': 'スペインに住む',
  'culture': 'スペイン文化',
  'football': 'スペインサッカー',
  'about-us': 'スペイン倶楽部とは',
  'events': 'イベント',
  'sponsors': 'スポンサー',
  'contact': 'お問い合わせ',

  // Travel clusters
  'spain-tours': 'スペインツアー',
  'barcelona': 'バルセロナ',
  'madrid': 'マドリード',
  'andalusia': 'アンダルシア',
  'ibiza': 'イビサ',
  'canarias': 'カナリア諸島',
  'spain-flights': 'スペイン航空券',
  'spain-hotels': 'スペインホテル',
  'travel-cost': '旅行費用',
  'itineraries': '旅行プラン',
  'best-season': '旅行シーズン',

  // Food clusters
  'paella': 'パエリア',
  'tapas': 'タパス',
  'spanish-wine': 'スペインワイン',
  'olive-oil': 'オリーブオイル',
  'souvenirs': 'スペインのお土産',
  'restaurants-tokyo': '東京スペイン料理',
  'restaurants-osaka': '大阪スペイン料理',
  'spain-map': 'スペイン美食マップ',
  'traveler-guide-to-spanish-cuisine-and-wine': 'スペイン料理とワインガイド',
  'madrid-restaurants': 'マドリードグルメガイド',
  'barcelona-restaurants': 'バルセロナグルメガイド',
  'sevilla-restaurants': 'セビリアグルメガイド',
  'valencia-restaurants': 'バレンシアグルメガイド',
  'pais-vasco-restaurants': 'バスク地方グルメガイド',

  // Language clusters
  'learn-spanish': 'スペイン語を学ぶ',
  'spanish-grammar': 'スペイン語文法',
  'pronunciation': '発音',
  'self-study': '独学',
  'lessons-tokyo': '東京スペイン語レッスン',
  'online-lessons': 'オンラインレッスン',
  'lesson-price': 'レッスン料金',
  'spanish-phrases': 'スペイン語フレーズ',
  'spanish-apps': 'スペイン語アプリ',
  'spanish-books': 'スペイン語教材',

  // Living clusters
  'study-spain': 'スペイン留学',
  'language-school': '語学学校',
  'university': '大学留学',
  'study-cost': '留学費用',
  'spain-visa': 'スペインビザ',
  'student-visa': '学生ビザ',
  'work-visa': '就労ビザ',
  'working-holiday': 'ワーキングホリデー',
  'work-in-spain': 'スペインで働く',

  // Culture clusters
  'flamenco': 'フラメンコ',
  'history': 'スペインの歴史',
  'traditions': 'スペインの伝統',
  'facts': 'スペイン基本情報',

  // Football clusters
  'la-liga': 'ラ・リーガ',
  'spain-national-team': 'スペイン代表',
  'football-guide': 'サッカーガイド',
  'real-madrid': 'レアル・マドリード',

  // About/Team
  'team': 'チームメンバー',
  'mission': 'ミッション',
  'sponsorship': 'スポンサーシップ',
  'sitemap': 'サイトマップ',
  'privacy': 'プライバシーポリシー',
  'terms': '利用規約',
};

export function slugToJa(slug: string): string {
  if (slugToJapanese[slug]) return slugToJapanese[slug];

  const withoutSuffix = slug.replace(/-restaurants$/, '');
  if (slugToJapanese[withoutSuffix]) {
    return slugToJapanese[withoutSuffix] + 'グルメガイド';
  }

  // Fallback: capitalize the slug (should never reach here)
  return slug.split('-').map((w) =>
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ');
}
