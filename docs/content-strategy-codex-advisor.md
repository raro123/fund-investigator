# FundInvestigator Content Strategy Proposal

**Codex Advisor Version | June 2026**

## 1. Strategic Goal

Build FundInvestigator into a trusted evidence library for Indian mutual fund
analysis.

The aim is not to publish more content than competitors. The aim is to publish
clearer, more reproducible, more citation-worthy analysis than competitors.

Success looks like:

> When an investor, advisor, journalist, or AI assistant asks, "How has PPFAS
> Flexi Cap actually performed versus its benchmark and peers?",
> FundInvestigator is cited because it has the clearest evidence trail.

## 2. Positioning

FundInvestigator should own this niche:

> Data-first mutual fund investigations for investors who want evidence before
> opinion.

Avoid competing with:

- "Best mutual funds this year" listicles
- Star ratings without transparent methodology
- Affiliate-led recommendations
- Generic personal finance explainers

Compete on:

- Transparent methodology
- Benchmark-relative analysis
- Risk-adjusted performance
- Rupee impact
- Consistency over time
- Plain-English verdicts grounded in data

This is a stronger lane than "AI-first". The better framing is:

> Answer-first, evidence-first publishing.

That framing works for AI discovery, Google search, social sharing, and human
trust.

## 3. Core Content Architecture

### Layer 1: Fund Investigations

These are the main credibility assets.

Each report should answer:

- Did the fund beat its benchmark?
- Was the return worth the risk?
- Was outperformance consistent or concentrated?
- How bad were drawdowns?
- What did this mean for SIP and lump sum investors?
- What is the evidence-based verdict?

Recommended cadence:

- 1 per month initially
- 5 to 8 minute read
- Quality and repeatability over volume

### Layer 2: Fund Comparisons

These are likely the highest-intent pages.

Investors often search in comparison format:

- PPFAS vs HDFC Flexi Cap
- SBI Bluechip vs Mirae Large Cap
- Quant Small Cap vs Axis Small Cap
- Active fund vs benchmark

Comparison pages should use the same framework across funds. This is where
FundInvestigator can feel especially useful.

Recommended cadence:

- 1 per month
- Side-by-side table
- Evidence summary
- Verdict by use case

Example verdict structure:

| Investor Question | Evidence-Based Answer |
| --- | --- |
| Better risk-adjusted return? | Fund A |
| Lower drawdown? | Fund B |
| Better SIP outcome? | Fund A |
| More consistent? | Fund B |
| Overall evidence | Mixed / Strong / Weak |

### Layer 3: Learn and Methodology Content

These should live separately from reports.

Recommended structure:

- `/reports/` for investigations and comparisons
- `/learn/` for explainers
- `/methodology/` for canonical assumptions

The `/learn/` section should explain metrics using examples from your own
reports.

Good topics:

- What Sharpe Ratio tells you about a mutual fund
- Why CAGR can mislead investors
- Rolling returns vs point-to-point returns
- Maximum drawdown explained
- SIP IRR vs fund CAGR
- Why benchmark choice matters

Recommended cadence:

- 1 every 2 to 4 weeks
- 500 to 800 words

The key is not generic education. Each explainer should connect back to the
FundInvestigator investigation framework.

## 4. Recommended Publishing Cadence

For the first 3 months:

| Month | Output |
| --- | --- |
| Month 1 | 1 investigation, 1 comparison, 1 methodology or explainer |
| Month 2 | 1 investigation, 1 comparison, 1 methodology or explainer |
| Month 3 | 1 investigation, 1 comparison, 1 methodology or explainer |

This gives the site 9 strong assets without creating a content treadmill.

After 3 months, review:

- Which pages are indexed
- Which pages get impressions
- Which prompts cite FundInvestigator
- Which reports are easiest to produce
- Which formats attract serious users

Then scale only what works.

## 5. Standard Report Structure

Each investigation should follow a repeatable structure.

1. Verdict
2. Key Metrics
3. Benchmark Comparison
4. Risk and Drawdown
5. Consistency Check
6. SIP and Lump Sum Impact
7. Peer Context, where reproducible
8. FAQs
9. Methodology Note
10. CTA: Investigate This Yourself

The verdict should come first, but it should avoid sounding like personal
financial advice.

Prefer:

> The evidence is strong.

Avoid:

> This fund is a buy.

## 6. Verdict Taxonomy

Avoid `pass / conditional / underperform`.

That language feels too close to a recommendation framework.

Use this instead:

```yaml
verdict: "strong_evidence" | "mixed_evidence" | "weak_evidence" | "insufficient_history"
```

Display labels:

| Internal Value | Public Label |
| --- | --- |
| `strong_evidence` | Strong Evidence |
| `mixed_evidence` | Mixed Evidence |
| `weak_evidence` | Weak Evidence |
| `insufficient_history` | Insufficient History |

This keeps the tone analytical.

Example:

> **Verdict: Strong Evidence**  
> HDFC Flexi Cap outperformed the NIFTY 500 TRI across the analysis period while
> also showing lower drawdown and stronger risk-adjusted returns. The evidence
> supports continued investigation for investors comparing Flexi Cap funds, but
> this is not a buy/sell/hold recommendation.

## 7. Frontmatter Additions

Suggested schema:

```yaml
reportType: "investigation" | "comparison"
fundName: "HDFC Flexi Cap Fund"
amc: "HDFC Mutual Fund"
category: "Flexi Cap"
benchmarkName: "NIFTY 500 TRI"
analysisPeriod: "January 2021 - December 2025"
verdict: "strong_evidence"
verdictSummary: "Outperformed benchmark with lower drawdown and stronger Sharpe ratio."
peerContext: "Top quartile Sharpe ratio among Flexi Cap funds"
dataUpdated: "2026-06-23"
notRecommendation: true
keyMetrics:
  - label: "CAGR"
    value: "25.0%"
  - label: "Benchmark CAGR"
    value: "17.1%"
  - label: "Sharpe"
    value: "1.55"
  - label: "Max Drawdown"
    value: "-12.88%"
```

Add `peerContext` only when it can be reproduced from your data.

## 8. First 6 Content Priorities

Recommended order:

1. HDFC Flexi Cap vs PPFAS Flexi Cap
2. Mirae Asset Large Cap Investigation
3. SBI Bluechip Investigation
4. Mirae Asset Large Cap vs SBI Bluechip
5. Quant Small Cap Investigation
6. Axis Small Cap Investigation

Rationale:

- Start with a comparison that uses existing content.
- Build category anchors in large cap and flexi cap.
- Use comparisons to strengthen internal links.
- Delay ELSS until the core equity category clusters are stronger.

## 9. AI and Search Discoverability Principles

Do this:

- Put a clear verdict near the top
- Include specific numbers in plain text, not only charts
- Use descriptive headings
- Use tables for fund versus benchmark
- Write FAQs in natural investor language
- Link the methodology page from every report
- Keep the output crawlable as static HTML
- Build strong internal links between fund, category, metric, and comparison
  pages

Do not overdo this:

- Thin pages for every keyword variation
- FAQ stuffing
- AI-targeted wording that sounds unnatural
- Claims that cannot be reproduced
- "Best fund" language

AI visibility should follow from being specific, structured, and credible. It
should not become the editorial master.

## 10. Measurement Loop

Create a simple monthly check.

Track:

- Google Search Console impressions and indexed pages
- Top queries by page
- AI bot hits in Cloudflare logs, where available
- 20 fixed test prompts across ChatGPT, Perplexity, and Gemini
- Whether FundInvestigator appears
- Which page gets cited
- Which competitor gets cited instead

Example prompt set:

- Is HDFC Flexi Cap better than PPFAS Flexi Cap?
- What is the Sharpe ratio of HDFC Flexi Cap?
- Which Indian Flexi Cap fund has lower drawdown?
- How did SBI Bluechip perform against its benchmark?
- What does maximum drawdown mean in mutual funds?

This makes the strategy testable.

## 11. Key Recommendation

Adopt the strategy, but with these changes:

- Use answer-first, evidence-first as the core strategy
- Start with 3 pieces per month, not 5
- Put explainers in `/learn/`
- Create one canonical `/methodology/` page
- Use safer verdict labels
- Prioritize comparison pieces earlier
- Only use peer rankings when reproducible
- Add a monthly measurement loop

The strongest version of FundInvestigator is not a large content site. It is a
compact, trustworthy evidence base that makes Indian mutual fund analysis easier
to verify.
