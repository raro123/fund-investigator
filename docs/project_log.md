# Project Log

## Project Objective

Build a fast, content-led financial advisory brand platform for Fund Investigator with a simple static hub and a clear path to specialized analytical apps.

The project prioritizes low operational complexity, budget-conscious tooling, maintainable static-site delivery, and a solo-dev-friendly workflow.

The current product target is a Cloudflare Pages-hosted Astro site that publishes investigations, explains the Fund Investigator approach, links to the Deepdive app, and captures email subscribers for future investigation and tool updates.

## Important Links

- Fund Investigator production site: https://fundinvestigator.com
- Deepdive app: https://deepdive.fundinvestigator.com
- MailerLite developer docs: https://developers.mailerlite.com/docs
- Astro docs: https://docs.astro.build
- Cloudflare Pages Functions docs: https://developers.cloudflare.com/pages/functions/
- Project foundation config: `package.json`
- Design tokens: `tailwind.config.mjs`
- Content guide: `docs/CONTENT-GUIDE.md`
- Deployment notes: `docs/DEPLOYMENT.md`
- Project log: `docs/project_log.md`

---

## 2026-07-11 — Reports page category filter redesigned as scrolling pills

### Planned

- Fix the category filter on the reports page: the underline tabs exposed a raw native
  scrollbar and, on overflow, hid extra tabs with no cue that more existed.
- Do the work on a dedicated branch and review in the browser before merging.

### Implemented

- **Filter redesigned as horizontally-scrolling pill chips** (YouTube-style): single row,
  hidden scrollbar, and a soft right-edge fade that signals "there's more here" without a
  raw scrollbar. Active pill is gold-filled; the results count was removed.
- **Categories now derive from published reports** instead of a hardcoded list — a
  category pill only appears if a report actually uses it, so no more dead pills that
  lead to an empty state. Custom labels/order are preserved via a value→label map.
- **Filter strip hides entirely when only one category exists** (the current state, since
  both live reports are "Fund Analysis"), so we don't show a filter with nothing to choose.
- **Added a reusable `scrollbar-hide` utility** to the Tailwind config and drove the active
  pill state via a single `data-active` attribute, removing duplicated class strings.
- **Shipped alongside:** a new `/llms.txt` endpoint (site manifest for AI crawlers) and
  trailing-slash normalisation on internal links (homepage + llms.txt).

### Decisions Taken

- **Kept the page title "The Investigation Archive"** (rejected "Investigation Hub"):
  "Archive" fits the investigator persona and "Hub" is generic and collides with our
  own hub/spoke architecture vocabulary.
- **Chose horizontal-scroll pills over a wrap or dropdown pattern.** Handful of categories
  today growing modestly — scrolling pills fix the bug without eating vertical space.
  Revisit the wrap/dropdown pattern only if categories reach ~8+.

### Decisions Pending

- None.

---

## 2026-06-22 (cont.) — Email section copy finalised; Option C parked

### Planned

- Decide on the email capture section framing: method walkthrough (branch), simple notifications (main-style), or personalised fund suggestion.

### Implemented

- **Email section updated to Option B.** Headline changed to "New Investigation Published? We'll Tell You." with a single-line subhead and "Notify Me" button. Removes the welcome kit and method-walkthrough angle; positions the list as a clean notification subscription.

### Decisions Taken

- **Option B chosen for email capture.** Simple, honest value exchange — subscriber gets notified when a new investigation goes live. No overpromise, no deliverable to maintain.
- **Option C parked (not discarded).** The "Suggest a Fund" model: collect email + a fund name the visitor wants investigated; frame as "you choose the next investigation" (not "get a custom report"). Crowdsources the research queue, creates strong personalization signal, differentiates the capture form. Deferred because each submission creates a manual fulfilment commitment — revisit once publish cadence is established or as a paid/waitlist tier.

### Decisions Pending

- Option C revisit trigger: once a regular publish cadence exists, or when a paid custom investigation tier is being designed.

---

## 2026-06-22 (impl.) — Homepage restructure implemented

### Planned

- Execute the homepage changes agreed in the funnel/strategy session, one step at a time.
- Align section order with the Acquire → Activate → Nurture funnel and keep copy plain for the
  primary mid-investor audience.

### Implemented

- **Deepdive lens cards — plain language.** Removed jargon (Sharpe, Sortino, benchmark
  correlation, drawdown, rolling) from the three answer lines; kept the question headings.
  Copy refined collaboratively (now "your fund" framing throughout).
- **Section reorder.** Moved the Deepdive tool section above Investigations so the free tool is
  the immediate resolution to the Problem section (activation-led). Swapped section backgrounds to
  keep the dark/light rhythm: Hero(dark) → Problem(light) → Deepdive(dark) → Investigations(light)
  → About(dark) → Email(light).
- **Deepdive cards restyled as dark tiles.** White cards glared on the now-dark section; switched
  to `bg-fi-mid` + `border-fi-border-dark`, inverted text, `bg-fi-dark` icon chips with gold icons.
  Video frame given `border-fi-border-dark` + `shadow-fi-card-dark` so the light app screenshot
  reads as the deliberate focal point.
- **Hero trust strip.** Added `Independent · No commissions · Evidence-based` below the CTAs.
  Deliberately dropped any "free" wording (see Decisions).
- **Hero verdict card ("From our investigations").** Added a qualitative case-file card for the
  HDFC Flexi Cap investigation — three directional findings (beat benchmark / positive every year
  / steadier than market) + "Read the full investigation →" link. No figures (see Decisions).
  Removed the dead `TearsheetMockup` import.
- **Removed `mockups/`** (hero-proposal, homepage-proposal, homepage-hybrid) — superseded by the
  live implementation.
- Verified with `npm run build` after each structural change. Committed as `4b2784c` (docs) and
  `f2fce51` (feat: restructure homepage).

### Decisions Taken

- **No "free" framing in the hero.** Access stays open, but advertising "free" attracts
  price-insensitive users who won't pay — wrong anchor for the paid-research goal. Use a rigor
  signal ("Evidence-based") instead.
- **Verdict card is qualitative, not numeric.** Hard figures go stale (confirmed: the report's
  CAGR 25.0% / 2021–2025 vs the live app's 19.0% / Jun'21–Jun'26 — a ~6pp drift in months from the
  recent down market). Qualitative directional findings describe a dated published investigation and
  don't expire; the numbers + methodology live in the report the card links to.
- **Verdict card sourced from Investigations (option "C"), not the app.** The app shows metrics but
  never concludes, so an app-style card would over-promise against the "Investigate Your Fund" CTA.
  Reports already conclude, so the card uses real published output and feeds the reports funnel.
- **Rejected using a raw app screenshot in the hero** — it is jargon-heavy (IRR/CAGR/Sharpe/vs BM),
  has no verdict, bakes staleness into an image, and duplicates the existing Deepdive showcase video.
- Deepdive lens-card icons use `text-fi-gold` (accent on the dark activation section).

### Decisions Pending

- **App verdict layer ("B soon"):** add a plain conclusion to Fund Deepdive so the
  "Investigate Your Fund" path delivers its own verdict; then a screenshot of *that* could replace
  or complement the hero case-file card.
- **App branding (decided; to implement in the Deepdive/Streamlit repo):** rebrand the app header
  from "Fund Investigator" to **"Deepdive by Fund Investigator"** (endorsed-brand model). Lead with
  the **Deepdive** wordmark (large, primary) + the eye logo; "by Fund Investigator" sits beneath,
  small and muted. Keep "Fund Deepdive" / "Category Deepdive" as internal mode names. Rationale:
  Fund Investigator is the umbrella/authority brand (what gets monetized), Deepdive is one product
  under it; "by" scales to future tools and beats the clunky possessive ("Fund Investigator's
  Deepdive"); also fixes the site→app naming disconnect (site says "Deepdive", app currently says
  "Fund Investigator"). Stacked layout on desktop, inline `(◉) Deepdive · by Fund Investigator`
  if vertical space is tight.
- Whether to drive the hero card dynamically from the featured report (single source of truth) once
  plain-labelled metrics exist in frontmatter — deferred; kept curated/qualitative for now.
- Monetization/pricing, SEBI Research Analyst implications, paid-tier hosting (carried over).

### Notes

- All changes scoped to `src/pages/index.astro`. Hero copy lock from the prior session was also
  committed as part of `f2fce51`. See [[business-goal]] memory.

---

## 2026-06-22 (cont.) — Funnel strategy, hero copy lock, Deepdive tool assessment

### Planned

- Define the business model / funnel before doing more homepage layout (business model should set layout, not the reverse).
- Finalise the hero copy for the redesign.
- Assess whether the live Deepdive tool fits the chosen audience.

### Implemented

- **Hero copy locked** (for a later fresh implementation session in `src/pages/index.astro`, Hero ~lines 46–74):
  - H1: **"Fund Performance, Investigated"**
  - Sub-head: *"Your SIP returns rarely match the fund's headline number. We help you look past it and judge whether a fund beat a fair benchmark, stayed consistent, and was worth the risk."*
  - Make **"Investigate Your Fund" the primary CTA** (swap so "Browse/Read Investigations" is secondary).
  - Add a **trust strip** below CTAs: `Independent · No commissions · Free to read`.
  - Decided NOT to add a line narrating the buttons ("use our app or read investigations") — redundant with the CTAs.
- **Funnel / monetization model worked out** (see Decisions).
- **Assessed the live Deepdive Streamlit app** via screenshots (couldn't inspect code — separate Railway spoke). Findings:
  - Entry screen (two paths: Category Deepdive, Fund Deepdive) is a clean playground front door; mostly plain language.
  - **Fund Deepdive** is closer to mid-investor-ready than expected: `vs BM` deltas with red/green arrows, `?` tooltips, intuitive SIP-growth chart.
  - **Category Deepdive is the expert wall**: bar charts with error bars across 12 categories + spaghetti plots. Analyst-grade — good for the Pro/advisor tier and paid reports, wrong as a mid-investor entry.
  - **Critical gap: the tool displays metrics but never concludes.** No plain-language verdict. The mid investor reaches the result and still can't tell if the fund is good. Example seen: ABSL Large & Mid Cap returned 9.7% vs 11.1% benchmark with worse drawdown (−28% vs −19%) — data clearly says "underperformed its risk", but the user must synthesise it.

### Decisions Taken

- **Audience confirmed:** primary = the **mid investor** (invested in MFs via SIPs, has money, not a finance expert — e.g. mid-level managers, young employees; confused in down markets, lost amid conflicting opinions). Secondary = financially-savvy/DIY investors (already have tools; FI complements their stack; good-to-have, not the early payer).
- **Challenge accepted / nuance added:** "helped most ≠ pays most." Retail WTP for research is structurally low (free alternatives), they can't easily value rigor, and their need is episodic (spikes in drawdowns). So decouple "primary audience" from "first paid product."
- **Two monetization motions, sequenced:**
  1. **Freemium app utility (first paid bet, mid investor):** premium features that sell *ongoing peace of mind* — portfolio tracking, alerts when a fund's risk/consistency shifts, unlimited comparisons, deeper tear-sheets. Recurring, low-ticket, sells reassurance NOT advice (stays clear of SEBI RA / no-recommendation positioning).
  2. **Paid research reports (credibility + higher-value, personalised):** aimed at savvy DIY + advisors/white-label, who have real WTP and recurring/professional/budgeted need. Establishes authority.
- **Funnel:** Acquire (free investigations + free tool + down-market hooks) → Activate (run fund → plain verdict → email capture) → Nurture (plain-English email, especially during volatility — converts episodic pain into a recurring relationship) → Monetize (freemium utility; reports as parallel higher-WTP line).
- **Tool direction (when app work resumes):** add a **verdict layer** to Fund Deepdive (plain conclusion first, metrics below — data already computed, low effort/high leverage); **lead with Fund Deepdive over Category**; homepage "Investigate Your Fund" CTA should land on Fund Deepdive; **plain-language the labels / replace `vs BM`** with "vs its benchmark" (keep `?` tooltips); **reposition Category Deepdive as a "Pro / Analyst view"** feeding paid reports.

### Decisions Pending

- First paid product confirmed as freemium app utility — but exact premium feature set + price point (and hosting/billing approach) still open.
- Whether/when to actively pursue the advisor/white-label B2B line.
- SEBI Research Analyst implications of charging for research — frame as education/analysis, not buy/sell calls; verify if RA registration applies before taking money.
- Hosted paid tier (Substack/Ghost/Beehiiv/MailerLite paid) vs custom — keep infra near-zero until demand is proven.

### Notes

- Strategy + copy + assessment only — no code changes this session. Hero copy and tool changes are captured here for fresh implementation sessions. See [[business-goal]] memory for the authority→paid-research goal.

---

## 2026-06-22

### Planned

- Get an outside-in critique of the homepage: what works, what doesn't, and how a prospective user would react.
- Explore homepage layout improvements without touching the live Astro site.
- Decide who the homepage should primarily speak to before committing to a redesign.

### Implemented

- Reviewed the live homepage and produced a UX/conversion critique (CTA hierarchy, missing trust signals, narrative order, unused TearsheetMockup import).
- Built standalone HTML mockups (no impact on the live site) under `mockups/`, served locally for visual review:
  - `mockups/hero-proposal.html` — hero before/after (CTA swap, trust strip, tearsheet glimpse).
  - `mockups/homepage-proposal.html` — full homepage redesign with a "change notes" toggle (reordered sections, problem section trimmed to 2 cards + bridge, Deepdive tool moved up).
  - `mockups/homepage-hybrid.html` — hybrid version tuned for the chosen audience, combining the narrative hook + voice with Codex's polish (asymmetric hero, serif headline, persistent header CTA, compliance line, plain-language verdict card).
- Compared our proposal against an alternate full-page redesign suggested by Codex; noted what Codex did better (asymmetric data-panel hero, header CTA, metric badges on report cards, compliance touches) and where it regressed (dropped the problem hook, blander voice, 5-card grid).

### Decisions Taken

- Primary homepage audience = the **aware investor who needs hand-holding** (has SIPs/funds, knows basic terms but not risk metrics). Page should explain every metric in plain language and deliver a clear verdict, not act as a raw dashboard.
- Preferred direction is the **hybrid** mockup, not the Codex version as-is: keep the "Sales Trap" problem hook and the sharper brand voice, but adopt Codex's polish moves.
- Core hero changes validated (both our pass and Codex's converged): promote "Investigate Your Fund" to primary CTA, add a trust strip, and show a proof-of-output panel above the fold.

### Decisions Pending

- Whether to use an editorial serif headline (as in the hybrid mock) or keep the current sans.
- Whether the hero verdict card should lead with a negative verdict or a neutral "here's the real picture" framing.
- Whether to render real fund data in the verdict examples (and the compliance implications) vs. illustrative placeholders.
- Whether to proceed to implementing the hybrid in actual Astro components/tokens, or iterate further on the mockups first.

### Notes

- This session produced mockups only — no changes to the live site (`src/`, `public/`). Mockups live in `mockups/` (outside the Astro build) and were viewed via a local `python3 -m http.server`. Picking this up later.

---

## 2026-05-04

### Planned

- Replace generic form submission experiments with a clean subscriber capture flow.
- Keep the homepage email form visually native to Fund Investigator.
- Avoid exposing the MailerLite API key in frontend code.
- Support local testing of Cloudflare Pages Functions before production deployment.

### Implemented

- Added a Cloudflare Pages Function at `functions/api/subscribe.ts` for MailerLite subscriber creation.
- Updated the homepage email capture form to submit to `/api/subscribe`.
- Added inline success and error states so users remain on the site after submission.
- Updated the privacy policy to disclose MailerLite as the email subscription provider.
- Added Wrangler as a dev dependency for local Pages Functions testing.
- Added `.dev.vars` and `.wrangler/` to `.gitignore` so local secrets and runtime output are not committed.
- Verified the local Pages Function with Wrangler using `npx wrangler pages dev dist`.

### Decisions Taken

- Use MailerLite for newsletter subscriber capture instead of Zoho Forms or Kit.
- Use the MailerLite API through a Cloudflare Pages Function rather than public embed/JSONP form submission.
- Keep the API key in environment variables only.
- Do not require `MAILERLITE_GROUP_ID` for Phase 1; add group routing later if needed.
- Use Wrangler for local testing because `astro dev` does not run Cloudflare Pages Functions.

### Decisions Pending

- Whether subscribers should be assigned to a dedicated MailerLite group once list segmentation is needed.
- Whether to add a welcome kit delivery automation in MailerLite.
- Whether to add spam protection or rate limiting to `/api/subscribe`.
- Whether to add production monitoring for subscription failures.

---

## 2026-05-04

### Planned

- Reposition the About page so it matches the site’s evidence-led investigation voice.
- Move the stronger “Why Fund Investigator” argument from the homepage into the About page.
- Replace the homepage “Why Fund Investigator” section with a shorter teaser.
- Refine the About page visual treatment without adding new components or design tokens.

### Implemented

- Reworked `src/pages/about.astro` from a mission-style page into an investigation-note style page.
- Updated the About hero to use a dark investigative treatment with the existing grid texture.
- Added a “Case Note” intro section that frames the core question behind Fund Investigator.
- Moved the three-principle “Why Fund Investigator” argument into About:
  - Analytics, Not Sales
  - Zero Conflicts of Interest
  - Transparent Methodology
- Updated the punchline to: “Because Indian mutual fund investors deserve analysis that improves their portfolio. Not mis-selling that increases someone else’s commission.”
- Replaced the homepage full “Why Fund Investigator” section with a compact teaser linking to `/about`.
- Removed chart trace-line backgrounds from the homepage and About heroes, keeping only the subtle grid texture.
- Verified the site with `npm run build`.
- Committed the page work as `a2be391 refactor: reposition about page messaging`.

### Decisions Taken

- Keep the About page as an investigation note, not a founder story or broad mission manifesto.
- Keep the homepage focused on product value, investigations, Deepdive, and email capture.
- Use the punchline on both the homepage teaser and About principles section for stronger brand continuity.
- Avoid the phrase “analysis that increases their returns” because it implies a return-improvement promise.
- Keep the visual pass scoped to existing Astro components and Tailwind tokens.
- Remove decorative chart traces because they competed with mobile hero CTAs.

### Decisions Pending

- Whether the homepage teaser should keep the same punchline long term or use a shorter variant after more content is added.
- Whether to create a reusable “Why Fund Investigator” component if the same argument appears on more pages.
