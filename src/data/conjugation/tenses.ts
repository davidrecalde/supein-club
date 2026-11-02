// Tiempos verbales del conjugador: nombre japonés y español, nivel, orden de
// dificultad y unidad del curso que los enseña (docs/language/curso-paso-a-paso.md).
// Las unidades de tiempo son las páginas canónicas de cada tiempo: el
// conjugador enlaza a ellas y no crea páginas de tiempo propias.

export interface TenseMeta {
  id: string;
  ja: string;
  es: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  /** Orden de dificultad en el mapa de tiempos (1 = el primero que se aprende). */
  order: number;
  units: number[];
  mood: 'indicativo' | 'compuesto' | 'subjuntivo' | 'imperativo';
}

export const TENSES: TenseMeta[] = [
  { id: 'presente', ja: '直説法現在', es: 'presente', level: 'A1', order: 1, units: [4, 5], mood: 'indicativo' },
  { id: 'preterito-perfecto', ja: '現在完了', es: 'pretérito perfecto', level: 'A2', order: 2, units: [13], mood: 'compuesto' },
  { id: 'preterito-indefinido', ja: '点過去', es: 'pretérito indefinido', level: 'A2', order: 3, units: [14], mood: 'indicativo' },
  { id: 'preterito-imperfecto', ja: '線過去', es: 'pretérito imperfecto', level: 'A2', order: 4, units: [15], mood: 'indicativo' },
  { id: 'imperativo-afirmativo', ja: '肯定命令', es: 'imperativo afirmativo', level: 'A2', order: 5, units: [19], mood: 'imperativo' },
  { id: 'imperativo-negativo', ja: '否定命令', es: 'imperativo negativo', level: 'A2', order: 6, units: [19], mood: 'imperativo' },
  { id: 'futuro', ja: '未来', es: 'futuro simple', level: 'A2', order: 7, units: [20], mood: 'indicativo' },
  { id: 'condicional', ja: '過去未来（条件法）', es: 'condicional simple', level: 'A2', order: 8, units: [21], mood: 'indicativo' },
  { id: 'subjuntivo-presente', ja: '接続法現在', es: 'presente de subjuntivo', level: 'B1', order: 9, units: [25], mood: 'subjuntivo' },
  { id: 'pluscuamperfecto', ja: '過去完了', es: 'pretérito pluscuamperfecto', level: 'B1', order: 10, units: [28], mood: 'compuesto' },
  { id: 'subjuntivo-imperfecto-ra', ja: '接続法過去（-ra形）', es: 'pretérito imperfecto de subjuntivo (-ra)', level: 'B2', order: 11, units: [37], mood: 'subjuntivo' },
  { id: 'subjuntivo-imperfecto-se', ja: '接続法過去（-se形）', es: 'pretérito imperfecto de subjuntivo (-se)', level: 'B2', order: 12, units: [37], mood: 'subjuntivo' },
  { id: 'subjuntivo-perfecto', ja: '接続法現在完了', es: 'pretérito perfecto de subjuntivo', level: 'B2', order: 13, units: [39], mood: 'subjuntivo' },
  { id: 'subjuntivo-pluscuamperfecto', ja: '接続法過去完了（-ra形）', es: 'pretérito pluscuamperfecto de subjuntivo (-ra)', level: 'B2', order: 14, units: [39], mood: 'subjuntivo' },
  { id: 'subjuntivo-pluscuamperfecto-se', ja: '接続法過去完了（-se形）', es: 'pretérito pluscuamperfecto de subjuntivo (-se)', level: 'B2', order: 15, units: [39], mood: 'subjuntivo' },
  { id: 'futuro-perfecto', ja: '未来完了', es: 'futuro perfecto', level: 'B2', order: 16, units: [42], mood: 'compuesto' },
  { id: 'condicional-perfecto', ja: '過去未来完了', es: 'condicional perfecto', level: 'B2', order: 17, units: [42], mood: 'compuesto' },
];

export const TENSE_BY_ID = new Map(TENSES.map((t) => [t.id, t]));

/** Grupos de tablas en las páginas de verbo, en el orden en que se muestran. */
export const TENSE_GROUPS: Array<{ title: string; ids: string[] }> = [
  { title: '直説法（indicativo）', ids: ['presente', 'preterito-indefinido', 'preterito-imperfecto', 'futuro', 'condicional'] },
  { title: '完了形（tiempos compuestos）', ids: ['preterito-perfecto', 'pluscuamperfecto', 'futuro-perfecto', 'condicional-perfecto'] },
  { title: '接続法（subjuntivo）', ids: ['subjuntivo-presente', 'subjuntivo-imperfecto-ra', 'subjuntivo-imperfecto-se', 'subjuntivo-perfecto', 'subjuntivo-pluscuamperfecto', 'subjuntivo-pluscuamperfecto-se'] },
  { title: '命令形（imperativo）', ids: ['imperativo-afirmativo', 'imperativo-negativo'] },
];

export const PERSONS = ['yo', 'tú', 'él / ella / usted', 'nosotros / nosotras', 'vosotros / vosotras', 'ellos / ellas / ustedes'];
export const PERSONS_JA = ['1人称単数', '2人称単数', '3人称単数', '1人称複数', '2人称複数', '3人称複数'];
export const VOSOTROS_INDEX = 4;

/** Formas no personales: también tienen unidad (estar + gerundio, haber + participio). */
export const NON_FINITE = {
  gerund: { ja: '現在分詞', es: 'gerundio', level: 'A1', units: [11] },
  participle: { ja: '過去分詞', es: 'participio', level: 'A2', units: [13] },
} as const;
