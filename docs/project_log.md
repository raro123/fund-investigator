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
| 7 | Drive the hero verdict card dynamically from the featured report's frontmatter metrics | 2026-06-22 | S5 | ✅ Resolved (S9 — moot, hero card removed) |
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
| 20 | Write "The First Five Checks" guide — the hero modal now promises it; blocks merge to prod | 2026-07-11 | S9 | ✅ Resolved (S11 — guide written and published as a Methodology report) |
| 21 | Guide delivery automation in MailerLite — email the link on signup (re-opens #19, which assumed no lead magnet). **Now a broken promise, not just a gap:** the modal's success message says "the link is on its way to your inbox" and nothing sends it. Either build the automation before deploying, or soften the copy | 2026-07-11 | S9 | 🔴 Blocking deploy |
| 22 | Hero fund-search console — replace the primary CTA with a live fund lookup that deep-links into Deepdive (design agreed, build parked) | 2026-07-12 | S10 | 🟡 Parked |
| 23 | Add `?fund=<scheme_code>` deep-link support to the Deepdive app — prerequisite for #22, and useful on its own for linking a report to the fund it investigates | 2026-07-12 | S10 | 🟡 Parked |
| 24 | Add JSON-LD `Article` structured data to `ArticleLayout` (SEO/AIO) — parked as its own commit; touches all report pages, so it should not ride inside a content branch | 2026-07-12 | S11 | ✅ Resolved (S12 — Article + Organization + WebApplication shipped in its own commit) |
| 25 | Two parallel drafts of the five-checks guide now exist (this session's, and another agent's "Five Questions a Return Number Cannot Answer"). Both are published locally for review; decide which to keep or how to merge | 2026-07-12 | S11 | ✅ Resolved (S12 — kept "Five Questions"; the other draft and its assets deleted) |
| 26 | Nothing on the site links to the guide — the modal only promises it by email. An open guide reachable solely through a signup form is an odd shape; consider a "read it now" link alongside the email field | 2026-07-12 | S11 | ✅ Resolved (S13 — "Or read it now →" link in the modal's success state; the guide is also publicly listed on /reports, so it was never truly gated) |
| 27 | OG/cover images: no report sets `coverImage`, so every share of every report shows the same generic card, and the Article JSON-LD carries it as `image`. **Decided against** wiring up the existing `cover.png` files — they are raw chart exports, illegible at feed size (~500px), so they would be wrong in a new way rather than better. Proper fix = a templated 1200×630 card (dark brand bg, title in large type, one headline metric, small logo), ideally auto-generated at build (`astro-og-canvas`/Satori) so future reports get one for free. Parked as its own piece of work. Note: `Layout.astro` hardcodes `og:image:width/height` as 1200×630, which becomes a false claim the moment a differently-sized cover is set — fix alongside | 2026-07-14 | S12 | 🟡 Parked |
| 28 | "The outperformance was steady" in the HDFC report is contradicted by its own corrected data (+15% in 2022 vs +4–8% elsewhere) | 2026-07-14 | S12 | ✅ Resolved (S13 — rewritten: consistent in direction, uneven in size) |
| 29 | Author in the structured data is the Organization, not a named person — a personal byline is deferred until SEBI Research Analyst certification. Revisit once certified (`authorRef()` in `src/lib/schema.ts` is isolated so the swap is one line, but it needs a visible byline alongside it) | 2026-07-14 | S12 | 🟡 Parked |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

---

### 📅 Date: 2026-07-15 | Session: S13 — Article metadata untangled; a published claim corrected

**What was done:**
Sorted out which frontmatter field does what, because two of them had quietly been doing the same
job. The article's public-facing wording (title, URL, search snippet, subtitle) was rewritten and the
guide was retitled and moved to a shorter, more searchable URL while it was still safe to do so. A
claim in the published HDFC report — that its outperformance was "steady" — was corrected, because
its own corrected numbers say otherwise. Cover images were looked at and deliberately deferred.

**Why:**
The old title was memorable but nobody searches for it, and it matched neither the article's own
wording nor its URL. Meanwhile one sentence was being asked to serve as both the Google snippet and
the on-page subtitle, and was mediocre at both. The "steady" claim mattered more: a reader comparing
the sentence to the chart directly beneath it would have caught us out.

**How:**
`description` is now machine-facing only (search snippet, social, JSON-LD, llms.txt) and `hook` is
human-facing (the subtitle and the card teaser), with the layout falling back to `description` if a
report has no hook. The guide's headings were rewritten so each states its finding, and each passage
now names the fund, benchmark and period — because AI answer engines quote a heading plus its
paragraph as a standalone unit, and an unattributed sentence is worse than useless when lifted out.
AMFI and SEBI are now cited as sources rather than mentioned in passing.

**Decisions made:**
- Retitled to "The Five Checks to Investigate a Mutual Fund" at `/reports/five-checks-mutual-fund/`.
  Done before deploy, so no redirects were needed — after deploy this costs real link equity.
- `description` and `hook` split by audience. Documented once in `docs/templates/report-template.md`
  (rewritten; it was stale and actively wrong) rather than commented into every article, where it
  would drift.
- Brand suffix added to `<title>`, skipped where the title already carries the brand.
- Dropped `fmContentType` — it was in the schema and every article, and read by nothing.
- Kept `tags`, knowingly: it only feeds JSON-LD `keywords`, which is a near-dead signal, and it is
  shown to readers nowhere. It costs nothing and the data will be there if we ever build tag pages —
  which should wait until ~15–20 articles, or they are thin-content pages.
- Cover images parked, not bodged. See #27.

**Pending decisions:**
- #27 — OG/cover images, with the spec captured for whoever picks it up.

---

### 📅 Date: 2026-07-14 | Session: S12 — Guide finalised from the edited doc; the site gets structured data

**What was done:**
Settled the duplicate-guide problem left open in S11. The guide was rewritten from the finished
Google Doc and now covers HDFC Flexi Cap alone, over a window stretched back to Jan 2020 so the Covid
crash sits inside the analysis rather than just outside it — which is what lets the drawdown and
recovery checks say anything interesting. The rival draft and its 24 leftover chart files were
deleted, so one version of the guide exists rather than two. Separately, the whole site now carries
machine-readable identity information, and a wrong number in the published HDFC report was corrected.

**Why:**
Two near-identical guides sitting in the same folder was a merge accident waiting to happen. The
structured data addresses a different problem: the site told search engines and AI assistants nothing
about who published a page, when, or what Deepdive is — it left them guessing. Given that fund-review
keywords are effectively unwinnable against Moneycontrol, ValueResearch and Groww on a domain this
young, being cleanly quotable by AI assistants is the channel actually open to us, and this is the
same bet the existing `llms.txt` already makes.

**How:**
The guide's charts were pulled straight out of the Google Doc itself (via its Word export) rather
than reusing the older screenshots, so the annotated versions the doc author drew are what ship. For
the structured data, a single new module (`src/lib/schema.ts`) builds the machine-readable blocks and
the page layout drops them into every page. Each article now points at one shared definition of who
Fund Investigator is, instead of each page restating the name. Deepdive is described as a product we
own, with its features listed. A real logo file was added for this purpose. The HDFC figure was
checked against that report's own chart before changing it.

**Decisions made:**
- Kept "Five Questions a Return Number Cannot Answer"; deleted the competing draft (resolves #25).
- Shipped the structured data as its own commit, separate from the content change (resolves #24).
- The author credit is the organisation, not a person. Ishpreet is deliberately keeping his name off
  the site until he holds SEBI Research Analyst certification — a compliance judgement, not a
  branding one, and it outranks the SEO argument for a named byline. See #29.
- Deepdive's entry claims **no star rating and no price**. It has no real user ratings, and it is free
  only for now. Both fields are required for Google to show an enhanced result, so Deepdive won't get
  one — accepted knowingly, because inventing either is exactly what Google penalises sites for. The
  value here is being correctly understood by AI assistants, not a star snippet.
- 2022 outperformance in the HDFC report was wrong (+7%); the chart said 19% vs 4%. Corrected to +15%.

**Pending decisions:**
- #27 — no report sets a cover image, so every social share and every article's structured data falls
  back to the generic site image; the guide also links to nothing else on the site.
- #28 — the word "steady" in the HDFC report no longer matches its own corrected numbers.
- #29 — revisit the named byline once SEBI RA certification is in hand.

---

### 📅 Date: 2026-07-12 | Session: S11 — "The First Five Checks" guide written; two app bugs and a report error fixed

**What was done:**
Wrote the lead-magnet guide the homepage modal has been promising since S9, unblocking the branch.
It ships as a page on the site (a report in the `Methodology` category at
`/reports/the-first-five-checks/`), not a PDF or an email drip. The guide walks through the five
checks using two real flexi cap funds and screenshots of the live Deepdive app. Along the way we
found and fixed two bugs in the app and one factual error in a published report.

**Why:**
The sign-up modal was collecting emails against a guide that did not exist. The guide also doubles as
a showcase for Deepdive: every claim in it is read off the actual tool, so the reader sees what the
app does while learning what the numbers mean.

**How:**
Drove the live app with a headless browser to capture fresh screenshots of both funds at the app's
default trailing five-year window (9 Jul 2021 – 9 Jul 2026, vs Nifty 500 TRI), and pulled the raw
drawdown series out of the charts to compute recovery durations precisely rather than eyeballing them.
HDFC Flexi Cap reads green on all six tiles; SBI Flexicap reads red on return and risk-efficiency but
**green on drawdown and volatility** — the contrast the guide is built around, because it shows why one
tile is never enough.

**Decisions made:**
- Guide ships as a report in the `Methodology` category, reusing `ArticleLayout` — no new route or component.
- The guide is **open**, not gated. The email capture is the nudge, not a wall; signup just emails the link.
- **No verdict on which fund is better.** Each check ends with "What this check found" (a factual reading), and the closing section presents two profiles rather than a ranking, with an explicit caveat that portfolio fit, cost and manager continuity need further analysis.
- Check 5 is taught by reading the *shape* of the drawdown chart (time below the previous peak), since the app has no recovery-time metric.
- Rolling-returns charts are used to illustrate the Rolling Win Rate tile in check 2.

**Bugs found and fixed (in the Deepdive app, by Ishpreet):**
- **AUM unit error** — the tile read ₹3,202,025 Cr for HDFC Flexi Cap (larger than the entire Indian equity MF industry). The underlying figure was in lakhs, not crores. Now reads ₹32,020 Cr.
- **Risk-free rate default of 2.49%** — too low for India, and it feeds the Sharpe ratio directly, which is the subject of check 3. Corrected to 6%; HDFC's Sharpe moved from 1.23 to 0.96 as a result.

**Error corrected in a published report:**
- `hdfc-flexicap-performance.md` stated 2022 outperformance of "+7%". The app shows 2022 as fund 19% vs benchmark 4% — roughly **+15 points**. The other four years matched exactly, so this was a typo that was live on the site.

**Pending decisions:**
- JSON-LD structured data for report pages — parked as its own commit (Table #24).
- Two parallel drafts of this guide now exist and need reconciling (Table #25).
- Nothing on the site links to the guide; the modal only promises it by email (Table #26).

---

### 📅 Date: 2026-07-12 | Session: S10 — Hero fund-search console: design agreed, build parked

**What was done:**
Explored bringing the Deepdive app's fund-search console onto the homepage hero, so a visitor can
type the fund they already own and land straight in its investigation. Worked out the design and
checked what the app would need to support it. Nothing was built — the idea is parked until a
convenient moment, with the design captured here so it can be picked up cold.

**Why:**
A cold visitor's first question is "is the fund I already own any good?". The hero currently answers
that with a button that only *promises* an investigation. A search box with their fund typed into it
is the investigation actually starting — same intent, one less click, and the hero stops describing
the product and starts being it.

**How:**
The console would *replace* the "Investigate Your Fund" button rather than sit below it, so the hero
stays as lean as S9 left it; "Read our Investigations" demotes from button to text link. It reuses
the app's visual treatment (gold marker, START THE INVESTIGATION eyebrow, four largest-equity quick
picks) so the site-to-app handoff reads as one continuous product instead of a context switch. Since
the site is static with no backend, the fund list would ship as a build-generated `public/funds.json`
(~3,600 growth funds from `mf_scheme_metadata`, roughly 70–100 KB gzipped), lazy-loaded on first
focus so it never touches page-load speed. The quick-pick chips would be plain links, which doubles
as the no-JavaScript fallback.

**Note — the blocker:** the Deepdive app cannot currently accept a fund from a URL. Fund selection
runs entirely through Streamlit session state (`fd_fund`, `fd_cat_l1`, …) followed by a page switch;
there is no query-parameter handling in the repo. Without a `?fund=<scheme_code>` contract on the app
side, a hero search box cannot open a specific fund and would be theatre. That app-side change is the
first step whenever this is picked up.

**Decisions made:**
- Console replaces the primary CTA rather than being added alongside it (avoids re-bloating the hero
  that S9 deliberately slimmed).
- Both repos in scope when built: the app gets the deep-link handler, the site gets the console.
- Build deferred — logged, not started.

**Pending decisions:**
- #22 — Hero fund-search console (design agreed, build parked)
- #23 — `?fund=<scheme_code>` deep-link support in the Deepdive app (prerequisite for #22)

---

### 📅 Date: 2026-07-11 | Session: S9 — Hero slimmed; guide capture repositioned to existing investors

**What was done:**
Removed the "From our investigations" verdict card from the homepage hero, and rewrote the guide
sign-up from a beginner's guide into "The First Five Checks". The hero now states the premise and
routes visitors by intent — run your fund, read an investigation, or take the guide — with nothing
duplicated further down the page. Work sits on branch `hero-lean-guide-capture` (commit `642abc9`),
not yet merged.

**Why:**
Two problems. First, the hero card previewed the HDFC Flexi Cap investigation, but that same report
already appears as a proper report card in the Investigations section below — so the hero was showing
a weaker, number-free copy of a card the visitor meets again moments later. Second, the sign-up asked
"New to mutual funds?", which repels the exact person we want: someone who already holds funds but was
never taught how to judge them. They need the guide, but will not click anything labelled "beginner".

**How:**
Deleted the hero card outright (the Deepdive section already carries the app demo, and Investigations
carries the reports — nothing was lost). Reframed the sign-up around the knowledge gap rather than
skill level: "Already investing, but unsure how to evaluate a fund?" The modal now names the offer
"The First Five Checks", positions it honestly as a quick filter that decides whether a fund deserves
a deep-dive, and lists all five questions above the email field so the visitor sees what they get
before handing over an address. Verified with `npm run build`.

**Decisions made:**
- **Hero card removed rather than fixed.** Reusing the standard report card would have made the duplication worse; a bespoke card was off-design-system. The slot had no job the page wasn't already doing.
- **Framing by knowledge gap, not skill level.** "Beginner" is an identity repellent for an investor with running SIPs, regardless of what they actually know.
- **The guide is a triage, not a masterclass** — five checks that decide if a fund is worth deeper analysis. This keeps the free tier honest and leaves room for the app and paid research above it.
- **The five checks, in order:** did it beat a fair benchmark → was it consistent or one lucky year → did the extra return justify the extra risk → how far did it fall when the market turned → how long did it take to recover. Ordered as return → is it real → was it efficient → what's the downside → how long it lasts.
- **The SIP-vs-headline gap folds into check #1** rather than getting its own slot; "did it beat a fair benchmark" already forces the question of which return you are measuring.
- Checks are worded so they work for a fund you own *or* one you are sizing up, so the guide serves both.
- **The guide ships as a page on the site**, not a PDF or an email drip. It stays indexable for search, costs nothing extra to host, needs no design tooling, and can link straight into the HDFC investigation. Signup then only has to email the link.
- **The guide page is open, not gated.** Gating it would kill the search traffic that was the main reason to choose a page over a PDF. Anyone who lands on it can read the method, which is itself the proof we are worth subscribing to.
- **The hero modal stays.** Since the page is open, the email is not a gate — it sends the reader the link so they can save it and read it in their own time. That is an honest exchange and a real convenience, so the sign-up keeps its place in the hero rather than being replaced by a plain link.

**Pending decisions:**
- **The guide does not exist yet — the modal now promises it.** It must be written before this branch reaches production, or we collect emails we cannot service (Table #20, blocking).
- Guide delivery automation in MailerLite needs revisiting — S6 closed that question on the assumption there was no lead magnet, and there now is one (Table #21).
- Table #7 (drive the hero card from report frontmatter) is now moot; the card is gone.

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
