import type { APIRoute } from 'astro';

const pages = [
  { url: '/football/', priority: '0.8', changefreq: 'weekly' },
  { url: '/football/la-liga/', priority: '0.8', changefreq: 'weekly' },
  { url: '/football/la-liga/la-liga-guide/', priority: '0.7', changefreq: 'monthly' },
  { url: '/football/spain-national-team/', priority: '0.8', changefreq: 'weekly' },
  { url: '/football/barcelona/', priority: '0.7', changefreq: 'weekly' },
  { url: '/football/real-madrid/', priority: '0.7', changefreq: 'weekly' },
  { url: '/football/football-guide/', priority: '0.7', changefreq: 'monthly' },
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
