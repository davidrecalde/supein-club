// Comprueba en vivo todas las redirecciones sin comodín de src/data/redirects.txt.
//   npm run redirects:check                                         → producción (https://supein.club)
//   npm run redirects:check -- https://<rama>.supein-club.pages.dev  → un preview
// Cada origen debe responder con un 301/308 al destino final (regla en el borde) o con la página de
// respaldo que redirige al destino (meta refresh). Cualquier otra cosa, p. ej. un 404, es un fallo.
import { readFileSync } from 'node:fs';
import { REDIRECTS_FILE, parseRedirects, resolveTargets } from '../src/integrations/redirects.mjs';

const base = (process.argv[2] ?? 'https://supein.club').replace(/\/$/, '');
const rules = parseRedirects(readFileSync(REDIRECTS_FILE, 'utf8'));
resolveTargets(rules);
const statics = rules.filter((r) => !r.dynamic);

const results = { edge: 0, fallback: 0, fail: [] };
const sameTarget = (location, to) => {
  const a = new URL(location, base);
  const b = new URL(to, base);
  return a.pathname === b.pathname || a.href === b.href;
};

for (let i = 0; i < statics.length; i += 8) {
  await Promise.all(
    statics.slice(i, i + 8).map(async (r) => {
      try {
        const res = await fetch(base + r.from, { redirect: 'manual' });
        const location = res.headers.get('location');
        if ([301, 308].includes(res.status) && location && sameTarget(location, r.final)) return results.edge++;
        if ([301, 308].includes(res.status) && location && new URL(location, base).pathname === r.from + '/') {
          // Cloudflare añade la barra final: se sigue un salto más.
          const again = await fetch(new URL(location, base), { redirect: 'manual' });
          const html = again.status === 200 ? await again.text() : '';
          if (html.includes(`url=${r.final}`)) return results.fallback++;
        }
        if (res.status === 200) {
          const html = await res.text();
          if (html.includes(`url=${r.final}`)) return results.fallback++;
        }
        results.fail.push(`${res.status} ${r.from} (esperado → ${r.final}${location ? `, recibido → ${location}` : ''})`);
      } catch (e) {
        results.fail.push(`error ${r.from}: ${e.message}`);
      }
    }),
  );
}

console.log(`${base}: ${statics.length} redirecciones · ${results.edge} con 301 en el borde · ${results.fallback} con página de respaldo · ${results.fail.length} fallos`);
for (const f of results.fail) console.log(`  ✗ ${f}`);
process.exit(results.fail.length ? 1 : 0);
