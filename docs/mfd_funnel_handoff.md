# Handoff: Invest with Support funnel

**Status (2026-10-14, S50):** All funnel work is merged into `dev` (22 commits ahead of `main`; `origin/dev` is at S49). Production has no `/invest/` yet. Next: the release blockers (§7), then a PR from `dev` to `main` (#95).
**Source of truth:** this file. The homepage and `/invest/` follow the agreed demo (`claude.ai/artifact/F3YwEXP1V29kCMcEDRE4KK`, v19); the "Homepage (2026-10-14)" table in §2 replaces older homepage and `/invest/` tables. The owner's name, credentials and the word "expertise" are allowed (SEBI RA rule retired).
**Content guide:** `docs/content_philosophy_v2.md` (latest, S50) holds the copy rules: the goal (authority with clients), the three page modes, the message pillars, and the legal limits vs tone choices.
**Retired docs (2026-10-14):** the transition proposal, the copy demos (v1, v2) and the S47 funnel recommendations are deleted. Read them in git history (commit `18fcfda`) if you need the background, for example the proposal's Deepdive changes (§9).
**Log:** open items are numbered as in `docs/project_log.md`.

## 1. Files

| File | State | Use |
| --- | --- | --- |
| `docs/mfd_whatsapp_kit.md` | Draft for owner approval | WhatsApp profile, greeting, away message, prefilled texts, privacy section draft |
| `docs/AMFI_Master_Cicular_for_MF_Ds_3c7f5ee44f.pdf` | Local only (not in git) | Code of conduct source (Chapter 4, clause 4) |
| `docs/project_log.md`, `project_log_archive.md` | Tracked | Decisions and session history |

## 2. Locked decisions

### Strategy
1. Distribution is the main focus and the only revenue today. Paid research is deferred.
2. **Target client: ₹10 lakh to ₹1 crore** in mutual funds, usually busy professionals who want help, not more data. The website is the trust check after a referral; referrals and direct outreach find the clients.
3. **Main offer: a 30-minute first call**, booked through Zoho Bookings (free plan): `https://fundinvestigator.zohobookings.in/488614000000029045`. The button says "Book a first call". The call covers goals, time frame and risk profile, then existing funds (if any). The portfolio review (overlap, benchmark check, costs, fit to the risk profile) needs the holding details, which the client shares **after** the call; we then send a short brief. Never write "no documents needed". Keep it factual; fund choices belong to the distribution conversation.
4. **Contact:** booking first, WhatsApp second (`wa.me/919625026859`, +91 96250 26859, prefilled text and a `ref` per placement). Email (contact@fundinvestigator.com) is the fallback.
5. **Owner's name (rule changed 2026-10-14).** The SEBI RA rule is retired. The name, photo and credentials may appear on service pages: the homepage final section shows them (photo and credentials from `src/lib/distributor.ts`, hidden while empty, #90), and the ARN identity stays in the footer and on `/invest/`. Fund analyses that name a scheme: decide a byline case by case (#98). Structured data still names the Organization; switch `authorRef()` only when the page shows the person.
6. **Launch without a platform.** Copy names none. We place transactions through MFU, an exchange platform or similar; the investor approves by OTP and pays the fund house directly. Add "Existing clients: log in to [Platform]" back once a platform exists.
7. Empanelled with every AMC: copy says "every fund house", never an AMC list, name or logo (AMFI code 4(d), 4(k)).
8. Reviews happen "at regular intervals" (no fixed frequency).
9. ARN is SIF-enabled; check SIF promotion rules before SIFs appear in copy.
10. **Academy is deferred.** Guides live under Investigations (`/reports/`). Decision guides that name no fund go there too (#74). Revisit a separate Academy at roughly 8–10 guides. There is no `/investigate/` hub.

### Compliance rules for copy
- **Commission rates (S44):** not published on the site, for confidentiality and competition reasons. Each client gets the actual commission for each recommended scheme, in writing, before investing. The site explains how commission works and says that we disclose the rates per client.
- **Fees:** say "No separate fee from you" and explain the commission from the regular plan's expense ratio in the same place. Never "free" (for the service), "zero cost", "no cost to you" or "we don't charge anything".
- **Words to avoid:** see `docs/content_philosophy_v2.md` ("Legal limits vs Tone choices"). Legal limits: advice/adviser (in promotion), independent, research (as a label), financial planning, anything that plays down risk. Tone choices: partner, wealth (avoid by default, #98). Use "help to choose", "suitable", "risk profile", "review".
- **Other distributors:** describe practices (funds sold on returns, launches or commission), never name or run down a firm or person.
- **Links:** fund analyses (they name a scheme) never link to `/invest/`, WhatsApp or the booking page. Generic guides may, once they name no fund (#68). `/reports/` carries no `/invest/` link. `/about/` names no fund and may link to both.
- **WhatsApp:** no KYC documents, statements or passwords in chat; no fund names in greeting, away or broadcast messages.
- **Booking form:** ask only for name, email, phone and a holdings range (under ₹10 lakh · ₹10–50 lakh · ₹50 lakh–1 crore · over ₹1 crore). No PAN, documents or account numbers.

### Navigation
- **Header:** Invest with support · Investigations · About. Three equal text links, no nav button. Deepdive and Subscribe are not in the header.
- **Footer Navigate column:** Invest with support · Investigations · Deepdive ↗ · About · Subscribe ↗. All plain links. The footer also has a WhatsApp icon (`footer`).
- The main button label is "Book a first call" (homepage and `/invest/`); the homepage final section says "Book a call with Ishpreet". `/about/` still says "Book a portfolio review" (align when #87 is settled).
- **Deepdive appears in:** the `/reports/` section, links inside investigations, `/about/` section 4, and the footer. The homepage mentions it only as "Access to Deepdive" in the subscribe strip. All open links move to the email access flow (#91).

### Homepage (2026-10-14, current)

Five sections on one centre axis (headings, leads and buttons centred; card text left). Gold is for booking only. Copy sources: `src/lib/services.ts`, `src/lib/faq.ts`, `src/lib/distributor.ts`.

| # | Section | Background | Actions (placement) |
| --- | --- | --- | --- |
| 1 | Hero, stacked: headline, subhead, call details, trust strip, sample brief | dark | Book a first call · Contact on WhatsApp (`homepage_hero`) |
| 2 | Problems → services: 4 `ServiceCard`s, fee line | light | Book a first call · Contact on WhatsApp (`homepage_services`) |
| 3 | The Fund Investigator way: mission lead, 3 difference cards | white | How support works (secondary button) → `/invest/` · Read our story → `/about/` |
| 4 | Our investigations and tools: 2 guides, subscribe strip (investigations + Deepdive access) | light | View all investigations · Subscribe (`homepage_bottom`) |
| 5 | Final call: photo and credentials (config, hidden while empty), name | white | Book a call with Ishpreet · Contact on WhatsApp (`homepage_final`) |

`/invest/` order: see the `/invest/` table below. The direct vs regular comparison lives only in the FAQ.

**Homepage design rules (still valid from S46):**
- **Sample brief (`SampleBrief`):** labelled "Sample", example profile (age 34, moderate risk, 5 funds), mix now vs target, then three figures: overlap %, funds that lag benchmark, average expense ratio %. No fund names, no returns or projections, no commission rates. Values are illustrative (#83).
- **Motion: Subtle.** Reveal on scroll (`data-reveal`) and cross-page view transitions; both off under reduced motion. See `docs/style_spec.md` §11.
- **Not used:** section labels, numbered labels, mid-page dark bands, parallax, counters, carousels.

Removed from the homepage: The Sales Trap, the Deepdive showcase and section, "How we are paid" dark band, Why Fund Investigator. The S46 layout is in git history (commit `18fcfda`).

### `/invest/` page (S51, 2026-10-15)

**Job:** how investing with support works: the client journey, the products and the questions before a first call. The homepage pitches (why us); `/about/` shows the person and credentials; `/invest/` explains how. Entry: the homepage "Fund Investigator way" section (secondary button), the header and the footer. The header brings cold visitors from reports, so the hero keeps the main action. Review frequency and brief timing are agreed on the call per client; the site states no tiers or day counts.

| # | Section | Background | Content |
| --- | --- | --- | --- |
| 1 | Hero | dark | "We do the investigation. *You make the call.*" Subtitle: "We help you choose your funds, and we explain their risk, suitability and costs. Then we review them with you at regular intervals." Book a first call · Contact on WhatsApp (`invest_hero`); call details |
| 2 | Client journey (`#how-it-works`) | white | "From the first call to every review." `SplitRows` (numbered): six stages, each with "You" beside "We" (Book a call · The first call · then the four service names from `src/lib/services.ts`). Book a first call · Contact on WhatsApp (`invest_review`) |
| 3 | Products (`#products`) | light | "What you can invest in." Mutual funds · SIFs · GIFT City funds from `src/lib/products.ts`, each with Suits · Minimum · Main risk. No buttons. Draft copy: owner to check |
| 4 | Direct vs regular, then booking (`#costs`) | white | "Same fund. More support." `SplitRows emphasis="right"`: Direct plan, on your own · Regular plan, with us. Rows: Cost (with "No separate fee from you" and the commission explanation) · Choosing funds · Transactions · Reviews · When markets fall · Suits ("from a first SIP to a large portfolio"). Callout "Already in direct plans, but want an expert opinion?" (`Card variant="subtle"`): we review them, they can stay direct, and investments through us are in regular plans only. No disclosures link: the cost row already says how we are paid; the footer links to the disclaimer. Then Book a first call · Contact on WhatsApp (`invest_cta`), and under them the strip "You work with Ishpreet Singh Modi · email", then tagline · ARN · validity · → `/about/`. The reply time is in journey stage 1; the no-KYC line is in the WhatsApp greeting (kit). Replaces #73 for now (no fee-only adviser column) |
| 5 | FAQ (`#faq`) | light | `investFaqGroups` in `src/lib/faq.ts`: Before the call · Products · Costs · After the call. Last on the page, because it will grow. Ends with "Another question? Ask us on WhatsApp ↗" (`invest_faq`). New questions (2026-10-15) are drafts |

Removed: the three-card "AMFI-registered, and open about how we are paid" section (it repeated journey stage 4) the "Is this for you?" section (the comparison's Suits row answers it) and the separate "Ready to start?" section (merged into section 4, so the action follows the cost question). We state what we are and what we do; no "what we are not" lines. Tone: promote the service with confidence; the direct column stays fair fact, with no fear. A separate FAQ page waits until the list passes about 15 questions (S51).

**Tagline (AMFI rule for SIF distributors):** "AMFI Registered Mutual Fund Distributor & SIF Distributor", with the name and ARN, in all communication, including the website. `TAGLINE` in `src/lib/distributor.ts` holds the exact text.

The owner holds the MFD and SIF distributor certifications. Existing MFDs can distribute GIFT City funds (owner, 2026-10-15).

### `/about/` page (rewritten)

| # | Section | Background | Content |
| --- | --- | --- | --- |
| 1 | Hero | dark | H1 kept ("Why Fund Investigator Exists"). Subtitle (S45): "Because you deserve investments backed by analysis, that improve your portfolio. We investigate funds with evidence, not ratings. Then we help you choose and invest, with our costs shown first." The line replaces the old homepage "Why Fund Investigator" block, which is not restored (its "Not mis-selling…" claim does not fit a commission-earning MFD). |
| 2 | Our story | white | "The question we start with": the returns question; why we separate the result from the reasons and built Deepdive; funds are sold, not chosen, and distribution is run as sales, not analysis, which is how mis-selling happens; "So we offer distribution that starts with analysis." |
| 3 | How we work | light | "Three rules we keep." Evidence before opinion · Research kept apart from selling (investigations and Deepdive have no buy buttons and never link to the service) · Open about how we are paid (→ `#costs`) |
| 4 | Two ways we help | white | Two cards: Invest with Support (gold "Book a portfolio review ↗", link "How support works →") · Investigate on your own (secondary "Open Deepdive ↗", source `about`; link to investigations). Contact email |

No founder section yet; the name rule changed (Strategy 5), so a founder section is now possible. No "What Changed" note. The X link is in the footer only.

### `/reports/` page
Hero, filters, cards, plus one section after the list: Deepdive snapshot, "Check any fund yourself.", "Open Deepdive ↗" (`reports_deepdive`). No `/invest/` link (most cards name a fund). The snapshot still shows fund names (#75).

### Tracking placements
Events (`src/lib/analytics.ts`): `review_booking_click`, `conversation_request` (channel), `deepdive_click`, `subscribe_click`, plus the `invest_view` page view. Zoho and WhatsApp report no placement back, so the click event is the only record.
- Booking: `homepage_hero`, `homepage_services`, `homepage_final`, `invest_hero`, `invest_review`, `invest_cta`, `about`.
- WhatsApp `ref`: `homepage_hero`, `homepage_services`, `homepage_final`, `invest_hero`, `invest_review`, `invest_cta`, `invest_faq`, `footer`.
- Deepdive: `reports_deepdive`, `about`, `footer` (`invest_fallback` is defined but unused).
- Substack: `homepage_bottom`, `article_end`, `article_takeaways`, `footer`.
- Retired: `homepage_beginner`, `homepage_pricing`, `homepage_deepdive`, `header_*`.

## 3. Evidence

PostHog, 90 days to 2026-10-04: 152 sessions. Reports are the main entry (85 sessions, 91% single-page). Homepage 58 sessions, 6 Deepdive clicks, 2 Subscribe clicks. Owner visits not filtered. Traffic is the main limit: at 2% conversion this is about 3 conversations a quarter, so referrals and outreach must supply most clients.

## 4. Owner inputs (block launch)

| # | Input |
| --- | --- |
| 60 | Approve `docs/mfd_whatsapp_kit.md` and set it up in the WhatsApp Business app. Reply time confirmed as 1 business day (2026-10-15). Confirm that the email is monitored, and the chat retention period |
| 60 | Choose the transaction route for the first clients before replying to enquiries |
| 88 | Zoho booking form: 30-minute duration, holdings-range question, minimum fields, meeting link and reminders on; host name is now the owner's name; the confirmation email says what to share after the call (never on WhatsApp) |
| 90 | Photo and 2–3 credentials in `src/lib/distributor.ts` |
| 91 | Deepdive email-based access, before deploy |
| — | Compliance: how far the review call can go before it becomes investment advice |
| — | Add the WhatsApp number to the Phase 0 AMFI channel check |

## 5. Release checklist

The two-PR plan (disclosure first, funnel second) is done: both are built and merged into `dev`. One PR from `dev` to `main` ships them together (#95). Work in WSL (`source ~/.nvm/nvm.sh`). Follow `CLAUDE.md`: tokens only, UI components only, responsive presets from `src/lib/responsive.ts`.

**Built (S43–S49)**
- [x] `src/lib/distributor.ts` (name, ARN, validity, tagline, risk warning, email, WhatsApp, booking URL, photo and credentials slots) and `DistributorIdentity.astro`
- [x] Footer identity, risk warning and Navigate column; header with three links
- [x] `whatsapp.ts`, booking helper, `Timeline.astro`, `ServiceCard`, `SectionHeading`, `CheckList`, `FaqList`
- [x] Homepage, `/invest/`, `/about/`, `/reports/` Deepdive section, `/invest/` in `llms.txt`
- [x] False claims removed ("no commissions", "independent platform" and similar: the grep returns nothing)
- [x] PostHog events with placements, sent by one listener in `Layout.astro`

**Open before release**
- [ ] `/disclaimer/` distribution section: the short section exists; add how commission works, direct vs regular, the ₹10 lakh example and complaints. No rate table (#65)
- [ ] `/privacy/` enquiries section: WhatsApp and Zoho booking data; needs the chat retention period (#78)
- [ ] Deepdive snapshot on `/reports/` names funds (#75)
- [ ] `/invest/` first-call copy (#87)
- [ ] Deepdive email access, and repoint the open Deepdive links (#91)
- [ ] Owner photo and credentials (#90); Zoho form (#88); WhatsApp kit (#60)
- [ ] PostHog internal-user filter (#62)

**Checks before merge**
- [ ] `npm run lint:design` and `npm run build` pass
- [ ] At most one gold button per section; secondary and tertiary buttons pass `surface`
- [ ] External links use `target="_blank" rel="noopener noreferrer"`; WhatsApp links open with the right text and `ref`; booking links open the Zoho page
- [ ] No `/invest/`, WhatsApp or booking link in the content of any fund analysis or `/reports/` (the global nav link is allowed, #76)
- [ ] Footer identity and risk warning on the homepage, a report, `/about/` and `/invest/`
- [ ] Phone (375px) and desktop: no sideways scroll; mobile menu closes on tap
- [ ] Owner books a test call and sends a test WhatsApp message from each button

### After launch
- [ ] Deepdive repo changes: no named-fund quick picks, footer identity, data source and date
- [ ] Pilot: track `/invest/` views → booking and WhatsApp clicks → calls → clients and AUM monthly for 3 months. After 2–3 months, drop the weakest button pair (#95)

## 6. Tasks for later

| # | Task | Owner |
| --- | --- | --- |
| 71 | Design: dark only for the hero and footer, light middle sections (white/`fi-light`); headings instead of pills. Changes `/reports/` (list out of the dark hero, light `ReportCard` and filter chips) and the article end card; `/about/` already follows it in v2. Rewrite the `style_spec.md` rules. Details in the log | Claude |
| 72 | CAS upload that returns a branded portfolio report | Owner + Claude |
| 73 | "Three ways to invest" comparison on `/invest/` (DIY · fee-only adviser · Invest with Support) | Owner |
| 74 | Decision guides under Investigations (lump sum or STP, overlap, tax on redemption, falling markets); new category needs the enum and `categoryLabels` | Owner |
| 61 | Write more guides that name no fund | Owner |
| 68 | Rewrite the two guides without named funds, then allow an `/invest/` link | Owner |
| — | Revisit a separate Academy at roughly 8–10 guides | Owner |
| — | Check how much Deepdive traffic comes from the main site before ruling out a header link | Claude |
| — | Add the "Existing clients: log in" line once a platform exists | Claude |
| 69 | Keep "every fund house" true when a new AMC launches | Owner |
| 80 | Check `/about/` and `/disclaimer/` for the general "regular plans cost more than direct plans" wording | Claude |
| 83 | Compliance check of the homepage sample brief; real anonymised values later | Owner |
| 84 | Decide #71 for `/reports/`, `/about/` and the article end card (the homepage is now dark hero and footer only) | Owner + Claude |
| 92 | Footer tagline: "Investigate Before You Invest" is from the research positioning | Owner |
| 94 | Check the site copy against the AMFI MFD FAQ PDF | Claude |
| 97 | Retire v1 of the content guide, or keep it as history | Owner |
| 85 | `ReportCard` footer: left-aligned "Read investigation →" (site-wide) | Claude |
| 86 | Align the header logo with the section content at wide screens | Claude |

## 7. Next step

S50 is committed (content guide v2). Next: the "Open before release" items in §5 (#65, #78, #75, #87, #91, #90), then push `dev` and open the PR to `main` (#95).
