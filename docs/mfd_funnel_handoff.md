# Handoff: Invest with Support funnel

**Status (2026-10-14, S49):** All funnel work is merged into `dev` (20 commits ahead of `main`). Production has no `/invest/` yet. Next: the release blockers (#65, #75, #78, #87), then a PR from `dev` to `main` (#95).
**Source of truth:** this file. The homepage and `/invest/` follow the agreed demo (`claude.ai/artifact/F3YwEXP1V29kCMcEDRE4KK`, v19); the "Homepage (2026-10-14)" table in §2 replaces older homepage and `/invest/` tables. The owner's name, credentials and the word "expertise" are allowed (SEBI RA rule retired).
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
3. **Main offer: a 30-minute portfolio review call**, booked through Zoho Bookings (free plan): `https://fundinvestigator.zohobookings.in/488614000000029045`. The visitor prepares nothing and sends no documents; holdings are seen on the call. The review covers overlap, benchmark check, costs and fit to the risk profile. Keep it factual; fund choices belong to the distribution conversation.
4. **Contact:** booking first, WhatsApp second (`wa.me/919625026859`, +91 96250 26859, prefilled text and a `ref` per placement). Email (contact@fundinvestigator.com) is the fallback.
5. **Name only in the compliance identity.** The owner's name appears only next to the ARN (footer, `/invest/` "Our registration" card). No founder profile, photo, byline or LinkedIn link until SEBI RA certification (#29).
6. **Launch without a platform.** Copy names none. We place transactions through MFU, an exchange platform or similar; the investor approves by OTP and pays the fund house directly. Add "Existing clients: log in to [Platform]" back once a platform exists.
7. Empanelled with every AMC: copy says "every fund house", never an AMC list, name or logo (AMFI code 4(d), 4(k)).
8. Reviews happen "at regular intervals" (no fixed frequency).
9. ARN is SIF-enabled; check SIF promotion rules before SIFs appear in copy.
10. **Academy is deferred.** Guides live under Investigations (`/reports/`). Decision guides that name no fund go there too (#74). Revisit a separate Academy at roughly 8–10 guides. There is no `/investigate/` hub.

### Compliance rules for copy
- **Commission rates (S44):** not published on the site, for confidentiality and competition reasons. Each client gets the actual commission for each recommended scheme, in writing, before investing. The site explains how commission works and says that we disclose the rates per client.
- **Fees:** say "No separate fee from you" and explain the commission from the regular plan's expense ratio in the same place. Never "free" (for the service), "zero cost", "no cost to you" or "we don't charge anything".
- **Words to avoid:** advice/adviser (in promotion), partner, independent, research (as a label), financial planning, wealth, anything that plays down risk. Use "help to choose", "suitable", "risk profile", "review".
- **Other distributors:** describe practices (funds sold on returns, launches or commission), never name or run down a firm or person.
- **Links:** fund analyses (they name a scheme) never link to `/invest/`, WhatsApp or the booking page. Generic guides may, once they name no fund (#68). `/reports/` carries no `/invest/` link. `/about/` names no fund and may link to both.
- **WhatsApp:** no KYC documents, statements or passwords in chat; no fund names in greeting, away or broadcast messages.
- **Booking form:** ask only for name, email, phone and a holdings range (under ₹10 lakh · ₹10–50 lakh · ₹50 lakh–1 crore · over ₹1 crore). No PAN, documents or account numbers.

### Navigation
- **Header:** Invest · Investigations · About. Three equal text links, no nav button (today's Subscribe button goes). Deepdive is not in the header.
- **Footer Navigate column:** Invest · Investigations · Deepdive ↗ · About · Subscribe ↗. All plain links (Subscribe is not gold). The live footer label "Why We Built This" becomes "About".
- Nav links say "Invest"; the `/invest/` page title says "Invest with Support". The main button label is "Book a portfolio review".
- **Deepdive appears in:** homepage section 4, the new section on `/reports/`, links inside investigations, the `/invest/` "Not the right fit?" line, `/about/` section 4, and the footer.

### Homepage (2026-10-14, current)

Five sections on one centre axis (headings, leads and buttons centred; card text left). Gold is for booking only. Copy sources: `src/lib/services.ts`, `src/lib/faq.ts`, `src/lib/distributor.ts`.

| # | Section | Background | Actions (placement) |
| --- | --- | --- | --- |
| 1 | Hero, stacked: headline, subhead, call details, trust strip, sample brief | dark | Book a first call · Contact on WhatsApp (`homepage_hero`) |
| 2 | Problems → services: 4 `ServiceCard`s, fee line | light | Book a first call · Contact on WhatsApp (`homepage_services`) |
| 3 | The Fund Investigator way: mission lead, 3 difference cards | white | Read our story → `/about/` · Full details and FAQ → `/invest/#faq` |
| 4 | Our investigations and tools: 2 guides, subscribe strip (investigations + Deepdive access) | light | View all investigations · Subscribe (`homepage_bottom`) |
| 5 | Final call: photo and credentials (config, hidden while empty), name | white | Book a call with Ishpreet · Contact on WhatsApp (`homepage_final`) |

`/invest/` order: hero → Our services → How it works → First call → Registration and costs (`#costs`) → FAQ (`#faq`) → Ready to start. The direct vs regular comparison lives only in the FAQ.

### Homepage (S46, superseded)

Redesigned in S46 (demo: `claude.ai/artifact/Sfej4r5AwHbhh9JjiursbE`). No section labels on this page.

| # | Section | Background | Content and actions |
| --- | --- | --- | --- |
| 1 | Hero | dark | Headline and subtitle unchanged, left-aligned from `xl` (1280px) with `SampleBrief` on the right; stacked and centred below `xl`. Gold "Book a portfolio review ↗" (Zoho, `homepage_hero`); secondary "How support works" → `/invest/`. Hero `size="lg"` |
| 2 | Problem → answer | light | H2 "Clearer choices. Less clutter. More confidence." Three `ProblemAnswer` pairs, short copy: Too many choices → Curated choice · Little clarity → Portfolio first · Left alone → Ongoing support, each with one line. Links: "How support works →" (`/invest/#who`) and "Why Fund Investigator exists →" (`/about/`) |
| 3 | How we are paid | dark | Split layout. "So, what do you pay?" + "We earn a commission from the fund house, which is part of the regular plan's cost. See the costs →" (`/invest/#costs`). Gold "Book a portfolio review ↗" and secondary "Ask a question on WhatsApp ↗" (both `homepage_pricing`), ARN line. Right: No separate fee from you · 40+ fund houses · Transparency first |
| 4 | Investigations | white | "The basics, investigated." with "View all investigations →" in the heading row. Two guide cards (Five Questions, Categories Explained; no fund names). One gold "Get new guides by email ↗" (`homepage_bottom`). Decision guides replace the cards once published (#74) |
| 5 | Deepdive | light | Snapshot + three features. Secondary "Open Deepdive ↗" straight to the app |

**Homepage design rules (S46):**
- **Sample brief (`SampleBrief`):** labelled "Sample", example profile (age 34, moderate risk, 5 funds), mix now vs target, then three figures: overlap %, funds that lag benchmark, average expense ratio %. No fund names, no returns or projections, no commission rates. Caption: "You get a brief like this after your review." Values are illustrative (#83).
- **Copy source:** `src/lib/who-we-help.ts` holds both versions. Short lines on the homepage are drafts (#82); the long copy is the S45 finalised text.
- **Motion: Subtle.** Reveal on scroll (`data-reveal`) and cross-page view transitions; both off under reduced motion. See `docs/style_spec.md` §11.
- **Not used:** section labels, numbered labels, "Why Fund Investigator?" as a heading, parallax, counters, carousels.

Removed: The Sales Trap, the dark Deepdive showcase (video), Why Fund Investigator.

### `/invest/` page

| # | Section | Background | Content |
| --- | --- | --- | --- |
| 1 | Hero | dark | Label "Invest with Support". "We do the investigation. *You make the call.*" Subtitle: "We help you choose your funds, and we explain their risk, suitability and costs. Then we review them with you at regular intervals." Gold "Book a portfolio review ↗" (Zoho); secondary "Message us on WhatsApp ↗" (`invest_hero`); fee line → `#costs`; email |
| 1b | Who we help (`#who`, S46) | white | Label "Who we help". Two-line H2: "More choices. More clutter. More confusion." (grey) "Clearer choices. Less clutter. More confidence." `ProblemAnswer` long version: the S45 finalised headlines and body copy, with lead-in tags (Too many choices, Curated choice, Little clarity, Clear picture, Left alone, Ongoing support) |
| 2 | Portfolio review (`#review`) | light | "Book a 30-minute review call. We look at your funds with you." "No separate fee from you, and no obligation to invest through us. On the call, we check four things." Cards: Overlap · Benchmark check · Costs · Fit to your risk profile. Gold "Book a portfolio review ↗"; secondary WhatsApp (`invest_review`). Line: "Keep your fund app open during the call. You do not need to send us any documents." |
| 3 | How it works (`#how-it-works`) | white | "Five steps. You approve every investment." Timeline, vertical below `lg`, horizontal from `lg`. Headings only. Then the "Not the right fit?" line |
| 4 | Who we are | light | "Registered, and open about how we are paid." Cards: Our registration (name, AMFI MFD, ARN and validity, not an RIA) · How we earn (`#costs`, "No separate fee from you") · Our transparency. Link "Full disclosures…" → `/disclaimer/` |
| 5 | Ready to start? | white | Reply time and the no-KYC-on-WhatsApp line. Gold "Book a portfolio review ↗"; secondary WhatsApp (`invest_cta`); email |

Timeline steps:
1. **Book a review call**: "Pick a time, or message us on WhatsApp. We reply within 2 working days."
2. **First conversation**: "We discuss your goals, your time frame, your existing funds and your risk profile."
3. **Fund shortlisting and selection help**: "We shortlist suitable funds and explain why each fits, with its costs and our commission."
4. **We set it up, you approve**: "We help from KYC to investment. You approve each one by OTP and pay the fund house directly."
5. **Reviews and service**: "We review your funds at regular intervals. We help with SIP changes, switches and redemptions."

### `/about/` page (rewritten)

| # | Section | Background | Content |
| --- | --- | --- | --- |
| 1 | Hero | dark | H1 kept ("Why Fund Investigator Exists"). Subtitle (S45): "Because you deserve investments backed by analysis, that improve your portfolio. We investigate funds with evidence, not ratings. Then we help you choose and invest, with our costs shown first." The line replaces the old homepage "Why Fund Investigator" block, which is not restored (its "Not mis-selling…" claim does not fit a commission-earning MFD). |
| 2 | Our story | white | "The question we start with": the returns question; why we separate the result from the reasons and built Deepdive; funds are sold, not chosen, and distribution is run as sales, not analysis, which is how mis-selling happens; "So we offer distribution that starts with analysis." |
| 3 | How we work | light | "Three rules we keep." Evidence before opinion · Research kept apart from selling (investigations and Deepdive have no buy buttons and never link to the service) · Open about how we are paid (→ `#costs`) |
| 4 | Two ways we help | white | Two cards: Invest with Support (gold "Book a portfolio review ↗", link "How support works →") · Investigate on your own (secondary "Open Deepdive ↗", source `about`; link to investigations). Contact email |

No founder section and no "What Changed" note (the earlier positioning was never promoted). The X link moves to the footer only.

### `/reports/` page
Unchanged (hero, filters, cards), plus one new section after the list: Deepdive snapshot, "Check any fund yourself.", "Open Deepdive ↗" (`reports_deepdive`). Gold for now; owner may switch it to secondary.

### Tracking placements
- Booking: `homepage_hero`, `invest_hero`, `invest_review`, `invest_cta`, `about` all open Zoho directly — Zoho takes no `ref`, so track the click event in PostHog.
- WhatsApp `ref`: `invest_hero`, `invest_review`, `invest_cta`.
- Deepdive: `homepage_deepdive`, `reports_deepdive`, `about`, `footer`.
- Substack: `homepage_bottom` (existing), `footer`, plus the existing article placements.

## 3. Evidence

PostHog, 90 days to 2026-10-04: 152 sessions. Reports are the main entry (85 sessions, 91% single-page). Homepage 58 sessions, 6 Deepdive clicks, 2 Subscribe clicks. Owner visits not filtered. Traffic is the main limit: at 2% conversion this is about 3 conversations a quarter, so referrals and outreach must supply most clients.

## 4. Owner inputs (block launch)

| # | Input |
| --- | --- |
| 60 | Approve `docs/mfd_whatsapp_kit.md` and set it up in the WhatsApp Business app. Confirm the 2-working-day reply time, that the email is monitored, and the chat retention period |
| 60 | Choose the transaction route for the first clients before replying to enquiries |
| — | Zoho booking form: 30-minute duration, holdings-range question, minimum fields, meeting link and reminders on |
| — | Compliance: how far the review call can go before it becomes investment advice |
| — | Add the WhatsApp number to the Phase 0 AMFI channel check |

## 5. Execution tasklist: demo to main site

Two PRs from this branch. PR 1 removes false claims and adds the distributor identity, and links to no service. PR 2 launches the funnel. They may ship together if the owner inputs are in. Work in WSL (`source ~/.nvm/nvm.sh`). Follow `CLAUDE.md`: tokens only, UI components only, responsive presets from `src/lib/responsive.ts`.

### PR 1: Disclosure and foundations (Phase 1)
- [ ] `src/lib/distributor.ts`: name, ARN, ARN validity, tagline, risk warning, contact email, WhatsApp number, booking URL (proposal §14.1)
- [ ] `src/components/ui/DistributorIdentity.astro`: `variant` inline/block, `surface` light/dark; add to `/styleguide`
- [ ] Footer: identity and risk warning in the bottom bar (§14.2). Navigate column: Investigations · Deepdive ↗ · About · Subscribe ↗ (plain; no Invest link yet). "Why We Built This" → "About"
- [ ] `/about/`: the §2 rewrite **without** the service links: hero, Our story, How we work (rule 3 without the `#costs` link), and section 4 with the Deepdive card only (or keep today's Deepdive section). PR 2 adds the Invest card and links
- [ ] Copy fixes from proposal §6 and §14: disclaimer (remove "independent platform" and "no commissions"), report disclaimer paragraph 3 in `ArticleLayout.astro`, `schema.ts`, `llms.txt`
- [ ] Check: `grep -rniE "no commission|conflicts? of interest|trail fees|no affiliations|independent platform|mis-selling that" src` returns nothing that is false

### PR 2: Funnel launch (Phase 2)
**Foundations**
- [ ] `src/lib/whatsapp.ts`: `whatsappUrl(placement)` builds `wa.me` with the prefilled text and `ref`; mirrors `deepdive.ts`. Number from `distributor.ts`
- [ ] Booking URL from `distributor.ts`; one helper or constant, used by every "Book a portfolio review" button
- [ ] Add placements `homepage_deepdive`, `reports_deepdive` and `about` to `DeepdivePlacement` (check `about` exists). The homepage Subscribe reuses the existing `homepage_bottom` Substack placement
- [ ] `src/components/ui/Timeline.astro` (#70): vertical below `lg`, horizontal from `lg`, as an ordered list; add to `/styleguide`

**Pages**
- [ ] `src/pages/invest.astro`: the five sections in §2, ids `review`, `how-it-works` and `costs`
- [ ] Header: Invest · Investigations · About on desktop and mobile; remove the Deepdive link, the mobile Deepdive button and the Subscribe button (desktop and mobile); active state for the current page. Retire the `header_nav`, `header_cta` and `header` placements
- [ ] Footer: add Invest as the first Navigate link
- [ ] `src/pages/index.astro`: the four sections in §2; remove The Sales Trap, the Deepdive showcase and its video script, and Why Fund Investigator. Section 3 shows the two guides by slug, not "latest"
- [ ] `src/pages/about.astro`: add the Invest card, the `#costs` link and the booking button
- [ ] `src/pages/reports.astro`: the Deepdive section after the list
- [ ] `src/pages/disclaimer.astro`: distribution section (#65): how commission works (trail from the regular plan's expense ratio), direct vs regular comparison, ₹10 lakh example with an illustrative rate, complaints. No published rate table (see Compliance rules)
- [ ] `src/pages/privacy.astro`: enquiries section from the WhatsApp kit §5, plus booking-form data (Zoho)
- [ ] `/invest/` in the sitemap and `llms.txt`; `schema.ts` description if needed

**Analytics (#62)**
- [ ] PostHog events: `invest_view`, `review_booking_click` (with placement), `conversation_request` (with `channel` and placement), `deepdive_click`, `subscribe_click`; internal-user filter

**Checks before merge**
- [ ] `npm run lint:design` and `npm run build` pass
- [ ] At most one gold button per section; secondary and tertiary buttons pass `surface`
- [ ] External links use `target="_blank" rel="noopener noreferrer"`; WhatsApp links open with the right text and `ref`; booking links open the Zoho page
- [ ] No `/invest/`, WhatsApp or booking link on any fund analysis or on `/reports/`
- [ ] The owner's name appears only in the distributor identity
- [ ] Footer identity and risk warning on the homepage, a report, `/about/` and `/invest/`
- [ ] Phone (375px) and desktop render match the demo; no sideways scroll; mobile menu closes on tap
- [ ] Owner books a test call and sends a test WhatsApp message from each button

### After launch
- [ ] Deepdive repo changes (proposal §9): no named-fund quick picks, footer identity, data source and date
- [ ] Pilot: track `/invest/` views → booking and WhatsApp clicks → calls → clients and AUM monthly for 3 months

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
| 79 | Update `HOME_DESCRIPTION` to the new homepage message | Claude |
| 80 | Check `/about/` and `/disclaimer/` for the general "regular plans cost more than direct plans" wording | Claude |
| 82 | Approve the draft short card copy and the "Clear picture" lead-in | Owner |
| 83 | Compliance check of the homepage sample brief; real anonymised values later | Owner |
| 84 | Decide #71 for other pages, given the homepage's "How we are paid" dark band | Owner + Claude |
| 85 | `ReportCard` footer: left-aligned "Read investigation →" (site-wide) | Claude |
| 86 | Align the header logo with the section content at wide screens | Claude |

## 7. Next step

S46 is committed. Next: draft the `/disclaimer/` distribution section (#65, no rate table) and the `/privacy/` enquiries section (#78), and fix the Deepdive snapshot (#75) before push and PR. The owner reviews #82 and #83 before launch.
