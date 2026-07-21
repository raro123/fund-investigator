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
| 8 | Option C "Suggest a Fund" email capture — revisit trigger. **S17 update:** resurfaced as a mid-article subscribe pitch — "Want your fund investigated? Subscribe and reply with its name." Copy drafted but not shipped; it is a real commitment (reader replies must feed the investigation queue), so it waits until we are ready to honor requests | 2026-06-22 | S6; revisited S17 | 🟡 Parked |
| 9 | Preserve signup-source evidence (`hero_guide` vs `homepage_bottom`) through the Substack cutover. Substack's iframe may limit confirmed per-placement attribution, but first-party impressions and CTA interactions should still be recorded | 2026-05-04 | S2; expanded S15; moved to Substack S16 | 🟡 Open |
| 10 | MailerLite endpoint abuse protection (double opt-in, rate limiting, honeypot/Turnstile) | 2026-05-04 | S2; expanded S15 | ⏸ Deferred S16 for the one-day Substack cutover; close when `/api/subscribe` is removed, but implement double opt-in first if the migration slips |
| 11 | Add production monitoring and conversion telemetry for modal opens, attempts, successes/failures, and signup source. Provider-failure monitoring becomes moot when MailerLite is removed; placement evidence remains useful with Substack | 2026-05-04 | S2; expanded S15; revised S16 | 🟡 Partially carried into Substack cutover |
| 12 | Homepage teaser punchline — keep long-term vs shorter variant | 2026-05-04 | S1 | 🟡 Open |
| 13 | Extract a reusable "Why Fund Investigator" component if reused on more pages | 2026-05-04 | S1 | 🟡 Open |
| 14 | Editorial serif headline vs current sans for the hero | 2026-06-22 | S3 | 🟡 Open |
| 15 | Hero verdict card framing (negative vs neutral) | 2026-06-22 | S3 | ✅ Resolved (S5 — qualitative directional findings) |
| 16 | Real fund data vs placeholders in verdict examples | 2026-06-22 | S3 | ✅ Resolved (S5 — qualitative, no figures) |
| 17 | Implement the hybrid homepage vs iterate mockups further | 2026-06-22 | S3 | ✅ Resolved (S5 — implemented) |
| 18 | Email-capture framing (method walkthrough vs notifications vs personalised) | 2026-06-22 | S4 | ✅ Resolved (S6 — Option B notifications) |
| 19 | Welcome-kit delivery automation in MailerLite | 2026-05-04 | S2 | ✅ Resolved (S6 — dropped with Option B) |
| 20 | Write "The First Five Checks" guide — the hero modal now promises it; blocks merge to prod | 2026-07-11 | S9 | ✅ Resolved (S11 — guide written and published as a Methodology report) |
| 21 | Make the hero guide exchange match what it promises: explicitly disclose the ongoing subscription, expose the open guide before signup, and include the Five Checks link in the Substack welcome email | 2026-07-11 | S9; expanded S15 | ✅ Resolved (S17 — moot: the signup modal was removed entirely; the hero links straight to the public guide and the subscribe ask moved to after the reader has seen the value) |
| 30 | **Move email capture and distribution to Substack while keeping Astro as the canonical content home.** Substack will own capture, double opt-in, the welcome email, newsletters, and network distribution; FundInvestigator.com retains every full investigation. Substack carries teasers, summaries, Notes, and publication updates linking back—not duplicate full reports. Use a dedicated Fund Investigator brand-owned Substack account and add the personal account as an admin. Do not retain MailerLite in parallel after cutover. Existing trade-offs remain: uncustomizable iframe and weaker per-placement attribution; $50 custom subdomain with Substack sender; exportable subscriber data; standard paid fee of 10% plus Stripe subject to the current India exception, with #3 required before paid is enabled | 2026-07-15 | S13; reviewed S15; approved S16 | 🟢 Approved; implementation in progress |
| 22 | Hero fund-search console — replace the primary CTA with a live fund lookup that deep-links into Deepdive (design agreed, build parked) | 2026-07-12 | S10 | 🟡 Parked |
| 23 | Add `?fund=<scheme_code>` deep-link support to the Deepdive app — prerequisite for #22, and useful on its own for linking a report to the fund it investigates | 2026-07-12 | S10 | 🟡 Parked |
| 24 | Add JSON-LD `Article` structured data to `ArticleLayout` (SEO/AIO) — parked as its own commit; touches all report pages, so it should not ride inside a content branch | 2026-07-12 | S11 | ✅ Resolved (S12 — Article + Organization + WebApplication shipped in its own commit) |
| 25 | Two parallel drafts of the five-checks guide now exist (this session's, and another agent's "Five Questions a Return Number Cannot Answer"). Both are published locally for review; decide which to keep or how to merge | 2026-07-12 | S11 | ✅ Resolved (S12 — kept "Five Questions"; the other draft and its assets deleted) |
| 26 | Nothing on the site links to the guide — the modal only promises it by email. An open guide reachable solely through a signup form is an odd shape; consider a "read it now" link alongside the email field | 2026-07-12 | S11 | ✅ Resolved (S13 — "Or read it now →" link in the modal's success state; the guide is also publicly listed on /reports, so it was never truly gated) |
| 27 | OG/cover images: no report sets `coverImage`, so every share of every report shows the same generic card, and the Article JSON-LD carries it as `image`. **Decided against** wiring up the existing `cover.png` files — they are raw chart exports, illegible at feed size (~500px), so they would be wrong in a new way rather than better. Proper fix = a templated 1200×630 card (dark brand bg, title in large type, one headline metric, small logo), ideally auto-generated at build (`astro-og-canvas`/Satori) so future reports get one for free. Parked as its own piece of work. Note: `Layout.astro` hardcodes `og:image:width/height` as 1200×630, which becomes a false claim the moment a differently-sized cover is set — fix alongside. **S14 update:** manual wiring of the existing `cover.png` files was tried and reverted — they mis-declare the hardcoded 1200×630 dimensions (actual 1150×400 / 1805×875) and one even resolved to a broken URL, confirming #27's original call. Automation costed: **build-time only, ₹0 runtime/cloud** (static PNGs on Cloudflare Pages; ~50–150 ms/image in existing CI). Stack choice: **Satori + `@resvg/resvg-js`** (full flexbox control — can place the headline metric) over `astro-og-canvas` (config-only, can't). Card = dark `fi-dark` bg + title + `keyMetrics[0]` + logo, title-only fallback for reports without metrics. Still parked — "let it be for now" | 2026-07-14 | S12 | 🟡 Parked |
| 28 | "The outperformance was steady" in the HDFC report is contradicted by its own corrected data (+15% in 2022 vs +4–8% elsewhere) | 2026-07-14 | S12 | ✅ Resolved (S13 — rewritten: consistent in direction, uneven in size) |
| 29 | Author in the structured data is the Organization, not a named person — a personal byline is deferred until SEBI Research Analyst certification. Revisit once certified (`authorRef()` in `src/lib/schema.ts` is isolated so the swap is one line, but it needs a visible byline alongside it) | 2026-07-14 | S12 | 🟡 Parked |
| 31 | **Launch the Substack Five Checks series as individual investigations of popular funds.** The intended reader already owns or is considering the named fund. Select funds for popularity and prospect relevance, then report whatever the five checks show; include a popular fund with weaker or mixed evidence early to establish editorial independence. Do not add fund comparisons or suitability conclusions until an explicit individual risk-profile layer and its editorial boundaries exist | 2026-07-21 | S19 | 🟢 Approved; editorial strategy documented |
| 32 | **Article plan #4 — Add curated related investigations.** Show up to two manually selected current reports after an article's conclusion, reject archived destinations, and keep historical reports limited to their successor notice | 2026-07-22 | S20 | 🟡 Open |
| 33 | **Article plan #5 — Complete the final whole-system verification.** Audit internal links and subscription destinations, check accessibility, inspect mobile and laptop presentation, and run the production build after the remaining article work is complete | 2026-07-22 | S20 | 🟡 Open |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

---

### 📅 Date: 2026-07-22 | Session: S20 — Article catalogue and subscription journey consolidated

**What was done:**
The current investigation catalogue was reduced to the Five Checks methodology, Parag Parikh Flexi
Cap, and ICICI Prudential Large Cap, while the older HDFC and PPFAS reports remain public historical
snapshots that are no longer listed on the site. The report ending now gives subscription one clear
primary action, and the Key Takeaways subscription prompt is inserted automatically. Direct Subscribe
links were also added locally to the desktop header, mobile menu, and footer with separate placement
markers; the owned `/newsletter` page was deliberately deferred.

**Why:**
Keeping dated reports live preserves their URLs and history without confusing readers about which
analysis is current. Asking for a subscription only after evidence has been delivered, while removing
a competing end-of-article Deepdive panel, gives interested readers a clearer next step.

**How:**
Report lifecycle metadata and a reusable historical notice keep archived pages explicit and link them
forward to current work, while catalogue filters keep them unlisted. A build-time Markdown transformer
adds the approved inline Investigation Brief prompt after Key Takeaways, backed by report-aware build
validation; Deepdive remains linked contextually inside the articles. Shared Substack URL generation
now distinguishes article, header, footer, and homepage placements.

**Decisions made:**
- Keep the older HDFC and PPFAS reports published and indexable, but remove them from the homepage,
  Investigation Reports page, and machine-readable investigation listing.
- Use "Investigation Reports" as the catalogue heading. Feature only the Five Checks methodology and
  current PPFAS investigation; keep the current ICICI investigation published but unfeatured.
- Make subscription the sole prominent article-ending action. Keep Deepdive links contextual within
  each investigation rather than presenting a competing closing panel.
- Use "Subscribe for Investigation Briefs" with "Get notified when we publish new fund research or
  update an existing investigation." The button label is "Subscribe" and subscription handoffs use
  the same tab.
- Automatically insert the quiet Key Takeaways subscription link at build time and reject missing
  Key Takeaways sections or manually duplicated `/subscribe` links in current reports.
- Add direct Subscribe discovery to the header, mobile menu, and footer. Defer an owned `/newsletter`
  page until there are enough briefs to justify an explanatory or representative-issue page.
- Leave the existing article masthead and individual narrative flow flexible. The analysis period
  belongs in Investigation Settings, and the article pattern is guidance rather than a rigid sequence.

**Pending decisions:**
- #32 — Add curated related-investigation links after the conclusion, limited to current reports.
- #33 — Complete the final internal-link, accessibility, responsive-layout, and production-build audit
  after the related-investigation work is complete.

---

### 📅 Date: 2026-07-21 | Session: S19 — Substack Five Checks series formalised

**What was done:**
Formalised the editorial strategy for the Substack Five Checks series. The launch sequence now starts
with the methodology and continues with concise investigations of individually selected popular funds.
The Substack plan now defines the audience, fund-selection principles, brief length and structure,
hook pattern, editorial boundaries, and the role of a deliberately mixed set of historical outcomes.

**Why:**
Popular fund names create a direct entry point for prospects who already own or are considering those
funds. Applying the same method to both stronger and weaker historical records demonstrates that Fund
Investigator reports evidence rather than promoting products.

**How:**
Each 650–900 word fund brief will summarise all five checks, expand the two or three findings that
define the fund's story, use one supporting chart, state the limitations, and link to the complete
investigation. Hooks will move from reader relevance to headline evidence, counter-evidence, and the
question the investigation resolves.

**Decisions made:**
- Launch with the five-check methodology, followed by individual investigations of popular funds.
- Write for prospects who own or are considering the named fund; the project owner retains fund
  selection and publishing order.
- Select funds for popularity and relevance before knowing or using the performance outcome.
- Include a popular fund with weaker or mixed evidence early, described through specific metrics,
  benchmark, and analysis period rather than a "bad fund" label.
- Do not publish comparison or ranking briefs at this stage. Revisit comparisons only after an
  individual risk-profile layer and its editorial boundaries exist.
- Do not make suitability conclusions, recommendations, pass/fail assessments, or traffic-light
  ratings in the briefs.

**Pending decisions:**
- None. The individual fund queue remains an ongoing editorial choice rather than a blocked decision.

---

### 📅 Date: 2026-07-21 | Session: S18 — Homepage credibility strip tightened across viewports

**What was done:**
Refined the credibility band below the homepage hero so its three trust markers stay together on
small screens and read as one compact line on larger screens. The band now says "Data-backed",
"Reproducible", and "No commissions", followed by a separate "Analysis powered by Deepdive"
attribution. The live styleguide now documents the pattern.

**Why:**
The previous mobile layout could strand a separator at the end of one line and leave a marker alone
on the next. "No commissions" is also a more specific, investor-relevant trust signal than the
broader "Independent" claim.

**How:**
The band now uses a dedicated responsive component with structural dividers instead of wrapping dot
characters. It uses a compact two-row treatment below tablet width and a single uppercase row from
tablet upward; checks from 320px through 1440px confirmed no horizontal overflow.

**Decisions made:**
- Keep the short dev hero and full-width credibility band; do not restore the old HDFC proof card.
- Use `Data-backed · Reproducible · No commissions` as the standing marker set.
- Treat Deepdive as a separate product attribution, not a fourth trust marker.

**Pending decisions:**
- None.

---

### 📅 Date: 2026-07-17 | Session: S17 — Subscription flow reworked: convert after value, never intercept

**What was done:**
Reworked how the site asks readers to subscribe. The hero's guide-signup modal was removed — the
"first five checks" link now goes straight to the public guide. The subscribe ask moved to the two
moments where a reader has already received value: a one-line ask closing every report's "Key
takeaways" table (for skimmers), and a subscribe band at the end of every report (for finishers).
The homepage bottom button was relabelled "Subscribe to Fund Investigator", and a site-level
`/subscribe` address was added so article content links to it instead of hardcoding the Substack
URL. Dead signup components from the MailerLite era were deleted.

**Why:**
The old hero link promised content but delivered a signup pitch — an interception pattern at odds
with the site's honesty positioning. Readers who skim only to the takeaways table also never saw
any subscribe ask. Asking after value is delivered should produce fewer but better subscribers,
which fits the authority-building goal better than raw list size.

**How:**
The article layout now renders the subscribe band on every report automatically; the takeaways
ask is a standard line documented in the report template. `/subscribe` is a static redirect
defined once in the site config, reusing the shared Substack URL helper, so the newsletter
address lives in exactly one file. Placement markers (`article_takeaways`, `article_end`,
`homepage_bottom`) replace the retired `hero_guide` for future attribution.

**Decisions made:**
- Convert-after-value is the standing rule for subscribe asks: no interception, and every ask sits
  after delivered value (closes #21 — the modal it concerned no longer exists).
- Buttons carry the Fund Investigator brand, not Substack's; the article band keeps a small
  "delivered by Substack" cue and all subscribe buttons keep the external-link icon.
- Mid-article copy: "Stay updated with our latest investigations. Get the next one in your inbox."
- Funnel tracking deliberately deferred — build the audience first (#11 unchanged).

**Pending decisions:**
- #8 revisited: the "request an investigation of your fund" subscribe pitch is drafted but parked
  until reader requests can actually be honored.

---

### 📅 Date: 2026-07-15 | Session: S16 — Substack migration approved and started

**What was done:**
Approved the hybrid Substack model and began setting up the Fund Investigator publication. The
website remains the home of full investigations; Substack will publish teasers, summaries and
newsletter updates that bring readers back to those investigations. No site cutover or MailerLite
removal was completed in this session.

**Why:**
Substack consolidates capture, confirmation, welcome delivery and newsletter distribution while
adding a discovery network. Since the intended cutover is one day away, spending time hardening an
endpoint that will immediately be removed would add temporary work without improving the final
system.

**How:**
The publication is being created under a dedicated Fund Investigator brand account, with the personal
Substack account added as an administrator for day-to-day work. After the Substack signup and welcome
flow are ready, the two homepage captures will switch over, opted-in MailerLite subscribers will be
migrated, and the MailerLite function, credentials and disclosures will be removed.

**Decisions made:**
- #30 approved: Substack is the sole email capture and distribution system after cutover; MailerLite
  will not run in parallel.
- Full investigations remain exclusively on FundInvestigator.com. Substack carries teasers,
  summaries, Notes and update emails with links back.
- Use a brand-owned Fund Investigator Substack account and give the personal account admin access.
- Defer MailerLite double opt-in, rate limiting and Turnstile for the planned one-day transition. If
  the migration slips and `/api/subscribe` remains live, double opt-in is the first interim safeguard.

**Pending decisions:**
- #30 — finish the Substack publication, choose/connect its public subdomain, configure double opt-in
  and the welcome email, and verify the complete signup flow before switching the site.
- #21 — put the Five Checks link in the welcome email and expose the open guide before signup.
- #9/#11 — preserve as much placement evidence as the Substack embed permits.
- Cutover cleanup — import only opted-in MailerLite subscribers, update the privacy policy and form
  copy, then remove `/api/subscribe`, MailerLite environment variables and credentials.

---

### 📅 Date: 2026-07-15 | Session: S15 — Email capture reviewed; hybrid Substack migration recommended

**What was done:**
Reviewed both homepage email offers end to end: the Five Checks modal in the hero and the new-
investigation form near the bottom. Both are functional and feed the same protected MailerLite
integration, but they currently arrive as identical email records, carry no source or conversion
measurement, and do not fully honour the guide offer. No form or infrastructure code was changed.

**Why:**
The two placements address different reader intentions, so list growth alone cannot say which one is
working or what the subscriber expected. The operating-cost question also changed in June 2026:
MailerLite's free tier is now capped at 250 active subscribers and 2,500 monthly sends, strengthening
the case for a lower-ops distribution layer before the list grows.

**How:**
Traced each form from its page copy through the shared component and Cloudflare function, checked the
success, failure, consent, abuse, no-JavaScript, and keyboard paths, and compared the current official
MailerLite and Substack capabilities and pricing. Substack was assessed as an email/distribution
spoke, not as a replacement for the Astro site.

**Decisions made:**
- Keep two capture placements only as two explicit offers: the hero is guide-led; the lower section
  is a plain new-investigation alert. Both may join one publication, but their source must be recorded.
- Recommend Substack for capture, welcome email, newsletter delivery, and network discovery, while
  keeping full investigations exclusively on FundInvestigator.com. Substack carries excerpts or a
  distinct editorial format that links back.
- Treat the migration as a recommendation, not an implementation decision. No provider, page, or
  subscriber data was changed in this session.

**Pending decisions:**
- #30 — approve or reject the hybrid Substack migration and choose the public newsletter subdomain.
- #21 — fix the hero's guide-delivery and subscription-consent mismatch regardless of provider.
- #9, #10, #11 — add source attribution, abuse protection/double opt-in, and conversion/failure
  telemetry if MailerLite remains; preserve equivalent evidence if Substack is adopted.
- #3 — resolve the SEBI Research Analyst implications before enabling paid subscriptions anywhere.

---

### 📅 Date: 2026-07-15 | Session: S14 — Report pages now carry their publisher; OG-card automation costed and re-parked

**What was done:**
Report pages were self-describing their author and publisher only by reference — pointing at a
company record that was defined solely on the homepage — so the reference dangled on every article.
The full company record (plus the site record) is now emitted on each report page too, so the
references resolve for search and AI engines reading a single article in isolation. We then re-opened
the parked question of giving each report its own share image, priced out the automatic-generation
route end to end, and chose to leave it parked for now with the trade-off written down.

**Why:**
Structured data is only useful if it resolves: an article that credits a publisher which isn't
present on the page is a loose thread a validator (and an AI answer engine) will drop. On the image
question, the temptation was to wire up the existing chart exports as covers — but that repeats the
mistake #27 already ruled out (they are illegible at feed size) and would have made the page's
declared image dimensions a false claim, since the layout hardcodes 1200×630.

**How:**
The company and site records are added to the structured-data block in the article layout, so they
sit alongside the article record the references point to. For the share images, the automatic route
is a build-time image generator (Satori, the engine behind Vercel's OG cards): it renders a branded
1200×630 card — dark background, title, one headline metric, small logo — into a static PNG at build,
so every current and future report gets one for free with no per-report work.

**Decisions made:**
- Full company + site records now emitted on report pages, not just the homepage — author/publisher
  references resolve everywhere. Shipped this session.
- Manually wiring the existing `cover.png` chart exports as covers was tried and reverted — it
  contradicts #27 and mis-declares image dimensions. See #27.
- OG-card automation costed: **build-time only, zero runtime/cloud cost** (static PNGs served by
  Cloudflare Pages like any asset; ~50–150 ms/image inside existing CI). Recommended stack is
  Satori + `@resvg/resvg-js` over `astro-og-canvas`, because only Satori can place the headline
  metric #27's card calls for. Deferred anyway — "let it be for now."

**Pending decisions:**
- #27 — OG/cover images. Now updated with the library/card trade-off and cost; still parked.

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
