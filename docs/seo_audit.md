# Fund Investigator Astro SEO Audit

**Site:** https://fundinvestigator.com
**Initial audit:** 2026-07-22
**Document updated:** 2026-08-08
**Audit scope:** Astro technical SEO, structured data, indexing, Open Graph, AIO/GEO readiness, and YMYL trust signals

## Executive summary

Fund Investigator has a strong static Astro foundation: server-rendered report content, descriptive
metadata, canonical URLs, structured data, source notes, explicit analysis periods, and a coherent
five-check investigation method.

The initial Astro SEO baseline was **49/90**. Phases 0–3 are now closed as source-code milestones;
production-only checks remain explicit release gates. The completed implementation closes these technical gaps:

- Shared head metadata now runs through `@jdevalk/astro-seo-graph`.
- Reports emit linked Organization, WebSite, ImageObject, WebPage, Article, and BreadcrumbList graphs.
- Content schemas enforce SEO title, description, and date formats at build time.
- Reports have deterministic build-time JPEG social cards.
- RSS with resolved absolute content URLs, per-collection sitemaps, Git-derived `lastmod`, and
  production-gated IndexNow are implemented.
- Build-time validation covers H1s, metadata uniqueness and length, image alt text, and internal links.

The remaining high-impact work is publisher authority and reproducibility: visible authorship/review,
a public calculation methodology, chart data accessibility, editorial/corrections policies, and
external measurement through Search Console and Bing Webmaster Tools. Cloudflare content negotiation
and live verification remain planned for the deployment phase.

## Baseline Astro SEO score

| Category | Baseline | Current status |
|---|---:|---|
| 1. `<Seo>` component and head metadata | 7/10 | Implemented; needs final production verification |
| 2. Structured data / JSON-LD graph | 6/10 | Linked graph implemented; external validator checks pending |
| 3. Content collections and SEO schema | 6/10 | Build-time schema and `articleBody` implemented |
| 4. Open Graph images | 3/10 | Report cards implemented; generic non-report fallback remains |
| 5. Sitemaps and indexing | 3/10 | RSS, Git `lastmod`, sitemap chunks, and IndexNow implemented |
| 6. Agent discovery | 4/10 | `llms.txt` exists; schema endpoints and markdown alternates pending |
| 7. Performance | 7/10 | Static output and optimized assets; field data still unavailable |
| 8. Redirects and error handling | 6/10 | `_redirects` and FuzzyRedirect implemented; deployed 404 status pending |
| 9. Build-time validation and content quality | 7/10 | Astro SEO validators and external-link CI are configured |
| **Initial total** | **49/90** | **Technical remediation through Phase 3 complete** |

The baseline score is retained for comparison. A final score should be assigned after Phases 4–5 and
production deployment checks rather than treating local implementation as proof of live SEO performance.

## Astro-specific findings and remediation status

### 1. Head metadata and canonical URLs

**Initial findings**

- Metadata was not consistently centralized.
- Canonicals, robots directives, Open Graph, and Twitter metadata needed a single shared implementation.
- Noindex utility pages needed canonical suppression.
- The homepage and several legal/report descriptions needed sharper metadata copy.

**Implemented**

- `src/layouts/Layout.astro` now uses the package `<Seo>` component.
- Fallbacks resolve title from the page title and description from description, excerpt, or first paragraph.
- Canonicals and `og:url` derive from `Astro.site`.
- Robots metadata includes `max-snippet:-1`, `max-image-preview:large`, and `max-video-preview:-1`.
- `/404/` and `/styleguide/` are marked noindex.
- RSS discovery is emitted with `<link rel="alternate" type="application/rss+xml">`.
- Homepage metadata now uses the specific title `Indian Mutual Fund Analysis | Fund Investigator` and
  a matching comparison-focused description in both HTML and WebPage schema.

**Status:** Complete in source; verify the deployed origin before release.

### 2. Structured data / JSON-LD

**Initial findings**

- Reports needed a linked graph rather than isolated flat entities.
- Stable `@id` references were needed for the publisher, website, page, image, article, and breadcrumb.
- Article body text was not consistently available to machine consumers.

**Implemented**

- `src/lib/schema.ts` uses `@jdevalk/seo-graph-core` builders and `assembleGraph()`.
- Report graphs include Organization, WebSite, ImageObject, WebPage, Article, and BreadcrumbList.
- `assembleGraph(..., { warnOnDanglingReferences: true })` validates references during builds.
- Markdown-stripped `articleBody` is included up to 10,000 characters, while `wordCount` is calculated
  once from the full normalized report body before truncation.
- Report JSON-LD now references the generated 1200×675 social card.
- Per-report SEO title, description, image URL, alt text, and image dimensions flow through head metadata
  and the linked JSON-LD graph together.

**Remaining**

- Run the deployed homepage and report URLs through Google Rich Results Test and Schema Markup Validator.
- Add visible authorship and reviewer entities when truthful publisher identity is available.

**Status:** Strong technical foundation; trust and external validation remain open.

### 3. Content collections and SEO schema

**Initial findings**

- Report metadata needed build-time length and date validation.
- The content model needed a supported place for per-report SEO overrides.
- Archived reports needed lifecycle checks and successor links.

**Implemented**

- `src/content.config.ts` enforces title length, description length, and `YYYY-MM-DD` dates.
- Optional `seoSchema(image)` overrides are validated and applied to head metadata, RSS copy, and JSON-LD.
  The visible report H1 continues to use the editorial `title`; an explicit SEO image replaces the generated
  report card in Open Graph and JSON-LD, otherwise the deterministic generated card remains the fallback.
- Archived reports require `analysisThrough` and `supersededBy` values.
- Article schema exposes stripped report body text and word count.

**Remaining**

- Publish a canonical methodology hub documenting formulas, data alignment, risk-free rate, SIP timing,
  rolling windows, drawdown definitions, source identifiers, and calculation versions.
- Add accessible data tables or downloadable CSV files beside charts where licensing permits.

**Status:** Build-time technical controls complete; reproducibility is still a high-priority content gap.

### 4. Open Graph images

**Initial findings**

- Reports fell back to one generic image.
- Report metadata used 1200×630 dimensions instead of the preferred 1200×675 report-card format.

**Implemented**

- `src/pages/og/reports/[...slug].jpg.ts` generates deterministic cards with Satori and Sharp.
- Six report cards are emitted as JPEG files at `1200×675`.
- `ArticleLayout.astro` and report JSON-LD reference `/og/reports/<slug>.jpg`.
- A valid `seo.image` override is honored consistently by Open Graph and JSON-LD, including its actual
  dimensions and alt/caption; reports without one retain the generated card.
- The generated card was visually inspected locally.

**Remaining**

- Consider a 1200×675 branded fallback for non-report pages.
- Recheck cards after major title or brand changes.

**Status:** Report coverage complete; fallback-page coverage is partial.

### 5. Sitemaps, RSS, and indexing

**Initial findings**

- Sitemap entries lacked trustworthy modification dates.
- There was no RSS feed.
- IndexNow was absent.
- Sitemap entries were not separated by content type.

**Implemented**

- `astro.config.mjs` uses `gitLastmod()` to populate report `<lastmod>` values.
- Sitemap output is split into `sitemap-reports-0.xml` and `sitemap-pages-0.xml`.
- `src/pages/feed.xml.ts` publishes full HTML content for four current reports. Astro content-image
  placeholders are resolved through the asset pipeline, and content image `src`/`srcset` values plus
  internal links are made absolute for feed readers. The build throws if a placeholder cannot be resolved.
- `src/pages/14a30902d8a12fd849ea16a55b53e034.txt.ts` serves the IndexNow verification key.
- IndexNow submission is gated to Cloudflare Pages production builds on the `main` branch and requires
  a matching `INDEXNOW_KEY` environment variable.

**Deployment action required**

1. Deploy once without `INDEXNOW_KEY`.
2. Verify the public key URL returns the key.
3. Add the matching `INDEXNOW_KEY` to the Cloudflare Pages Production environment.
4. Deploy again to enable submissions.
5. Register the site in Google Search Console and Bing Webmaster Tools and submit `sitemap-index.xml`.

**Status:** Source and build artifacts complete; webmaster configuration and live verification pending.

### 6. Agent discovery and AIO/GEO

**Implemented**

- `llms.txt` exists and lists current investigations with descriptions.
- Report pages are server-rendered and extractable without client-side JavaScript.
- `/schema/reports.json` exposes six linked report graphs as corpus-wide JSON-LD.
- `/schemamap.xml` advertises the report schema endpoint, and `robots.txt` includes its `Schemamap:` directive.
- Every report has a clean `/reports/<slug>.md` alternate and advertises it from the HTML head. Pages without
  a Markdown representation do not emit a dangling discovery link.
- `/.well-known/api-catalog` lists the report schema endpoint, schema map, and RSS feed.
- `robots.txt` explicitly allows search and real-time AI input while reserving training rights and requesting
  reference-style use.
- Cloudflare `_headers` restores content types, `noindex`, cache policy, and per-report canonical headers for
  the static machine-readable files.
- `public/_headers` adds sitewide discovery links, asset caching, query-parameter normalization guidance, and
  baseline security headers.
- `docs/DEPLOYMENT.md` documents the report-only `Accept: text/markdown` URL Rewrite Transform Rule.
- `.github/workflows/link-check.yml` builds the site, verifies the static `/subscribe/` redirect, and checks
  generated internal routes as a blocking gate; the external-link scan is advisory because third-party sources
  can block automated requests or move pages.

**Remaining deployment and Phase 5 work**

- Create the documented Cloudflare Transform Rule and verify content negotiation over HTTPS.
- Verify the sitewide headers over HTTPS after the next deployment.

**Authority gaps outside Astro code**

- No visible author/reviewer identity or credentials.
- No editorial policy or corrections policy.
- No canonical public methodology and calculation changelog.
- Small topical corpus and no established AI-citation measurement baseline.

**Status:** Phase 4 source work is complete; Cloudflare rule deployment, live verification, and publisher
authority work remain open.

### 7. Performance

**Strengths**

- Static Astro output is the default.
- Report images use Astro image optimization.
- Client JavaScript is limited to existing interactive features.
- Fonts are self-hosted.

**Remaining**

- Add production cache headers for `/_astro/*` assets.
- Consider `No-Vary-Search` for tracking parameters.
- Measure Core Web Vitals through Search Console or real-user analytics once traffic is available.
- Complete mobile/accessibility browser checks against a deployed preview.

**Status:** Good baseline; field performance is unmeasured.

### 8. Redirects and error handling

**Implemented**

- `public/_redirects` contains permanent `/subscribe` and `/subscribe/` redirects.
- Internal links use trailing-slash URLs.
- Utility pages are excluded from the sitemap.

**Remaining**

- Confirm the deployed `/404/` response returns HTTP 404 rather than a soft 200.
- Inventory historical URLs before adding further redirect rules.

**Status:** Basic redirect coverage complete; deployed 404 verification pending.

### 9. Build-time validation and content quality

**Implemented**

`seoGraph()` runs on every build with:

- H1 validation
- Metadata uniqueness validation
- Metadata length validation
- Image alt validation
- Internal-link validation

The latest production build passed all five validators across 14 pages.

**Remaining**

- Keep short metadata strings in the metadata-check workflow.
- Use readability audits for individual long-form reports, not as a substitute for technical validation.

**Status:** Technical build gate complete; external link monitoring is advisory and remains an editorial
maintenance signal rather than a deployment blocker.

**External-source policy:** Keep primary official links when they support a material claim. Prefer stable
institutional or fund landing pages for general statements; use dated factsheets or PDFs when the date-specific
source is the evidence, and record the relevant period in the article. A bot-blocked or moved external URL is a
maintenance signal, not by itself a reason to remove a citation and weaken the article's provenance.

## YMYL trust and AIO priorities

These are the largest remaining SEO and AI-answer visibility gaps because the site covers financial
decisions:

1. Add truthful visible organizational authorship and reviewer accountability.
2. Publish an editorial policy and corrections policy.
3. Publish the complete calculation methodology and link to it from each report.
4. Make chart values available as HTML tables or downloadable datasets.
5. Show Published and Updated dates when they differ.
6. Build a focused research cluster around benchmarks, rolling returns, Sharpe ratio, drawdowns, and SIP IRR.
7. Establish a small repeated AI-citation and search-visibility measurement set.

Do not fabricate credentials, add invisible schema claims, create thin query-variant pages, or expand
`llms.txt` into a parallel content site.

## Phase status

| Phase | Scope | Status |
|---|---|---|
| Phase 0 | Branch setup and source verification gate | Complete in source; live parity remains a release gate |
| Phase 1 | Shared `<Seo>` metadata and canonical foundation | Complete |
| Phase 2 | Linked JSON-LD graph and content schema validation | Complete |
| Phase 3 | OG images, RSS, sitemap `lastmod`, IndexNow | Complete |
| Phase 4 | Schema endpoints, schema map, markdown alternates, API catalog, Cloudflare negotiation | Complete in source; dashboard rule and live verification pending |
| Phase 5 | Headers, FuzzyRedirect, external-link CI, final metadata/live audit | Source implementation mostly complete; live audit pending |

## Verification record

- `npm run build`: passed with 14 pages built.
- Astro SEO validators: H1, internal links, image alt, metadata length, and metadata uniqueness all passed.
- Generated OG cards: six JPEGs, each 1200×675; one card visually inspected.
- RSS: `/feed.xml` contains four current reports with full article HTML content, 15 absolute optimized image
  URLs, zero `__ASTRO_IMAGE_` placeholders, and no root-relative `href` or `src` attributes.
- JSON-LD: the longest current report emits a 10,000-character `articleBody` and a `wordCount` derived from
  its full normalized body rather than the truncated field.
- Homepage: HTML title/description and WebPage schema name/description match the revised metadata exactly.
- Sitemap: `sitemap-index.xml` references page and report chunks; report entries include Git-derived `lastmod`.
- IndexNow: key route returns the committed key; production submission still requires Cloudflare configuration.
- Agent discovery: the corpus endpoint contains 26 deduplicated entities—six each of Article, WebPage,
  ImageObject, and BreadcrumbList plus one Organization and one WebSite—with no dangling `@id` references.
- Markdown alternates: six report files generated; local source-image paths are replaced with descriptive
  figure text, report HTML contains the matching alternate link, and non-report HTML does not.
- Schema map, API catalog, Content Signals, `Schemamap:`, and Cloudflare static header rules match the built
  artifacts.
- Local Cloudflare Pages verification: Markdown, report schema, schema map, and API catalog routes returned
  HTTP 200 with the expected MIME type, cache policy, and `X-Robots-Tag`; the Markdown route also expanded
  its per-report canonical `Link` header correctly.
- `git diff --check`: passed.
- Local build-artifact checks are complete. Deployed mobile, HTTP status, external structured-data validators,
  webmaster registration, and production IndexNow submission remain open; this document does not treat them
  as completed checks.

## Release gates and next actions

### Required before production release

- Confirm the deployed site matches this repository. The earlier audit observed possible source/live content
  drift, so deployment verification is a release gate.
- Verify canonical URLs, report OG images, JSON-LD, RSS, sitemap index, and the IndexNow key over HTTPS.
- Configure Cloudflare Production `INDEXNOW_KEY` only after the key route is live.
- Register Google Search Console and Bing Webmaster Tools; submit the sitemap index.
- Confirm the deployed 404 status and review Cloudflare robots/content-signal policy.

### Recommended next implementation

Complete the remaining Phase 5 final metadata/live audit and deployed-site verification. Then re-score the
nine Astro categories.

## Primary references

- [Astro SEO skill](https://github.com/jdevalk/seo-graph)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Bing: IndexNow](https://www.indexnow.org/)
- [Cloudflare: Managed robots.txt and Content Signals](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)
