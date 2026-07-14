import { defineCollection, z } from 'astro:content';

const reports = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    /** Machine-facing: meta description, og/twitter, JSON-LD, llms.txt. ~155 chars, query-shaped. */
    description: z.string(),
    /** Human-facing: the subtitle under the H1 and the teaser on report cards. */
    hook: z.string().optional(),
    date: z.string(),
    updated: z.string().optional(),  // Feeds dateModified in Article JSON-LD; defaults to `date`
    readTime: z.string(),
    category: z.enum(['Fund Analysis', 'Category Comparison', 'Methodology']),
    tags: z.array(z.string()),
    featured: z.boolean().optional().default(false),
    coverImage: image().optional(),
    coverImageAlt: z.string().optional(),
    keyMetrics: z.array(z.object({ label: z.string(), value: z.string() })).max(3).optional(),
  }),
});

export const collections = { reports };
