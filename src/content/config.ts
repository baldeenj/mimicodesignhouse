import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tag: z.string(),
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

export const collections = { articles, vlogs, portfolio };
