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
