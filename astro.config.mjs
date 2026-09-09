import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

// Categorías vacías, marcadas noindex,follow en el PR #8 — se excluyen
// también del sitemap para no contradecir esa señal. Estas páginas usan
// robots condicional (index si el cluster ya tiene artículos, noindex si
// está vacío); esta lista debe reflejar el estado ACTUAL, no el de cuando
// se creó — revisar tras publicar el primer artículo de cualquier cluster
// vacío (auditoría 2026-09-09: /travel/barcelona/, /travel/madrid/ y
// /language/spanish-apps/ ya tenían contenido y se retiraron de la lista;
// /food/paella/ y /food/souvenirs/ estaban vacías pero no incluidas, se
// añadieron; /football/football-guide/ se eliminó, entrada obsoleta).
const NOINDEX_PATHS = [
  '/culture/facts/',
  '/culture/flamenco/',
  '/culture/history/',
  '/culture/traditions/',
  '/food/olive-oil/',
  '/food/paella/',
  '/food/restaurants-osaka/',
  '/food/restaurants-tokyo/',
  '/food/souvenirs/',
  '/food/spanish-wine/',
  '/food/tapas/',
  '/language/lesson-price/',
  '/language/online-lessons/',
  '/language/pronunciation/',
  '/language/self-study/',
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
  '/travel/best-season/',
  '/travel/canarias/',
  '/travel/ibiza/',
  '/travel/itineraries/',
  '/travel/spain-flights/',
  '/travel/spain-hotels/',
];

export default defineConfig({
  site: 'https://supein.club',
  output: 'static',
  adapter: cloudflare({ imageService: 'passthrough' }),
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
