/**
 * PostHog reverse proxy (backlog T-24).
 *
 * Ad blockers block requests to *.posthog.com, so many visitors were never
 * counted. The site sends PostHog data to /ingest on its own domain, and this
 * Cloudflare Pages Function forwards it to PostHog's US region (the region of
 * the project, see docs/DEPLOYMENT.md). Pattern from PostHog's Cloudflare
 * proxy guide: /ingest/static/* goes to the assets host, the rest to the API.
 */
const API_HOST = 'us.i.posthog.com';
const ASSET_HOST = 'us-assets.i.posthog.com';

export async function onRequest({ request }) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/ingest/, '') || '/';
  const host = path.startsWith('/static/') ? ASSET_HOST : API_HOST;

  const forwarded = new Request(`https://${host}${path}${url.search}`, request);
  // Our cookies are no business of PostHog's.
  forwarded.headers.delete('cookie');
  // Keep the visitor's own IP for PostHog's country and city lookup.
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) forwarded.headers.set('X-Forwarded-For', ip);

  return fetch(forwarded);
}
