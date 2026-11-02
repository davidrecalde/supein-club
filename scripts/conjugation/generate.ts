// Genera los datos del conjugador a partir del motor de reglas:
//   src/data/conjugation/verbs/<verbo>.json   (una página por verbo)
//   src/data/conjugation/models.json          (tabla rápida hablar/comer/vivir)
//   src/data/conjugation/search-index.json    (buscador de la página central)
//   docs/language/review/conjugacion-irregulares.csv (revisión nativa contra el DLE)
// Uso: node scripts/conjugation/generate.ts
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { conjugate, regularOf, PERSONS, SIMPLE_TENSES, type Conjugation, type TenseId } from './engine.ts';
import { MODEL_SPECS, VERB_SPECS } from './specs.ts';
import { PERSONS_JA, TENSE_BY_ID } from '../../src/data/conjugation/tenses.ts';

const DATA = 'src/data/conjugation';
const json = (value: unknown) => JSON.stringify(value, null, 2) + '\n';

function withIrregularFlags(conj: Conjugation) {
  const reg = regularOf(conj.infinitive);
  const tenses = Object.fromEntries(
    Object.entries(conj.tenses).map(([id, forms]) => [
      id,
      { forms, irregular: forms.map((f, i) => f !== null && f !== reg.tenses[id as TenseId][i]) },
    ]),
  );
  return {
    infinitive: conj.infinitive,
    gerund: conj.gerund,
    gerundIrregular: conj.gerund !== reg.gerund,
    participle: conj.participle,
    participleIrregular: conj.participle !== reg.participle,
    tenses,
    regular: { gerund: reg.gerund, participle: reg.participle, tenses: reg.tenses },
  };
}

// Quiz de 5 preguntas por verbo, generado de los datos: se priorizan las formas
// irregulares y el distractor principal es la forma «regularizada» (tení, hació).
const QUIZ_SLOTS: Array<[TenseId | 'participio', number]> = [
  ['presente', 0],
  ['preterito-indefinido', 2],
  ['futuro', 0],
  ['subjuntivo-presente', 0],
  ['imperativo-afirmativo', 1],
  ['preterito-imperfecto', 3],
  ['participio', -1],
  ['presente', 3],
];

// ser e ir son supletivos: su «forma regular» (sio, sa…) no existe ni engaña a nadie como distractor.
const SUPPLETIVE = new Set(['ser', 'ir']);
const OTHER_PERSONS = [0, 2, 5, 1, 3, 4];

function quizFor(v: ReturnType<typeof withIrregularFlags>) {
  const suppletive = SUPPLETIVE.has(v.infinitive);
  const slots = QUIZ_SLOTS.map(([tense, person]) => {
    if (tense === 'participio') {
      return { tense, person, correct: v.participle, regular: v.regular.participle, irregular: v.participleIrregular, others: [v.gerund, v.infinitive] };
    }
    const t = v.tenses[tense];
    // Otras personas del mismo tiempo y, de reserva, la misma persona en presente.
    const others = [...OTHER_PERSONS.filter((p) => p !== person).map((p) => t.forms[p]), v.tenses.presente.forms[Math.max(person, 0)]];
    return { tense, person, correct: t.forms[person], regular: v.regular.tenses[tense][person], irregular: t.irregular[person], others };
  }).filter((s) => s.correct);
  const chosen = [...slots.filter((s) => s.irregular), ...slots.filter((s) => !s.irregular)].slice(0, 5);
  return chosen.map((s, n) => {
    const label = s.tense === 'participio' ? '過去分詞' : `${TENSE_BY_ID.get(s.tense)!.ja}、${PERSONS_JA[s.person]}（${PERSONS[s.person]}）`;
    const candidates = [suppletive || !s.irregular ? null : s.regular, ...s.others];
    const distractors = candidates.filter((d, i, all): d is string => !!d && d !== s.correct && all.indexOf(d) === i).slice(0, 2);
    const options = [...distractors];
    const correctIndex = n % (options.length + 1);
    options.splice(correctIndex, 0, s.correct!);
    const explanation = !s.irregular
      ? `正解は ${s.correct}。${v.infinitive} のこの形は規則どおりです。`
      : suppletive
        ? `正解は ${s.correct}。${v.infinitive} は規則がほとんど当てはまらない動詞で、この形も覚えるしかありません。`
        : `正解は ${s.correct}。${v.infinitive} のこの形は不規則で、規則どおりの ${s.regular} にはなりません。`;
    return { question: `${v.infinitive} の${label}は？`, options, correctIndex, explanation };
  });
}

mkdirSync(`${DATA}/verbs`, { recursive: true });
mkdirSync('docs/language/review', { recursive: true });

const verbs = VERB_SPECS.map((s) => withIrregularFlags(conjugate(s)));
for (const v of verbs) {
  const { regular, ...data } = v;
  writeFileSync(`${DATA}/verbs/${v.infinitive}.json`, json({ ...data, quiz: quizFor(v) }));
}

const QUICK_TENSES = ['presente', 'preterito-indefinido', 'preterito-imperfecto', 'futuro'] as const;
const models = Object.fromEntries(
  MODEL_SPECS.map((s) => {
    const c = conjugate(s);
    return [s.infinitive, Object.fromEntries(QUICK_TENSES.map((t) => [t, c.tenses[t]]))];
  }),
);
writeFileSync(`${DATA}/models.json`, json(models));

// Índice del buscador: forma → [verbo, tiempo, persona (-1 = no personal), tiene página].
type Entry = [string, string, number, 0 | 1];
const index: Record<string, Entry[]> = {};
const add = (form: string, entry: Entry) => {
  const list = (index[form] ??= []);
  if (!list.some((e) => e[0] === entry[0] && e[1] === entry[1] && e[2] === entry[2])) list.push(entry);
};
const pages = new Set(VERB_SPECS.map((s) => s.infinitive));
for (const spec of [...VERB_SPECS, ...MODEL_SPECS]) {
  const c = conjugate(spec);
  const hasPage: 0 | 1 = pages.has(c.infinitive) ? 1 : 0;
  add(c.infinitive, [c.infinitive, 'infinitivo', -1, hasPage]);
  add(c.gerund, [c.infinitive, 'gerundio', -1, hasPage]);
  add(c.participle, [c.infinitive, 'participio', -1, hasPage]);
  for (const tense of SIMPLE_TENSES) {
    if (tense === 'imperativo-negativo') continue; // «no + subjuntivo»: ya está en el subjuntivo
    c.tenses[tense].forEach((form, person) => form && add(form, [c.infinitive, tense, person, hasPage]));
  }
}
// hay: forma impersonal de haber («〜がある»), fuera del paradigma personal.
add('hay', ['haber', 'impersonal', -1, pages.has('haber') ? 1 : 0]);
writeFileSync(`${DATA}/search-index.json`, JSON.stringify(index) + '\n');

// CSV de formas irregulares para la revisión nativa (contra el DLE de la RAE).
// Se regenera conservando la revisión ya hecha: si una fila (verbo, tiempo,
// persona) mantiene la misma forma, conserva sus columnas de revisión; si la
// forma cambia, la revisión se vacía y vuelve a quedar pendiente. Las filas
// añadidas por el revisor (hay, siendo…) se conservan al final de su verbo.
const CSV_PATH = 'docs/language/review/conjugacion-irregulares.csv';
const HEADER = ['verbo', 'tiempo', 'persona', 'forma', 'forma_regular_esperada', 'revisado_DLE', 'comentario', 'estado_revision', 'observaciones_revision', 'fuente_revision'];
const REVIEW_COLUMNS = HEADER.slice(5);

function parseCsv(text: string): string[][] {
  const out: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); out.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); out.push(row); }
  return out;
}

type CsvRow = Record<string, string>;
const keyOf = (r: CsvRow) => `${r.verbo}|${r.tiempo}|${r.persona}`;
const previous: CsvRow[] = existsSync(CSV_PATH)
  ? (() => {
      const [head, ...body] = parseCsv(readFileSync(CSV_PATH, 'utf8').replace(/^﻿/, ''));
      return body.filter((cells) => cells.some((c) => c)).map((cells) => Object.fromEntries(head.map((h, i) => [h, cells[i] ?? ''])));
    })()
  : [];
const previousByKey = new Map(previous.map((r) => [keyOf(r), r]));

const generated: CsvRow[] = [];
const push = (verbo: string, tiempo: string, persona: string, forma: string, regular: string) =>
  generated.push({ verbo, tiempo, persona, forma, forma_regular_esperada: regular });
for (const v of verbs) {
  if (v.gerundIrregular) push(v.infinitive, 'gerundio', '', v.gerund, v.regular.gerund);
  if (v.participleIrregular) push(v.infinitive, 'participio', '', v.participle, v.regular.participle);
  for (const [tense, { forms, irregular }] of Object.entries(v.tenses)) {
    forms.forEach((form, i) => {
      if (irregular[i]) push(v.infinitive, tense, PERSONS[i], form ?? '', v.regular.tenses[tense as TenseId][i] ?? '');
    });
  }
}
const generatedKeys = new Set(generated.map(keyOf));
const merged: CsvRow[] = [];
for (const v of verbs) {
  for (const row of generated.filter((r) => r.verbo === v.infinitive)) {
    const old = previousByKey.get(keyOf(row));
    const review = old && old.forma === row.forma ? old : {};
    merged.push({ ...row, ...Object.fromEntries(REVIEW_COLUMNS.map((c) => [c, review[c as keyof typeof review] ?? ''])) });
  }
  merged.push(...previous.filter((r) => r.verbo === v.infinitive && !generatedKeys.has(keyOf(r))));
}

const csvCell = (c: string) => (/[",\r\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c);
const lines = [HEADER.join(','), ...merged.map((r) => HEADER.map((h) => csvCell(r[h] ?? '')).join(','))];
writeFileSync(CSV_PATH, '﻿' + lines.join('\r\n') + '\r\n');
const pending = merged.filter((r) => !r.estado_revision).length;

console.log(`verbos: ${verbs.length} | formas en el índice: ${Object.keys(index).length} | filas en el CSV: ${merged.length} | pendientes de revisión: ${pending}`);
