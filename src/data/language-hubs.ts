// Hubs de la sección /language/ que agrupan artículos (decisión de David, 15 de noviembre de 2026).
// Una sola fuente para la página de cada hub, los banners de /language/ y las migas de los artículos
// (src/utils/articles.ts). Un artículo nuevo de estas familias se añade aquí, a su grupo.

// 勉強法: guías de cada destreza, guías de estudio y recursos. Ids relativos a src/content/articles/language/.
export const STUDY_HUB_URL = '/language/learn-spanish/study-methods/';
export const STUDY_GROUPS = [
  {
    id: 'skills',
    label: '技能別の勉強法',
    ids: [
      'learn-spanish/pronunciation-for-japanese',
      'learn-spanish/zipf-law-methodology',
      'learn-spanish/memorize-vocabulary',
      'learn-spanish/listening-tips',
      'learn-spanish/reading-tips',
    ],
  },
  {
    id: 'guides',
    label: '学習ガイドとツール',
    ids: ['learn-spanish/verb-conjugation', 'learn-spanish/spanish-vs-japanese', 'learn-spanish/how-to-make-study-plan'],
  },
  {
    id: 'resources',
    label: '学習リソース',
    ids: [
      'spanish-apps/spanish-apps',
      'learn-spanish/movies-series-spanish',
      'learn-spanish/travel-phrases-spanish',
      'learn-spanish/spanish-in-latin-america',
      'learn-spanish/spanish-interview-questions-self-pr',
      'learn-spanish/spanish-interview-practice',
    ],
  },
] as const;

// スペイン語学校: guía de Japón y ciudades; más adelante, escuelas en España.
export const SCHOOLS_HUB_URL = '/language/spanish-schools/';
export const SCHOOLS_JAPAN_ID = 'spanish-schools-in-japan/spanish-schools-in-japan';
export const SCHOOL_CITY_IDS = [
  'tokyo-spanish-schools/tokyo-spanish-schools',
  'yokohama-spanish-schools/yokohama-spanish-schools',
  'osaka-spanish-schools/osaka-spanish-schools',
  'kyoto-spanish-schools/kyoto-spanish-schools',
] as const;

// Ids (con el prefijo language/) que cuelgan del hub de 勉強法 en la miga de pan.
export const STUDY_HUB_MEMBERS: ReadonlySet<string> = new Set(STUDY_GROUPS.flatMap((g) => g.ids.map((id) => `language/${id}`)));
