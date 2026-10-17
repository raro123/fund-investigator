import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE_URL, DEEPDIVE_URL } from '../lib/site-urls';
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
    `- [Invest with support](${base}/invest/): 30-minute portfolio review call and help to choose and invest in suitable funds, from an ${TAGLINE}.`,
    `- [Mutual fund portfolio review](${base}/invest/portfolio-review/): For existing investors: a 30-minute call, then a review of overlap, benchmarks, costs and fit to your goals, with a short written brief.`,
    `- [Start investing in mutual funds](${base}/invest/start-investing-mutual-funds/): For new investors with savings: a 30-minute call, then a starting brief with your goals, a simple mix and investing in stages.`,
    `- [Is a SIF right for you?](${base}/invest/sif/): For experienced investors: whether a Specialised Investment Fund suits your portfolio, with the minimum, risks, redemption conditions and costs in writing.`,
    `- [GIFT City funds](${base}/invest/gift-city-funds/): For residents in India and NRIs who want part of their money in US dollars: fit, currency risk, the funding route and costs, before you decide.`,
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
    `- [Disclaimer](${base}/disclaimer/): Data sources, methodology notes, distributor disclosure, and investment risk disclosures.`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
