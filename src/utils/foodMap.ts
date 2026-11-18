// Mapa de la スペイン美食マップ coloreado por comunidad, sin enlaces por provincia (para meterlo
// dentro de un único enlace al mapa). Lo usan los hubs /food/ y /travel/.
import { getCollection } from 'astro:content';
import { communityColorMap } from '../data/spainCommunities';
import { MAP_COMMUNITIES } from '../data/spainMapCommunities';
import { PROVINCES } from '../data/provinces';
import { communityMap } from './spainMap';

export async function foodMapPreview() {
  const provinces = await getCollection('spain-map', ({ data }) => data.draft !== true);
  const bySlug = new Map(provinces.map((p) => [p.data.province, p]));
  const svg = communityMap(Object.fromEntries(MAP_COMMUNITIES.flatMap((c) => c.provinces.filter((p) => bySlug.has(p)).map((p) => [
    PROVINCES[p]?.code,
    { slug: p, name: bySlug.get(p)!.data.provinceJa, community: c.name, color: communityColorMap[c.slug]?.mapColor ?? '#ccc' },
  ]))), { links: false });
  return { svg, bySlug, count: provinces.length };
}
