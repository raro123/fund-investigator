import { getCollection } from 'astro:content';
import { createSchemaEndpoint } from '@jdevalk/astro-seo-graph';
import {
  reportSchemaPieces,
  resolveArticleMetadata,
  resolveReportImage,
} from '../../lib/schema';
import { SITE_URL } from '../../lib/site-urls';

const site = new URL(SITE_URL);
const getReports = async () =>
  (await getCollection('reports')).filter((report) => !report.id.startsWith('_'));

export const GET = createSchemaEndpoint({
  entries: getReports,
  mapper: (report) => {
    const pageUrl = new URL(`/reports/${report.slug}/`, site).toString();
    const metadata = resolveArticleMetadata(report.data);
    const image = resolveReportImage(report.data, report.slug, site);

    return reportSchemaPieces(
      metadata,
      pageUrl,
      image.url,
      site,
      report.body,
      image.width,
      image.height,
      image.alt,
    );
  },
  cacheControl: 'public, max-age=3600',
});
