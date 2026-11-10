import { defineCollection, z, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    nameJa: z.string().optional(),
    slug: z.string().optional(),
    avatar: z.string().optional(),
    jobTitle: z.string().optional(),
    role: z.string().optional(),
    bio: z.string().max(300),
    bioLong: z.string().optional(),
    knowsAbout: z.array(z.string()).optional(),
    specialties: z.array(z.string()).optional(),
    sameAs: z.array(z.string()).optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
    website2: z.string().optional(),
    website2Label: z.string().optional(),
    instagram: z.string().optional(),
    location: z.string().optional(),
    since: z.string().optional(),
    featured: z.boolean().optional(),
    order: z.number().optional(),
    websiteLabel: z.string().optional(),
    lang: z.enum(['ja', 'es']).default('ja'),
    active: z.boolean().default(true),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    h1: z.string().optional(),
    description: z.string().max(160),
    lead: z.string().max(300),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    pillar: z.enum(['travel', 'food', 'language', 'living', 'culture', 'football']),
    cluster: z.string(),
    region: z.string().optional(),
    intent: z.enum(['informational', 'commercial', 'transactional', 'navigational']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()),
    entities: z.array(z.string()),
    relatedArticles: z.array(z.string()).optional(),
    relatedPages: z.array(z.object({
      category: z.string().optional(),
      title: z.string(),
      href: z.string(),
    })).optional(),
    sources: z.array(z.object({
      label: z.string(),
      url: z.string().optional(),
    })).optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    faqTitle: z.string().optional(),
    draft: z.boolean().default(false),
    lang: z.enum(['ja', 'es']).default('ja'),
    featured: z.boolean().default(false),
    socialFeatured: z.boolean().default(false),
    author: reference('authors'),
    readingTime: z.number().optional(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    video: z.object({
      youtubeId: z.string(),
      /** YouTubeへの実際のアップロード日。省略時はpubDateを代用（SEO.astro参照）。 */
      uploadDate: z.coerce.date().optional(),
    }).optional(),
    schemaType: z.enum([
      'article',
      'recipe',
      'restaurant',
      'destination',
      'course',
      'sports',
    ]).default('article'),
    recipeData: z.object({
      cookTime: z.string().optional(),
      prepTime: z.string().optional(),
      recipeYield: z.string().optional(),
      recipeCategory: z.string().optional(),
      recipeIngredient: z.array(z.string()).optional(),
      recipeInstructions: z.array(z.string()).optional(),
    }).optional(),
    destinationData: z.object({
      locationName: z.string().optional(),
      country: z.string().default('ES'),
      attractions: z.array(z.string()).optional(),
    }).optional(),
    courseData: z.object({
      educationalLevel: z.string().optional(),
      provider: z.string().optional(),
    }).optional(),
    restaurantData: z.object({
      restaurantName: z.string().optional(),
      addressLocality: z.string().optional(),
      priceRange: z.string().optional(),
      cuisine: z.string().default('Spanish'),
    }).optional(),
    contentReview: z.object({
      needsAnnualReview: z.boolean().default(false),
      nextReviewDate: z.coerce.date(),
      reason: z.string(),
    }).optional(),
    level: z.enum(['a1', 'a2', 'b1', 'b2', 'c1', 'c2']).optional(),
    articleRole: z.enum([
      'pilar',
      'onboarding',
      'diagnostico',
      'hub-nivel',
      'spoke-gramatica',
      'spoke-vocabulario',
      'spoke-pronunciacion',
      'spoke-plan',
      'hub-dele',
      'prep-dele',
      'info-dele',
      'puente',
      'blog',
    ]).optional(),
    quiz: z.array(z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctIndex: z.number(),
      explanation: z.string(),
    })).optional(),
    levelTest: z.array(z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctIndex: z.number(),
      level: z.enum(['a1', 'a2', 'b1', 'b2']),
      explanation: z.string(),
      link: z.string(),
    })).optional(),
    sportsTeam: z.object({
      name: z.string(),
      alternateName: z.array(z.string()).optional(),
      foundingDate: z.string(),
      city: z.string().optional(),
      memberOf: z.enum(['LaLiga', 'RFEF']).optional(),
    }).optional(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    date: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string(),
    price: z.string().optional(),
    lineUrl: z.string().optional(),
    image: z.string().optional(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
  }),
});

const spainMap = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    h1: z.string().optional(),
    description: z.string().max(160),
    lead: z.string(),
    province: z.string(),
    provinceJa: z.string(),
    region: z.string(),
    capital: z.string(),
    mapUrl: z.string().url(),
    heroImage: image().optional(),
    heroImageAlt: z.string().optional(),
    linktreeUrl: z.string().url().default('https://linktr.ee/supeinclub'),
    mainDish: z.string(),
    mainDishJa: z.string(),
    bestSeason: z.string(),
    priceRange: z.string(),
    tags: z.array(z.string()),
    entities: z.array(z.string()),
    relatedTravel: z.string().optional(),
    relatedFood: z.array(z.string()).optional(),
    pubDate: z.coerce.date(),
    author: reference('authors'),
    lang: z.enum(['ja', 'es']).default('ja'),
    draft: z.boolean().default(false),
    neighborhoods: z.array(z.object({
      name: z.string(),
      nameJa: z.string(),
      vibe: z.string(),
      specialty: z.string(),
      bestTime: z.string(),
    })).optional(),
    specialties: z.array(z.object({
      name: z.string(),
      nameJa: z.string(),
      description: z.string(),
      category: z.enum(['前菜', 'メイン', 'デザート', 'ワイン', 'バル']),
      image: image().optional(),
      imageAlt: z.string().optional(),
    })).optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })),
  }),
});

const pressReleases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    date: z.coerce.date(),
    category: z.enum([
      'イベント',
      'メディア掲載',
      'コラボレーション',
      '受賞・認定',
      'プロダクト',
      'コミュニティ',
    ]),
    summary: z.string(),
    summaryEn: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    image: z.string().optional(),
    /** Pie visible bajo la imagen principal (p. ej. aviso de ilustración generada). */
    imageCaption: z.string().optional(),
    lang: z.enum(['ja', 'en']).default('ja'),
    subtitle: z.string().optional(),
    location: z.string().default('東京、日本'),
    quote: z.string().optional(),
    quoteAuthor: z.string().optional(),
    quoteRole: z.string().optional(),
    boilerplate: z.string().optional(),
    // Evento en el que participa スペイン倶楽部: si existe y aún no ha terminado,
    // la home lo muestra en la sección «NEXT EVENT» enlazando a esta nota.
    event: z
      .object({
        name: z.string(),
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        hours: z.string().optional(),
        venue: z.string(),
      })
      .optional(),
  }),
});

// Curso de 62 unidades A1-C2. Especificación: docs/language/curso-paso-a-paso.md
// (sección «Decisiones del 2 de noviembre de 2026», punto 4).
const LEVEL_NAMES = {
  A1: 'Acceso',
  A2: 'Plataforma',
  B1: 'Umbral',
  B2: 'Avanzado',
  C1: 'Dominio operativo eficaz',
  C2: 'Maestría',
} as const;

// Reparto del curso (personajes ficticios: nunca se marcan como schema Person).
// Se lee directamente de docs/language/cast.json, la fuente de verdad.
const cast = defineCollection({
  loader: file('docs/language/cast.json'),
  schema: z.object({
    name: z.string(),
    nameEs: z.string(),
    age: z.number().int().positive(),
    from: z.string(),
    role: z.string(),
    bio: z.string(),
    tagline: z.string(),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
    levels: z.array(z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'])).min(1),
    arcs: z.array(z.string()).min(1),
    voice: z.object({
      gender: z.enum(['female', 'male']),
      age: z.string(),
      accent: z.string(),
    }),
    // Ficha para la página de personajes (/language/cast/); el retrato está en /images/course/cast/<id>.webp.
    profile: z
      .object({
        birthplace: z.string(),
        home: z.string(),
        occupation: z.string(),
        education: z.string(),
        hobbies: z.array(z.string()).min(1),
        whySpanish: z.string(),
        goal: z.string(),
        personality: z.string(),
      })
      .optional(),
  }),
});

const units = defineCollection({
  // El id sale de la ruta del archivo (p. ej. "b1/subjunctive"): con el id por
  // defecto, el campo `slug` repetido en cuatro niveles colisionaría.
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/units',
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  schema: z
    .object({
      unit: z.number().int().min(1).max(62),
      level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
      levelName: z.enum(['Acceso', 'Plataforma', 'Umbral', 'Avanzado', 'Dominio operativo eficaz', 'Maestría']),
      slug: z.string().regex(/^[a-z0-9-]+$/),
      url: z.string().regex(/^\/language\/learn-spanish\/[a-c][12]\/[a-z0-9-]+\/$/),
      existing: z.boolean(),
      title: z.string().max(60),
      // Nombre corto para cabecera, listas, migas y navegación (「点過去」); `title` es el título SEO.
      shortTitle: z.string().max(30),
      titleEs: z.string(),
      description: z.string().max(160).optional(),
      grammar: z.array(z.string()).default([]),
      tenses: z.array(z.string()).default([]),
      functions: z.array(z.string()).default([]),
      canDo: z.array(z.string()).max(3).default([]),
      vocabulary: z
        // `la`: variante latinoamericana de la palabra (coche → carro); la preferencia de variedad decide cuál va primero.
        .array(z.object({ es: z.string(), ja: z.string(), la: z.string().optional(), rank: z.number().int().positive().optional(), example: z.string().optional() }))
        .max(15)
        .default([]),
      verbs: z.array(z.string()).default([]),
      duration: z.number().int().positive(),
      prev: z.number().int().min(1).max(62).nullable(),
      next: z.number().int().min(1).max(62).nullable(),
      related: z.array(z.number().int().min(1).max(62)).length(3),
      // Personajes desde cuya situación se escriben los ejemplos (docs/language/cast.json).
      cast: z.array(reference('cast')).min(1).max(2),
      audio: z.array(z.string()).default([]),
      youtubeId: z.string().default(''),
      // Ilustración de la unidad (acuarela generada con IA a partir de las referencias de Imágenes/personajes/).
      // La escribe `npm run course:images`, salvo `alt`, que se redacta a mano en japonés.
      image: z
        .object({
          src: z.string().regex(/^\/images\/course\/units\/u\d{2}\.webp$/),
          width: z.number().int().positive(),
          height: z.number().int().positive(),
          alt: z.string().min(10),
        })
        .optional(),
      quiz: z
        .array(z.object({ question: z.string(), options: z.array(z.string()).min(2), correctIndex: z.number().int().min(0), explanation: z.string() }))
        .default([]),
      skills: z.array(z.string()).optional(),
      format: z.array(z.string()).optional(),
      theme: z.array(z.string()).optional(),
      goal: z.array(z.string()).optional(),
      draft: z.boolean(),
      pubDate: z.coerce.date().optional(),
      updated: z.coerce.date(),
    })
    .superRefine((u, ctx) => {
      const fail = (message: string) => ctx.addIssue({ code: z.ZodIssueCode.custom, message: `ユニット${u.unit}: ${message}` });
      if (LEVEL_NAMES[u.level] !== u.levelName) fail(`levelName debe ser "${LEVEL_NAMES[u.level]}"`);
      if (!u.url.includes(`/${u.level.toLowerCase()}/${u.slug}/`)) fail('url no coincide con level y slug');
      u.quiz.forEach((q, i) => {
        if (q.correctIndex >= q.options.length) fail(`quiz ${i + 1}: correctIndex fuera de rango`);
      });
      // Obligatorios solo para publicar (draft: false).
      if (u.draft) return;
      if (!u.description) fail('falta description');
      if (u.canDo.length < 2) fail('canDo necesita 2-3 descriptores');
      if (u.vocabulary.length < 10) fail('vocabulary necesita 10-15 palabras');
      if (u.quiz.length !== 10) fail('quiz necesita 10 preguntas');
      if (!u.pubDate) fail('falta pubDate');
    }),
});

export const collections = { articles, authors, events, 'spain-map': spainMap, 'press-releases': pressReleases, cast, units };
