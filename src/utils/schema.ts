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
