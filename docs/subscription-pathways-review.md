# Subscription Pathways Review

**Reviewed:** 20 July 2026  
**Status:** Recommendations only; no recommendation in this document is approved or implemented by virtue of being documented here.

## 1. Purpose

This document records the review of Fund Investigator's subscription and email-capture pathways across:

- the currently deployed website;
- the Substack-based flow in the `dev` branch;
- report takeaways and report-end calls to action;
- the public Substack Welcome page;
- privacy, consent, attribution, and operational cleanup;
- discoverability for readers who already intend to subscribe; and
- the potential handoff from the Deepdive application.

The objective is not to maximize raw email collection. It is to increase the number of confirmed subscribers who understand the publication promise and return to read complete investigations.

## 2. Executive Assessment

The convert-after-value direction is appropriate for Fund Investigator. A reader sees an open guide, report takeaways, or a complete investigation before being asked to subscribe. This is consistent with the site's evidence-first positioning and should favor subscriber quality over list size.

Three issues remain before the flow should be treated as complete:

1. Production and `dev` currently represent different subscription systems.
2. The Substack destination needs enough content and expectation-setting to support an off-site handoff.
3. The site records placement parameters in outbound URLs but does not yet measure CTA interaction by placement.

The recommended order of work is:

1. Agree on the publication promise.
2. Prepare and test the Substack destination.
3. Complete the provider cutover as one release.
4. Add discoverability and measurement.
5. Extend capture to Deepdive only after a user receives a useful result.

## 3. Current Pathways Observed

### Deployed website

At the time of review, the deployed homepage contained:

- a guide-led email form opened from the hero; and
- a new-investigation notification form near the bottom of the homepage.

Both forms submitted to the MailerLite-backed `/api/subscribe` endpoint. Deployed report pages did not contain a subscription pathway.

### `dev` branch

The `dev` branch uses three Substack-directed placements:

| Placement | Reader state | Destination marker |
| --- | --- | --- |
| Homepage bottom | Has read the site proposition | `homepage_bottom` |
| Report takeaways | Has skimmed the report's main findings | `article_takeaways` |
| Report end | Has completed an investigation | `article_end` |

The hero guide is open and links directly to the guide. It no longer makes access conditional on an email address.

### Provider state

The `dev` branch routes visible calls to action to Substack, but `functions/api/subscribe.ts` still contains the legacy MailerLite endpoint. If its production credentials remain configured, that route can continue accepting submissions even when no visible form links to it.

## 4. What Already Works

### Value is delivered before the ask

The guide is not gated, and report subscription prompts appear after takeaways or at the end of the report. The interaction does not interrupt a reader before the site has demonstrated its usefulness.

### Placements map to distinct reader intent

Homepage visitors, report skimmers, and report finishers represent different engagement levels. Retaining placement-specific markers makes it possible to compare those audiences later.

### Report-end coverage is structural

The report-end band is rendered by `ArticleLayout.astro`, so every report receives it without an author remembering to add it.

### The off-site handoff is disclosed

Report copy identifies Substack as the delivery provider, and buttons use an external-link icon. The privacy policy explains that the email address is entered on Substack rather than on FundInvestigator.com.

### Newsletter destination configuration is centralized

`src/lib/substack.ts` stores the publication address and placement parameters in one place. Markdown content uses `/subscribe`, allowing the provider address to change without editing published reports.

### Placement parameters survive the Substack redirect

The reviewed Substack `/welcome` redirect preserved `utm_source`, `utm_medium`, `utm_campaign`, and `utm_content` in the destination URL. Whether every parameter is exposed as a subscriber-level field still needs to be confirmed with test subscriptions.

## 5. Recommended Target Journey

The intended sequence is:

> Evidence delivered → CTA click → publication promise → Substack form → email confirmation → welcome email → useful starting investigation → return visit

Each stage should have one job:

| Stage | Job |
| --- | --- |
| Evidence delivered | Establish that the analysis is useful and checkable |
| CTA | State what arrives and when |
| Publication explanation | Clarify scope, cadence, provider, and reader control |
| Confirmation | Establish consent and protect list quality |
| Welcome email | Provide an immediate useful starting point |
| Return visit | Bring the subscriber back to the canonical report or Deepdive |

## 6. Recommendations and Intended Effects

### P0 — Complete before treating the cutover as finished

| Recommendation | Intended effect | Completion evidence |
| --- | --- | --- |
| Unify the subscription promise across the website, Substack Welcome page, About page, welcome email, and privacy description | Readers understand the format, scope, cadence, and provider before submitting an address | A copy audit finds one offer expressed at different lengths, not different offers |
| Publish seed content before sending meaningful traffic to Substack | Reduces abandonment caused by arriving at a new or empty publication | A pinned Start Here post and at least one representative Investigation Brief are public |
| Verify email confirmation and the complete welcome flow | Protects consent evidence and confirms that the promised delivery works | A test address receives confirmation and welcome emails; every link, reply, and unsubscribe path works |
| Complete the Substack cutover as one release | Avoids two providers and two operational models running indefinitely | Website CTAs, privacy text, subscriber import, and provider configuration change together |
| Remove the MailerLite function and production credentials after Substack passes QA | Eliminates an unlinked capture route, abuse surface, and privacy ambiguity | `/api/subscribe` no longer exists and MailerLite secrets are removed from the deployment environment |

### P1 — Improve discoverability, consistency, and evidence

| Recommendation | Intended effect | Completion evidence |
| --- | --- | --- |
| Add a low-emphasis Subscribe link for readers with existing intent | Lets returning visitors subscribe without scrolling through the homepage or opening a report | Header and/or footer exposes a clear route without a modal or automatic interruption |
| Create an owned `/newsletter` page | Preserves brand continuity before the off-domain handoff and provides a stable destination if the provider changes | Page explains the offer, shows a representative issue, links privacy information, and sends the reader to Substack |
| Keep `/subscribe` as the stable direct redirect for in-report CTAs | Avoids adding an explanatory step after a report has already delivered value | Markdown links remain provider-independent and retain the takeaways placement marker |
| Make navigation behavior consistent across newsletter CTAs | Reduces surprise caused by some CTAs opening a new tab while others replace the current page | All equivalent CTAs follow the same behavior; same-tab navigation is the recommended default |
| Make the takeaways CTA durable | Prevents older or future reports from silently missing the skimmer pathway | A content check or structural rendering rule verifies the CTA where required |
| Record CTA interaction by placement | Shows which content and reader state produces outbound subscription intent | Events contain placement and page path, and appear in production analytics |

### P2 — Extend the pathway after the core flow is stable

| Recommendation | Intended effect | Completion evidence |
| --- | --- | --- |
| Audit Deepdive for a return or subscription path | Determines whether the highest-intent users leave the ecosystem after using the tool | The application journey is documented from landing through result and next action |
| If absent, add a restrained post-result Investigation Brief CTA in Deepdive | Captures activated users after the tool has demonstrated value | CTA appears after a useful result, not before the user can run an analysis |
| Add a representative issue or recent-brief module to the future newsletter page | Makes the email format concrete rather than relying only on descriptive copy | Visitors can inspect a real brief before subscribing |

## 7. Proposed Unified Subscription Promise

This section records proposed copy only. It is not currently applied.

### Promise components

Every version should retain these facts:

| Element | Proposed definition |
| --- | --- |
| Publication | Fund Investigator |
| Email format | Investigation Brief |
| Content | New fund investigations and material methodology or Deepdive updates |
| Trigger | When new work is ready |
| Cadence boundary | No daily market commentary |
| Price | Free |
| Delivery | Substack |
| Reader control | Unsubscribe anytime |

### Complete website version

> Receive a concise email when a new fund investigation or material update is ready. Free, delivered by Substack. No daily market commentary; unsubscribe anytime.

### Homepage proposal

**Heading:** Get the Next Investigation Brief

**Supporting copy:**

> Receive a concise email when a new fund investigation or material update is ready. Free, delivered by Substack. No daily market commentary; unsubscribe anytime.

**Button:** Get Investigation Briefs

### Report-end proposal

**Heading:** Get the Next Investigation Brief

**Supporting copy:** Use the complete website version.

**Button:** Get Investigation Briefs

### Report-takeaways proposal

> *Get the next [Investigation Brief](/subscribe) when a new fund investigation or material update is ready. Free; no daily market commentary.*

This version is shorter because it appears inside article prose, but it retains the format, trigger, price, and cadence boundary.

### Substack short-description proposal

> Concise mutual fund Investigation Briefs for Indian investors, published when a new investigation or material update is ready—without product pitches or daily market commentary.

### Substack About-page expectation

The About page should state that:

- complete investigations remain on FundInvestigator.com;
- Substack carries concise Investigation Briefs rather than duplicate reports;
- briefs cover new investigations, methodology notes, and Deepdive updates;
- publication occurs when new work is ready; and
- the publication does not provide daily market commentary or product pitches.

### Welcome-email expectation

Recommended expectation-setting sentence:

> You'll receive a concise Investigation Brief when a new fund investigation or material update is ready. Complete reports remain on FundInvestigator.com.

The welcome email should link to:

1. the Five Checks methodology guide;
2. the complete investigation archive; and
3. Deepdive.

### Privacy description

The privacy policy should use operational rather than promotional language. Recommended scope:

> Send subscribed users concise Investigation Briefs covering new fund investigations, methodology notes, and Deepdive updates.

## 8. Discoverability Recommendation

The convert-after-value principle should not prevent a reader who already intends to subscribe from finding the subscription path.

Recommended structure:

- Add a text-level `Subscribe` item to the desktop and mobile navigation, or place it prominently enough in the footer to be found without competing with the primary Deepdive action.
- Route that link to `/newsletter`, not directly to an unexplained third-party form.
- Keep report CTAs direct because those readers have already received the explanation and value.
- Do not introduce an automatic popup, content gate, countdown, or urgency device.

The `/newsletter` page should contain:

1. the complete subscription promise;
2. what an Investigation Brief contains;
3. when emails are sent;
4. a representative issue once available;
5. Substack delivery and privacy disclosure;
6. a single primary subscription button; and
7. a route back to the full investigation archive.

## 9. Navigation Behavior Recommendation

Current subscription actions do not all behave the same way: button-based placements open Substack in a new tab, while Markdown takeaways use `/subscribe` in the current tab.

Recommended default: use the same tab for all deliberate subscription actions.

Rationale:

- the reader explicitly chose to continue;
- the browser Back action provides a clear return path;
- mobile browsers handle a single history path more predictably; and
- the same action behaves consistently in every placement.

If a new-tab policy is retained instead, it should be applied consistently and accompanied by a visible provider cue rather than relying only on an icon.

## 10. Measurement Plan

### Minimum on-site event

Record:

`newsletter_cta_click`

Recommended properties:

| Property | Example |
| --- | --- |
| `placement` | `homepage_bottom`, `article_takeaways`, `article_end`, `header`, `footer`, `deepdive_result` |
| `page_path` | `/reports/five-checks-mutual-fund/` |
| `report_slug` | `five-checks-mutual-fund` where applicable |
| `destination_provider` | `substack` |

An optional `newsletter_cta_view` event can be added later if impression-to-click rate is needed. Click measurement is the lower-complexity starting point.

### Funnel to review

1. CTA clicks by placement.
2. Substack form submissions.
3. Confirmed subscriptions.
4. Welcome-email delivery and opens.
5. Welcome-email clicks back to FundInvestigator.com.
6. Thirty-day opens, clicks, unsubscribes, and spam complaints.

The primary measure should be confirmed, engaged subscribers—not raw form submissions.

### Tooling constraint

Cloudflare Web Analytics does not currently support custom events or UTM reporting. Cloudflare Zaraz can record click events through click listeners or `zaraz.track()`. Substack's exposure of the retained placement parameter should be verified with a test subscription rather than assumed.

## 11. End-to-End Quality Checklist

Before replacing the live MailerLite flow:

1. Publish the Start Here post.
2. Publish at least one representative Investigation Brief.
3. Confirm the Welcome page description and brand assets on mobile and desktop.
4. Confirm the About page states the complete content and cadence boundaries.
5. Subscribe with a spare address through each website placement.
6. Verify that each outbound URL retains its placement marker.
7. Receive and complete email confirmation.
8. Receive the customized welcome email.
9. Test every welcome-email link.
10. Reply and verify that the monitored inbox receives it.
11. Inspect Gmail and Outlook rendering on desktop and mobile.
12. Test unsubscribe and subscription-management paths.
13. Verify the website privacy policy matches Substack processing.
14. Import only opted-in MailerLite subscribers, if an import is performed.
15. Remove the MailerLite Pages Function and production credentials.
16. Confirm the retired endpoint no longer accepts submissions.
17. Review analytics after one day for errors and unexpected destination behavior.

## 12. Decisions to Make Sequentially

1. Approve or revise the unified publication promise.
2. Decide whether `Investigation Brief` is the permanent email-format name.
3. Approve the public Substack short description and About-page copy.
4. Prepare seed posts and the welcome email.
5. Decide whether subscription CTAs use the current tab or a new tab.
6. Decide whether to add an owned `/newsletter` page and where its global link appears.
7. Choose the event-tracking implementation.
8. Run the cutover checklist.
9. Remove MailerLite.
10. Audit the Deepdive post-result journey.

## 13. Non-Goals

The recommendations do not include:

- automatically opening a subscription modal;
- gating the Five Checks guide;
- promising a weekly or daily schedule that the publishing process may not support;
- displaying an early subscriber count as social proof;
- enabling paid subscriptions before the regulatory implications are resolved;
- duplicating complete Fund Investigator reports on Substack; or
- optimizing list size at the expense of confirmation, engagement, or reader expectations.

## 14. Relevant Project Files

- `src/pages/index.astro` — homepage placement
- `src/layouts/ArticleLayout.astro` — structural report-end placement
- `src/content/reports/` — manual takeaways placements
- `docs/templates/report-template.md` — report-authoring rule
- `src/lib/substack.ts` — destination and placement parameters
- `astro.config.mjs` — stable `/subscribe` redirect
- `src/pages/privacy.astro` — subscriber-data disclosure
- `functions/api/subscribe.ts` — legacy MailerLite endpoint pending cutover cleanup
- `docs/substack_setup.md` — operational publication setup

## 15. External References

- Cloudflare Web Analytics FAQ: `https://developers.cloudflare.com/web-analytics/faq/`
- Cloudflare Zaraz triggers: `https://developers.cloudflare.com/zaraz/reference/triggers/`
- Cloudflare Zaraz event tracking: `https://developers.cloudflare.com/zaraz/web-api/track/`
- Substack Welcome page: `https://support.substack.com/hc/en-us/articles/7999279240212-What-is-a-Welcome-page-on-Substack`
- Substack email confirmation: `https://support.substack.com/hc/en-us/articles/23248358108692-How-do-I-require-new-subscribers-to-confirm-their-email-on-Substack`
- Substack embedded signup forms: `https://support.substack.com/hc/en-us/articles/360041759232-Can-I-embed-a-signup-form-for-my-Substack-publication`
