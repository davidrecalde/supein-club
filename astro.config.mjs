import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

// Categorías vacías o canibalizadas por un pilar dominante, marcadas
// noindex,follow en el PR #8 — se excluyen también del sitemap para no
// contradecir esa señal.
const NOINDEX_PATHS = [
  '/culture/facts/',
  '/culture/flamenco/',
  '/culture/history/',
  '/culture/traditions/',
  '/food/olive-oil/',
  '/food/restaurants-osaka/',
  '/food/restaurants-tokyo/',
  '/food/spanish-wine/',
  '/food/tapas/',
  '/football/barcelona/',
  '/football/football-guide/',
  '/football/la-liga/',
  '/football/real-madrid/',
  '/football/spain-national-team/',
  '/language/lesson-price/',
  '/language/lessons-tokyo/',
  '/language/online-lessons/',
  '/language/pronunciation/',
  '/language/self-study/',
  '/language/spanish-apps/',
  '/language/spanish-books/',
  '/language/spanish-phrases/',
  '/living/language-school/',
  '/living/spain-visa/',
  '/living/student-visa/',
  '/living/study-cost/',
  '/living/study-spain/',
  '/living/university/',
  '/living/work-in-spain/',
  '/living/work-visa/',
  '/living/working-holiday/',
  '/travel/andalusia/',
  '/travel/barcelona/',
  '/travel/best-season/',
  '/travel/canarias/',
  '/travel/ibiza/',
  '/travel/itineraries/',
  '/travel/madrid/',
  '/travel/spain-flights/',
  '/travel/spain-hotels/',
];

export default defineConfig({
  site: 'https://supein.club',
  output: 'static',
  adapter: cloudflare(),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !NOINDEX_PATHS.some((path) => page.endsWith(path)),
    }),
  ],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, {
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer'],
      }],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'es'],
    prefixDefaultLocale: false,
  },
});
