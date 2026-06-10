import type { APIRoute } from 'astro';

const pages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about-us/', priority: '0.9', changefreq: 'monthly' },
  { url: '/about-us/team/', priority: '0.8', changefreq: 'monthly' },
  { url: '/about-us/team/david-recalde/', priority: '0.8', changefreq: 'monthly' },
  { url: '/about-us/team/raquel-simancas/', priority: '0.8', changefreq: 'monthly' },
  { url: '/about-us/team/yoshimi-ito/', priority: '0.7', changefreq: 'monthly' },
  { url: '/about-us/team/juan-carreras/', priority: '0.7', changefreq: 'monthly' },
  { url: '/about-us/cre/', priority: '0.7', changefreq: 'monthly' },
  { url: '/events/', priority: '0.9', changefreq: 'weekly' },
  { url: '/community/', priority: '0.8', changefreq: 'monthly' },
  { url: '/sponsors/', priority: '0.7', changefreq: 'monthly' },
  { url: '/newsletter/', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact/', priority: '0.8', changefreq: 'monthly' },
  { url: '/newsroom/', priority: '0.8', changefreq: 'weekly' },
  { url: '/newsroom/press-kit/', priority: '0.7', changefreq: 'monthly' },
  { url: '/newsroom/2026-05-30-8th-anniversary-el-tragon-tokyo/', priority: '0.8', changefreq: 'monthly' },
  { url: '/newsroom/2026-06-01-supein-club-nuevo-diseno-web/', priority: '0.8', changefreq: 'monthly' },
  { url: '/newsroom/2026-06-05-paella-tapas-festival-hibiya/', priority: '0.8', changefreq: 'monthly' },
  { url: '/newsroom/2026-06-07-paella-tapas-festival-hibiya-tokyo/', priority: '0.8', changefreq: 'monthly' },
  { url: '/sitemap/', priority: '0.5', changefreq: 'weekly' },
  { url: '/privacy/', priority: '0.4', changefreq: 'yearly' },
  { url: '/terms/', priority: '0.4', changefreq: 'yearly' },
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
