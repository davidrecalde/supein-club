import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeUnitSummary from './src/plugins/rehypeUnitSummary.mjs';
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
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

// Regla del curso (docs/language/curso-paso-a-paso.md, «Enlazado interno»):
// ninguna unidad publicada con menos de 5 páginas que la enlacen. Se comprueba
// sobre el HTML final, así que cuentan todos los enlaces reales (nivel, otras
// unidades, conjugador, artículos…). Las unidades en borrador no cuentan.
const MIN_INCOMING_UNIT_LINKS = 5;

function listFiles(dir, ext) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? listFiles(full, ext) : full.endsWith(ext) ? [full] : [];
  });
}

function courseLinkCheckIntegration() {
  return {
    name: 'course-link-check',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const unitFiles = listFiles('src/content/units', '.mdx');
        const published = unitFiles.flatMap((file) => {
          const fm = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
          if (!/^draft:\s*false\s*$/m.test(fm)) return [];
          return [{ unit: fm.match(/^unit:\s*(\d+)/m)?.[1], url: fm.match(/^url:\s*"([^"]+)"/m)?.[1] }];
        });
        if (published.length === 0) {
          logger.info(`Curso: 0 de ${unitFiles.length} unidades publicadas; el curso sigue oculto en producción.`);
          return;
        }
        // Decisión de David (2026-11-02): el curso no se muestra hasta estar
        // 100 % terminado. Las unidades se fusionan en borrador y se publican
        // todas a la vez; publicar solo una parte es un error.
        if (published.length < unitFiles.length) {
          const list = published.map((p) => `ユニット${p.unit}`).join(', ');
          throw new Error(`El curso se publica entero o nada: hay ${published.length} de ${unitFiles.length} unidades con draft: false (${list}).`);
        }
        const outDir = fileURLToPath(dir);
        const incoming = new Map(published.map((p) => [p.url, new Set()]));
        for (const file of listFiles(outDir, '.html')) {
          const html = readFileSync(file, 'utf8');
          const page = `/${path.relative(outDir, path.dirname(file)).split(path.sep).join('/')}/`.replace(/^\/\/$/, '/');
          for (const p of published) {
            if (page !== p.url && (html.includes(`href="${p.url}"`) || html.includes(`href="https://supein.club${p.url}"`))) {
              incoming.get(p.url).add(page);
            }
          }
        }
        const failing = published.filter((p) => incoming.get(p.url).size < MIN_INCOMING_UNIT_LINKS);
        if (failing.length > 0) {
          const list = failing.map((p) => `ユニット${p.unit} ${p.url}: ${incoming.get(p.url).size} enlaces entrantes`).join('\n  ');
          throw new Error(`Unidades publicadas con menos de ${MIN_INCOMING_UNIT_LINKS} enlaces internos entrantes:\n  ${list}`);
        }
        logger.info(`Curso: ${published.length} unidades publicadas, todas con ≥ ${MIN_INCOMING_UNIT_LINKS} enlaces entrantes.`);
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
    courseLinkCheckIntegration(),
    pagefindIntegration(),
  ],
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, {
        target: '_blank',
        rel: ['nofollow', 'noopener', 'noreferrer'],
      }],
      rehypeUnitSummary,
    ],
  },
  vite: {
    plugins: [tailwindcss()],
    define: {
      // Previews de Cloudflare Pages (rama ≠ main): muestran las unidades del curso en borrador (src/utils/units.ts).
      __SHOW_COURSE_DRAFTS__: JSON.stringify(!!process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== 'main'),
    },
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'es'],
    prefixDefaultLocale: false,
  },
});
