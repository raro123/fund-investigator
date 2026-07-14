---
# ARTICLE TEMPLATE - Copy this file to create new investigation reports.
# This file is the reference for what every frontmatter field does. The schema that
# enforces it lives in src/content.config.ts.
#
# Filename = URL. Use kebab-case, keep it short and searchable.
#   five-checks-mutual-fund.md  ->  /reports/five-checks-mutual-fund/
# Get the filename right BEFORE publishing. Renaming a live article breaks its URL.

# ---------------------------------------------------------------------------
# THE THREE TEXT FIELDS - each has one job. Do not make one do two.
# ---------------------------------------------------------------------------

# TITLE -> the <h1>, the browser tab, the Google result heading, the social card,
#          and the JSON-LD headline. All of these show the same string.
#          Write it the way someone would search for the topic, not as a clever line.
title: "Your Investigation Title Here"

# DESCRIPTION -> MACHINES ONLY. Never rendered on the page.
#          Goes to: the Google snippet, og/twitter description, JSON-LD, and llms.txt.
#          ~155 characters. Use the words people actually type into a search box.
#          If it reads a bit plain to you, it is probably doing its job.
description: "How to <do the thing someone is searching for>: the key terms, named plainly."

# HOOK -> HUMANS ONLY. The subtitle under the h1, and the teaser on report cards.
#          Write it to read well and to give a reason to keep reading.
#          Optional, but if you omit it the layout falls back to `description`,
#          which will read like SEO copy on the page. Always write one.
hook: "The line that makes a reader want the rest. Evidence-led, no hype."

# ---------------------------------------------------------------------------
# DATES, META
# ---------------------------------------------------------------------------

# Published date. Sorts the listings (newest first) and sets JSON-LD datePublished.
date: "2026-01-15"

# Optional. Set this when you materially edit an already-published report.
# Feeds JSON-LD dateModified - a freshness signal. Leave it out on first publish.
# updated: "2026-03-02"

# Hand-estimated. Shown next to the date in the article header.
readTime: "8 min read"

# Drives the filter buttons on /reports and JSON-LD articleSection.
# Must be one of: "Fund Analysis" | "Category Comparison" | "Methodology"
category: "Fund Analysis"

# Feeds JSON-LD keywords. NOT shown to readers anywhere. 2-4, be specific.
tags: ["Large Cap", "Value Investing", "Risk Analysis"]

# true -> eligible for the homepage. Only the 3 most recent featured reports appear.
featured: true

# ---------------------------------------------------------------------------
# IMAGES AND METRICS
# ---------------------------------------------------------------------------

# Cover image. Optional, but set it: it becomes the social-share card AND the
# `image` in the article's JSON-LD. Omit it and both fall back to the generic
# site image, so every share of every report looks identical.
# Path is RELATIVE to this file, into src/assets (so Astro optimises it).
# Recommended 1200x630 (2:1).
coverImage: "../../assets/images/reports/your-article-slug/cover.png"

# Alt text for the cover. Accessibility + it becomes og:image:alt.
coverImageAlt: "Chart showing performance metrics and drawdown analysis"

# Optional, max 3. The metric chips on the report card in the listings.
# Fund reports use these; methodology guides usually do not.
keyMetrics:
  - label: "CAGR"
    value: "25.0%"
  - label: "Sharpe"
    value: "1.55"
  - label: "Max DD"
    value: "-12.9%"
---

<!--
CONTENT GUIDELINES
==================
See docs/CONTENT-GUIDE.md for full tone and style requirements.

Key principles:
- Informative, not instructional
- Present data and findings objectively
- Avoid urgency tactics and superlatives
- Use headings (##, ###) for structure
- Include charts/data where relevant

STRUCTURE RULES
- NEVER add an H1 (#) — the layout renders the title from frontmatter as the
  page's only H1. Start body content with intro copy or an H2 (##).
- Do NOT add a manual Deepdive promo section at the end. ArticleLayout.astro
  already renders the "Investigate this yourself" CTA and the disclaimer.

WRITING FOR AI ANSWER ENGINES (this is where our traffic realistically comes from)
- Search engines and LLMs do not read the page as a whole. They chop it into chunks
  of roughly "one heading + the text under it", and THAT is the unit they quote.
- So every heading must say something on its own. "Assessment" is a useless chunk
  header. "Assessment: more return for the same risk" is a findable, quotable one.
- And every passage must stand alone. "The fund beat the benchmark" is unquotable —
  which fund, which benchmark, over what period? Name all three, every time, even
  when it feels repetitive in the flow of the page. Assume the paragraph will be
  lifted out and shown to someone who never saw the rest of the article.
- Phrase section headings as the question a reader would actually ask.

CITE YOUR SOURCES
- Link the data source (AMFI), and any rule you invoke (SEBI categorisation).
- Verifiability is the whole pitch: we make evidence-led claims, so show where the
  evidence came from. AI answer engines strongly prefer sources they can trace.
- Link to our own related reports where they genuinely help the reader.

IMAGE OPTIMIZATION WORKFLOW (SIMPLIFIED)
=========================================
1. Create article folder: src/assets/images/reports/{your-article-slug}/
2. Add all images to this folder with simple names (cover.png, sip.png, drawdown.png)
3. Use standard markdown syntax with relative paths (see Images section below)
4. Astro automatically optimizes images to WebP/AVIF with responsive srcset
5. No imports or special components needed - just write markdown!

Example:
![Chart description](../../assets/images/reports/your-article-slug/chart-name.png)

Benefits:
- Simple markdown syntax (no JSX knowledge needed)
- 40-60% automatic file size reduction
- Responsive images for mobile/tablet/desktop
- Better Core Web Vitals (LCP, CLS)
- Improved SEO and page speed
-->

## Executive Summary

Start with a brief overview of what this investigation covers and key findings. Keep it factual and data-driven.

## Background

Provide context about the fund(s) or category being analyzed. What makes this investigation relevant?

## Key Findings

### Performance Metrics

Present your analysis using data:
- Returns across timeframes
- Risk-adjusted metrics (Sharpe, Sortino, Alpha, Beta)
- Drawdown analysis

### Portfolio Characteristics

- Sector allocation
- Market cap distribution
- Concentration metrics
- Style drift patterns

## Methodology

Briefly explain your analysis approach:
- Data sources (AMFI, fund disclosures, etc.)
- Time period analyzed
- Benchmarks used for comparison

## Conclusion

Summarize key insights without making recommendations. Let the data speak.

---

<!-- MARKDOWN REFERENCE -->

<!-- Headings -->
## Second Level Heading
### Third Level Heading

<!-- Emphasis -->
*italic text* or _italic text_
**bold text** or __bold text__

<!-- Lists -->
- Unordered list item
- Another item

1. Ordered list item
2. Second item

<!-- Blockquotes -->
> Important insight or quote from fund manager

<!-- Links -->
[Link text](https://example.com)

<!-- Images - SIMPLE MARKDOWN APPROACH (Recommended) -->
<!-- Store images in: src/assets/images/reports/{article-slug}/ -->
<!-- Use relative paths from the article file location -->
<!-- Example (uncomment and replace with your actual image path): -->
<!-- ![Descriptive alt text](../../assets/images/reports/your-article-slug/chart-name.png) -->

<!-- Astro automatically optimizes these images to WebP/AVIF -->
<!-- Generates responsive srcset for mobile/tablet/desktop -->
<!-- No imports or special syntax needed! -->

<!-- Legacy approach (NOT optimized - avoid for new articles) -->
<!-- ![Alt text](/images/reports/chart-name.png) -->

<!-- Tables -->
| Metric | 1 Year | 3 Year | 5 Year |
|--------|--------|--------|--------|
| Returns | 12.5% | 15.2% | 14.8% |
| Sharpe Ratio | 1.2 | 1.4 | 1.3 |

<!-- Code (if needed) -->
`inline code`

```
code block
```
