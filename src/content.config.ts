import { defineCollection, z } from 'astro:content';
import { reportMetricIconNames } from './lib/report-metrics';

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
    // Adding a category? Add it in BOTH places, or the filter pill silently never appears:
    //   1. this enum (the gate — an unlisted value fails the build)
    //   2. `categoryLabels` in src/pages/reports.astro (display label + pill order)
    category: z.enum(['Fund Analysis', 'Category Comparison', 'Methodology']),
    tags: z.array(z.string()),
    featured: z.boolean().optional().default(false),
    /** Lifecycle is separate from topical category: archived reports remain public historical snapshots. */
    status: z.enum(['current', 'archived']).optional().default('current'),
    /** Last observation included in an archived report, formatted as YYYY-MM-DD. */
    analysisThrough: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    /** Current report readers should visit from an archived snapshot. */
    supersededBy: z.string().startsWith('/reports/').optional(),
    coverImage: image().optional(),
    coverImageAlt: z.string().optional(),
    keyMetrics: z.array(z.object({
      label: z.string(),
      value: z.string().optional(),
      icon: z.enum(reportMetricIconNames).optional(),
    }).refine((metric) => metric.value || metric.icon, {
      message: 'A key metric must provide either a value or an icon.',
    })).max(3).optional(),
  }).superRefine((report, ctx) => {
    if (report.status === 'archived' && !report.analysisThrough) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['analysisThrough'],
        message: 'Archived reports must declare the last date included in the analysis.',
      });
    }

    if (report.status === 'archived' && !report.supersededBy) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['supersededBy'],
        message: 'Archived reports must link to the current analysis.',
      });
    }
  }),
});

export const collections = { reports };
