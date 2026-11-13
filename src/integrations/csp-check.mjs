// Comprueba que la CSP de _headers permite los servicios externos que usa la web.
//
// Motivo: del 9 de septiembre al 13 de noviembre de 2026 la CSP de public/_headers bloqueó Web3Forms
// (formulario de contacto y 「間違いを報告」) y Cloudflare Web Analytics, y nada avisó: los mensajes se
// perdieron sin dejar rastro. Con esta comprobación, si una directiva pierde un origen necesario, el
// build falla y el cambio no llega a producción.
//
// Va en astro.config.mjs (astro:build:done, sobre dist/_headers). Sin build: npm run csp:check
// (lee public/_headers). Al añadir un servicio externo nuevo, añadirlo a CSP_REQUIREMENTS y a public/_headers.
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { WEB3FORMS_ENDPOINT } from '../config/forms.ts';

const web3forms = new URL(WEB3FORMS_ENDPOINT).origin;

export const CSP_REQUIREMENTS = [
  { service: 'Web3Forms (contacto y 「間違いを報告」)', directives: { 'connect-src': [web3forms], 'form-action': [web3forms] } },
  { service: 'Google Analytics 4', directives: { 'script-src': ['https://www.googletagmanager.com'], 'connect-src': ['https://www.google-analytics.com', 'https://region1.google-analytics.com'] } },
  { service: 'Cloudflare Web Analytics', directives: { 'script-src': ['https://static.cloudflareinsights.com'], 'connect-src': ['https://cloudflareinsights.com'] } },
  { service: 'Metricool', directives: { 'connect-src': ['https://tracker.metricool.com'] } },
  { service: 'Vídeos de YouTube', directives: { 'frame-src': ['https://www.youtube.com'] } },
];

// Directivas de reserva cuando falta la propia (form-action no tiene reserva).
const FALLBACK = { 'script-src': ['default-src'], 'connect-src': ['default-src'], 'frame-src': ['child-src', 'default-src'], 'form-action': [] };

const parsePolicy = (value) =>
  new Map(value.split(';').map((d) => d.trim().split(/\s+/)).filter(([name]) => name).map(([name, ...sources]) => [name.toLowerCase(), sources]));

const sourceAllows = (source, origin) => {
  if (source === '*' || source === new URL(origin).protocol) return true;
  if (source.includes('*.')) {
    const [scheme, host] = source.split('://');
    const url = new URL(origin);
    return url.protocol === `${scheme}:` && url.hostname.endsWith(host.slice(1));
  }
  return source.replace(/\/$/, '') === origin;
};

const allows = (policy, directive, origin) => {
  for (const name of [directive, ...(FALLBACK[directive] ?? ['default-src'])]) {
    if (policy.has(name)) return policy.get(name).some((s) => sourceAllows(s, origin));
  }
  return true; // ninguna directiva aplicable: no hay restricción
};

// Devuelve la lista de problemas (vacía si todo está permitido) para el texto de un _headers de Cloudflare.
export function checkCsp(headersText) {
  const policies = [];
  let route = null;
  for (const line of headersText.split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (!/^\s/.test(line)) { route = line.trim(); continue; }
    const match = line.match(/^\s+Content-Security-Policy:\s*(.+)$/i);
    if (match) policies.push({ route, policy: parsePolicy(match[1]) });
  }
  const problems = [];
  for (const { route: r, policy } of policies) {
    for (const { service, directives } of CSP_REQUIREMENTS) {
      for (const [directive, origins] of Object.entries(directives)) {
        for (const origin of origins.filter((o) => !allows(policy, directive, o))) {
          problems.push(`${r}: ${directive} no permite ${origin} (${service})`);
        }
      }
    }
  }
  return problems;
}

const report = (problems) =>
  `La CSP de public/_headers bloquearía servicios que usa la web:\n  ${problems.join('\n  ')}\n` +
  'Añade cada origen a su directiva en public/_headers (lista de servicios en src/integrations/csp-check.mjs).';

export default function cspCheckIntegration() {
  return {
    name: 'supein-csp-check',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const problems = checkCsp(readFileSync(path.join(fileURLToPath(dir), '_headers'), 'utf8'));
        if (problems.length) throw new Error(report(problems));
        logger.info(`CSP: permite los ${CSP_REQUIREMENTS.length} servicios externos de la web (${CSP_REQUIREMENTS.map((r) => r.service).join(', ')}).`);
      },
    },
  };
}

// npm run csp:check
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const problems = checkCsp(readFileSync('public/_headers', 'utf8'));
  if (problems.length) {
    console.error(report(problems));
    process.exit(1);
  }
  console.log(`CSP correcta: permite los ${CSP_REQUIREMENTS.length} servicios externos de la web.`);
}
