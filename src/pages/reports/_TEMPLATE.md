---
# ARTICLE TEMPLATE - Copy this file to create new investigation reports
# Filename convention: use-kebab-case-for-urls.md
# Example: parag-parikh-flexi-cap-analysis.md → /reports/parag-parikh-flexi-cap-analysis

layout: ../../layouts/ArticleLayout.astro

# Article title - appears in browser tab, cards, and article header
title: "Your Investigation Title Here"

# Brief description - shown in article cards and used for SEO meta description
# Keep it under 160 characters for optimal SEO
description: "A concise summary of what this investigation covers and key findings."

# Publication date - used for sorting (newest first)
# Format: YYYY-MM-DD
date: "2024-01-15"

# Estimated reading time - helps set user expectations
readTime: "8 min read"

# Category - determines filter button behavior on /reports page
# Options: "Fund Analysis" | "Category Comparison" | "Methodology"
category: "Fund Analysis"

# Tags - shown as badges, used for related content (future feature)
# Best practice: 2-4 tags, be specific
tags: ["Large Cap", "Value Investing", "Risk Analysis"]

# Featured flag - set to true to appear on homepage
# Only the 3 most recent featured articles appear on homepage
featured: true

# Cover image - optional, displays at top of article and in cards
# Place images in /public/images/reports/
# Recommended size: 1200x630px (2:1 ratio) for optimal display
# Use descriptive filenames: fund-name-chart-type.png
coverImage: "/images/reports/your-article-cover.png"

# Optional: Alt text for cover image (improves accessibility and SEO)
coverImageAlt: "Chart showing performance metrics and drawdown analysis"
---

<!--
CONTENT GUIDELINES
==================
See CONTENT-GUIDE.md for full tone and style requirements.

Key principles:
- Informative, not instructional
- Present data and findings objectively
- Avoid urgency tactics and superlatives
- Use headings (##, ###) for structure
- Include charts/data where relevant
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

<!-- Images -->
![Alt text for image](/images/reports/chart-name.png)

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
