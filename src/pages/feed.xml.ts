import rss from '@astrojs/rss';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { APIRoute } from 'astro';
import remarkInvestigationBriefCta from '../lib/remark-investigation-brief-cta.mjs';
import { resolveArticleMetadata } from '../lib/schema';
import { SITE_URL } from '../lib/site-urls';

const imageModules = import.meta.glob<ImageMetadata>(
  '../assets/images/**/*.{avif,gif,jpeg,jpg,png,webp}',
  { eager: true, import: 'default' },
);
const imagesByPath = new Map(
  Object.entries(imageModules).map(([modulePath, image]) => [
    new URL(modulePath, import.meta.url).pathname,
    image,
  ]),
);

const imagePlaceholderPattern = /__ASTRO_IMAGE_="([^"]+)"/g;

const escapeAttribute = (value: unknown): string =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const absoluteUrl = (value: string, baseUrl: URL): string => {
  if (value.startsWith('#') || value.startsWith('data:')) return value;
  return new URL(value.replaceAll('&amp;', '&'), baseUrl).toString();
};

const absoluteSrcset = (srcset: string, baseUrl: URL): string =>
  srcset
    .split(',')
    .map((candidate) => {
      const [src, ...descriptor] = candidate.trim().split(/\s+/);
      return [absoluteUrl(src, baseUrl), ...descriptor].join(' ');
    })
    .join(', ');

const absolutizeContentUrls = (html: string, pageUrl: URL): string =>
  html
    .replace(/\s(href|src)="([^"]+)"/g, (_attribute, name, value) =>
      ` ${name}="${escapeAttribute(absoluteUrl(value, pageUrl))}"`)
    .replace(/\ssrcset="([^"]+)"/g, (_attribute, value) =>
      ` srcset="${escapeAttribute(absoluteSrcset(value, pageUrl))}"`);

const resolveContentImages = async (
  html: string,
  sourceFile: URL,
  pageUrl: URL,
): Promise<string> => {
  const replacements = await Promise.all(
    [...html.matchAll(imagePlaceholderPattern)].map(async ([placeholder, encodedProperties]) => {
      const properties = JSON.parse(
        encodedProperties.replaceAll('&#x22;', '"').replaceAll('&#x27;', "'"),
      );
      const { src, index: _index, ...imageAttributes } = properties;
      const imageMetadata = imagesByPath.get(new URL(src, sourceFile).pathname);

      if (!imageMetadata) {
        throw new Error(`RSS image import not found: ${src} in ${sourceFile.pathname}`);
      }

      const image = await getImage({ ...imageAttributes, src: imageMetadata });
      const { index: _generatedIndex, ...generatedAttributes } = image.attributes;
      const attributes = {
        ...generatedAttributes,
        src: absoluteUrl(image.src, pageUrl),
        ...(image.srcSet.attribute
          ? { srcset: absoluteSrcset(image.srcSet.attribute, pageUrl) }
          : {}),
      };
      const serializedAttributes = Object.entries(attributes)
        .filter(([, value]) => value !== undefined && value !== null && value !== false)
        .map(([name, value]) => `${name}="${escapeAttribute(value)}"`)
        .join(' ');

      return [placeholder, serializedAttributes] as const;
    }),
  );

  const resolvedHtml = replacements.reduce(
    (content, [placeholder, attributes]) => content.replace(placeholder, attributes),
    html,
  );

  if (resolvedHtml.includes('__ASTRO_IMAGE_')) {
    throw new Error(`Unresolved Astro image placeholder in RSS content: ${sourceFile.pathname}`);
  }

  return absolutizeContentUrls(resolvedHtml, pageUrl);
};

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site ?? new URL(SITE_URL);
  const reports = await getCollection('reports');
  const processor = await createMarkdownProcessor({
    remarkPlugins: [remarkInvestigationBriefCta],
  });
  const currentReports = reports
    .filter((report) => !report.id.startsWith('_') && report.data.status !== 'archived')
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const items = await Promise.all(currentReports.map(async (report) => {
    const sourceFile = new URL(`../content/reports/${report.id}.md`, import.meta.url);
    const pageUrl = new URL(`/reports/${report.slug}/`, siteUrl);
    const metadata = resolveArticleMetadata(report.data);
    const rendered = await processor.render(report.body, {
      frontmatter: report.data,
      fileURL: sourceFile,
    });
    const content = await resolveContentImages(rendered.code, sourceFile, pageUrl);

    return {
      title: metadata.title,
      description: metadata.description,
      link: `/reports/${report.slug}/`,
      pubDate: new Date(`${report.data.date}T00:00:00Z`),
      categories: [report.data.category, ...report.data.tags],
      content,
    };
  }));

  return rss({
    title: 'Fund Investigator Investigations',
    description: 'Mutual fund research with benchmark comparisons, risk-adjusted metrics, and historical evidence.',
    site: siteUrl,
    items,
    customData: '<language>en-IN</language>',
    trailingSlash: true,
  });
};
