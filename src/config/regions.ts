export interface RegionConfig {
  slug: string;
  label: string;
  h1: string;
  /** Título corto (≤32 caracteres) para <title>/SERP cuando h1 es más largo. Si se omite, se usa h1. */
  metaTitle?: string;
  /** Valor exacto usado en el campo `region` de la colección spain-map (japonés) — para hacer el cruce por nombre. */
  spainMapLabel: string;
  /** slug usado en src/data/spainCommunities.ts (bandera + color de marca) — no siempre coincide con `slug` (ej. "cataluna" aquí vs. "catalunya" allí). */
  communitySlug: string;
  capital: string;
  provinceCount: number;
  population: string;
  culturalHighlight: string;
  intro: string;
}

/**
 * Regiones con contenido real ya publicado en al menos dos pilares (además
 * de spain-map, que cubre las 17 comunidades autónomas). El resto de
 * comunidades ya tienen sus provincias en spain-map pero no tienen aún
 * artículo de fútbol/viaje/vivir propio — se añadirán aquí a medida que
 * se publique contenido para ellas.
 */
export const regions: RegionConfig[] = [
  {
    slug: 'andalucia',
    label: 'アンダルシア',
    h1: 'アンダルシア地方完全ガイド｜料理・サッカー・暮らしから知る南スペイン',
    metaTitle: 'アンダルシア地方完全ガイド｜南スペインを知る',
    spainMapLabel: 'アンダルシア州',
    communitySlug: 'andalucia',
    capital: 'セビリア',
    provinceCount: 8,
    population: '約840万人',
    culturalHighlight: 'フラメンコ',
    intro: 'アンダルシアは、スペイン南部に広がる8つの県からなる自治州です。イスラム王朝の統治が800年近く続いた歴史を持ち、グラナダのアルハンブラ宮殿やコルドバのメスキータなど、キリスト教とイスラム文化が重なり合う独特の街並みが今も残ります。フラメンコ発祥の地としても知られ、情熱的な歌と踊りの文化は今もセビリアやヘレスの路地に息づいています。太陽の日差しが強く、夏は40℃を超えることも珍しくありません。白い村（プエブロス・ブランコス）と呼ばれる、真っ白な壁の家々が丘に連なる景観も、このアンダルシアならではの光景です。',
  },
  {
    slug: 'cataluna',
    label: 'カタルーニャ',
    h1: 'カタルーニャ地方完全ガイド｜バルセロナと地中海文化を知る',
    spainMapLabel: 'カタルーニャ州',
    communitySlug: 'catalunya',
    capital: 'バルセロナ',
    provinceCount: 4,
    population: '約780万人',
    culturalHighlight: 'モデルニスモ建築',
    intro: 'カタルーニャは、スペイン北東部に位置し、地中海に面した自治州です。州都バルセロナは、ガウディの建築群やサグラダ・ファミリアで世界的に知られる観光都市であると同時に、独自の言語（カタルーニャ語）と文化的アイデンティティを持つ地域でもあります。フランスとの国境に接するピレネー山脈から地中海沿岸のリゾート地コスタ・ブラバまで、変化に富んだ自然も魅力です。サン・ジョルディの日や火祭りのようなユニークな伝統行事、そしてFCバルセロナに象徴されるサッカー文化も、この地方を語る上で欠かせません。',
  },
  {
    slug: 'pais-vasco',
    label: 'バスク',
    h1: 'バスク地方完全ガイド｜美食とサッカー文化を知る北スペイン',
    spainMapLabel: 'バスク州',
    communitySlug: 'pais-vasco',
    capital: 'ビトリア＝ガステイス',
    provinceCount: 3,
    population: '約220万人',
    culturalHighlight: 'ピンチョス文化',
    intro: 'バスク地方は、スペイン北部からフランスにまたがる独自の文化圏です。スペイン語とは系統の異なるバスク語（エウスカラ）が今も話され、独自の伝統と強いアイデンティティを持つ地域として知られています。ビルバオのグッゲンハイム美術館に代表される現代建築、サン・セバスティアンの美食文化（ピンチョス、ミシュラン星付きレストランの密度は世界屈指）、そしてアスレティック・ビルバオやレアル・ソシエダに代表される情熱的なサッカー文化まで、他のスペインの地方とは一線を画す個性を持っています。',
  },
  {
    slug: 'comunidad-valenciana',
    label: 'バレンシア',
    h1: 'バレンシア地方完全ガイド｜パエリア発祥の地中海文化を知る',
    spainMapLabel: 'バレンシア州',
    communitySlug: 'valencia',
    capital: 'バレンシア',
    provinceCount: 3,
    population: '約520万人',
    culturalHighlight: 'パエリア発祥地',
    intro: 'バレンシア州は、スペイン東部の地中海沿岸に広がる自治州です。スペインを代表する料理パエリアの発祥地として知られ、稲作が盛んなアルブフェラ湖周辺は今もパエリア用の米の産地です。州都バレンシアは、未来的な建築群「芸術科学都市」と旧市街が同居する街並みが特徴で、3月に開催される火祭り（ラス・ファジャス）は世界的にも有名な伝統行事です。独自の言語バレンシア語（カタルーニャ語の一方言とされる）が話されるほか、バレンシアCFやビジャレアルCFなど、サッカーの強豪クラブを複数抱える地域でもあります。',
  },
  {
    slug: 'madrid',
    label: 'マドリード',
    h1: 'マドリード州完全ガイド｜スペインの首都と中央部を知る',
    spainMapLabel: 'マドリード州',
    communitySlug: 'madrid',
    capital: 'マドリード',
    provinceCount: 1,
    population: '約690万人',
    culturalHighlight: '王宮とプラド美術館',
    intro: 'マドリード州は、スペインのほぼ中央に位置する首都圏です。標高600メートルを超える高地にあり、夏は暑く冬は冷え込む大陸性気候が特徴です。州都マドリードは、プラド美術館やレイナ・ソフィア美術館など世界屈指の美術館が集まる文化都市であると同時に、レアル・マドリードとアトレティコ・マドリードという二大サッカークラブの本拠地でもあります。スペイン全土から人が集まる政治・経済の中心地であるため、特定の地方色よりも「スペインの縮図」としての多様性が魅力の地域です。',
  },
  {
    slug: 'castilla-y-leon',
    label: 'カスティーリャ・イ・レオン',
    h1: 'カスティーリャ・イ・レオン地方完全ガイド｜中世スペインの面影を知る',
    metaTitle: 'カスティーリャ・イ・レオン地方ガイド',
    spainMapLabel: 'カスティーリャ・イ・レオン州',
    communitySlug: 'castilla-y-leon',
    capital: 'バリャドリード',
    provinceCount: 9,
    population: '約230万人',
    culturalHighlight: '中世の街並み',
    intro: 'カスティーリャ・イ・レオンは、スペイン北西部に広がる、国内最大の面積を持つ自治州です。9つの県からなり、サラマンカの大学都市、セゴビアのローマ水道橋、レオンのステンドグラスなど、中世スペインの面影を色濃く残す街が点在しています。乾燥した高原地帯（メセタ）が広がる内陸性気候で、はっきりとした四季があるのも特徴です。カスティーリャ語（標準スペイン語）発祥の地とされ、スペイン語の歴史を語る上でも重要な地方です。',
  },
  {
    slug: 'extremadura',
    label: 'エストレマドゥーラ',
    h1: 'エストレマドゥーラ地方完全ガイド｜生ハムと歴史遺産を知る',
    spainMapLabel: 'エストレマドゥーラ州',
    communitySlug: 'extremadura',
    capital: 'メリダ',
    provinceCount: 2,
    population: '約106万人',
    culturalHighlight: 'イベリコ豚生ハム',
    intro: 'エストレマドゥーラは、スペイン南西部、ポルトガルと国境を接する自治州です。カセレスとバダホスの2県からなり、人口密度が低く、開発が抑えられたことで手つかずの自然と歴史遺産が数多く残されています。メリダにはローマ帝国時代の劇場や水道橋が今も残り、世界遺産に登録されています。ドングリを食べて育つイベリコ豚の放牧地（デエサ）が広がることで知られ、スペイン最高級とされる生ハムの主要産地のひとつです。大航海時代にアメリカ大陸へ渡った征服者たちの多くもこの地方の出身でした。',
  },
  {
    slug: 'galicia',
    label: 'ガリシア',
    h1: 'ガリシア地方完全ガイド｜巡礼の地と海の幸を知る北西スペイン',
    spainMapLabel: 'ガリシア州',
    communitySlug: 'galicia',
    capital: 'サンティアゴ・デ・コンポステーラ',
    provinceCount: 4,
    population: '約270万人',
    culturalHighlight: 'サンティアゴ巡礼路',
    intro: 'ガリシアは、スペイン北西部、大西洋に面した自治州です。ケルト文化の影響を色濃く残し、独自の言語ガリシア語（ポルトガル語に近い）が話されています。世界的な巡礼地サンティアゴ・デ・コンポステーラを擁し、「聖ヤコブの道」を歩く巡礼者が世界中から訪れます。リアス式海岸が続く海岸線は新鮮な魚介の宝庫で、タコ料理（プルポ・ア・フェイラ）や白ワイン「アルバリーニョ」の産地としても知られています。スペイン内陸部とは異なる、緑豊かで雨の多い海洋性気候も特徴です。',
  },
  {
    slug: 'aragon',
    label: 'アラゴン',
    h1: 'アラゴン地方完全ガイド｜ピレネーと中世の街並みを知る',
    spainMapLabel: 'アラゴン州',
    communitySlug: 'aragon',
    capital: 'サラゴサ',
    provinceCount: 3,
    population: '約133万人',
    culturalHighlight: 'ピレネー山脈とホタ',
    intro: 'アラゴンは、スペイン北東部、フランスと国境を接する自治州です。ウエスカ、テルエル、サラゴサの3県からなり、北部にはピレネー山脈の雄大な自然が広がります。州都サラゴサは、ムデハル様式の大聖堂やピラール聖母を祀る教会で知られる歴史都市です。かつてアラゴン王国として地中海に広く勢力を伸ばした歴史を持ち、情熱的な民族舞踊「ホタ」もこの地方の象徴です。テルエル県には中世の街並みが残る世界遺産の街も点在しています。',
  },
  {
    slug: 'castilla-la-mancha',
    label: 'カスティーリャ・ラ・マンチャ',
    h1: 'カスティーリャ・ラ・マンチャ地方完全ガイド｜ドン・キホーテの舞台を知る',
    metaTitle: 'カスティーリャ・ラ・マンチャ地方ガイド',
    spainMapLabel: 'カスティーリャ・ラ・マンチャ州',
    communitySlug: 'castilla-la-mancha',
    capital: 'トレド',
    provinceCount: 5,
    population: '約205万人',
    culturalHighlight: 'ドン・キホーテの舞台',
    intro: 'カスティーリャ・ラ・マンチャは、スペイン中央部に広がる自治州で、アルバセテ、シウダ・レアル、クエンカ、グアダラハラ、トレドの5県からなります。セルバンテスの小説「ドン・キホーテ」の舞台として知られ、県内には小説に登場する風車群が今も残ります。州都トレドは、イスラム・ユダヤ・キリスト教の3つの文化が共存してきた古都として世界遺産に登録されています。広大な乾燥台地（メセタ）が続く内陸性気候で、サフランの産地としても有名です。',
  },
  {
    slug: 'canarias',
    label: 'カナリア諸島',
    h1: 'カナリア諸島完全ガイド｜火山と常夏の島々を知る',
    spainMapLabel: 'カナリア諸島州',
    communitySlug: 'canarias',
    capital: 'ラス・パルマス・デ・グラン・カナリア／サンタ・クルス・デ・テネリフェ',
    provinceCount: 2,
    population: '約220万人',
    culturalHighlight: '火山とテイデ山',
    intro: 'カナリア諸島は、アフリカ大陸沖の大西洋に浮かぶ火山群島で、ラス・パルマス県とサンタ・クルス・デ・テネリフェ県の2県からなる自治州です。スペイン最高峰のテイデ山（テネリフェ島）をはじめ、火山が生み出した独特の景観が広がり、一年を通じて温暖な「常夏の島」として知られています。先住民グアンチェ族の文化的痕跡も残り、ヨーロッパとアフリカの文化が交差する独自の雰囲気を持っています。バナナやワインの産地としても知られています。',
  },
  {
    slug: 'la-rioja',
    label: 'ラ・リオハ',
    h1: 'ラ・リオハ地方完全ガイド｜スペイン最高峰のワイン産地を知る',
    spainMapLabel: 'ラ・リオハ州',
    communitySlug: 'la-rioja',
    capital: 'ログローニョ',
    provinceCount: 1,
    population: '約32万人',
    culturalHighlight: 'リオハワイン',
    intro: 'ラ・リオハは、スペイン北部に位置する単県州で、スペインを代表するワイン産地として世界的に知られています。D.O.Ca（最高格付け）を持つ「リオハワイン」の産地であり、県内には伝統的なボデガから建築家が手がけた近代的なワイナリーまで数多く点在しています。州都ログローニョのラウレル通りは、ピンチョスとワインを楽しむバル巡りの名所です。エブロ川流域の肥沃な土地が、ブドウ栽培に適した気候を育んでいます。',
  },
  {
    slug: 'murcia',
    label: 'ムルシア',
    h1: 'ムルシア地方完全ガイド｜ヨーロッパの菜園を知る地中海の州',
    spainMapLabel: 'ムルシア州',
    communitySlug: 'murcia',
    capital: 'ムルシア',
    provinceCount: 1,
    population: '約150万人',
    culturalHighlight: 'ウエルタ（野菜畑）',
    intro: 'ムルシアは、スペイン南東部の地中海に面した単県州です。灌漑農業が発達した肥沃な農地「ウエルタ」が広がり、「ヨーロッパの菜園」とも呼ばれるほど新鮮な野菜に恵まれています。州都も同名のムルシアで、バロック様式の大聖堂を中心とした歴史的な街並みが残ります。地中海性気候に恵まれ、一年を通じて温暖な気候が続くことから、野外の市場文化やテラスでの食事が盛んな地方です。',
  },
  {
    slug: 'baleares',
    label: 'バレアレス諸島',
    h1: 'バレアレス諸島完全ガイド｜地中海の楽園を知る',
    spainMapLabel: 'バレアレス諸島州',
    communitySlug: 'baleares',
    capital: 'パルマ・デ・マヨルカ',
    provinceCount: 1,
    population: '約120万人',
    culturalHighlight: '地中海のビーチリゾート',
    intro: 'バレアレス諸島は、地中海に浮かぶマヨルカ、イビサ、メノルカなどの島々からなる単県州です。透明度の高い海と美しいビーチを持つ世界的なリゾート地として知られ、州都パルマ・デ・マヨルカには中世のゴシック様式の大聖堂が残ります。イビサ島は国際的なクラブシーンの中心地として、メノルカ島は手つかずの自然が残る静かな島として、それぞれ異なる魅力を持っています。カタルーニャ語の一方言であるマヨルカ語が話されています。',
  },
  {
    slug: 'navarra',
    label: 'ナバラ',
    h1: 'ナバラ地方完全ガイド｜牛追い祭りと美食の地を知る',
    spainMapLabel: 'ナバラ州',
    communitySlug: 'navarra',
    capital: 'パンプローナ',
    provinceCount: 1,
    population: '約67万人',
    culturalHighlight: '牛追い祭り（サン・フェルミン祭）',
    intro: 'ナバラは、スペイン北部、フランスと国境を接する単県州です。州都パンプローナで毎年7月に開催される牛追い祭り「サン・フェルミン祭」は、世界的に知られる伝統行事です。エブロ川流域の肥沃な土地ではホワイトアスパラガスなどの野菜が栽培され、隣接するバスク地方と並ぶ美食の地としても評価されています。ピレネー山脈からワイン産地まで変化に富んだ自然を持ち、D.O.ナバラという独自のワイン産地も抱えています。',
  },
  {
    slug: 'cantabria',
    label: 'カンタブリア',
    h1: 'カンタブリア地方完全ガイド｜緑のスペインと海の幸を知る',
    spainMapLabel: 'カンタブリア州',
    communitySlug: 'cantabria',
    capital: 'サンタンデール',
    provinceCount: 1,
    population: '約58万人',
    culturalHighlight: 'アルタミラ洞窟と緑の自然',
    intro: 'カンタブリアは、スペイン北部、カンタブリア海に面した単県州です。旧石器時代の壁画で知られる世界遺産アルタミラ洞窟を擁し、人類の芸術の起源をたどれる貴重な地域です。州都サンタンデールはビーチと港町の雰囲気が共存するリゾート都市で、カンタブリア海で獲れるアンチョビなど新鮮な魚介料理が自慢です。北部特有の雨の多い気候が、山岳地方らしい豆と肉の煮込み料理「コシード・モンタニェス」などの郷土料理を育んできました。',
  },
  {
    slug: 'asturias',
    label: 'アストゥリアス',
    h1: 'アストゥリアス地方完全ガイド｜シドラと緑の自然を知る',
    spainMapLabel: 'アストゥリアス州',
    communitySlug: 'asturias',
    capital: 'オビエド',
    provinceCount: 1,
    population: '約100万人',
    culturalHighlight: 'シドラ（りんご酒）と緑の自然',
    intro: 'アストゥリアスは、スペイン北部、カンタブリア海に面した単県州です。「緑のスペイン」と呼ばれるほど雨が多く緑豊かな気候を持ち、ピコス・デ・エウロパ山脈の雄大な自然が広がります。りんご酒「シドラ」の一大産地として知られ、高い位置からグラスに注ぐ独特の作法「エスカンシアール」が地元の酒場文化に根付いています。州都オビエドはプレ・ロマネスク様式の教会群で世界遺産に登録され、レコンキスタ発祥の地としても歴史的に重要な地方です。',
  },
];

export function getRegion(slug: string): RegionConfig | undefined {
  return regions.find((r) => r.slug === slug);
}
