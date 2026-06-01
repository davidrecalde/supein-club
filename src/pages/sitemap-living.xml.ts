import type { APIRoute } from 'astro';

const pages = [
  { url: '/living/', priority: '1.0', changefreq: 'weekly' },
  { url: '/living/study-spain/', priority: '0.8', changefreq: 'monthly' },
  { url: '/living/language-school/', priority: '0.8', changefreq: 'monthly' },
  { url: '/living/university/', priority: '0.7', changefreq: 'monthly' },
  { url: '/living/study-cost/', priority: '0.8', changefreq: 'monthly' },
  { url: '/living/spain-visa/', priority: '0.8', changefreq: 'monthly' },
  { url: '/living/student-visa/', priority: '0.8', changefreq: 'monthly' },
  { url: '/living/student-visa/student-visa-application/', priority: '0.7', changefreq: 'monthly' },
  { url: '/living/work-visa/', priority: '0.8', changefreq: 'monthly' },
  { url: '/living/working-holiday/', priority: '0.8', changefreq: 'monthly' },
  { url: '/living/working-holiday/working-holiday-conditions/', priority: '0.7', changefreq: 'monthly' },
  { url: '/living/work-in-spain/', priority: '0.7', changefreq: 'monthly' },
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
