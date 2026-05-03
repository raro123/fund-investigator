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
