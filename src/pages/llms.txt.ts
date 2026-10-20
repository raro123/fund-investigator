import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site-urls';
import { ARN, TAGLINE } from '../lib/distributor';

export const GET: APIRoute = async ({ site }) => {
  const reports = await getCollection('reports');

  // Sort by date descending
  const sorted = reports
    .filter((report) => report.data.status !== 'archived')
    .sort(
      (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

  const base = site?.toString().replace(/\/$/, '') ?? SITE_URL;

  const lines: string[] = [
    '# Fund Investigator',
    '',
    `> Data-driven mutual fund analysis for Indian investors. We investigate fund performance using risk-adjusted metrics, rolling returns, and benchmark comparisons. Fund Investigator is run by an ${TAGLINE} (${ARN}).`,
    '',
    '## About',
    '',
    `- [About Fund Investigator](${base}/about/): Why we exist, how we work, and how we are paid.`,
    `- [Invest with support](${base}/invest/): 30-minute introductory call, then help to choose and invest in suitable funds, from an ${TAGLINE}.`,
    // No Deepdive entry until the tool's outputs are cleared (COM-022, 2026-10-19).
    '',
    ...(sorted.length > 0
      ? [
          '## Investigations',
          '',
          ...sorted.map(
            (r) =>
              `- [${r.data.title}](${base}/reports/${r.slug}/): ${r.data.description}`
          ),
          '',
        ]
      : []),
    '## Optional',
    '',
    `- [All Investigations](${base}/reports/): Index of current published fund investigations.`,
    `- [Disclosures](${base}/disclosures/): How we are paid, data sources, what clients receive before investing, and SIF eligibility and risk.`,
    `- [Disclaimer](${base}/disclaimer/): Data sources, methodology notes, distributor disclosure, and investment risk disclosures.`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
