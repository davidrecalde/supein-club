// Progreso del curso sin cuenta, solo en el navegador (localStorage).
// Se usa desde los <script> de los componentes del curso.
import { PROGRESS_STORAGE_KEY } from '../data/course';

export interface UnitProgress {
  completed: boolean;
  score?: number;
  total?: number;
  completedAt?: string;
  lastAttemptAt?: string;
}

export interface CourseProgress {
  units: Record<string, UnitProgress>;
  /** Última unidad abierta en este navegador (la marca el hub /language/ como 「前回のユニット」). */
  lastVisited?: { unit: number; at: string };
}

export const PROGRESS_EVENT = 'supein:course-progress';

export function loadProgress(): CourseProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed.units === 'object') return parsed as CourseProgress;
  } catch {
    // localStorage bloqueado (modo privado) o JSON corrupto: se empieza de cero.
  }
  return { units: {} };
}

function save(progress: CourseProgress): void {
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    return;
  }
  window.dispatchEvent(new CustomEvent(PROGRESS_EVENT));
}

export function isCompleted(progress: CourseProgress, unit: number): boolean {
  return progress.units[String(unit)]?.completed === true;
}

export function setCompleted(unit: number, completed: boolean): void {
  const progress = loadProgress();
  const entry = progress.units[String(unit)] ?? { completed: false };
  entry.completed = completed;
  entry.completedAt = completed ? new Date().toISOString() : undefined;
  progress.units[String(unit)] = entry;
  save(progress);
}

export function recordQuiz(unit: number, score: number, total: number, passScore: number): void {
  const progress = loadProgress();
  const entry = progress.units[String(unit)] ?? { completed: false };
  const now = new Date().toISOString();
  entry.lastAttemptAt = now;
  if (entry.score === undefined || score > entry.score) {
    entry.score = score;
    entry.total = total;
  }
  if (score >= passScore && !entry.completed) {
    entry.completed = true;
    entry.completedAt = now;
  }
  progress.units[String(unit)] = entry;
  save(progress);
}

// Se llama al abrir una unidad: el hub /language/ la marca como 「前回のユニット」.
export function recordVisit(unit: number): void {
  const progress = loadProgress();
  progress.lastVisited = { unit, at: new Date().toISOString() };
  save(progress);
}
