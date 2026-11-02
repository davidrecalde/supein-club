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
export const WELCOME_URL = '/language/learn-spanish/welcome/';
export const CAST_URL = '/language/cast/';
export const ABOUT_COURSE_URL = '/language/about-this-course/';
export const PROGRESS_STORAGE_KEY = 'supein.course.v1';
export const PREFS_STORAGE_KEY = 'supein.prefs.v1';
export const QUIZ_PASS_SCORE = 7;

/**
 * Fuente del campo `rank` del vocabulario de las unidades: columna «Rango frec.»
 * (orden por frecuencia absoluta) del diccionario de frecuencias del CORPES XXI.
 * Licencia CC BY-SA 4.0: hay que citarlo allí donde se use el orden.
 * Los puestos los escribe `npm run vocab:rank -- --write`.
 */
export const VOCAB_FREQUENCY_SOURCE = {
  label: 'Real Academia Española『CORPES XXI 頻度辞典』（Diccionario de frecuencias del CORPES XXI、CC BY-SA 4.0）',
  url: 'https://www.rae.es/banco-de-datos/corpes-xxi',
};

// Preferencias del alumno (docs/language/curso-paso-a-paso.md, «La pantalla de bienvenida»).
// Estos son también los valores que ve quien no tiene JavaScript.
export interface CoursePrefs {
  variety: 'es' | 'la';
  pace: 2 | 3 | 5;
  examples: 1 | 2 | 3;
  audio: { mode: 'natural' | 'pausado'; pause: 0.5 | 1 | 1.5 };
}

export const DEFAULT_PREFS: CoursePrefs = {
  variety: 'es',
  pace: 3,
  examples: 2,
  audio: { mode: 'natural', pause: 1 },
};
