# Proposal: Fund Investigator as an Analytics Hub with Distribution

**Website:** fundinvestigator.com

**Status:** Direction approved (hub model). Phase 1 copy (Section 14) awaits owner approval. Phase 2 launches without a platform (WhatsApp first).

> **Superseded in part (2026-10-05).** `docs/mfd_funnel_handoff.md` and the demo `docs/mfd_copy_demo.html` are the source of truth for the funnel, navigation, homepage, `/invest/` and the build tasklist. Where they disagree with Sections 4, 5, 8, 10 or 15 below, they win. This document stays as background: operating rules (§3), disclosures (§7), technical notes (§8), Deepdive changes (§9), owner inputs (§11) and the Phase 1 copy (§14).

**Updated:** 2026-10-04. This version replaces the earlier draft of the same date.

## 1. Decision record

**Decided 2026-10-04 by the owner:**

1. Use one website as a hub. It offers free, non-personalised tools, investigations, and a distribution service.
2. Add the distribution service at `/invest/`. The page explains the service. Its main action links to a third-party MFD platform. Transactions happen on that platform under the owner's ARN.
3. Accept the regulatory grey area for named-fund content during the channel test. Review the articles in a later phase (Section 10, Phase 5).
4. Do not build a paid analytics tier in this plan.
5. Do not create a separate website or use a sole proprietorship for separation. Neither creates a separate legal person. AMFI classifies a proprietorship ARN as the individual (CIR/ARN-21/2021-22).

**Consequences that this plan must handle:**

- Remove all "no commission", "no conflicts", and "no affiliations to distributors" claims.
- Show the registered name, ARN, and the tagline "AMFI-registered Mutual Fund Distributor" on the website. The owner's name becomes visible as the distributor identity. Reports stay authored by the Organization (`authorRef()` does not change).
- Remove copy that criticises other distributors as a group (AMFI master circular, Ch. 7 II.B.6(b)).

### Contents

- [Model and positioning](#2-model-and-positioning)
- [Operating rules for the hub](#3-operating-rules-for-the-hub)
- [Website structure and entry points](#4-website-structure-and-entry-points)
- [The /invest/ page](#5-the-invest-page)
- [Copy changes](#6-copy-changes)
- [Disclosures](#7-disclosures)
- [Technical implementation](#8-technical-implementation)
- [Deepdive changes](#9-deepdive-changes-separate-repository)
- [Phases and tasks](#10-phases-and-tasks)
- [Owner inputs](#11-owner-inputs-blocking)
- [Risks and deferred items](#12-risks-and-deferred-items)
- [Sources](#13-sources)
- [Phase 1 copy drafts](#14-phase-1-copy-drafts-for-approval)
- [Hub funnel](#15-hub-funnel-draft-for-owner-review)

## 2. Model and positioning

### Positioning line

> **Investigate funds yourself. Invest with support when you want it.**

The brand stays "Fund Investigator". The claim changes from "independent, no commissions" to "transparent about how we earn".

### Two routes

| Route | Who it is for | What we offer | Plan type | How we earn |
| --- | --- | --- | --- | --- |
| Do it yourself | Investors who want to choose their own funds | Deepdive, investigations, education | Any; direct plans cost less | Nothing (newsletter only) |
| Invest with support | Investors who want help to choose, buy, and review funds | Fund selection, transaction help, reviews at regular intervals | Regular plans | Commission from the AMC |

Keep the do-it-yourself route visible on every page. Never describe the support route as free.

### Channel test

The hub runs as a test. The goal is to learn which channel works: tools, content, or distribution. Measure each channel (Section 10, Phase 4) before adding scope.

## 3. Operating rules for the hub

These rules keep the tools defensible as non-personalised analytics. Apply them from launch.

1. **Neutral tools.** Deepdive covers all schemes, not only schemes on the distribution platform. Never sort or filter by commission.
2. **User-driven tools.** No preset "best fund" screens, fund quick-picks, rankings, or "recommended" badges.
3. **No sales links from analysis.** Reports, Deepdive outputs, and newsletter issues do not link to `/invest/` or the platform. The service is reachable from navigation and general pages only.
4. **Convert after value.** No pop-ups or interception for the service. This follows the existing subscription rule.
5. **Fund selection only inside the service.** Specific fund suggestions happen in a client conversation, after a needs assessment. They never appear on public pages.
6. **One source for identity and disclosure text.** All pages read the registered name, ARN, and risk warning from one file (`src/lib/distributor.ts`).

## 4. Website structure and entry points

### Site map changes

| Route | Change |
| --- | --- |
| `/invest/` | **New.** Service page (Section 5). |
| `/` | Rework card 3 in the problem section. Rework the closing section into "two routes" (Section 6). |
| `/about/` | Replace the conflict-of-interest claims. Add a dated note on what changed. |
| `/disclaimer/` | Replace the "independent platform" and "no commissions" text. Add a distribution relationship section. |
| `/privacy/` | Add enquiry handling and platform data handling. |
| `/terms/` | Add a distribution service section. |
| `/reports/*` | No service links. Add one distributor line to the report disclaimer. |
| `/styleguide/` | Replace the "No commissions" marker. Add the new identity component. |
| `llms.txt`, JSON-LD | Replace the descriptions. Add `/invest/` to `llms.txt`. |

### Navigation label

Nav links name places. Buttons name actions. Updated 2026-10-05 (Section 15).

- **Nav (desktop, mobile, footer):** "Invest". Nav order: Invest · Academy · Investigate · About. Four equal text links, no nav button.
- **Buttons and the `/invest/` page title:** "Invest with Support". "Invest" alone on a button reads as "buy now".

### Entry points

| Placement | Location | Link target | Button style |
| --- | --- | --- | --- |
| `header_nav` | Desktop header, first item | `/invest/` | Text link |
| `mobile_nav` | Mobile menu, first item | `/invest/` | Text link |
| `footer` | Footer "Navigate" column | `/invest/` | Text link |
| `homepage_routes` | Homepage closing section, route card 2 | `/invest/` | `tertiary`, `surface="light"` |
| `about` | About page closing section | `/invest/` | `tertiary`, `surface="light"` |
| `invest_hero`, `invest_cta` | `/invest/` page | Platform (external) | See Section 5 |

**No entry points from:** report pages, the article-end band, Deepdive, or the newsletter.

## 5. The /invest/ page

> **Superseded in part on 2026-10-05.** The page now has four sections: Hero → How it works → Who we are → Ready to start. See Section 15, decision 9, and the demo. The draft copy below stays as the source text.

**File:** `src/pages/invest.astro`. **Title:** "Invest with Support | Fund Investigator".

**Meta description:** "Help to choose, buy and review mutual funds from an AMFI-registered Mutual Fund Distributor. See how we are paid before you start."

Use `Hero`, `Section`, `Card`, `Badge`, `Button`, and the new `DistributorIdentity` component. Use presets from `src/lib/responsive.ts`. Use one `primary` button per section at most. Keep the light and dark sections alternating.

### Section order and draft copy

**5.1 Hero** (`Hero`, dark, size `md`)

- Badge: "Invest with Support"
- H1: "Help to invest in mutual funds, with the costs shown first."
- Body: "Our tools and investigations stay free. If you want help to choose, buy and review mutual funds, we offer it as an AMFI-registered Mutual Fund Distributor."
- Buttons: `primary` "How it works" (anchor `#how-it-works`); `secondary` `surface="dark"` "Use the free tools" (Deepdive, placement `invest_hero`).

**5.2 Who this is for** (light, three `Card`s in `sm:grid-cols-2 lg:grid-cols-3`)

- "You want help to start." — "You know you should invest, but you want someone to help you choose and complete the steps."
- "You want a regular check." — "You want your mutual fund holdings reviewed at regular intervals, with reasons for any change."
- "You want one contact." — "You want one person for transactions, SIP changes and service requests."
- Note below the cards: "Not the right fit? If you prefer to choose funds yourself, use Deepdive and direct plans. If you need a full financial plan, tax or insurance advice, speak to a SEBI-registered investment adviser."

**5.3 Two ways to invest** (dark, comparison table or two cards)

| | Do it yourself | Invest with support |
| --- | --- | --- |
| Plan type | Direct plan | Regular plan |
| Yearly cost | Lower expense ratio | Higher expense ratio; the difference includes our commission |
| Fund choice | You decide | We suggest; you decide |
| Reviews | You do them | At regular intervals, and when your needs change |
| Our tools | Free | Free |

**5.4 How it works** (light, `id="how-it-works"`, numbered steps)

1. **First conversation.** "We discuss your goals, time period, existing funds and how much loss you can accept."
2. **Fund suggestions.** "We explain the suitable funds, their costs, the alternatives we considered, and the commission on each."
3. **You approve every transaction.** "You open an account and place each investment on our distribution platform. Nothing happens without your approval."
4. **Reviews.** "We review your holdings at regular intervals. A review can end with no change."
5. **Service.** "We help with SIP changes, redemptions and other requests through one contact channel."

**5.5 How we are paid** (dark)

- "We earn a commission from the fund house (AMC) on regular plans. You do not pay us a separate fee."
- "This commission is part of the regular plan's expense ratio. So a regular plan costs more each year than the direct plan of the same fund."
- Illustration card: "Example only: on ₹10 lakh, a yearly cost difference of 0.5% is about ₹5,000 a year. The actual difference depends on the fund."
- "Before you invest, we show the commission for the suggested fund and for the alternatives we considered."
- "Commission gives us an incentive. We manage it with three rules: our tools cover every fund, our method is public, and our investigations never link to this service."

**5.6 Who we are** (light, `DistributorIdentity` variant `block`)

- Registered name, ARN, ARN validity, tagline "AMFI-registered Mutual Fund Distributor".
- "We are not a SEBI-registered investment adviser. Any advice we give is incidental to the distribution of mutual funds."
- Complaints: contact email, response time, and escalation path (owner input).
- Risk warning: "Mutual Fund investments are subject to market risks, read all scheme related documents carefully."

**5.7 Next step** (dark)

- H2: "Ready to start?"
- `primary` "Continue to [Platform name]" (external, placement `invest_cta`).
- Text: "Prefer to talk first? Email [service email]."
- Privacy note: "[Platform name] collects your KYC and account details under its own privacy policy. We see the details we need to service your account."

**5.8 What changed** (light, short, dated)

- "In October 2026 we started offering help to invest as an AMFI-registered Mutual Fund Distributor. Some readers asked for help after using our tools. This service earns commission, and that creates a conflict. This page explains how we handle it. The free tools and investigations continue."
- Show the date with `formatDate()`.

## 6. Copy changes

| File | Location | Current | Proposed |
| --- | --- | --- | --- |
| `src/pages/index.astro` | Problem card 3, title | "Transparency doesn't earn commissions." | "Commission should come with disclosure." |
| `src/pages/index.astro` | Problem card 3, body | "Commissions create misselling incentives. The fund you're sold is rarely the one that deserves it. It's the one that pays the most to be recommended." | "Regular plans pay the distributor a commission every year. Any distributor, including us, should tell you how much, and what service you get for it." |
| `src/pages/index.astro` | Closing section H2 | "…analysis that improves their portfolio. / Not mis-selling that increases someone else's commission." | "Because Indian mutual fund investors deserve to see the evidence. / Before any decision, with or without help." |
| `src/pages/index.astro` | Closing section body | "Fund platforms often compress research…" | Two route cards. **Do it yourself:** "Free tools and investigations. Use direct plans and keep every decision." (`secondary`, Deepdive). **Invest with support:** "Help to choose, buy and review funds through regular plans. We earn commission, and we show it first." (`tertiary`, `/invest/`). Keep the subscribe card. |
| `src/pages/about.astro` | Dark section H2 | Same as homepage H2 | Same new H2 as homepage. |
| `src/pages/about.astro` | Card "Analytics, Not Sales" | "We do not rank funds to push a purchase…" | Title "Analytics First". "We do not rank funds to push a purchase. The tools show the evidence. Help to invest is a separate service, clearly labelled." |
| `src/pages/about.astro` | Card "Zero Conflicts of Interest" | "No commissions, no fund partnerships, no trail fees…" | Title "How We Earn". "The tools and investigations are free. We also distribute mutual funds as an AMFI-registered Mutual Fund Distributor and earn commission on regular plans. We explain that conflict openly and limit it with public rules." |
| `src/pages/about.astro` | "Where We Draw the Line" | "…no buy buttons, no portfolio nudges, and no recommended-fund lists…" | "Our tools and investigations do not tell readers what to buy, sell or hold. They have no buy buttons and no recommended-fund lists. Fund suggestions happen only inside the Invest with Support service, after a conversation about your needs." Add `tertiary` link to `/invest/`. Add the dated "What changed" note. |
| `src/pages/disclaimer.astro` | "No Investment Recommendations" | "…objective, data-driven… We do not receive any commissions or payments from fund houses." | "Our tools and investigations do not recommend, endorse or promote any mutual fund or AMC. They are data-driven and general. They do not consider your personal situation." |
| `src/pages/disclaimer.astro` | "Independent Platform" | "…no affiliations to… distributors… We do not sell financial products or earn commissions…" | Title "Distribution Relationship". "[Registered name] is an AMFI-registered Mutual Fund Distributor (ARN-[number]). Through the Invest with Support service, we earn commission from AMCs on regular-plan investments. The tools and investigations are separate from that service and are general information only." |
| `src/pages/disclaimer.astro` | "Last Updated" | "January {year}" | Real date through `formatDate()`. |
| `src/layouts/ArticleLayout.astro` | Report disclaimer | Two paragraphs | Add: "Fund Investigator's owner is an AMFI-registered Mutual Fund Distributor. This report is general information. It is not a recommendation to invest in any fund it describes." |
| `src/lib/schema.ts` | `HOME_DESCRIPTION` | "…—with no commissions." | "Free tools to check Indian mutual funds against fair benchmarks, risk and drawdowns. Optional help to invest from an AMFI-registered distributor." |
| `src/lib/schema.ts` | `ORG_DESCRIPTION` | "…— with no commissions and no conflicts of interest." | "Data-driven mutual fund analysis for Indian investors. Free tools and investigations on benchmark returns, risk and drawdowns, plus optional help to invest from an AMFI-registered Mutual Fund Distributor." |
| `src/pages/llms.txt.ts` | Summary line | Same as old `ORG_DESCRIPTION` | Same as new `ORG_DESCRIPTION`. Add `- [Invest with Support](/invest/): Optional help to invest through regular plans; commission disclosed.` |
| `src/pages/styleguide.astro` | `CredibilityStrip` markers | `'No commissions'` | `'Public method'` |
| `src/components/Header.astro` | Desktop and mobile nav | — | Add "Invest" / "Invest with Support" link. |
| `src/components/Footer.astro` | Navigate column; bottom bar | — | Add "Invest with Support" link. Add `DistributorIdentity` variant `inline` next to the copyright line. |
| `src/pages/privacy.astro` | New section | — | "Enquiries about Invest with Support": what we collect by email, why, and how long we keep it. Platform data falls under the platform's policy. We keep the records that distribution rules require. |
| `src/pages/terms.astro` | New section | — | "Distribution Service": the service operates under the ARN; separate client terms apply; the tools give no personalised advice. |
| `docs/content_philosophy.md`, `README.md` | Positioning | No-commission framing | The two routes and the operating rules in Section 3. |

After the changes, this search must return no matches: `grep -rniE "no commission|conflicts? of interest|trail fees|no affiliations|independent platform" src`.

## 7. Disclosures

| Disclosure | Where | Source |
| --- | --- | --- |
| Registered name + ARN + "AMFI-registered Mutual Fund Distributor" | Footer on every page; `/invest/`; `/disclaimer/` | SEBI/AMFI rule on registered name and number in communications (reported effective 2026-05-01) |
| Standard risk warning | Footer; `/invest/` | AMFI/SEBI standard wording |
| How commission works | `/invest/` Section 5.5, before the platform link | Transparency commitment; AMFI commission guidance |
| Commission for suggested and competing schemes | Client conversation, before each investment; keep a dated record | SEBI master circular, cl. 11.5.6 |
| Not an investment adviser; advice incidental to distribution | `/invest/`; `/terms/` | AMFI FAQ on MFD roles |
| Distributor relationship | `/disclaimer/`; report disclaimer | Transparency commitment |
| Dated transition note | `/invest/`; `/about/` | Transparency commitment |

Do not offer gifts or a "free portfolio review" as an incentive (AMFI FAQ Q8, Q12).

## 8. Technical implementation

Work on branch `feat/mfd-distribution-pathway`. Keep unrelated changes, such as `docs/project_log.md`, out of these commits.

### New files

| File | Purpose |
| --- | --- |
| `src/lib/distributor.ts` | Single source for `REGISTERED_NAME`, `ARN`, `ARN_VALID_UNTIL`, `TAGLINE`, `RISK_WARNING`, `SERVICE_EMAIL`, `GRIEVANCE_CONTACT`. Docstring states that every disclosure reads from here. |
| `src/lib/invest.ts` | `investPlatformUrl(placement)` adds UTM parameters to `INVEST_PLATFORM_URL`. It mirrors `deepdive.ts`. If the platform's ARN-mapped onboarding link breaks with extra parameters, return the raw URL. |
| `src/components/ui/DistributorIdentity.astro` | Typed props `variant: 'inline' \| 'block'` and `surface: 'light' \| 'dark'`. Renders name, ARN, tagline, and an optional risk warning. Uses `fi-*` tokens only. |
| `src/pages/invest.astro` | The service page (Section 5). |

### Changed files

- `src/lib/site-urls.ts`: add `INVEST_PLATFORM_URL`.
- Header, Footer, index, about, disclaimer, privacy, terms, ArticleLayout, schema, llms.txt, styleguide: as in Section 6.
- `src/pages/styleguide.astro`: add a `DistributorIdentity` example for both variants and both surfaces.

### Analytics

PostHog already runs on the site. Confirm that autocapture records outbound clicks to the platform with the `utm_content` placement. If it does not, add one capture call on the `/invest/` buttons. Build the funnel: `/invest/` views → platform clicks → conversations → clients.

### Checks before merge

1. `source ~/.nvm/nvm.sh && npm run lint:design`
2. `npm run build`
3. The grep in Section 6 returns no matches.
4. The footer shows the name, ARN, and risk warning on the homepage, a report, and `/invest/`.
5. Mobile nav shows the new link; the menu closes on tap.
6. `/invest/` has one `primary` button per section at most; external links use `target="_blank" rel="noopener noreferrer"`.
7. `/invest/` appears in the sitemap and `llms.txt`.

## 9. Deepdive changes (separate repository)

These changes are small. They support operating rules 1–3.

1. Replace the fund quick-pick chips with an empty search box or category-level examples.
2. Re-cut the homepage promo video and posters without named funds, or keep them and accept the risk until Phase 5.
3. Add a footer line with the registered name, ARN, tagline, and risk warning.
4. Show data source and as-of date on each view.
5. Add no link to `/invest/` or the platform.

## 10. Phases and tasks

| Phase | Work | Owner | Done when |
| --- | --- | --- | --- |
| 0. Inputs and operations | Confirm ARN validity and EUIN. Register on the platform and get the ARN-mapped onboarding link. Get commission schedules. Set the service email, response time, and complaint path. Set the pilot limit (5–10 clients). | Owner | Every item in Section 11 is filled in |
| 1. Disclosure fix | `distributor.ts`, `DistributorIdentity`, footer identity, all Section 6 copy changes except `/invest/` links | Claude + owner review | Checks in Section 8 pass; merged |
| 2. Service launch | `/invest/` page, `invest.ts`, header/footer/homepage/about entry points, privacy and terms sections, `llms.txt` | Claude + owner review | Checks pass; owner completes a test journey on the platform |
| 3. Deepdive alignment | Section 9 changes | Owner or Claude in the Deepdive repo | Changes deployed |
| 4. Pilot and measurement | Run for 3 months. Track `/invest/` views, platform clicks, conversations, clients, AUM, gross and retained commission, service hours, complaints. Track Deepdive users and subscribers as the other channels. | Owner | A monthly snapshot exists for each of the three months |
| 5. Review | Compare channels. Review named-fund articles and Deepdive under MFD rules. Take a legal opinion. Decide on a paid tier and the RA path. | Owner | Decisions recorded in this file |

Phases 1 and 2 can ship together if Phase 0 finishes quickly. If Phase 0 takes longer, ship Phase 1 first. Phase 1 copy must then not mention a service that is not yet live. Use the disclaimer and footer identity only, and remove the false claims.

### Pilot targets (owner to set before Phase 4)

| Metric | Target | Stop or rethink if |
| --- | --- | --- |
| Clients after 3 months | [ ] | [ ] |
| Distributed AUM | [ ] | [ ] |
| Retained commission per service hour | [ ] | [ ] |
| Complaints | 0 unresolved | Any unresolved complaint older than 30 days |

## 11. Owner inputs

Answers recorded 2026-10-04.

| Input | Answer | Needed for |
| --- | --- | --- |
| Registered name (as on ARN) | Ishpreet Singh Modi | Phase 1 |
| ARN | ARN-370951 | Phase 1 |
| ARN validity | 25 Sep 2026 to 05 Sep 2029 | Phase 2 (`/invest/`) |
| EUIN | E710837 (internal use; not shown on the website) | Phase 0 |
| Platform and onboarding URL | **Not chosen.** Phase 1 ships alone. | Phase 2 |
| Service and complaint email | contact@fundinvestigator.com | Phase 2 |
| Complaint handling | Acknowledge within 2 working days; resolve within 30 days; escalate to the AMC, then SEBI SCORES | Phase 2 |
| Review and reply promise | "At regular intervals, and when your needs change. Replies within 2 working days." (decided 2026-10-05) | Phase 2 |
| Phase 1 copy | **Pending approval** of Section 14 | Phase 1 |

**Phase 0 addition:** The AMFI record shows no "Social Media Details". Check whether AMFI requires you to register the website and social handles that carry your ARN. Do this before Phase 1 goes live.

**Copy updates from these answers (apply in Phase 2):**

- 5.2 card 2: "You want a regular check." — "You want your mutual fund holdings reviewed at regular intervals, with reasons for any change."
- 5.4 step 4: "**Reviews.** We review your holdings at regular intervals, and when your needs change. A review can end with no change."
- 5.4 step 5: "…through one contact channel. We reply within 2 working days."
- 5.6 complaints: "Email contact@fundinvestigator.com. We acknowledge within 2 working days and aim to resolve within 30 days. If you are not satisfied, contact the fund house (AMC). You can then use SEBI SCORES."

## 12. Risks and deferred items

| Item | Status | Review in |
| --- | --- | --- |
| Named-fund reports show scheme returns; MFD rules restrict performance claims about schemes | Accepted grey area; no service links from reports | Phase 5 |
| Deepdive is a public tool showing scheme returns | Accepted grey area; made neutral in Phase 3 | Phase 5 |
| Owner's name visible as distributor; reports stay Organization-authored | Accepted; required by the ARN display rule | When RA registration lands |
| SEBI Common Advertisement Code (consultation June 2026) may change rules on past performance and education | Watch | On notification |
| Research and distribution of the same schemes need an arm's-length separate unit under RA rules | Blocks RA registration in the current structure | Before any RA application |
| Paid analytics tier: fee plus commission from the same investor | Not in scope | Phase 5, with legal opinion |
| Client data: CAS statements, KYC | The platform holds KYC; do not collect CAS by email by default | Phase 2 |

## 13. Sources

Sources checked on 2026-10-04. Check later amendments before launch.

- [AMFI master circular for MFDs, January 2026](https://www.amfiindia.com/uploads/AMFI_Master_Cicular_for_MF_Ds_3c7f5ee44f.pdf) ([local copy](AMFI_Master_Cicular_for_MF_Ds_3c7f5ee44f.pdf)): Ch. 7 II.B.4(k) and 4(m) on printed page 36 (PDF page 39); 6(b) on printed page 38 (PDF page 41).
- [AMFI circular CIR/ARN-21/2021-22: sole proprietorship classification](https://www.amfiindia.com/Themes/Theme1/downloads/circulars/AMFICircularno.21dt30-Mar-22Classificationw.r.t.SoleproprietorshipforARNpurposes.pdf)
- [AMFI FAQs on MFD roles and advertising](https://www.amfiindia.com/Themes/Theme1/downloads/FAQsonRoleofMFDsAdvts.pdf)
- [SEBI master circular, March 2026](https://www.sebi.gov.in/sebi_data/attachdocs/mar-2026/1774024028162.pdf): commission disclosure (cl. 11.5.6). Not verified against a local copy.
- [AMFI commission guidance](https://www.amfiindia.com/distributor/mutual-funds-introduction?zoneName=CommissionStructure)
- [Cafemutual: what to post from May 1 (April 2026)](https://cafemutual.com/news/industry/37590-what-to-post-and-what-not-to-post-on-social-media-from-may-1) — trade press; confirm against the primary circular.
- [Cafemutual: how MFDs can comply (May 2026)](https://cafemutual.com/news/guestcolumn/37811-heres-how-mfds-can-comply-with-the-new-sebi-regulations)
- [Fox Mandal: SEBI finfluencer rules, education vs advice](https://foxmandal.in/news/cutting-ties-with-finfluencers-sebi-distinguishes-between-education-advice/)
- [LKS: SEBI RA FAQs 2025](https://www.lkslaw.com/insights/articles/key-clarifications-under-the-sebi-issued-faqs-2025)
- [MediaNama: SEBI Common Advertisement Code consultation (June 2026)](https://www.medianama.com/2026/06/223-lowdown-sebi-treat-finfluencers-ai-avatars-celebrities-under-new-ad-code/)

## 14. Phase 1 copy drafts (for approval)

Phase 1 removes false claims and adds the distributor identity. It does not mention a service that is not live. Phase 2 adds `/invest/`, the entry points, and the route cards.

Text in **bold labels** is structure. Quoted text is the exact copy. "Keep" means no change.

### 14.1 Identity constants — `src/lib/distributor.ts`

| Constant | Value |
| --- | --- |
| `REGISTERED_NAME` | "Ishpreet Singh Modi" |
| `ARN` | "ARN-370951" |
| `TAGLINE` | "AMFI-registered Mutual Fund Distributor" |
| `RISK_WARNING` | "Mutual Fund investments are subject to market risks, read all scheme related documents carefully." |
| `CONTACT_EMAIL` | "contact@fundinvestigator.com" |

### 14.2 Footer — every page

Bottom bar, below the existing copyright line, through `DistributorIdentity` (variant `inline`, `surface="dark"`):

> Ishpreet Singh Modi · AMFI-registered Mutual Fund Distributor · ARN-370951
>
> Mutual Fund investments are subject to market risks, read all scheme related documents carefully.

Copyright line: keep "© {year} Fund Investigator. All rights reserved."

### 14.3 Homepage — `src/pages/index.astro`

**Problem card 3**

- Title: "Commission should come with disclosure."
- Body: "Regular plans pay the distributor a commission every year. Any distributor, including us, should tell you how much, and what service you get for it."

**Closing section ("Why Fund Investigator")**

- Badge: keep "Why Fund Investigator".
- H2: "Because Indian mutual fund investors deserve to see the evidence."
- H2 muted line: "Before any decision, with or without help."
- Body: keep "Fund platforms often compress research into returns, ratings, and buy flows. We built Fund Investigator to inspect the evidence behind performance before forming a view."
- Button: keep "Read why Fund Investigator exists".

All other homepage copy: keep.

### 14.4 About — `src/pages/about.astro`

**Dark section H2**

- "Because Indian mutual fund investors deserve to see the evidence."
- Muted line: "Before any decision, with or without help."

**Card 1** (replaces "Analytics, Not Sales")

- Title: "Analytics First"
- Body: "We do not rank funds to push a purchase. We show the evidence behind performance so you can check the analysis before you decide."

**Card 2** (replaces "Zero Conflicts of Interest")

- Title: "How We Earn"
- Body: "Our tools and investigations are free. Fund Investigator is run by an AMFI-registered Mutual Fund Distributor. Distributors earn commission from fund houses on regular plans. If you ever invest through us, we will show that commission before you decide."

**Card 3** ("Transparent Methodology"): keep.

**"Where We Draw the Line"**

- Paragraph 1: "Our tools and investigations provide analysis, not recommendations. They do not tell readers what to buy, sell or hold. The work here is to make the evidence easier to inspect."
- Paragraph 2: "That means no buy buttons, no portfolio nudges and no recommended-fund lists in our tools or investigations. The reader keeps the decision. We provide the research trail."

**New short section: "What Changed"** (after "Where We Draw the Line", same `Section`)

- H2: "What Changed"
- Body: "In September 2026, the founder of Fund Investigator registered with AMFI as a Mutual Fund Distributor (ARN-370951). Registration allows us to earn commission if readers invest through us in future. That would create a conflict of interest, so we state it here. The tools and investigations stay free, and our method stays public."
- Date line: "Updated {formatDate('2026-10-04')}" (or the merge date).

### 14.5 Disclaimer — `src/pages/disclaimer.astro`

**"Not Financial Advice"**: keep.

**"No Investment Recommendations"** (replaces the current paragraph)

> Fund Investigator's tools and investigations do not recommend, endorse or promote any specific mutual fund, asset management company or investment strategy. They are data-driven and general. They do not consider your personal situation, goals or risk tolerance.

**"Distribution Relationship"** (replaces "Independent Platform")

> Fund Investigator is run by Ishpreet Singh Modi, an AMFI-registered Mutual Fund Distributor (ARN-370951). Mutual fund distributors earn commission from asset management companies on investments in regular plans. Fund Investigator has no other affiliation with any asset management company. Our tools and investigations are general information and are not linked to any distribution activity.

**"Data Accuracy and Timeliness"**, **"Past Performance Disclaimer"**, **"Limitation of Liability"**, **"Use at Your Own Risk"**, **"Changes to This Disclaimer"**: keep.

**New closing line** above "Last Updated":

> Mutual Fund investments are subject to market risks, read all scheme related documents carefully.

**"Last Updated"**: "Last updated: {formatDate(<merge date>)}" — replaces "January {year}".

### 14.6 Report disclaimer — `src/layouts/ArticleLayout.astro`

Paragraphs 1 and 2: keep. Add paragraph 3:

> Fund Investigator is run by an AMFI-registered Mutual Fund Distributor (ARN-370951). This report is general information. It is not a recommendation to invest in any fund it describes.

### 14.7 Machine-readable descriptions

| Location | Phase 1 text |
| --- | --- |
| `HOME_DESCRIPTION` (`schema.ts`) | "Compare AMFI-registered mutual funds by benchmark returns, SIP IRR, Sharpe ratio, volatility, and drawdown." |
| `ORG_DESCRIPTION` (`schema.ts`) and `llms.txt` summary | "Data-driven mutual fund analysis for Indian investors. We investigate fund performance using risk-adjusted metrics, rolling returns, and benchmark comparisons. Fund Investigator is run by an AMFI-registered Mutual Fund Distributor (ARN-370951)." |
| `llms.txt` Disclaimer link text | "Data sources, methodology notes, distributor disclosure, and investment risk disclosures." |
| Styleguide `CredibilityStrip` markers | `['Data-backed', 'Reproducible', 'Public method']` |

### 14.8 Not changed in Phase 1

- Header and footer navigation (the `/invest/` link arrives in Phase 2).
- Privacy and terms (no new data collection in Phase 1).
- Report bodies (review deferred to Phase 5).
- Deepdive (Phase 3).

## 15. Hub funnel (history; superseded)

> **Superseded 2026-10-05** by `docs/mfd_funnel_handoff.md` (Academy deferred, three-link nav, no `/investigate/` hub, launch without a platform). Kept as the decision history. The v4 wireframe file (`mfd_funnel_proposal.html`) was deleted on 2026-10-05.

Added 2026-10-04.

### Evidence (PostHog, 90 days to 2026-10-04)

| First page | Sessions | Left after one page | To Deepdive | To Subscribe |
| --- | --- | --- | --- | --- |
| A report | 85 | 77 (91%) | 1 | 2 |
| Homepage | 58 | 42 (72%) | 6 | 0 |
| Other | 9 | 7 | 2 | 0 |

Reports are the main entry point. Traffic is the main limit. The counts include the owner's visits.

### Decisions (owner, 2026-10-04)

1. **Distribution is the main action.** It is the only revenue today. The gold hero button is "Invest with Support" and links to `/invest/`, never straight to WhatsApp or the platform.
2. **WhatsApp is the contact channel.** Email stays as a fallback.
3. ~~**The content section is "Learn".**~~ Superseded 2026-10-05: the section is "Academy" (see below).

### Decisions (owner, 2026-10-05)

1. **Homepage has four sections.** Hero → How we help → Academy + Subscribe → Investigate (DIY fallback). Demo: [mfd_copy_demo.html](mfd_copy_demo.html).
   - **Hero:** one gold "Invest with Support" (`/invest/`).
   - **How we help:** three cards on the distribution service only: funds chosen through research, matched to your risk profile, support after you invest. A commission line with "See the costs →" sits under the cards. Gold "See how support works". SIFs join card 1 after the promotion-rules check. Do not use the word "expertise".
   - **Academy + Subscribe:** the two existing guides (Five Questions, Categories Explained), shown with their `hook` text, which names no fund. Gold "Subscribe". Secondary "Browse the Academy".
   - **Investigate:** a Deepdive snapshot and three features. Secondary "Start investigating" (`/investigate/`), text link "Open the app ↗". No gold button.
   - Removed: The Sales Trap, Investigations, the Deepdive video, and "Why FI".
2. **The content section is "Academy"** (`/academy/`). Owner adds more guides before release.
3. **Nav:** Invest · Academy · Investigate · About. Four equal text links. No Subscribe or Deepdive button in the nav. Subscribe stays in the footer, the Academy section and the article end.
4. **Label rule:** nav links say "Invest". Buttons and the page title say "Invest with Support".
5. **`/investigate/` is the DIY hub page** (no dropdown). It holds the Deepdive App (snapshot, video, features) and the fund investigations list. `/reports/*` URLs stay. Avoid the label "Research" (SEBI RA meaning).
6. **The two guides use named funds as worked examples.** They carry no `/invest/` link until they are rewritten without fund names.
7. **Hero is final.** Headline: "We investigate, so you can *invest.*" Subtitle: "Investing is complex, and often emotional. Our analysis brings clarity, our support keeps you on course, and our transparency earns your trust."
8. **Homepage copy approved as a first pass** (demo, 2026-10-05). Final wording check before Phase 2 release.
9. **`/invest/` has four sections** (demo, 2026-10-05):
   - **Hero (final, 2026-10-05):** H1 "We do the investigation. *You make the call.*" Body: "We help you choose your funds, and we explain their risk, suitability and costs. Then we review them with you at regular intervals." Gold "Message us on WhatsApp" (source `invest_hero`). Fee line under the button (decision 11). Email fallback.
   - **How it works:** a timeline (horizontal from `lg`, vertical below it). Each step shows who acts (you, together, us). H2: "Five steps. You approve every investment." 5 steps: message us → first conversation → funds and costs → you invest on [Platform] → reviews and service. The "Not the right fit?" line follows.
   - **Who we are:** three compact cards: Our registration, How we earn (`#costs`), and Our transparency. One link, "Full disclosures", goes to the distribution section of `/disclaimer/`. That section holds the direct vs regular table, the ₹ example, the fund-house list, the commission rates by scheme, and complaints.
   - **Ready to start:** gold WhatsApp (source `invest_cta`), email, and "Existing clients: log in to [Platform]". It also says we never ask for KYC documents on WhatsApp.
   - Removed: "Who this is for", "Two ways to invest" (the table moves to `/disclaimer/`), and "What changed" (it moves to `/about/`).
   - AMFI code of conduct (master circular, Ch. 4, clause 4): 4(c) disclose the commissions on the competing schemes (step 3 and the commission-rates link on `/disclaimer/`); 4(d) disclose the fund houses: we are empanelled with all AMCs, so the copy says "every fund house" instead of a list; 4(k) no AMC name, logo or mark without approval, so none is shown.
10. **Owner inputs closed (2026-10-05).** Empanelled with all AMCs. Reviews "at regular intervals" (no fixed frequency in the copy). The owner sets the WhatsApp number and confirms the platform by 2026-10-12. Keep the "every fund house" claim true: check it when a new AMC launches.
11. **Fee message: "No fee from you", always completed in the same place.** The commission comes from the regular plan's expense ratio, so the investor bears it indirectly. Never say "free", "zero cost", "no cost to you" or "we don't charge anything".
    - `/invest/` hero: "No fee from you. We earn a commission from the fund house, which is part of the regular plan's cost. See the costs"
    - "How we earn" card: title "No fee from you". Body: "The fund house pays us a commission from the regular plan's expense ratio. So a regular plan costs more each year than the direct plan of the same fund."
    - Homepage, under "How we help": "You pay us no separate fee. We earn a commission from the fund house on regular plans, so regular plans cost more than direct plans. See the costs →"

### Proposals

1. **Academy section (start now; was "Learn").** Articles that teach decisions and name no fund. They can link to `/invest/` because they are not scheme analysis. Tagline: "The basics, investigated." Write 2–3 articles before Phase 2.
2. ~~**Homepage order (Phase 2).**~~ Superseded 2026-10-05 by the four-section homepage above.
3. **Hero (Phase 2). Final 2026-10-05: headline option 1.** One button: `primary` "Invest with Support" (`/invest/`). Subtitle: "Investing is complex, and often emotional. Our analysis brings clarity, our support keeps you on course, and our transparency earns your trust." Headlines: (1, recommended) "We investigate, so you can invest." (2) "Before you invest, we investigate." (3) "Your Mutual Funds Deserve Our Investigation". No disclosure line in the hero.
4. **Homepage cards show Academy guides only.** No named-fund metrics on a page whose main action is distribution. Needs 2–3 Academy guides first. The fund investigations link sits in the Investigate section, not here.
5. **WhatsApp first (Phase 2).** `/invest/` main action is "Message us on WhatsApp" through a `wa.me` link with prefilled text and a source code. The platform link becomes step 2. Phase 2 no longer waits for the platform choice. Do not call it a "free review".
6. **WhatsApp setup.** Separate number on the free WhatsApp Business app. Profile shows name, ARN, tagline and risk warning. Greeting message states the commission and links to the costs on `/invest/`. No KYC or CAS in chat. No fund names on broadcast lists. Keep dated commission-disclosure records. Add WhatsApp (Meta) to the privacy policy and the number to the Phase 0 AMFI channel check.
7. **Events.** `route_choice`, `invest_view`, `conversation_request` (with `channel`), `platform_click`, `deepdive_click`, `subscribe_click`. Add an internal-user filter.

New entry-point placements: `homepage_hero` (`primary`, `/invest/`) and `learn_end` (route band, `/invest/`).

Wording rules follow the AMFI FAQs on MFD roles (Q1–Q5): use "help to choose", "suitable", "goal-based", "risk profile", "review"; avoid "financial planning", "advice" or "adviser" in promotion, "wealth", scope beyond mutual funds and SIFs, and words that play down risk. SIF distribution is enabled on the ARN; check SIF promotion rules before SIFs appear in copy.

### Open decisions

1. ~~Hero headline~~ Closed 2026-10-05: "We investigate, so you can invest."
2. ~~Problem section~~ Closed 2026-10-05: replaced by "How we help".
3. WhatsApp business number.
