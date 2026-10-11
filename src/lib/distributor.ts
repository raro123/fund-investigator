/**
 * Distributor identity — single source of truth for the AMFI registration
 * details and contact routes shown across the site.
 *
 * AMFI's code of conduct requires the distributor's name, ARN and the standard
 * risk warning wherever we promote mutual funds, so every page reads them from
 * here instead of repeating literals. When the ARN is renewed, update
 * ARN_VALID_UNTIL; when a contact route changes, this is the one file to edit.
 *
 * The owner's name appears only in this compliance identity — no byline or
 * founder profile until SEBI Research Analyst certification (log #29).
 */

/** Name registered against the ARN with AMFI. */
export const REGISTERED_NAME = 'Ishpreet Singh Modi';

export const ARN = 'ARN-370951';

/** ARN expiry as YYYY-MM-DD; display through formatDate(). */
export const ARN_VALID_UNTIL = '2029-09-05';

export const TAGLINE = 'AMFI-registered Mutual Fund Distributor';

/** Standard AMFI risk warning — keep the wording exact. */
export const RISK_WARNING =
  'Mutual Fund investments are subject to market risks, read all scheme related documents carefully.';

export const CONTACT_EMAIL = 'contact@fundinvestigator.com';

/** WhatsApp Business number in international format, digits only (for wa.me links). */
export const WHATSAPP_NUMBER = '919625026859';

/** Zoho Bookings page for the 30-minute portfolio review call. */
export const BOOKING_URL = 'https://fundinvestigator.zohobookings.in/488614000000029045';
