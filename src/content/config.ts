import { defineCollection, reference, z } from 'astro:content';

const categories = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Tina stores references as a repo-relative path
    // (src/content/categories/design.json); reduce it to the entry id.
    tag: z
      .string()
      .transform((v) => v.replace(/^.*\//, '').replace(/\.json$/, ''))
      .pipe(reference('categories')),
    date: z.coerce.date(),
    heroImage: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const vlogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    episode: z.number(),
    date: z.coerce.date(),
    videoUrl: z.string(),
    thumbnailUrl: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    client: z.string(),
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    imageUrl: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { categories, articles, vlogs, portfolio };
