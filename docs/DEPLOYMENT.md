# Deployment Guide — Fund Investigator

## Hosting

Cloudflare Pages, connected to this GitHub repo.

- **Production branch:** `main` — every push deploys live to `fundinvestigator.com`
- **Preview deploys:** other branches get their own URL on push. Each push gets a unique per-commit URL (`https://<hash>.fund-investigator.pages.dev`), plus a stable per-branch alias — for `dev`, that's `https://dev.fund-investigator.pages.dev`
- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Build system version:** 3 — Cloudflare doesn't expose a discrete Node version setting; the build image is tied to this version instead

**Needs addressing:** no Node version is pinned in the repo (no `.nvmrc`, no `engines` in `package.json`), so there's nothing to reconcile against Cloudflare's build image if it changes. Add one.

## Environment Variables

| Variable | Environment | Purpose |
|---|---|---|
| `PUBLIC_CF_ACCOUNT_ID` | Production only | Read by `src/layouts/Layout.astro` for a custom error-tracking beacon |
| `PUBLIC_CF_PROJECT_NAME` | Production only | Same as above |
| `MAILERLITE_API_KEY` | Preview only (secret) | Leftover from the deleted MailerLite subscribe function |

**Needs addressing:**
- The error-tracking beacon (`Layout.astro:131`) posts to `cloudflare-analytics.com/cdn-cgi/rum`, which isn't a real Cloudflare endpoint — it has never delivered anything. Cloudflare Web Analytics is already enabled and collecting real data for this project, so the beacon is redundant. Delete the script (`project_log.md` #37).
- `MAILERLITE_API_KEY` is almost certainly dead now that `functions/api/subscribe.ts` is deleted (#39) — confirm nothing reads it, then remove it from Preview.

## Custom Domain & DNS

`fundinvestigator.com` is attached as a custom domain on the Pages project (Active, SSL enabled). Root domain DNS is a Proxied `CNAME` → `fund-investigator.pages.dev`. SSL/TLS mode is Full.

**Needs addressing:**
- No DNS record for `www.fundinvestigator.com` — it doesn't resolve at all
- Duplicate SPF TXT record on the root domain
- No DMARC record set

## Deepdive Subdomain

`deepdive.fundinvestigator.com` is a separate app and separate deploy (Streamlit on Railway) — not part of this repo or this Pages project. This site only links out to it; no proxy, redirect, or shared build step to maintain here.

DNS *is* shared: `deepdive.fundinvestigator.com` is a Proxied `CNAME` → `ug73tk45.up.railway.app` in the same Cloudflare zone as the main site. If the Railway app's custom hostname ever changes, this CNAME needs a manual update here.

## robots.txt & Sitemap

- `public/robots.txt` disallows `/styleguide`, `/404`, `/reports/_TEMPLATE`, and points to the sitemap
- `astro.config.mjs`'s `sitemap()` integration filter excludes the same set, plus `/subscribe`
- If a new non-content route is added that shouldn't be indexed, update **both** — they're independent and won't warn you if one is missed

Cloudflare's zone-level "Manage your robots.txt" setting (Overview → AI bot access) is set to **Content Signals Policy** — it lets AI crawlers (ClaudeBot, GPTBot, etc.) crawl and cite the site while expressing a no-training preference, instead of hard-blocking them. This matters because `llms.txt` and the JSON-LD structured data exist specifically so AI assistants can cite this content (`project_log.md` #12, #34). It's a **zone dashboard setting, not a repo file** — invisible to `git blame` on `public/robots.txt`.

**Needs addressing:** Cloudflare's docs say this setting should also add a `Content-Signal: search=yes,ai-train=no,use=reference` line to the live `robots.txt`. That line isn't showing up yet — likely propagation lag, but if it's still missing after a few more days, follow up with Cloudflare support (#43).

## Local Development & Testing

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run astro check  # type-check
```

Run a build + preview locally before pushing to `main` if the change touches layout, routing, or the content schema.

## Updating Content

1. Edit locally, verify with `npm run dev`
2. Commit and push
3. Cloudflare Pages builds and deploys automatically (production on `main`, preview on other branches)

## Other Open Items

- **Stale Functions-directory build log.** A `dev` preview build logged `Found Functions directory at /functions. Uploading.` even though `functions/` was deleted (#39) and doesn't exist in the current checkout. Likely a stale build predating the deletion reaching `dev` — confirm before treating #39 as fully closed (#42).
- **No `public/_headers` file.** No security headers (CSP, `X-Frame-Options`, `Referrer-Policy`, etc.) or explicit cache-control are configured. May be a deliberate non-issue for a static brand site, but it's currently an absence, not a decision.
- **Preview URLs (`*.pages.dev`) are public by default.** Not currently restricted with Cloudflare Access. Undecided whether that's acceptable.
- **`wrangler` devDependency is likely vestigial.** It was only needed to locally test `functions/api/subscribe.ts` via `npx wrangler pages dev dist`. That function is gone (#39) and there are no Pages Functions left in this repo — remove it unless Functions work is planned again soon.
- **No deploy-failure notifications configured.** A failed production build currently has no alerting; you'd only notice by checking the dashboard or the site going stale.

## Troubleshooting

**Build fails**
- Check the build log in the Cloudflare dashboard first
- Run `npm run build` locally to reproduce
- Run `npm run astro check` to catch type/content-schema errors before they surface as a build failure

**Styles not loading / look wrong**
- Clear browser cache
- Confirm Tailwind tokens used are defined in `tailwind.config.mjs` — arbitrary values (`bg-[#...]`) won't be caught by a successful build but indicate a token was skipped (see `CLAUDE.md`)

**SEO / indexing issues**
- Check meta tags in `Layout.astro`
- Confirm the page isn't unintentionally excluded by `robots.txt` or the sitemap filter
- Submit sitemap to Google Search Console

## Support

- Cloudflare Pages docs: https://developers.cloudflare.com/pages
- Astro docs: https://docs.astro.build
- Contact: contact@fundinvestigator.com
