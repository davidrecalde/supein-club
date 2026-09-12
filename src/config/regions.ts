export interface RegionConfig {
  slug: string;
  label: string;
  h1: string;
  /** Valor exacto usado en el campo `region` de la colección spain-map (japonés) — para hacer el cruce por nombre. */
  spainMapLabel: string;
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
    spainMapLabel: 'アンダルシア州',
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
    spainMapLabel: 'カスティーリャ・イ・レオン州',
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
    capital: 'サンティアゴ・デ・コンポステーラ',
    provinceCount: 4,
    population: '約270万人',
    culturalHighlight: 'サンティアゴ巡礼路',
    intro: 'ガリシアは、スペイン北西部、大西洋に面した自治州です。ケルト文化の影響を色濃く残し、独自の言語ガリシア語（ポルトガル語に近い）が話されています。世界的な巡礼地サンティアゴ・デ・コンポステーラを擁し、「聖ヤコブの道」を歩く巡礼者が世界中から訪れます。リアス式海岸が続く海岸線は新鮮な魚介の宝庫で、タコ料理（プルポ・ア・フェイラ）や白ワイン「アルバリーニョ」の産地としても知られています。スペイン内陸部とは異なる、緑豊かで雨の多い海洋性気候も特徴です。',
  },
];

export function getRegion(slug: string): RegionConfig | undefined {
  return regions.find((r) => r.slug === slug);
}
