import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { SITE_URL } from '../lib/site-urls';
import { TAGLINE } from '../lib/distributor';
import { SITE_DESCRIPTION } from '../lib/schema';

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
    `> ${SITE_DESCRIPTION}`,
    '',
    '## About',
    '',
    `- [About Fund Investigator](${base}/about/): Why we exist, how we work, and how we are paid.`,
    `- [Invest with support](${base}/invest/): 30-minute introductory call, then help to choose and invest in suitable funds, from an ${TAGLINE}.`,
    `- [Mutual fund portfolio review](${base}/invest/portfolio-review/): The 3-question portfolio check (overlap, each fund against its stated benchmark index and its costs, fit to your risk profile), then a written brief.`,
    `- [Where to invest a lump sum](${base}/invest/where-to-invest-lump-sum/): How to approach investing ₹10 lakh, ₹50 lakh or ₹1 crore: when you need the money, the risk you can accept, at once or in stages, and monthly income through an SWP.`,
    `- [What is a SIF in mutual funds?](${base}/invest/sif/): Specialised Investment Funds explained: the ₹10 lakh minimum, the main risks, redemption terms and what to check first, from a registered SIF Distributor.`,
    `- [Mutual fund distributor in Delhi NCR](${base}/mutual-fund-distributor-delhi-ncr/): AMFI-registered mutual fund distributor in Delhi NCR. Meet in Delhi, Gurugram or Noida, or talk online. Our commission in writing before you choose.`,
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
