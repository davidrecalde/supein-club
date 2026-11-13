// Redirecciones 301 de supein.club a partir de una sola fuente: src/data/redirects.txt.
//
// Problema que resuelve: en este proyecto Cloudflare Pages solo aplica las ~105 primeras reglas de
// _redirects (muy por debajo del límite documentado) y las demás devuelven 404 sin avisar. Al final
// del build:
//   1. dist/_redirects recibe las reglas con comodín y las más recientes hasta EDGE_BUDGET en total
//      (301 de verdad, en el borde de Cloudflare, sin coste de Functions);
//   2. TODAS las reglas sin comodín tienen además una página de respaldo en la URL de origen
//      (meta refresh instantáneo + canonical al destino + noindex, como las que genera Astro), de modo
//      que ninguna se queda en 404 aunque supere el cupo;
//   3. el build falla si un destino no existe, si un origen tapa una página real o si hay orígenes
//      repetidos; las cadenas (A → B → C) se resuelven al destino final.
// Va la última en astro.config.mjs para que Pagefind y course-link-check no vean las páginas de respaldo.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://supein.club';
export const EDGE_BUDGET = 100;
export const REDIRECTS_FILE = 'src/data/redirects.txt';

export function parseRedirects(text) {
  const rules = [];
  text.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.trim();
    if (!line || line.startsWith('#')) return;
    const [from, to, code = '301', ...rest] = line.split(/\s+/);
    if (!from?.startsWith('/') || !to || rest.length || !/^30[1278]$/.test(code)) {
      throw new Error(`${REDIRECTS_FILE}:${i + 1}: línea mal formada: «${line}»`);
    }
    rules.push({ from, to, code, line: i + 1, dynamic: /[*:]/.test(from) });
  });
  return rules;
}

// Sigue A → B → C hasta el destino final (como mucho 10 saltos).
export function resolveTargets(rules) {
  const bySource = new Map(rules.filter((r) => !r.dynamic).map((r) => [r.from, r]));
  const chains = [];
  for (const r of rules) {
    let to = r.to;
    for (let hops = 0; bySource.has(to) && hops < 10; hops++) to = bySource.get(to).to;
    if (to !== r.to) chains.push(`${r.from} → ${r.to} → … → ${to}`);
    r.final = to;
  }
  return chains;
}

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const fallbackPage = (from, to) => {
  const href = escapeHtml(to);
  const canonical = escapeHtml(/^https?:/.test(to) ? to : SITE + to);
  return `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<title>ページが移動しました</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${canonical}">
<meta http-equiv="refresh" content="0; url=${href}">
<script>location.replace(${JSON.stringify(to)} + location.search + location.hash)</script>
</head>
<body>
<p>このページは移動しました：<a href="${href}">${href}</a></p>
<!-- Página de respaldo de la redirección ${escapeHtml(from)} (src/data/redirects.txt) -->
</body>
</html>
`;
};

export default function redirectsIntegration() {
  return {
    name: 'supein-redirects',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const dist = fileURLToPath(dir);
        const rules = parseRedirects(readFileSync(REDIRECTS_FILE, 'utf8'));
        const errors = [];

        const seen = new Set();
        for (const r of rules) {
          if (seen.has(r.from)) errors.push(`origen repetido: ${r.from} (línea ${r.line})`);
          seen.add(r.from);
        }
        const chains = resolveTargets(rules);
        if (chains.length) logger.warn(`Cadenas resueltas al destino final (conviene actualizar ${REDIRECTS_FILE}):\n  ${chains.join('\n  ')}`);

        const isPage = (p) => {
          const clean = p.split(/[?#]/)[0];
          const target = path.join(dist, clean);
          return existsSync(path.join(target, 'index.html')) || (!clean.endsWith('/') && existsSync(target));
        };
        const statics = rules.filter((r) => !r.dynamic);
        for (const r of statics) {
          if (isPage(r.from)) errors.push(`${r.from} es una página real: la redirección la taparía (línea ${r.line})`);
          if (!/^https?:/.test(r.final) && !isPage(r.final)) errors.push(`${r.from} → ${r.final}: el destino no existe (línea ${r.line})`);
        }
        if (errors.length) throw new Error(`Redirecciones con errores en ${REDIRECTS_FILE}:\n  ${errors.join('\n  ')}`);

        // 1. Cupo del borde: todas las de comodín y las estáticas más recientes, en el orden del archivo.
        const dynamic = rules.filter((r) => r.dynamic);
        const edgeSet = new Set([...dynamic, ...statics.slice(-Math.max(0, EDGE_BUDGET - dynamic.length))]);
        const edge = rules.filter((r) => edgeSet.has(r));
        writeFileSync(
          path.join(dist, '_redirects'),
          `# Generado por src/integrations/redirects.mjs a partir de ${REDIRECTS_FILE}. No editar.\n` +
            edge.map((r) => `${r.from}    ${r.final}    ${r.code}`).join('\n') +
            '\n',
        );

        // 2. Página de respaldo para todas las estáticas.
        for (const r of statics) {
          const file = path.join(dist, r.from, 'index.html');
          mkdirSync(path.dirname(file), { recursive: true });
          writeFileSync(file, fallbackPage(r.from, r.final));
        }

        const fallbackOnly = statics.filter((r) => !edgeSet.has(r));
        logger.info(
          `${rules.length} redirecciones: ${edge.length} en dist/_redirects (cupo ${EDGE_BUDGET}, 301 en el borde) y ${statics.length} páginas de respaldo` +
            (fallbackOnly.length ? `; ${fallbackOnly.length} solo con la página de respaldo (las más antiguas).` : '.'),
        );
      },
    },
  };
}
