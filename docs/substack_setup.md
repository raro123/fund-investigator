# Fund Investigator Substack Setup Plan

## Objective

Set up Substack as Fund Investigator's newsletter and distribution channel while keeping:

- `fundinvestigator.com` as the authoritative home for complete investigations.
- `deepdive.fundinvestigator.com` as the interactive analysis tool.
- `fundinvestigator.substack.com` as the home for investigation summaries, publication updates, and email delivery.

Substack should direct readers toward the underlying evidence on Fund Investigator rather than become a duplicate content site.

## Current Domain Decision

Launch with `fundinvestigator.substack.com`. Do not pay the $50 custom-domain fee at this stage.

This does not remove any important publishing or email functionality. A custom domain changes the publication's web address, but Substack newsletters are still sent from a `substack.com` address. Reconsider a custom domain after publishing three to five editions or establishing a regular subscriber flow.

If a custom domain is added later, the recommended address is:

`dispatch.fundinvestigator.com`

The future architecture would then be:

| Address | Role | Content |
| --- | --- | --- |
| `fundinvestigator.com` | Main hub | Complete investigations and authoritative content |
| `deepdive.fundinvestigator.com` | Analysis spoke | Interactive fund analysis |
| `dispatch.fundinvestigator.com` | Distribution spoke | Investigation summaries, updates, and email archive |

Official reference: [Substack custom-domain setup](https://support.substack.com/hc/en-us/articles/360051222571-How-do-I-set-up-my-custom-domain-on-Substack)

## 1. Publication Identity

Use the following public identity:

- **Publication name:** Fund Investigator
- **Newsletter descriptor:** Investigation Briefs
- **Tagline:** Fund Performance, Investigated
- **Category:** Finance / Investing, where available
- **Access:** Free publication
- **Paid subscriptions:** Off
- **Chat, podcast, and referrals:** Off initially

Do not create a second prominent brand such as "Fund Investigator Newsletter." The publication remains Fund Investigator; an "Investigation Brief" is the format readers receive.

### Short description

> Evidence-led mutual fund investigations for Indian investors: benchmarks, consistency, risk and drawdowns—without product pitches.

### Publishing expectation

> Published when there is a new investigation or material update. No daily market commentary.

## 2. Publication Ownership and Public Profile

- Keep the publication under the dedicated Fund Investigator account.
- Keep the personal Substack account separate; add it as an administrator if needed.
- Use the Fund Investigator icon and brand description on the publication profile.
- Hide unrelated reading subscriptions, likes, and personal activity from the brand profile.
- Verify all social URLs before adding them. The website footer and structured data currently use the X handle `fundinvestigate`.

## 3. Brand Assets

Prepare the following assets:

| Asset | Size | Content |
| --- | ---: | --- |
| Square logo | 512 x 512 | Investigator icon on a dark background with minimal gold detail |
| Header wordmark | 1344 x 256 | Horizontal Fund Investigator logo on a transparent background |
| Welcome cover | 1200 x 1200 | Icon and the line "Fund Performance, Investigated" |
| Email banner | 1100 x 220 | Restrained wordmark; optional after email testing |
| Social preview | 1200 x 630 | Existing Fund Investigator social image |

Existing source assets:

- `public/images/fi-logo.png`
- `public/images/fundinvestigator-og-default.jpg`
- `public/favicon.svg`

Re-export the wordmark specifically for Substack instead of uploading the existing wide logo unchanged. Normalize the new assets to the current design-token navy, `#020617`; some older logo artwork uses `#152a45`.

Official reference: [Substack custom-theme and logo specifications](https://support.substack.com/hc/en-us/articles/360055169471-How-do-I-set-a-custom-theme-for-my-Substack)

## 4. Theme and Colours

Select **Custom theme**, not Profile theme.

Use:

| Setting | Value |
| --- | --- |
| Page background | `#F8FAFC` |
| Functional accent | `#020617` |
| Footer background | `#020617` |
| Graphic highlight | `#FBBF24` |
| Supporting grey | `#64748B` |

Do not use `#FBBF24` as the global Substack accent. Gold works well against the dark Fund Investigator background but can have weak contrast as link or button text on a light background. Use it inside the cover, wordmark, dividers, and report imagery.

Configure the layout as follows:

- **Typography:** Inter if available; otherwise the closest clean sans-serif.
- **Post titles:** Sans-serif.
- **Post body:** Sans-serif.
- **Links:** Underlined.
- **Header:** Inline.
- **Navigation style:** Text.
- **Hero:** Feature.
- **Body:** List.
- **Footer:** Publication name and verified social links.

Start with the Feature layout because the archive will initially be small. Consider Highlight or Magazine only after enough posts exist to support it.

## 5. Welcome Page

Upload the square welcome cover and configure:

- **Description:** Use the short description above.
- **Skip-button text:** Browse investigations
- **Subscriber count:** Hide initially.
- **Endorsements:** Leave empty until relevant endorsements exist.

Official reference: [Substack Welcome page](https://support.substack.com/hc/en-us/articles/7999279240212-What-is-a-Welcome-page-on-Substack)

## 6. About Page

Use this as the initial copy:

> Fund Investigator examines the evidence behind mutual fund performance for Indian investors.
>
> We ask whether a fund beat a fair benchmark, whether the result persisted, and what risk and drawdowns were required to produce it. We do not sell funds or earn commissions from fund houses.
>
> Full investigations and interactive analysis remain at FundInvestigator.com. This publication sends concise investigation briefs, methodology notes and Deepdive updates when new work is ready.
>
> Published when there is a new investigation or material update. No daily market commentary.
>
> Fund Investigator provides information and analysis, not financial advice or recommendations. Past performance is evidence, not a forecast.

Add links to:

- Browse full investigations: `https://fundinvestigator.com/reports`
- Why Fund Investigator exists: `https://fundinvestigator.com/about`
- Open Deepdive: `https://deepdive.fundinvestigator.com`
- Read the disclaimer: `https://fundinvestigator.com/disclaimer`

Official reference: [Substack About-page guidance](https://support.substack.com/hc/en-us/articles/25006088243348-How-do-I-edit-my-About-page-for-my-Substack-publication)

## 7. Navigation

Keep the navigation compact:

1. Home
2. Archive
3. About
4. Full Investigations — `https://fundinvestigator.com/reports`
5. Deepdive — `https://deepdive.fundinvestigator.com`

Do not add extra sections until there is enough publishing volume to justify them.

Official reference: [Substack navigation settings](https://support.substack.com/hc/en-us/articles/20512194655892-How-do-I-organize-the-navigation-bar-on-my-Substack-publication)

## 8. Email, Consent, and Replies

Configure:

- **Email sender name:** Fund Investigator
- **Replies:** Allow subscribers to reply.
- **Forward replies to:** `contact@fundinvestigator.com`
- **Require email confirmation:** On.
- **Mailing address:** Add a business address or PO Box.
- **Free-subscriber welcome email:** Customise.
- **Imported-subscriber welcome email:** Customise only if a list is imported.

Double opt-in may reduce the raw signup count slightly, but it protects list quality, consent evidence, and abuse resistance.

If the email banner is used, send test emails and inspect it on both desktop and mobile before retaining it.

Official references:

- [Require subscriber email confirmation](https://support.substack.com/hc/en-us/articles/23248358108692-How-do-I-require-new-subscribers-to-confirm-their-email-on-Substack)
- [Email headers and footers](https://support.substack.com/hc/en-us/articles/360056142311-How-do-I-edit-email-headers-and-footers-on-Substack)

## 9. Welcome Email

Use the following initial copy:

**Subject:** Welcome to Fund Investigator

> Thanks for subscribing to Fund Investigator.
>
> We investigate whether mutual fund performance holds up after benchmark choice, consistency, risk and drawdown are taken into account.
>
> You'll receive a concise note when a new investigation or material update is published. Complete reports remain on FundInvestigator.com.
>
> Start here:
>
> - How to evaluate a mutual fund in five checks
> - Browse all investigations
> - Open Deepdive
>
> If you see a fund claim worth examining, reply to this email.

Link the three starting points to:

- `https://fundinvestigator.com/reports/five-checks-mutual-fund`
- `https://fundinvestigator.com/reports`
- `https://deepdive.fundinvestigator.com`

The welcome email should establish expectations, provide a useful starting point, and confirm that replies reach a monitored inbox.

## 10. Privacy and Legal Setup

Before switching the website capture forms:

1. Update the Fund Investigator privacy policy to state that subscriber email addresses are processed through Substack.
2. Explain what is collected, why it is collected, how readers unsubscribe, and how long the information is retained.
3. Add matching publisher privacy and terms inside Substack.
4. Link the Fund Investigator disclaimer from the About page and email footer.
5. Keep the newsletter informational and avoid personalized recommendations or transaction prompts.

Official reference: [Publisher privacy policy and terms on Substack](https://support.substack.com/hc/en-us/articles/28216716181012-How-do-I-host-my-own-Terms-of-Service-or-Privacy-Policy)

## 11. Seed Content Before Launch

Publish at least two pieces before directing meaningful traffic to the publication.

### Post 1: Start Here: What Fund Investigator Investigates

Explain:

- What Fund Investigator investigates.
- Why the complete work remains on FundInvestigator.com.
- What an Investigation Brief contains.
- What subscribers will and will not receive.
- How Deepdive relates to the published investigations.

Pin this post. It can be published to the web without being sent as the first newsletter.

### Post 2: Five Checks Before Judging a Mutual Fund

Turn the existing investigation into a concise email containing:

1. The question being examined.
2. Three findings that matter.
3. One chart or evidence point.
4. What the evidence does not establish.
5. A call to read the complete investigation.

Suggested initial tags:

- Investigation Brief
- Methodology
- Deepdive Update

Do not reproduce complete reports on Substack. Each Substack post should be a distinct summary with a clear link to the complete investigation.

## 12. Website Integration

Use these calls to action for the two current homepage capture locations:

- **Hero guide:** Continue to Subscribe
- **Homepage lower section:** Notify Me

During the initial launch, link to:

`https://fundinvestigator.substack.com/welcome`

Use separate UTM values for each placement so their effectiveness can be compared where Substack exposes the full landing URL:

- Hero guide: `utm_source=fundinvestigator&utm_medium=website&utm_campaign=newsletter&utm_content=hero_guide`
- Homepage lower section: `utm_source=fundinvestigator&utm_medium=website&utm_campaign=newsletter&utm_content=homepage_bottom`

As verified on 16 July 2026, Substack redirects `/welcome` to `/?showWelcome=true` and preserves these query parameters. Confirm what is exposed in the subscriber dashboard after the first test subscriptions; do not assume `utm_content` will be available as a subscriber field.

Prefer a Fund Investigator-styled button linking to the Substack Welcome page over inserting the native Substack form everywhere. The native embedded form is an iframe with limited visual customisation and will not closely match the existing component system.

Official reference: [Substack embedded signup forms](https://support.substack.com/hc/en-us/articles/360041759232-Can-I-embed-a-signup-form-for-my-Substack-publication)

### Stable link for a future domain change

Consider adding `fundinvestigator.com/newsletter` as the permanent newsletter landing page or redirect. Website calls to action can point to this controlled URL, which can then be updated in one place if the Substack address changes later.

At minimum, store the Substack destination in one shared website configuration value rather than repeating the URL across components.

## 13. Cutover and Quality Assurance

Before removing MailerLite:

1. Subscribe using a spare email address.
2. Receive and click the confirmation email.
3. Confirm receipt of the welcome email.
4. Test every link in the welcome email.
5. Reply and confirm that forwarding reaches the monitored inbox.
6. Check Gmail and Outlook rendering on desktop and mobile.
7. Test unsubscribe.
8. Inspect the Welcome page and archive on mobile.
9. Check the default and per-post social previews.
10. Confirm both Fund Investigator capture placements point to Substack.
11. Wait one day and review the complete workflow.
12. Remove the MailerLite integration only after the Substack flow passes these checks.

## 14. When to Reconsider the Custom Domain

Revisit `dispatch.fundinvestigator.com` when one or more of the following is true:

- Three to five editions have been published consistently.
- The publication has a regular subscriber flow.
- The Substack URL is being used in social profiles, press coverage, or offline materials.
- The newsletter has become an established part of the Fund Investigator brand.
- The branding benefit is worth the one-time fee.

Adding the custom domain later will require updating the website destination, social profiles, saved templates, and any printed or shared links. It will not change the Substack email-sending domain.

## Definition of Done

The initial setup is complete when:

- Publication identity and branding are consistent with Fund Investigator.
- The Welcome page, About page, navigation, and email footer are complete.
- Double opt-in and reply forwarding work.
- Privacy, terms, and disclaimer links are present.
- At least two useful posts exist.
- Both website capture locations lead to Substack with placement-specific tracking.
- An end-to-end subscription test has passed.
- MailerLite has been removed after the successful cutover.
