// Puesto de frecuencia (`rank`) del vocabulario de las unidades, tomado de la
// columna «Rango frec.» del diccionario de frecuencias del CORPES XXI (RAE,
// CC BY-SA 4.0). Ese rango ordena los lemas por frecuencia absoluta; no se usa
// la relación ordenada por índice de dispersión.
//
// El archivo del diccionario (35 MB) no se sube al repositorio: se descarga de
// la web de la RAE y se deja en src/data/diccionario_frecuencias_corpes_alfa.tsv.
//
// Uso:
//   npm run vocab:rank               comprueba los rank de todas las unidades
//   npm run vocab:rank -- --write    los escribe en el frontmatter
//
// Solo lleva rank lo que es un lema del diccionario («ayer», «por fin»); las
// expresiones que no lo son («la semana pasada») van sin rank, al final de la
// lista. El artículo definido inicial se ignora («el viaje» → viaje); «una vez» es expresión.
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const TSV = 'src/data/diccionario_frecuencias_corpes_alfa.tsv';
const UNITS = 'src/content/units';
const write = process.argv.includes('--write');

/**
 * Casos que la regla general resuelve mal. `lemma`: lema del diccionario;
 * `cat`: categoría (N nombre, A adjetivo, V verbo, R adverbio, C conjunción…).
 */
const OVERRIDES: Record<string, { lemma?: string; cat?: string; note: string }> = {
  primero: { cat: 'R', note: 'adverbio «まず»; como numeral (M) tiene otro puesto' },
  adiós: { cat: 'I', note: 'interjección «さようなら»; como nombre (el adiós) tiene otro puesto' },
  abuelos: { lemma: 'abuelo', note: 'plural' },
};

if (!existsSync(TSV)) {
  console.error(`No se encuentra ${TSV}. Descárgalo de https://www.rae.es/banco-de-datos/corpes-xxi`);
  process.exit(1);
}

// Líneas de lema: «  N. \t rango \t lema \t \t categoría \t frecuencia …». Las de forma empiezan por tabulador.
const lemmas = new Map<string, Array<{ rank: number; cat: string; freq: number }>>();
// Forma → lema que la contiene con más frecuencia (solo nombres). Sirve para los
// femeninos que el CORPES agrupa bajo el masculino: cartera → cartero, música → músico.
const formOwner = new Map<string, { lemma: string; freq: number }>();
let current: { lemma: string; cat: string } | undefined;
for (const line of readFileSync(TSV, 'utf8').split(/\r?\n/)) {
  const c = line.split('\t');
  if (c.length < 6) continue;
  if (/^\s*\d+\.\s*$/.test(c[0])) {
    const lemma = c[2].trim().toLowerCase();
    current = { lemma, cat: c[4].trim() };
    lemmas.set(lemma, [...(lemmas.get(lemma) ?? []), { rank: Number(c[1].trim()), cat: current.cat, freq: Number(c[5].trim()) }]);
  } else if (current?.cat === 'N' && c[0] === '' && c[3]) {
    const form = c[3].trim().toLowerCase();
    const freq = Number(c[5].trim());
    if (freq > (formOwner.get(form)?.freq ?? 0)) formOwner.set(form, { lemma: current.lemma, freq });
  }
}

const ARTICLE = /^(el|la|los|las)\s+/; // solo el artículo definido con el que se presentan los nombres
function lookup(es: string): { rank?: number; why: string } {
  const lower = es.trim().toLowerCase();
  const key = lower.replace(ARTICLE, '');
  let o = OVERRIDES[key];
  // Verbo pronominal: el CORPES no tiene lema «levantarse», solo «levantar».
  const base = key.endsWith('se') ? key.slice(0, -2) : '';
  if (!o && !lemmas.has(key) && base && (lemmas.get(base) ?? []).some((e) => e.cat === 'V')) {
    o = { lemma: base, cat: 'V', note: `verbo pronominal: puesto del lema ${base}` };
  }
  // Nombre cuya forma el CORPES cuenta sobre todo bajo otro lema (cartera → cartero).
  const owner = formOwner.get(key);
  const ownN = (lemmas.get(key) ?? []).find((e) => e.cat === 'N');
  if (!o && ARTICLE.test(lower) && owner && owner.lemma !== key && owner.freq > (ownN?.freq ?? 0)) {
    o = { lemma: owner.lemma, cat: 'N', note: `el CORPES agrupa la forma «${key}» bajo el lema ${owner.lemma}` };
  }
  const entries = lemmas.get(o?.lemma ?? key) ?? [];
  // Con artículo es un nombre: «el móvil» toma el puesto de N, no el del adjetivo.
  const cat = o?.cat ?? (ARTICLE.test(lower) && entries.some((e) => e.cat === 'N') ? 'N' : undefined);
  const pool = cat ? entries.filter((e) => e.cat === cat) : entries;
  if (pool.length === 0) return { why: 'no es un lema del diccionario: sin rank' };
  const best = pool.reduce((a, b) => (b.rank < a.rank ? b : a));
  const others = entries.filter((e) => e !== best).map((e) => `${e.cat} ${e.rank}`);
  return { rank: best.rank, why: [o?.note, others.length ? `otras categorías: ${others.join(', ')}` : ''].filter(Boolean).join('; ') };
}

const files: string[] = [];
const walk = (dir: string) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.mdx')) files.push(p);
  }
};
walk(UNITS);

const ITEM = /^(\s*- \{ es: "([^"]+)", ja: "[^"]*", )(rank: \d+, )?(.*\})\s*$/;
let mismatches = 0;
for (const file of files.sort()) {
  const text = readFileSync(file, 'utf8');
  const eol = text.includes('\r\n') ? '\r\n' : '\n';
  const lines = text.split(/\r?\n/);
  let touched = false;
  const report: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(ITEM);
    if (!m) continue;
    const [, head, es, current, tail] = m;
    const { rank, why } = lookup(es);
    const now = current ? Number(current.match(/\d+/)![0]) : undefined;
    if (now !== rank) {
      mismatches++;
      report.push(`  ${es}: ${now ?? '—'} → ${rank ?? '—'}${why ? `  (${why})` : ''}`);
      lines[i] = `${head}${rank ? `rank: ${rank}, ` : ''}${tail}`;
      touched = true;
    } else if (why) {
      report.push(`  ${es}: ${rank ?? '—'}  (${why})`);
    }
  }
  if (report.length) console.log(`${file}\n${report.join('\n')}`);
  if (write && touched) writeFileSync(file, lines.join(eol));
}

console.log(`${mismatches} rank ${write ? 'escritos' : 'distintos del diccionario'}`);
if (!write && mismatches > 0) process.exit(1);
