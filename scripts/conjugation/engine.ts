// Motor de reglas de conjugación del español (norma peninsular).
// Las formas regulares salen de las reglas; lo que no cubren (verbos muy
// irregulares) se declara en `overrides` (ver specs.ts). La salida se revisa
// contra el DLE de la RAE antes de publicarse (CSV de irregulares).

export type Forms = Array<string | null>;
/** undefined = usa la regla; null = la forma no existe; string = forma fija. */
export type Override = Array<string | null | undefined>;

export const PERSONS = [
  'yo',
  'tú',
  'él / ella / usted',
  'nosotros / nosotras',
  'vosotros / vosotras',
  'ellos / ellas / ustedes',
] as const;

export const SIMPLE_TENSES = [
  'presente',
  'preterito-indefinido',
  'preterito-imperfecto',
  'futuro',
  'condicional',
  'subjuntivo-presente',
  'subjuntivo-imperfecto-ra',
  'subjuntivo-imperfecto-se',
  'imperativo-afirmativo',
  'imperativo-negativo',
] as const;

/** Tiempo compuesto → tiempo simple de haber que lo forma. */
export const COMPOUND_TENSES = {
  'preterito-perfecto': 'presente',
  'pluscuamperfecto': 'preterito-imperfecto',
  'futuro-perfecto': 'futuro',
  'condicional-perfecto': 'condicional',
  'subjuntivo-perfecto': 'subjuntivo-presente',
  'subjuntivo-pluscuamperfecto': 'subjuntivo-imperfecto-ra',
} as const;

export type SimpleTense = (typeof SIMPLE_TENSES)[number];
export type CompoundTense = keyof typeof COMPOUND_TENSES;
export type TenseId = SimpleTense | CompoundTense;

export interface VerbSpec {
  infinitive: string;
  /** Cambio vocálico en la raíz tónica (pensar → pienso, poder → puedo, pedir → pido). */
  stemChange?: 'e>ie' | 'o>ue' | 'e>i' | 'u>ue';
  /** 1.ª persona del presente irregular (tengo, hago, conozco): base del subjuntivo. */
  yo?: string;
  /** Pretérito fuerte, sin tilde: tuv-, hic-, dij-. */
  preteriteStem?: string;
  /** Raíz irregular de futuro y condicional: tendr-, har-. */
  futureStem?: string;
  participle?: string;
  gerund?: string;
  imperativeTu?: string;
  overrides?: Partial<Record<TenseId, Override>>;
}

export interface Conjugation {
  infinitive: string;
  gerund: string;
  participle: string;
  tenses: Record<TenseId, Forms>;
}

type VerbClass = 'ar' | 'er' | 'ir';

const ACUTE: Record<string, string> = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };
const PLAIN: Record<string, string> = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' };

export function stripAccents(s: string): string {
  return s.replace(/[áéíóú]/g, (c) => PLAIN[c]);
}

function accentLastVowel(s: string): string {
  for (let i = s.length - 1; i >= 0; i--) {
    const accented = ACUTE[s[i]];
    if (accented) return s.slice(0, i) + accented + s.slice(i + 1);
  }
  return s;
}

const STRONG = new Set(['a', 'e', 'o', 'á', 'é', 'ó', 'í', 'ú']);
const VOWEL = /[aeiouáéíóúü]/;

/** Número de sílabas (núcleos vocálicos), con diptongos e hiatos. */
export function syllables(word: string): number {
  let count = 0;
  let prev = '';
  for (let i = 0; i < word.length; i++) {
    const c = word[i];
    if (!VOWEL.test(c)) {
      prev = '';
      continue;
    }
    // La u de "gu"/"qu" ante e/i no es vocal (sigue, quiero).
    if (c === 'u' && (word[i - 1] === 'g' || word[i - 1] === 'q') && /[eiéí]/.test(word[i + 1] ?? '')) continue;
    if (!prev) count++;
    else if (STRONG.has(prev) && STRONG.has(c)) count++; // hiato (le-o, ve-í-a)
    prev = c;
  }
  return count;
}

/** Los monosílabos no llevan tilde (fue, vio, dio, veis, dais), salvo las diacríticas, que van en overrides. */
function normalize(word: string): string {
  return syllables(word) === 1 ? stripAccents(word) : word;
}

function verbClass(inf: string): VerbClass {
  const end = stripAccents(inf.slice(-2));
  if (end === 'ar' || end === 'er' || end === 'ir') return end;
  throw new Error(`Infinitivo no reconocido: ${inf}`);
}

function changeStem(stem: string, change: NonNullable<VerbSpec['stemChange']>): string {
  const [from, to] = change.split('>');
  const i = stem.lastIndexOf(from);
  return i === -1 ? stem : stem.slice(0, i) + to + stem.slice(i + from.length);
}

/** Debilitación de las -ir con cambio vocálico (sintió, durmió, pidió, sintamos). */
function weakStem(stem: string, change: VerbSpec['stemChange']): string {
  if (change === 'e>ie' || change === 'e>i') return changeStem(stem, 'e>i');
  if (change === 'o>ue') return changeStem(stem, 'o>u' as 'o>ue');
  return stem;
}

/** Une raíz y terminación con los ajustes ortográficos (busqué, empecé, sigo, cojo, venzo). */
function join(stem: string, ending: string, cls: VerbClass): string {
  const first = ending.charAt(0);
  const front = first === 'e' || first === 'é';
  const back = first === 'a' || first === 'o' || first === 'á' || first === 'ó';
  if (cls === 'ar' && front) {
    if (stem.endsWith('gu')) return stem.slice(0, -2) + 'gü' + ending;
    if (stem.endsWith('c')) return stem.slice(0, -1) + 'qu' + ending;
    if (stem.endsWith('g')) return stem.slice(0, -1) + 'gu' + ending;
    if (stem.endsWith('z')) return stem.slice(0, -1) + 'c' + ending;
  }
  if (cls !== 'ar' && back) {
    if (stem.endsWith('gu')) return stem.slice(0, -2) + 'g' + ending;
    if (stem.endsWith('g')) return stem.slice(0, -1) + 'j' + ending;
    if (/[^aeiou]c$/.test(stem)) return stem.slice(0, -1) + 'z' + ending;
  }
  return stem + ending;
}

function endsInVowel(stem: string): boolean {
  if (/[aeo]$/.test(stem)) return true;
  return /u$/.test(stem) && !/[gq]u$/.test(stem);
}

const PRESENT: Record<VerbClass, string[]> = {
  ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
  er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
  ir: ['o', 'es', 'e', 'imos', 'ís', 'en'],
};
const PRETERITE: Record<VerbClass, string[]> = {
  ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
  er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
  ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
};
const IMPERFECT: Record<VerbClass, string[]> = {
  ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
  er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
  ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
};
const FUTURE = ['é', 'ás', 'á', 'emos', 'éis', 'án'];
const CONDITIONAL = ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'];
const SUBJUNCTIVE: Record<VerbClass, string[]> = {
  ar: ['e', 'es', 'e', 'emos', 'éis', 'en'],
  er: ['a', 'as', 'a', 'amos', 'áis', 'an'],
  ir: ['a', 'as', 'a', 'amos', 'áis', 'an'],
};
const STRESSED_STEM = [0, 1, 2, 5];

function apply(base: Forms, override: Override | undefined): Forms {
  if (!override) return base;
  return base.map((form, i) => (override[i] === undefined ? form : (override[i] as string | null)));
}

function present(spec: VerbSpec, cls: VerbClass, stem: string): Forms {
  return PRESENT[cls].map((ending, i) => {
    if (i === 0 && spec.yo) return spec.yo;
    const s = spec.stemChange && STRESSED_STEM.includes(i) ? changeStem(stem, spec.stemChange) : stem;
    return normalize(join(s, ending, cls));
  });
}

function preterite(spec: VerbSpec, cls: VerbClass, stem: string): Forms {
  if (spec.preteriteStem) {
    const ps = spec.preteriteStem;
    const endings = ['e', 'iste', 'o', 'imos', 'isteis', ps.endsWith('j') ? 'eron' : 'ieron'];
    return endings.map((ending) => (ps.endsWith('c') && ending === 'o' ? ps.slice(0, -1) + 'zo' : ps + ending));
  }
  return PRETERITE[cls].map((ending, i) => {
    let s = stem;
    if (cls === 'ir' && spec.stemChange && (i === 2 || i === 5)) s = weakStem(stem, spec.stemChange);
    let e = ending;
    if (cls !== 'ar' && endsInVowel(s)) {
      // leer, creer, construir: la i átona entre vocales pasa a y; la tónica lleva tilde tras a/e/o.
      if (e === 'ió') e = 'yó';
      else if (e === 'ieron') e = 'yeron';
      else if (/[aeo]$/.test(s)) e = e.replace(/^i/, 'í');
    }
    return normalize(join(s, e, cls));
  });
}

function subjunctivePresent(spec: VerbSpec, cls: VerbClass, stem: string, presentForms: Forms): Forms {
  const yo = presentForms[0] ?? '';
  const yoStem = yo.endsWith('o') ? yo.slice(0, -1) : stem;
  return SUBJUNCTIVE[cls].map((ending, i) => {
    if (STRESSED_STEM.includes(i) || spec.yo || !spec.stemChange) {
      // La raíz de la 1.ª persona ya trae su ortografía (sigo → siga); en -ar se ajusta ante e (busco → busque).
      return normalize(cls === 'ar' ? join(yoStem, ending, cls) : yoStem + ending);
    }
    const s = cls === 'ir' ? weakStem(stem, spec.stemChange) : stem;
    return normalize(join(s, ending, cls));
  });
}

function subjunctiveImperfect(preteriteForms: Forms, kind: 'ra' | 'se'): Forms {
  const third = preteriteForms[5];
  if (!third) return [null, null, null, null, null, null];
  const base = third.slice(0, -3); // hablaron → habla, fueron → fue, dijeron → dije
  return [kind, `${kind}s`, kind, `${kind}mos`, kind === 'ra' ? 'rais' : 'seis', `${kind}n`].map((ending, i) =>
    i === 3 ? accentLastVowel(base) + ending : base + ending,
  );
}

export function conjugate(spec: VerbSpec): Conjugation {
  const inf = spec.infinitive;
  const cls = verbClass(inf);
  const stem = inf.slice(0, -2);
  const o = spec.overrides ?? {};

  const pres = apply(present(spec, cls, stem), o.presente);
  const pret = apply(preterite(spec, cls, stem), o['preterito-indefinido']);
  const impf = apply(IMPERFECT[cls].map((e) => normalize(stem + e)), o['preterito-imperfecto']);
  const futureBase = spec.futureStem ?? stripAccents(inf);
  const fut = apply(FUTURE.map((e) => normalize(futureBase + e)), o.futuro);
  const cond = apply(CONDITIONAL.map((e) => normalize(futureBase + e)), o.condicional);
  const subj = apply(subjunctivePresent(spec, cls, stem, pres), o['subjuntivo-presente']);
  const subjRa = apply(subjunctiveImperfect(pret, 'ra'), o['subjuntivo-imperfecto-ra']);
  const subjSe = apply(subjunctiveImperfect(pret, 'se'), o['subjuntivo-imperfecto-se']);
  const impAff = apply(
    [null, spec.imperativeTu ?? pres[2], subj[2], subj[3], inf.slice(0, -1) + 'd', subj[5]],
    o['imperativo-afirmativo'],
  );
  const impNeg = apply(
    [null, ...[1, 2, 3, 4, 5].map((i) => (subj[i] ? `no ${subj[i]}` : null))],
    o['imperativo-negativo'],
  );

  const weak = cls === 'ir' && spec.stemChange ? weakStem(stem, spec.stemChange) : stem;
  const gerund = spec.gerund ?? (cls === 'ar' ? stem + 'ando' : weak + (endsInVowel(weak) ? 'yendo' : 'iendo'));
  const participle = spec.participle ?? (cls === 'ar' ? stem + 'ado' : stem + (/[aeo]$/.test(stem) ? 'ído' : 'ido'));

  const simple: Record<SimpleTense, Forms> = {
    presente: pres,
    'preterito-indefinido': pret,
    'preterito-imperfecto': impf,
    futuro: fut,
    condicional: cond,
    'subjuntivo-presente': subj,
    'subjuntivo-imperfecto-ra': subjRa,
    'subjuntivo-imperfecto-se': subjSe,
    'imperativo-afirmativo': impAff,
    'imperativo-negativo': impNeg,
  };

  const haber = inf === 'haber' ? simple : HABER().tenses;
  const compound = Object.fromEntries(
    (Object.keys(COMPOUND_TENSES) as CompoundTense[]).map((t) => [
      t,
      apply(
        haber[COMPOUND_TENSES[t]].map((aux) => (aux ? `${aux} ${participle}` : null)),
        o[t],
      ),
    ]),
  ) as Record<CompoundTense, Forms>;

  return { infinitive: inf, gerund, participle, tenses: { ...simple, ...compound } };
}

/** Paradigma 100 % regular (solo con ajustes ortográficos): referencia para marcar irregulares. */
export function regularOf(infinitive: string): Conjugation {
  return conjugate({ infinitive });
}

// haber se usa como auxiliar de todos los compuestos.
export const HABER_SPEC: VerbSpec = {
  infinitive: 'haber',
  preteriteStem: 'hub',
  futureStem: 'habr',
  overrides: {
    presente: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
    'subjuntivo-presente': ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
    // haber casi no se usa en imperativo: no se muestra.
    'imperativo-afirmativo': [null, null, null, null, null, null],
    'imperativo-negativo': [null, null, null, null, null, null],
  },
};

let haberCache: Conjugation | undefined;
function HABER(): Conjugation {
  haberCache ??= conjugate(HABER_SPEC);
  return haberCache;
}
