// Niveles del curso de 62 unidades (docs/language/curso-paso-a-paso.md), con la
// nomenclatura del Instituto Cervantes.
export const TOTAL_UNITS = 62;

export const COURSE_LEVELS = [
  { code: 'A1', name: 'Acceso', first: 1, last: 12 },
  { code: 'A2', name: 'Plataforma', first: 13, last: 24 },
  { code: 'B1', name: 'Umbral', first: 25, last: 36 },
  { code: 'B2', name: 'Avanzado', first: 37, last: 48 },
  { code: 'C1', name: 'Dominio operativo eficaz', first: 49, last: 56 },
  { code: 'C2', name: 'Maestría', first: 57, last: 62 },
] as const;

export type LevelCode = (typeof COURSE_LEVELS)[number]['code'];

export function getCourseLevel(code: string) {
  return COURSE_LEVELS.find((l) => l.code === code.toUpperCase());
}

export function levelUrl(code: string): string {
  return `/language/learn-spanish/${code.toLowerCase()}/`;
}

export const COURSE_URL = '/language/learn-spanish/';
export const PROGRESS_STORAGE_KEY = 'supein.course.v1';
export const QUIZ_PASS_SCORE = 7;
