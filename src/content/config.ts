import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tag: z.enum(['essay', 'take', 'note', 'review', 'fragment']),
    readTime: z.string(),
    excerpt: z.string(),
    image: z.union([
      z.string().transform(src => ({ src, alt: '' })),
      z.object({ src: z.string(), alt: z.string().optional().default('') }),
    ]).optional(),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
    discussionUrl: z.string().url().optional(),
  }),
});

export const collections = { posts };
