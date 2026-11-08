// Unidades del curso: envuelve la sección «## まとめ» (y todo lo que le sigue) en
// <section class="unit-summary lv-XX">, con una línea previa que dice el nivel y la unidad.
// Solo actúa en src/content/units/; el contenido sigue en el HTML inicial (sin JavaScript).
// Los colores de cada nivel están en global.css (.lv-A1 … .lv-C2).

const LEVEL_NAMES = { A1: 'Acceso', A2: 'Plataforma', B1: 'Umbral', B2: 'Avanzado', C1: 'Dominio operativo eficaz', C2: 'Maestría' };

const textOf = (node) =>
  node.type === 'text' ? node.value : (node.children ?? []).map(textOf).join('');

export default function rehypeUnitSummary() {
  return (tree, file) => {
    const filePath = String(file.path ?? file.history?.[0] ?? '').replace(/\\/g, '/');
    if (!filePath.includes('/content/units/')) return;
    const fm = file.data?.astro?.frontmatter ?? {};
    const level = String(fm.level ?? '').toUpperCase();
    if (!LEVEL_NAMES[level] || !fm.unit) return;

    const start = tree.children.findIndex(
      (n) => n.type === 'element' && n.tagName === 'h2' && textOf(n).trim() === 'まとめ',
    );
    if (start === -1) return;

    const eyebrow = {
      type: 'element',
      tagName: 'p',
      properties: { className: ['unit-summary-eyebrow'] },
      children: [
        { type: 'element', tagName: 'span', properties: { className: ['level-chip'] }, children: [{ type: 'text', value: `${level} ${LEVEL_NAMES[level]}` }] },
        { type: 'element', tagName: 'span', properties: {}, children: [{ type: 'text', value: `ユニット${fm.unit}` }] },
      ],
    };
    const section = {
      type: 'element',
      tagName: 'section',
      properties: { className: ['unit-summary', `lv-${level}`] },
      children: [eyebrow, ...tree.children.slice(start)],
    };
    tree.children.splice(start, tree.children.length - start, section);
  };
}
