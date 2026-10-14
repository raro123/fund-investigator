/**
 * Distributor identity — single source of truth for the AMFI registration
 * details and contact routes shown across the site.
 *
 * AMFI's code of conduct requires the distributor's name, ARN and the standard
 * risk warning wherever we promote mutual funds, so every page reads them from
 * here instead of repeating literals. When the ARN is renewed, update
 * ARN_VALID_UNTIL; when a contact route changes, this is the one file to edit.
 *
 * The owner's name, photo and credentials also appear in the homepage's final
 * section ("You speak with…"), read from here (owner decision 2026-10-14).
 */

/** Name registered against the ARN with AMFI. */
export const REGISTERED_NAME = 'Ishpreet Singh Modi';

/** First name for personal copy: "Book a call with …", WhatsApp greetings. */
export const FIRST_NAME = 'Ishpreet';

/**
 * Credentials shown under the name in the homepage final section, e.g.
 * 'NISM Series V-A certified'. The list is hidden while empty.
 */
export const CREDENTIALS: string[] = [];

/**
 * Owner photo for the homepage final section; hidden while null. When the photo
 * exists, add it to src/assets/ and assign the import here:
 *   import ownerPhoto from '../assets/owner.jpg';
 *   export const OWNER_PHOTO: ImageMetadata | null = ownerPhoto;
 */
export const OWNER_PHOTO: ImageMetadata | null = null;

export const ARN = 'ARN-370951';

/** ARN expiry as YYYY-MM-DD; display through formatDate(). */
export const ARN_VALID_UNTIL = '2029-09-05';

/**
 * Mandatory tagline for distributors registered for SIFs: AMFI requires this
 * exact wording, with the name and ARN, in all communication, including the
 * website. Keep it verbatim.
 */
export const TAGLINE = 'AMFI Registered Mutual Fund Distributor & SIF Distributor';

/** Standard AMFI risk warning — keep the wording exact. */
export const RISK_WARNING =
  'Mutual Fund investments are subject to market risks, read all scheme related documents carefully.';

export const CONTACT_EMAIL = 'contact@fundinvestigator.com';

/** WhatsApp Business number in international format, digits only (for wa.me links). */
export const WHATSAPP_NUMBER = '919625026859';

/** Zoho Bookings page for the 30-minute portfolio review call. */
export const BOOKING_URL = 'https://fundinvestigator.zohobookings.in/488614000000029045';
