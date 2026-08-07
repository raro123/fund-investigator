/**
 * JSON-LD structured data builders — single source of truth for schema.org markup.
 *
 * Pages pass the returned objects to Layout's `jsonLd` prop, which serialises them
 * into a single <script type="application/ld+json"> in <head>.
 *
 * Entities are linked by stable @id rather than restated, so an Article's author and
 * publisher resolve to the one Organization defined on the homepage.
 *
 * @example
 * import { organizationSchema, websiteSchema } from '../lib/schema';
 * <Layout jsonLd={[organizationSchema(Astro.site), websiteSchema(Astro.site)]}>
 */

import { SITE_URL, DEEPDIVE_URL, TWITTER_URL, YOUTUBE_URL } from './site-urls';

const DEFAULT_OG_IMAGE = '/images/fundinvestigator-og-default.jpg';

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

const orgId = (site?: URL): string => `${origin(site)}/#organization`;
const websiteId = (site?: URL): string => `${origin(site)}/#website`;

/**
 * Who is credited as author on reports.
 *
 * The site speaks as "we" and names no individual, so the Organization is the author.
 * Swapping to a named Person is a change to this one function — but only alongside a
 * visible byline, since schema must describe what the page actually shows.
 */
export const authorRef = (site?: URL): SchemaObject => ({ '@id': orgId(site) });

/**
 * Resolves an image path to an absolute URL, falling back to the default OG image.
 *
 * Social platforms and Google both reject relative image URLs in metadata.
 */
export const absoluteImageUrl = (src: string | undefined, site?: URL): string =>
  new URL(src || DEFAULT_OG_IMAGE, `${origin(site)}/`).toString();

/** Publisher entity. Defined once (homepage); referenced by @id everywhere else. */
export const organizationSchema = (site?: URL): SchemaObject => ({
  '@context': 'https://schema.org',
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
  sameAs: [
    TWITTER_URL,
    YOUTUBE_URL,
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@fundinvestigator.com',
    contactType: 'customer support',
  },
});

export const websiteSchema = (site?: URL): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId(site),
  name: 'Fund Investigator',
  url: `${origin(site)}/`,
  description: ORG_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': orgId(site) },
});

/**
 * Deepdive as a first-class entity rather than a bare outbound link.
 *
 * Two fields are deliberately absent:
 * - `aggregateRating`: the app has no user ratings, and inventing them is fabrication.
 * - `offers`: Deepdive is free today, but pricing may change and a stale `price: "0"` would
 *   be a false claim. Silence is accurate; an outdated number is not.
 *
 * Both are needed for a Google rich result, so this entity will not draw one. Its value is
 * entity resolution for LLM/AI-overview extraction and tying the tool to its publisher.
 */
export const deepdiveSchema = (site?: URL): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'WebApplication',  // Subtype of SoftwareApplication: runs in the browser (Streamlit)
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
  imageUrl: string,
  site?: URL,
): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${pageUrl}#article`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
  headline: frontmatter.title,
  description: frontmatter.description,
  image: imageUrl,
  datePublished: frontmatter.date,
  dateModified: frontmatter.updated ?? frontmatter.date,
  articleSection: frontmatter.category,
  keywords: frontmatter.tags,
  inLanguage: 'en',
  isAccessibleForFree: true,
  author: authorRef(site),
  publisher: { '@id': orgId(site) },
});

export const breadcrumbSchema = (items: BreadcrumbItem[], site?: URL): SchemaObject => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: new URL(item.path, `${origin(site)}/`).toString(),
  })),
});
