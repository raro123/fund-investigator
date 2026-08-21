# Project Log: Fund Investigator

**Goal:** Build a fast, content-led financial-advisory brand platform (fundinvestigator.com) — a
static Astro hub on Cloudflare Pages that publishes "investigations", explains the Fund Investigator
approach, links to the Deepdive app, and captures email subscribers. Success = low-ops,
budget-conscious, solo-dev-friendly delivery that builds analytics authority and opens a path to
paid research.

---

## Important Links

- Production site: https://fundinvestigator.com
- Deepdive app: https://deepdive.fundinvestigator.com
- MailerLite developer docs: https://developers.mailerlite.com/docs
- Astro docs: https://docs.astro.build
- Cloudflare Pages Functions docs: https://developers.cloudflare.com/pages/functions/
- Design tokens: `tailwind.config.mjs` · Content guide: `docs/content_philosophy.md` · Deployment: `docs/DEPLOYMENT.md`
- Archived sessions (S1–S33) and resolved/moot pending decisions: `docs/project_log_archive.md`

---

## 🧭 Agent Verdicts

### 2026-08-21 (S35 — production SEO deployment cross-check)

- **What we achieved:** Cross-checked the production handoff against the remote `main` ref, the
  GitHub Link Check action, a fresh local build, and live HTTPS responses. Merge commit `9b000f3`
  is present on remote `main`; the live site serves the IndexNow key, Markdown alternate, sitemap,
  redirects, discovery/security headers, canonical headers, and immutable asset caching as expected.
- **What worked well:** The local build reproduced the reported 14-page output and passed H1,
  internal-link, image-alt, metadata-length, and metadata-uniqueness validation. Link Check run #4
  completed successfully, with external checks remaining advisory as designed.
- **What needs to improve:** The live accessibility issue is real and reproducible from the current
  source: both the header and footer logo links lack accessible names. The reported missing image was
  not reproducible from the source/live HTML and remains classified as a browser-extension artifact.
- **Follow-up:** Added `aria-label="Fund Investigator home"` to both logo links, merged the fix into
  `main` as `bec20c5`, and verified both labels in the live production HTML after deployment.
- **What to focus on next:** The reported logo-link accessibility defects are resolved. Bing submission
  and the Markdown negotiation rule remain optional and intentionally unchanged.

### 2026-08-20 (after S34, at compaction)

- **What we achieved:** Completed the article navigation and metadata pass, shipped the Astro SEO
  foundation through source-code Phase 4, replaced the legacy cover-image workflow with generated
  social cards, improved the reader-facing mutual-fund articles, and completed the Substack/PostHog
  analytics cutover and decision audit.
- **What worked well:** Build-time validators and `npm run build` kept the implementation grounded in
  actual artifacts, while source-of-truth helpers for metadata, report images, URLs, and attribution
  reduced drift across pages and feeds.
- **What needs to improve:** Production parity is still not fully closed: the Cloudflare Markdown
  negotiation rule, GSC confirmation, and some browser/device checks remain manual. Source-side Phase 5
  work is now implemented, but the current production deployment still returned 404 for the IndexNow key
  and Markdown alternate routes, so the live site is behind the checkout.
- **What to focus on next:** Complete the whole-system verification (#33), validate the remaining
  live Cloudflare/SEO gates after authentication, then decide whether the authority/methodology work
  should follow.

### 2026-08-07 (after S29, at compaction)

- **What we achieved:** Migrated email capture off MailerLite to Substack, shipped structured data
  and an AI-crawlability fix, resolved report typography (Newsreader serif), cleaned up dead code
  and stale docs, and completed an analytics audit — removing a dead beacon and adding UTM tracking
  to the site's actual conversion path (Deepdive CTAs).
- **What worked well:** Sessions consistently verify with `npm run build` before committing, and
  periodic audits (SEO in S21, `CLAUDE.md` in S24, live Cloudflare dashboard cross-check in S26,
  analytics in S29) keep finding real drift between docs/code and what's actually live, rather than
  assuming the docs are correct.
- **What needs to improve:** Branches are piling up unmerged (`dev`, `analytics/phase-0-1-cleanup`,
  `chore/consolidate-external-urls`) — decision backlog (#46) is growing faster than merges land.
  The pending-decisions table also had two entries both numbered #36 (S22 and S23), a numbering slip
  worth catching sooner next time.
- **What to focus on next:** Merge the stacked branches (#46) before starting Phase 2 analytics
  work (#44/#45), then move on #34 (SEO implementation tranche) now that the AI-crawler block (#43)
  is fixed and evidence-layer work is the natural next step.

---

## ⏳ Pending Decisions

| # | Decision | Raised | Session | Status |
|---|----------|--------|---------|--------|
| 1 | Premium/first-paid feature set, price point, and billing/hosting approach | 2026-06-22 | S4 | 🟡 Open |
| 2 | Whether/when to pursue the advisor / white-label B2B research line | 2026-06-22 | S4 | 🟡 Open |
| 3 | SEBI Research Analyst implications of charging for research | 2026-06-22 | S4 | 🟡 Open |
| 4 | Hosted paid tier (Substack/Ghost/Beehiiv/MailerLite) vs custom infra | 2026-06-22 | S4 | 🟡 Open |
| 5 | Add a plain-language "verdict layer" to Fund Deepdive | 2026-06-22 | S5 | 🟡 Open |
| 6 | Rebrand app to "Deepdive by Fund Investigator" (approved; implement in Deepdive repo) | 2026-06-22 | S5 | 🟢 Approved, pending impl |
| 8 | Option C "Suggest a Fund" email capture — resurfaced as a mid-article subscribe pitch ("Want your fund investigated? Subscribe and reply with its name"). Copy drafted but not shipped; it is a real commitment (reader replies must feed the investigation queue), so it waits until we are ready to honor requests | 2026-06-22 | S6; revisited S17 | 🟡 Parked |
| 12 | Homepage teaser punchline — keep long-term vs shorter variant | 2026-05-04 | S1 | 🟡 Open |
| 13 | Extract a reusable "Why Fund Investigator" component if reused on more pages | 2026-05-04 | S1 | 🟡 Open |
| 22 | Hero fund-search console — replace the primary CTA with a live fund lookup that deep-links into Deepdive (design agreed, build parked) | 2026-07-12 | S10 | 🟡 Parked |
| 23 | Add `?fund=<scheme_code>` deep-link support to the Deepdive app — prerequisite for #22, and useful on its own for linking a report to the fund it investigates | 2026-07-12 | S10 | 🟡 Parked |
| 29 | Author in the structured data is the Organization, not a named person — a personal byline is deferred until SEBI Research Analyst certification. Revisit once certified (`authorRef()` in `src/lib/schema.ts` is isolated so the swap is one line, but it needs a visible byline alongside it) | 2026-07-14 | S12 | 🟡 Parked |
| 31 | **Launch the Substack Five Checks series as individual investigations of popular funds.** The intended reader already owns or is considering the named fund. Select funds for popularity and prospect relevance, then report whatever the five checks show; include a popular fund with weaker or mixed evidence early to establish editorial independence. Do not add fund comparisons or suitability conclusions until an explicit individual risk-profile layer and its editorial boundaries exist | 2026-07-21 | S19 | 🟢 Approved; editorial strategy documented |
| 32 | **Article footer and discovery enhancements — curated related investigations, sharing controls, and filed-under tags.** For related content, show up to two manually selected current reports after an article's conclusion, reject archived destinations, and keep historical reports limited to their successor notice. If sharing is added, keep it restrained and audience-relevant (Copy link, WhatsApp, LinkedIn). If tags are exposed, use a quiet footer row rather than a second navigation rail. These remain separate decisions after the article navigation and metadata work; do not add them by default | 2026-07-22; expanded 2026-08-08 | S20; S34 | 🟡 Parked |
| 33 | **Article plan #5 — Complete the final whole-system verification.** Audit internal links and subscription destinations, check accessibility, inspect mobile and laptop presentation, and run the production build after the remaining article work is complete | 2026-07-22 | S20; updated S35 | 🟢 Resolved (S35 — added accessible names to the header and footer logo links, passed PR and post-merge Link Check workflows, and confirmed both labels in the live production HTML after merge commit `bec20c5`.) |
| 35 | Verify the Deepdive showcase walkthrough on a real Safari device. Chrome selects the most efficient format and never exercises the fallback Safari would use; the fallback decodes correctly offline but has not been confirmed playing in the browser | 2026-08-03 | S22 | 🟡 Open |
| 36 | The showcase walkthrough closes on a `deepdive.fundinvestigator.com` watermark card, which is redundant when the reel plays on our own site. Harmless, but removing it requires re-rendering in the `brand_promo` project rather than a change in this repository | 2026-08-03 | S22 | 🟡 Open |
| 41 | Extend `/styleguide` to visually cover page-composition patterns it currently doesn't show: Navigation, Footer, Background Accents (the hero/Why-FI radial gradient), and Section Labels. **Updated:** Deepdive App Mockup and Email Input dropped from this list — both describe UI that no longer exists; moved into `style_spec.md`'s "What Was Deliberately Excluded" log instead. Navigation, Footer, and Section Spacing had also drifted from the live implementation — `style_spec.md` now points at the owning component file instead of restating values. Building live `/styleguide` sections for Nav/Footer/Background Accents is still real UI/Astro work, not a doc edit — separate session | 2026-08-03 | S24 | 🟡 Open |
| 42 | A Cloudflare Pages build log for a `dev`-branch preview deploy (commit `929e072`) read `Found Functions directory at /functions. Uploading.` — apparently contradicting #39's resolution that `functions/api/subscribe.ts` was deleted. The current repo checkout has no `functions/` directory, so this is most likely a stale preview build predating that deletion reaching `dev`, not a regression. Confirm whether `dev` has merged past the deletion commit, and whether a fresh Production or Preview build still uploads a Functions directory | 2026-08-03 | S26; updated S34, S35 | 🟢 Resolved (S35 — remote `main` is at merge commit `9b000f3`; the current source and build contain no `functions/` directory, and the fresh Cloudflare Production log reports `No functions dir at /functions found. Skipping.`) |
| 47 | Google Search Console verification + sitemap submission (`sitemap-index.xml` already generated) — manual, on the site owner, not a code change; surfaced during the same analytics audit as Phase 2 | 2026-08-07 | S29; updated S35 | 🟢 Resolved (S35 — the `sc-domain:fundinvestigator.com` property is confirmed and `https://fundinvestigator.com/sitemap-index.xml` is submitted with status Success and 12 discovered pages. Bing Webmaster Tools remains optional and was not submitted. The previously noted duplicate SPF records remain a separate DNS follow-up.) |
| 51 | **Optional, low-priority cosmetic follow-up from #50**: the "JS Snippet installation" Web Analytics site's host allowlist (`(fund-investigator.pages.dev\|fundinvestigator.com)$`) doesn't cover preview-branch subdomains like `dev.fund-investigator.pages.dev`, so its beacon 404s there — browser console noise only on preview deploys, does not affect production. Widening the host pattern would fix it, but doing this via the API hits the same wall discovered in #50: the connected Cloudflare API token can read Pages/Web-Analytics config but cannot write it (confirmed via the failed `PATCH` in #50) — would need either a manual dashboard edit or a token-permission upgrade (Account → Cloudflare Pages → Edit) first | 2026-08-07 | S31 | 🟡 Open |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

---

### 📅 Date: 2026-08-21 | Session: S35 — Production SEO deployment cross-check and decision-log update

**What was done:**
Cross-checked the reported production handoff against the remote GitHub state, the completed Link
Check action, a fresh local build, the current source tree, and live HTTPS responses. Remote `main`
contains merge commit `9b000f3`; GitHub's Link Check run #4 completed successfully. The local build
produced 14 pages and passed all five Astro SEO validators, with only the known sourcemap and stale
Browserslist warnings. Live checks returned the expected IndexNow key, Markdown response and headers,
sitemap, global discovery/security headers, immutable asset caching, 404 status, and Substack
redirect behavior.

**Why:**
The deployment and webmaster claims needed to be checked against observable repository, CI, and
production evidence before closing the related decisions. The accessibility result also needed to be
separated from the completed SEO/deployment work so #33 would not be closed prematurely.

**How:**
Used the remote GitHub refs and Actions API for the production merge and Link Check status, ran
`npm run build` locally, inspected the header/footer source and built route set, and made fresh HTTPS
requests for the key, Markdown, sitemap, report, missing URL, asset, and subscribe routes. The
header and footer logo links are still unlabeled in source and live HTML, confirming the remaining
accessibility issue. The missing-image finding was not reproducible from the source/live HTML.

**Decisions made:**
- Close #42: the fresh production build confirms that no Pages Functions directory is uploaded.
- Close #47: the Search Console domain property and sitemap submission are confirmed.
- Close #33: the two logo links now have accessible names, and the live production HTML confirms both
  labels after deployment.
- Leave the optional Bing submission and Cloudflare Markdown negotiation rule unchanged.

**Pending decisions:**
- #33 is resolved; the reported logo-link accessibility defects are fixed and live.
- #35, #36, #41, and #51 remain unchanged.

**Follow-up (same session):**
Added `aria-label="Fund Investigator home"` to the header and footer logo links in commit `e2f0698`.
PR #2 passed its Link Check and Cloudflare preview checks, merged into `main` as `bec20c5`, and the
post-merge main Link Check also passed. A live production HTML check returned HTTP 200 and found both
accessible names. A full browser/axe scan was not available in this environment; the verification
here targets the two defects identified by the prior desktop accessibility check.

---

### 📅 Date: 2026-08-08 | Session: S34 — Article navigation, SEO foundation, and report content refinement implemented

**What was done:**
Added an H2-only table of contents to every investigation with at least three sections: a sticky
left rail on wide screens and an expandable sticky bar below the fixed header on mobile/tablet.
The navigation tracks the active section, exposes the current section on mobile, supports
back-to-top, Escape/outside-click dismissal, and accessible state. Article heroes now show Home /
Investigations breadcrumbs, published and conditional updated dates, read time, category, archive
status, and an organizational “By Fund Investigator” link to `/about/`. The visible and JSON-LD
breadcrumb trails now use the same two destinations. The follow-up work also completed the shared
SEO foundation through source-code Phase 4: centralized metadata and canonical handling, linked
JSON-LD graphs and build validation, RSS and sitemap improvements, production-gated IndexNow, and
machine-readable schema, Markdown, API-catalogue, and schema-map endpoints with route-specific
headers and AI content signals.

Reports now receive branded 1200×675 social cards at build time, with optional `seo.title`,
`seo.description`, and `seo.image` overrides; the old `coverImage` workflow was retired. The main
“Five Questions” investigation and mutual-fund-categories article were rewritten for clearer,
question-led, plain-language explanations, and report images were constrained to the prose column.
Supporting design tokens, styleguide coverage, deployment notes, SEO audit records, and the visual
authority-strategy note were brought in line with the implementation.

**Why:**
Long evidence-led reports need orientation and freshness/ownership signals, but the article column
should remain quiet, centred, and readable. Shared SEO infrastructure makes the reports easier for
search engines, feed readers, and machine consumers to understand without adding runtime services.
The content revisions reduce cognitive load while keeping the analysis, source trail, and editorial
boundaries visible. Related content, sharing controls, and visible tags were useful ideas but not
required for this first navigation pass.

**How:**
Passed Astro's rendered headings from the report route into the article layout, filtered to H2 in a
typed component, and used a symmetrical named grid token to preserve the 65ch prose column. Added
typed breadcrumb and metadata components without changing report frontmatter. Centralized metadata
and schema assembly behind the shared SEO component, added deterministic Satori/Sharp social cards,
and generated RSS plus schema/Markdown discovery surfaces from the content collection. Build-time
validators and artifact checks were kept separate from the remaining Cloudflare and production
verification gates. The three deferred footer/discovery ideas were consolidated into decision #32.

**Decisions made:**
- Render the TOC automatically at three or more H2 headings; do not number headings or include H3.
- Keep authorship organizational and link the visible byline to the existing About page.
- Keep visible and structured breadcrumbs to Home / Investigations only.
- Use generated branded social cards by default, with custom report artwork handled through the
  explicit `seo.image` override; remove the obsolete `coverImage` workflow (#27 resolved).
- Implement the technical SEO/AIO tranche through source-code Phase 4; keep publisher authority,
  Phase 5, and live deployment checks as follow-up work (#34 resolved).
- Use question-led, plain-language article structure for the reader-facing mutual-fund explainers.
- Audit the decision table against the current source: close or narrow the Substack/MailerLite and
  site-side telemetry items (#9, #10, #11, #30), while keeping the Cloudflare deployment check (#42)
  open until a fresh Pages build log is verified.

**Pending decisions:**
- #32 expanded and parked: curated related investigations, restrained sharing controls, and
  filed-under tags remain separate follow-up decisions.
- #33 remains open for final whole-system verification. SEO Phase 5 and the documented Cloudflare
  Markdown negotiation rule still need deployment/live checks; publisher authority and methodology
  work remain outside this implementation tranche.

**Current-session follow-up (2026-08-20):**
Implemented the remaining repository-side Phase 5 tranche: `FuzzyRedirect` on the 404 page, global
discovery/security/performance headers in `public/_headers`, Lychee external-link CI, and a concise
SEO title override for the Five Questions report. Updated `docs/seo_audit.md` and `docs/DEPLOYMENT.md`
to reflect the source state. `npm run build` passed with all five Astro SEO validators; the prior
over-length title warning is resolved. Unauthenticated HTTPS checks found the production sitemap and
robots routes live, but the IndexNow key and Markdown alternate routes still return 404. Dashboard
configuration, GSC confirmation, and a fresh Cloudflare build log are therefore still pending
authentication/deployment.
