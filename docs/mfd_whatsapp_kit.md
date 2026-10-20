# WhatsApp kit: Invest with Support

**Status:** Draft for owner approval (S42, 2026-10-05). Paste the approved texts into the WhatsApp Business app.
**Number:** +91 96250 26859 (`wa.me/919625026859`).
**Rules:** follow the fee wording rule and the words-to-avoid list in `docs/mfd_funnel_handoff.md` Section 2. No fund names in greeting, away or broadcast messages.

## 1. Business profile

| Field | Text |
| --- | --- |
| Business name | Fund Investigator |
| Category | Financial service |
| About (short line) | AMFI Registered Mutual Fund Distributor & SIF Distributor · ARN-370951 |
| Website | https://fundinvestigator.com/invest/ |
| Email | contact@fundinvestigator.com |
| Hours | Owner to set, or leave as "Available by message" |

**Business description:**

> Ishpreet Singh Modi, AMFI Registered Mutual Fund Distributor & SIF Distributor (ARN-370951). We help you choose mutual funds that suit your goals and risk profile, explain their risk and costs, and review them with you at regular intervals. We are not a SEBI-registered investment adviser. Mutual Fund investments are subject to market risks, read all scheme related documents carefully.

## 2. Greeting message (new contacts)

> Hello, and thank you for getting in touch with Fund Investigator. I'm Ishpreet Singh Modi, an AMFI Registered Mutual Fund Distributor & SIF Distributor (ARN-370951).
>
> How we earn: there is no fee from you. The fund house pays us a commission from the regular plan's expense ratio, so a regular plan costs more each year than the direct plan of the same fund. Details: https://fundinvestigator.com/invest/#costs
>
> Please don't send KYC documents, statements or passwords here. I reply within 1 business day.
>
> Mutual Fund investments are subject to market risks, read all scheme related documents carefully.

## 3. Away message (optional, outside hours)

> Thanks for your message. I reply within 1 business day. Please don't send KYC documents, statements or passwords here.

## 4. Prefilled messages (website buttons)

Each button opens a chat with a short, friendly text for its placement. The text carries no tracking code, because the person sees it and sends it: the button click is recorded as the PostHog `conversation_request` event with its `placement`. Landing-page texts name the reader's topic, so the chat itself shows why they wrote.

| Placement | Page | Prefilled text |
| --- | --- | --- |
| `invest_hero` | `/invest/` hero | Hi Ishpreet, I'd like to know more about Invest with support. |
| `invest_cta` | `/invest/` "Ready to start?" | Hi Ishpreet, I'd like to know more about Invest with support. |
| `lp_review_hero` | Portfolio review page hero | Hi Ishpreet, I'd like a review of my mutual fund portfolio. |

The full list of placements and texts lives in `src/lib/whatsapp.ts` (`whatsappUrl(placement)`). Link format: `https://wa.me/919625026859?text=<URL-encoded text>`.

## 5. Privacy policy section (draft for `/privacy/`)

**Enquiries about Invest with Support**

> When you contact us about Invest with Support by WhatsApp or email, we receive your name, phone number or email address, and what you choose to tell us in the conversation. We use this only to reply to you and, if you become a client, to provide the service. WhatsApp is run by Meta, and your messages are also handled under WhatsApp's own privacy policy. We do not ask for KYC documents, account statements or passwords on WhatsApp. We keep enquiry conversations for [retention period] to meet our record-keeping duties as a Mutual Fund Distributor, then delete them.

## 6. Owner checklist

- [ ] Reply time confirmed: "within 1 business day" (owner, 2026-10-15)
- [ ] Confirm contact@fundinvestigator.com is live and monitored
- [ ] Approve or edit sections 1–3, then set them up in the app
- [ ] Set the retention period in section 5, and decide how you keep dated commission-disclosure records (e.g. chat export)
- [ ] Add the number to the Phase 0 AMFI channel check
- [ ] Decide the transaction route for the first clients before replying to enquiries (no platform at launch)
