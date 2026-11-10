import type { CollectionEntry } from 'astro:content';

const SITE_URL = 'https://supein.club';
const absolute = (raw: string | undefined, base: string) => (raw ? (raw.startsWith('http') ? raw : `${base}${raw}`) : undefined);

/**
 * Nodo schema.org Person de un autor, igual en todas las páginas que firma (artículos, unidades,
 * páginas de verbo…): bio, temas, perfiles y trayectoria (worksFor con EmployeeRole) salen de su ficha
 * en src/content/authors/. Así el E-E-A-T del autor acompaña a cada página, no solo a su perfil.
 */
export function buildAuthorPerson(author: CollectionEntry<'authors'>, authorUrl: string): Record<string, unknown> {
  const d = author.data;
  const sameAs = [absolute(d.linkedin, 'https://linkedin.com/in/'), absolute(d.instagram, 'https://instagram.com/'), d.website, d.website2].filter(Boolean);
  const topics = d.specialties ?? d.knowsAbout;
  const node: Record<string, unknown> = { '@type': 'Person', '@id': `${authorUrl}#person`, name: d.name, url: authorUrl };
  if (d.nameJa) node.alternateName = d.nameJa;
  if (d.avatar) node.image = `${SITE_URL}${d.avatar}`;
  if (d.jobTitle ?? d.role) node.jobTitle = d.jobTitle ?? d.role;
  if (d.bio) node.description = d.bio;
  if (topics?.length) node.knowsAbout = topics;
  if (sameAs.length) node.sameAs = sameAs;
  node.worksFor = buildAuthorWorksFor(author);
  return node;
}

/**
 * Person.worksFor: スペイン倶楽部 + la trayectoria de la ficha del autor (campo employment).
 * Cada puesto va como EmployeeRole (cargo y fechas); con endDate es un empleo anterior.
 */
export function buildAuthorWorksFor(author: CollectionEntry<'authors'>): Record<string, unknown>[] {
  const roles = (author.data.employment ?? []).map((e) => {
    const org = {
      '@type': 'Organization',
      name: e.organization,
      ...(e.alternateName && { alternateName: e.alternateName }),
      ...(e.url && { url: e.url }),
    };
    if (!e.roleName && !e.startDate && !e.endDate) return org;
    return {
      '@type': 'EmployeeRole',
      ...(e.roleName && { roleName: e.roleName }),
      ...(e.startDate && { startDate: e.startDate }),
      ...(e.endDate && { endDate: e.endDate }),
      worksFor: org,
    };
  });
  return [{ '@id': `${SITE_URL}/#organization` }, ...roles];
}

interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
}

/** Nodo schema.org Quiz para el @graph de SEO.astro (artículos y unidades del curso). */
export function buildQuizNode(canonical: string, title: string, items: QuizItem[]): Record<string, unknown> {
  return {
    '@type': 'Quiz',
    '@id': `${canonical}#quiz`,
    about: { '@type': 'Thing', name: title },
    hasPart: items.map((q, i) => ({
      '@type': 'Question',
      '@id': `${canonical}#quiz-${i + 1}`,
      eduQuestionType: 'Multiple choice',
      text: q.question,
      suggestedAnswer: q.options.map((opt) => ({ '@type': 'Answer', text: opt })),
      acceptedAnswer: { '@type': 'Answer', text: q.options[q.correctIndex] },
    })),
  };
}
