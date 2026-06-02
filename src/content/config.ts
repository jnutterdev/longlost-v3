import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tag: z.enum(['essay', 'take', 'note', 'review', 'fragment']),
    readTime: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
