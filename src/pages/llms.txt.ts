import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE_URL, DEEPDIVE_URL } from '../lib/site-urls';

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
    '> Data-driven mutual fund analysis for Indian investors. We investigate fund performance using risk-adjusted metrics, rolling returns, and benchmark comparisons — with no commissions and no conflicts of interest.',
    '',
    '## About',
    '',
    `- [About Fund Investigator](${base}/about/): Why we built this and our approach to evidence-based fund analysis.`,
    `- [Deepdive App](${DEEPDIVE_URL}): Interactive tool to analyze any AMFI-registered mutual fund yourself.`,
    '',
    '## Investigations',
    '',
    ...sorted.map(
      (r) =>
        `- [${r.data.title}](${base}/reports/${r.slug}/): ${r.data.description}`
    ),
    '',
    '## Optional',
    '',
    `- [All Investigations](${base}/reports/): Index of current published fund investigations.`,
    `- [Disclaimer](${base}/disclaimer/): Data sources, methodology notes, and investment risk disclosures.`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
