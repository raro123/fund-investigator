import rss from '@astrojs/rss';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import remarkInvestigationBriefCta from '../lib/remark-investigation-brief-cta.mjs';
import { SITE_URL } from '../lib/site-urls';

export const GET: APIRoute = async ({ site }) => {
  const reports = await getCollection('reports');
  const processor = await createMarkdownProcessor({
    remarkPlugins: [remarkInvestigationBriefCta],
  });
  const currentReports = reports
    .filter((report) => !report.id.startsWith('_') && report.data.status !== 'archived')
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const items = await Promise.all(currentReports.map(async (report) => {
    const sourceFile = new URL(`../content/reports/${report.id}.md`, import.meta.url);
    const rendered = await processor.render(report.body, {
      frontmatter: report.data,
      fileURL: sourceFile,
    });

    return {
      title: report.data.title,
      description: report.data.description,
      link: `/reports/${report.slug}/`,
      pubDate: new Date(`${report.data.date}T00:00:00Z`),
      categories: [report.data.category, ...report.data.tags],
      content: rendered.code,
    };
  }));

  return rss({
    title: 'Fund Investigator Investigations',
    description: 'Mutual fund research with benchmark comparisons, risk-adjusted metrics, and historical evidence.',
    site: site ?? SITE_URL,
    items,
    customData: '<language>en-IN</language>',
    trailingSlash: true,
  });
};
