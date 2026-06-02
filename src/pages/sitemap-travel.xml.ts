import type { APIRoute } from 'astro';

const pages = [
  { url: '/travel/', priority: '1.0', changefreq: 'weekly' },
  { url: '/travel/spain-tours/', priority: '0.9', changefreq: 'weekly' },
  { url: '/travel/spain-tours/budget-spain-tours/', priority: '0.8', changefreq: 'monthly' },
  { url: '/travel/spain-tours/spain-tour-1week/', priority: '0.8', changefreq: 'monthly' },
  { url: '/travel/barcelona/', priority: '0.9', changefreq: 'weekly' },
  { url: '/travel/barcelona/sagrada-familia-guide/', priority: '0.8', changefreq: 'monthly' },
  { url: '/travel/barcelona/sagrada-familia-jesus-tower-completed/', priority: '0.9', changefreq: 'monthly' },
  { url: '/travel/madrid/', priority: '0.9', changefreq: 'weekly' },
  { url: '/travel/andalusia/', priority: '0.8', changefreq: 'weekly' },
  { url: '/travel/ibiza/', priority: '0.7', changefreq: 'monthly' },
  { url: '/travel/canarias/', priority: '0.7', changefreq: 'monthly' },
  { url: '/travel/spain-flights/', priority: '0.8', changefreq: 'weekly' },
  { url: '/travel/spain-hotels/', priority: '0.8', changefreq: 'weekly' },
  { url: '/travel/travel-cost/', priority: '0.8', changefreq: 'monthly' },
  { url: '/travel/travel-cost/spain-budget-solo/', priority: '0.7', changefreq: 'monthly' },
  { url: '/travel/itineraries/', priority: '0.8', changefreq: 'monthly' },
  { url: '/travel/best-season/', priority: '0.7', changefreq: 'monthly' },
];

export const GET: APIRoute = () => {
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://supein.club${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' }
  });
};
