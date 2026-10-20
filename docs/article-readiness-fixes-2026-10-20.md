# Article production-readiness fixes — 20 October 2026

Scope: the two published educational guides, shared article tables, and their service invitation. No navigation renaming, hero redesign, privacy/terms changes, booking-provider changes, commit, push or deployment.

## Implemented

- Markdown tables retain native table/header semantics inside build-time horizontal scroll regions. No new dependency. The region remains scrollable and keyboard-focusable without JavaScript.
- With JavaScript, an overflow hint and keyboard stop appear only when a table needs horizontal navigation. ResizeObserver responds to viewport and font-dependent table width changes. Focus uses the existing light-surface token.
- Four- and five-column tables get readable minimum cell widths on phones, using the `fi-table-cell` token. Desktop layout and contents navigation are retained.
- The contextual invitation stays after the body and before footnotes. Its primary action is “Book a first call”; the secondary is “Contact on WhatsApp.” A shared 30-minute introductory-call/no-charge explanation precedes the buttons. Subscription moves to a quieter row.
- The five-questions guide identifies Nifty 500 TRI as this example's choice, with a matching footnote. It no longer attributes a mandatory category benchmark to SEBI.
- The Sharpe explanation no longer divides CAGR by volatility. It describes the standard periodic-excess-return basis and clearly labels the ratios as illustrative inputs rather than calculations from a shared NAV series. Drawdown recovery is explicitly measured from trough to recovery in calendar days.
- The category guide uses historical deadline wording, labels benchmark examples as examples, avoids implying mandatory debt holdings in every dynamic-allocation portfolio, and avoids an unsupported comparative “narrower” residual-assets claim.

## Editorial evidence

Primary sources checked on 20 October 2026:

- [SEBI category circular, 26 February 2026](https://www.sebi.gov.in/sebi_data/attachdocs/feb-2026/1772079826878.pdf): clauses 2.6.3 (category table), 2.6.3.3 and 2.6.3.15 (residual assets), and 2.6.7 (six-month transition). Supports the guide's 65% flexi-cap floor, 75% multi-cap floor with 25% per capitalisation bucket, dynamically managed equity/debt, three asset classes with 10% minima, residual permissions, and six-month transition. Separate sectoral/thematic overlap transition is outside the four-category comparison.
- [Canara Robeco REIT reclassification addendum](https://www.canararobeco.com/wp-content/uploads/2025/12/Notice-cum-Addendum-no.-71-Reclassification-of-REITs-as-equity-instruments.pdf): confirms the 1 January 2026 REIT classification and unchanged InvIT treatment from SEBI's November 2025 circular. Existing debt-scheme REIT holdings have transitional grandfathering; the article does not claim otherwise.
- [Nifty Indices: Nifty 500](https://www.niftyindices.com/indices/equity/broad-based-indices/nifty-500): broad-market index description.
- [Canara Robeco July 2026 flexi-cap factsheet](https://digitalassets.canararobeco.com/digital-factsheet/2026/july/Scheme/FLEXICAP.html): BSE 500 TRI is a primary counterexample to a sole Nifty 500 benchmark claim. This named scheme is retained in this internal note only; the public educational guide contains no named-scheme promotion.
- [William F. Sharpe, The Sharpe Ratio (1994)](https://web.stanford.edu/~wfsharpe/art/sr/SR.htm): mean and standard deviation of periodic differential returns; frequency and annualisation matter. CAGR is not the arithmetic mean used in this method.

Arithmetic checked: `100000 × 1.17^6.5 ≈ 277465` and `100000 × 1.14^6.5 ≈ 234359`, consistent with the rounded ₹2.8 lakh/₹2.3 lakh illustration. A rise from ₹100 to ₹120 followed by ₹96 is a 20% drawdown from the peak. No underlying NAV series exists in this guide, so the other hypothetical summary figures are not presented as independently recomputed empirical results.

## Validation

- Design lint and all 24 configured contrast pairs passed; production build and static H1/link/image-alt/metadata gates passed. Existing dependency sourcemap warnings remain non-blocking.
- Browser audit covers both guides at 320px, 375px and 1440px after fonts load. Every overflowing region supports ArrowRight scrolling with a visible focus outline and exposes its final column. Non-overflowing regions hide the hint and omit the extra keyboard stop. Resizing in place from phone to desktop resets those states.
- The introductory-call, WhatsApp and subscription links retain their existing destinations/tracking attributes. Invite-before-notes ordering verified on both guides.
- No-JavaScript fallback retains horizontal scrolling, focusability and semantic tables. Desktop contents navigation remains visible.
- Astro caches Markdown transforms: after editing the rehype plugin, `npx astro sync --force` was used before the final build to regenerate content. This also removed a transient duplicate-ID cache warning; there is one source file per published guide.
- Browser scripts and screenshots are in `output/playwright/article-fixes-*`. They are review artifacts, not an added application test framework.

Remaining scope: overall release readiness still depends on the separate privacy/service-disclosure and completed booking/response/analytics checks in the original review. External booking and message submission were not performed in this article pass.
