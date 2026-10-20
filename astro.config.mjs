import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import seoGraph from '@jdevalk/astro-seo-graph/integration';
import { gitLastmod } from '@jdevalk/astro-seo-graph';
import remarkInvestigationBriefCta from './src/lib/remark-investigation-brief-cta.mjs';
import rehypeSplitFootnotes from './src/lib/rehype-split-footnotes.mjs';
import rehypeScrollableTables from './src/lib/rehype-scrollable-tables.mjs';

const INDEXNOW_KEY = '14a30902d8a12fd849ea16a55b53e034';
const isProductionBuild =
  process.env.CF_PAGES === '1' && process.env.CF_PAGES_BRANCH === 'main';

const reportSourcePath = (url) => {
  const pathname = new URL(url).pathname;
  const match = pathname.match(/^\/reports\/([^/]+)\/$/);
  return match ? `src/content/reports/${match[1]}.md` : null;
};

// Static pages map one-to-one to a file in src/pages ("/" → index.astro, "/about/" → about.astro).
const pageSourcePath = (url) => {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return 'src/pages/index.astro';
  const match = pathname.match(/^\/([^/]+)\/$/);
  return match ? `src/pages/${match[1]}.astro` : null;
};

// Commits that touched many pages without a content change (title suffix sweep,
// formatting). Skipping them keeps lastmod meaning "the content changed", which
// is the only lastmod Google trusts.
const LASTMOD_EXCLUDE_COMMITS = ['6835eed'];

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      entryLimit: 1000,
      filter: (page) =>
        !page.includes('/styleguide') &&
        !page.includes('/404') &&
        !page.includes('/_TEMPLATE'),
      chunks: {
        reports: (item) => reportSourcePath(item.url) ? item : undefined,
      },
      serialize: (item) => {
        const sourcePath = reportSourcePath(item.url) ?? pageSourcePath(item.url);
        if (sourcePath) {
          const lastmod = gitLastmod(sourcePath, {
            depth: 20,
            excludeCommits: LASTMOD_EXCLUDE_COMMITS,
          });
          if (lastmod) item.lastmod = lastmod;
        }
        return item;
      },
    }),
    seoGraph({
      validateH1: true,
      validateUniqueMetadata: true,
      validateImageAlt: true,
      validateMetadataLength: true,
      validateInternalLinks: {
        skip: (href) => href.startsWith('/api/')
      },
      ...(isProductionBuild && process.env.INDEXNOW_KEY === INDEXNOW_KEY
        ? {
            indexNow: {
              key: INDEXNOW_KEY,
              host: 'fundinvestigator.com',
              siteUrl: 'https://fundinvestigator.com',
            },
          }
        : {}),
    })
  ],
  site: 'https://fundinvestigator.com',

  markdown: {
    remarkPlugins: [remarkInvestigationBriefCta],
    rehypePlugins: [rehypeScrollableTables, rehypeSplitFootnotes]
  },

  // Image optimization settings
  image: {
    // Formats to generate (in order of preference)
    formats: ['avif', 'webp', 'png', 'jpg'],

    // Quality settings per format
    formatOptions: {
      avif: { quality: 80 },   // Aggressive compression
      webp: { quality: 85 },   // Moderate compression
      png: { quality: 90 },    // Near-lossless for charts
      jpg: { quality: 85 }
    },

    // Allow remote image optimization (for future CDN integration)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudflare.com'  // Future: Cloudflare Images
      }
    ]
  }
});
