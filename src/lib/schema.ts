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
import { SITE_URL, TWITTER_URL, YOUTUBE_URL } from './site-urls';
import { AMFI_VERIFY_URL, ARN, CREDENTIALS, REGISTERED_NAME, TAGLINE } from './distributor';
import { services } from './services';

/** BCP 47 tag for schema.org `inLanguage` and `<html lang>`: the audience reads Indian English. */
export const LANGUAGE = 'en-IN';
/** Open Graph wants an underscore, not a hyphen. */
export const OG_LOCALE = 'en_IN';

/** Topics the publisher and the distributor both cover; shared so the two entities agree. */
const KNOWS_ABOUT = [
  'Mutual funds',
  'Specialized Investment Funds (SIF)',
  'GIFT City funds',
  'Portfolio review',
  'Risk-adjusted returns',
  'Benchmark comparison',
];

const DEFAULT_OG_IMAGE = '/images/fundinvestigator-og-default.jpg';

export const HOME_TITLE = 'Mutual Fund & SIF Investing, Expert-Led | Fund Investigator';
export const HOME_DESCRIPTION =
  `Expert-led, analysis-driven help for Indian investors to choose, invest in and review mutual funds and SIFs. AMFI-registered distributor, ${ARN}.`;

/** Deterministic build-time social card path for a report. */
export const reportOgImagePath = (slug: string): string =>
  `/og/reports/${slug}.jpg`;

/**
 * Site description for machines: the Organization and WebSite JSON-LD and the
 * llms.txt summary read this one string, so both surfaces agree. Category-level
 * evidence only: no scheme-level analysis (decision 8). Wording: decision 50
 * (backlog T-04).
 */
export const SITE_DESCRIPTION =
  'Fund Investigator publishes category-level evidence on Indian mutual funds and offers portfolio reviews. ' +
  `${REGISTERED_NAME}, ${TAGLINE}, ${ARN}.`;
const ORG_DESCRIPTION = SITE_DESCRIPTION;

type SchemaObject = Record<string, unknown>;

/** Who signs a report: the ARN holder, or the brand (see `byline` in content.config.ts). */
export type Byline = 'owner' | 'brand';

/** Visible and machine-readable author name, so the byline, the schema and the .md copy agree. */
export const reportAuthorName = (byline: Byline = 'owner'): string =>
  byline === 'owner' ? REGISTERED_NAME : 'Fund Investigator';

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category?: string;
  tags?: string[];
  byline?: Byline;
  faq?: ReadonlyArray<{ question: string; answer: string }>;
  dataset?: {
    name: string;
    description: string;
    temporalCoverage: string;
    file: string;
  };
  seo?: {
    title?: string;
    description?: string;
    image?: {
      src?: string | {
        src?: string;
        width?: number;
        height?: number;
      };
      alt: string;
    };
  };
}

export interface ResolvedReportImage {
  path: string;
  url: string;
  width: number;
  height: number;
  alt: string;
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
// The person lives on /about/ only (homepage is brand-only), so the id sits there too.
const personId = (site?: URL): string => `${origin(site)}/about/#person`;

const assemble = (pieces: SchemaObject[]) =>
  assembleGraph(pieces as GraphEntity[], { warnOnDanglingReferences: true });

const asDate = (value: string): Date => new Date(`${value}T00:00:00.000Z`);

const normalizeArticleBody = (markdown: string): string =>
  markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/[>*_`~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Resolve machine-facing report copy while retaining editorial frontmatter separately. */
export const resolveArticleMetadata = (
  frontmatter: ArticleFrontmatter,
): ArticleFrontmatter => ({
  ...frontmatter,
  title: frontmatter.seo?.title?.trim() || frontmatter.title,
  description: frontmatter.seo?.description?.trim() || frontmatter.description,
});

/**
 * Who is credited as author on reports.
 *
 * The ARN holder by default: a named, verifiable author is a trust signal on a
 * finance site, and ArticleMetadata shows the same name in the visible byline.
 * The Organization stays the publisher either way.
 */
export const authorRef = (site?: URL, byline: Byline = 'owner'): SchemaObject =>
  ({ '@id': byline === 'owner' ? personId(site) : orgId(site) });

/**
 * Resolves an image path to an absolute URL. Social platforms and Google both
 * reject relative image URLs in metadata.
 */
export const absoluteImageUrl = (src: string | undefined, site?: URL): string =>
  new URL(src || DEFAULT_OG_IMAGE, `${origin(site)}/`).toString();

/** Resolve the report image once so HTML metadata and discovery endpoints stay aligned. */
export const resolveReportImage = (
  frontmatter: ArticleFrontmatter,
  slug: string,
  site?: URL,
): ResolvedReportImage => {
  const seoImage = frontmatter.seo?.image;
  const source = seoImage?.src;
  const explicitPath = typeof source === 'string' ? source : source?.src;
  const path = explicitPath || reportOgImagePath(slug);

  return {
    path,
    url: absoluteImageUrl(path, site),
    width: typeof source === 'object' ? source.width ?? 1200 : 1200,
    height: typeof source === 'object' ? source.height ?? 675 : 675,
    alt: seoImage?.alt || frontmatter.title,
  };
};

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
  // Trust signals: /disclosures/ states how we are paid and where the data comes from.
  publishingPrinciples: `${origin(site)}/disclosures/`,
  areaServed: { '@type': 'Country', name: 'India' },
  knowsAbout: KNOWS_ABOUT,
});

export const websiteSchema = (site?: URL): SchemaObject => {
  const ids = idsFor(site);
  return {
    ...buildWebSite({
      url: `${origin(site)}/`,
      name: 'Fund Investigator',
      description: ORG_DESCRIPTION,
      inLanguage: LANGUAGE,
      publisher: { '@id': orgId(site) },
    }, ids),
    '@id': websiteId(site),
    copyrightHolder: { '@id': orgId(site) },
  };
};

export const articleSchema = (
  frontmatter: ArticleFrontmatter,
  pageUrl: string,
  site?: URL,
  articleBody?: string,
): SchemaObject => {
  const ids = idsFor(site);
  const normalizedArticleBody = articleBody ? normalizeArticleBody(articleBody) : '';
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
    inLanguage: LANGUAGE,
    isAccessibleForFree: true,
    author: authorRef(site, frontmatter.byline),
    publisher: { '@id': orgId(site) },
    ...(normalizedArticleBody
      ? {
          articleBody: normalizedArticleBody.slice(0, 10000),
          wordCount: normalizedArticleBody.split(/\s+/).length,
        }
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
    // No Deepdive entity until the tool's outputs are cleared (COM-022, 2026-10-19).
    buildWebPage({
      url: pageUrl,
      name: HOME_TITLE,
      description: HOME_DESCRIPTION,
      isPartOf: { '@id': websiteId(site) },
      inLanguage: LANGUAGE,
    }, ids),
  ]);
};

/** FAQPage main entity: one Question per `faq` item. */
const faqQuestions = (faq: NonNullable<ArticleFrontmatter['faq']>): SchemaObject[] =>
  faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  }));

/**
 * The report's data download as a schema.org Dataset, so answer engines and
 * dataset search can cite the numbers with their source and period.
 */
export const datasetSchema = (
  frontmatter: ArticleFrontmatter,
  pageUrl: string,
  site?: URL,
): SchemaObject => {
  const dataset = frontmatter.dataset!;
  return buildPiece({
    '@type': 'Dataset',
    '@id': `${pageUrl}#dataset`,
    name: dataset.name,
    description: dataset.description,
    url: pageUrl,
    temporalCoverage: dataset.temporalCoverage,
    spatialCoverage: { '@type': 'Country', name: 'India' },
    creator: { '@id': orgId(site) },
    publisher: { '@id': orgId(site) },
    isAccessibleForFree: true,
    inLanguage: LANGUAGE,
    keywords: frontmatter.tags,
    datePublished: asDate(frontmatter.date),
    dateModified: asDate(frontmatter.updated ?? frontmatter.date),
    distribution: [{
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: new URL(dataset.file, `${origin(site)}/`).toString(),
    }],
  });
};

export const reportSchemaPieces = (
  frontmatter: ArticleFrontmatter,
  pageUrl: string,
  imageUrl: string,
  site?: URL,
  articleBody?: string,
  imageWidth = 1200,
  imageHeight = 675,
  imageCaption = frontmatter.title,
): GraphEntity[] => {
  const ids = idsFor(site);
  const image = buildImageObject({
    pageUrl,
    url: imageUrl,
    width: imageWidth,
    height: imageHeight,
    caption: imageCaption,
    inLanguage: LANGUAGE,
  }, ids);
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Investigations', path: '/reports/' },
    { name: frontmatter.title, path: new URL(pageUrl).pathname },
  ], site);
  const builtPage = buildWebPage({
    url: pageUrl,
    name: frontmatter.title,
    description: frontmatter.description,
    isPartOf: { '@id': websiteId(site) },
    breadcrumb: { '@id': ids.breadcrumb(pageUrl) },
    primaryImage: { '@id': ids.primaryImage(pageUrl) },
    inLanguage: LANGUAGE,
    datePublished: asDate(frontmatter.date),
    dateModified: asDate(frontmatter.updated ?? frontmatter.date),
  }, ids);
  // A report with a `faq` list is also an FAQPage: the questions become its main entity.
  const page = frontmatter.faq?.length
    ? { ...builtPage, '@type': ['WebPage', 'FAQPage'], mainEntity: faqQuestions(frontmatter.faq) }
    : builtPage;

  return [
    organizationSchema(site),
    websiteSchema(site),
    // The author entity must be in the same graph, or its reference dangles.
    ...((frontmatter.byline ?? 'owner') === 'owner' ? [personSchema(site)] : []),
    image,
    page,
    articleSchema(frontmatter, pageUrl, site, articleBody),
    breadcrumb,
    ...(frontmatter.dataset ? [datasetSchema(frontmatter, pageUrl, site)] : []),
  ] as GraphEntity[];
};

export const reportSchemaGraph = (
  frontmatter: ArticleFrontmatter,
  pageUrl: string,
  imageUrl: string,
  site?: URL,
  articleBody?: string,
  imageWidth = 1200,
  imageHeight = 675,
  imageCaption = frontmatter.title,
): SchemaObject => assemble(reportSchemaPieces(
  frontmatter,
  pageUrl,
  imageUrl,
  site,
  articleBody,
  imageWidth,
  imageHeight,
  imageCaption,
));

interface PageGraphInput {
  path: string;
  name: string;
  description: string;
  /** schema.org page type; AboutPage is not in the core builder's union, so it is set after building. */
  type?: 'WebPage' | 'AboutPage' | 'CollectionPage';
  breadcrumbName: string;
  mainEntity?: SchemaObject;
  /** Entities the page describes, added to the graph after the page itself. */
  entities?: SchemaObject[];
}

/**
 * Shared shape for static pages: publisher + website + typed WebPage + breadcrumb,
 * so every indexable page carries a complete, linked graph.
 */
const staticPageGraph = (
  { path, name, description, type = 'WebPage', breadcrumbName, mainEntity, entities = [] }: PageGraphInput,
  site?: URL,
): SchemaObject => {
  const ids = idsFor(site);
  const pageUrl = new URL(path, `${origin(site)}/`).toString();
  const page = buildWebPage({
    url: pageUrl,
    name,
    description,
    isPartOf: { '@id': websiteId(site) },
    breadcrumb: { '@id': ids.breadcrumb(pageUrl) },
    inLanguage: LANGUAGE,
    ...(mainEntity ? { mainEntity } : {}),
  }, ids);

  return assemble([
    organizationSchema(site),
    websiteSchema(site),
    { ...page, '@type': type },
    breadcrumbSchema([{ name: 'Home', path: '/' }, { name: breadcrumbName, path }], site),
    ...entities,
  ]);
};

/**
 * The distributor behind the brand. ARN and credentials are the E-E-A-T signal
 * for a finance site; they mirror what /about/ shows, from distributor.ts.
 */
export const personSchema = (site?: URL): SchemaObject => buildPiece({
  '@type': 'Person',
  '@id': personId(site),
  name: REGISTERED_NAME,
  url: `${origin(site)}/about/`,
  jobTitle: TAGLINE,
  worksFor: { '@id': orgId(site) },
  identifier: {
    '@type': 'PropertyValue',
    propertyID: 'AMFI Registration Number (ARN)',
    value: ARN,
    url: AMFI_VERIFY_URL,
  },
  hasCredential: CREDENTIALS.map((credential) => ({
    '@type': 'EducationalOccupationalCredential',
    name: credential.text,
  })),
  knowsAbout: KNOWS_ABOUT,
});

/** @param description Same string as the page's meta description, so the two stay aligned. */
export const aboutSchemaGraph = (name: string, description: string, site?: URL): SchemaObject =>
  staticPageGraph({
    path: '/about/',
    name,
    description,
    type: 'AboutPage',
    breadcrumbName: 'About',
    mainEntity: { '@id': orgId(site) },
    entities: [personSchema(site)],
  }, site);

/** The /invest/ page describes one service with four stages, provided by the Organization. */
export const investSchemaGraph = (name: string, description: string, site?: URL): SchemaObject => {
  const serviceId = `${origin(site)}/invest/#service`;
  return staticPageGraph({
    path: '/invest/',
    name,
    description,
    breadcrumbName: 'Invest with support',
    mainEntity: { '@id': serviceId },
    entities: [buildPiece({
      '@type': 'Service',
      '@id': serviceId,
      name: 'Invest with support',
      serviceType: 'Mutual fund, SIF and GIFT City fund distribution',
      description,
      provider: { '@id': orgId(site) },
      areaServed: { '@type': 'Country', name: 'India' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Invest with support',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.title },
        })),
      },
    })],
  }, site);
};

/** @param reports Current reports in display order, as path + title. */
export const reportsIndexSchemaGraph = (
  name: string,
  description: string,
  reports: ReadonlyArray<{ path: string; title: string }>,
  site?: URL,
): SchemaObject => staticPageGraph({
  path: '/reports/',
  name,
  description,
  type: 'CollectionPage',
  breadcrumbName: 'Investigations',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: reports.map((report, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: report.title,
      url: new URL(report.path, `${origin(site)}/`).toString(),
    })),
  },
}, site);
