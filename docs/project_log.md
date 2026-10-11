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
- Archived sessions (S1–S44) and resolved/moot pending decisions: `docs/project_log_archive.md`

---

## 🧭 Agent Verdicts

### 2026-10-11 (after S45, at compaction)

- **What we achieved:** Turned the site into a two-route hub. The distributor identity and risk warning
  are on every page, false "no commission" claims are gone, `/invest/` is built, the homepage copy is
  final, and the funnel events reach PostHog (`2f0d0aa`, `746eb04`, `bb7cff8`).
- **What worked well:** Approving the demo before the build, then agreeing the copy one item at a time,
  kept rework low. Written compliance rules in the handoff stopped risky wording early ("free",
  "avoid conflict", direct vs regular). Lint, build and headless checks at 375px and 1440px caught
  layout problems before the owner saw them.
- **What needs to improve:** `feat/mfd-distribution-pathway` is not pushed after S44 and S45, so nothing
  of the funnel is live. Three compliance items still block release (#65, #75, #78). The handoff
  status line went out of date, and the log grew past 10 sessions before compaction.
- **What to focus on next:** Close #65, #78 and #75, then push, open the PR and merge. In parallel, the
  owner finishes #60 (WhatsApp kit, Zoho form). After launch, traffic is the main limit: decision
  guides (#74, #61) and the internal-user filter (#62) to read the funnel data correctly.

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
| 22 | Hero fund-search console — replace the primary CTA with a live fund lookup that deep-links into Deepdive (design agreed, build parked) | 2026-07-12 | S10 | 🟡 Parked |
| 23 | Add `?fund=<scheme_code>` deep-link support to the Deepdive app — prerequisite for #22, and useful on its own for linking a report to the fund it investigates | 2026-07-12 | S10 | 🟡 Parked |
| 29 | Author in the structured data is the Organization, not a named person — a personal byline is deferred until SEBI Research Analyst certification. Revisit once certified (`authorRef()` in `src/lib/schema.ts` is isolated so the swap is one line, but it needs a visible byline alongside it). **S43:** extended to distribution pages: the name appears only in the ARN identity (footer, `/invest/` registration card); no founder profile or photo | 2026-07-14 | S12; updated S43 | 🟡 Parked |
| 31 | **Launch the Substack Five Checks series as individual investigations of popular funds.** The intended reader already owns or is considering the named fund. Select funds for popularity and prospect relevance, then report whatever the five checks show; include a popular fund with weaker or mixed evidence early to establish editorial independence. Do not add fund comparisons or suitability conclusions until an explicit individual risk-profile layer and its editorial boundaries exist | 2026-07-21 | S19 | 🟢 Approved; editorial strategy documented |
| 32 | **Article footer and discovery enhancements — curated related investigations, sharing controls, and filed-under tags.** For related content, show up to two manually selected current reports after an article's conclusion, reject archived destinations, and keep historical reports limited to their successor notice. If sharing is added, keep it restrained and audience-relevant (Copy link, WhatsApp, LinkedIn). If tags are exposed, use a quiet footer row rather than a second navigation rail. These remain separate decisions after the article navigation and metadata work; do not add them by default | 2026-07-22; expanded 2026-08-08 | S20; S34 | 🟡 Parked |
| 41 | Extend `/styleguide` to visually cover page-composition patterns it currently doesn't show: Navigation, Footer, Background Accents (the hero/Why-FI radial gradient), and Section Labels. **Updated:** Deepdive App Mockup and Email Input dropped from this list — both describe UI that no longer exists; moved into `style_spec.md`'s "What Was Deliberately Excluded" log instead. Navigation, Footer, and Section Spacing had also drifted from the live implementation — `style_spec.md` now points at the owning component file instead of restating values. Building live `/styleguide` sections for Nav/Footer/Background Accents is still real UI/Astro work, not a doc edit — separate session | 2026-08-03 | S24 | 🟡 Open |
| 51 | **Optional, low-priority cosmetic follow-up from #50**: the "JS Snippet installation" Web Analytics site's host allowlist (`(fund-investigator.pages.dev\|fundinvestigator.com)$`) doesn't cover preview-branch subdomains like `dev.fund-investigator.pages.dev`, so its beacon 404s there — browser console noise only on preview deploys, does not affect production. Widening the host pattern would fix it, but doing this via the API hits the same wall discovered in #50: the connected Cloudflare API token can read Pages/Web-Analytics config but cannot write it (confirmed via the failed `PATCH` in #50) — would need either a manual dashboard edit or a token-permission upgrade (Account → Cloudflare Pages → Edit) first | 2026-08-07 | S31 | 🟡 Open |
| 54 | Add a rendered-page accessibility scan (axe or pa11y against `dist/`) to CI. Existing checks cannot detect every rendered colour combination. Defer this task because the owner prefers simple checks over extensive rule testing | 2026-10-03 | S37; updated S39 | 🟡 Parked |
| 55 | **Design — high priority: align the design references.** Update `docs/style_spec.md` card descriptions to match the shared components and current homepage. Check colours, padding, corners, and hover styles. Prefer references to component props over repeated numeric specifications. Keep existing `/styleguide` examples consistent. Complete when the references agree with the website. Page-composition examples remain separate under #41 | 2026-10-03 | S39 | 🟢 Queued |
| 56 | **Design — medium priority: share repeated homepage cards and responsive patterns.** Move repeated problem and analytical cards from `src/pages/index.astro` into shared components. Extend `Card.astro` with a dark variant if that keeps the implementation simple. Use shared typography presets where they fit. Move repeated card layout and spacing rules into their owning components. Complete after mobile and desktop checks show consistent cards without layout changes | 2026-10-03 | S39 | 🟢 Queued |
| 57 | **Design — high priority: use consistent, visible focus styles.** Replace half-opacity focus rings in Input, SearchInput, and LoginForm with the approved full-opacity colour. Check error and normal states. Confirm shared Button focus styles on light and dark surfaces. Complete after a keyboard check confirms visible focus across these controls | 2026-10-03 | S39 | 🟢 Queued |
| 60 | **Distribution — high priority: set up the WhatsApp business number** (WhatsApp Business app, profile with name/ARN/risk warning, greeting with commission note, `wa.me` link with source code). Blocks Phase 2. **S41:** owner sets the number and confirms the platform by 2026-10-12. **S42:** number is +91 96250 26859, wired into the demo. Launch without a platform: step 4 names none, the existing-client login line is dropped. Texts drafted in `docs/mfd_whatsapp_kit.md`; owner to approve, confirm reply time and email, and choose the transaction route before replying to enquiries. **S43:** booking is the first contact route (Zoho Bookings, free plan, link in the handoff); WhatsApp is second. Owner to set the booking form (30 min, holdings-range question, minimum fields, reminders) | 2026-10-05 | S40; updated S41, S42, S43 | 🟡 Open |
| 61 | **Content — high priority: write Academy guides** (was "Learn"; no named funds). The homepage launches with the two existing guides; more guides are needed before release, and they are the main traffic lever | 2026-10-05 | S40; updated S41 | 🟡 Open (S42 — Academy deferred: new guides live under Investigations; revisit a separate Academy at ~8–10 guides) |
| 62 | **Analytics — medium priority: add PostHog funnel events** (`route_choice`, `invest_view`, `conversation_request` with channel, `platform_click`, `deepdive_click`, `subscribe_click`) and an internal-user filter. **S43:** add `review_booking_click` with placement; drop `platform_click` until a platform exists **S44:** built: `invest_view`, `review_booking_click`, `conversation_request` (channel), `deepdive_click`, `subscribe_click`, each with a placement, sent from data attributes by one listener in `Layout.astro`. Left: the internal-user filter in PostHog (a project setting) | 2026-10-05 | S40; updated S43 | 🟡 Open (S44 — events built; internal-user filter left) |
| 65 | **Compliance — high priority: draft the distribution section of `/disclaimer/`.** It holds the detail moved off `/invest/`: commission rates by scheme (AMFI code 4(c)), the direct vs regular table, the ₹10 lakh cost example, and the complaints process. `/invest/` links to it once ("Full disclosures") **S44:** commission rates are not published on the site (confidentiality, competition); each client gets the commission on each suggested scheme in writing before investing. The section explains how commission works, gives the direct vs regular comparison and a ₹10 lakh example with an illustrative rate, and the complaints process. The anchor `/disclaimer/#distribution` and the per-client disclosure sentence are live | 2026-10-05 | S41 | 🟡 Open |
| 68 | **Content — medium priority: the two Academy guides name funds as worked examples** (HDFC Flexi Cap; Parag Parikh, Nippon, ICICI, HDFC BAF). Until they are rewritten without fund names, they carry no `/invest/` link, and homepage cards use their `hook` text (the Five Questions `description` names a fund) | 2026-10-05 | S41 | 🟡 Open |
| 69 | **Compliance — low priority, ongoing: keep "empanelled with every fund house" true.** Recheck empanelment when a new AMC launches | 2026-10-05 | S41 | 🟡 Open |
| 71 | **Design — medium priority, later: dark hero and footer only; headings instead of pills.** Middle sections white/`fi-light` only. Changes: `/reports/` list moves out of the dark hero into a white section (needs a light `ReportCard` variant and light filter chips, active chip `fi-ink` not gold); article end card from dark to `fi-light`; `/about/` loses its two mid-page dark bands. Drop section pills; keep a plain caption only where the heading doesn't name the section (homepage Investigations, `/invest/` hero). Rewrite `style_spec.md` "Section Background Rhythm" and §5 "Section Labels (Pills)". `/styleguide` exempt | 2026-10-05 | S42 | 🟡 Open |
| 72 | **Product — later: CAS upload with a branded portfolio report.** The visitor uploads a CAS and gets an overlap, benchmark, cost and risk-fit report with our branding. Grows from the portfolio review call (demo v2). Needs secure handling of personal financial data, a privacy section, and the review-vs-advice compliance check first | 2026-10-10 | S43 | 🟡 Parked |
| 73 | **Website — later: "Three ways to invest" comparison on `/invest/`** (do it yourself · fee-only adviser (RIA) · Invest with Support: plan type, how you pay, who chooses, reviews, financial plan, best for). Answers "why pay the commission?" for ₹10L+ investors. Drafted in demo v2, removed by the owner for now. Needs a check that comparing with RIAs is acceptable in MFD promotion | 2026-10-11 | S43 | 🟡 Parked |
| 74 | **Content — decision guides under Investigations** (no named funds): lump sum or STP for a bonus, fund overlap, tax when you redeem, what to do when markets fall. They may link to `/invest/`. Publish under `/reports/` (Academy stays deferred); when the first one ships, decide on a new category, which needs both the `src/content.config.ts` enum and `categoryLabels` in `src/pages/reports.astro`. Then feature them on the homepage Investigations section. Feeds #61 | 2026-10-11 | S43 | 🟡 Open |
| 75 | **Compliance — high priority: the Deepdive snapshot shows fund names.** `public/videos/promo-desktop-poster.webp` shows the quick picks (Parag Parikh, HDFC, ICICI) on the homepage and `/reports/`. The homepage promotes the service, so it must name no fund. Options: (1, recommended) retake after the Deepdive quick picks are removed (proposal §9); (2) crop the image now | 2026-10-11 | S44 | 🟡 Open |
| 76 | **Compliance — medium priority: the header and footer "Invest" link appears on report pages.** The handoff puts Invest in the global nav, but also says no `/invest/` link on fund analyses or `/reports/`. No booking or WhatsApp link appears there. Recommendation: keep the nav link, because the rule is about links in the content; confirm | 2026-10-11 | S44 | 🟡 Open |
| 77 | **Website — low priority: delete the unused promo videos** in `public/videos/` (only `promo-desktop-poster.webp` is still used). They still deploy | 2026-10-11 | S44 | 🟡 Open |
| 78 | **Compliance — high priority: add the enquiries section to `/privacy/`** (WhatsApp kit §5, plus Zoho booking-form data). Needs the chat retention period from the owner (#60) | 2026-10-11 | S44 | 🟡 Open |
| 79 | **SEO — medium priority: update `HOME_DESCRIPTION`** to the new homepage message. Proposed: "Mutual fund investigations, and a portfolio review with an AMFI-registered Mutual Fund Distributor. See risks and costs before you invest." | 2026-10-11 | S45 | 🟡 Open |
| 80 | **Compliance — medium priority: check `/about/` and `/disclaimer/` for the general "regular plans cost more than direct plans" wording.** It is not always true across funds (one fund's direct plan can cost more than another fund's regular plan). As an MFD we say only that our commission is built into the regular plan's expense ratio | 2026-10-11 | S45 | 🟡 Open |
| 82 | **Copy — medium priority: approve the draft short copy.** The six one-line homepage card texts and the "Clear picture" lead-in on `/invest/#who` were drafted by Claude from the finalised long copy (`src/lib/who-we-help.ts`) | 2026-10-11 | S46 | 🟡 Open |
| 83 | **Compliance — medium priority: confirm the homepage sample brief.** `SampleBrief` shows illustrative values (41% overlap, 2 of 5 lag benchmark, 1.6% average expense ratio, mix 82/14/4 → 65/28/7), labelled "Sample", with no fund names and no returns. Check it against the MF advertisement rules; swap in values from a real anonymised brief once one exists | 2026-10-11 | S46 | 🟡 Open |
| 84 | **Design — medium priority: #71 versus the S46 homepage.** S46 added one mid-page dark band ("How we are paid") by owner choice, which differs from #71 ("dark hero and footer only"). Decide whether #71 still applies to `/reports/`, `/about/` and the article end card, and whether the other pages drop their labels like the homepage | 2026-10-11 | S46 | 🟡 Open |
| 85 | **Website — low priority: `ReportCard` footer.** Left-aligned "Read investigation →" link instead of the centred, letter-spaced caption. Site-wide (also `/reports/`), so held back from the homepage-only S46 | 2026-10-11 | S46 | 🟡 Open |
| 86 | **Website — low priority: header and content alignment.** At wide screens the header logo sits 40px right of the section content (the header pads inside `max-w-7xl`, `Section` pads outside it). Existed before S46 | 2026-10-11 | S46 | 🟡 Open |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

---

### 📅 Date: 2026-10-11 | Session: S46 — Homepage redesign: sample brief, problem → answer cards, subtle motion

**What was done:**
We redesigned the homepage after an interactive demo (`claude.ai/artifact/Sfej4r5AwHbhh9JjiursbE`). The hero now shows a sample portfolio-review brief next to the headline. "Who we help" and "How we help" became three problem → answer card pairs under one heading, with short copy. "How we are paid" moved into its own dark band, and all section labels (pills) are gone.
The finalised long copy for the six cards moved to a new "Who we help" section on `/invest/#who`, so none of it was lost. Sections now fade in as the visitor scrolls, and pages cross-fade, with report titles moving from the card into the article.

**Why:**
The old page repeated each idea three times (label, heading, card) and read as one long light block, which made it hard to scan. The sample brief shows a visitor what the review call gives them, which supports the booking. The owner wanted the deliberated copy kept for visitors who want the detail.

**How:**
Two new components, `ProblemAnswer` (short and long versions from one copy file, `src/lib/who-we-help.ts`) and `SampleBrief`, plus new tokens (`grid-cols-fi-pair`, `grid-cols-fi-hero`, `animate-fi-rise`). The reveal script and `@view-transition` live in `Layout.astro`, and both switch off under reduced motion. Lint, contrast (24 pairs) and build (15 pages) pass. Headless checks at 1440, 1280, 1100 and 390px show no sideways scroll.

**Decisions made:**
- No section labels on the homepage; headings carry the meaning. Numbered "case file" labels were rejected because the sections are not a sequence.
- The hero shows a sample brief, not a fund chart. It names no fund, shows no returns, and shows costs as a percentage. Clients get a brief like this after the review.
- Homepage heading: "Clearer choices. Less clutter. More confidence." Rejected: "Why Fund Investigator?" (a label in a big font, and it clashes with the `/about/` link).
- Motion level: Subtle (reveal on scroll + page transitions). No parallax, counters or carousels.
- The full two-line heading and long card copy live on `/invest/#who`; the homepage links there with "How support works →".

**Pending decisions:**
- #82 approve the draft short copy, #83 sample brief compliance check, #84 #71 versus the new dark band, #85 `ReportCard` footer, #86 header alignment. Still open: #65, #75, #78, #79, #80.

---

### 📅 Date: 2026-10-11 | Session: S45 — Homepage copy finalised and the funnel trimmed

**What was done:**
We wrote the final homepage copy for three blocks: Who we help, How we help and How we are paid. Each block has three items, and each "How we help" card answers the problem above it.
The "How we are paid" block now asks for the booking, offers WhatsApp as a second action, and shows the ARN line.
The Investigations block lost its intro paragraph and Subscribe card; one "Get new guides by email" button replaces them.
The homepage hero now has the same height as the `/invest/` hero, and the `/about/` hero opens with "Because you deserve investments backed by analysis, that improve your portfolio."

**Why:**
Visitors at the end of the page ask "what do I pay?", so the answer and the booking button sit together.
The old "Why Fund Investigator" block said "Not mis-selling that increases someone else's commission", which does not fit a distributor that earns commission.
A shorter page keeps the route to the booking clear.

**How:**
We agreed the copy one item at a time, then applied it with the shared components and a new `xl` hero size.
Lint and build pass (15 pages). Headless Chrome checks at 375px and 1440px show no sideways scroll; the phone page is 6,309px before the hero change (was 6,463px).

**Decisions made:**
- "No fee from you" becomes "No separate fee from you", always with the commission explained in the same place (also on `/invest/`).
- Do not compare direct and regular plan costs on promotion pages; say only that our commission is built into the regular plan's expense ratio.
- Do not restore the "Why Fund Investigator" block; add a "Why Fund Investigator exists →" link to `/about/` under the How we help cards (#13 moot). Badge stays "How we help".
- Scroll depth comes from PostHog's default `$pageleave` event; no new code.

**Pending decisions:**
- #79 `HOME_DESCRIPTION`, #80 direct-plan wording on `/about/` and `/disclaimer/`, #81 commit S45. Still open: #65, #75, #76, #77, #78, #62.

---
