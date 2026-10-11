# Homepage funnel recommendations

Date: 2026-10-11

Updated: 2026-10-12, with the owner's decisions on the hero, the second section and the costs section.

Status: Homepage and `/invest/` changes implemented and committed on 2026-10-12 (S47). Pending: the first-call copy (log #87), the Zoho booking update (log #88), the direct vs regular wording (log #89), and route measurement.

Source branch: `feat/mfd-distribution-pathway`

Source commit: `530b695`

The site is distribution-led. Portfolio reviews are the main action. Deepdive is an optional route for visitors who prefer to invest on their own.

Keep portfolio reviews as the main action. Add a clear beginner route. Give each supporting action a distinct purpose.

These recommendations reflect the homepage review and the owner's later decisions.
They update the proposed action placement in [the funnel handoff](mfd_funnel_handoff.md).
They do not describe completed changes or measured conversion improvements.

## Tasks: what and why

| Done | Task | What to change | Why |
|---|---|---|---|
| [x] | Keep the hero copy | Keep the headline and the current subtitle. | Owner decision (2026-10-12). The details below the button carry the specifics. |
| [x] | Use one hero action | Keep only “Book a portfolio review”. Remove the secondary “How support works” button from the hero. | One action gives a clearer decision. Visitors who need more information reach section 2 directly below. |
| [x] | Explain the first call | Add below the hero button: “30-minute first call · No charge for the call · No obligation to invest through us”. | These details reduce uncertainty at the moment of decision. “No charge” is scoped to the call so that the service never reads as free. |
| [x] | Rework the links after the problem-and-solution section | Remove “Why Fund Investigator exists”. Keep About in the navigation. Keep “How support works →” as a text link, but point it to `/invest/#review`. | Section 2 already shows the short version of the `#who` copy. The review details are the next useful step. |
| [x] | Add a beginner invitation after the problem-and-solution section | Add “Making your first mutual fund investment?” with a short explanation. Use “Discuss your first investment” as a secondary button. | New investors need an invitation that does not assume an existing portfolio. |
| [ ] | Align the booking experience | Make the appointment title and description welcome beginners and existing investors. Use “Fund Investigator” as the host name. Add a required form question: “First investment / Existing portfolio”. | The booking page must match both entry buttons. The host name follows the no-byline rule. The question splits completed bookings by visitor group. |
| [x] | Rework the costs section | Change the heading to “What do you pay for our services?”. Remove the intro text and the “See the costs” link. Keep the three points, then the two actions, then the ARN line. | Visitors read the costs before they decide. The full detail lives on `/invest/` and the disclosures. |
| [x] | State the cost in the first costs point | Body text: “You pay through the regular plan's expense ratio, which is higher than the direct plan's. Our commission comes from that difference.” | Without the intro text, “No separate fee from you” can read as “free”. The service must never be described as free. |
| [x] | Keep the costs-section actions | Keep “Book a portfolio review” (gold) and “Ask a question on WhatsApp” (secondary), after the three points on every screen size. | They serve two needs: booking, and resolving a question. |
| [x] | Improve the mobile layout of section 2 | Combine each problem-and-answer pair into one compact mobile card. | This reduces scrolling. |
| [x] | Move “View all investigations” | Place the text link below the two guide cards, aligned left. | Readers see examples before choosing to browse more. |
| [x] | Separate the email invitation | Place it after “View all investigations”, with clear spacing. Keep “Get new guides by email”, but use a secondary button. | Email serves visitors who want future contact. It should remain distinct from browsing and booking. |
| [x] | Clarify the independent route | Rename “Open Deepdive” to “Check a fund with Deepdive”. Keep it secondary and last. | The label explains the tool's purpose. Deepdive is an optional route, not a co-equal offer. |
| [x] | Clarify navigation | Rename “Invest” to “Invest with support”. Keep navigation labels consistent where they identify the same service. | Visitors can distinguish personal support from investigations and independent tools. |
| [ ] | Check and measure the routes | Check desktop, mobile, destinations, and booking wording. Track the beginner button as `review_booking_click` with `placement: 'homepage_beginner'`. Count completed bookings by the booking-form answer. | We need to know which route produces conversations, beyond button clicks. A new placement keeps existing funnel queries working. |

## Invest page (decided and implemented 2026-10-12)

| # | Section | Actions |
|---|---|---|
| 1 | Hero | Book a portfolio review (gold); Ask a question on WhatsApp; “30-minute first call · No charge for the call · No obligation” |
| 2 | How it works (`#how-it-works`), five steps | none |
| 3 | What happens in the first call (`#first-call`): “For everyone” (goals, time frame, risk profile), then “If you already invest: a portfolio review” and “If this is your first investment” | Book your call (gold); Ask a question on WhatsApp |
| 4 | AMFI-registered, and open about how we are paid (`#costs` kept for `/about/`) | Full disclosures link |
| 5 | Ready to start? | Book a portfolio review (gold); Ask a question on WhatsApp; email |

- Removed “Who we help”: it repeated the homepage. The long copy stays in `src/lib/who-we-help.ts` (the style guide uses it).
- Removed the “Not the right fit” box and the adviser referral. The registration card already says we are not a SEBI-registered investment adviser.
- Removed the hero fee sentence. Costs are explained once, in section 4.
- The call details appear once, in the hero.
- Removed all section badges, as on the homepage.
- Steps 1 and 2 now welcome first-time investors.
- One WhatsApp label everywhere: “Ask a question on WhatsApp”. Service name in sentence case: “Invest with support”.
- The homepage “How support works” link goes to `/invest/#how-it-works`.
- Tracking placements keep the `invest_review` name for the first-call section, so earlier data stays comparable.

## Agreed page flow

| Section | Actions and order |
|---|---|
| Hero | Book a portfolio review; first-call details below it |
| Problems and solutions | Beginner invitation; Discuss your first investment; How support works → |
| What do you pay for our services? | Three points; Book a portfolio review; Ask a question on WhatsApp; ARN line |
| Guides | Two guide cards; View all investigations; separate email invitation |
| Deepdive | Check a fund with Deepdive |

The beginner invitation replaces the earlier proposal to remove all actions after the problem-and-solution section.
The two booking buttons remain useful. One serves ready visitors; the other serves visitors who first read the costs.

Suggested beginner copy:

> **Making your first mutual fund investment?**
>
> We help you choose funds that fit your goals and explain their risks and costs.
>
> **Discuss your first investment**

## Button hierarchy

- Gold: “Book a portfolio review”, in the hero and costs section.
- Secondary: beginner discussion, WhatsApp, email, and Deepdive.
- Text links: “How support works” and browsing investigations.

Use existing UI components and design tokens. Set the correct surface for every secondary button.
Keep responsive behavior in shared components.

## Order, cost, and pending details

1. Update the booking title, description, host name and form question in Zoho Bookings.
2. Connect the beginner button after the booking page welcomes both visitor groups.
3. Apply the homepage actions, copy, navigation, and mobile changes.
4. Verify the routes and tracking.

The exact booking title and description remain implementation details to settle.
Check that the booking form does not require existing holdings from beginners.
Keep the existing booking service if it supports both visitor groups.

These changes need no new paid tools. Start with manual completed-booking counts if automated tracking adds unnecessary work.
Include direct homepage bookings in measurement. Visitors do not need to visit `/invest/` first.

## Review evidence and validation

The review checked the local homepage at desktop width 1440px and mobile width 375px.
Neither layout showed horizontal overflow. Internal destinations and section links worked.
The external booking page loaded its calendar and 30-minute appointment. No booking was submitted.

These checks describe the existing page. Repeat relevant checks after implementation.

- Check button labels, destinations, and beginner eligibility throughout the booking route.
- Check the guide-link order and the costs-section reading order on mobile.
- Check keyboard access and visible focus for changed actions.
- Check tracking for both homepage booking routes, including placement.
- Run `npm run lint:design` and `npm run build` after UI changes.
- Source Linux Node through `nvm` before running npm commands in WSL.

## Main implementation files

- [Homepage](../src/pages/index.astro)
- [Service page](../src/pages/invest.astro)
- [Header](../src/components/Header.astro)
- [Footer](../src/components/Footer.astro)
- [Problem-and-answer component](../src/components/ui/ProblemAnswer.astro)
- [Shared problem-and-answer copy](../src/lib/who-we-help.ts)
- [Booking configuration](../src/lib/distributor.ts)
- [Tracking definitions](../src/lib/analytics.ts)
- [Shared tracking listener](../src/layouts/Layout.astro)

The booking page requires changes in Zoho Bookings. Repository changes alone do not update its title or form.
