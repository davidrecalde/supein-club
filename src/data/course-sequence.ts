// Orden secuencial del "camino principal" (はじめに + A1-C2) y del bloque
// DELE, usado por StepIndicator.astro y PrevNextNav.astro (vía
// utils/courseSequence.ts) para numerar y enlazar Anterior/Siguiente.
// Cada string es el id real de la colección `articles` (ruta del archivo
// relativa a src/content/articles/, sin extensión) — verificado contra
// el contenido real (46 archivos: 36 del camino principal + 10 de DELE)
// antes de confirmarse.
export const courseSequence = {
  step: [
    // はじめに (3)
    "language/learn-spanish/zipf-law-methodology",
    "language/learn-spanish/index",
    "language/learn-spanish/level-test",
    // A1 (5)
    "language/learn-spanish/a1/index",
    "language/learn-spanish/a1/grammar",
    "language/learn-spanish/a1/vocabulary",
    "language/learn-spanish/a1/pronunciation",
    "language/learn-spanish/a1/study-plan",
    // A2 (5)
    "language/learn-spanish/a2/index",
    "language/learn-spanish/a2/grammar",
    "language/learn-spanish/a2/vocabulary",
    "language/learn-spanish/a2/pronunciation",
    "language/learn-spanish/a2/study-plan",
    // B1 (6, subjunctive al final del nivel)
    "language/learn-spanish/b1/index",
    "language/learn-spanish/b1/grammar",
    "language/learn-spanish/b1/vocabulary",
    "language/learn-spanish/b1/pronunciation",
    "language/learn-spanish/b1/study-plan",
    "language/learn-spanish/b1/subjunctive",
    // B2 (6, subjunctive tras grammar)
    "language/learn-spanish/b2/index",
    "language/learn-spanish/b2/grammar",
    "language/learn-spanish/b2/subjunctive",
    "language/learn-spanish/b2/vocabulary",
    "language/learn-spanish/b2/pronunciation",
    "language/learn-spanish/b2/study-plan",
    // C1 (6, subjunctive tras grammar)
    "language/learn-spanish/c1/index",
    "language/learn-spanish/c1/grammar",
    "language/learn-spanish/c1/subjunctive",
    "language/learn-spanish/c1/vocabulary",
    "language/learn-spanish/c1/pronunciation",
    "language/learn-spanish/c1/study-plan",
    // C2 (5, sin pronunciation, subjunctive tras grammar)
    "language/learn-spanish/c2/index",
    "language/learn-spanish/c2/grammar",
    "language/learn-spanish/c2/subjunctive",
    "language/learn-spanish/c2/vocabulary",
    "language/learn-spanish/c2/study-plan",
  ],
  dele: [
    "language/learn-spanish/dele/index",
    "language/learn-spanish/dele-vs-seiken",
    "language/learn-spanish/dele/a1",
    "language/learn-spanish/dele/a2",
    "language/learn-spanish/dele/b1",
    "language/learn-spanish/dele-b1-tips",
    "language/learn-spanish/dele/b2",
    "language/learn-spanish/dele/c1",
    "language/learn-spanish/dele/c2",
    "language/learn-spanish/dele/dates-and-fees",
  ],
};
