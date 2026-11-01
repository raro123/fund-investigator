import { defineCollection, z } from 'astro:content';
import { seoSchema } from '@jdevalk/astro-seo-graph';

const reports = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string().min(5).max(120),
    /** Machine-facing: meta description, og/twitter, JSON-LD, llms.txt. ~155 chars, query-shaped. */
    description: z.string().min(15).max(160),
    /** Human-facing: the subtitle under the H1 and the teaser on report cards. */
    hook: z.string().optional(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),  // Feeds dateModified in Article JSON-LD; defaults to `date`
    readTime: z.string(),
    /** Who signs the report. 'owner' credits the ARN holder (visible byline + Person author in JSON-LD).
     *  A fund analysis that names a scheme decides case by case (content_philosophy_v2.md, bylines):
     *  set 'brand' there to sign as Fund Investigator. */
    byline: z.enum(['owner', 'brand']).optional().default('owner'),
    // Adding a category? Add it in BOTH places, or the filter pill silently never appears:
    //   1. this enum (the gate — an unlisted value fails the build)
    //   2. `categoryLabels` in src/lib/report-categories.ts (display label + pill order)
    category: z.enum(['Fund Analysis', 'Category Comparison', 'Methodology']),
    tags: z.array(z.string()),
    /** Lifecycle is separate from topical category: archived reports remain public historical snapshots. */
    status: z.enum(['current', 'archived']).optional().default('current'),
    /** Last observation included in an archived report, formatted as YYYY-MM-DD. */
    analysisThrough: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    /** Current report readers should visit from an archived snapshot. */
    supersededBy: z.string().startsWith('/reports/').optional(),
    /** Service invite above the notes. Only for guides that name no scheme: a fund
     *  analysis never links to the service (content_philosophy_v2.md, Two Modes).
     *  Without it, the report ends with the subscription card. */
    serviceInvite: z.object({
      heading: z.string().max(80),
      line: z.string().max(220),
      /** utm_campaign on the booking link, e.g. 'c01'. Defaults to the report slug. */
      campaign: z.string().regex(/^[a-z0-9_-]+$/).optional(),
    }).optional(),
    /** Questions answered in the body ("## Questions"), as FAQPage JSON-LD for
     *  answer engines. The visible text stays in the body: keep the two the same. */
    faq: z.array(z.object({
      question: z.string().min(5),
      answer: z.string().min(5),
    })).optional(),
    /** The report's data download, as Dataset JSON-LD. The file lives in
     *  public/data/reports/ and holds category-level percentiles only (H-05, R-09). */
    dataset: z.object({
      name: z.string().min(5),
      description: z.string().min(50).max(5000),
      /** ISO 8601 interval, e.g. 2021-01-01/2026-10-19 */
      temporalCoverage: z.string().regex(/^\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}$/),
      file: z.string().regex(/^\/data\/reports\/[a-z0-9_-]+\.csv$/),
    }).optional(),
    /** Optional per-report overrides validated by astro-seo-graph. */
    seo: seoSchema(image).optional(),
    /** Report card record, max 3. With values (fund analyses): "Key figures CAGR 25.0% · …".
     *  Labels only (guides): "Covers Returns · Risk · Consistency". */
    keyMetrics: z.array(z.object({
      label: z.string(),
      value: z.string().optional(),
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
