import { defineCollection, z } from 'astro:content';

const reports = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    readTime: z.string(),
    category: z.enum(['Fund Analysis', 'Category Comparison', 'Methodology']),
    tags: z.array(z.string()),
    featured: z.boolean().optional().default(false),
    coverImage: image().optional(),
    coverImageAlt: z.string().optional(),
    fmContentType: z.string().optional(),
  }),
});

export const collections = { reports };
