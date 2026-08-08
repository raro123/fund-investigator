import { getCollection } from 'astro:content';
import { createSchemaMap, gitLastmod } from '@jdevalk/astro-seo-graph';
import { SITE_URL } from '../lib/site-urls';

const reports = (await getCollection('reports'))
  .filter((report) => !report.id.startsWith('_'));
const contentLastModified = reports.reduce((latest, report) => {
  const value = report.data.updated ?? report.data.date;
  return value > latest ? value : latest;
}, '1970-01-01');
const codeLastModified = [
  gitLastmod('src/lib/schema.ts'),
  gitLastmod('src/pages/schema/reports.json.ts'),
].filter((date): date is Date => date !== null)
  .reduce((latest, date) => date > latest ? date : latest, new Date(0));
const lastModified = new Date(Math.max(
  new Date(`${contentLastModified}T00:00:00Z`).getTime(),
  codeLastModified.getTime(),
));

export const GET = createSchemaMap({
  siteUrl: SITE_URL,
  entries: [
    { path: '/schema/reports.json', lastModified },
  ],
  cacheControl: 'public, max-age=3600',
});
