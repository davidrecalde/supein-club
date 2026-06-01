import type { APIRoute } from 'astro';

const pages = [
  { url: '/language/', priority: '1.0', changefreq: 'weekly' },
  { url: '/language/learn-spanish/', priority: '0.9', changefreq: 'monthly' },
  { url: '/language/learn-spanish/spanish-for-beginners/', priority: '0.8', changefreq: 'monthly' },
  { url: '/language/spanish-grammar/', priority: '0.8', changefreq: 'monthly' },
  { url: '/language/spanish-grammar/verb-conjugation/', priority: '0.7', changefreq: 'monthly' },
  { url: '/language/pronunciation/', priority: '0.8', changefreq: 'monthly' },
  { url: '/language/self-study/', priority: '0.8', changefreq: 'monthly' },
  { url: '/language/lessons-tokyo/', priority: '0.9', changefreq: 'monthly' },
  { url: '/language/online-lessons/', priority: '0.8', changefreq: 'monthly' },
  { url: '/language/lesson-price/', priority: '0.8', changefreq: 'monthly' },
  { url: '/language/spanish-phrases/', priority: '0.7', changefreq: 'monthly' },
  { url: '/language/spanish-apps/', priority: '0.7', changefreq: 'monthly' },
  { url: '/language/spanish-books/', priority: '0.7', changefreq: 'monthly' },
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
