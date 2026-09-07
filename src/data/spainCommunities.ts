// Paleta de comunidades autónomas derivada de sus banderas reales.
// flagColor: color extraído de la bandera oficial (usado en el borde de los
//   botones de provincia en /food/spain-map/).
// legendColor: variante más clara de flagColor, usada en los puntos de la
//   leyenda del mapa — mismo tono, ligeramente aclarado para legibilidad.
// mapColor: variante pastel de flagColor, usada como relleno de las
//   provincias en el mapa SVG — más clara aún, para que el texto/las
//   etiquetas de ciudades sigan siendo legibles sobre el mapa.
// pattern/lineColor: algunas comunidades comparten un tono de bandera casi
//   idéntico (p.ej. los 5 dorados de Cataluña/Aragón/Canarias/Baleares/La
//   Rioja, o los 6 rojos de Castilla-La Mancha/País Vasco/Cantabria/
//   Madrid/Murcia/Navarra). Para esas, además del matiz ligeramente
//   desplazado, las comunidades de una sola provincia llevan un patrón
//   geométrico sutil (trama diagonal o de puntos, en lineColor) que las
//   diferencia sin romper la asociación de color con su familia.
export interface CommunityColor {
  slug: string;
  name: string;
  flagColor: string;
  legendColor: string;
  mapColor: string;
  pattern: 'hatch1' | 'hatch2' | 'dots' | null;
  lineColor: string | null;
}

export const communityColors: CommunityColor[] = [
  { slug: 'castilla-y-leon', name: 'カスティーリャ・イ・レオン', flagColor: '#6B2C5F', legendColor: '#a44e94', mapColor: '#bb93b4', pattern: null, lineColor: null },
  { slug: 'andalucia', name: 'アンダルシア', flagColor: '#0F7A3D', legendColor: '#26be68', mapColor: '#78c99b', pattern: null, lineColor: null },
  { slug: 'castilla-la-mancha', name: 'カスティーリャ・ラ・マンチャ', flagColor: '#B91C2C', legendColor: '#d95865', mapColor: '#ddafb4', pattern: null, lineColor: null },
  { slug: 'catalunya', name: 'カタルーニャ', flagColor: '#E8C200', legendColor: '#f0d54c', mapColor: '#e8dfb0', pattern: null, lineColor: null },
  { slug: 'galicia', name: 'ガリシア', flagColor: '#0090C8', legendColor: '#35bbef', mapColor: '#9dcfe3', pattern: null, lineColor: null },
  { slug: 'valencia', name: 'バレンシア州', flagColor: '#0055A4', legendColor: '#1484ec', mapColor: '#81afda', pattern: null, lineColor: null },
  { slug: 'pais-vasco', name: 'バスク地方', flagColor: '#C41E3A', legendColor: '#db8062', mapColor: '#e1c2b7', pattern: null, lineColor: null },
  { slug: 'aragon', name: 'アラゴン', flagColor: '#E8C200', legendColor: '#f0af4c', mapColor: '#e8d2b0', pattern: null, lineColor: null },
  { slug: 'extremadura', name: 'エストレマドゥーラ', flagColor: '#1A1A1A', legendColor: '#525252', mapColor: '#adadad', pattern: null, lineColor: null },
  { slug: 'canarias', name: 'カナリア諸島', flagColor: '#E0B400', legendColor: '#f0eb4b', mapColor: '#e8e6b0', pattern: null, lineColor: null },
  { slug: 'ceuta-melilla', name: 'セウタ・メリリャ（自治都市）', flagColor: '#0878B8', legendColor: '#36a6e6', mapColor: '#9ac5de', pattern: null, lineColor: null },
  { slug: 'asturias', name: 'アストゥリアス', flagColor: '#0868D8', legendColor: '#5198eb', mapColor: '#b2cae6', pattern: 'dots', lineColor: '#2065b5' },
  { slug: 'baleares', name: 'バレアレス諸島', flagColor: '#E8C200', legendColor: '#f0d54c', mapColor: '#e8dfb0', pattern: 'hatch1', lineColor: '#c2a71c' },
  { slug: 'cantabria', name: 'カンタブリア', flagColor: '#D6241D', legendColor: '#dd645f', mapColor: '#e1b8b7', pattern: 'hatch2', lineColor: '#b73732' },
  { slug: 'la-rioja', name: 'ラ・リオハ', flagColor: '#E0B400', legendColor: '#f0d04b', mapColor: '#e8ddb0', pattern: 'dots', lineColor: '#bb9c1b' },
  { slug: 'madrid', name: 'マドリード州', flagColor: '#C8102E', legendColor: '#e3518e', mapColor: '#e2aec3', pattern: null, lineColor: null },
  { slug: 'murcia', name: 'ムルシア', flagColor: '#7A1220', legendColor: '#bd2b3e', mapColor: '#c87c86', pattern: null, lineColor: null },
  { slug: 'navarra', name: 'ナバラ', flagColor: '#C81818', legendColor: '#df5d5d', mapColor: '#e2b6b6', pattern: 'hatch1', lineColor: '#aa2c2c' },
];

export const communityColorMap: Record<string, CommunityColor> = Object.fromEntries(
  communityColors.map((c) => [c.slug, c])
);

// Provincias (código ISO usado en el SVG) agrupadas por comunidad.
export const communityProvinceCodes: Record<string, string[]> = {
  'andalucia': ['ES-AL', 'ES-CA', 'ES-CO', 'ES-GR', 'ES-H', 'ES-J', 'ES-MA', 'ES-SE'],
  'aragon': ['ES-HU', 'ES-TE', 'ES-Z'],
  'asturias': ['ES-O'],
  'baleares': ['ES-PM'],
  'canarias': ['ES-GC', 'ES-TF'],
  'cantabria': ['ES-S'],
  'castilla-la-mancha': ['ES-AB', 'ES-CR', 'ES-CU', 'ES-GU', 'ES-TO'],
  'castilla-y-leon': ['ES-AV', 'ES-BU', 'ES-LE', 'ES-P', 'ES-SA', 'ES-SG', 'ES-SO', 'ES-VA', 'ES-ZA'],
  'catalunya': ['ES-B', 'ES-GI', 'ES-L', 'ES-T'],
  'extremadura': ['ES-BA', 'ES-CC'],
  'galicia': ['ES-C', 'ES-LU', 'ES-OR', 'ES-PO'],
  'la-rioja': ['ES-LO'],
  'madrid': ['ES-M'],
  'murcia': ['ES-MU'],
  'navarra': ['ES-NA'],
  'pais-vasco': ['ES-BI', 'ES-SS', 'ES-VI'],
  'valencia': ['ES-A', 'ES-CS', 'ES-V'],
  'ceuta-melilla': ['ES-CE', 'ES-ML'],
};
