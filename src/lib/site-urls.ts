/**
 * External URL constants — single source of truth for the site's own canonical
 * domain and its off-site presences (Deepdive app, Twitter/X, YouTube).
 *
 * These were previously duplicated as literals across schema.ts, deepdive.ts,
 * llms.txt.ts, Footer.astro, and about.astro. If the domain or a social handle
 * ever changes, this is the one file to edit.
 */

/** Canonical site origin, used as a fallback when `Astro.site` is unavailable. */
export const SITE_URL = 'https://fundinvestigator.com';

/** Deepdive app base URL (separate Streamlit app, hosted on Railway). */
export const DEEPDIVE_URL = 'https://deepdive.fundinvestigator.com';

export const TWITTER_URL = 'https://twitter.com/fundinvestigate';

export const YOUTUBE_URL = 'https://youtube.com/@fundinvestigator';
