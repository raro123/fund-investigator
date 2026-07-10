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
- Design tokens: `tailwind.config.mjs` · Content guide: `docs/CONTENT-GUIDE.md` · Deployment: `docs/DEPLOYMENT.md`

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
| 7 | Drive the hero verdict card dynamically from the featured report's frontmatter metrics | 2026-06-22 | S5 | 🟡 Open (deferred) |
| 8 | Option C "Suggest a Fund" email capture — revisit trigger | 2026-06-22 | S6 | 🟡 Parked |
| 9 | Assign subscribers to a dedicated MailerLite group when segmentation is needed | 2026-05-04 | S2 | 🟡 Open |
| 10 | Add spam protection / rate limiting to `/api/subscribe` | 2026-05-04 | S2 | 🟡 Open |
| 11 | Add production monitoring for subscription failures | 2026-05-04 | S2 | 🟡 Open |
| 12 | Homepage teaser punchline — keep long-term vs shorter variant | 2026-05-04 | S1 | 🟡 Open |
| 13 | Extract a reusable "Why Fund Investigator" component if reused on more pages | 2026-05-04 | S1 | 🟡 Open |
| 14 | Editorial serif headline vs current sans for the hero | 2026-06-22 | S3 | 🟡 Open |
| 15 | Hero verdict card framing (negative vs neutral) | 2026-06-22 | S3 | ✅ Resolved (S5 — qualitative directional findings) |
| 16 | Real fund data vs placeholders in verdict examples | 2026-06-22 | S3 | ✅ Resolved (S5 — qualitative, no figures) |
| 17 | Implement the hybrid homepage vs iterate mockups further | 2026-06-22 | S3 | ✅ Resolved (S5 — implemented) |
| 18 | Email-capture framing (method walkthrough vs notifications vs personalised) | 2026-06-22 | S4 | ✅ Resolved (S6 — Option B notifications) |
| 19 | Welcome-kit delivery automation in MailerLite | 2026-05-04 | S2 | ✅ Resolved (S6 — dropped with Option B) |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

---

### 📅 Date: 2026-07-11 | Session: S8 — Article header cleanup & report structure standardized ("Report Format v1.5")

**What was done:**
Tidied up how reports and articles look and are structured after an external review. Fixed a tablet
layout gap on the homepage (a third reasoning card was dangling next to blank space), standardized
both live reports to a single consistent structure, and made the article header leaner and less tall
on mobile. Added guard-rail rules to the report template so these fixes don't regress.

**Why:**
The reports had drifted apart (a duplicate title, a hand-rolled Deepdive promo the layout already
provides) and the header carried low-signal, non-clickable category/tag pills that added clutter
without helping the reader.

**How:**
Made the homepage's third card span full width at the 2-column breakpoint and revert to one column on
desktop. Removed the stray in-body title and the manual promo section from both reports (the layout
already owns the title and the "Investigate this yourself" call-to-action). Removed the pill cluster
from the article hero and made its top/bottom padding responsive. Kept tags in frontmatter for future
related-content and SEO. Confirmed the footer email link is correct markup (the "not working" report
was a local test environment with no mail handler).

**Decisions made:**
- Kept the top meta line (date · read time · category) — it's the conventional article-meta pattern and each item earns its place.
- Split the review into "now" (zero-new-component freebies, shipped this session) vs a later "Report Format v2".

**Pending decisions:**
- None open. Backlog for **Report Format v2** (not yet scheduled): Key Findings box, distinct Verdict box, `keyMetrics` stat chips in the hero, a `dataThrough` frontmatter field, a chart-caption convention, and an Evidence Callouts component. Deferred until content volume forces them: auto table-of-contents, wide-table overflow wrap, related-reports strip, glossary tooltips.

---

### 📅 Date: 2026-07-11 | Session: S7 — Reports page category filter redesigned as scrolling pills

**What was done:**
Rebuilt the category filter on the reports page. The old underline tabs exposed a raw scrollbar and
silently hid overflowing tabs. Replaced them with a single row of horizontally-scrolling pill chips
(YouTube-style) with a soft right-edge fade that signals "there's more" without a scrollbar. Shipped
a new `/llms.txt` site manifest for AI crawlers alongside it.

**Why:**
The filter had a visible bug and could hide categories with no cue, and a hardcoded category list
risked showing "dead" pills that led to empty results.

**How:**
Categories now derive from the published reports (a pill appears only if a report uses it), the strip
hides entirely when only one category exists (the current state — both live reports are "Fund
Analysis"), and the active pill state is driven by a single `data-active` attribute using a new
reusable `scrollbar-hide` Tailwind utility. Also normalised internal links to trailing slashes.

**Decisions made:**
- Kept the page title "The Investigation Archive" (rejected "Investigation Hub" — generic and collides with our hub/spoke vocabulary).
- Chose horizontal-scroll pills over a wrap or dropdown; revisit only if categories reach ~8+.

**Pending decisions:**
- None.

---

### 📅 Date: 2026-06-22 | Session: S6 — Email capture copy finalised (Option B); Option C parked

**What was done:**
Locked the framing for the homepage email-capture section. Chose a plain notification model:
headline "New Investigation Published? We'll Tell You.", a single-line subhead, and a "Notify Me"
button. Dropped the earlier welcome-kit / method-walkthrough angle.

**Why:**
A simple, honest value exchange (get notified when a new investigation goes live) avoids overpromising
and avoids committing to a deliverable that would need ongoing maintenance.

**How:**
Reworked the section copy only — no new components.

**Decisions made:**
- **Option B chosen** for email capture (clean notification subscription).
- **Option C parked, not discarded** — the "Suggest a Fund" model (collect email + a fund the visitor wants investigated, framed as "you choose the next investigation"). Crowdsources the research queue and differentiates the form, but each submission is a manual fulfilment commitment.

**Pending decisions:**
- Option C revisit trigger: once a regular publish cadence exists, or when a paid custom-investigation tier is designed. (Table #8)

---

### 📅 Date: 2026-06-22 | Session: S5 — Homepage restructure implemented

**What was done:**
Executed the homepage changes agreed in the strategy session. Reordered sections to follow the
Acquire → Activate → Nurture funnel (the free Deepdive tool now sits directly after the Problem
section as its resolution), restyled the Deepdive cards as dark tiles, plain-languaged the tool copy,
and added a hero trust strip and a qualitative "From our investigations" verdict card.

**Why:**
The business model should drive layout, not the reverse — leading with the free tool is
activation-led, and plain copy suits the primary mid-investor audience.

**How:**
Swapped section backgrounds to preserve the dark/light rhythm; removed jargon (Sharpe, Sortino,
drawdown, rolling) from the answer lines; converted glaring white Deepdive cards to `bg-fi-mid` dark
tiles with gold icon chips; added an `Independent · No commissions · Evidence-based` strip; built the
hero verdict card from the HDFC Flexi Cap report using qualitative directional findings (no figures).
Removed the dead `TearsheetMockup` import and the superseded `mockups/`. Verified with `npm run build`.

**Decisions made:**
- **No "free" framing in the hero** — it anchors price-insensitive users; use a rigor signal ("Evidence-based") instead.
- **Verdict card is qualitative, not numeric** — hard figures go stale (report CAGR 25.0% for 2021–2025 vs the live app's 19.0% for Jun'21–Jun'26, a ~6pp drift in months). Numbers + methodology live in the linked report.
- **Verdict card is sourced from Investigations, not the app** — reports conclude, the app only shows metrics.
- Rejected a raw app screenshot in the hero (jargon-heavy, no verdict, bakes in staleness).

**Pending decisions:**
- App verdict layer for Fund Deepdive (Table #5); app rebrand to "Deepdive by Fund Investigator", endorsed-brand model, to implement in the Deepdive repo (Table #6); drive the hero card dynamically from featured-report frontmatter once plain-labelled metrics exist (Table #7). Monetization/pricing, SEBI RA, and paid-tier hosting carried over from S4.

---

### 📅 Date: 2026-06-22 | Session: S4 — Funnel strategy, hero copy lock, Deepdive tool assessment

**What was done:**
Defined the business model and funnel before further layout work, locked the hero copy, and assessed
whether the live Deepdive app fits the target audience. No code changes — strategy and copy captured
for later implementation.

**Why:**
The business model should set the layout, and the tool needs to serve the confirmed audience.

**How:**
Reviewed the live app via screenshots. Locked hero copy: H1 "Fund Performance, Investigated", a
subhead about SIP returns vs headline numbers, "Investigate Your Fund" promoted to primary CTA, plus
a trust strip. Found the app's Fund Deepdive close to mid-investor-ready, Category Deepdive
analyst-grade, and a critical gap: the tool shows metrics but never states a plain-language verdict.

**Decisions made:**
- **Audience confirmed:** primary = the **mid investor** (SIP investors, not finance experts); secondary = savvy DIY investors.
- **"Helped most ≠ pays most"** — retail willingness-to-pay for research is structurally low and episodic; decouple primary audience from first paid product.
- **Two monetization motions, sequenced:** (1) freemium app utility selling ongoing peace of mind (tracking, risk/consistency alerts — reassurance, not advice, to stay clear of SEBI RA); (2) paid research reports for savvy DIY + advisors/white-label.
- **Funnel:** Acquire → Activate (run fund → plain verdict → email) → Nurture (plain-English email during volatility) → Monetize.
- **Tool direction:** add a verdict layer to Fund Deepdive, lead with it over Category, land the CTA there, plain-language the labels, reposition Category Deepdive as a "Pro/Analyst" view feeding paid reports.

**Pending decisions:**
- First paid product's feature set + price point + billing/hosting (Table #1); advisor/white-label B2B timing (Table #2); SEBI RA implications (Table #3); hosted paid tier vs custom (Table #4).

---

### 📅 Date: 2026-06-22 | Session: S3 — Homepage critique & mockups (no live changes)

**What was done:**
Produced an outside-in UX/conversion critique of the live homepage and built standalone HTML mockups
(outside the Astro build) to explore a redesign without touching the live site. Compared our proposal
against an alternate full-page redesign from Codex.

**Why:**
To decide who the homepage should speak to and validate direction before committing to real Astro work.

**How:**
Reviewed the live page (CTA hierarchy, missing trust signals, narrative order, an unused
`TearsheetMockup` import). Built `hero-proposal`, `homepage-proposal`, and `homepage-hybrid` mockups
under `mockups/`, served locally. Noted where Codex's version was stronger (asymmetric data-panel
hero, header CTA, metric badges) and where it regressed (dropped the problem hook, blander voice).

**Decisions made:**
- Primary audience = the **aware investor who needs hand-holding** (later sharpened to "mid investor" in S4).
- Preferred direction = the **hybrid** mockup (keep the "Sales Trap" hook and brand voice, adopt Codex's polish).
- Validated core hero moves: promote "Investigate Your Fund" to primary CTA, add a trust strip, show a proof-of-output panel above the fold.

**Pending decisions:**
- Serif vs sans hero headline (Table #14); verdict card negative vs neutral framing (Table #15, resolved S5); real data vs placeholders (Table #16, resolved S5); implement hybrid vs iterate (Table #17, resolved S5).

---

### 📅 Date: 2026-05-04 | Session: S2 — MailerLite subscriber capture

**What was done:**
Replaced form-submission experiments with a clean subscriber-capture flow on the homepage email form,
routed through a Cloudflare Pages Function so the API key is never exposed in the frontend.

**Why:**
The site needs a native-looking, secure way to capture newsletter subscribers without leaking secrets.

**How:**
Added `functions/api/subscribe.ts` (MailerLite subscriber creation), pointed the homepage form at
`/api/subscribe` with inline success/error states, disclosed MailerLite in the privacy policy, and
added Wrangler for local Pages Functions testing (`astro dev` doesn't run them). Kept the API key in
environment variables and added `.dev.vars` / `.wrangler/` to `.gitignore`. Verified locally with
`npx wrangler pages dev dist`.

**Decisions made:**
- Use MailerLite (over Zoho Forms / Kit), via a Pages Function (not a public embed/JSONP form).
- Keep the API key in env vars only; skip `MAILERLITE_GROUP_ID` for Phase 1.
- Use Wrangler for local testing.

**Pending decisions:**
- Dedicated MailerLite group when segmentation is needed (Table #9); spam protection / rate limiting (Table #10); production monitoring for failures (Table #11); welcome-kit automation (Table #19, resolved S6).

---

### 📅 Date: 2026-05-04 | Session: S1 — About page repositioned as an investigation note

**What was done:**
Reworked the About page from a mission-style page into an evidence-led "investigation note", moving
the stronger "Why Fund Investigator" argument off the homepage and into About, and left a compact
teaser on the homepage in its place.

**Why:**
The About page didn't match the site's investigation voice, and the "Why" argument was stronger as a
dedicated case for the brand than as a homepage section.

**How:**
Gave About a dark investigative hero with the grid texture, added a "Case Note" intro framing the core
question, and moved the three principles there (Analytics Not Sales, Zero Conflicts of Interest,
Transparent Methodology) with the punchline about analysis over mis-selling. Removed decorative chart
traces from both heroes (they competed with mobile CTAs). Verified with `npm run build`; committed as
`a2be391`.

**Decisions made:**
- Keep About as an investigation note, not a founder story or mission manifesto; keep the homepage focused on product value.
- Reuse the punchline on both pages for brand continuity; avoid "analysis that increases returns" (implies a return promise).
- Keep the visual pass scoped to existing components and tokens.

**Pending decisions:**
- Whether the homepage teaser keeps the punchline long-term or a shorter variant (Table #12); whether to extract a reusable "Why Fund Investigator" component (Table #13).
