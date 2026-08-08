import { getCollection } from 'astro:content';
import { createMarkdownEndpoint } from '@jdevalk/astro-seo-graph';
import { SITE_URL } from '../../lib/site-urls';

const getReports = async () =>
  (await getCollection('reports')).filter((report) => !report.id.startsWith('_'));

const preserveLocalImageContext = (body: string): string =>
  body.replace(
    /!\[([^\]]*)\]\(\.\.\/\.\.\/assets\/images\/[^)]+\)/g,
    (_image, alt: string) => alt ? `*Figure: ${alt}*` : '',
  );

export const getStaticPaths = async () =>
  (await getReports()).map((report) => ({
    params: { slug: report.slug },
  }));

export const GET = createMarkdownEndpoint({
  entries: getReports,
  mapper: (report, slug) => report.slug !== slug ? null : ({
    frontmatter: {
      title: report.data.title,
      canonical: new URL(`/reports/${report.slug}/`, SITE_URL),
      pubDate: report.data.date,
      updatedDate: report.data.updated,
      author: 'Fund Investigator',
      description: report.data.seo?.description ?? report.data.description,
      tags: report.data.tags,
      categories: [report.data.category],
    },
    body: report.body,
    transformBody: preserveLocalImageContext,
  }),
  cacheControl: 'public, max-age=3600',
});
