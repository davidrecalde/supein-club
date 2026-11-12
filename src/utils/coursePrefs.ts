// Preferencias del curso en el navegador (localStorage) y sus efectos en la página.
// Sin JavaScript no se aplica nada: el HTML ya trae todo el contenido.
import { DEFAULT_PREFS, PREFS_STORAGE_KEY, type CoursePrefs } from '../data/course';

export const PREFS_EVENT = 'supein:course-prefs';

export function loadPrefs(): CoursePrefs {
  try {
    const raw = localStorage.getItem(PREFS_STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      return { ...DEFAULT_PREFS, ...saved, audio: { ...DEFAULT_PREFS.audio, ...saved?.audio } };
    }
  } catch {
    // localStorage bloqueado o JSON corrupto: valores por defecto.
  }
  return { ...DEFAULT_PREFS, audio: { ...DEFAULT_PREFS.audio } };
}

export function savePrefs(prefs: CoursePrefs): void {
  try {
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    return;
  }
  window.dispatchEvent(new CustomEvent(PREFS_EVENT));
}

/** Variedad: con 'la', las filas de vosotros se pliegan; el vocabulario ordena su variante (CSS con data-variety). */
function applyVariety(prefs: CoursePrefs): void {
  document.documentElement.dataset.variety = prefs.variety;
  document.querySelectorAll<HTMLTableRowElement>('.unit-body tr, .prefs-preview tr').forEach((row) => {
    const first = row.cells[0]?.textContent?.trim() ?? '';
    if (!/^vosotr/i.test(first)) return;
    row.classList.add('row-vosotros');
  });
  document.querySelectorAll<HTMLTableElement>('.unit-body table, .prefs-preview table').forEach((table) => {
    const rows = table.querySelectorAll('.row-vosotros');
    if (rows.length === 0) return;
    let toggle = table.nextElementSibling as HTMLButtonElement | null;
    if (!toggle?.classList.contains('vosotros-toggle')) {
      toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'vosotros-toggle';
      toggle.addEventListener('click', () => {
        table.classList.toggle('show-vosotros');
        toggle!.textContent = table.classList.contains('show-vosotros') ? 'vosotros の形を隠す' : 'vosotros の形を表示';
      });
      table.after(toggle);
    }
    table.classList.remove('show-vosotros');
    toggle.textContent = 'vosotros の形を表示';
    toggle.hidden = prefs.variety !== 'la';
  });
}

/** Ejemplos por punto: en cada bloque <Examples> solo se ven los N primeros; el resto, con un botón. */
function applyExamples(prefs: CoursePrefs): void {
  document.querySelectorAll<HTMLElement>('.unit-examples').forEach((block) => {
    const items = Array.from(block.querySelectorAll<HTMLLIElement>('li'));
    items.forEach((li, i) => (li.hidden = i >= prefs.examples));
    let more = block.querySelector<HTMLButtonElement>('.unit-examples-more');
    const hiddenCount = Math.max(items.length - prefs.examples, 0);
    if (hiddenCount === 0) {
      more?.remove();
      return;
    }
    if (!more) {
      more = document.createElement('button');
      more.type = 'button';
      more.className = 'unit-examples-more';
      more.addEventListener('click', () => {
        items.forEach((li) => (li.hidden = false));
        more!.remove();
      });
      block.append(more);
    }
    more.textContent = `例文をあと${hiddenCount}つ見る`;
  });
}

export function applyPrefs(prefs: CoursePrefs = loadPrefs()): void {
  applyVariety(prefs);
  applyExamples(prefs);
  document.documentElement.dataset.audioMode = prefs.audio.mode;
}
