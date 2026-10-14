# Project Log: Fund Investigator

**Goal:** Build a fast, content-led mutual fund hub (fundinvestigator.com) on Astro and Cloudflare Pages.
The site is distribution-led: its main goal is booked first calls for the "Invest with support" service from an
AMFI-registered Mutual Fund Distributor (SIF-enabled). Free investigations, and the Deepdive app for email
subscribers, build authority. Success = low-ops, solo-friendly delivery that earns distribution revenue; paid research is deferred.

---

## Important Links

- Production site: https://fundinvestigator.com
- Deepdive app: https://deepdive.fundinvestigator.com
- MailerLite developer docs: https://developers.mailerlite.com/docs
- Astro docs: https://docs.astro.build
- Cloudflare Pages Functions docs: https://developers.cloudflare.com/pages/functions/
- Design tokens: `tailwind.config.mjs` · Content guide: `docs/content_philosophy_v2.md` (v1: `docs/content_philosophy.md`) · Deployment: `docs/DEPLOYMENT.md`
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
| 1 | Premium/first-paid feature set, price point, and billing/hosting approach | 2026-06-22 | S4 | 🟡 Open |
| 2 | Whether/when to pursue the advisor / white-label B2B research line | 2026-06-22 | S4 | 🟡 Open |
| 3 | SEBI Research Analyst implications of charging for research | 2026-06-22 | S4 | 🟡 Open |
| 4 | Hosted paid tier (Substack/Ghost/Beehiiv/MailerLite) vs custom infra | 2026-06-22 | S4 | 🟡 Open |
| 5 | Add a plain-language "verdict layer" to Fund Deepdive | 2026-06-22 | S5 | 🟡 Open |
| 6 | Rebrand app to "Deepdive by Fund Investigator" (approved; implement in Deepdive repo) | 2026-06-22 | S5 | 🟢 Approved, pending impl |
| 8 | Option C "Suggest a Fund" email capture — resurfaced as a mid-article subscribe pitch ("Want your fund investigated? Subscribe and reply with its name"). Copy drafted but not shipped; it is a real commitment (reader replies must feed the investigation queue), so it waits until we are ready to honor requests | 2026-06-22 | S6; revisited S17 | 🟡 Parked |
| 12 | Homepage teaser punchline — keep long-term vs shorter variant | 2026-05-04 | S1 | 🟡 Open |
| 22 | Hero fund-search console — replace the primary CTA with a live fund lookup that deep-links into Deepdive (design agreed, build parked) | 2026-07-12 | S10 | 🟡 Parked |
| 23 | Add `?fund=<scheme_code>` deep-link support to the Deepdive app — prerequisite for #22, and useful on its own for linking a report to the fund it investigates | 2026-07-12 | S10 | 🟡 Parked |
| 31 | **Launch the Substack Five Checks series as individual investigations of popular funds.** The intended reader already owns or is considering the named fund. Select funds for popularity and prospect relevance, then report whatever the five checks show; include a popular fund with weaker or mixed evidence early to establish editorial independence. Do not add fund comparisons or suitability conclusions until an explicit individual risk-profile layer and its editorial boundaries exist | 2026-07-21 | S19 | 🟢 Approved; editorial strategy documented |
| 32 | **Article footer and discovery enhancements — curated related investigations, sharing controls, and filed-under tags.** For related content, show up to two manually selected current reports after an article's conclusion, reject archived destinations, and keep historical reports limited to their successor notice. If sharing is added, keep it restrained and audience-relevant (Copy link, WhatsApp, LinkedIn). If tags are exposed, use a quiet footer row rather than a second navigation rail. These remain separate decisions after the article navigation and metadata work; do not add them by default | 2026-07-22; expanded 2026-08-08 | S20; S34 | 🟡 Parked |
| 41 | Extend `/styleguide` to visually cover page-composition patterns it currently doesn't show: Navigation, Footer, Background Accents (the hero/Why-FI radial gradient), and Section Labels. **Updated:** Deepdive App Mockup and Email Input dropped from this list — both describe UI that no longer exists; moved into `style_spec.md`'s "What Was Deliberately Excluded" log instead. Navigation, Footer, and Section Spacing had also drifted from the live implementation — `style_spec.md` now points at the owning component file instead of restating values. Building live `/styleguide` sections for Nav/Footer/Background Accents is still real UI/Astro work, not a doc edit — separate session | 2026-08-03 | S24 | 🟡 Open |
| 51 | **Optional, low-priority cosmetic follow-up from #50**: the "JS Snippet installation" Web Analytics site's host allowlist (`(fund-investigator.pages.dev\|fundinvestigator.com)$`) doesn't cover preview-branch subdomains like `dev.fund-investigator.pages.dev`, so its beacon 404s there — browser console noise only on preview deploys, does not affect production. Widening the host pattern would fix it, but doing this via the API hits the same wall discovered in #50: the connected Cloudflare API token can read Pages/Web-Analytics config but cannot write it (confirmed via the failed `PATCH` in #50) — would need either a manual dashboard edit or a token-permission upgrade (Account → Cloudflare Pages → Edit) first | 2026-08-07 | S31 | 🟡 Open |
| 54 | Add a rendered-page accessibility scan (axe or pa11y against `dist/`) to CI. Existing checks cannot detect every rendered colour combination. Defer this task because the owner prefers simple checks over extensive rule testing | 2026-10-03 | S37; updated S39 | 🟡 Parked |
| 55 | **Design — high priority: align the design references.** Update `docs/style_spec.md` card descriptions to match the shared components and current homepage. Check colours, padding, corners, and hover styles. Prefer references to component props over repeated numeric specifications. Keep existing `/styleguide` examples consistent. Complete when the references agree with the website. Page-composition examples remain separate under #41 | 2026-10-03 | S39 | 🟡 Open (S49 — new homepage cards, centre axis and light ReportCard documented; older card specs still to align) |
| 57 | **Design — high priority: use consistent, visible focus styles.** Replace half-opacity focus rings in Input, SearchInput, and LoginForm with the approved full-opacity colour. Check error and normal states. Confirm shared Button focus styles on light and dark surfaces. Complete after a keyboard check confirms visible focus across these controls | 2026-10-03 | S39 | 🟢 Queued |
| 60 | **Distribution — high priority: set up the WhatsApp business number** (WhatsApp Business app, profile with name/ARN/risk warning, greeting with commission note, `wa.me` link with source code). Blocks Phase 2. **S41:** owner sets the number and confirms the platform by 2026-10-12. **S42:** number is +91 96250 26859, wired into the demo. Launch without a platform: step 4 names none, the existing-client login line is dropped. Texts drafted in `docs/mfd_whatsapp_kit.md`; owner to approve, confirm reply time and email, and choose the transaction route before replying to enquiries. **S43:** booking is the first contact route (Zoho Bookings, free plan, link in the handoff); WhatsApp is second. Owner to set the booking form (30 min, holdings-range question, minimum fields, reminders). **S47:** the Zoho changes for beginners moved to #88 | 2026-10-05 | S40; updated S41, S42, S43, S47 | 🟡 Open (S51 — reply time confirmed: within 1 business day; kit texts updated) |
| 61 | **Content — high priority: write Academy guides** (was "Learn"; no named funds). The homepage launches with the two existing guides; more guides are needed before release, and they are the main traffic lever | 2026-10-05 | S40; updated S41 | 🟡 Open (S42 — Academy deferred: new guides live under Investigations; revisit a separate Academy at ~8–10 guides) |
| 62 | **Analytics — medium priority: add PostHog funnel events** (`route_choice`, `invest_view`, `conversation_request` with channel, `platform_click`, `deepdive_click`, `subscribe_click`) and an internal-user filter. **S43:** add `review_booking_click` with placement; drop `platform_click` until a platform exists **S44:** built: `invest_view`, `review_booking_click`, `conversation_request` (channel), `deepdive_click`, `subscribe_click`, each with a placement, sent from data attributes by one listener in `Layout.astro`. Left: the internal-user filter in PostHog (a project setting). **S47:** new placement `homepage_beginner` on `review_booking_click`; count completed bookings by the Zoho form answer (#88), manually at first | 2026-10-05 | S40; updated S43, S47 | 🟡 Open (S49 — placements now homepage_hero/services/final, invest_*, footer WhatsApp; homepage_beginner and homepage_pricing retired; internal-user filter left; S51 — new WhatsApp placement `invest_faq`) |
| 65 | **Compliance — high priority: draft the distribution section of `/disclaimer/`.** It holds the detail moved off `/invest/`: commission rates by scheme (AMFI code 4(c)), the direct vs regular table, the ₹10 lakh cost example, and the complaints process. `/invest/` links to it once ("Full disclosures") **S44:** commission rates are not published on the site (confidentiality, competition); each client gets the commission on each suggested scheme in writing before investing. The section explains how commission works, gives the direct vs regular comparison and a ₹10 lakh example with an illustrative rate, and the complaints process. The anchor `/disclaimer/#distribution` and the per-client disclosure sentence are live | 2026-10-05 | S41 | 🟡 Open |
| 68 | **Content — medium priority: the two Academy guides name funds as worked examples** (HDFC Flexi Cap; Parag Parikh, Nippon, ICICI, HDFC BAF). Until they are rewritten without fund names, they carry no `/invest/` link, and homepage cards use their `hook` text (the Five Questions `description` names a fund) | 2026-10-05 | S41 | 🟡 Open |
| 69 | **Compliance — low priority, ongoing: keep "empanelled with every fund house" true.** Recheck empanelment when a new AMC launches | 2026-10-05 | S41 | 🟡 Open |
| 71 | **Design — medium priority, later: dark hero and footer only; headings instead of pills.** Middle sections white/`fi-light` only. Changes: `/reports/` list moves out of the dark hero into a white section (needs a light `ReportCard` variant and light filter chips, active chip `fi-ink` not gold); article end card from dark to `fi-light`; `/about/` loses its two mid-page dark bands. Drop section pills; keep a plain caption only where the heading doesn't name the section (homepage Investigations, `/invest/` hero). Rewrite `style_spec.md` "Section Background Rhythm" and §5 "Section Labels (Pills)". `/styleguide` exempt | 2026-10-05 | S42 | 🟡 Open |
| 72 | **Product — later: CAS upload with a branded portfolio report.** The visitor uploads a CAS and gets an overlap, benchmark, cost and risk-fit report with our branding. Grows from the portfolio review call (demo v2). Needs secure handling of personal financial data, a privacy section, and the review-vs-advice compliance check first | 2026-10-10 | S43 | 🟡 Parked |
| 73 | **Website — later: "Three ways to invest" comparison on `/invest/`** (do it yourself · fee-only adviser (RIA) · Invest with Support: plan type, how you pay, who chooses, reviews, financial plan, best for). Answers "why pay the commission?" for ₹10L+ investors. Drafted in demo v2, removed by the owner for now. Needs a check that comparing with RIAs is acceptable in MFD promotion | 2026-10-11 | S43 | 🟡 Partly done (S51 — two-column "Same fund. More support." direct vs regular comparison on `/invest/#costs`; the fee-only adviser column is left out) |
| 74 | **Content — decision guides under Investigations** (no named funds): lump sum or STP for a bonus, fund overlap, tax when you redeem, what to do when markets fall. They may link to `/invest/`. Publish under `/reports/` (Academy stays deferred); when the first one ships, decide on a new category, which needs both the `src/content.config.ts` enum and `categoryLabels` in `src/pages/reports.astro`. Then feature them on the homepage Investigations section. Feeds #61 | 2026-10-11 | S43 | 🟡 Open |
| 75 | **Compliance — high priority: the Deepdive snapshot shows fund names.** `public/videos/promo-desktop-poster.webp` shows the quick picks (Parag Parikh, HDFC, ICICI) on the homepage and `/reports/`. The homepage promotes the service, so it must name no fund. Options: (1, recommended) retake after the Deepdive quick picks are removed (proposal §9); (2) crop the image now | 2026-10-11 | S44 | 🟡 Open (S49 — homepage no longer shows the snapshot; /reports/ still does) |
| 76 | **Compliance — medium priority: the header and footer "Invest" link appears on report pages.** The handoff puts Invest in the global nav, but also says no `/invest/` link on fund analyses or `/reports/`. No booking or WhatsApp link appears there. Recommendation: keep the nav link, because the rule is about links in the content; confirm | 2026-10-11 | S44 | 🟡 Open |
| 78 | **Compliance — high priority: add the enquiries section to `/privacy/`** (WhatsApp kit §5, plus Zoho booking-form data). Needs the chat retention period from the owner (#60) | 2026-10-11 | S44 | 🟡 Open |
| 80 | **Compliance — medium priority: check `/about/` and `/disclaimer/` for the general "regular plans cost more than direct plans" wording.** It is not always true across funds (one fund's direct plan can cost more than another fund's regular plan). As an MFD we say only that our commission is built into the regular plan's expense ratio | 2026-10-11 | S45 | 🟡 Open |
| 83 | **Compliance — medium priority: confirm the homepage sample brief.** `SampleBrief` shows illustrative values (41% overlap, 2 of 5 lag benchmark, 1.6% average expense ratio, mix 82/14/4 → 65/28/7), labelled "Sample", with no fund names and no returns. Check it against the MF advertisement rules; swap in values from a real anonymised brief once one exists | 2026-10-11 | S46 | 🟡 Open |
| 84 | **Design — medium priority: #71 versus the S46 homepage.** S46 added one mid-page dark band ("How we are paid") by owner choice, which differs from #71 ("dark hero and footer only"). Decide whether #71 still applies to `/reports/`, `/about/` and the article end card, and whether the other pages drop their labels like the homepage. **S47:** `/invest/` has dropped all its labels | 2026-10-11 | S46; updated S47 | 🟡 Open (S49 — homepage has no mid-page dark band now: dark hero and footer only; decide #71 for /reports/, /about/, article end card) |
| 85 | **Website — low priority: `ReportCard` footer.** Left-aligned "Read investigation →" link instead of the centred, letter-spaced caption. Site-wide (also `/reports/`), so held back from the homepage-only S46 | 2026-10-11 | S46 | 🟡 Open |
| 86 | **Website — low priority: header and content alignment.** At wide screens the header logo sits 40px right of the section content (the header pads inside `max-w-7xl`, `Section` pads outside it). Existed before S46 | 2026-10-11 | S46 | 🟡 Open |
| 87 | **Copy — high priority, before release: the first-call section on `/invest/`.** The column "If you already invest: a portfolio review" lists overlap, benchmark, costs and fit, which suggests they happen on the call. They need the client's holding details and come after the call as a written review. Agreed direction: the page shows the result and broad steps; the procedure (what to share, how, when) goes in the Zoho confirmation email. Rewrite the column and step 2 "First conversation"; the S47 draft was rejected as not persuasive enough. Inputs that help: what clients value most, one concrete example finding | 2026-10-12 | S47 | 🟡 Open (S49 — existing-investor points now follow the new review definition; the "after the call" procedure is in the FAQ, the column still reads as on-call) → ✅ Resolved (S51): the first-call section is replaced by the You/We journey; the review happens after the call, from the client's CAS |
| 88 | **Distribution — high priority (owner): update Zoho Bookings for both visitor groups.** Title and description that welcome first-time and existing investors; host name "Fund Investigator" (no-byline rule, #29); required question "First investment / Existing portfolio"; check that no field requires existing holdings; confirmation email says what to share, how (never WhatsApp) and when the written review arrives. The homepage beginner button already links to booking | 2026-10-12 | S47 | 🟡 Open (S49 — host name should now be the owner's name, to match the homepage final section; S51 — the confirmation email also explains how we help the client get their CAS, and shows the new SIF tagline) |
| 89 | **Compliance — high priority: direct vs regular wording on promotion pages.** S47 changed the homepage costs point to "You pay through the regular plan's expense ratio, which is higher than the direct plan's. Our commission comes from that difference." This conflicts with the S45 rule (do not compare direct and regular costs on promotion pages). `/invest/#costs` already says "a regular plan costs more each year than the direct plan of the same fund". Options: (1) allow a same-fund comparison only, which is always true, and update the S45 rule; (2) go back to the S45 wording on both pages. Linked to #80 | 2026-10-12 | S47 | 🟡 Open (S49 — homepage fee line no longer compares plans; the /invest/ FAQ compares direct and regular for the same fund (option 1) — owner to confirm) → ✅ Resolved (S51): option 1, same-fund comparison, in the `/invest/` comparison table |
| 90 | **Website — high priority (owner): add photo and 2–3 credentials** to `src/lib/distributor.ts` (`OWNER_PHOTO`, `CREDENTIALS`). The homepage final section shows them automatically; hidden while empty | 2026-10-14 | S49 | 🟡 Open |
| 91 | **Deepdive — high priority (owner): email-based access before deploy.** The homepage subscribe strip promises "Access to Deepdive". Then point the remaining open Deepdive links (footer, `/reports/`, `/about/`, articles) at the access flow | 2026-10-14 | S49 | 🟡 Open |
| 92 | **Copy — low priority: footer tagline.** "Investigate Before You Invest" is from the research positioning; draft option "Analysis first. Then we help you invest." | 2026-10-14 | S49 | 🟡 Open |
| 93 | **Content — medium priority: update the content guidelines.** Split the handoff §2 word list into legal limits (advice/adviser, independent, anything that plays down risk) and old tone choices; add rules for promoting the service (claims, differences, proof) to `docs/content_philosophy.md` | 2026-10-14 | S49 | ✅ Resolved (S50): `docs/content_philosophy_v2.md` |
| 94 | **Compliance — medium priority: check the site copy against the AMFI MFD FAQ PDF** (`docs/FAQsonRoleofMFDsAdvts (1).pdf`), including the references an outside v4 draft cited (Q.1, Q.3, Q.8(c), Q.10, Q.12(c), Q.13, Q.14) | 2026-10-14 | S49 | 🟡 Open |
| 95 | **Deploy — high priority: open a PR from `dev` to `main`.** The funnel branches are merged into `dev` (20 commits ahead of `main`); production has no `/invest/` and no booking buttons yet (PostHog, 30 days: no booking or WhatsApp events). Push `dev` first (`origin/dev` is at S47). **S51:** `dev` pushed (`6a83d83`, 23 commits ahead of `main`). After launch, review clicks per placement after 2–3 months and drop the weakest button pair | 2026-10-14 | S49; updated 2026-10-14 | 🟡 Open |
| 96 | **Docs — medium priority: fix two stale rules in handoff §2.** Item 3 says the visitor "sends no documents" (wrong: the detailed review needs holding details after the first call); item 5 keeps the retired "name only next to the ARN" rule | 2026-10-14 | S50 | 🟡 Open |
| 97 | **Content — low priority: v1 vs v2 content guide.** v1 has the new goal line but still says "not a salesperson" and "understate". Retire v1 (move to archive) or keep it as history | 2026-10-14 | S50 | 🟡 Open |
| 98 | **Content — medium priority: confirm two v2 calls.** (a) "Partner" and "wealth" are tone choices, not legal limits; (b) owner byline on fund analyses that name a scheme: case by case | 2026-10-14 | S50 | 🟡 Open |
| 99 | **Copy — high priority (owner): check the S51 draft copy on `/invest/`.** The comparison rows, the You/We journey text, the three product cards (`src/lib/products.ts`: SIP minimum, SIF ₹10 lakh rule, LRS, NRIs), and the new FAQ answers. Two approved answers changed: "Is there a minimum amount?" (was "No minimum for mutual funds", which is not correct) and "What happens after the call?" (now names the CAS) | 2026-10-15 | S51 | 🟡 Open |
| 100 | **Compliance — high priority (owner): use the SIF tagline outside the site.** AMFI requires "AMFI Registered Mutual Fund Distributor & SIF Distributor", with name and ARN, in all communication. Update the WhatsApp Business profile, Zoho Bookings page and emails, and email signature. On the site, decide whether the `/about/` sentence "As an AMFI-registered Mutual Fund Distributor…" also changes | 2026-10-15 | S51 | 🟡 Open |
| 101 | **Distribution — high priority (owner): choose how clients send their CAS** (email, Zoho upload or other; never WhatsApp). Then add it to the Zoho confirmation email (#88) and the privacy policy (#78) | 2026-10-15 | S51 | 🟡 Open |
| 102 | **Compliance — medium priority: "No charge for the call"** in the call details on the homepage hero and `/invest/` hero. It is close to the banned "free" wording, and the commission explanation is not next to it. Options: keep, or "30-minute first call · No obligation to invest" | 2026-10-15 | S51 | 🟡 Open |
| 103 | **Website — medium priority: show the `SampleBrief` on `/invest/`** next to journey stage 3, so the "short brief" is visible. Waits for #83; may need a light-surface variant | 2026-10-15 | S51 | 🟡 Parked |
| 104 | **Website — low priority: `Timeline` component is now used only in `/styleguide`.** Delete it, or keep it for a later page | 2026-10-15 | S51 | 🟡 Open |

---

## Session Log

<!-- Sessions in reverse chronological order (newest first) -->

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
