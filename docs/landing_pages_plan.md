# Landing pages plan

**Moved off `dev` (2026-10-19):** the four pages are out of this release. They live on the `landing-pages` branch (cut from `dev` at `a82408f`), for later work; `dev` has no landing pages and no links to them (footer column, `llms.txt` and the styleguide Route Cards demo removed). The status below describes that branch.

**Status (2026-10-17, S60):** All four pages are built on `dev` and indexable, and all four are in the sitemap (owner, S60: every page goes through the compliance check before release anyway). Discovery appears early, each landing page keeps its three CTA pairs, the middle pair follows value/proof and costs, and each journey has three stages. The suitability, SIF promotion, GIFT City tax and transaction-readiness reviews (#110, #60) still gate the release to `main`.
**Why:** The owner is a new MFD without client referrals. Clients will come from content (articles, YouTube, X). Each piece of content links to the landing page that matches the reader's situation. The pages are also the test: which situations bring clients worth having, for a solo practice.
**Rules:** `docs/content_philosophy_v2.md` (copy and legal limits), `docs/mfd_funnel_handoff.md` (funnel decisions), `CLAUDE.md` (design system).

## 1. Strategy

- **Keep the promise; test who responds.** One brand, one service, one booking. The pages change the reader, the proof and the questions, not the offer.
- **Start from the reader's situation, not a demographic.** "I have savings and want to start in the markets" tells us why they need help now.
- **Every product gets its own way in.** SIF and GIFT City funds get separate pages from the start. Readers arrive with different questions ("Should I invest in a SIF?" vs "How do I hold US dollars from India?"). A combined "beyond mutual funds" page matches neither search and hides which product drew the interest.
- **Content that feeds a page is a generic guide** (names no fund), written for the reader's question in plain words. Fund analyses that name a scheme never link to these pages (content guide, "Two Modes").

## 2. Pages and slugs

| Order | Slug | Reader | Product | Landing id |
|---|---|---|---|---|
| 1 | `/invest/portfolio-review/` | Already invests; unsure the funds make sense together | Mutual funds | `review` |
| 2 | `/invest/start-investing-mutual-funds/` | Has savings, wants to take part in financial markets; new to them | Mutual funds | `start` |
| 3 | `/invest/sif/` | Experienced investor asking whether a SIF suits them | SIF | `sif` |
| 4 | `/invest/gift-city-funds/` | Wants US dollar assets from India, including NRIs | GIFT City funds | `gift_city` |

`/invest/` stays the general service page. `RouteCards` (data in `src/lib/routes.ts`) shows three situations (Already investing · Starting out · Beyond mutual funds). They were on `/invest/#products`, before `#how-it-works`, until 2026-10-19, when they were removed: they sent warm visitors (mostly from the homepage) away to the landing pages before the journey answered how it works. The product facts stay in the `/invest/` FAQ, and the SIF and GIFT City suitability line moved into the Fund selection stage. The homepage does not link the landing pages (owner, S61): they get their traffic directly (search, ads, shares), and the footer on every page and the sitemap cover discovery (`/invest/` no longer links them, 2026-10-19). Check `landing_view` referrers before revisiting. The footer's "Invest with support" column links all four pages. Final product cross-sells were removed from review, SIF and GIFT City; the beginner page retains its relevant existing-investor review link. Shared header and footer policy are unchanged pending review.

**Page 2's proof:** `<SampleBrief variant="start" />`, a sample starting brief (never a "plan": "financial planning" is a legal limit).
**Before pages 3 and 4 are merged to `main` or shared widely:** check the SIF promotion rules (handoff §2, decision 9) and the GIFT City tax, LRS and reporting points; confirm we can place transactions in both (#60). `noindex` and the sitemap filter were removed in S60.
**Shared pieces:** `ContactActions` keeps the existing booking/WhatsApp placements and message mappings. `OwnerIntro` introduces the owner with one credential from `distributor.ts` beside the early proof. `AssessmentPreview` shows the SIF/GIFT City written-assessment checklist, not a completed client result. `SampleBrief` remains explicitly illustrative: the review adds a practical implication; the starting example keeps its emergency reserve outside the investment mix and labels its amount/timing/fund count as examples, not minimums. These shared components are demonstrated in `/styleguide`. Every page retains `trackView="landing_view"` and its `trackLanding` id.

## 3. What every landing page has

1. **One reader, one promise, one action.** "Book a first call" is the gold button; WhatsApp is secondary.
2. **Message match.** The headline repeats the promise of the content that sent the reader, in their words.
3. **Hero:** the situation, what we do, what you get, the call details (30 minutes, no charge for the call).
4. **Value and proof first.** Review → four checks and sample brief; start → goals, reserve, suitable mix and sample starting brief; SIF/GIFT City → compact fit/facts plus assessment preview. Owner identity appears early. Duplicate problem/fit sections are combined rather than compressed with smaller type.
5. **How we are paid, then the middle CTA.** Commission and costs in writing before the decision. MF pages explain the regular plan expense ratio; direct plans exclude distributor commission and may be managed DIY or with a separately paid registered investment adviser.
6. **Visible risks and minimums.** No blanket "not for" list. SIF minimum/risks remain prominent. GIFT City shows both underlying investment risk and currency risk, with visible Resident in India and NRI blocks. Resident LRS guidance is not reused as NRI setup instructions.
7. **Three stages.** First conversation → assessment/brief after holding details where needed → investor decision, setup and support. The investor approves transactions and pays the provider directly. No new delivery-time promises.
8. **Relevant questions.** Beginner FAQ starts with amount, access and market risk; FD concerns appear later. GIFT City questions are visibly grouped by residence, followed by shared questions.
9. **Keep the page focused.** Remove unrelated final product cross-sells; no extra popups or sticky UI.
10. **A closing call to action.** Phone first; footer identity and risk warning (site-wide).
11. **Compliance:** no scheme or fund house names, no return claims, no "advice", "free" or "research" as a label.

## 4. Conversion tracking

Path: content → landing view → click → booking or WhatsApp → call → client → amount invested.

| Step | How | State |
|---|---|---|
| Source | UTM on every link we post: `utm_source` (youtube, x, article), `utm_campaign` (the landing id), `utm_content` (the piece). PostHog records UTM tags on page views | Owner, per post |
| Landing view | `landing_view` with a `landing` property, sent on load (Layout `trackView` + `trackLanding`) | Built in S55 |
| Click | `review_booking_click` and `conversation_request` with `lp_<landing>_<section>` placements (`hero`, `cta`, `final`) | Built (S55, S56) for all four |
| WhatsApp | One prefilled text per placement that names the topic, so the chat shows the source | Built (S55, S56) for all four |
| Booking completed | Zoho takes no `ref`. Now: a required Zoho question "What would you like help with?" (Review my portfolio · Start investing · SIF · GIFT City funds · Other), extends #88. Check the Zoho plan for one service per page (own URL) or a redirect to a `/thanks/` page that fires `booking_completed` | Owner |
| Call → client | One sheet: date, name, landing, source, call held, client (yes/no), amount, products, hours spent. Update after every call; review monthly | Owner |

**Reading it:** one PostHog funnel per page (`landing_view` → booking click), broken down by `utm_source`, plus the sheet. Judge each page after about 3 months on calls held, clients, average amount and hours per client, not visits. Write the thresholds down before the first content goes out.

## 5. Build order

1. Template and tracking with page 1 (`/invest/portfolio-review/`). S55.
2. Pages 2–4, the starting brief and the shared components. S56.
3. Situation routes built (S58), moved earlier and landing pages streamlined (S59). Implementation and browser review are complete; separate launch-readiness items remain.
4. S60: `noindex` and the sitemap filter removed from pages 3 and 4; both added to `llms.txt`. GIFT City page reordered to match the SIF page (at a glance → assessment preview → residence routes → costs with an "Everything in writing first" card), with "Consider it if" as the fit label on both pages and a hero credibility strip without the mutual-fund-only "40+ fund houses" marker. Portfolio-review hero shortened (no eyebrow, one paragraph).

### S59 validation

- `npm run lint:design` passes, including all 24 configured contrast pairs.
- `npm run build` passes for 19 pages, including H1, internal-link, image-alt and metadata validation. The SEO dependency reports missing-source sourcemap warnings; these do not fail the build.
- Local browser review covered the homepage, `/invest/` and all four landing pages at 390px, plus all four landing pages at 320px. No horizontal document overflow or nested page sections; the beginner FAQ expands correctly. Desktop layout was also inspected.
- All twelve landing-page booking placements and their booking destinations are preserved. SIF and GIFT City still render `noindex`.
- At 390px, the homepage portfolio-review route moved from approximately 6,300px to 3,500px down the page. The middle landing-page booking actions appear approximately 26–32% earlier. These are layout measurements, not evidence of improved conversions.
- No commit, push, deployment, external booking or analytics configuration change was made.

## 6. Separate pending actions

These are backlog items, not findings resolved by the copy implementation:

- Review the shared header/footer links on named-fund analyses against the content-mode rule. No shared navigation changes were made here.
- Both guides currently featured on the homepage still name schemes in their body; they must not be treated as generic landing-page feeders merely because their card copy is generic. Review/replace that feeder content separately.
- Complete SIF promotion and GIFT City tax/LRS/TCS, eligibility and transaction-readiness checks (#110, #60) before merging to `main`. Since S60 the pages are indexable, so this check is the only gate.
- Extract the repeated landing-page markup into components (#112).
- Confirm suitability boundaries and the service's deliverables/limits before release; this copy edit is not a suitability-policy review.
- Complete booking attribution and PostHog funnel setup (#108–#109). Existing clicks are not evidence of completed bookings. Zoho, WhatsApp and tracking infrastructure were not changed.
