// Datos generados por scripts/conjugation/generate.ts (no editar los JSON a mano).
export interface TenseData {
  forms: Array<string | null>;
  irregular: boolean[];
}

export interface VerbData {
  infinitive: string;
  gerund: string;
  gerundIrregular: boolean;
  participle: string;
  participleIrregular: boolean;
  tenses: Record<string, TenseData>;
}

export const CONJUGATION_URL = '/language/learn-spanish/verb-conjugation/';

const files = import.meta.glob<VerbData>('./verbs/*.json', { eager: true, import: 'default' });
export const VERBS = new Map(Object.values(files).map((v) => [v.infinitive, v]));

export function verbUrl(infinitive: string): string {
  return `${CONJUGATION_URL}${infinitive}/`;
}
