import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];

  const sitemaps = [
    { url: 'https://supein.club/sitemap-travel.xml',   lastmod: today },
    { url: 'https://supein.club/sitemap-food.xml',     lastmod: today },
    { url: 'https://supein.club/sitemap-language.xml', lastmod: today },
    { url: 'https://supein.club/sitemap-living.xml',   lastmod: today },
    { url: 'https://supein.club/sitemap-culture.xml',  lastmod: today },
    { url: 'https://supein.club/sitemap-football.xml', lastmod: today },
    { url: 'https://supein.club/sitemap-club.xml',     lastmod: today },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(s => `  <sitemap>
    <loc>${s.url}</loc>
    <lastmod>${s.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
