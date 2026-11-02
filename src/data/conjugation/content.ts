// Contenido editorial de cada página de verbo (lo que no sale del motor de
// reglas). Español peninsular; requiere revisión nativa (español y japonés)
// antes de publicar.

export interface VerbContent {
  type: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  /** Dos frases que responden solas a 「〇〇 活用」. */
  summary: string;
  examples: Array<{ es: string; ja: string }>;
  mistake: { wrong: string; right: string; note: string };
  /** Verbos que siguen el mismo modelo (sin página propia todavía: se muestran como texto). */
  similar: string[];
  notes?: string[];
  updated: string;
  youtubeId?: string;
}

export const VERB_CONTENT: Record<string, VerbContent> = {
  ser: {
    type: '不規則動詞（-er）',
    level: 'A1',
    summary: 'ser は「〜である」を表す、スペイン語でいちばんよく使われる動詞です。現在形（soy, eres, es…）も点過去（fui, fuiste, fue…）も規則から大きく外れる、最も不規則な動詞のひとつです。',
    examples: [
      { es: 'Soy japonés.', ja: '私は日本人です。' },
      { es: 'Mi hermana es profesora.', ja: '姉は教師です。' },
      { es: 'La fiesta fue muy divertida.', ja: 'パーティーはとても楽しかった。' },
    ],
    mistake: { wrong: 'Estoy japonés.', right: 'Soy japonés.', note: '国籍・職業・性格など、その人やものを特徴づけることには ser を使います。一時的な状態を表す estar と混同しないように注意しましょう。' },
    similar: [],
    notes: ['点過去は ir（行く）とまったく同じ形です（fui, fuiste, fue…）。意味は文脈で判断します。'],
    updated: '2026-11-02',
  },
  haber: {
    type: '不規則動詞（-er）・助動詞',
    level: 'A1',
    summary: 'haber は、現在完了（he comido）などの完了形を作る助動詞として使われる動詞です。3人称単数の現在形には、「〜がある・いる」を表す hay という特別な形があります。',
    examples: [
      { es: 'Hoy he comido paella.', ja: '今日はパエリアを食べました。' },
      { es: 'Hay un bar cerca de la estación.', ja: '駅の近くにバルがあります。' },
      { es: '¿Has estado en Madrid?', ja: 'マドリードに行ったことはある？' },
    ],
    mistake: { wrong: 'Hay los libros en la mesa.', right: 'Los libros están en la mesa.', note: 'hay は不特定のもの（un libro, libros）があることを言うときに使います。特定のもの（los libros）がどこにあるかを言うときは estar を使います。' },
    similar: [],
    notes: ['存在を表す「〜がある」の意味では、現在形は hay を使います（Hay un bar…）。', '命令形はほとんど使わないため、表には載せていません。'],
    updated: '2026-11-02',
  },
  estar: {
    type: '不規則動詞（-ar）',
    level: 'A1',
    summary: 'estar は「（場所に）いる・ある」や「（一時的に）〜の状態である」を表す動詞です。現在形の estoy や点過去の estuve など、いくつかの時制で不規則に変化します。',
    examples: [
      { es: 'Estoy en Tokio.', ja: '私は東京にいます。' },
      { es: '¿Cómo estás?', ja: '元気？' },
      { es: 'Ayer estuve muy cansado.', ja: '昨日はとても疲れていた。' },
    ],
    mistake: { wrong: 'Esta en casa.', right: 'Está en casa.', note: 'アクセント記号のない esta は「この」という意味の指示詞になります。estar の3人称単数は必ず está と書きます。' },
    similar: [],
    updated: '2026-11-02',
  },
  tener: {
    type: '不規則動詞（-er）',
    level: 'A1',
    summary: 'tener は「持つ」を表す動詞で、年齢（Tengo 25 años）や「〜しなければならない」（tener que）にも使います。現在形の yo が tengo、点過去が tuve になる不規則動詞です。',
    examples: [
      { es: 'Tengo dos hermanos.', ja: '兄弟が2人います。' },
      { es: 'Tengo veinticinco años.', ja: '私は25歳です。' },
      { es: 'Mañana tengo que trabajar.', ja: '明日は働かなければなりません。' },
    ],
    mistake: { wrong: 'Soy 25 años.', right: 'Tengo 25 años.', note: '年齢は「〜歳を持っている」と考えて tener で言います。日本語の「〜歳です」につられて ser を使わないように注意しましょう。' },
    similar: ['mantener', 'obtener', 'contener', 'detener'],
    updated: '2026-11-02',
  },
  hacer: {
    type: '不規則動詞（-er）',
    level: 'A1',
    summary: 'hacer は「する・作る」を表す動詞で、天気（Hace calor）や「〜前に」（hace dos días）の表現にも使います。yo の現在形が hago、点過去が hice、過去分詞が hecho になる不規則動詞です。',
    examples: [
      { es: '¿Qué haces el fin de semana?', ja: '週末は何をするの？' },
      { es: 'Hoy hace mucho calor.', ja: '今日はとても暑い。' },
      { es: 'Hice una paella con mi madre.', ja: '母とパエリアを作った。' },
    ],
    mistake: { wrong: 'Hació la cena.', right: 'Hizo la cena.', note: 'hacer の点過去の3人称単数は hizo です（c が z に変わります）。規則動詞のように -ió をつけないように注意しましょう。' },
    similar: ['deshacer', 'rehacer'],
    updated: '2026-11-02',
  },
  poder: {
    type: '語幹母音変化動詞（o→ue）・不規則動詞（-er）',
    level: 'A1',
    summary: 'poder は「〜できる・〜してもよい」を表す動詞で、後ろに動詞の原形を続けて使います。現在形では語幹の o が ue に変わり、点過去は pude になる不規則動詞です。',
    examples: [
      { es: '¿Puedo pagar con tarjeta?', ja: 'カードで払えますか？' },
      { es: 'No puedo ir mañana.', ja: '明日は行けません。' },
      { es: '¿Podría hablar más despacio?', ja: 'もう少しゆっくり話していただけますか？' },
    ],
    mistake: { wrong: '¿Podo entrar?', right: '¿Puedo entrar?', note: '現在形では、nosotros と vosotros 以外で語幹の o が ue に変わります（puedo, puedes, puede, pueden）。' },
    similar: [],
    updated: '2026-11-02',
  },
  decir: {
    type: '不規則動詞（-ir）',
    level: 'A1',
    summary: 'decir は「言う」を表す動詞です。現在形の yo が digo、点過去が dije、過去分詞が dicho になるなど、ほとんどの時制で不規則に変化します。',
    examples: [
      { es: '¿Cómo se dice esto en español?', ja: 'これはスペイン語で何と言いますか？' },
      { es: 'Mi profesor dice que es fácil.', ja: '先生は簡単だと言っています。' },
      { es: 'Me dijo la verdad.', ja: '彼は私に本当のことを言った。' },
    ],
    mistake: { wrong: 'Dijieron que sí.', right: 'Dijeron que sí.', note: '語幹が j で終わる点過去では、3人称複数が -ieron ではなく -eron になります（dijeron, trajeron）。' },
    similar: [],
    updated: '2026-11-02',
  },
  ir: {
    type: '不規則動詞（-ir）',
    level: 'A1',
    summary: 'ir は「行く」を表す動詞で、「ir a + 動詞の原形」で近い未来（〜するつもり）も表します。現在形は voy、点過去は ser と同じ fui になる、最も不規則な動詞のひとつです。',
    examples: [
      { es: 'Voy a la universidad en tren.', ja: '電車で大学に行きます。' },
      { es: 'Mañana voy a estudiar.', ja: '明日は勉強するつもりです。' },
      { es: 'El verano pasado fui a Barcelona.', ja: '去年の夏、バルセロナに行った。' },
    ],
    mistake: { wrong: 'Voy en Madrid.', right: 'Voy a Madrid.', note: '行き先を表すときは en ではなく a を使います（a と el は al になります：Voy al cine）。' },
    similar: [],
    notes: ['点過去は ser（〜である）とまったく同じ形です（fui, fuiste, fue…）。'],
    updated: '2026-11-02',
  },
  ver: {
    type: '不規則動詞（-er）',
    level: 'A1',
    summary: 'ver は「見る・会う」を表す動詞です。現在形の yo が veo、線過去が veía、過去分詞が visto になる不規則動詞です。',
    examples: [
      { es: 'Veo la televisión por la noche.', ja: '夜はテレビを見ます。' },
      { es: 'Ayer vi a Marta en la estación.', ja: '昨日、駅でマルタに会った。' },
      { es: '¿Has visto esta película?', ja: 'この映画を見たことある？' },
    ],
    mistake: { wrong: 'Ví una película.', right: 'Vi una película.', note: 'vi と vio は1音節の語なので、アクセント記号をつけません。' },
    similar: [],
    updated: '2026-11-02',
  },
  dar: {
    type: '不規則動詞（-ar）',
    level: 'A1',
    summary: 'dar は「与える・渡す」を表す動詞です。現在形の yo が doy になり、点過去では -ar 動詞なのに -er/-ir 動詞と同じ語尾（di, diste, dio…）を使う不規則動詞です。',
    examples: [
      { es: 'Te doy mi número de teléfono.', ja: '私の電話番号を教えるね。' },
      { es: 'Mis padres me dieron un regalo.', ja: '両親が私にプレゼントをくれた。' },
      { es: '¿Me das un vaso de agua?', ja: '水を1杯くれる？' },
    ],
    mistake: { wrong: 'Me daron un regalo.', right: 'Me dieron un regalo.', note: 'dar は -ar 動詞ですが、点過去では -er/-ir 動詞の語尾を使います（di, diste, dio, dimos, disteis, dieron）。' },
    similar: [],
    updated: '2026-11-02',
  },
};
