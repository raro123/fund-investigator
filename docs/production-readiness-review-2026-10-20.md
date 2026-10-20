# Fund Investigator: production readiness review

Reviewed 20 October 2026 as an external product, UX and copy advisor.

## Recommendation

**Hold the dev-to-production release for a small, targeted correction pass.** The design is credible enough to launch. A redesign is unnecessary. The blockers are unreadable mobile article content, inconsistent promises across the conversion journey, incomplete service/data disclosures, and an inaccurate educational claim.

The website works best as a trust check after a referral. It is less convincing as a cold visitor acquisition funnel: it asks for a conversation before fully establishing who the service is for, and some of its strongest evidence is illustrative rather than actual analysis. That distinction matters for a brand whose central promise is evidence.

## Scope and evidence

- Latest local `dev`: `8c8231d16aae5537e49bf0ff7605f6d842dd44e6`.
- Remote-tracking `origin/dev`: `aaf34721b7967b62e39f9c95975698160dce0ca1`. The hosted preview matches the older first-call label; the latest local commit changes that label and the service comparison WhatsApp button. Local production preview was therefore also reviewed.
- Reviewed homepage, Invest with support, About, report listing, both published guides, disclaimer, terms, privacy and disclosures.
- Browser checks at 320px, 375px and 1440px. Mobile menu navigation, direct-plan tab switching and SIF FAQ expansion were exercised successfully. Screenshots saved under `output/playwright/`.
- `npm run lint:design`: passed, including all 24 configured contrast pairs. This is a token-pair check, not a complete accessibility certification.
- `npm run build`: passed. Build checks passed for H1s, internal links, image alt text and metadata. Dependency sourcemap warnings were non-blocking.
- Zoho booking: followed primary CTA, selected an available slot and reached the personal-details form. Duration is 30 minutes. Email verification is required. No booking submitted, email sent or personal details entered.
- WhatsApp: correct Fund Investigator profile and prefilled message reached. No message sent.
- Newsletter: correct branded Substack subscription screen reached. No subscription submitted.
- Old HDFC report URL returns 200 on current production and 301 on dev; the intended replacement redirect exists. `/subscribe/` also returns 301 on dev.
- No website implementation, commit, push or deployment performed. Existing working-tree changes were left in place.

## What is already working

**Look and feel.** The navy/gold palette, strong hierarchy, restrained document/folder motif and readable contrast create a recognisable identity. Gold booking buttons and outlined WhatsApp buttons establish a useful action hierarchy. The sample brief makes an otherwise abstract analytical service tangible. Keep these foundations.

**Service story.** The three client situations are relatable. The four-stage journey on `/invest/` explains the work more clearly than a long list of features. The commission explanation and explicit higher expense ratio of regular plans are valuable trust signals. The direct-plan comparison offers separately arranged advice as an alternative rather than claiming direct investors receive no support.

**Funnel.** Booking and WhatsApp give visitors two sensible commitment levels. Repeating them after substantial sections is reasonable on these long pages. Generic guides now have a contextual service invitation after the educational content. The minimal three-link navigation is easy to understand.

## Must have before production

| Priority | Finding and evidence | Required action | Reason |
|---|---|---|---|
| 1 | **Comparison tables are cut off on phones.** In the category guide at 375px, a table is about 485px wide and extends to x=501. Its ancestors have no horizontal scroll container; the body uses `overflow-x: clip`. At 320px, three tables exceed the viewport. See `category-table-mobile.png`. | Make wide article tables horizontally scrollable within a clearly indicated, accessible region, or restructure them for phones. Verify every column at 320px and 375px. Do not use page-level clipping as the solution. | Visitors cannot read allocation rules and comparison columns. A page can report no document overflow while still hiding substantive content. |
| 2 | **The article CTA promises a different appointment.** Articles say “Book a portfolio review”; home and service pages say “Book a first call”; Zoho says “Introductory call with Ishpreet.” The site explains that analysis follows fact-finding after the call. | Use “Book a first call” for every CTA opening that same appointment. Add a short article line explaining that the introductory call establishes goals and how a later review works. Carry the same scope and no-charge statement into Zoho. | An expectation of a completed review during a free 30-minute call can generate disappointment and unsuitable enquiries. This is a promise mismatch, not merely capitalisation. |
| 3 | **Privacy copy describes the publication more fully than the distribution service.** It covers Substack and analytics but does not identify Zoho booking details, WhatsApp enquiries, holdings/CAS, risk profiles, their handling or retention. | Confirm actual data flows and the approved holdings-sharing channel, then document collection, purpose, providers, access, retention and deletion/contact choices. Make the booking handoff consistent with that policy. | The current funnel invites personal contact and later financial records. Prospects need an accurate explanation before sharing them. This is a product-trust finding; the report is not a legal compliance opinion. |
| 4 | **Terms and disclaimer retain an information-only business description.** The disclaimer opens with “information and analysis only” and ends with “informational tools only”; the terms describe an informational service. Other pages promise fund selection, transaction support and ongoing reviews. | Scope the educational disclaimer explicitly to public articles/tools, and describe the separate distribution service consistently with `/invest/` and `/disclosures/`. Have the revised service scope checked by the relevant compliance reviewer. | A careful visitor gets conflicting answers to “what exactly are you offering?” A later distribution paragraph does not fully resolve blanket information-only statements. |
| 5 | **The evidence-led positioning needs an editorial accuracy pass.** The five-questions guide says SEBI category rules make Nifty 500 TRI *the* flexi-cap benchmark. The category guide calls it a *typical* benchmark. Official AMC factsheets also show flexi-cap schemes using BSE 500 TRI. | Correct the categorical benchmark statement and link to precise sources. State that Nifty 500 TRI is the chosen benchmark for the hypothetical example, and that real schemes have stated benchmarks. Check other categorical regulatory/product claims and record clearance of the new generic guides, GIFT City scope and sample methodology. | Benchmark accuracy is central to the brand's authority. A directly checkable overstatement damages the evidence promise more than minor cosmetic defects. |

Primary counterexample for item 5: [Canara Robeco July 2026 Flexi Cap factsheet](https://digitalassets.canararobeco.com/digital-factsheet/2026/july/Scheme/FLEXICAP.html) identifies BSE 500 TRI as its AMFI Tier 1 benchmark. [Invesco's January 2026 factsheet](https://invescomutualfund.com/docs/default-source/factsheet/invesco-mf-factsheet---january-20268a77fb07eee8616aaa28ff00007d74af.pdf) also identifies BSE 500 TRI for its flexi-cap fund. These establish that Nifty 500 TRI is not the sole benchmark used by that category; they do not replace a full review of applicable rules.

## Good to have

| Improvement | Recommendation | Reason |
|---|---|---|
| Sharper first-screen positioning | Lead with mutual-fund selection and portfolio support. Explain SIFs and GIFT City funds later with appropriate suitability and eligibility context. | Three product families, including an unexplained acronym, add cognitive load before a beginner understands the core service. Their equal prominence can also make a focused service look broader than its explanation. |
| Better proof of expertise | Add one cleared, genuinely worked analytical example or a fuller illustrative deliverable with its method and assumptions. Until then, describe the library as guides and worked examples. | “Raw data and our verdict” and “read our analysis” overstate what a library of two generic guides currently demonstrates. The hypothetical label inside the guide is good; carry that clarity into its positioning. |
| More human trust on About | Move the named distributor and useful credentials higher on About. A real photo is optional if comfortable. Keep the homepage's brand-first privacy choice. | The decision is to speak to a person. Visitors should find that person's identity quickly without reading several brand sections. |
| Consistent booking identity | Replace Zoho's “Fund Investigator Team” with the actual host identity. Say “Introductory call · 30 minutes · No charge” consistently; retire “Introductory first call (No charges).” | Personal service is a differentiator; the scheduling handoff should reinforce it. The newer local label is wordier than the older preview label. |
| Less booking friction | Review whether phone number and email verification are necessary at the first step. If verification stays, explain why and make its instructions prominent. | Each extra requirement increases effort before a visitor has spoken to you. Do not add a lengthy questionnaire just to improve attribution. |
| Faster scanning | Keep typewriter text for short notes and labels; consider the standard reading font for longer process/comparison paragraphs. Add small jump links on the long service page if observation shows readers need them. | The document motif is distinctive, but large amounts of monospaced copy make a phone page feel longer and denser. |
| Softer case-file language | Consider “How we help” or “Our approach” instead of “CASE SOLVED.” | The service is an ongoing decision process. A solved stamp implies a finished result before work begins. This is a tone judgment, not a claim that the present wording is unlawful. |
| Measure outcomes simply | Keep the existing placement events, then reconcile actual calls and clients in a small sheet. Add automated completed-booking attribution only if volume warrants it. | A booking click is not a booking; a WhatsApp click is not a received enquiry. A manual record is adequate for an early solo business and avoids additional software cost. |

## Suggested copy decisions

- Appointment CTA: **Book a first call**.
- Appointment detail: **30-minute introductory call · No charge · No obligation**.
- Article bridge: **Start with an introductory call. We discuss your goals and explain how a portfolio review works.**
- Process proof: **See our guides and worked examples.**
- Benchmark sentence: **For this hypothetical example, we use Nifty 500 TRI as a broad-market benchmark. When assessing an actual fund, check its stated benchmark and whether it matches the strategy.**

These are proposals for approval, not changes applied to the website.

## Release acceptance

After the five must-have items are addressed:

1. Rebuild and test the exact commit intended for production; ensure the hosted dev preview matches it.
2. Recheck the article tables and CTA chain on a phone.
3. Complete one owner-controlled test booking, including email verification, confirmation, meeting link, timezone and reminders; verify the no-charge/scope wording in the confirmation.
4. Complete one test WhatsApp enquiry and verify the promised response workflow. Confirm the contact mailbox is monitored.
5. Verify production analytics configuration and actual event receipt. Record completed bookings separately from click events.

The final confirmation, reminder delivery, response workflow and analytics ingestion were not proven by this review. They are release checks, not confirmed defects. No paid service or architecture change is needed for the recommended correction pass.

