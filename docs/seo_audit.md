# Fund Investigator SEO and AIO Audit

**Audit conducted:** 2026-07-22  
**Documented:** 2026-07-23  
**Last updated:** 2026-07-23 (homepage title and Google presentation review added)  
**Site:** https://fundinvestigator.com  
**Primary emphasis:** AI-answer visibility and citation readiness (AIO/GEO), followed by conventional SEO  
**Site stage:** New publication with three current investigations and two public historical reports

## Executive Summary

Fund Investigator has a strong technical and editorial foundation for a new publication. The site is
crawlable, statically rendered, well structured, evidence-led, and already more extractable than most
financial-content sites. Canonicals, a sitemap, descriptive metadata, Article and Breadcrumb structured
data, source footnotes, explicit analysis periods, limitations, and answer-first summaries are all in
place.

The largest constraint is not a missing AI tag or schema type. It is establishing enough visible
authority, reproducibility, topical depth, and external recognition for search engines and AI answer
systems to trust a new financial publisher. Mutual-fund analysis is a financial/YMYL topic, so the
identity and credentials of the people producing and reviewing the work, the calculation method, and
the underlying evidence need to be as visible as the conclusions.

The recommended priority is:

1. Make authorship, review, editorial controls, and calculation methodology explicit.
2. Make chart evidence available as HTML data and/or downloadable files.
3. Accelerate discovery through webmaster tools, accurate sitemap modification dates, and IndexNow.
4. Build a focused body of original research around the existing five-check method.
5. Measure AI citations and search discovery consistently instead of relying on one-off prompt tests.

## Scope and Method

The audit reviewed:

- Astro layouts, content schemas, route generation, report frontmatter, article Markdown, internal
  links, `robots.txt`, `llms.txt`, and structured-data builders.
- A successful local production build and the generated HTML, sitemap, metadata, headings, and JSON-LD.
- Live HTTP headers and the rendered report response.
- Live `robots.txt`, `llms.txt`, `sitemap-index.xml`, and `sitemap-0.xml`.
- HTTP responses presented to Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, PerplexityBot, and
  training-oriented crawler user agents.
- A spot search for indexed Fund Investigator pages.
- Current primary guidance from Google, OpenAI, Anthropic, Perplexity, Bing, Cloudflare, and relevant
  academic GEO research.

The audit did not have access to Google Search Console, Bing Webmaster Tools, Cloudflare crawler logs,
analytics, backlink indexes, or field Core Web Vitals. A Google PageSpeed API request could not be used
because the public quota was unavailable. Index coverage, impressions, inbound links, citation counts,
and real-user performance therefore remain measurement gaps rather than confirmed defects.

## Overall Assessment

| Area | Assessment | Main implication |
|---|---|---|
| Crawl access | Strong | Major search and AI-search crawlers can reach complete static HTML |
| Answer extraction | Strong | Current reports lead with direct numerical answers, tables, and assessment headings |
| Source quality | Strong | Reports cite SEBI, AMFI, NSE Indices, fund factsheets, and report assumptions |
| Structured data | Strong foundation | Article, Organization, WebSite, WebApplication, and Breadcrumb entities are present |
| Publisher trust | Needs substantial work | No visible human byline, reviewer, credentials, editorial policy, or corrections policy |
| Reproducibility | Partial | Sources and some assumptions are shown, but the complete calculation method and data are not |
| Topical authority | Early stage | The publication has a coherent method but only a small current research corpus |
| Discovery/freshness | Early stage | New pages are only days old; the sitemap lacks modification dates and IndexNow is absent |
| Measurement | Not established | AI citations, index coverage, backlinks, and field performance are not yet being measured |

---

## AIO Audit

Here, AIO means optimization for inclusion, grounding, and citation in AI-generated answers. It is
also commonly described as Generative Engine Optimization (GEO). Current Google guidance is explicit
that there is no special AI schema or required AI text file for AI Overviews or AI Mode: pages first
need sound search eligibility, crawlability, helpful content, and visible textual evidence.

### What Works Well

#### 1. AI-search crawler access is healthy

The live report returned HTTP 200 with the full HTML response to Googlebot, Bingbot, OAI-SearchBot,
Claude-SearchBot, and PerplexityBot. The important article content is server-rendered and does not
depend on client-side JavaScript.

Cloudflare prepends managed directives to the repository's `public/robots.txt`. The resulting live
policy currently declares `search=yes`, `ai-train=no`, and `use=reference`. It blocks training-oriented
crawlers including GPTBot, ClaudeBot, and Google-Extended, while leaving their search-oriented
counterparts accessible.

This is broadly consistent with the desired policy of allowing search and citations while reserving
training rights:

- OpenAI identifies OAI-SearchBot as the crawler needed for ChatGPT search summaries and citations;
  GPTBot is the separate potential-training control.
- Anthropic distinguishes Claude-SearchBot from the training-oriented ClaudeBot.
- PerplexityBot is intended to surface and link websites in Perplexity search and is not described as
  a foundation-model training crawler.
- Blocking Google-Extended does not affect inclusion or ranking in Google Search, including its normal
  search crawl through Googlebot.

The direct HTTP tests demonstrate CDN accessibility, not whether a crawler will choose to index or cite
a page. Training bots receiving HTTP 200 when impersonated by `curl` does not override their obligation
to follow the disallow rule in `robots.txt`.

#### 2. Reports are highly extractable

The current investigation format is well suited to answer engines:

- The opening paragraph provides the fund, benchmark, period, and principal numerical findings.
- The five questions are explicit.
- A compact Key Takeaways table maps each check to evidence and interpretation.
- Question-shaped headings are followed by clearly labelled Assessment sections.
- Conclusions distinguish evidence from forecast and discuss contrary findings.
- Definitions, analysis settings, assumptions, limitations, and source notes are in HTML text.

`src/content/reports/ppfas-flexicap-five-checks.md` is the strongest current example. It gives a direct
answer, includes counter-evidence from 2022 and 2026 year to date, and avoids turning historical
outperformance into a recommendation.

#### 3. The evidence base is credible

Current reports cite first-party or authoritative sources including SEBI rules, AMFI NAV history, NSE
Indices, AMFI scheme codes, and fund-house factsheets. They also identify important calculation
assumptions such as rolling-window length, SIP timing, and the risk-free rate used for Sharpe ratios.

This supports citation-worthiness and differentiates the publication from generic return summaries.

#### 4. The machine-readable foundation is coherent

`src/lib/schema.ts` defines stable Organization and WebSite identities, a WebApplication entity for
Deepdive, Article markup, and breadcrumbs. Reports emit the full Organization and WebSite records next
to the Article, so author and publisher references resolve when an article is read in isolation.

`src/pages/llms.txt.ts` provides a concise publication description and links only to current
investigations. That is a sensible supplementary discovery surface, but it should not be treated as a
substitute for indexing or authority. Google specifically says separate AI text files are not required
for its generative-search features.

### AIO Gaps and Recommendations

#### AIO-1 — Critical: visible authorship and review authority are missing

**Finding:** Reports are credited to the Organization in JSON-LD, but the visible article has no author
or reviewer byline. The About page describes the publication's values but not the people, relevant
experience, review process, or accountability behind financial claims.

**Why it matters:** Google treats subjects that can affect financial stability as YMYL and recommends
clear answers to who created the content, how it was produced, and why it exists. AI answer systems also
need stable, corroborated entities when deciding whether a source is safe to cite.

**Recommendation:**

- Add a visible author and, where appropriate, a reviewer to every investigation.
- Create profile pages with truthful experience, areas of expertise, responsibilities, and relevant
  public profiles. Do not invent or overstate credentials.
- If publication under a named individual remains deferred until SEBI Research Analyst certification,
  add a visible organizational byline now and an honest explanation of the research and review process.
- Publish an editorial policy and corrections policy, with dated corrections attached to affected
  reports.
- Keep structured data aligned with the visible page. When a named author is introduced, add a `Person`
  entity and profile URL rather than changing JSON-LD alone.

This reinforces existing pending decision #29 in `docs/project_log.md`; it does not override that
decision or imply certification.

#### AIO-2 — Critical: the analysis is not yet fully reproducible

**Finding:** Reports identify major sources and some assumptions, but there is no canonical methodology
page documenting the complete calculation pipeline. The About page's claim of transparent methodology
is stronger than the public evidence currently available.

**Recommendation:** Publish a methodology hub covering:

- Exact data sources, identifiers, data frequency, access dates, and update cadence.
- NAV and total-return treatment, date alignment, holidays, missing observations, and rounding.
- CAGR and total-return formulas.
- SIP cash-flow timing and XIRR/IRR calculation.
- Rolling-return window construction, overlap, pre-window history, and rolling win-rate definition.
- Volatility annualisation and return frequency.
- Sharpe formula, risk-free-rate source and rationale, and known limitations.
- Maximum drawdown and recovery-time definitions.
- Benchmark-selection rules and cases where the official benchmark is an imperfect portfolio match.
- Tool/version information, known limitations, correction handling, and a methodology changelog.

Each report should link to the relevant methodology anchors and state any report-specific deviation.

#### AIO-3 — High: chart evidence is not fully available as text or data

**Finding:** Charts have excellent alt text and surrounding interpretation, but not every plotted series
or observation is available as an HTML table or download. An answer engine cannot reliably recover all
values from a chart image.

**Recommendation:**

- Add an adjacent accessible HTML data table for each chart, optionally collapsed for visual readers.
- Offer a small CSV download containing the displayed series when licensing permits.
- Include scheme code, benchmark identifier, analysis start/end dates, source URLs, data access date,
  calculation version, and units.
- Add a concise source line to each figure caption.
- Use Dataset structured data only when an actual visible/downloadable dataset is published; do not add
  schema that overstates what is on the page.

#### AIO-4 — High: topical authority is coherent but shallow

**Finding:** The current corpus has one methodology investigation and two current fund investigations.
This is a strong beginning but not enough evidence for broad authority across Indian mutual-fund
analytics.

**Recommendation:** Build a small, tightly connected research library around the existing method:

- How to choose a fair mutual-fund benchmark.
- Rolling returns and rolling win rate, including common misinterpretations.
- Sharpe ratio for Indian mutual funds: assumptions and limitations.
- Maximum drawdown and recovery time.
- SIP IRR versus lump-sum CAGR.
- Original category-level studies that apply the method consistently and disclose selection rules.

Prioritize original analysis and meaningful additions. Do not create separate low-value pages for every
query variation or mechanically scale thin fund summaries; Google warns that query-variant page
generation can become scaled-content abuse.

#### AIO-5 — High: AI visibility is not being measured

**Recommendation:** Establish a modest baseline rather than buying a large GEO tool immediately:

- Enable Bing Webmaster Tools and its AI Performance reporting.
- Track ChatGPT referrals through `utm_source=chatgpt.com`.
- Review Cloudflare AI Crawl Control for crawler requests, failures, and policy violations.
- Maintain 20–30 representative questions across fund analysis, benchmarks, risk, and methodology.
- Test the same prompts repeatedly across ChatGPT, Google, Bing/Copilot, Claude, and Perplexity.
- Record citation presence, cited URL, answer accuracy, competing sources, and changes over time.

AI answers are probabilistic. One prompt run should not be treated as evidence of visibility or absence.

#### AIO-6 — Medium: `ai-input` is unspecified in Cloudflare's live policy

**Finding:** The live Content Signal states `search=yes`, `ai-train=no`, and `use=reference`, but omits
`ai-input`. Cloudflare defines an omitted value as neither an explicit grant nor restriction.

**Recommendation:** If Fund Investigator wants to explicitly permit real-time grounding and citation,
consider declaring `ai-input=yes` while retaining `ai-train=no`. Review and implement this in the
Cloudflare dashboard rather than adding potentially conflicting duplicate directives blindly in the
repository. Treat it as rights/policy clarity, not a ranking factor.

#### AIO-7 — Medium: publication and modification information is inconsistent between visible text and markup

**Finding:** `dateModified` is emitted in Article JSON-LD, but the masthead displays only the original
publication date.

**Recommendation:** Show both Published and Updated dates when they differ. Ensure visible values,
frontmatter, JSON-LD, sitemap `lastmod`, and any report changelog agree.

#### AIO-8 — Low: avoid overinvesting in `llms.txt` and speculative AI markup

Keep `llms.txt` concise and current. Do not prioritize FAQ schema, keyword repetition, invented entity
relationships, or unverified AIO checklists. There is no special Google schema for AI Overviews or AI
Mode.

---

## SEO Audit

### What Works Well

- The production build succeeds in Astro's static-output mode.
- Key content is available in initial HTML.
- Canonical URLs resolve from `Astro.site` and match the live URL pattern.
- `robots.txt`, the sitemap index, and the child sitemap are live and accessible.
- Each inspected indexable page has exactly one H1.
- Report titles and descriptions are unique and query-specific.
- Article and Breadcrumb JSON-LD is present on report pages.
- Chart alt text is detailed and captions describe the evidence.
- The current reports link to the five-check methodology.
- Archived reports remain transparent historical snapshots, are excluded from current listings and
  `llms.txt`, and point readers to successor content.
- Astro image optimization, static rendering, and the mobile-first layout provide a sound performance
  base, although field performance was not measured.

### SEO Gaps and Recommendations

#### SEO-1 — Critical for a new site: discovery and index coverage are immature

**Finding:** A spot search surfaced the older archived PPFAS report but did not surface the newer current
reports. This is not yet a failure: the current pages were published or updated only days before the
audit, and spot search is not an authoritative index-coverage test.

**Recommendation:**

- Verify both Google Search Console and Bing Webmaster Tools.
- Submit `sitemap-index.xml` in both products.
- Inspect the three current report URLs and the reports index.
- Request indexing for priority pages after confirming the rendered canonical and structured data.
- Monitor discovered, crawled, indexed, excluded, and duplicate URL states weekly during launch.
- Record the first crawl and index date for each investigation.

#### SEO-2 — High: sitemap entries have no accurate modification dates

**Finding:** `sitemap-0.xml` contains only `<loc>` elements. It does not expose report frontmatter
`updated` dates.

**Recommendation:** Add accurate `<lastmod>` values derived from `updated ?? date`. Use modification
dates for legal and index pages only when their visible content materially changes. Google may use
`lastmod` when it is consistently and verifiably accurate; do not update every URL on every build.

#### SEO-3 — High: Bing and participating engines are not notified of new or changed reports

**Recommendation:** Implement IndexNow for publication, material updates, archival, successor changes,
and deletion. It should submit only changed URLs, not the unchanged catalogue on every deployment.

#### SEO-4 — High: financial trust improvements are needed

The authorship, review, methodology, editorial-policy, and corrections-policy work in AIO-1 and AIO-2
is equally important for conventional SEO because the site covers financial decisions.

#### SEO-5 — Medium: every report uses the same generic article/share image

**Finding:** No report currently sets `coverImage`; Article JSON-LD and social metadata therefore use the
generic Fund Investigator image. This is already recorded as pending decision #27.

**Recommendation:** Generate a relevant branded 1200×630 report card and, where feasible, high-resolution
16:9, 4:3, and 1:1 variants. The image should identify the fund, benchmark, analysis period, and one
headline metric without becoming an unreadable chart thumbnail. Correct the hard-coded image dimensions
in `src/layouts/Layout.astro` as part of the same change.

#### SEO-6 — Medium: internal discovery can become stronger as the catalogue grows

**Recommendation:**

- Implement pending decision #32: up to two curated current related investigations after an article.
- Add visible breadcrumbs that match the existing Breadcrumb JSON-LD.
- Link methodology terms to stable definitions where helpful, without over-linking every occurrence.
- Introduce category hubs only after each category has enough distinct content to justify a useful page.
- Keep all important links as normal crawlable anchors in the server-rendered HTML.

#### SEO-7 — Medium: archived and current reports need careful signal consolidation

**Finding:** Historical and current reports can target similar fund queries. Keeping archives is valid
because they are materially different time-bounded records, but it can split attention on a young site.

**Recommendation:**

- Preserve archives only while they provide distinct historical value.
- Retain explicit Historical wording, analysis-through dates, and prominent successor links.
- Keep self-canonicals while the historical page intentionally stands on its own.
- Use a redirect only if an archive is retired and no longer intended as an independent record.
- Do not canonicalize substantively different history to the current report merely to force consolidation.

#### SEO-8 — Medium: the homepage title is valid but weakly differentiated

**Finding:** The homepage currently emits:

> Fund Investigator - Comprehensive Mutual Fund Analysis

The title is unique, relevant, and a reasonable length, but "Comprehensive" is generic, the title does
not identify the Indian market, and it does not express the publication's strongest distinction:
investigating performance beyond headline returns. The visible H1, "Fund Performance, Investigated",
is more memorable but gives Google a second, different framing of the page.

The current search-crawler representation uses the supplied homepage title. A recent searchable
snapshot still contained older homepage sections, indicating normal recrawl lag for a new publication
rather than a title-specific defect. Google can nevertheless rewrite a title link from the `<title>`,
visible H1 and other prominent text, `og:title`, or links pointing to the page. It can also choose a
query-specific snippet from on-page text instead of using the meta description verbatim.

**Recommendation:** Change the homepage title to:

> Indian Mutual Fund Analysis Beyond Returns | Fund Investigator

This leads with the market and topic before introducing a still-new brand, while "Beyond Returns"
communicates the site's actual editorial proposition. A brand-first alternative is:

> Fund Investigator | Indian Mutual Fund Analysis Beyond Returns

Also replace the current generic meta description with a more specific summary:

> Evidence-led analysis of Indian mutual funds using fair benchmarks, rolling returns, risk, drawdowns and SIP performance. No commissions or fund rankings.

The WebSite structured data already provides the preferred site name, "Fund Investigator", separately
from the per-page title. Keep that entity name unchanged. Treat this as a worthwhile click-through and
positioning improvement, not a substitute for the higher-impact authority, methodology, and discovery
work above.

#### SEO-9 — Low: remaining metadata and publication-feed polish

- Add `og:url` matching the canonical URL.
- Improve the short reports-index meta description so it communicates the five-check approach and
  Indian mutual-fund focus.
- Add RSS/Atom output and `<link rel="alternate">` feed discovery for subscribers and aggregators.
- Several report titles are 64–68 characters and may truncate, but the fund and benchmark terms are
  already first, so this is not urgent.
- Legal-page descriptions are short but have little commercial search importance.

#### SEO-10 — Unmeasured: Core Web Vitals and real-user page experience

The static HTML, modest generated page size, optimized report images, and limited client JavaScript are
positive indicators. They are not substitutes for field data. Once Search Console has sufficient
traffic, review LCP, INP, and CLS by template and device. Complete pending decision #33's responsive and
accessibility verification before making speculative performance changes.

---

## Prioritized Delivery Plan

### Phase 1 — Trust and discovery foundation

1. Verify Google Search Console and Bing Webmaster Tools; submit and inspect priority URLs.
2. Add accurate sitemap `lastmod` and implement scoped IndexNow notification.
3. Add visible organizational authorship/research accountability now, respecting the certification
   constraint in pending decision #29.
4. Publish editorial and corrections policies.
5. Publish the canonical calculation methodology hub.
6. Display accurate Published and Updated dates.

### Phase 2 — Evidence and extraction

1. Add HTML data tables and optional CSV downloads for report charts.
2. Add calculation version, access date, identifiers, and source lines to report evidence.
3. Add visible breadcrumbs and curated related investigations.
4. Generate report-specific social and Article images through the already-considered build-time system.

### Phase 3 — Authority and measurement

1. Publish a focused methodology/explainer cluster and original category research.
2. Build genuine external awareness around original datasets and analysis rather than generic link outreach.
3. Begin repeated AI-citation monitoring and track referral/conversion quality.
4. Review Search Console indexing, query coverage, and Core Web Vitals monthly during the publication's
   first growth phase.

## What Not to Prioritize

- Expanding `llms.txt` into a parallel content site.
- Adding unsupported or invisible structured-data claims.
- FAQ schema solely for AI visibility.
- Keyword stuffing or writing separate pages for every query variation.
- Large batches of shallow fund summaries.
- Replacing distinct historical pages with canonicals to current pages without a content-based reason.
- Purchasing a complex GEO platform before establishing a small repeatable baseline.

## Success Measures

Track progress with a small scorecard:

| Outcome | Initial measure |
|---|---|
| Discovery | Current investigations indexed; sitemap processed without material errors |
| Freshness | Time from publish/update to crawl and index |
| Search visibility | Non-brand impressions and clicks by investigation/methodology cluster |
| AI visibility | Citation rate across a fixed repeated prompt set, by engine and cited URL |
| Trust | All current reports have visible accountability, method link, sources, and update status |
| Reproducibility | Every chart has accessible data and a traceable calculation/source record |
| Engagement | Qualified visits, report completion proxies, and subscribe conversions by source |
| Quality control | Corrections logged and structured data kept aligned with visible content |

## Primary Sources

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Generative AI search optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: Helpful, reliable, people-first content and YMYL](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Google: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: Crawling controls and Google-Extended](https://developers.google.com/crawling/docs/about-crawling)
- [Google: Influencing title links](https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets)
- [Google: How search snippets are created](https://developers.google.com/search/docs/appearance/snippet)
- [Google: Site names in Search](https://developers.google.com/search/docs/appearance/site-names)
- [OpenAI: Publisher and developer FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- [Anthropic: Web crawler controls](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler)
- [Perplexity: Crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)
- [Bing: AI Performance in Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)
- [Bing: IndexNow for changed content](https://blogs.bing.com/webmaster/September-2024/IndexNow-When-and-How-Websites-Should-Notify-Search-Engines)
- [Cloudflare: Managed robots.txt and Content Signals](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)
- [Aggarwal et al.: GEO — Generative Engine Optimization](https://arxiv.org/abs/2311.09735)
- [Martinez: Critical survey of GEO research, 2023–2026](https://arxiv.org/abs/2607.14035)
- [Schulte, Bleeker, and Kaufmann: Measuring visibility in AI search](https://arxiv.org/abs/2604.07585)

## Verification Record

- Local production build: passed on 2026-07-22.
- Live homepage and selected current report: HTTP 200.
- Live `robots.txt`, `llms.txt`, sitemap index, and child sitemap: accessible.
- Selected current report returned HTTP 200 to tested search and AI-search user-agent strings.
- No application or content changes were made as part of the audit.
