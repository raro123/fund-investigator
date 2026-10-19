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

/** One credential: a short highlight for the /about/ credential row, and the
 * full phrase for inline lists (the homepage final section). */
export interface Credential {
  /** Short, bold part, e.g. '12 years' */
  value: string;
  /** What the value means, e.g. 'in financial services' */
  label: string;
  /** The full phrase for inline lists */
  text: string;
}

/**
 * Credentials shown on /about/ (credential row) and under the name in the
 * homepage final section. The registration (TAGLINE, ARN) is shown separately.
 * Owner-supplied, 2026-10-15.
 */
export const CREDENTIALS: Credential[] = [
  { value: '12 years', label: 'in financial services', text: '12 years in financial services' },
  { value: "Master's", label: 'in Economics', text: "Master's in Economics" },
  {
    value: 'IIT Kanpur',
    label: 'Specialisation in Financial Technology and Management',
    text: 'Financial Technology and Management, IIT Kanpur',
  },
];

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

/** How many fund houses (AMCs) we are empanelled with; "fund houses", not "AMCs", in copy. */
export const EMPANELMENT = '40+ fund houses';

/** AMFI's public distributor search; investors can look up the ARN there. */
export const AMFI_VERIFY_URL = 'https://www.amfiindia.com/locate-distributor';

/**
 * Mandatory tagline for distributors registered for SIFs: AMFI requires this
 * exact wording, with the name and ARN, in all communication, including the
 * website. Keep it verbatim.
 */
export const TAGLINE = 'AMFI Registered Mutual Fund Distributor & SIF Distributor';

/** Standard AMFI risk warning — keep the wording exact. */
export const RISK_WARNING =
  'Mutual Fund investments are subject to market risks, read all scheme related documents carefully.';

/**
 * Mandatory SIF warning, verbatim from SEBI circular
 * SEBI/HO/IMD/IMD-PoD-1/P/CIR/2025/26 (27 February 2025), Annexure A §13.4.
 * Every page that promotes SIFs must show it conspicuously, with no additions
 * or deletions (COM-015). Keep SEBI's spelling and grammar exactly as here.
 */
export const SIF_WARNING =
  'Investments in Specialized Investment Fund involves relatively higher risk including potential loss of capital, liquidity risk and market volatility. Please read all investment strategy related documents carefully before making the investment decision.';

export const CONTACT_EMAIL = 'contact@fundinvestigator.com';

/** WhatsApp Business number in international format, digits only (for wa.me links). */
export const WHATSAPP_NUMBER = '919625026859';

/** Zoho Bookings page for the 30-minute portfolio review call. */
export const BOOKING_URL = 'https://fundinvestigator.zohobookings.in/488614000000029045';
