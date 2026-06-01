import type { APIRoute } from 'astro';

const pages = [
  { url: '/culture/', priority: '0.8', changefreq: 'weekly' },
  { url: '/culture/flamenco/', priority: '0.7', changefreq: 'monthly' },
  { url: '/culture/history/', priority: '0.7', changefreq: 'monthly' },
  { url: '/culture/traditions/', priority: '0.7', changefreq: 'monthly' },
  { url: '/culture/facts/', priority: '0.7', changefreq: 'monthly' },
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
