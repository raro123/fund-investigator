# Project Log: Fund Investigator

**Goal:** Build a fast, content-led mutual fund hub (fundinvestigator.com) on Astro and Cloudflare Pages.
It offers free analytics (investigations, Learn articles, the Deepdive app) and an assisted "Invest with Support"
service from an AMFI-registered Mutual Fund Distributor (SIF-enabled). Success = low-ops, solo-friendly delivery
that builds analytics authority and earns distribution revenue; paid research is deferred to a later review.

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
| 29 | Author in the structured data is the Organization, not a named person — a personal byline is deferred until SEBI Research Analyst certification. Revisit once certified (`authorRef()` in `src/lib/schema.ts` is isolated so the swap is one line, but it needs a visible byline alongside it). **S43:** extended to distribution pages: the name appears only in the ARN identity (footer, `/invest/` registration card); no founder profile or photo | 2026-07-14 | S12; updated S43 | 🟡 Parked |
| 31 | **Launch the Substack Five Checks series as individual investigations of popular funds.** The intended reader already owns or is considering the named fund. Select funds for popularity and prospect relevance, then report whatever the five checks show; include a popular fund with weaker or mixed evidence early to establish editorial independence. Do not add fund comparisons or suitability conclusions until an explicit individual risk-profile layer and its editorial boundaries exist | 2026-07-21 | S19 | 🟢 Approved; editorial strategy documented |
| 32 | **Article footer and discovery enhancements — curated related investigations, sharing controls, and filed-under tags.** For related content, show up to two manually selected current reports after an article's conclusion, reject archived destinations, and keep historical reports limited to their successor notice. If sharing is added, keep it restrained and audience-relevant (Copy link, WhatsApp, LinkedIn). If tags are exposed, use a quiet footer row rather than a second navigation rail. These remain separate decisions after the article navigation and metadata work; do not add them by default | 2026-07-22; expanded 2026-08-08 | S20; S34 | 🟡 Parked |
| 33 | **Article plan #5 — Complete the final whole-system verification.** Audit internal links and subscription destinations, check accessibility, inspect mobile and laptop presentation, and run the production build after the remaining article work is complete | 2026-07-22 | S20; updated S35 | 🟢 Resolved (S35 — added accessible names to the header and footer logo links, passed PR and post-merge Link Check workflows, and confirmed both labels in the live production HTML after merge commit `bec20c5`.) |
| 35 | Verify the Deepdive showcase walkthrough on a real Safari device. Chrome selects the most efficient format and never exercises the fallback Safari would use; the fallback decodes correctly offline but has not been confirmed playing in the browser | 2026-08-03 | S22 | ⚪ Moot (S44 — the video reel is removed from the homepage; a still snapshot replaces it) |
| 36 | The showcase walkthrough closes on a `deepdive.fundinvestigator.com` watermark card, which is redundant when the reel plays on our own site. Harmless, but removing it requires re-rendering in the `brand_promo` project rather than a change in this repository | 2026-08-03 | S22 | ⚪ Moot (S44 — the reel no longer plays on the site) |
| 41 | Extend `/styleguide` to visually cover page-composition patterns it currently doesn't show: Navigation, Footer, Background Accents (the hero/Why-FI radial gradient), and Section Labels. **Updated:** Deepdive App Mockup and Email Input dropped from this list — both describe UI that no longer exists; moved into `style_spec.md`'s "What Was Deliberately Excluded" log instead. Navigation, Footer, and Section Spacing had also drifted from the live implementation — `style_spec.md` now points at the owning component file instead of restating values. Building live `/styleguide` sections for Nav/Footer/Background Accents is still real UI/Astro work, not a doc edit — separate session | 2026-08-03 | S24 | 🟡 Open |
| 42 | A Cloudflare Pages build log for a `dev`-branch preview deploy (commit `929e072`) read `Found Functions directory at /functions. Uploading.` — apparently contradicting #39's resolution that `functions/api/subscribe.ts` was deleted. The current repo checkout has no `functions/` directory, so this is most likely a stale preview build predating that deletion reaching `dev`, not a regression. Confirm whether `dev` has merged past the deletion commit, and whether a fresh Production or Preview build still uploads a Functions directory | 2026-08-03 | S26; updated S34, S35 | 🟢 Resolved (S35 — remote `main` is at merge commit `9b000f3`; the current source and build contain no `functions/` directory, and the fresh Cloudflare Production log reports `No functions dir at /functions found. Skipping.`) |
| 47 | Google Search Console verification + sitemap submission (`sitemap-index.xml` already generated) — manual, on the site owner, not a code change; surfaced during the same analytics audit as Phase 2 | 2026-08-07 | S29; updated S35 | 🟢 Resolved (S35 — the `sc-domain:fundinvestigator.com` property is confirmed and `https://fundinvestigator.com/sitemap-index.xml` is submitted with status Success and 12 discovered pages. Bing Webmaster Tools remains optional and was not submitted. The previously noted duplicate SPF records remain a separate DNS follow-up.) |
| 51 | **Optional, low-priority cosmetic follow-up from #50**: the "JS Snippet installation" Web Analytics site's host allowlist (`(fund-investigator.pages.dev\|fundinvestigator.com)$`) doesn't cover preview-branch subdomains like `dev.fund-investigator.pages.dev`, so its beacon 404s there — browser console noise only on preview deploys, does not affect production. Widening the host pattern would fix it, but doing this via the API hits the same wall discovered in #50: the connected Cloudflare API token can read Pages/Web-Analytics config but cannot write it (confirmed via the failed `PATCH` in #50) — would need either a manual dashboard edit or a token-permission upgrade (Account → Cloudflare Pages → Edit) first | 2026-08-07 | S31 | 🟡 Open |
| 52 | **Hero CTA order.** S37 made "Read our Investigations" the gold hero primary and Deepdive the secondary, revising the order kept in S36. It is an isolated commit on `design/contrast-and-accent-fixes`; confirm or drop it at review. Watch Deepdive click-through from `homepage_hero` after release | 2026-10-03 | S37 | ⚪ Superseded (S40 — the hub hero has one button, "Invest with Support"; see #58) |
| 53 | Replace one "Sales Trap" claim card with evidence — e.g. where last year's top-ranked funds in a category ranked the following year. Needs the data pull before any design work | 2026-10-03 | S37 | ⚪ Moot (S41 — the Sales Trap section is removed from the new homepage) |
| 54 | Add a rendered-page accessibility scan (axe or pa11y against `dist/`) to CI. Existing checks cannot detect every rendered colour combination. Defer this task because the owner prefers simple checks over extensive rule testing | 2026-10-03 | S37; updated S39 | 🟡 Parked |
| 55 | **Design — high priority: align the design references.** Update `docs/style_spec.md` card descriptions to match the shared components and current homepage. Check colours, padding, corners, and hover styles. Prefer references to component props over repeated numeric specifications. Keep existing `/styleguide` examples consistent. Complete when the references agree with the website. Page-composition examples remain separate under #41 | 2026-10-03 | S39 | 🟢 Queued |
| 56 | **Design — medium priority: share repeated homepage cards and responsive patterns.** Move repeated problem and analytical cards from `src/pages/index.astro` into shared components. Extend `Card.astro` with a dark variant if that keeps the implementation simple. Use shared typography presets where they fit. Move repeated card layout and spacing rules into their owning components. Complete after mobile and desktop checks show consistent cards without layout changes | 2026-10-03 | S39 | 🟢 Queued |
| 57 | **Design — high priority: use consistent, visible focus styles.** Replace half-opacity focus rings in Input, SearchInput, and LoginForm with the approved full-opacity colour. Check error and normal states. Confirm shared Button focus styles on light and dark surfaces. Complete after a keyboard check confirms visible focus across these controls | 2026-10-03 | S39 | 🟢 Queued |
| 58 | **Brand — high priority: choose the hero headline after feedback.** Options: (1, recommended) "We investigate, so you can invest." (2) "Before you invest, we investigate." (3) "Your Mutual Funds Deserve Our Investigation". Subtitle and single "Invest with Support" button are agreed | 2026-10-05 | S40 | ✅ Resolved (S41 — option 1, "We investigate, so you can invest.", with the agreed subtitle) |
| 59 | **Homepage — high priority: confirm section 2 "What we investigate".** It replaces the Problem section and absorbs the Deepdive lens cards (three questions: fair benchmark, risk, cost). Not yet applied to `docs/mfd_funnel_proposal.html` or proposal Section 15 | 2026-10-05 | S40 | ⚪ Superseded (S41 — section 2 is "How we help": three distribution cards) |
| 60 | **Distribution — high priority: set up the WhatsApp business number** (WhatsApp Business app, profile with name/ARN/risk warning, greeting with commission note, `wa.me` link with source code). Blocks Phase 2. **S41:** owner sets the number and confirms the platform by 2026-10-12. **S42:** number is +91 96250 26859, wired into the demo. Launch without a platform: step 4 names none, the existing-client login line is dropped. Texts drafted in `docs/mfd_whatsapp_kit.md`; owner to approve, confirm reply time and email, and choose the transaction route before replying to enquiries. **S43:** booking is the first contact route (Zoho Bookings, free plan, link in the handoff); WhatsApp is second. Owner to set the booking form (30 min, holdings-range question, minimum fields, reminders) | 2026-10-05 | S40; updated S41, S42, S43 | 🟡 Open |
| 61 | **Content — high priority: write Academy guides** (was "Learn"; no named funds). The homepage launches with the two existing guides; more guides are needed before release, and they are the main traffic lever | 2026-10-05 | S40; updated S41 | 🟡 Open (S42 — Academy deferred: new guides live under Investigations; revisit a separate Academy at ~8–10 guides) |
| 62 | **Analytics — medium priority: add PostHog funnel events** (`route_choice`, `invest_view`, `conversation_request` with channel, `platform_click`, `deepdive_click`, `subscribe_click`) and an internal-user filter. **S43:** add `review_booking_click` with placement; drop `platform_click` until a platform exists **S44:** built: `invest_view`, `review_booking_click`, `conversation_request` (channel), `deepdive_click`, `subscribe_click`, each with a placement, sent from data attributes by one listener in `Layout.astro`. Left: the internal-user filter in PostHog (a project setting) | 2026-10-05 | S40; updated S43 | 🟡 Open (S44 — events built; internal-user filter left) |
| 63 | **Docs — medium priority: update `docs/mfd_copy_demo.html`** with the new hero and homepage order once #58 and #59 are settled | 2026-10-05 | S40 | ✅ Resolved (S41 — homepage, nav and `/invest/` page rebuilt in the demo) |
| 64 | **Docs — low priority: delete `docs/homepage_funnel_*`** (three files from another session; superseded by the S40 decisions) | 2026-10-05 | S40 | ✅ Resolved (S42 — deleted with `docs/mfd_funnel_proposal.html`; proposal, demo and handoff are the sources of truth) |
| 65 | **Compliance — high priority: draft the distribution section of `/disclaimer/`.** It holds the detail moved off `/invest/`: commission rates by scheme (AMFI code 4(c)), the direct vs regular table, the ₹10 lakh cost example, and the complaints process. `/invest/` links to it once ("Full disclosures") **S44:** commission rates are not published on the site (confidentiality, competition); each client gets the commission on each suggested scheme in writing before investing. The section explains how commission works, gives the direct vs regular comparison and a ₹10 lakh example with an illustrative rate, and the complaints process. The anchor `/disclaimer/#distribution` and the per-client disclosure sentence are live | 2026-10-05 | S41 | 🟡 Open |
| 66 | **Website — high priority: design the `/investigate/` hub page.** DIY hub with two parts: the Deepdive App (snapshot, video, features, "Open the app") and the fund investigations list. `/reports/*` URLs stay. Homepage "Start investigating" links here | 2026-10-05 | S41 | ⚪ Superseded (S42 — Academy deferred; no hub. A Deepdive section on `/reports/` replaces it, in the demo) |
| 67 | **Docs — medium priority: update `docs/mfd_funnel_proposal.html` (v4)** to the four-section homepage, the new nav and the `/invest/` page, then republish the private artifact. The published copy is out of date | 2026-10-05 | S41 | ⚪ Retired (S42 — the demo and `docs/mfd_funnel_handoff.md` are the source of truth; the v4 artifact and its local file were deleted on 2026-10-05) |
| 68 | **Content — medium priority: the two Academy guides name funds as worked examples** (HDFC Flexi Cap; Parag Parikh, Nippon, ICICI, HDFC BAF). Until they are rewritten without fund names, they carry no `/invest/` link, and homepage cards use their `hook` text (the Five Questions `description` names a fund) | 2026-10-05 | S41 | 🟡 Open |
| 69 | **Compliance — low priority, ongoing: keep "empanelled with every fund house" true.** Recheck empanelment when a new AMC launches | 2026-10-05 | S41 | 🟡 Open |
| 70 | **Build — low priority: when implementing, make the `/invest/` timeline a shared UI component** (vertical below `lg`, horizontal from `lg`) and add it to `/styleguide` | 2026-10-05 | S41 | ✅ Resolved (S44 — `src/components/ui/Timeline.astro`, in `/styleguide`) |
| 71 | **Design — medium priority, later: dark hero and footer only; headings instead of pills.** Middle sections white/`fi-light` only. Changes: `/reports/` list moves out of the dark hero into a white section (needs a light `ReportCard` variant and light filter chips, active chip `fi-ink` not gold); article end card from dark to `fi-light`; `/about/` loses its two mid-page dark bands. Drop section pills; keep a plain caption only where the heading doesn't name the section (homepage Investigations, `/invest/` hero). Rewrite `style_spec.md` "Section Background Rhythm" and §5 "Section Labels (Pills)". `/styleguide` exempt | 2026-10-05 | S42 | 🟡 Open |
| 72 | **Product — later: CAS upload with a branded portfolio report.** The visitor uploads a CAS and gets an overlap, benchmark, cost and risk-fit report with our branding. Grows from the portfolio review call (demo v2). Needs secure handling of personal financial data, a privacy section, and the review-vs-advice compliance check first | 2026-10-10 | S43 | 🟡 Parked |
| 73 | **Website — later: "Three ways to invest" comparison on `/invest/`** (do it yourself · fee-only adviser (RIA) · Invest with Support: plan type, how you pay, who chooses, reviews, financial plan, best for). Answers "why pay the commission?" for ₹10L+ investors. Drafted in demo v2, removed by the owner for now. Needs a check that comparing with RIAs is acceptable in MFD promotion | 2026-10-11 | S43 | 🟡 Parked |
| 74 | **Content — decision guides under Investigations** (no named funds): lump sum or STP for a bonus, fund overlap, tax when you redeem, what to do when markets fall. They may link to `/invest/`. Publish under `/reports/` (Academy stays deferred); when the first one ships, decide on a new category, which needs both the `src/content.config.ts` enum and `categoryLabels` in `src/pages/reports.astro`. Then feature them on the homepage Investigations section. Feeds #61 | 2026-10-11 | S43 | 🟡 Open |
| 75 | **Compliance — high priority: the Deepdive snapshot shows fund names.** `public/videos/promo-desktop-poster.webp` shows the quick picks (Parag Parikh, HDFC, ICICI) on the homepage and `/reports/`. The homepage promotes the service, so it must name no fund. Options: (1, recommended) retake after the Deepdive quick picks are removed (proposal §9); (2) crop the image now | 2026-10-11 | S44 | 🟡 Open |
| 76 | **Compliance — medium priority: the header and footer "Invest" link appears on report pages.** The handoff puts Invest in the global nav, but also says no `/invest/` link on fund analyses or `/reports/`. No booking or WhatsApp link appears there. Recommendation: keep the nav link, because the rule is about links in the content; confirm | 2026-10-11 | S44 | 🟡 Open |
| 77 | **Website — low priority: delete the unused promo videos** in `public/videos/` (only `promo-desktop-poster.webp` is still used). They still deploy | 2026-10-11 | S44 | 🟡 Open |
| 78 | **Compliance — high priority: add the enquiries section to `/privacy/`** (WhatsApp kit §5, plus Zoho booking-form data). Needs the chat retention period from the owner (#60) | 2026-10-11 | S44 | 🟡 Open |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

---

### 📅 Date: 2026-10-11 | Session: S44 — Invest with Support funnel built on the site (PR 1 and PR 2)

**What was done:**
We built the funnel from the approved demo on the real site, in two commits on `feat/mfd-distribution-pathway`.
PR 1 (`2f0d0aa`) adds the distributor identity and risk warning on every page, rewrites `/about/`, and removes the false "no commission" claims.
PR 2 (`746eb04`) adds the `/invest/` page, rebuilds the homepage in four sections, changes the header to Invest · Investigations · About, and adds funnel events in PostHog.

**Why:**
Distribution is the only revenue today, and the live site still made claims that are false for a distributor.
The portfolio review call gives a busy ₹10 lakh+ investor one clear, low-effort first step.

**How:**
We used the shared components and tokens, and added a Timeline, a Deepdive snapshot band, WhatsApp link and event helpers.
We split the mixed files into PR 1 and PR 2 versions, and built each snapshot on its own (lint, build, claim search and link checks).
We checked the pages in headless Chrome at 375px and 1440px: no sideways scroll, and the mobile menu closes on tap.

**Decisions made:**
- Commission rates are not published on the site; each client gets them in writing before investing (#65 updated).
- Homepage guides are chosen by slug, not "latest". The video reel is replaced by a still snapshot (#35, #36 moot).
- Booking and WhatsApp clicks are tracked by named PostHog events, because Zoho takes no `ref` (#62).
- The project logs, `.claude/` and the AMFI circular PDF stay out of the commits.

**Pending decisions:**
- #75 fund names in the Deepdive snapshot, #76 nav Invest link on report pages, #77 unused videos, #78 privacy enquiries section; #65 disclaimer section; #62 internal-user filter; #60 WhatsApp kit and Zoho form.

---

### 📅 Date: 2026-10-11 | Session: S43 — Funnel revised for ₹10 lakh+ clients (demo v2)

**What was done:**
We reviewed the planned funnel as an outside expert for clients with ₹10 lakh to ₹1 crore.
We built `docs/mfd_copy_demo_v2.html`: a portfolio review call as the main offer, a "Who we help" section, a revised `/invest/` page and a rewritten `/about/` page.
We set up the booking route with Zoho Bookings and rewrote `docs/mfd_funnel_handoff.md` with every decision.

**Why:**
At about 150 sessions a quarter, the website cannot find these clients; referrals and outreach do, and the website must pass their trust check.
Readers of fund deepdives tend to invest on their own, so the service needs a concrete, low-effort offer for busy investors.
The live `/about/` page claimed "no commissions" and "zero conflicts of interest", which is now false.

**How:**
We compared the plan with how MFDs usually win larger clients, then iterated the demo with the owner and checked each version in headless Chrome at phone and desktop widths.
We compared booking tools (Zoho, Cal.com, Google, Microsoft, Calendly) and chose Zoho because the site email already runs on Zoho Mail.

**Decisions made:**
- Main offer: a 30-minute portfolio review call (overlap, benchmark, costs, fit to risk profile). The visitor sends no documents. A CAS upload with a branded report is for later (#72).
- Gold button: "Book a portfolio review" on the homepage hero, `/invest/` and `/about/`. WhatsApp is the secondary action.
- Homepage adds "Who we help" (too many funds, a large sum, no time); approved, copy to be reworked.
- `/about/` rewritten: new subtitle, "Our story" with the mis-selling problem and "distribution that starts with analysis", three rules (evidence before opinion, research kept apart from selling, open about pay), and two routes. No "What Changed" note.
- The owner's name appears only in the ARN identity; no founder section, photo or LinkedIn link (#29 extended).
- The "Three ways to invest" comparison table is parked (#73). Decision guides go under Investigations when written (#74).
- PR 1 ships the new `/about/` copy without service links; PR 2 adds them.

**Pending decisions:**
- #72 CAS upload report, #73 comparison table, #74 decision guides; #60 booking form setup; review-call compliance check; "Who we help" copy rework.

---

### 📅 Date: 2026-10-05 | Session: S42 — Launch scope trimmed (reconstructed from the decision table)

**What was done:**
We wired the WhatsApp number into the demo, drafted `docs/mfd_whatsapp_kit.md`, and removed the Academy and the `/investigate/` hub from the plan.
We deleted superseded funnel files and made the demo plus the handoff file the source of truth.

**Why:**
Launching needed fewer moving parts: no platform, no separate Academy, and one place for decisions.

**How:**
Demo and handoff edits; this entry was written in S43 from the S42 notes in the decision table, because S42 had no session entry.

**Decisions made:**
- Launch without a platform; Academy deferred, guides stay under Investigations; a Deepdive section on `/reports/` replaces the hub (#61, #64, #66, #67).
- Dark hero and footer only, headings instead of pills, later (#71).

**Pending decisions:**
- #60 WhatsApp kit approval and transaction route, #71 design change.

---

### 📅 Date: 2026-10-05 | Session: S41 — Homepage, nav and /invest/ page settled in the demo

**What was done:**
We simplified the homepage from six planned sections to four, and set a new four-link navigation.
We rebuilt the `/invest/` page in the copy demo: a WhatsApp-first hero, a five-step timeline, three compact "Who we are" cards, and a closing call to action.
We recorded every decision in the distribution proposal (Section 15, decisions 7–11) and in the handoff file.

**Why:**
The old pages gave the newsletter and the do-it-yourself route the most visible actions, while distribution is the only revenue today.
Copy must also meet the AMFI code of conduct: commission disclosure, fund-house disclosure, no AMC names or logos without approval, and no "free" claims.

**How:**
We applied a funnel order (service → Academy → DIY fallback) with one gold button per section and checked each version in a headless browser at phone and desktop widths.
We read the AMFI master circular (Chapter 4, clause 4) and moved detailed disclosures to a planned `/disclaimer/` section so `/invest/` stays short.
Outputs: `docs/mfd_copy_demo.html`, `docs/mfd_distribution_transition_proposal.md` (Sections 4, 5, 15), `docs/mfd_funnel_handoff.md`.

**Decisions made:**
- Homepage: Hero ("We investigate, so you can *invest.*", gold "Invest with Support") → How we help (three distribution cards and a fee line) → Academy (two guides and Subscribe) → Investigate (Deepdive snapshot, secondary button). The Sales Trap, Investigations, Deepdive video and "Why FI" sections are removed.
- Nav: Invest · Academy · Investigate · About, as four equal text links. No Subscribe or Deepdive button in the nav. Nav links say "Invest"; buttons say "Invest with Support".
- The content section is "Academy" (`/academy/`). `/investigate/` is a hub page, not a dropdown. Avoid the label "Research" because of its SEBI RA meaning.
- `/invest/`: H1 "We do the investigation. *You make the call.*" The main action is WhatsApp, with email as the fallback. The platform appears only at step 4 and as an existing-client login link. "What changed" moves to `/about/`.
- Empanelled with all AMCs, so the copy says "every fund house". Reviews happen "at regular intervals".
- Fee message: "No fee from you", always followed by the commission and expense-ratio explanation. Never "free", "zero cost" or "we don't charge anything".
- Homepage copy is approved as a first pass. A final wording check comes before the Phase 2 release.

**Pending decisions:**
- #60 WhatsApp number and platform (by 2026-10-12), #61 Academy guides, #64 delete superseded files, #65 `/disclaimer/` section, #66 `/investigate/` hub, #67 update the HTML proposal, #68 named funds in the guides, #69 AMC claim upkeep, #70 timeline component.

---

### 📅 Date: 2026-10-05 | Session: S40 — Hub funnel and homepage direction for distribution

**What was done:**
We reviewed the visitor journey for the new hub model, where distribution is the only revenue today.
We drafted a funnel proposal page with PostHog evidence, a route map, the new homepage order, hero options, and wording rules.
We added Section 15 to the distribution proposal and wrote a handoff file for the next session.

**Why:**
The old homepage served only do-it-yourself readers and argued against selling, which conflicts with the new distribution service.
Copy must also stay inside the MFD role described in the AMFI FAQ: shortlisting suitable funds, helping with transactions, and reviews, not financial planning.

**How:**
PostHog showed that reports are the main entry point (85 of 152 sessions, 91% single-page) and that traffic is the main limit.
We iterated the hero copy against the AMFI FAQ on MFD roles and the advertising rules.
Outputs: `docs/mfd_funnel_proposal.html` (published privately, v4), `docs/mfd_distribution_transition_proposal.md` Section 15, `docs/mfd_funnel_handoff.md`.

**Decisions made:**
- Distribution is the main focus; the hero has one button, "Invest with Support", which links to `/invest/`.
- No disclosure line in the hero; the footer and `/invest/` carry disclosures.
- WhatsApp is the contact channel; the platform link becomes step 2, so Phase 2 no longer waits for a platform choice.
- The content section is "Learn" (`/learn/`); nav order is Learn → Investigate → Invest with Support.
- The homepage shows Learn article cards only, with no named-fund metrics.
- The ARN is SIF-enabled; check SIF promotion rules before SIFs appear in copy.
- Hero subtitle: "Investing is complex, and often emotional. Our analysis brings clarity, our support keeps you on course, and our transparency earns your trust."

**Pending decisions:**
- #58 hero headline, #59 section 2, #60 WhatsApp setup, #61 Learn articles, #62 PostHog events, #63 copy demo update, #64 delete superseded files.

---

### 📅 Date: 2026-10-03 | Session: S39 — Design consistency work queue

**What was done:**
Added three design tasks to the work queue after the branch review.
The tasks cover design references, repeated cards, and visible keyboard focus.
Parked the automated accessibility scan under #54.

**Why:**
The branch improves shared colours and action styles, but some design references and repeated page styles still differ.
The owner prefers practical design fixes and simple checks.

**How:**
Each task has a priority, a defined scope, and a completion check.
For implementation, run the existing design check and production build.
Use focused mobile, desktop, and keyboard checks where relevant.

**Decisions made:**
- Queue #55 and #57 first, then #56.
- Keep existing automated checks; defer extensive rule testing and new accessibility test tools.
- Reuse components and existing dependencies. These tasks require no new paid service.

**Pending decisions:**
- None added. The tasks are queued for implementation.

---

### 📅 Date: 2026-10-03 | Session: S38 — Credibility strip removed from the homepage

**What was done:**
Removed the credibility strip below the homepage hero and rebalanced the `lg` Hero's bottom padding,
which had been tightened only because the strip followed it. The `CredibilityStrip` component stays
in `src/components/ui/` and on `/styleguide`, marked as currently unused.

**Why:**
Neither marker set held up. The original claims ("Data-backed", "Reproducible") were unverifiable;
the S37 replacement facts were auto-updating but weak — "4 investigations" signals a small, new site
and "Updated Aug 2026" says nothing about rigour. The hero subhead already carries the positioning.

**Decisions made:**
- Bring the strip back only with markers that are specific, true of every investigation, and linked
  to proof (candidate set: TRI benchmarks · published five-check method · no commissions, no fund
  picks). An investigation count returns only once it is large enough to help.
- Method/independence points may work better in context (e.g. under the Investigations heading)
  than as a strip — separate decision.

**Pending decisions:**
- None.

---

### 📅 Date: 2026-10-03 | Session: S37 — Design-system contrast, gold discipline, and enforcement

**What was done:**
Ran a design review of the live site and fixed its findings on branch
`design/contrast-and-accent-fixes`. Tokens: `fi-light` slate-200 → slate-100; `fi-muted` and
`fi-neutral` slate-500 → slate-600; new `fi-link` (amber-700) for the gold family on light surfaces;
`fi-positive`/`fi-negative` darkened to 700s; layout tokens replacing every arbitrary value.
Components: `Button` gained a `surface` prop with a neutral secondary (the `outline` variant was
folded into it); Badge lost its raw-palette variants; ReportCard labels moved from 10px/50% opacity to
`text-caption` in `fi-subtle`; a shared `formatDate()` (en-IN, UTC) replaced four ad-hoc formatters.
Homepage: investigations lead the hero and sit directly after The Sales Trap; the credibility strip
now states facts derived from content; Why FI and subscribe merged into one light section. Added
`npm run lint:design` (design lint + WCAG contrast check) and a Design Checks CI workflow.

**Why:**
Muted copy on light sections was 3.9:1 (below WCAG AA), card labels were ~3.5:1 at 10px, gold was used
for primary, secondary, nav and link treatments so it no longer signalled the main action, and dates
used three formats including US style. `CLAUDE.md` already banned arbitrary values, yet `text-[10px]`
shipped — written rules alone were not holding, so the fixes were encoded in tokens, components, and CI.

**How:**
Audited every token usage against its surface before changing values (`fi-muted` on the dark footer
would have dropped to 2.6:1, so footer headings moved to `fi-subtle`). Verified with the production
build, full-page headless screenshots at desktop and mobile widths, and by confirming both new checks
exit non-zero on planted violations. On first run the checks caught three issues the manual audit
missed (two raw palette classes, `fi-neutral` at 4.3:1 on `fi-light`).

**Decisions made:**
- Keep the dark theme; a light-mode migration was considered and rejected as low value for the cost.
- Gold is reserved for one primary action per section and is never used as text on light surfaces.
- Enforcement lives in code (tokens, components, lint, CI); docs explain the rules.

**Pending decisions:**
- #52, #53, #54.

---

### 📅 Date: 2026-08-21 | Session: S36 — Homepage CTA hierarchy simplified

**What was done:**
Reduced the homepage hero from three calls to action to two: investigate a fund in Deepdive or
browse published investigations. Moved the methodology-guide route into the Deepdive showcase as a
secondary action and renamed it “See the Five-Question Method” to match the article’s current title.
The existing revised hero description was preserved.

**Why:**
The hero was asking visitors to choose among three overlapping routes before the page had explained
the product. The guide works better beside the Deepdive demonstration, where it offers a clear choice
between using the tool immediately and first learning the investigation method.

**How:**
Removed the tertiary text link from the hero and used the existing typed Button component for a
responsive primary/secondary CTA pair in the Deepdive section. Verified the change with the full
Astro production build and its H1, internal-link, image-alt, metadata-length, and metadata-uniqueness
checks.

**Decisions made:**
- Keep two destination choices in the hero: Deepdive and the investigation archive.
- Surface the methodology guide only in the Deepdive section, avoiding duplicate promotion in the
  Investigations section.
- Use concise CTA copy rather than the article’s full title.

**Pending decisions:**
- None.

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
