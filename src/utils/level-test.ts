// Test de nivel: preguntas activas, audio y versión. Lo usan LevelTestCard.astro (el test) y la página
// de soluciones (src/pages/language/learn-spanish/level-test/kaisetsu/), para que las dos numeren igual.
import type { CollectionEntry } from 'astro:content';
import { getCollection } from 'astro:content';
import audioFiles from '../data/level-test-audio-files.json';
import audioTracks from '../data/level-test-audio.json';

export type LevelTestItem = NonNullable<CollectionEntry<'articles'>['data']['levelTest']>[number];
export type AudioFile = { src: string; seconds: number };
export type AudioTrack = (typeof audioTracks.tracks)[number];

export const LEVEL_TEST_URL = '/language/learn-spanish/level-test/';
/** Página de soluciones: noindex, fuera del sitemap y del buscador; solo se enlaza desde el resultado. */
export const SOLUTIONS_URL = '/language/learn-spanish/level-test/kaisetsu/';
/** Aciertos necesarios para alcanzar un nivel: el 70 % de sus preguntas (7 de 10). */
export const PASS_RATIO = 0.7;

export const SKILL_LABEL: Record<LevelTestItem['skill'], string> = { grammar: '文法', vocabulary: '語彙', reading: '読解', listening: '聴解' };

const files = audioFiles as Record<string, AudioFile>;
export const audioOf = (id?: string): AudioFile | undefined => (id ? files[id] : undefined);
export const trackOf = (id?: string): AudioTrack | undefined => audioTracks.tracks.find((t) => t.id === id);

/** Preguntas que se muestran: las de audio solo si su MP3 está publicado (nunca un reproductor sin archivo). */
export const activeQuestions = (items: LevelTestItem[]) => items.filter((q) => !q.audio || audioOf(q.audio));

/** Huella de las preguntas activas: si cambian, el progreso guardado en el navegador deja de valer. */
export function testVersion(items: LevelTestItem[]): string {
  const text = items.map((q) => `${q.question}|${q.options.join('/')}|${q.correctIndex}`).join('\n');
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return `${items.length}-${h.toString(36)}`;
}

export async function getLevelTestEntry() {
  const [entry] = await getCollection('articles', (a) => a.id.replace(/\.(md|mdx)$/, '') === 'language/learn-spanish/level-test');
  return entry;
}
