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
- Archived sessions (S1–S28) and resolved/moot pending decisions: `docs/project_log_archive.md`

---

## 🧭 Agent Verdicts

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
| 9 | Preserve signup-source evidence (`hero_guide` vs `homepage_bottom`) through the Substack cutover. Substack's iframe may limit confirmed per-placement attribution, but first-party impressions and CTA interactions should still be recorded | 2026-05-04 | S2; expanded S15; moved to Substack S16 | 🟡 Open |
| 10 | MailerLite endpoint abuse protection (double opt-in, rate limiting, honeypot/Turnstile) | 2026-05-04 | S2; expanded S15 | ⏸ Deferred S16 for the one-day Substack cutover; close when `/api/subscribe` is removed, but implement double opt-in first if the migration slips |
| 11 | Add production monitoring and conversion telemetry for modal opens, attempts, successes/failures, and signup source. Provider-failure monitoring becomes moot when MailerLite is removed; placement evidence remains useful with Substack | 2026-05-04 | S2; expanded S15; revised S16 | 🟡 Partially carried into Substack cutover |
| 12 | Homepage teaser punchline — keep long-term vs shorter variant | 2026-05-04 | S1 | 🟡 Open |
| 13 | Extract a reusable "Why Fund Investigator" component if reused on more pages | 2026-05-04 | S1 | 🟡 Open |
| 22 | Hero fund-search console — replace the primary CTA with a live fund lookup that deep-links into Deepdive (design agreed, build parked) | 2026-07-12 | S10 | 🟡 Parked |
| 23 | Add `?fund=<scheme_code>` deep-link support to the Deepdive app — prerequisite for #22, and useful on its own for linking a report to the fund it investigates | 2026-07-12 | S10 | 🟡 Parked |
| 27 | OG/cover images: no report sets `coverImage`, so every share falls back to the generic card. Automation costed: **build-time only, ₹0 runtime/cloud** via Satori + `@resvg/resvg-js` (full flexbox control, unlike `astro-og-canvas`). Card = dark `fi-dark` bg + title + `keyMetrics[0]` + logo, title-only fallback. Manual wiring of the existing `cover.png` chart exports was tried and reverted (illegible at feed size, mis-declared dimensions). Still parked | 2026-07-12; costed S14 | S12; S14 | 🟡 Parked |
| 29 | Author in the structured data is the Organization, not a named person — a personal byline is deferred until SEBI Research Analyst certification. Revisit once certified (`authorRef()` in `src/lib/schema.ts` is isolated so the swap is one line, but it needs a visible byline alongside it) | 2026-07-14 | S12 | 🟡 Parked |
| 30 | **Move email capture and distribution to Substack while keeping Astro as the canonical content home.** Substack will own capture, double opt-in, the welcome email, newsletters, and network distribution; FundInvestigator.com retains every full investigation. Substack carries teasers, summaries, Notes, and publication updates linking back — not duplicate full reports. Use a dedicated Fund Investigator brand-owned Substack account and add the personal account as an admin. Do not retain MailerLite in parallel after cutover. Existing trade-offs remain: uncustomizable iframe and weaker per-placement attribution; $50 custom subdomain with Substack sender; exportable subscriber data; standard paid fee of 10% plus Stripe subject to the current India exception, with #3 required before paid is enabled | 2026-07-15 | S13; reviewed S15; approved S16 | 🟢 Approved; implementation in progress |
| 31 | **Launch the Substack Five Checks series as individual investigations of popular funds.** The intended reader already owns or is considering the named fund. Select funds for popularity and prospect relevance, then report whatever the five checks show; include a popular fund with weaker or mixed evidence early to establish editorial independence. Do not add fund comparisons or suitability conclusions until an explicit individual risk-profile layer and its editorial boundaries exist | 2026-07-21 | S19 | 🟢 Approved; editorial strategy documented |
| 32 | **Article plan #4 — Add curated related investigations.** Show up to two manually selected current reports after an article's conclusion, reject archived destinations, and keep historical reports limited to their successor notice | 2026-07-22 | S20 | 🟡 Open |
| 33 | **Article plan #5 — Complete the final whole-system verification.** Audit internal links and subscription destinations, check accessibility, inspect mobile and laptop presentation, and run the production build after the remaining article work is complete | 2026-07-22 | S20 | 🟡 Open |
| 34 | Choose the first SEO/AIO implementation tranche: publisher accountability and methodology, discovery/indexing controls, or machine-readable report evidence | 2026-07-23 | S21 | 🟡 Open |
| 35 | Verify the Deepdive showcase walkthrough on a real Safari device. Chrome selects the most efficient format and never exercises the fallback Safari would use; the fallback decodes correctly offline but has not been confirmed playing in the browser | 2026-08-03 | S22 | 🟡 Open |
| 36 | The showcase walkthrough closes on a `deepdive.fundinvestigator.com` watermark card, which is redundant when the reel plays on our own site. Harmless, but removing it requires re-rendering in the `brand_promo` project rather than a change in this repository | 2026-08-03 | S22 | 🟡 Open |
| 41 | Extend `/styleguide` to visually cover page-composition patterns it currently doesn't show: Navigation, Footer, Background Accents (the hero/Why-FI radial gradient), and Section Labels. **Updated:** Deepdive App Mockup and Email Input dropped from this list — both describe UI that no longer exists; moved into `style_spec.md`'s "What Was Deliberately Excluded" log instead. Navigation, Footer, and Section Spacing had also drifted from the live implementation — `style_spec.md` now points at the owning component file instead of restating values. Building live `/styleguide` sections for Nav/Footer/Background Accents is still real UI/Astro work, not a doc edit — separate session | 2026-08-03 | S24 | 🟡 Open |
| 42 | A Cloudflare Pages build log for a `dev`-branch preview deploy (commit `929e072`) read `Found Functions directory at /functions. Uploading.` — apparently contradicting #39's resolution that `functions/api/subscribe.ts` was deleted. The current repo checkout has no `functions/` directory, so this is most likely a stale preview build predating that deletion reaching `dev`, not a regression. Confirm whether `dev` has merged past the deletion commit, and whether a fresh Production or Preview build still uploads a Functions directory | 2026-08-03 | S26 | 🟡 Open |
| 44 | **Analytics Phase 2 — extend PostHog to the Astro site.** The owner already runs PostHog (free tier) for Deepdive analytics — supersedes the earlier self-hosted-Umami-on-Railway plan, which would have been pure ops overhead for a weaker result. Add `posthog-js` to `Layout.astro` using the same PostHog project, and configure cross-subdomain tracking (`fundinvestigator.com` ↔ `deepdive.fundinvestigator.com` share a top-level domain) so a single user journey — homepage → CTA click → Deepdive usage — is visible as one funnel instead of two disconnected tools | 2026-08-07 | S29 | ✅ Resolved (S30 — `posthog-js` initialized in `Layout.astro`, `cross_subdomain_cookie: true` set, merged to `dev`. Confirmed via the PostHog MCP that project 281630 "Default project" is the real, already-live Deepdive project — its known event names `investigation started`/`analysis viewed`/`analysis failed` are present in the schema) |
| 45 | **Analytics Phase 2 — wire up event tracking once PostHog is live on the Astro site**: custom events for the 6 Deepdive CTA placements (`src/lib/deepdive.ts`) and Substack subscribe clicks (closes #9/#11); update `privacy.astro` to disclose PostHog/cookie use — owner has confirmed comfortable with cookies here, so this is a documentation update, not an open question | 2026-08-07 | S29 | ✅ Resolved (S30 — decided to rely on PostHog's default autocapture rather than hand-written per-CTA events, since every Deepdive/Substack link already carries a distinguishing `utm_content`; `privacy.astro` updated to disclose PostHog/cookies and drop the now-false "Cloudflare Browser Errors" claim) |
| 46 | Merge `analytics/phase-0-1-cleanup` and `chore/consolidate-external-urls` (stacked on top, contains both) to `main` — both build clean, neither pushed yet, awaiting owner review | 2026-08-07 | S29 | 🟡 Open — **S30 update:** merged to `dev` instead (squashed, `eef6494`), plus the PostHog work on top (`99de3fe`). `dev` → `main` is still outstanding; `main` currently only has the unrelated `.claude/worktrees/` gitignore commit (`a5c8ef0`) that `dev` itself lacks |
| 47 | Google Search Console verification + sitemap submission (`sitemap-index.xml` already generated) — manual, on the site owner, not a code change; surfaced during the same analytics audit as Phase 2 | 2026-08-07 | S29 | 🟡 Open |
| 48 | **Set `PUBLIC_POSTHOG_KEY` and `PUBLIC_POSTHOG_HOST` in Cloudflare Pages** (both Production and Preview — see #37's history for why Preview can't be skipped). Confirmed live values via the PostHog MCP: key `phc_GdzruWcONrR6RtVMLf0ddtKd7GWEdfrWSdTPNs90mvn`, host `https://us.i.posthog.com` (US Cloud region — matches Deepdive's own `.env.example` default). Manual, on the site owner; the actual Cloudflare API write was intentionally not automated (blocked by the harness's own permission classifier as a live production-secret mutation, and the owner chose the manual-values-handoff option over an in-session automated write) | 2026-08-07 | S30 | ✅ Resolved (S30 — owner set both variables in Cloudflare Pages directly) |
| 49 | **Deepdive-side PostHog config fix, in the separate `tearsheet` repo.** `src/fund_investigator/ui/analytics_bridge.py`'s `posthog.init()` call (around line 206) does not set `cross_subdomain_cookie: true`, so its browser cookie is currently scoped to `deepdive.fundinvestigator.com` only — cross-domain identity won't stitch with the website's PostHog init until this is added there too. Out of scope for this repo/session | 2026-08-07 | S30 | 🟡 Open |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

---

### 📅 Date: 2026-08-07 | Session: S30 — PostHog wired up and verified against the real project; merged to dev

**What was done:**
Picked up the Phase 2 handoff from S29. A PostHog MCP connection was added this session, which
made it possible to verify — not just assume — that the PostHog project already used for the
Deepdive app is the right one to reuse: its event schema shows `investigation started`,
`analysis viewed`, and `analysis failed`, exactly matching Deepdive's own analytics code. Also
read the Deepdive app's own analytics source directly (separate `tearsheet` repo, same machine) to
understand its real architecture, correcting an earlier assumption — it's not purely server-side;
it runs a real browser-side PostHog client for identity plus a Python client for semantic events,
deliberately with autocapture and default pageview capture turned off. Merged the previously-built
`feat/posthog-analytics` branch into `dev`, then set the real, confirmed PostHog project key and
host as the values the owner needs to enter in Cloudflare Pages.

**Why:**
A background-agent attempt to both merge the branch and write live Cloudflare Pages environment
variables was blocked by the harness's own permission classifier, since mutating production secrets
autonomously in the background is exactly the kind of hard-to-reverse, shared-system action that
should not happen unattended. The owner chose to keep the git merge and PostHog verification in this
session (safe, reversible, foreground) and take the Cloudflare values away to set manually, rather
than have an agent write to the live Cloudflare account.

**How:**
Used the new PostHog MCP's `read-data-schema` and `project-get` tools to confirm project `281630`
("Default project", org "Fund Investigator") is real and already receiving Deepdive's events, and to
pull its exact API token. Cross-checked the ingestion host against Deepdive's own `.env.example`
default (`https://us.i.posthog.com`) rather than guessing. Merged `feat/posthog-analytics` into `dev`
via `git merge --squash` (same pattern as the prior branch consolidation), ran `npm install` (the
new `posthog-js` dependency wasn't yet present in this worktree) and `npm run build` — both
succeeded. Also read the Deepdive app's `analytics_bridge.py` directly and found a real, specific gap:
its `posthog.init()` never sets `cross_subdomain_cookie`, so identity won't stitch across the two
domains until that repo adds it too.

**Decisions made:**
- Reuse the existing PostHog project confirmed via MCP, not a new one — key and host now known.
- Autocapture stays on for the website (no hand-written per-CTA events) — confirmed final.
- Merge to `dev`, not directly to `main`; `dev` → `main` remains a separate, still-open step (#46).
- Do not attempt to fix the Deepdive-side `cross_subdomain_cookie` gap from this repo/session (#49).

**Pending decisions:**
- New: #48 (owner sets `PUBLIC_POSTHOG_KEY`/`PUBLIC_POSTHOG_HOST` in Cloudflare Pages, values now
  confirmed and recorded above), #49 (Deepdive-side `cross_subdomain_cookie` fix, separate repo).
  #44 and #45 resolved this session. #46 partially updated — merged to `dev`, `main` still pending.

---

### 📅 Date: 2026-08-07 | Session: S29 — Analytics audit; dead beacon removed, Deepdive UTM tracking added, URLs consolidated; Phase 2 handed off

**What was done:**
Audited the site's analytics setup end to end. Found real Cloudflare Web Analytics already enabled
and collecting data at the dashboard level, but also a dead custom error-tracking script sending to
a fake domain, UTM tracking that only covered the Substack newsletter funnel, and zero tracking on
the Deepdive app CTAs — the site's primary conversion action. Implemented cleanup on two stacked
branches: deleted the dead script, added first-party UTM tracking to all six Deepdive links via a
new `deepdive.ts` helper mirroring the existing `substack.ts` pattern, and consolidated four
previously-duplicated external URLs (Deepdive, site domain, Twitter, YouTube) into one file,
`site-urls.ts`. Also gitignored the `.claude/worktrees/` folder the isolated build agents use.
Then evaluated Phase 2 — a real analytics tool for goals, funnels, and custom events, which
Cloudflare Web Analytics alone cannot provide — and, after checking actual Railway usage, picked
self-hosted Umami over Matomo, Plausible, and GA4.

**Why:**
Two blind spots stood out: no way to tell which on-site placement drives Deepdive usage, and no
event-level view of conversions at all (both flagged back in #9 and #11). The owner wants zero
additional recurring cost right now, which ruled Plausible out and made hosting economics — not
just software cost — the deciding factor for the rest.

**How:**
Phase 0/1 work ran in isolated git worktrees via background agents, verified with `npm run build`
before committing, kept unmerged for review. For Phase 2, checked the owner's live Railway billing
page (Deepdive's host): Hobby plan includes $5/mo usage, only $0.46 used today, leaving roughly
$4.50/mo of already-paid-for headroom. Matomo's PHP + MySQL + cron-archiving footprint was judged a
real risk of eating into that headroom as traffic grows; Umami's single lightweight process was not.
GA4 was ruled out separately — it's cookie-based, which conflicts with the no-cookie claim already
published on the site's privacy page.

**Decisions made:**
- Delete the dead Cloudflare RUM beacon (closes #37).
- Add UTM tracking to all Deepdive CTA links via `src/lib/deepdive.ts`.
- Consolidate `DEEPDIVE_URL`/`SITE_URL`/`TWITTER_URL`/`YOUTUBE_URL` into `src/lib/site-urls.ts`.
- Gitignore `.claude/worktrees/`.
- Analytics Phase 2 tool, first pass: self-hosted Umami on Railway, deployed inside Deepdive's
  existing Railway project — not Matomo, not Plausible, not GA4.
- **Superseded same session:** the owner mentioned already running PostHog (free tier) for Deepdive
  analytics. Switched Phase 2 to extending that existing PostHog project to the Astro site instead —
  same $0 cost as Umami but no new service to host, and PostHog's cross-subdomain support closes the
  hub→spoke visibility gap that Umami would not have. Owner confirmed comfortable with cookies for
  this, so `privacy.astro` will be updated to disclose PostHog rather than treated as a blocker.

**Pending decisions:**
- New: #44 (extend PostHog to the Astro site + cross-subdomain config), #45 (event-tracking
  integration once live — closes #9/#11 — plus the `privacy.astro` disclosure update), #46 (merge
  the two unmerged branches), #47 (Google Search Console setup, manual). See table above for detail.
  Phase 2 (#44/#45) is explicitly handed off to a separate session.

---
