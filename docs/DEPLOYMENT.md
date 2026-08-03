# Deployment Guide — Fund Investigator

## Hosting

Cloudflare Pages, connected to this GitHub repo.

- **Production branch:** `main` — every push deploys live to `fundinvestigator.com`
- **Preview deploys:** other branches (e.g. `dev`) get their own preview URL on push, so changes can be checked before merging to `main`
- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`

> **Verify in Cloudflare dashboard** (Pages project → Settings → Builds & deployments): confirm the above still matches, and check the Node version pinned there against what's used locally.

## Environment Variables

`src/layouts/Layout.astro` reads two at build/runtime for the client-side error-tracking beacon:

- `PUBLIC_CF_ACCOUNT_ID`
- `PUBLIC_CF_PROJECT_NAME`

> **Verify in Cloudflare dashboard** (Pages project → Settings → Environment variables): confirm these are actually set for the production environment. See `docs/project_log.md` #37 — the beacon's target endpoint is under review and may not be delivering anywhere regardless.

## Custom Domain & DNS

`fundinvestigator.com` should be attached as a custom domain on the Pages project, with DNS/SSL managed through Cloudflare.

> **Verify in Cloudflare dashboard**: custom domain status, DNS records, SSL/TLS mode (should be Full or Full strict).

## Deepdive Subdomain

`deepdive.fundinvestigator.com` is a **separate app and separate deploy** (Streamlit on Railway) — not part of this repo or this Pages project. This site only links out to it; there's no proxy, redirect, or shared build step to maintain here.

## robots.txt & Sitemap

- `public/robots.txt` disallows `/styleguide`, `/404`, `/reports/_TEMPLATE`, and points to the sitemap
- `astro.config.mjs`'s `sitemap()` integration filter excludes the same set, plus `/subscribe`
- If a new non-content route is added that shouldn't be indexed (e.g. another utility page), update **both** — the sitemap filter and `robots.txt` are independent and won't warn you if one is missed

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
