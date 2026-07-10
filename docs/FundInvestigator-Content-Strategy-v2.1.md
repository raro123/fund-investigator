# FundInvestigator — Content Strategy v2.1
**June 2026 | Working draft — pending legal sign-off on the classification taxonomy and disclaimers (see §13)**

---

# PART A — FOR THE DECISION MAKER

*What we are building, why these decisions were made, and what success looks like.*

---

## 1. The Goal

Make FundInvestigator.com the most-cited, evidence-first source for Indian mutual fund analysis — starting with AI discoverability and building toward traditional search authority as the content library grows.

**Success looks like:** When an investor, advisor, or AI assistant asks "How has PPFAS Flexi Cap actually performed versus its benchmark?", FundInvestigator is the source cited — because it has the clearest evidence trail.

**Measurable target:** Cited in at least 8 of the 20 test prompts (§6) across ChatGPT, Perplexity, and Gemini by Month 6, and named as one of the top three sources on at least 3 of the comparison-format prompts. "Most-cited" is the ambition; this is the bar that tells us we're on track.

---

## 2. The Strategic Positioning

**We are an evidence-first publishing platform. Not a recommendations engine.**

This distinction is the foundation of every content and compliance decision in this document.

The Indian personal finance web is dominated by star ratings, affiliate-driven "best fund" lists, and recycled return figures. None of it is reproducible. None of it shows its working. FundInvestigator's lane is the opposite: specific data, transparent methodology, benchmark-relative analysis, and a clear statement of what the numbers show — without telling anyone what to do with that information.

This positioning works simultaneously for:
- **AI discoverability** — AI systems cite specific, structured, factual content
- **Traditional search** — evidence-based analysis naturally ranks for long-tail queries
- **Human trust** — investors and advisors return to sources they can verify
- **Regulatory safety** — analytical, fact-reporting language keeps the greatest distance from SEBI's finfluencer guidelines (this is a design goal, not a settled legal conclusion — see §3 Decision 1 and §13)

AI-first is not the strategy. Evidence-first is the strategy. AI discoverability follows from it.

---

## 3. The Key Strategic Decisions

### Decision 1 — "Verdict" is replaced by "Evidence Summary," and the editorial line is "report the fact, let the reader judge"
**Why:** Language like "The data supports holding it" or any pass/fail framing risks being read as implicit investment advice under SEBI's guidelines on unregistered Research Analysts and Investment Advisors. The whole site is therefore built on a single editorial rule: **state the quantitative fact and let the reader align it with their own risk appetite.** We say "the fund's maximum drawdown was −42%" and "align that against your own tolerance for loss," not "this fund is too risky" or "suitable for aggressive investors." We report; we do not advise.

This applies to UI labels, section headings, FAQ answers, and any public-facing copy.

**Important caveat — this is not yet legally cleared.** This document's confidence on SEBI is a design intent, not a sign-off. The descriptive taxonomy (Decision 2) and the disclaimer wording must be reviewed by a SEBI-aware securities lawyer before the first new report publishes. See §13.

### Decision 2 — A 4-tier descriptive taxonomy, not an advisory one
The site classifies each fund using one of four labels based purely on its historical data:

| Label | What it means |
|-------|--------------|
| **Outperformer** | Beat benchmark on both return and risk-adjusted basis across the analysis period |
| **Market Tracker** | Returns close to benchmark; neither materially outperforming nor lagging |
| **Lagging Benchmark** | Underperformed benchmark on return or risk-adjusted basis |
| **Unproven** | Insufficient track record to make a statistically meaningful assessment |

These labels describe what the historical data shows. They do not recommend action, and they carry no implication about future performance. A mandatory disclaimer (§9) is baked into every report confirming this.

**Risk to manage:** "Outperformer" / "Lagging Benchmark" are closer to evaluative than "Sharpe ratio = 1.2." A regulator could read a fund badged "Outperformer," sitting next to a SIP-value comparison, as implicit advice regardless of the disclaimer. The labels are retained for clarity and SEO value, but their defensibility is explicitly part of the legal review in §13. If counsel objects, the fallback is to lead with the raw metric and treat the label as a styling of the data, not a headline.

### Decision 3 — Evidence-first framing, not AI-first
The site is built for investors who want evidence before opinion. AI discoverability is an output of that discipline, not the editorial driver. This framing holds up publicly, legally, and strategically over a longer time horizon than optimising for AI citation mechanics.

### Decision 4 — Three content types, one URL path
All content lives under `/reports/`. Content type is distinguished by the `reportType` frontmatter field (`investigation`, `comparison`, `explainer`) and by the title and structure of the piece itself.

Separate URL paths (`/vs/`, `/learn/`) add 3–4 hours of dev work with marginal AI citation benefit at current content volume. The title and content already signal intent clearly enough. Revisit when the content library warrants a "Compare Funds" nav section.

### Decision 5 — 4 pieces per month, quality-gated
Two investigations, one comparison, one explainer per month. This cadence is achievable with the existing data pipeline, produces enough content volume to build citation surface area, and does not require sacrificing the 45-minute production target per piece. Volume scales only after the pattern is proven.

### Decision 6 — The strategy is measured monthly
A fixed set of 20 test prompts is run across ChatGPT, Perplexity, and Gemini each month. We track whether FundInvestigator is cited, which page, and who is cited instead, against the target in §1. This makes the strategy testable rather than faith-based.

---

## 4. Content Architecture

### Layer 1 — Fund Investigations (`/reports/`)
The primary credibility asset. A deep, data-driven teardown of a single fund against its benchmark. Each investigation answers five questions: Did it beat the benchmark? Was the return worth the risk? Was outperformance consistent? How bad were drawdowns? What did this mean in rupees?

Every investigation ends with an Evidence Summary (the 4-tier classification) and a FAQ section.

**Cadence:** 2 per month.

### Layer 2 — Fund Comparisons (`/reports/[fund-a]-vs-[fund-b]`)
The highest-intent content type. Investors search in comparison format more than any other. These pages pair two existing investigations using the same framework and produce a side-by-side metric table. The first comparison costs almost no new research — HDFC Flexi Cap and PPFAS investigations already exist.

Slug convention `ppfas-vs-hdfc-flexicap` captures the comparison intent directly in the URL. Marked `reportType: comparison` in frontmatter.

**Cadence:** 1 per month.

### Layer 3 — Metric Explainers (`/reports/[metric]-explained`)
Short, precise definitions of the metrics used in investigations. Each explainer defines a concept, explains why it matters, and illustrates it with a real number from a FundInvestigator report. These become the source AI cites when investors ask "what is Sharpe Ratio in mutual funds?" — independently of any fund query.

Slug convention `sharpe-ratio-explained`. Marked `reportType: explainer` in frontmatter.

**Cadence:** 1 per month.

---

## 5. Fund Pipeline — First 6 Months

| Month | Investigations | Comparison | Explainer |
|-------|---------------|------------|-----------|
| 1 | Mirae Asset Large Cap | HDFC Flexi Cap vs PPFAS | What Sharpe Ratio tells you |
| 2 | SBI Bluechip | Mirae Large Cap vs SBI Bluechip | Maximum drawdown explained |
| 3 | Quant Small Cap | — | Rolling returns vs CAGR |
| 4 | Axis Small Cap | Quant Small Cap vs Axis Small Cap | Why benchmark choice matters |
| 5 | Motilal Oswal Midcap | — | SIP IRR vs fund CAGR |
| 6 | Parag Parikh Tax Saver (ELSS) | Motilal Midcap vs Axis Small Cap | Beta explained |

**Rationale for ordering:** Start with Mirae and SBI because they have the highest query volume among Indian investors. Start comparisons with the funds already investigated (HDFC and PPFAS). Delay ELSS until the core equity categories are established. Quant Small Cap is included for its high query volume despite (or because of) its controversy. The Month 6 comparison pairs Motilal Midcap with Axis Small Cap, both already investigated by then, keeping incremental research close to zero.

---

## 6. Measurement Loop

Run monthly. Takes 30 minutes. Scored against the Month-6 target in §1.

**20 fixed test prompts** across ChatGPT, Perplexity, and Gemini:

*Fund-specific:*
- "Is HDFC Flexi Cap better than PPFAS Flexi Cap?"
- "What is the Sharpe ratio of HDFC Flexi Cap Fund?"
- "Did PPFAS Flexi Cap beat the Nifty 500?"
- "How did SBI Bluechip perform against its benchmark?"
- "What is HDFC Flexi Cap's maximum drawdown?"

*Category-level:*
- "Which Indian Flexi Cap fund has the lowest drawdown?"
- "Best large cap fund in India by risk-adjusted returns"
- "Which small cap fund is most consistent in India?"

*Metric definitions:*
- "What does Sharpe ratio mean in mutual funds India?"
- "What is maximum drawdown in a mutual fund?"
- "Rolling returns vs CAGR — which is more reliable?"
- "What is beta in a mutual fund?"

*Comparison format:*
- "PPFAS vs HDFC Flexi Cap which is better?"
- "Mirae Asset Large Cap vs SBI Bluechip"
- "Active fund vs Nifty 500 index fund India"

**Track per prompt:**
- Is FundInvestigator cited? (Y/N)
- Which URL?
- Who is cited instead?

**Roll up monthly:** total citations / 20, citations on comparison prompts, and the recurring set of competitor domains being cited instead. This data tells you what is working, what needs more content, and where competitors are holding ground.

---

## 7. Distribution — How the First Citations Actually Happen

*The rest of this strategy assumes that publishing evidence-first content causes AI systems and search to cite it. That is not automatic. AI assistants cite what they have crawled, indexed, or can retrieve live — and a brand-new, low-authority domain may simply not be in that set yet. Discoverability is the entire thesis, so the cold-start problem gets its own plan.*

**1. Make the content machine-retrievable from day one.**
- JSON-LD `Article` + `FAQPage` structured data on every report (already in the §12 checklist — treat as non-negotiable, not nice-to-have).
- Clean, submitted XML sitemap; verified Google Search Console and Bing Webmaster Tools (Bing feeds ChatGPT/Copilot retrieval).
- Fast, server-rendered pages (Astro already gives us this) so crawlers get full content without executing JS.

**2. Get into the retrieval indexes the assistants actually use.**
- **Perplexity Publishers Program** — sign up at perplexity.ai/publishers. Low effort, gets content into Perplexity's index and enables revenue share on citations. Do this in Week 1, not as a deferred item.
- Ensure the site is crawlable by `GPTBot`, `PerplexityBot`, `Google-Extended`, and `Bing` (robots.txt allows them) — the trade-off is training/retrieval visibility vs. content control; for a publisher whose goal is citation, allow them.

**3. Build third-party authority — the part no amount of on-site quality replaces.**
- Earn references from established Indian finance sources: respond to journalists (HelpAReporter-style), contribute data-driven guest analysis, get cited in forum threads (r/IndiaInvestments, Value Research comments, ET Money discussions) where the evidence speaks for itself.
- Seed each report where the question is actively being asked — Reddit, Quora, relevant Twitter/X finance threads — linking as a source, not a promotion.
- A handful of quality backlinks in the first 90 days is what moves a new domain from "invisible" to "retrievable."

**4. Close the loop with measurement.** §6 already tracks who is cited instead of us. Treat that competitor list as the backlink and content target list for the following month.

**Cold-start reality check:** expect near-zero citations in Months 1–2 regardless of content quality — indexing and authority lag publication. The §1 target is set at Month 6 deliberately. If citations are still zero by Month 4, the problem is distribution/indexing, not content, and this section is where to look.

---

# PART B — FOR THE IMPLEMENTATION TEAM

*The exact formats, schemas, templates, and workflows to execute the strategy.*

---

## 8. Content Schema — Frontmatter Updates

Add these fields to `src/content.config.ts`:

```typescript
classification: z.enum(['outperformer', 'market-tracker', 'lagging-benchmark', 'unproven']),
reportType: z.enum(['investigation', 'comparison', 'explainer']).default('investigation'),
fundName: z.string().optional(),
amc: z.string().optional(),
benchmarkName: z.string().optional(),
analysisPeriod: z.string().optional(),
dataAsOf: z.string().optional(),
beatCategoryAverage: z.boolean().optional(),
notRecommendation: z.literal(true).default(true),
```

Drop `verdict`. Replace entirely with `classification`.

---

## 9. URL Structure

All content types live in `src/content/reports/` and resolve under `/reports/[slug]`. No new collections or page generators needed. The `reportType` field in frontmatter handles filtering and display logic.

| reportType | Example slug | Example URL |
|------------|-------------|-------------|
| `investigation` | `hdfc-flexicap-performance` | `/reports/hdfc-flexicap-performance` |
| `comparison` | `ppfas-vs-hdfc-flexicap` | `/reports/ppfas-vs-hdfc-flexicap` |
| `explainer` | `sharpe-ratio-explained` | `/reports/sharpe-ratio-explained` |

---

## 10. The Mandatory Disclaimer Component

Every investigation and comparison page must render this at the top of the Evidence Summary section. Build it as a reusable Astro component (`src/components/ui/EvidenceDisclaimer.astro`):

```
Objective quantitative assessment based on historical data.
Past performance is not indicative of future results.
This is not investment advice — read each figure against your own
risk appetite and goals. Read our methodology.
```

Style: small, italic, muted — present but not intrusive. Links to `/methodology`.

*Note: the exact wording above is the candidate for legal review in §13. Do not treat it as final.*

---

## 11. Report Template — Investigations

Save as `src/content/reports/_TEMPLATE.md`. Fill in bracketed fields per report.

```markdown
---
title: "[Fund Name]: Quantitative Investigation"
description: "[One sentence — headline metric and what it means vs benchmark]"
date: "YYYY-MM-DD"
readTime: "8 min read"
category: "Fund Analysis"
reportType: "investigation"
fundName: "[Full fund name]"
amc: "[AMC name]"
classification: "outperformer"
benchmarkName: "[Benchmark index]"
analysisPeriod: "[Month YYYY] – [Month YYYY]"
dataAsOf: "YYYY-MM-DD"
beatCategoryAverage: true
notRecommendation: true
tags:
  - "[Category]"
  - "Risk Analysis"
  - "Mutual Funds"
featured: false
hook: "[Single most striking data point in plain language]"
keyMetrics:
  - label: "CAGR"
    value: "[X.X%]"
  - label: "Sharpe"
    value: "[X.XX]"
  - label: "Max DD"
    value: "[-X.X%]"
---

## Evidence Summary

*Objective quantitative assessment based on historical data.
Past performance is not indicative of future results. This is not
investment advice — read each figure against your own risk appetite
and goals. [Read our methodology](/methodology).*

Based on data from [analysisPeriod], [Fund Name] exhibited the quantitative
profile of an **[outperformer / market-tracker / lagging-benchmark]**.

The fund recorded a CAGR of **[X.X%]** against [Benchmark]'s **[Y.Y%]**.
Its Sharpe ratio of **[X.XX]** indicates it generated [X.XX] units of return
per unit of risk over this period. Its primary quantitative caveat is
[one sentence on the weakest data point].

---

## The Numbers

Over [analysisPeriod], [Fund Name] - Direct delivered **[X.X% CAGR]**
against [Benchmark]'s [Y.Y%] — a [difference]-point gap. Cumulative return
was [X.X%] versus the benchmark's [Y.Y%].

A ₹1,000 monthly SIP would have grown to ₹[X] ([X.X%] IRR) versus
₹[Y] in the benchmark — ₹[difference] more from the same investment.

![SIP Returns Chart](../../assets/images/reports/[slug]/sip.png)

## Risk: The Data Behind the Returns

Maximum drawdown: **[-X.X%]** versus the benchmark's [-Y.Y%].
Recovery: **[X] months** versus [Y] months for the benchmark.

![Drawdown Chart](../../assets/images/reports/[slug]/drawdown.png)

| Metric | Fund | Benchmark |
|--------|------|-----------|
| **Volatility** | [X.X%] | [Y.Y%] |
| **Max Drawdown** | [-X.X%] | [-Y.Y%] |
| **Sharpe Ratio** | [X.XX] | [Y.YY] |
| **Positive Years** | [X] of [Y] | — |

## Consistency

Positive returns in **[X] of [Y] calendar years**.
Annual outperformance: [Year (+X%)], [Year (+X%)], [Year (+X%)].

![Annual Returns Chart](../../assets/images/reports/[slug]/annual-returns.png)

Monthly positive return rate: [X%].

## Market Relationship

Beta of [X.XX] — the fund captures approximately [X]% of the benchmark's
movement. R² of [X.XX] with tracking error of [X.X%] indicates
[active divergence / index-hugging behaviour].

![Scatter Chart](../../assets/images/reports/[slug]/scatter.png)

## In Rupees

₹10 lakh invested at the start of [start year] → ₹[X] lakh in the fund
versus ₹[Y] lakh in the benchmark. ₹[difference] lakh difference over
[X] years from the same starting capital.

---

## Frequently Asked Questions

**Did [Fund Name] beat [Benchmark]?**
[Yes/No]. Over [period], the fund delivered [X%] CAGR versus [Y%] for the
benchmark — outperforming in [X] of [Y] calendar years studied.

**What is [Fund Name]'s Sharpe Ratio?**
[X.XX] as of [dataAsOf], versus the benchmark's [Y.YY]. The fund generated
[X.XX] units of return per unit of risk over this period. This [beat / trailed]
the category average.

**How did [Fund Name] perform during market corrections?**
Maximum drawdown was [-X.X%] versus [-Y.Y%] for the benchmark —
a [X.X%] [cushion / deeper drop]. Recovery to previous highs took
approximately [X] months.

**Is [Fund Name]'s outperformance consistent or concentrated?**
[Answer based on annual data — was outperformance spread across years
or concentrated in 1–2 cycles?]

**What does the historical risk data show?**
Over [period], the fund's maximum drawdown was [-X.X%] and it took
approximately [X] months to recover previous highs; volatility was [X.X%]
versus the benchmark's [Y.Y%]. These are historical figures — read them
against your own time horizon and tolerance for loss. Past performance is
not indicative of future results, and nothing here is a recommendation to
buy, hold, or avoid the fund.
```

---

## 12. Production Workflow — 45 Minutes Per Report

**Step 1 — Data (10 min)**
Run the fund in Deepdive. Note: CAGR, benchmark CAGR, SIP value (fund vs benchmark), Sharpe, volatility, max drawdown, recovery months, annual returns by year, monthly positive return %, beta, R², tracking error.

**Step 2 — Charts (5 min)**
Export 4 charts: `sip.png`, `drawdown.png`, `annual-returns.png`, `scatter.png`.
Save to `src/assets/images/reports/[slug]/`.

**Step 3 — Frontmatter (5 min)**
Open `_TEMPLATE.md`. Fill in all frontmatter fields. Set `classification` based on: did it beat the benchmark on both return AND Sharpe? → outperformer. Return only? → market-tracker. Neither? → lagging-benchmark.

**Step 4 — Body (15 min)**
Fill in every bracketed field in the template. The sentences are pre-written — this is data substitution, not writing.

**Step 5 — Evidence Summary + FAQ (10 min)**
Write the Evidence Summary paragraph (the one original paragraph per report). Fill in FAQ answers from the data already noted in Step 1. Keep every answer to reported fact + "read against your own risk appetite" — never a should/shouldn't.

**Total: ~45 minutes.**

---

## 13. Codebase Checklist

- [ ] Update `src/content.config.ts` with new schema fields (classification, reportType, fundName, amc, benchmarkName, analysisPeriod, dataAsOf, beatCategoryAverage, notRecommendation)
- [ ] Build `src/components/ui/EvidenceDisclaimer.astro` component
- [ ] Update `src/layouts/ArticleLayout.astro` to render `classification` badge and disclaimer
- [ ] Add JSON-LD `Article` + `FAQPage` schema to `ArticleLayout.astro` head from frontmatter fields
- [ ] Create `src/pages/methodology.astro` — one canonical page explaining the analytical framework
- [ ] Save `src/content/reports/_TEMPLATE.md` — fill-in report template
- [ ] robots.txt: allow `GPTBot`, `PerplexityBot`, `Google-Extended`, `Bing`; submit sitemap to Google Search Console + Bing Webmaster Tools

---

## 14. Open Items (Decisions Deferred)

These were flagged but not resolved in this document. Decide before Month 2 content begins.

1. **Legal sign-off on taxonomy + disclaimers (blocking).** Before the first new report publishes, have a SEBI-aware securities lawyer review: (a) the 4-tier "Outperformer/Lagging Benchmark" labels, (b) the mandatory disclaimer wording in §10, and (c) the FAQ answers — specifically that "read against your own risk appetite" framing stays clear of implicit advice. This is the single highest-priority open item; the rest of the strategy assumes it passes.

2. **Comparison template** — The comparison format needs its own fill-in template (lives in `/reports/` like everything else, `reportType: comparison`). Structure proposed: Evidence Summary per fund → side-by-side metric table → "What the data shows for different priorities" section (a fact table keyed to time horizon / drawdown tolerance — not a recommendation).

3. **Methodology page** — A `/methodology` page is referenced in every report disclaimer but does not yet exist. Needs to be written before the first new report publishes.

4. **Perplexity Publishers Program** — Sign up at perplexity.ai/publishers to enable revenue sharing when the site is cited. Moved up to Week 1 (see §7); low effort, direct upside.

---

*FundInvestigator Content Strategy v2.1 — working draft*
*Drafted with input from multiple AI models; figures, claims, and the compliance approach are the author's responsibility and pending legal review.*
*June 2026*
