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
| 33 | **Article plan #5 — Complete the final whole-system verification.** Audit internal links and subscription destinations, check accessibility, inspect mobile and laptop presentation, and run the production build after the remaining article work is complete | 2026-07-22 | S20 | 🟡 Open |
| 35 | Verify the Deepdive showcase walkthrough on a real Safari device. Chrome selects the most efficient format and never exercises the fallback Safari would use; the fallback decodes correctly offline but has not been confirmed playing in the browser | 2026-08-03 | S22 | 🟡 Open |
| 36 | The showcase walkthrough closes on a `deepdive.fundinvestigator.com` watermark card, which is redundant when the reel plays on our own site. Harmless, but removing it requires re-rendering in the `brand_promo` project rather than a change in this repository | 2026-08-03 | S22 | 🟡 Open |
| 41 | Extend `/styleguide` to visually cover page-composition patterns it currently doesn't show: Navigation, Footer, Background Accents (the hero/Why-FI radial gradient), and Section Labels. **Updated:** Deepdive App Mockup and Email Input dropped from this list — both describe UI that no longer exists; moved into `style_spec.md`'s "What Was Deliberately Excluded" log instead. Navigation, Footer, and Section Spacing had also drifted from the live implementation — `style_spec.md` now points at the owning component file instead of restating values. Building live `/styleguide` sections for Nav/Footer/Background Accents is still real UI/Astro work, not a doc edit — separate session | 2026-08-03 | S24 | 🟡 Open |
| 42 | A Cloudflare Pages build log for a `dev`-branch preview deploy (commit `929e072`) read `Found Functions directory at /functions. Uploading.` — apparently contradicting #39's resolution that `functions/api/subscribe.ts` was deleted. The current repo checkout has no `functions/` directory, so this is most likely a stale preview build predating that deletion reaching `dev`, not a regression. Confirm whether `dev` has merged past the deletion commit, and whether a fresh Production or Preview build still uploads a Functions directory | 2026-08-03 | S26; updated S34 | 🟡 Open — **S34 update:** current `dev` at `ccd1285` includes the deletion commit `cdd0f10`, and a fresh local `npm run build` produced a static `dist/` with no Functions directory. A new Cloudflare Pages preview or production deployment log still needs checking, so live confirmation remains open |
| 47 | Google Search Console verification + sitemap submission (`sitemap-index.xml` already generated) — manual, on the site owner, not a code change; surfaced during the same analytics audit as Phase 2 | 2026-08-07 | S29 | 🟡 Open — **S33 update:** checked, most of it already done. A `google-site-verification` DNS TXT record has been live on the zone apex since 2026-01-06 (verified independently via the Cloudflare API) — domain ownership verification is already satisfied, just never confirmed inside the GSC dashboard itself. Sitemap confirmed live and correct in production (`sitemap-index.xml` → `sitemap-0.xml`, 12 URLs). Remaining: owner needs to log into `search.google.com/search-console`, confirm/complete the domain property's verify step (should be instant given the TXT record's age), and submit the sitemap under Settings → Sitemaps if not already listed — GSC dashboard state couldn't be checked without the owner's own Google login. Bing Webmaster Tools optional, same manual step. Unrelated finding surfaced in the same DNS check: two separate SPF TXT records exist on the zone (one from 2026-05-03, one from 2026-05-05) — invalid per spec, worth a separate look if there have been email deliverability issues |
| 51 | **Optional, low-priority cosmetic follow-up from #50**: the "JS Snippet installation" Web Analytics site's host allowlist (`(fund-investigator.pages.dev\|fundinvestigator.com)$`) doesn't cover preview-branch subdomains like `dev.fund-investigator.pages.dev`, so its beacon 404s there — browser console noise only on preview deploys, does not affect production. Widening the host pattern would fix it, but doing this via the API hits the same wall discovered in #50: the connected Cloudflare API token can read Pages/Web-Analytics config but cannot write it (confirmed via the failed `PATCH` in #50) — would need either a manual dashboard edit or a token-permission upgrade (Account → Cloudflare Pages → Edit) first | 2026-08-07 | S31 | 🟡 Open |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

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
