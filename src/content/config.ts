import { defineCollection, z, reference } from 'astro:content';

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    slug: z.string().optional(),
    avatar: z.string().optional(),
    jobTitle: z.string(),
    bio: z.string().max(300),
    bioLong: z.string().optional(),
    knowsAbout: z.array(z.string()),
    sameAs: z.array(z.string()).optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    lang: z.enum(['ja', 'es']).default('ja'),
    active: z.boolean().default(true),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    lead: z.string().max(300),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    pillar: z.enum(['travel', 'food', 'language', 'living', 'culture', 'football']),
    cluster: z.string(),
    intent: z.enum(['informational', 'commercial', 'transactional', 'navigational']),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()),
    entities: z.array(z.string()),
    relatedArticles: z.array(z.string()).optional(),
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    draft: z.boolean().default(false),
    lang: z.enum(['ja', 'es']).default('ja'),
    featured: z.boolean().default(false),
    author: reference('authors'),
    readingTime: z.number().optional(),
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

export const collections = { articles, authors, events };
