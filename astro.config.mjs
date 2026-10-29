import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { NOINDEX_PATHS } from './src/config/noindexPaths.ts';

// Genera el índice de búsqueda de Pagefind al final del build, enganchado
// al propio ciclo de vida de Astro (astro:build:done) en vez de depender
// de que el comando de build externo sea exactamente "npm run build" —
// el panel de Cloudflare Pages puede tener configurado otro comando
// (ej. "astro build" a secas) que ignoraría el paso encadenado en
// package.json. Así se ejecuta siempre, sea cual sea el comando externo.
function pagefindIntegration() {
  return {
    name: 'pagefind-index',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        logger.info(`Generando índice de búsqueda de Pagefind en ${outDir}...`);
        execFileSync('npx', ['--yes', 'pagefind', '--site', outDir, '--output-subdir', 'pagefind'], {
          stdio: 'inherit',
          shell: process.platform === 'win32',
        });
      },
    },
  };
}

export default defineConfig({
  site: 'https://supein.club',
  output: 'static',
  adapter: cloudflare({ imageService: 'passthrough' }),
  integrations: [
    mdx(),
    sitemap({
      // Las páginas 2+ de /articles/ (paginación del listado de novedades)
      // son noindex,follow por diseño (ver src/pages/articles/[...page].astro)
      // pero no son una ruta estática, así que no pueden vivir en
      // NOINDEX_PATHS — se filtran aparte con esta regex.
      filter: (page) =>
        !NOINDEX_PATHS.some((path) => page.endsWith(path)) &&
        !/\/articles\/\d+\/$/.test(page),
    }),
    pagefindIntegration(),
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
