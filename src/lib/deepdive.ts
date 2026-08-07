/**
 * Deepdive CTA link builder.
 *
 * The raw base URL lives in `site-urls.ts`; this file owns UTM attribution on
 * top of it, so on-site placements can be tracked once Deepdive-side or
 * third-party analytics can read them. Deepdive is a separate Streamlit app
 * (different codebase, hosted on Railway).
 *
 * Each CTA placement gets its own utm_content value, mirroring the pattern
 * established in `substack.ts` for newsletter capture placements.
 */

import { DEEPDIVE_URL } from './site-urls';

export type DeepdivePlacement =
  | 'header_nav'
  | 'header_cta'
  | 'footer'
  | 'homepage_hero'
  | 'homepage_cta'
  | 'about';

export function deepdiveUrl(placement: DeepdivePlacement): string {
  const url = new URL(DEEPDIVE_URL);
  url.searchParams.set('utm_source', 'fundinvestigator');
  url.searchParams.set('utm_medium', 'website');
  url.searchParams.set('utm_campaign', 'deepdive_launch');
  url.searchParams.set('utm_content', placement);
  return url.toString();
}
