// Resumen de un ranking CRE a partir del cuerpo MDX de su artículo: los datos de cada <CRECard>
// van en línea en `items` (ver CLAUDE.md, «Componente CRE Ranking»). Lo usa el hub de cada
// provincia para mostrar el top 3 de sus rankings sin duplicar los datos.
export interface CreItemSummary {
  nameJa: string;
  criScore: number;
  rating: number;
}

export function creSummary(body: string): { count: number; maxScore: number; top: CreItemSummary[] } {
  const items: CreItemSummary[] = [];
  // Cada item empieza por «position: N»; su primer «rating» es el del local (los de las reseñas van después).
  for (const block of body.split(/\bposition:\s*\d+\s*,/).slice(1)) {
    const nameJa = block.match(/\bnameJa:\s*"([^"]+)"/)?.[1];
    const criScore = Number(block.match(/\bcriScore:\s*(\d+(?:\.\d+)?)/)?.[1]);
    const rating = Number(block.match(/\brating:\s*(\d+(?:\.\d+)?)/)?.[1]);
    if (nameJa && criScore) items.push({ nameJa, criScore, rating });
  }
  return { count: items.length, maxScore: Math.max(0, ...items.map((i) => i.criScore)), top: items.slice(0, 3) };
}
