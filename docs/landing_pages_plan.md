# Landing pages plan

**Status (2026-10-17, S56):** All four pages are built on `dev`, with draft copy for the owner to check (#107, #110). `/invest/sif/` and `/invest/gift-city-funds/` are `noindex` and out of the sitemap until their compliance checks are done (#110); they work for links we share. Open items: #107–#111 in `docs/project_log.md`.
**Why:** The owner is a new MFD without client referrals. Clients will come from content (articles, YouTube, X). Each piece of content links to the landing page that matches the reader's situation. The pages are also the test: which situations bring clients worth having, for a solo practice.
**Rules:** `docs/content_philosophy_v2.md` (copy and legal limits), `docs/mfd_funnel_handoff.md` (funnel decisions), `CLAUDE.md` (design system).

## 1. Strategy

- **Keep the promise; test who responds.** One brand, one service, one booking. The pages change the reader, the proof and the questions, not the offer.
- **Start from the reader's situation, not a demographic.** "My savings are in FDs" tells us why they need help now.
- **Every product gets its own way in.** SIF and GIFT City funds get separate pages from the start. Readers arrive with different questions ("Should I invest in a SIF?" vs "How do I hold US dollars from India?"). A combined "beyond mutual funds" page matches neither search and hides which product drew the interest.
- **Content that feeds a page is a generic guide** (names no fund), written for the reader's question in plain words. Fund analyses that name a scheme never link to these pages (content guide, "Two Modes").

## 2. Pages and slugs

| Order | Slug | Reader | Product | Landing id |
|---|---|---|---|---|
| 1 | `/invest/portfolio-review/` | Already invests; unsure the funds make sense together | Mutual funds | `review` |
| 2 | `/invest/start-investing/` | Savings in FDs or a savings account; new to markets | Mutual funds | `start` |
| 3 | `/invest/sif/` | Experienced investor asking whether a SIF suits them | SIF | `sif` |
| 4 | `/invest/gift-city-funds/` | Wants US dollar assets from India, including NRIs | GIFT City funds | `gift_city` |

`/invest/` stays the general page. Cross-links: the `/invest/#products` cards link to pages 3 and 4; pages 1 and 2 end with a small line to pages 3 and 4 for larger portfolios. The homepage gets small route links, not a segmentation section.

**Page 2's proof:** `<SampleBrief variant="start" />`, a sample starting brief (never a "plan": "financial planning" is a legal limit).
**Before pages 3 and 4 are indexed or shared widely:** check the SIF promotion rules (handoff §2, decision 9) and the GIFT City tax, LRS and reporting points; confirm we can place transactions in both (#60). Then remove `noindex` and the sitemap filter in `astro.config.mjs`.
**Shared pieces:** `ContactActions` (the booking and WhatsApp buttons with one placement, optional call note and identity) and `FitCards` (who it suits, who should skip it). Every page uses `trackView="landing_view"` and its `trackLanding` id.

## 3. What every landing page has

1. **One reader, one promise, one action.** "Book a first call" is the gold button; WhatsApp is secondary.
2. **Message match.** The headline repeats the promise of the content that sent the reader, in their words.
3. **Hero:** the situation, what we do, what you get, the call details (30 minutes, no charge for the call).
4. **Process, not promise.** What we check for this reader.
5. **Proof for this reader:** review → sample brief; start → sample starting brief; SIF / GIFT City → suits, minimum, main risk, who should skip it.
6. **How we are paid, before the ask.** Commission, direct vs regular, rates in writing per scheme.
7. **Who this is not for.** Filters the wrong visitors and builds trust.
8. **What happens next.** Call → holding details → written brief → you decide and approve each transaction by OTP.
9. **4–6 questions for this reader.**
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
3. Next: the owner's copy and compliance checks (#107, #110), route links (#111), then the first content that links to each page.
