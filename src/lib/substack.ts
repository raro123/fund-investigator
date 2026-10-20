/**
 * Shared Substack destination config.
 *
 * Single source of truth for the newsletter's public URL, so the address is
 * stored once rather than repeated across components (docs/substack_setup.md,
 * section 12). If a custom domain is later added (see project_log.md #30 and
 * docs/substack_setup.md section 14), update SUBSTACK_BASE_URL here and every
 * placement picks it up.
 *
 * Every Subscribe link points at the in-site /subscribe/ page, which frames
 * Substack's form. Placements are told apart by the `subscribe_click` event's
 * `placement` property, not by UTM tags.
 */

const SUBSTACK_BASE_URL = 'https://fundinvestigator.substack.com';

/** The in-site subscribe page every Subscribe link points to. */
export const SUBSCRIBE_PAGE = '/subscribe/';

/** Substack's own signup form, framed on /subscribe/ so readers stay on the site. */
export const SUBSTACK_EMBED_URL = new URL('/embed', SUBSTACK_BASE_URL).toString();
