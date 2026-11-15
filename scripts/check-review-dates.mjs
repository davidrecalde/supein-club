// Lista los artículos cuya revisión de contenido (frontmatter `contentReview.nextReviewDate`) ha vencido o
// vence pronto, para que los datos con fecha (precios, calendarios, rankings) no caduquen sin que nadie lo vea.
//
// Uso: npm run review:due            → vencidos y los que vencen en 30 días
//      npm run review:due -- 90      → ventana de 90 días
// Solo informa (sale con 0). Actualizar el artículo y su `nextReviewDate` sigue el flujo normal; cambiar
// pubDate/updatedDate necesita «HAZ FRESHNESS».
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const ROOT = 'src/content/articles';
const days = Number(process.argv[2] ?? 30);
const today = new Date(new Date().toISOString().slice(0, 10));
const limit = new Date(today.getTime() + days * 86400000);

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = path.join(d, f);
  return statSync(p).isDirectory() ? walk(p) : /\.mdx?$/.test(f) ? [p] : [];
});

const rows = [];
for (const file of walk(ROOT)) {
  const fm = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1];
  const block = fm?.match(/^contentReview:\r?\n((?:[ \t]+.*\r?\n?)+)/m)?.[1];
  const date = block?.match(/nextReviewDate:\s*["']?(\d{4}-\d{2}-\d{2})/)?.[1];
  if (!date) continue;
  const due = new Date(date);
  if (due > limit) continue;
  const reason = block.match(/reason:\s*["']?(.*?)["']?\s*$/m)?.[1] ?? '';
  const title = fm.match(/^title:\s*["']?(.*?)["']?\s*$/m)?.[1] ?? '';
  rows.push({ date, overdue: due < today, file: path.relative(ROOT, file).split(path.sep).join('/'), title, reason });
}

rows.sort((a, b) => a.date.localeCompare(b.date));
if (!rows.length) {
  console.log(`Sin revisiones vencidas ni en los próximos ${days} días.`);
} else {
  console.log(`${rows.length} artículo(s) con revisión vencida o en los próximos ${days} días:\n`);
  for (const r of rows) {
    console.log(`${r.overdue ? 'VENCIDA ' : 'pronto  '} ${r.date}  ${r.file}`);
    console.log(`         ${r.title}`);
    if (r.reason) console.log(`         ${r.reason.length > 160 ? `${r.reason.slice(0, 160)}…` : r.reason}`);
  }
}
