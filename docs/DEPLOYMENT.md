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
| `PUBLIC_CF_ACCOUNT_ID` | Production only | Dead — the error-tracking beacon that read this was deleted (#37); nothing in the repo reads it anymore |
| `PUBLIC_CF_PROJECT_NAME` | Production only | Same as above |
| `MAILERLITE_API_KEY` | Preview only (secret) | Leftover from the deleted MailerLite subscribe function |
| `PUBLIC_POSTHOG_KEY` | **Set on both Production and Preview** | PostHog project API key, read by `src/layouts/Layout.astro`. No-ops (with a console warning) if set without `PUBLIC_POSTHOG_HOST` |
| `PUBLIC_POSTHOG_HOST` | **Set on both Production and Preview** | PostHog Cloud region host (`https://us.i.posthog.com` or `https://eu.i.posthog.com`) — must match the region the existing Deepdive PostHog project uses. No silent fallback |
| `INDEXNOW_KEY` | Production only | Must equal `14a30902d8a12fd849ea16a55b53e034`. Enables IndexNow only on the `main` Cloudflare Pages build after the public key route has been deployed and verified |

**Needs addressing:**
- `PUBLIC_CF_ACCOUNT_ID` / `PUBLIC_CF_PROJECT_NAME` are now fully dead (the beacon that read them was deleted) — remove them from Cloudflare Pages.
- `MAILERLITE_API_KEY` is almost certainly dead now that `functions/api/subscribe.ts` is deleted (#39) — confirm nothing reads it, then remove it from Preview.
- A prior session found `PUBLIC_CF_ACCOUNT_ID`/`PUBLIC_CF_PROJECT_NAME` had been set on Production only, silently breaking Preview. Don't repeat that mistake with the PostHog vars — set both on **Production and Preview**, or Preview deploys will silently have no analytics.

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

Cloudflare's zone-level "Manage your robots.txt" setting (Overview → AI bot access) is set to **Content Signals Policy**. The repository now owns the explicit usage preference in `public/robots.txt`:

```text
Content-Signal: search=yes, ai-input=yes, ai-train=no, use=reference
```

This allows ordinary search and real-time AI grounding/citation, reserves model-training rights, and asks consumers to excerpt and link back rather than reproduce the corpus. Cloudflare may prepend explanatory policy text at the edge; verify the live response after deployment and ensure it does not add contradictory directives.

## Agent discovery and Markdown negotiation

The static build publishes:

- `/schema/reports.json` — corpus-wide report JSON-LD
- `/schemamap.xml` — discovery map for schema endpoints
- `/.well-known/api-catalog` — RFC 9727 API catalogue
- `/reports/<slug>.md` — report Markdown alternates with HTML canonicals and `noindex, follow`

Report HTML advertises its matching Markdown route with `<link rel="alternate" type="text/markdown">`. Other pages do not advertise Markdown because no alternate is generated for them.

`public/_headers` restores the endpoint content types, `noindex` policy, cache policy, and per-report canonical `Link` header when Cloudflare serves the prerendered files. Astro's endpoint `Response` headers are not retained as metadata on static files. The token-count header produced during endpoint rendering is therefore not exposed after static deployment; adding a Worker only for that informational header is not worth the runtime complexity or cost.

Cloudflare can negotiate Markdown without a Worker or paid service. Add one **URL Rewrite Transform Rule** in the zone dashboard. This uses the string functions available on the Free plan, so there is no additional service cost; it only consumes one Transform Rule from the plan quota.

Match expression:

```text
http.host eq "fundinvestigator.com"
and http.request.method in {"GET" "HEAD"}
and http.request.headers["accept"][0] contains "text/markdown"
and starts_with(http.request.uri.path, "/reports/")
and http.request.uri.path ne "/reports/"
and ends_with(http.request.uri.path, "/")
```

Dynamic path rewrite:

```text
wildcard_replace(http.request.uri.path, "*/", "${1}.md")
```

Preserve the query string. Do not add `Vary: Accept`: Cloudflare strips custom `Vary` values at the edge, and the rewritten URL already gives HTML and Markdown separate cache keys.

After deployment, validate both representations:

```bash
curl -I https://fundinvestigator.com/reports/five-checks-mutual-fund/
curl -I -H 'Accept: text/markdown' https://fundinvestigator.com/reports/five-checks-mutual-fund/
```

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
- **Sitewide headers remain incomplete.** Phase 4 adds route-specific headers for Markdown and discovery files. Global security, asset caching, `No-Vary-Search`, and discovery `Link` headers remain Phase 5 work.
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
