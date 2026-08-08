/**
 * JSON-LD graph builders — the single source of truth for schema.org markup.
 *
 * The site-wide Organization and WebSite are linked to each page's WebPage,
 * BreadcrumbList, primary ImageObject, and Article. Keeping the pieces in one
 * graph avoids repeated entities and gives validators one relationship map to
 * inspect.
 */

import {
  assembleGraph,
  buildArticle,
  buildBreadcrumbList,
  buildImageObject,
  buildPiece,
  buildWebPage,
  buildWebSite,
  makeIds,
} from '@jdevalk/seo-graph-core';
import type { GraphEntity } from '@jdevalk/seo-graph-core';
import { SITE_URL, DEEPDIVE_URL, TWITTER_URL, YOUTUBE_URL } from './site-urls';

const DEFAULT_OG_IMAGE = '/images/fundinvestigator-og-default.jpg';

/** Deterministic build-time social card path for a report. */
export const reportOgImagePath = (slug: string): string =>
  `/og/reports/${slug}.jpg`;

/** Matches the entity description in llms.txt.ts so both machine-readable surfaces agree. */
const ORG_DESCRIPTION =
  'Data-driven mutual fund analysis for Indian investors. We investigate fund performance using ' +
  'risk-adjusted metrics, rolling returns, and benchmark comparisons — with no commissions and no ' +
  'conflicts of interest.';

type SchemaObject = Record<string, unknown>;

interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category?: string;
  tags?: string[];
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

/** Site origin without a trailing slash. Mirrors the idiom in llms.txt.ts. */
const origin = (site?: URL): string =>
  (site?.toString() ?? SITE_URL).replace(/\/$/, '');

const idsFor = (site?: URL) => makeIds({ siteUrl: origin(site) });

// Keep the legacy singleton IDs stable while using the core builders for the
// page-level pieces. Existing crawlers and downstream consumers can therefore
// resolve the same publisher and website entities after this migration.
const orgId = (site?: URL): string => `${origin(site)}/#organization`;
const websiteId = (site?: URL): string => `${origin(site)}/#website`;

const assemble = (pieces: SchemaObject[]) =>
  assembleGraph(pieces as GraphEntity[], { warnOnDanglingReferences: true });

const asDate = (value: string): Date => new Date(`${value}T00:00:00.000Z`);

const stripMarkdown = (markdown: string): string =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/[>*_`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 10000);

/**
 * Who is credited as author on reports.
 *
 * The site speaks as "we" and names no individual, so the Organization is the
 * author. Swapping to a named Person belongs alongside a visible byline.
 */
export const authorRef = (site?: URL): SchemaObject => ({ '@id': orgId(site) });

/**
 * Resolves an image path to an absolute URL. Social platforms and Google both
 * reject relative image URLs in metadata.
 */
export const absoluteImageUrl = (src: string | undefined, site?: URL): string =>
  new URL(src || DEFAULT_OG_IMAGE, `${origin(site)}/`).toString();

/** Publisher entity. Defined in every page graph so page-local validation is complete. */
export const organizationSchema = (site?: URL): SchemaObject => buildPiece({
  '@type': 'Organization',
  '@id': orgId(site),
  name: 'Fund Investigator',
  url: `${origin(site)}/`,
  description: ORG_DESCRIPTION,
  logo: {
    '@type': 'ImageObject',
    url: `${origin(site)}/images/fi-logo.png`,
    width: 2000,
    height: 619,
  },
  sameAs: [TWITTER_URL, YOUTUBE_URL],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@fundinvestigator.com',
    contactType: 'customer support',
  },
});

export const websiteSchema = (site?: URL): SchemaObject => {
  const ids = idsFor(site);
  return {
    ...buildWebSite({
      url: `${origin(site)}/`,
      name: 'Fund Investigator',
      description: ORG_DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@id': orgId(site) },
    }, ids),
    '@id': websiteId(site),
  };
};

/**
 * Deepdive as a first-class entity rather than a bare outbound link.
 *
 * No aggregateRating or offers are asserted: the app has no user ratings and
 * its pricing is not a stable fact this site should fabricate.
 */
export const deepdiveSchema = (site?: URL): SchemaObject => buildPiece({
  '@type': 'WebApplication',
  '@id': `${DEEPDIVE_URL}/#app`,
  name: 'Deepdive',
  url: DEEPDIVE_URL,
  applicationCategory: 'FinanceApplication',
  browserRequirements: 'Requires JavaScript',
  description:
    'Interactive tool to analyse any AMFI-registered mutual fund against its benchmark — ' +
    'CAGR, SIP IRR, rolling returns, Sharpe ratio, volatility, drawdown and recovery time.',
  featureList: [
    'Benchmark comparison against Nifty and other indices',
    'Lumpsum CAGR and SIP IRR',
    'Rolling returns and rolling win rate',
    'Sharpe ratio and volatility',
    'Drawdown depth and recovery time',
  ],
  publisher: { '@id': orgId(site) },
});

export const articleSchema = (
  frontmatter: ArticleFrontmatter,
  pageUrl: string,
  site?: URL,
  articleBody?: string,
): SchemaObject => {
  const ids = idsFor(site);
  return buildArticle({
    url: pageUrl,
    isPartOf: { '@id': ids.webPage(pageUrl) },
    headline: frontmatter.title,
    description: frontmatter.description,
    image: { '@id': ids.primaryImage(pageUrl) },
    datePublished: asDate(frontmatter.date),
    dateModified: asDate(frontmatter.updated ?? frontmatter.date),
    articleSection: frontmatter.category,
    keywords: frontmatter.tags,
    inLanguage: 'en',
    isAccessibleForFree: true,
    author: authorRef(site),
    publisher: { '@id': orgId(site) },
    ...(articleBody
      ? { articleBody: stripMarkdown(articleBody), wordCount: stripMarkdown(articleBody).split(/\s+/).length }
      : {}),
  }, ids);
};

export const breadcrumbSchema = (items: BreadcrumbItem[], site?: URL): SchemaObject => {
  const ids = idsFor(site);
  const pageUrl = new URL(items.at(-1)?.path ?? '/', `${origin(site)}/`).toString();
  return buildBreadcrumbList({
    url: pageUrl,
    items: items.map((item) => ({
      name: item.name,
      url: new URL(item.path, `${origin(site)}/`).toString(),
    })),
  }, ids);
};

export const homeSchemaGraph = (site?: URL): SchemaObject => {
  const ids = idsFor(site);
  const pageUrl = `${origin(site)}/`;
  return assemble([
    organizationSchema(site),
    websiteSchema(site),
    deepdiveSchema(site),
    buildWebPage({
      url: pageUrl,
      name: 'Fund Investigator - Comprehensive Mutual Fund Analysis',
      description: 'Detailed performance metrics and risk analysis for AMFI-registered funds. Data-driven insights to support your investment decisions.',
      isPartOf: { '@id': websiteId(site) },
      inLanguage: 'en',
    }, ids),
  ]);
};

export const reportSchemaGraph = (
  frontmatter: ArticleFrontmatter,
  pageUrl: string,
  imageUrl: string,
  site?: URL,
  articleBody?: string,
): SchemaObject => {
  const ids = idsFor(site);
  const image = buildImageObject({
    pageUrl,
    url: imageUrl,
    width: 1200,
    height: 675,
    caption: frontmatter.title,
    inLanguage: 'en',
  }, ids);
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Investigations', path: '/reports/' },
    { name: frontmatter.title, path: new URL(pageUrl).pathname },
  ], site);
  const page = buildWebPage({
    url: pageUrl,
    name: frontmatter.title,
    description: frontmatter.description,
    isPartOf: { '@id': websiteId(site) },
    breadcrumb: { '@id': ids.breadcrumb(pageUrl) },
    primaryImage: { '@id': ids.primaryImage(pageUrl) },
    inLanguage: 'en',
    datePublished: asDate(frontmatter.date),
    dateModified: asDate(frontmatter.updated ?? frontmatter.date),
  }, ids);

  return assemble([
    organizationSchema(site),
    websiteSchema(site),
    image,
    page,
    articleSchema(frontmatter, pageUrl, site, articleBody),
    breadcrumb,
  ]);
};
