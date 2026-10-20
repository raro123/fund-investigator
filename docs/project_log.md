# Project Log: Fund Investigator

**Goal:** Build a fast, content-led mutual fund hub (fundinvestigator.com) on Astro and Cloudflare Pages.
The site is distribution-led: its main goal is booked first calls for the "Invest with support" service from an
AMFI-registered Mutual Fund Distributor (SIF-enabled). Free investigations, and the Deepdive app for email
subscribers, build authority. Success = low-ops, solo-friendly delivery that earns distribution revenue; paid research is deferred.

---

## Important Links

- Production site: https://fundinvestigator.com
- Deepdive app: https://deepdive.fundinvestigator.com
- Astro docs: https://docs.astro.build
- Design tokens: `tailwind.config.mjs` · Content guide: `docs/content_philosophy_v2.md` (v1 retired: `docs/archive/content_philosophy_v1.md`) · Deployment: `docs/DEPLOYMENT.md`
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
- **What needs to improve:** Nothing of the funnel is live yet (see #95). Three compliance items still block release (#65, #75, #78). The handoff
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
| 55 | **Design — high priority: align the design references.** Update `docs/style_spec.md` card descriptions to match the shared components and current homepage. Check colours, padding, corners, and hover styles. Prefer references to component props over repeated numeric specifications. Keep existing `/styleguide` examples consistent. Complete when the references agree with the website. Page-composition examples remain separate under #41 | 2026-10-03 | S39 | 🟡 Open (S49 — new homepage cards, centre axis and light ReportCard documented; older card specs still to align) → + #41 merged (S66): page-composition examples in `/styleguide` (Navigation, Footer, Background Accents, Section Labels); + the Button focus check from #57 (keyboard check on light and dark surfaces) |
| 74 | **Content — decision guides under Investigations** (no named funds): lump sum or STP for a bonus, fund overlap, tax when you redeem, what to do when markets fall. They may link to `/invest/`. Publish under `/reports/` (Academy stays deferred); when the first one ships, decide on a new category, which needs both the `src/content.config.ts` enum and `categoryLabels` in `src/pages/reports.astro`. Then feature them on the homepage Investigations section. Feeds #61 | 2026-10-11 | S43 | 🟡 Open → + #61 merged (S66): new guides are the main traffic lever; no Academy until ~8–10 guides. Generic guides carry a service invite (`serviceInvite`) |
| 86 | **Website — low priority: header and content alignment.** At wide screens the header logo sits 40px right of the section content (the header pads inside `max-w-7xl`, `Section` pads outside it). Existed before S46 | 2026-10-11 | S46 | 🟡 Open |
| 91 | **Deepdive — high priority (owner): email-based access before deploy.** The homepage subscribe strip promises "Access to Deepdive". Then point the remaining open Deepdive links (footer, `/reports/`, `/about/`, articles) at the access flow | 2026-10-14 | S49 | 🟡 Parked (S63, COM-022 — all Deepdive promotion and the subscriber promise removed until the tool's outputs are cleared) |
| 105 | **Website — low priority: hairline dividers between white and `fi-light` sections.** Check on a real phone whether the boundary is visible. If not, add a `divider` prop to `Section.astro`, not page-level borders | 2026-10-15 | S52 | 🟡 Open |
| 117 | **Owner — high priority: outside setup** (bundle of #60, #88, #90, #100, #101). WhatsApp Business profile, kit approval and the transaction route (#60). Zoho Bookings: title for both visitor groups, host name, required "First investment / Existing portfolio" question, confirmation email saying what to share, how (never WhatsApp) and when the brief arrives (#88). Photo for `OWNER_PHOTO` (#90). The SIF tagline in WhatsApp, Zoho, emails and signature; the shorter-tagline question waits on AMFI (#100). How clients send their CAS (#101; feeds #118's privacy copy) | 2026-10-20 | S66 (from S40–S66) | 🟡 Open |
| 118 | **Release — high priority: release blockers** (bundle of #114, #65, #78, #115; `docs/production-readiness-review-2026-10-20.md`). Done in S65: phone tables, article CTA, benchmark accuracy. Done in S67 (drafts, facts confirmed by the owner): privacy covers Zoho, WhatsApp/email, CAS (partner platform or email, never WhatsApp), client records (partner platform, RTAs), 12-month deletion for non-clients (#78); terms and disclaimer scope "information only" to public content and describe the distribution service (#65); first-call labels (#115). Left: compliance sign-off of the S67 privacy/terms/disclaimer wording; then the acceptance checks: one test booking end to end, one test WhatsApp enquiry, analytics receipt in production. Then the PR `dev` → `main` | 2026-10-20 | S67 (from S41–S67) | 🟡 Open — owner checks only |
| 119 | **Compliance — high priority: copy check** (bundle of #94, #80, #83, #98). Site copy against the AMFI MFD FAQ PDF (#94). "Regular plans cost more than direct" on `/about/` and `/disclaimer/`: same-fund comparison only (#80). The homepage `SampleBrief` illustrative values (#83). Content-guide v2 calls: "partner"/"wealth" as tone, bylines case by case (#98). "Improve" in the hero subhead (S62; fallback "Build or review"). Clearance of the two generic guides (COM-002, COM-014) | 2026-10-20 | S66 (from S45–S64) | 🟡 Open |
| 120 | **Analytics — medium priority: PostHog** (bundle of #62, #113). Internal-user filter (project setting). Update filters on `article_end` to `guide_end` and `report_end`; `article_takeaways` is now a `subscribe_click` placement. Compare `subscribe_click` with Substack's signup counts monthly. Clicks aren't bookings: record completed calls by hand in the client sheet | 2026-10-20 | S66 (from S40–S66) | 🟡 Open |
| 121 | **Landing pages — parked on the `landing-pages` branch** (bundle of #107, #108, #109, #110, #112). Before they return: owner copy check of the four pages and their FAQs (#107); Zoho measurement per landing page (#108); PostHog funnels and the UTM convention (#109); SIF promotion rules, GIFT City tax/LRS/TCS copy and the transaction route (#110); extract `LandingHero`, `LandingCosts` and `FactGrid` (#112). Bring back as a PR after the release, by reverting `0382349` and the S67 cleanup (merging the branch restores nothing) | 2026-10-20 | S66 (from S55–S62) | 🟡 Parked |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

---

### 📅 Date: 2026-10-20 | Session: S67 — Pre-release repo cleanup

**What was done:**
Final pass before `dev` → `main`. Lint, contrast (24/24) and build (13 pages, all SEO gates) pass. Removed code no page imports: `DeepdiveSnapshot` and its poster, `src/lib/deepdive.ts`, `deepdiveSchema`, `DEEPDIVE_URL`, the `deepdive_click` event (Deepdive is parked, #91); `RouteCards`, `routes.ts`, `products.ts` and the landing-page FAQ sets in `faq.ts` (landing pages are parked, #121). Removed two unreferenced docs (`Decoding_the_Mutual_Fund_Categories_v3_with_footnotes.docx`, `seo-authority-strategy.html`) and the MailerLite and Pages Functions links. `.claude/launch.json` is now ignored. Deleted branches already merged into `dev`: `codex/article-readiness`, `compliance/release-fixes`, `feature/inline-subscribe`, and remote `design/contrast-and-accent-fixes`.

**Decisions made:**
- `landing-pages` is an ancestor of `dev`, so merging it would restore nothing. Bring the pages back by reverting `0382349` and the S67 cleanup commit (`docs/landing_pages_plan.md`, "Restoring the pages").
- `npm audit` (1 critical, 20 high) is not exploitable on this static build: no `define:vars`, no on-demand image endpoint, and the rest are build-time tools. All fixes need Astro 7 / Tailwind 4; upgrade after the release.
- Release copy (#118) drafted in S67 and confirmed by the owner: privacy (Zoho, WhatsApp/email, CAS via partner platform or email, client records on the partner platform and with RTAs, 12-month deletion for non-clients), terms and disclaimer scoped to public content, first-call labels. Left: compliance sign-off and the owner acceptance checks.

---

### 📅 Date: 2026-10-20 | Session: S66 — In-site subscription (`/subscribe/` with Substack's embed); "Know more" after the ARN

**What was done:**
Reviewed the subscription flow. Every Subscribe button sent readers to Substack's `/welcome` page in a new tab; the report-end card had no `subscribe_click` tracking; the guide invite and the report-end card shared the `article_end` placement; the copy promised "every new investigation" while every investigation is held. Weighed leaving Substack (Buttondown / MailerLite / Brevo with an inline form, or a Pages Function + D1) and kept Substack. Built `/subscribe/` with Substack's official embed (`SubstackEmbed` component, `SUBSTACK_EMBED_URL`): the reader subscribes without leaving the site. A "check your inbox" line sits under the form, and a back link returns readers to the same-site page they came from ("Back to the article" from a report, "Back to where you were" elsewhere, hidden for outside referrers). Two test signups with the owner's Outlook addresses: no new tab opened, the button turned into a ✓, and the owner confirmed the subscriptions went through. The `/subscribe` 301 to Substack was removed and the page joined the sitemap. All six placements now open `/subscribe/` in the same tab: homepage, `/reports/`, footer, guide end, report end and the Key Takeaways prompt (`3587ed2`, `33b24ac`). Then, on the homepage case file, "Know more" moved from the right of the "Your distributor" label to inline after the ARN, and the "Introductory first call (no charges)" caption now wraps on phones instead of running 21px past the card's padding (`bcd4b30`). `dev` pushed (`bcd4b30`). Session log written for S62–S66 (it had stopped at S61). Then the pending-decisions table was cut from 57 open items to 10. Out-of-date items (paid research, Deepdive, held named-fund content, superseded design and copy items) went to `docs/project_log_archive.md` with a reason each, along with rows already resolved. Related items became five bundles: #117 owner setup, #118 release blockers, #119 compliance copy check, #120 PostHog, #121 landing pages (parked). Quick wins done: handoff §2 items 5 and 7 updated (#96, #69), content guide v1 moved to `docs/archive/` (#97), the unused `Timeline` component deleted (#104), and `.gitignore` covers local tool output (#116).

**Why:**
Leaving the site for Substack cost a step and a tab. The embed keeps Substack's double opt-in, unsubscribe and sending, with no backend and no privacy-page change ("you enter your email on Substack" stays true). A custom form posting to Substack's internal `/api/v1/free` was rejected: undocumented, needs a proxy, and can break silently.

**How:**
`src/pages/subscribe.astro`, `src/components/ui/SubstackEmbed.astro` (light surfaces only: the frame is Substack's white box and cannot be styled), `SUBSCRIBE_PAGE` in `src/lib/substack.ts`; `substackWelcomeUrl` and `SubstackPlacement` removed. Placements: `homepage_bottom`, `reports_index`, `footer`, `guide_end` (was `article_end`), `report_end` (new; the end card was untracked) and `article_takeaways`. The back link reads `document.referrer` and uses it only when it is same-origin, so it can never point off the site. `Dossier` field links are inline after the value (`whitespace-nowrap`, so the link never splits). The work started on `feature/inline-subscribe`, was rebased onto the S65 commit (`5a2ddf4`) and fast-forwarded into `dev`.

**Decisions made:**
- Stay on Substack; subscribe through the in-site embed, not a redirect.
- The page cannot see a signup inside the frame: no automatic redirect after subscribing (it would fire on mis-clicks). Completed signups are counted in Substack only.
- `TAGLINE` stays verbatim. The owner asked for "AMFI Registered Mutual Fund & SIF Distributor"; kept until AMFI's acceptance of the shorter form is confirmed (#100).

---

### 📅 Date: 2026-10-20 | Session: S65 — Production-readiness review and article fixes (separate session)

**What was done:**
An outside-advisor review of `dev` (`docs/production-readiness-review-2026-10-20.md`) recommended holding the release for a small correction pass. It listed five must-haves: article tables cut off on phones; the article CTA promising a "portfolio review" while every other CTA books a first call; privacy copy that doesn't cover the distribution service's data; terms and disclaimer still describing an information-only service; and an inaccurate benchmark claim (Nifty 500 TRI as *the* flexi-cap benchmark). The article pass (`5a2ddf4`, notes in `docs/article-readiness-fixes-2026-10-20.md`) fixed the three article items. Wide tables are now keyboard-scrollable regions with an overflow hint (`rehype-scrollable-tables.mjs`, `fi-table-cell` token). The guide invite now says "Book a first call", with the introductory-call line. The benchmark, Sharpe and category wording is corrected against primary sources. The takeaways subscribe prompt became a styled note (`article-subscribe-note`), and article metadata was simplified.

**Decisions made:**
- Must-haves 3 (privacy) and 4 (terms/disclaimer scope) remain open, along with the release acceptance checks (#114).

---

### 📅 Date: 2026-10-20 | Session: S64 — Two guides restored as generic rewrites; first-call label

**What was done:**
The two guides came back as generic rewrites that name no scheme (`aaf3472`). Five checks uses a hypothetical "Fund A" with rounded, labelled figures (HDFC screenshots removed; COM-020 Sharpe wording). Categories has no named funds, a rule-boundary table and COM-014 wording. The four held scheme-naming reports 301 to the five-checks guide. In articles, the AMFI and SIF warnings moved into the article disclaimer, so the sitewide risk card is dropped there. Generic guides get a service invite above the notes (`serviceInvite` frontmatter: booking primary, WhatsApp secondary, subscribe tertiary), and footnotes are split out (`rehype-split-footnotes`). Then (`8c8231d`): the homepage case file's agenda is headed "Introductory first call (No charges)", and on `/invest/` WhatsApp is a secondary button beside the booking button.

**Decisions made:**
- A guide that names no scheme may invite readers to the service ("teach, then invite"); a fund analysis never does. Pending compliance review (COM-002, COM-014).

---

### 📅 Date: 2026-10-19 | Session: S63 — Compliance release fixes (review of 19 October)

**What was done:**
Applied the website compliance review, item by item with the owner:
- **Reports held (COM-001/002, `fb9ed24`):** all six reports moved to `src/content-held/reports/` (README lists what each needs), so nothing about them is built. Homepage and `/reports/` fall back to the subscription.
- **Deepdive promotion removed (COM-022):** footer, `/reports/`, About, the homepage subscriber promise, JSON-LD and `llms.txt`.
- **New `/disclosures/` page:** numbered notes with sources and review dates (`src/lib/disclosures.ts`, `Fn` marker).
- **Wording fixes:** source, research and affiliation wording in terms, privacy and the disclaimer; "qualified financial advisor" became SEBI-registered Investment Adviser.
- **Copy (`7dde621`):**
  - the no-charge call is labelled "introductory" everywhere (COM-008);
  - the direct-plan memo uses the agreed boundary text (COM-011);
  - the four `PlanCompare` rows use Compliance's wording (COM-012), and the rows lost their ticks and dots;
  - SID/KIM wording (COM-013).
- **Risk warnings (`79d4e0d`, `af8aa0b`):** AMFI mutual-fund and SEBI SIF warnings in one compact "Risk disclosures" card above the footer on every page (`RiskDisclosures`, `Section spacing="xs"`); the inline `RiskNote` was removed.
- **`/invest/` costs:** the plan-difference lead moved into the FAQ (`16dabd9`).
- **About trimmed:** the call text, the "Your money and your approval" memo and the "How support works" link were removed (`cf2c884`, `df2a668`, `cc8798e`).

**Decisions made:**
- No report or guide is published until cleared; the subscription stands in for them.
- Risk warnings live in one sitewide card, not inline next to SIF mentions.

---

### 📅 Date: 2026-10-19 | Session: S62 — Typed-record pass on the hero, `/invest/` and `/about/`; landing pages off `dev`

**What was done:**
Carried the homepage's typed-record look across the site:
- **Homepage:**
  - the `SampleBrief` got a clearer "What this means" conclusion, mono captions and dashed rules, and its "Sample" stamp became a quiet badge (`d4745db`, `cc0904e`);
  - the hero subhead names all three products, "backed by evidence" (`4ddb147`);
  - a Credentials card replaced the credibility strip under the hero, then the slim strip returned because the card took too much of the first screen (`b8306e0`, `cc0904e`);
  - the case file's "Your distributor" field shows the exact AMFI tagline and the ARN.
- **`/invest/`:**
  - the journey went from a case log to four `StepMemos` (we listen, analyse, explain, support) (`19095d9`, `5416786`);
  - the route cards were removed;
  - direct vs regular became `PlanCompare`, with folder tabs on phones (`f1a0798`);
  - credentials moved into an `IdCard` in a new "Who you work with" section.
- **`/about/`:** rebuilt with the same components, copy unchanged: `Memo`, `StepMemos` and `IdCard` (`a82408f`, also on `landing-pages`).
- **Landing pages:** the four `/invest/` landing pages moved to the `landing-pages` branch, out of this release (`0382349`).
- **Footer:** the tagline is now the hero line, "We investigate, so you can invest.", in gold italic (`2ba267d`, `b5d7f08`; #92). The standard risk warning left the footer identity line.

**Decisions made:**
- No approval method named in copy ("with your approval", not "by OTP"); the "Execution" service is now "Transactions".
- "Improve" stays in the hero subhead pending a compliance check (fallback "Build or review").

---

### 📅 Date: 2026-10-18 | Session: S61 — Homepage: case files (problem beside its solution); dark investigations band; WhatsApp text without `ref`

**What was done:**
The homepage services section is now two sections. "Sound familiar?" lists three client problems (`ProblemList`, white). "A service for each one." answers them with three `ServiceCard`s with the same numbers: Portfolio review · Fund curation · Execution and ongoing reviews. Each card links its landing pages, or `/invest/#how-it-works`. The fee note and booking buttons stay below the cards. The "Where are you starting from?" routes section and the "Fund Investigator way" section are gone. The three differences now sit as trust points under the final call's buttons, followed by "Read our story →". Separately, WhatsApp prefilled messages no longer end in `(ref: …)` (commit `555dc4f`).

Then a visual pass, because the page read flat (owner: "lacking pizzazz"; creative liberty). One idea from the brand, "We investigate": each problem is a **case note** (`Case 01`, the client's words in quotes in the Newsreader italic, a gold highlighter stroke that draws in over the heart of the problem, dashed file rules) and each service is its **case folder** (dark tab with gold `Case 01`, dark top edge). The solutions heading is "Every case, investigated." Investigations is now a dark band with the hero's glow, dark report cards and a dark subscribe strip, so the page alternates dark and light again (style_spec §1: only the hero was dark). The differences are an "On the record" ledger between rules instead of cards; the final section is white.

Finally, the owner's idea: problem and solution in one **case file** (`CaseFile`) instead of two sections. Each file has the "Case 01" tab; the problem (serif italic, highlighter) sits on a `fi-light` panel beside the solution from `lg`, above it on phones, with a gold arrow on the seam. On reveal the highlighter draws, the arrow pops and the solution slides in. `ProblemList` and `ServiceCard` were removed. Owner's last pass (case-file inspiration): the problem is typed in Courier Prime (new `@fontsource/courier-prime`, `font-typewriter`) instead of the serif italic; the "The problem" and "How we solve it" labels and icons are gone; a tilted "Case solved" stamp in `fi-link` lands last, at the solution's bottom right; the "Case 01" tabs and the dark top edge are gone; the files hold no links, so the homepage reaches the landing pages through the footer and `/invest/` only. The three problems were rewritten in the client's everyday words (no "overlap"): unsure the funds bought over the years are right for them; wanting to start investing but not knowing where to begin (for first-time investors; its third bullet is now about the first SIP or lump sum); "I'd like a helping hand when my life changes, when markets move, and with the day-to-day admin" ("admin", not "paperwork": most of it is online) (its bullets answer the three in the same order). The fee note under the files is now a typed **memo** clipped to the page (`Memo`: grey paper clip, "Memo · How we are paid", Courier Prime body with one highlight on "in writing, before you select your funds", signed with the registered name and ARN); the highlighter became a shared `Highlight` component. The routes were tried back on the homepage, first as a detective's evidence board, then as a tabbed case dossier, and then dropped: they repeated the case files, hid most of their content behind tabs and duplicated `/invest/`. The landing pages stay off the homepage; the footer, `/invest/` and the sitemap link them. The paper clip became a shared `PaperClip`. The homepage is now four sections: hero (dark) · case files (light) · investigations (dark) · final call (light). Report cards (homepage and `/reports/`) got the same quiet filing look without new words: the category on a folder tab, a dashed rule, and a typed mono record instead of the three-icon row ("Key figures CAGR … · Sharpe … · Max DD …" for fund analyses, "Covers …" for guides, then "Updated" or "Published" with the read time). `MetricIcon`, `report-metrics.ts` and the `icon` option in `keyMetrics` were removed; the two guides now list label-only metrics. The subscribe card joined the same look: a "Stay updated" folder tab (shared `FolderTab`), one sentence and the Subscribe button, without the "Subscribe for free" heading or the benefit icons. The final call's paragraph became a typed case file (`Dossier`: clipped sheet, "Your first call" in Courier Prime 700 capitals, form fields Length · Cost · You share · Then) with the booking buttons at its foot. The "On the record" differences then moved inside the dossier (its `notes`, with "Read our story"), shown as their three names with ticks, without the explanations, so the final section is one heading and one file, ending on the booking buttons; the fee memo lost its paper clip so the dossier is the page's one clipped sheet. Then the dossier became the reader's own case, the one file on the page not yet filled in: "Your money. Your goals. Our investigation." (not "portfolio", which leaves out first-time investors), "Your case", No. ________, Client You, Status "Not yet opened" typed out behind a caret on reveal, and the first call as an agenda with empty boxes ("30 minutes · No charge": you share your goals, we explain how we can help, you decide). The green-ticked differences and "Read our story" left the homepage (a feature list in a typed file, and "first call" said three times); the differences stay on `/about/`. Owner's pass: more compact (no "Your case" title, tighter spacing), and the case number became a "Know your investigator" link to the new `#distributor` anchor on `/about/`. Then the owner's second pass: the paper clip went (`PaperClip` removed), the tagline under the heading became "Ready to talk about your case?", Client and Status share a row at every width with the status "Awaiting you", and a "Your investigator" field (AMFI-registered · ARN, "Know more" → `/about/#distributor`) holds the disclosure in the file; the footer keeps the full AMFI disclosure.

**Why:**
The owner's review: four problems in small grey strips were the weakest text in their own cards, and "Execution" alone was a weak problem. Joining it with ongoing reviews gives one promise: we do the transactions and stay with you. The routes section repeated the problem framing right after it, and `/invest/` already has the routes. The solution cards keep the homepage's links to the landing pages (S58). The `ref` tag was visible to the customer, and `conversation_request` already records the placement.

**How:**
`src/lib/services.ts`: `services` is now the four `/invest/` stage titles only; `homeServices` holds one record per problem and its service (number, icon, problem, bullets, links), with links taken from `routes.ts`. `ServiceCard` lost the problem strip and gained `links` and the folder tab. New `ProblemList` component (first-person `problem` plus `mark`; `services.ts` throws if a mark is not in its problem). New: `Section` `glow` prop, `Card variant="dark"`, `responsive.quote`, `grid-cols-fi-case` token, Newsreader 400 italic. All new colour pairs were already approved by the contrast check. Styleguide, `style_spec.md`, handoff homepage table and `landing_pages_plan.md` updated.

**Decisions made:**
- Homepage: three problems and three services, paired by number; `/invest/` keeps four journey stages.
- The difference pillars keep their exact words (content philosophy), now as trust points in the final section.
- `RouteCards` compact variant stays in the styleguide, unused on pages.
- Landing pages are not linked from the homepage (footer, `/invest/` and sitemap only). Revisit if `landing_view` referrers show the homepage would matter.
- The "case" language and the highlighter belong to the homepage problems and services only; don't spread them to other pages without a review.
- The page alternates dark and light: hero (dark) · case files (light) · investigations (dark) · final call (light) · footer (dark).
- The OTP fact moved from a section lead into case 03. The fee memo says who pays us (the fund house, from the expense ratio, already deducted from the fund's returns), not "you pay the fund house directly", which read as if investors pay a fee.

---

### 📅 Date: 2026-10-17 | Session: S60 — SIF and GIFT City indexable, GIFT City page reordered, consistency fixes

**What was done:**
`/invest/sif/` and `/invest/gift-city-funds/` are no longer `noindex` and are back in the sitemap and `llms.txt`. The GIFT City page follows the SIF page's order: "GIFT City funds at a glance" (what they are, IFSCA, then Consider it if · Minimum · Main risks) with the assessment preview, then the two residence routes, then costs with an "Everything in writing first" card before the middle booking buttons. The portfolio-review hero lost its eyebrow and the separate holdings line, so the booking button sits higher on phones; the sample brief's "What this means" line is shorter. S59 (commit `66163ab`, routes earlier, `OwnerIntro`, `AssessmentPreview`) is described in `docs/landing_pages_plan.md` §5.

**Why:**
The owner reviewed the landing pages. The pages are on `dev` and go through the compliance check before release anyway, so `noindex` only delayed them. The GIFT City page was the densest: its "Suits" fact repeated the residence cards, and its middle booking had no reassurance before it. "40+ fund houses empanelled" is a mutual fund credential, so it implied too much on a GIFT City page.

**How:**
`astro.config.mjs` sitemap filter and both `noindex` props removed. GIFT City hero strip: AMFI registration · `CREDENTIALS[0]` · Transparent disclosures. Fit label "Consider it if" on both product pages. How-it-works heading "Your portfolio first. Then decide whether dollar funds fit." mirrors the SIF page. Plan doc status, footer note and pending actions updated.

**Decisions made:**
- SIF and GIFT City pages are indexable; #110 now gates the merge to `main`, not indexing.
- Product pages use the same fit label ("Consider it if") and the same section order.
- Credibility markers on a page must apply to that page's product.

**Pending decisions:**
- New: #112 landing-page components. #110 updated.

---

### 📅 Date: 2026-10-17 | Session: S58 — Routes to the landing pages: homepage, `/invest/`, footer

**What was done:**
Visitors on the site can now reach the landing pages. The homepage final section has three small situation cards below the booking buttons ("Not ready yet? See how we help in your situation."). On `/invest/`, the same three situations replace the product cards, titled "Where are you starting from?", and keep each product's minimum and main risk. The footer links the portfolio review and start investing pages.

**Why:**
The landing pages had no way in from the site itself. Visitors choose by situation, not by product, so situation cards fit better than links on the product cards.

**How:**
`src/lib/routes.ts` holds the three routes (Already investing · Starting out · Beyond mutual funds), with facts taken word for word from `products.ts`. New `RouteCards` component: `compact` (homepage) and `detailed` (`/invest/`, with the facts; stacked until `lg`). Text links only. `/styleguide` shows both. Lint, contrast and build pass, with internal link checks; no page scrolls sideways at 375px.

**Decisions made:**
- Route cards come after the booking buttons, never in the hero or the header: the gold booking stays the main action.
- The `#products` anchor stays on the `/invest/` section, so older links still work.
- SIF and GIFT City links go live now (owner), before the #110 check.
- Footer: only the two mutual fund pages.

**Pending decisions:**
- #111 resolved. #110 is more urgent: the SIF and GIFT City pages are now linked from the homepage and `/invest/`.

---

### 📅 Date: 2026-10-17 | Session: S57 — Start page: no FD framing, new slug

**What was done:**
Landing page 2 moved to `/invest/start-investing-mutual-funds/` and no longer speaks to FD holders. The hero now reads "Have savings? Start with mutual funds." The sample starting brief profile says "₹15 lakh in savings". A new FAQ answer says FDs can stay.

**Why:**
FDs are doing well while markets are down, so "Savings in FDs?" invited the reader to compare returns, and that comparison works against us. The reader we want is someone who has savings and wants to take part in financial markets. The new slug also matches what people search for.

**How:**
`git mv` of the page; title, description, hero, first sign and comments rewritten; `startFaq` opens with "Do I need to break my FDs?"; `SampleBrief`, `llms.txt`, `/styleguide`, the plan doc and items #107 and #110 updated. The page was never on `main`, so no redirect is needed.

**Decisions made:**
- Slug `/invest/start-investing-mutual-funds/`; landing id stays `start`, so the tracking is unchanged.
- The page never runs down FDs or other savings. The call decides how much, if any, goes into funds, and when.
- All four landing pages show only who they suit ("Is this for you?"), not who should skip them (owner): mutual funds cover short and long goals, from overnight and liquid funds to equity. On the SIF and GIFT City pages the minimum, main risks and rules stay in "A SIF at a glance" and "Four things to know first". `FitCards` takes `notFor` as optional. New FAQ answer "What if I need some of the money soon?" (never "safe"; "no fund is free of risk").

**Pending decisions:**
- None new.

---

### 📅 Date: 2026-10-17 | Session: S56 — Landing pages 2–4: start investing, SIF, GIFT City funds

**What was done:**
We built the other three landing pages: `/invest/start-investing/` (savings in FDs, new to markets), `/invest/sif/` and `/invest/gift-city-funds/`. Each one aims at one action, a booked call or a WhatsApp message, with three button pairs (hero, after the costs, final) and WhatsApp texts that name the topic. The start page shows a sample starting brief. The pages link to each other.

**Why:**
The owner asked for every category to have a page that turns an interested reader into a message or a booked call. Each product now has its own way in, so none is left unused.

**How:**
New components `ContactActions` (booking and WhatsApp buttons tracked by one placement, an optional call note and the registered identity) and `FitCards` (who it suits, who should skip it), both on `/styleguide`. `SampleBrief` has a `variant` prop (`review`, `start`); a 0% segment is no longer drawn. `/invest/portfolio-review/` now uses the shared components. New FAQ lists `startFaq`, `sifFaq`, `giftCityFaq` reuse shared answers word for word. New WhatsApp placements `lp_start_*`, `lp_sif_*`, `lp_gift_city_*`. `llms.txt` lists the start page. Lint, contrast and build pass (19 pages, metadata checks pass); at 375px no page scrolls sideways, and each page sends `landing_view` with its id.

**Decisions made:**
- Each page has one goal: a booked call or a WhatsApp message. The gold button is in the hero, the costs section and the final section only.
- SIF and GIFT City pages are suitability pages: who should skip the product comes before the process, and every risk, redemption and tax point is promised in writing.
- The GIFT City page states the rules that decide fit (LRS limit USD 250,000 a year, TCS, the rupee–dollar rate, tax and reporting) before the process. Tax copy stays general and points to the client's tax adviser.
- `/invest/sif/` and `/invest/gift-city-funds/` are `noindex` and out of the sitemap until #110 is done.
- The starting brief is never called a "plan".
- FAQ toggles (+ / ×) are `fi-ink`, the hero navy, not `fi-link`: amber read as gold on light surfaces. Links stay `fi-link`.
- Code comments write log items as "log item 110": "#110" reads as a hex colour to the design lint.

**Pending decisions:**
- #107 now covers the copy of all four pages, including the starting brief values. #110 and #111 updated.

---

### 📅 Date: 2026-10-17 | Session: S55 — Landing pages plan, `/invest/portfolio-review/` and landing tracking

**What was done:**
We agreed a landing pages plan (`docs/landing_pages_plan.md`): four pages, one per reader situation, fed by content (articles, YouTube, X). We built page 1, `/invest/portfolio-review/`, for readers who already invest. We added page tracking: a `landing_view` event that carries the page id and the visit's UTM tags, and WhatsApp texts that name the topic.

**Why:**
The owner is a new MFD with no client referrals yet, so clients will come from content. Each piece of content needs a page that matches the reader's question, and the pages show which situations bring clients worth having. The existing events recorded the button but not the page or the post that sent the visitor.

**How:**
`analytics.ts` has `landing_view` and `LandingId` (`review`, `start`, `sif`, `gift_city`). `Layout.astro` takes `trackLanding` and sends `landing` plus any `utm_*` tags with the view event. `whatsapp.ts` has `lp_review_hero`, `lp_review_cta` and `lp_review_final`. The page reuses `Hero`, `SampleBrief`, `CredibilityStrip`, `CheckList`, `SplitRows`, `Card` and `FaqList`; `reviewFaq` in `faq.ts` reuses four shared answers word for word. The page is in `llms.txt` and the sitemap. Lint, contrast (24 pairs) and build pass; the dev preview at 1024px and 375px shows no sideways scroll and the tracking attributes on all six buttons.

**Decisions made:**
- Four landing pages, not three: SIF and GIFT City funds get separate pages. A combined "beyond mutual funds" page matches no search and hides which product drew the interest.
- Slugs: `/invest/portfolio-review/`, `/invest/start-investing/`, `/invest/sif/`, `/invest/gift-city-funds/`. `/invest/` stays the general page.
- Content that feeds a landing page is a generic guide in the reader's words. Fund analyses that name a scheme never link to these pages.
- Page order: hero with the sample brief, signs, four checks, five stages, who it suits, how we are paid with the action, FAQ, final call. Gold buttons in the hero, costs and final sections only.
- Landing pages are service pages: they show the registered name, like `/invest/`. The homepage stays brand-only.
- Placements on landing pages start with `lp_<landing>_`.

**Pending decisions:**
- New: #107 copy check, #108 completed bookings by page, #109 PostHog funnels and UTM convention, #110 pages 2–4, #111 route links.

---

### 📅 Date: 2026-10-16 | Session: S54 — Sample brief in plain words, brief on the first screen, WhatsApp logo

**What was done:**
The homepage sample brief now states its findings in plain words: a value, then one short sentence, with no metric names. We moved the brief up so it shows on the first screen of most phones and laptops. The call line is shorter: "30-minute call · No charge · No obligation". All WhatsApp buttons and the footer link now show the official WhatsApp logo.

**Why:**
Labels such as "Overlap" or "Lag benchmark" mean nothing to a retail investor; a sentence shows the problem at once. Before, the brief started at about 690px, so most visitors saw none of it without a scroll. The WhatsApp button had the same arrow as the booking button, so the two looked alike.

**How:**
`SampleBrief.astro` has a "What we found" list of three findings (overlap, market index over 5 years, fund costs). The hero uses `size="md"` with smaller gaps, and the trust strip moved below the brief (still in the hero). The brief now starts at about 535px. Button has a new `whatsapp` icon that leads the label; the glyph comes from Simple Icons 16.35.0 (CC0), is stored once in `src/lib/whatsapp.ts`, and uses `currentColor`. Lint and build pass; screenshots from headless Chromium. Commits `d570237`, `c61c4ec`, `cac24dc` on `dev`.

**Decisions made:**
- Findings in plain words, no metric names; "have not beaten their market index", not "benchmark".
- Correlation stays out of the hero card: Indian equity funds normally move together (0.9+), and overlap already shows the cause. Use it in the full brief, next to a comparison.
- The cost row stays (the review covers costs, handoff §2).
- Hero order: headline, subhead, actions, call line, sample brief, trust strip.
- Call line "30-minute call · No charge · No obligation" on the homepage and `/invest/`; `/about/` keeps its full sentence.
- Buttons stay rounded rectangles (10px); pills only for filters and tags.
- Official WhatsApp logo, one colour, before the label; arrows stay after the label.
- Homepage is for the brand (owner privacy): the final call has no owner name, photo or credentials; "Book a first call"; copy "Tell us your goals, or what worries you about your portfolio. We explain how we can help, and you decide what happens next." The person stays on `/about/`; the footer keeps the registered name with the ARN.
- Footer has "Verify ARN-… on AMFI ↗" (#106). The standard risk warning stays in the footer for now (likely required by the SEBI/AMFI advertisement rules; not yet checked against the AMFI FAQ PDF).
- Homepage is for the brand (owner privacy): the final call has no owner name, photo or credentials; "Book a first call"; copy "Tell us your goals, or what worries you about your portfolio. We explain how we can help, and you decide what happens next." The person stays on `/about/`; the footer keeps the registered name with the ARN.
- Footer has "Verify ARN-… on AMFI ↗" (#106). The standard risk warning stays in the footer for now (likely required by the SEBI/AMFI advertisement rules; not yet checked against the AMFI FAQ PDF).

**Pending decisions:**
- None new. #83 (real anonymised values) is still open. #102 updated: shorter wording, same meaning.

---

### 📅 Date: 2026-10-15 | Session: S53 — `/about/` mobile review and story rewrite: portfolio first

**What was done:**
We reviewed `/about/` on a phone, a tablet and a desktop. The layout already worked, so we fixed two small mobile issues: the avatar now sits beside the name, and small text links have taller tap areas. We replaced the S52 pull quote with a "Your portfolio first, then the product" story. We restructured the three principles into portfolio first, quantitative checks and qualitative checks. The profile card now has credentials as a paragraph, one ARN with a "Verify on AMFI" link, and copy about what the owner does with the investor.

**Why:**
The pull quote ("Separate the result from the reasons.") said nothing by itself. The new story states the brand reason: analytical rigour in fund distribution, so investors understand products, risks and fit, and are not surprised later. The profile card described the website ("I write our investigations"), not the service. The AMFI link lets a visitor check the ARN independently, which builds trust.

**How:**
Screenshots came from headless Chromium, because the Playwright MCP browser was not installed. The story uses `Section maxWidth="sm"` as one reading column. The qualitative checks list only what the owner confirmed: mandate and strategy, fund manager, fund house process. Published investigations stay quantitative. `AMFI_VERIFY_URL` is new in `src/lib/distributor.ts`; it opens AMFI's distributor search, not the ARN record. The build and the design lint pass. Commit `e491fd4` on `dev`.

**Decisions made:**
- Pull quote removed (reverses the S52 serif quote on `/about/`); story heading "Your portfolio first, then the product".
- No "false promises" wording: say what to expect, including the bad years (truth, no fear; no remarks about other distributors).
- Principles: portfolio first → quantitative → qualitative. Costs and fund size are not listed as qualitative checks.
- Profile opens "I am the AMFI Registered distributor behind Fund Investigator."; the section lead is removed.
- Booking button keeps the owner's name ("Book a call with {FIRST_NAME}") on `/about/` and the homepage.

**Pending decisions:**
- New: #106 reuse the AMFI verify link elsewhere (footer, `/invest/`).
- Updated: #90 credentials exist (photo still missing); #100 `/about/` now uses the SIF tagline constant.

---

### 📅 Date: 2026-10-15 | Session: S52 — Visual polish: warm hero glow, serif pull quote, hero grid removed

**What was done:**
We reviewed an outside list of seven visual changes against the code and the agreed rules. We kept two of them: a warm gold glow behind every dark hero (home, `/about/`, `/invest/`, `/reports/`) and the report serif (Newsreader) on the `/about/` pull quote. We also removed the faint grid from the homepage hero.

**Why:**
The site is an editorial, trust-led brand, so polish must look like a publication, not a software product. The glow gives the dark heroes warmth, and the serif quote links the brand story to the research voice. The grid showed at about 3% and only on the homepage, so it added code but no visible effect.

**How:**
`Hero.astro` now owns the glow for `background="dark"`, so pages do not add it. The glow is centred (the old spec put it at 85% for the split hero) at 0.08 opacity, chosen after headless Chrome screenshots at 0.05 and 0.08. `style_spec.md` §2 now allows serif for brand pull quotes (bold, no italic), and §10 records the glow. The build and the design lint pass. Commit `d1e654a` is on `dev`, not pushed.

**Decisions made:**
- Adopted: hero glow on all dark heroes (0.08, centred), owned by `Hero.astro`; serif pull quote on `/about/`; homepage grid removed.
- Rejected: frosted (blurred) header: it does not remove the dark edge and costs GPU on low-end phones; the spec records a move away from it.
- Rejected: card hover lift: the cards do not link anywhere, so a lift wrongly signals "click"; the proposed gold border also breaks the "no gold on white" rule.
- Rejected: a "Book a call" header button: it breaks the "three text links, no nav button" decision and "convert after value".
- Rejected: `SplitRows` mobile label change: the label already sits in a fixed column; the proposal was out of date.

**Pending decisions:**
- New: #105 section dividers (check on a phone first).

---

### 📅 Date: 2026-10-15 | Session: S51 — `/invest/` rebuilt: client journey, products, direct vs regular

**What was done:**
We gave `/invest/` one job: explain how investing with support works. The homepage pitches, and `/about/` shows the person. The page now runs: hero → a "You / We" journey in six stages → the products we offer (mutual funds, SIFs, GIFT City funds) → "Same fund. More support.", a direct vs regular comparison followed directly by the booking → a grouped FAQ that ends with a WhatsApp line. The site-wide tagline changed to the AMFI wording for SIF distributors, and the homepage now links to `/invest/` with a button.

**Why:**
The old page repeated the homepage: the four services, a five-step timeline and the first-call section said the same things three times. Visitors who arrive from the homepage need the "how", the costs and their answers, not a second pitch. Outside feedback showed the main doubt: "why pay more than a direct plan?", so the page now answers it with what the client gets.

**How:**
Two layouts were tried and dropped for length: a vertical timeline (about 2.5 phone screens) and an "Is this for you?" fit section. A new `SplitRows` component now shows both the journey and the comparison. It stacks with a fixed label column on phones and becomes a three-column table on desktop, and the "with us" column can carry the emphasis. A new `subtle` Card variant shows the "Already in direct plans, but want an expert opinion?" callout, which also says that investments through us are in regular plans only. Product and FAQ copy lives in `src/lib/products.ts` and `src/lib/faq.ts`. The build and the design lint pass, and we checked the layout in headless Chrome at 1280, 700 and 390 px. Commit `6a83d83` is pushed to `origin/dev`.

**Decisions made:**
- Page jobs: homepage = why us; `/about/` = the person and credentials; `/invest/` = how it works, products, costs and FAQ.
- Review frequency and brief timing are agreed on the call; the site states no tiers or day counts.
- Reply time: within 1 business day on WhatsApp; booking confirms at once.
- Tagline (AMFI rule for SIF distributors): "AMFI Registered Mutual Fund Distributor & SIF Distributor", site-wide from `TAGLINE`.
- The owner holds the MFD and SIF certifications; existing MFDs can distribute GIFT City funds.
- Service pages aim at conversion: promote with confidence, keep every claim true, and use no fear. The direct column stays fair fact.
- The FAQ stays on `/invest/`, last on the page; a separate page waits until it passes about 15 questions.
- Removed: the three-card costs section, the "Is this for you?" section and the separate "Ready to start?" section (merged into the comparison, which had no action). The registration card became a one-line strip that names the person.
- State what we are and what we do; no "what we are not" lines (the "not a SEBI-registered investment adviser" line is gone from `/invest/`). #87 and #89 resolved; #73 partly done.

**Pending decisions:**
- New: #99 draft copy check, #100 SIF tagline outside the site, #101 CAS channel, #102 "No charge for the call", #103 sample brief on `/invest/`, #104 unused `Timeline`.

---

### 📅 Date: 2026-10-14 | Session: S50 — Content guide v2 for the distribution pivot

**What was done:**
We wrote a second version of the content guide for the MF distribution business. Its goal is to establish authority with clients: inform first, then persuade, and promote the service and its differences. The first version stays, with only its goal line updated. The project instructions and README now point to v2 as the latest guide.

**Why:**
The old guide said "not a salesperson" and "understate when unsure". That fit a research site, but not a distributor who must win trust and bookings from ₹10 lakh–1 crore clients.

**How:**
v2 adds: "claim, then prove"; three page modes (promote on service pages, teach then invite on generic guides, evidence only on fund analyses); the three differences with their proof; persuasion do's and don'ts; and the handoff word list split into fixed MFD legal limits and changed tone choices. Docs only, so no build or lint run.

**Decisions made:**
- v2 (`docs/content_philosophy_v2.md`) is the latest guide (2026-10-14); v1 kept unchanged except its goal line.
- Fund analyses that name a scheme stay evidence-only and never link to the service.

**Pending decisions:**
- New: #96 stale handoff rules, #97 v1 vs v2, #98 confirm two v2 calls. Resolved: #93.

---

### 📅 Date: 2026-10-14 | Session: S49 — Funnel review and homepage v2: problems → services, differences, personal final call

**What was done:**
We reviewed the funnel from a prospective client's view, with PostHog data and screenshots, then designed a new homepage with the owner in a demo artifact (19 versions). We built it in the site: a stacked hero with a WhatsApp button, four service cards led by the client's problem, one fee line, "The Fund Investigator way" with three differences, guides with a subscribe strip that offers Deepdive access, and a final call with the owner's name. `/invest/` gained an "Our services" section and an FAQ, including direct vs regular plans.

**Why:**
The funnel was not live in production, the service and its differences were hard to see, and the page ended on the do-it-yourself route. Prospects with ₹10 lakh–1 crore need to see who they speak with, what each service includes, and how we are paid, before they book.

**How:**
New shared components (`ServiceCard`, `SectionHeading`, `CheckList`, `FaqList`) with copy in `src/lib/services.ts` and `src/lib/faq.ts`; a light `ReportCard`; owner photo and credentials read from config. One centre axis: headings, leads and buttons centred, card text left. Lint, contrast (24 pairs) and build pass; headless checks at 1440 and 375px show no sideways scroll; every button carries its placement. Branch `homepage-v2`, four commits.

**Decisions made:**
- SEBI RA rule retired: the owner's name, credentials and "expertise" may be used. The name appears in the final section, not in the differences section.
- Hero stacked and centred at every width; existing subhead kept; gold "Book a first call" plus "Contact on WhatsApp"; trust strip before the sample brief, which stays labelled "Sample".
- Problems and services merged; Portfolio review starts with goals and risk profile, then existing funds, if any. Service cards use bullets; difference cards use short paragraphs with no icons.
- Fee line: "No separate fee from you. Our commission is part of the fund's yearly expense ratio, and we disclose it transparently before you select your funds." Commission in writing sits in Fund curation and the differences; the direct vs regular comparison lives only in the `/invest/` FAQ.
- Differences: Analysis and evidence, Portfolio first, Transparent and personal. Mission lead: "Because Indian fund investors deserve fund choices backed by evidence and a portfolio-first approach."
- Guides first, then the subscribe strip; plain "Subscribe" (secondary). Gold means booking only. Deepdive leaves the homepage and moves to email access via the subscription.
- Final section white and stacked; "Book a call with Ishpreet". At most one primary, one secondary and one text link per section.

**Pending decisions:**
- New: #90 photo and credentials, #91 Deepdive email access, #92 footer tagline, #93 content guidelines, #94 AMFI FAQ check, #95 push and PR. Updated: #55, #62, #75, #84, #87, #88, #89. Resolved: #29, #56, #79 (S48), #82.

---

### 📅 Date: 2026-10-14 | Session: S48 — Homepage hero says what we do

**What was done:**
The hero subhead now names the service (mutual funds and SIFs, for beginners and existing investors), the button reads "Book a first call", and a trust strip (AMFI ARN, 40+ fund houses, disclosures) sits under the hero. The homepage title and description describe the service.

**Why:**
The hero promised investigation but did not say that we help people invest.

**How:**
Copy changes in `src/pages/index.astro`, `SampleBrief`, `CredibilityStrip` and `schema.ts` (commit `f5d6d86`).

**Decisions made:**
- Subhead "Build and improve your portfolio with our help and expertise in mutual funds and SIFs."; hero button "Book a first call".

**Pending decisions:**
- None new. #79 resolved.

---

### 📅 Date: 2026-10-12 | Session: S47 — Funnel actions: homepage and `/invest/` restructured for a distribution-led site

**What was done:**
We reviewed outside feedback on the homepage actions and agreed a new funnel (`docs/homepage_funnel_recommendations.md`, deleted 2026-10-14; see git history). The homepage hero now has one booking button with the call details below it. A new card invites first-time investors, and the costs section is renamed "What do you pay for our services?", with the points before the buttons. The email button became secondary, and the Deepdive and navigation labels became clearer.
On `/invest/` we removed "Who we help", the "Not the right fit" box and all labels. "How it works" now follows the hero, and a new "What happens in the first call" section serves both existing and first-time investors.

**Why:**
The owner pivoted to a distribution-led site: booked calls are the goal, and Deepdive is an optional route for DIY visitors. The old pages assumed every visitor already had a portfolio, so beginners had no route. Repeated links and sections slowed the decision.

**How:**
Changes use the shared components and one new token (`grid-rows-fi-lead`). On phones, each problem and answer pair now merges into one card. Lint, contrast (24 pairs) and build pass. Headless checks at 1440, 768 and 375px show no sideways scroll. The beginner button tracks as `review_booking_click` with placement `homepage_beginner`.

**Decisions made:**
- Distribution-led site; Deepdive is a secondary, last-placed route (supersedes the co-equal hub rule of 2026-10-04).
- Homepage hero: keep the headline and subtitle; one gold button; below it "30-minute first call · No charge for the call · No obligation to invest through us". "No charge" applies to the call only.
- Homepage section 2: beginner card "Making your first mutual fund investment?" with "Discuss your first investment" (secondary) and "How support works →" to `/invest/#how-it-works`. "Why Fund Investigator exists" link removed; About stays in the navigation.
- Homepage costs: heading "What do you pay for our services?" (not "Fund Investigator's Promise", which hides the answer and risks reading as an assurance); no intro text or costs link; points, then Book and WhatsApp, then the ARN line.
- Labels: "Invest with support" (navigation, sentence case everywhere), "Check a fund with Deepdive", "Ask a question on WhatsApp" on every page.
- `/invest/` flow: hero → How it works → What happens in the first call (For everyone; If you already invest; If this is your first investment; button "Book your call") → "AMFI-registered, and open about how we are paid." → Ready to start? No hero fee sentence, and the call details appear once.
- The portfolio review needs the client's holding details, so the site never says "no documents to send" for existing investors.
- Page copy shows the result and broad steps; the procedure goes in the booking confirmation.
- First-call tracking keeps the `invest_review` placement so earlier data stays comparable.

**Pending decisions:**
- #87 first-call copy (before release), #88 Zoho update (owner), #89 direct vs regular wording. Updated: #60, #62, #82, #84. Still open: #65, #75, #78, #79, #80.

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
