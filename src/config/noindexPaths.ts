// Categorías vacías, marcadas noindex,follow en el PR #8 — se excluyen
// también del sitemap XML (astro.config.mjs) y de los enlaces de la página
// /sitemap/ (src/pages/sitemap/index.astro) para no contradecir esa señal
// ni enlazar a páginas "記事を準備中です" desde un listado pensado para
// encontrar contenido real. Estas páginas usan robots condicional (index
// si el cluster ya tiene artículos, noindex si está vacío); esta lista
// debe reflejar el estado ACTUAL, no el de cuando se creó — revisar tras
// publicar el primer artículo de cualquier cluster vacío (auditoría
// 2026-09-09: /travel/barcelona/, /travel/madrid/ y /language/spanish-apps/
// ya tenían contenido y se retiraron de la lista; /food/paella/ y
// /food/souvenirs/ estaban vacías pero no incluidas, se añadieron;
// /football/football-guide/ se eliminó, entrada obsoleta).
// Auditoría 2026-10-21: /culture/flamenco/, /culture/history/,
// /culture/traditions/, /food/olive-oil/, /food/paella/, /food/souvenirs/,
// /food/spanish-wine/ y /food/tapas/ ya tenían contenido (robots index,follow
// real) pero seguían excluidas del sitemap — retiradas de la lista.
// Extraída a este módulo compartido el 2026-10-22 para que astro.config.mjs
// y la página /sitemap/ lean la misma fuente de verdad (antes la página
// /sitemap/ enlazaba a mano a 13 de estas rutas vacías, desincronizada de
// esta lista).
// Auditoría 2026-10-28: /living/language-school/, /living/spain-visa/,
// /living/student-visa/, /living/study-cost/, /living/study-spain/,
// /living/university/, /living/work-in-spain/, /living/work-visa/ y
// /living/working-holiday/ pasan a tener contenido real (robots
// index,follow fijo, ya no condicional) — retiradas de la lista.
export const NOINDEX_PATHS = [
  '/culture/facts/',
  '/food/restaurants-osaka/',
  '/food/restaurants-tokyo/',
  '/language/lesson-price/',
  '/language/online-lessons/',
  '/language/pronunciation/',
  '/language/self-study/',
  '/language/spanish-books/',
  '/language/spanish-phrases/',
  '/travel/andalusia/',
  '/travel/best-season/',
  '/travel/canarias/',
  '/travel/ibiza/',
  '/travel/itineraries/',
  '/travel/spain-flights/',
  '/travel/spain-hotels/',
];
