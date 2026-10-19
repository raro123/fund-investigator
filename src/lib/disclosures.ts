/**
 * Disclosures — the numbered notes on /disclosures/, in bibliography style:
 * each note has a stable id (its anchor), the disclosure, its sources and the
 * date its wording was last reviewed. Pages point to a note with <Fn id="…" />
 * or disclosureHref(), never by number, so adding a note renumbers nothing
 * that links to it.
 *
 * Wording follows the website compliance review of 19 October 2026
 * (fund_distribution_business/website_compliance_tasks.md). Most of these
 * notes are optional public transparency: the legal duties they describe are
 * met in the client disclosure pack before investment. Text a regulator
 * requires on the page itself (the SIF warning) is shown on that page with
 * RiskNote as well as here.
 *
 * Not yet here, until cleared: GIFT City funds (COM-007: products, issuer,
 * our role, eligibility, LRS, currency) and the sample portfolio's method
 * (COM-019: owner confirms how the figures were made).
 *
 * @example
 * import { disclosures, disclosureHref } from '../lib/disclosures';
 * <a href={disclosureHref('sif')}>SIF eligibility</a>
 */

import { AMFI_VERIFY_URL, ARN, ARN_VALID_UNTIL, REGISTERED_NAME, SIF_WARNING, TAGLINE } from './distributor';
import { formatDate } from './format';

export interface DisclosureSource {
  label: string;
  href?: string;
}

export interface Disclosure {
  /** Stable anchor on /disclosures/; never change it once linked. */
  id: string;
  title: string;
  /** Paragraphs of the note. */
  body: string[];
  /** Optional points after the paragraphs. */
  items?: string[];
  sources: DisclosureSource[];
  /** YYYY-MM-DD the wording was last reviewed; display through formatDate(). */
  reviewed: string;
}

const MASTER_CIRCULAR = 'AMFI Master Circular for Mutual Fund Distributors, AMFI/MFD-CIR/32/2025-26, 14 January 2026';
const SIF_CIRCULAR = 'SEBI circular SEBI/HO/IMD/IMD-PoD-1/P/CIR/2025/26, 27 February 2025';
const SIF_BREACH_CIRCULAR = 'SEBI circular SEBI/HO/IMD/IMD-PoD-1/P/CIR/2025/107, 29 July 2025';
const REVIEWED = '2026-10-19';

export const disclosures = [
  {
    id: 'distributor',
    title: 'Who you deal with',
    body: [
      `Fund Investigator is run by ${REGISTERED_NAME}, an ${TAGLINE}, ${ARN}, valid until ${formatDate(ARN_VALID_UNTIL)}. You can check the ARN on AMFI's distributor search.`,
      'We are not a SEBI-registered Investment Adviser. Any scheme suggestion we make is incidental to our distribution service.',
    ],
    sources: [
      { label: 'AMFI distributor search', href: AMFI_VERIFY_URL },
      { label: `${MASTER_CIRCULAR}, §§1.3.6, 3.6.1` },
    ],
    reviewed: REVIEWED,
  },
  {
    id: 'how-we-are-paid',
    title: 'How we are paid',
    body: [
      'Investments made through us are in regular plans. The fund house pays us a commission, which comes from the regular plan\'s expense ratio. You pay us no separate fee.',
      'A direct plan of the same scheme has a lower expense ratio because it carries no distributor commission. Before you choose, we disclose in writing the commission on each scheme we suggest and on the alternatives we considered.',
    ],
    sources: [{ label: `${MASTER_CIRCULAR}, Code of Conduct §B.4(c)` }],
    reviewed: REVIEWED,
  },
  {
    id: 'research-and-shortlist',
    title: 'Public research and your shortlist',
    body: [
      'Our public tools and investigation articles provide general educational information and do not consider any reader\'s personal circumstances. They are separate from a client-specific scheme shortlist. If you choose to use our mutual-fund distribution service, any shortlist is prepared separately after fact-finding, risk profiling and suitability assessment. Investments made through us are in regular plans and may earn us commission from the relevant AMC.',
    ],
    sources: [{ label: `${MASTER_CIRCULAR}, Code of Conduct §B.2(d)` }],
    reviewed: REVIEWED,
  },
  {
    id: 'before-you-invest',
    title: 'What you receive before you invest',
    body: [
      `${REGISTERED_NAME}, ${ARN}, distributes mutual-fund schemes in a Regular Plan capacity through the mutual funds with which we are empanelled. Before you make an investment decision, we record your risk profile and assess suitability, then give you in writing:`,
    ],
    items: [
      'The list of mutual funds we are empanelled with.',
      'That our shortlist is limited to products we are authorised and empanelled to distribute, and that you may consider alternatives we do not offer.',
      'The commission on every scheme we compared, not only the ones we suggest.',
      'The risks of each suggested scheme, with its Scheme Information Document (SID), Statement of Additional Information (SAI) and Key Information Memorandum (KIM).',
      'For a SIF, the strategy\'s risks, eligibility conditions and documents.',
    ],
    sources: [{ label: `${MASTER_CIRCULAR}, Code of Conduct §§B.2(d), B.4(a)–(d), B.4(l)` }],
    reviewed: REVIEWED,
  },
  {
    id: 'data-sources',
    title: 'Data sources and calculations',
    body: [
      'Fund NAV data may be sourced from AMFI. Benchmark data may be sourced from NSE Indices or other identified index providers. Scheme attributes, portfolios and manager information may be sourced from AMC factsheets, portfolio disclosures, SID/KIM documents and other official publications. Regulatory information may be sourced from SEBI and AMFI. Fund Investigator may calculate derived metrics from these sources. The source and calculation period are identified in each applicable report.',
    ],
    sources: [{ label: 'AMFI, NSE Indices, AMC factsheets and scheme documents, SEBI' }],
    reviewed: REVIEWED,
  },
  {
    id: 'sif',
    title: 'SIF eligibility and risk',
    body: [
      SIF_WARNING,
      'SIFs use investment strategies that may be more complex and carry relatively higher risks than traditional mutual funds; risks vary by strategy. The minimum investment is an aggregate ₹10 lakh at PAN level across all investment strategies of the particular SIF. Investments in regular mutual-fund schemes, including schemes of the same AMC, do not count towards this threshold. Accredited investors are exempt. Review the relevant strategy documents, eligibility conditions and risks before investing.',
    ],
    sources: [
      { label: `${SIF_CIRCULAR}, Annexure A §§4.1–4.1.4 (minimum investment) and §13.4 (risk warning)` },
      { label: `${SIF_BREACH_CIRCULAR}, §§3.1–3.3 (falling below the minimum)` },
    ],
    reviewed: REVIEWED,
  },
] as const satisfies readonly Disclosure[];

export type DisclosureId = (typeof disclosures)[number]['id'];

/** Link to one note on /disclosures/. */
export function disclosureHref(id: DisclosureId): string {
  return `/disclosures/#${id}`;
}

/** A note's number (1-based), for footnote markers. */
export function disclosureNumber(id: DisclosureId): number {
  return disclosures.findIndex((note) => note.id === id) + 1;
}

/** A note's title, for accessible labels. */
export function disclosureTitle(id: DisclosureId): string {
  return disclosures.find((note) => note.id === id)?.title ?? '';
}
