# Project Log

## Project Objective

Build a fast, content-led financial advisory brand platform for Fund Investigator with a simple static hub and a clear path to specialized analytical apps.

The project prioritizes low operational complexity, budget-conscious tooling, maintainable static-site delivery, and a solo-dev-friendly workflow.

The current product target is a Cloudflare Pages-hosted Astro site that publishes investigations, explains the Fund Investigator approach, links to the Deepdive app, and captures email subscribers for future investigation and tool updates.

## Important Links

- Fund Investigator production site: https://fundinvestigator.com
- Deepdive app: https://deepdive.fundinvestigator.com
- MailerLite developer docs: https://developers.mailerlite.com/docs
- Astro docs: https://docs.astro.build
- Cloudflare Pages Functions docs: https://developers.cloudflare.com/pages/functions/
- Project foundation config: `package.json`
- Design tokens: `tailwind.config.mjs`
- Content guide: `docs/CONTENT-GUIDE.md`
- Deployment notes: `docs/DEPLOYMENT.md`
- Project log: `docs/project_log.md`

---

## 2026-05-04

### Planned

- Replace generic form submission experiments with a clean subscriber capture flow.
- Keep the homepage email form visually native to Fund Investigator.
- Avoid exposing the MailerLite API key in frontend code.
- Support local testing of Cloudflare Pages Functions before production deployment.

### Implemented

- Added a Cloudflare Pages Function at `functions/api/subscribe.ts` for MailerLite subscriber creation.
- Updated the homepage email capture form to submit to `/api/subscribe`.
- Added inline success and error states so users remain on the site after submission.
- Updated the privacy policy to disclose MailerLite as the email subscription provider.
- Added Wrangler as a dev dependency for local Pages Functions testing.
- Added `.dev.vars` and `.wrangler/` to `.gitignore` so local secrets and runtime output are not committed.
- Verified the local Pages Function with Wrangler using `npx wrangler pages dev dist`.

### Decisions Taken

- Use MailerLite for newsletter subscriber capture instead of Zoho Forms or Kit.
- Use the MailerLite API through a Cloudflare Pages Function rather than public embed/JSONP form submission.
- Keep the API key in environment variables only.
- Do not require `MAILERLITE_GROUP_ID` for Phase 1; add group routing later if needed.
- Use Wrangler for local testing because `astro dev` does not run Cloudflare Pages Functions.

### Decisions Pending

- Whether subscribers should be assigned to a dedicated MailerLite group once list segmentation is needed.
- Whether to add a welcome kit delivery automation in MailerLite.
- Whether to add spam protection or rate limiting to `/api/subscribe`.
- Whether to add production monitoring for subscription failures.

---

## 2026-05-04

### Planned

- Reposition the About page so it matches the site’s evidence-led investigation voice.
- Move the stronger “Why Fund Investigator” argument from the homepage into the About page.
- Replace the homepage “Why Fund Investigator” section with a shorter teaser.
- Refine the About page visual treatment without adding new components or design tokens.

### Implemented

- Reworked `src/pages/about.astro` from a mission-style page into an investigation-note style page.
- Updated the About hero to use a dark investigative treatment with the existing grid texture.
- Added a “Case Note” intro section that frames the core question behind Fund Investigator.
- Moved the three-principle “Why Fund Investigator” argument into About:
  - Analytics, Not Sales
  - Zero Conflicts of Interest
  - Transparent Methodology
- Updated the punchline to: “Because Indian mutual fund investors deserve analysis that improves their portfolio. Not mis-selling that increases someone else’s commission.”
- Replaced the homepage full “Why Fund Investigator” section with a compact teaser linking to `/about`.
- Removed chart trace-line backgrounds from the homepage and About heroes, keeping only the subtle grid texture.
- Verified the site with `npm run build`.
- Committed the page work as `a2be391 refactor: reposition about page messaging`.

### Decisions Taken

- Keep the About page as an investigation note, not a founder story or broad mission manifesto.
- Keep the homepage focused on product value, investigations, Deepdive, and email capture.
- Use the punchline on both the homepage teaser and About principles section for stronger brand continuity.
- Avoid the phrase “analysis that increases their returns” because it implies a return-improvement promise.
- Keep the visual pass scoped to existing Astro components and Tailwind tokens.
- Remove decorative chart traces because they competed with mobile hero CTAs.

### Decisions Pending

- Whether the homepage teaser should keep the same punchline long term or use a shorter variant after more content is added.
- Whether to create a reusable “Why Fund Investigator” component if the same argument appears on more pages.
