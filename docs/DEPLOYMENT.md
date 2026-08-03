# Deployment Guide — Fund Investigator

## Hosting

Cloudflare Pages, connected to this GitHub repo.

- **Production branch:** `main` — every push deploys live to `fundinvestigator.com`
- **Preview deploys:** other branches (e.g. `dev`) get their own preview URL on push, so changes can be checked before merging to `main`. Each push gets a unique per-commit URL (`https://<hash>.fund-investigator.pages.dev`), plus a stable per-branch alias that always points at that branch's latest deploy — for `dev`, that's `https://dev.fund-investigator.pages.dev` (verified in dashboard, 2026-08-03).
- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`

> **Verified in Cloudflare dashboard (2026-08-03):** production branch `main`, build command `npm run build`, output `dist` all match this doc. There's no discrete "Node version" field in Build settings to check against — Cloudflare ties the build image to a **Build system version** (currently **Version 3**), not an explicit Node version.
>
> **Gap (unresolved):** nothing in the repo pins a Node version (no `.nvmrc`, no `engines` field in `package.json`), and there's no dashboard-side Node version to reconcile it against either. Adding `.nvmrc`/`engines` is still the fix — it just protects local-vs-Cloudflare-build-image drift, not a "doc vs. dashboard" mismatch.

## Environment Variables

`src/layouts/Layout.astro` reads two at build/runtime for the client-side error-tracking beacon:

- `PUBLIC_CF_ACCOUNT_ID`
- `PUBLIC_CF_PROJECT_NAME`

> **Known broken:** the beacon (`Layout.astro:131`) POSTs to `https://cloudflare-analytics.com/cdn-cgi/rum` via `sendBeacon`. That domain is not a real Cloudflare ingestion endpoint — Cloudflare's actual RUM/Web Analytics beacon posts to your own domain's `/cdn-cgi/rum` (sites proxied through Cloudflare, via the dashboard-enabled Web Analytics snippet) or `cloudflareinsights.com/cdn-cgi/rum` (manually-installed snippet), both authenticated with a per-site token — not an account ID/project name pair. Failures are swallowed by `sendBeacon`, so this has almost certainly never delivered a single error report. See `docs/project_log.md` #37. Fix is either: (a) enable Cloudflare's real Web Analytics for the Pages project in the dashboard and drop this custom script, or (b) if genuine custom RUM is wanted, point it at a real collection endpoint you control.
>
> **Update (verified 2026-08-03): option (a) is already done.** Cloudflare Web Analytics is enabled and actively collecting real data for this project (Core Web Vitals, visits, page views — confirmed live in the dashboard). The broken custom beacon isn't a half-built feature with no fallback; it's fully redundant next to analytics that already work. Simplest fix is deleting the custom script outright rather than repointing it.
>
> **Verified in Cloudflare dashboard (2026-08-03) — confirmed gap:** `PUBLIC_CF_ACCOUNT_ID` (`bb915458af20c94d1e79419ea3b78828`) and `PUBLIC_CF_PROJECT_NAME` (`fund-investigator`) are set on **Production** only. **Preview has neither** — its sole variable is `MAILERLITE_API_KEY` (secret). This has no live effect today since the beacon itself doesn't work (see below), but if the endpoint is ever fixed, preview deploys will silently no-op until these two are added to the Preview environment too.

## Custom Domain & DNS

`fundinvestigator.com` should be attached as a custom domain on the Pages project, with DNS/SSL managed through Cloudflare.

> **Verified in Cloudflare dashboard (2026-08-03):** custom domain `fundinvestigator.com` is Active with SSL enabled on the Pages project. Root domain DNS is a Proxied `CNAME` → `fund-investigator.pages.dev`. SSL/TLS encryption mode is **Full** (satisfies Full/Full strict).
>
> **Unrelated gaps surfaced by Cloudflare's own DNS recommendations panel while checking this:** no A/AAAA/CNAME record exists for `www.fundinvestigator.com` (so `www.` doesn't resolve at all), there's a duplicate SPF TXT record on the root domain, and no DMARC record is set. None of these affect the Pages site itself — they're email-deliverability/DNS-hygiene items — but they're quick fixes worth a decision rather than silent drift.

## Deepdive Subdomain

`deepdive.fundinvestigator.com` is a **separate app and separate deploy** (Streamlit on Railway) — not part of this repo or this Pages project. This site only links out to it; there's no proxy, redirect, or shared build step to maintain here.

> **Verified in Cloudflare dashboard (2026-08-03):** DNS *is* shared, though — `deepdive.fundinvestigator.com` is a Proxied `CNAME` → `ug73tk45.up.railway.app` in the same Cloudflare zone as the main site. Not a build/deploy dependency, but if the Railway app's custom hostname ever changes, this CNAME needs a manual update here.

## robots.txt & Sitemap

- `public/robots.txt` disallows `/styleguide`, `/404`, `/reports/_TEMPLATE`, and points to the sitemap
- `astro.config.mjs`'s `sitemap()` integration filter excludes the same set, plus `/subscribe`
- If a new non-content route is added that shouldn't be indexed (e.g. another utility page), update **both** — the sitemap filter and `robots.txt` are independent and won't warn you if one is missed

> **Resolved 2026-08-03:** Cloudflare's zone-level "Manage your robots.txt" setting (Overview → AI bot access) was found set to "block AI training in robots.txt," which injected `Disallow: /` blocks for ClaudeBot, GPTBot, Google-Extended, Applebot-Extended, CCBot, Bytespider, Amazonbot, and meta-externalagent **ahead of** this repo's own rules — a full crawl block, not a narrower "no training" signal, directly conflicting with the AI-citation strategy behind `llms.txt` and the JSON-LD structured data (`project_log.md` #12, #34, S21). This is a **zone dashboard setting, not a repo file** — invisible to `git blame` on `public/robots.txt`.
>
> Switched the setting to **Content Signals Policy** and verified live: `https://fundinvestigator.com/robots.txt` now serves only this repo's own file, with none of the per-bot `Disallow` blocks — ClaudeBot, GPTBot, etc. can crawl and cite the site again.
>
> **Open watch-item:** Cloudflare's own documentation describes "Content Signals Policy" as also adding a declarative `Content-Signal: search=yes,ai-train=no,use=reference` preference line for `User-agent: *` (allow citation/reference use, discourage training, without blocking crawl access). That line isn't showing up on the live fetch yet — possibly edge propagation lag. Re-check in a few days; if it's still absent, the setting may behave differently than documented and is worth a support ticket rather than assuming it's working as intended.

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

## Known Gaps

Not urgent, but undocumented — worth a decision rather than silent drift:

- **No `public/_headers` file.** No security headers (CSP, `X-Frame-Options`, `Referrer-Policy`, etc.) or explicit cache-control are configured via Cloudflare Pages' `_headers` convention. May be a deliberate non-issue for a static brand site, but it's currently an absence, not a decision.
- **Preview URLs (`*.pages.dev`) are public by default — confirmed in dashboard (2026-08-03).** Settings → General → Preview access reads "Preview deployments are public by default"; not currently restricted with Cloudflare Access. Not documented whether that's accepted as-is or should be gated.
- **`wrangler` devDependency is likely vestigial.** It was added only to locally test `functions/api/subscribe.ts` (a Cloudflare Pages Function) via `npx wrangler pages dev dist`. That function was deleted as confirmed dead code once the site fully migrated email capture to Substack (`project_log.md` #39) — there are no Pages Functions left in this repo. Keep `wrangler` if Functions work is planned again soon; otherwise it's dead weight in `package.json`.
- **No deploy-failure notifications configured.** Pages project → Settings → General → Notifications is unset (confirmed 2026-08-03) — a failed production build currently has no alerting; you'd only notice by checking the dashboard or the site going stale.

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
