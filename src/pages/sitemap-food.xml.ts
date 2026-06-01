import type { APIRoute } from 'astro';

const pages = [
  { url: '/food/', priority: '1.0', changefreq: 'weekly' },
  { url: '/food/spain-map/', priority: '0.9', changefreq: 'weekly' },
  { url: '/food/madrid-restaurants/', priority: '0.9', changefreq: 'monthly' },
  { url: '/food/barcelona-restaurants/', priority: '0.9', changefreq: 'monthly' },
  { url: '/food/sevilla-restaurants/', priority: '0.8', changefreq: 'monthly' },
  { url: '/food/valencia-restaurants/', priority: '0.8', changefreq: 'monthly' },
  { url: '/food/pais-vasco-restaurants/', priority: '0.8', changefreq: 'monthly' },
  { url: '/food/paella/', priority: '0.8', changefreq: 'monthly' },
  { url: '/food/paella/seafood-paella-recipe/', priority: '0.7', changefreq: 'monthly' },
  { url: '/food/tapas/', priority: '0.8', changefreq: 'monthly' },
  { url: '/food/spanish-wine/', priority: '0.8', changefreq: 'monthly' },
  { url: '/food/olive-oil/', priority: '0.7', changefreq: 'monthly' },
  { url: '/food/souvenirs/', priority: '0.8', changefreq: 'monthly' },
  { url: '/food/souvenirs/spain-chocolate-gifts/', priority: '0.7', changefreq: 'monthly' },
  { url: '/food/restaurants-tokyo/', priority: '0.9', changefreq: 'monthly' },
  { url: '/food/restaurants-osaka/', priority: '0.8', changefreq: 'monthly' },
  { url: '/food/traveler-guide-to-spanish-cuisine-and-wine/', priority: '0.8', changefreq: 'monthly' },
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
