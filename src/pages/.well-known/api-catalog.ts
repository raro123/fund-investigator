import { createApiCatalog } from '@jdevalk/astro-seo-graph';
import { SITE_URL } from '../../lib/site-urls';

export const GET = createApiCatalog({
  siteUrl: SITE_URL,
  schemaEndpoints: [
    { path: '/schema/reports.json', schemaType: 'Article' },
  ],
  schemaMap: { path: '/schemamap.xml' },
  additional: [
    { anchor: '/feed.xml' },
  ],
  cacheControl: 'public, max-age=3600',
});
