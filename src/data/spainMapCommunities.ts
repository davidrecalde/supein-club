// Las 17 comunidades autónomas (más Ceuta y Melilla) del hub /food/spain-map/: provincias, frase
// gastronómica y provincia cuya foto (heroImage de spain-map) representa a la comunidad en su
// banner. El color sale de src/data/spainCommunities.ts. Orden: de más a menos provincias.
export interface MapCommunity {
  slug: string;
  name: string;
  flags: string[];
  provinces: string[];
  photo: string;
  food: string;
}

export const MAP_COMMUNITIES: MapCommunity[] = [
  { slug: 'castilla-y-leon', name: 'カスティーリャ・イ・レオン', flags: ['castilla-y-leon'], provinces: ['avila', 'burgos', 'leon', 'palencia', 'salamanca', 'segovia', 'soria', 'valladolid', 'zamora'], photo: 'segovia', food: '仔羊・子豚のアサードと、リベラ・デル・ドゥエロの赤ワイン' },
  { slug: 'andalucia', name: 'アンダルシア', flags: ['andalucia'], provinces: ['almeria', 'cadiz', 'cordoba', 'granada', 'huelva', 'jaen', 'malaga', 'sevilla'], photo: 'granada', food: 'タパス文化の本場。揚げ物とシェリー酒、ガスパチョ' },
  { slug: 'castilla-la-mancha', name: 'カスティーリャ・ラ・マンチャ', flags: ['castilla-la-mancha'], provinces: ['albacete', 'ciudad-real', 'cuenca', 'guadalajara', 'toledo'], photo: 'toledo', food: 'マンチェゴチーズとサフラン、ドン・キホーテの台所' },
  { slug: 'catalunya', name: 'カタルーニャ', flags: ['catalunya'], provinces: ['barcelona', 'gerona', 'lerida', 'tarragona'], photo: 'barcelona', food: '市場文化と地中海料理、パン・コン・トマテとカバ' },
  { slug: 'galicia', name: 'ガリシア', flags: ['galicia'], provinces: ['la-coruna', 'lugo', 'orense', 'pontevedra'], photo: 'la-coruna', food: 'タコとマリスコ（魚介）、アルバリーニョワイン' },
  { slug: 'valencia', name: 'バレンシア州', flags: ['valencia'], provinces: ['alicante', 'castellon', 'valencia'], photo: 'valencia', food: 'パエリア発祥の地。米料理とオルチャタ' },
  { slug: 'pais-vasco', name: 'バスク地方', flags: ['pais-vasco'], provinces: ['vizcaya', 'guipuzcoa', 'alava'], photo: 'guipuzcoa', food: 'ピンチョスと美食倶楽部、ミシュランの聖地' },
  { slug: 'aragon', name: 'アラゴン', flags: ['aragon'], provinces: ['huesca', 'teruel', 'zaragoza'], photo: 'zaragoza', food: '仔羊テルナスコとテルエルの生ハム' },
  { slug: 'extremadura', name: 'エストレマドゥーラ', flags: ['extremadura'], provinces: ['badajoz', 'caceres'], photo: 'caceres', food: 'イベリコ生ハムとトルタ・デル・カサール' },
  { slug: 'canarias', name: 'カナリア諸島', flags: ['canarias'], provinces: ['las-palmas', 'santa-cruz-de-tenerife'], photo: 'santa-cruz-de-tenerife', food: 'パパス・アルガダスとモホ、火山の恵み' },
  { slug: 'ceuta-melilla', name: 'セウタ・メリリャ', flags: ['ceuta', 'melilla'], provinces: ['ceuta', 'melilla'], photo: 'ceuta', food: 'スペインと北アフリカが出会う食卓' },
  { slug: 'asturias', name: 'アストゥリアス', flags: ['asturias'], provinces: ['asturias'], photo: 'asturias', food: 'シドラ（りんご酒）とファバダ' },
  { slug: 'baleares', name: 'バレアレス諸島', flags: ['baleares'], provinces: ['islas-baleares'], photo: 'islas-baleares', food: 'エンサイマダとソブラサーダ' },
  { slug: 'cantabria', name: 'カンタブリア', flags: ['cantabria'], provinces: ['cantabria'], photo: 'cantabria', food: 'カンタブリア海のアンチョビ' },
  { slug: 'la-rioja', name: 'ラ・リオハ', flags: ['la-rioja'], provinces: ['la-rioja'], photo: 'la-rioja', food: 'スペインを代表するワイン産地' },
  { slug: 'madrid', name: 'マドリード州', flags: ['madrid'], provinces: ['madrid'], photo: 'madrid', food: 'コシードとバル巡り、各地の味が集まる首都' },
  { slug: 'murcia', name: 'ムルシア', flags: ['murcia'], provinces: ['murcia'], photo: 'murcia', food: 'ウエルタ（野菜畑）の恵みと米料理' },
  { slug: 'navarra', name: 'ナバラ', flags: ['navarra'], provinces: ['navarra'], photo: 'navarra', food: 'ホワイトアスパラガスとピキーリョ' },
];
