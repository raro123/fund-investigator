/**
 * Shared Substack destination config.
 *
 * Single source of truth for the newsletter's public URL, so the address is
 * stored once rather than repeated across components (docs/substack_setup.md,
 * section 12). If a custom domain is later added (see project_log.md #30 and
 * docs/substack_setup.md section 14), update SUBSTACK_BASE_URL here and every
 * placement picks it up.
 *
 * Each capture placement gets its own utm_content value. Substack preserves it
 * through the Welcome-page redirect, providing a placement marker where the
 * full landing URL is available (project_log.md #9, #11).
 */

const SUBSTACK_BASE_URL = 'https://fundinvestigator.substack.com';
const SUBSTACK_WELCOME_PATH = '/welcome';

export type SubstackPlacement = 'homepage_bottom' | 'article_end' | 'article_takeaways';

export function substackWelcomeUrl(utmContent: SubstackPlacement): string {
  const url = new URL(SUBSTACK_WELCOME_PATH, SUBSTACK_BASE_URL);
  url.searchParams.set('utm_source', 'fundinvestigator');
  url.searchParams.set('utm_medium', 'website');
  url.searchParams.set('utm_campaign', 'newsletter');
  url.searchParams.set('utm_content', utmContent);
  return url.toString();
}
