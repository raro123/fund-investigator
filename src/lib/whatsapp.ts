/**
 * WhatsApp chat link builder for the Invest with support enquiry route.
 *
 * Each button placement has its own prefilled text. The visitor only taps
 * Send, so the texts are friendly, name no fund and carry no tracking code:
 * the `conversation_request` PostHog event records the placement
 * (docs/mfd_whatsapp_kit.md §4).
 */

import { FIRST_NAME, WHATSAPP_NUMBER } from './distributor';

export type WhatsappPlacement =
  | 'homepage_hero'
  | 'homepage_services'
  | 'homepage_final'
  | 'invest_hero'
  | 'invest_review'
  | 'invest_cta'
  | 'invest_faq'
  | 'about'
  | 'footer'
  | 'article_end'
  | 'lp_review_hero'
  | 'lp_review_cta'
  | 'lp_review_final'
  | 'lp_start_hero'
  | 'lp_start_cta'
  | 'lp_start_final'
  | 'lp_sif_hero'
  | 'lp_sif_cta'
  | 'lp_sif_final'
  | 'lp_gift_city_hero'
  | 'lp_gift_city_cta'
  | 'lp_gift_city_final';

const prefilledText: Record<WhatsappPlacement, string> = {
  homepage_hero: `Hi ${FIRST_NAME}, I'd like to know how you can help with my investments.`,
  homepage_services: `Hi ${FIRST_NAME}, I'd like to know more about your services.`,
  homepage_final: `Hi ${FIRST_NAME}, I'd like to book a first call.`,
  invest_hero: `Hi ${FIRST_NAME}, I'd like to know more about Invest with support.`,
  invest_review: `Hi ${FIRST_NAME}, I'd like to book a first call.`,
  invest_cta: `Hi ${FIRST_NAME}, I'd like to know more about Invest with support.`,
  invest_faq: `Hi ${FIRST_NAME}, I have a question about Invest with support.`,
  about: `Hi ${FIRST_NAME}, I'd like to book a first call.`,
  footer: `Hi ${FIRST_NAME}, I have a question.`,
  article_end: `Hi ${FIRST_NAME}, I read your guide and I'd like a review of my mutual fund portfolio.`,
  // Landing pages: the text names the reader's topic, so the chat shows why they wrote.
  lp_review_hero: `Hi ${FIRST_NAME}, I'd like a review of my mutual fund portfolio.`,
  lp_review_cta: `Hi ${FIRST_NAME}, I'd like a review of my mutual fund portfolio.`,
  lp_review_final: `Hi ${FIRST_NAME}, I have a question about a portfolio review.`,
  lp_start_hero: `Hi ${FIRST_NAME}, I have savings and want to start investing in mutual funds.`,
  lp_start_cta: `Hi ${FIRST_NAME}, I have savings and want to start investing in mutual funds.`,
  lp_start_final: `Hi ${FIRST_NAME}, I have a question about starting to invest.`,
  lp_sif_hero: `Hi ${FIRST_NAME}, I'd like to know if a SIF suits me.`,
  lp_sif_cta: `Hi ${FIRST_NAME}, I'd like to know if a SIF suits me.`,
  lp_sif_final: `Hi ${FIRST_NAME}, I have a question about SIFs.`,
  lp_gift_city_hero: `Hi ${FIRST_NAME}, I'd like to know if GIFT City funds suit me.`,
  lp_gift_city_cta: `Hi ${FIRST_NAME}, I'd like to know if GIFT City funds suit me.`,
  lp_gift_city_final: `Hi ${FIRST_NAME}, I have a question about GIFT City funds.`,
};

/**
 * Build a wa.me link with the placement's prefilled text.
 *
 * @param placement - Button placement; picks the prefilled text.
 * @returns The full https://wa.me/… URL.
 */
export function whatsappUrl(placement: WhatsappPlacement): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledText[placement])}`;
}

/**
 * Official WhatsApp glyph (24×24 viewBox), drawn with `fill="currentColor"`.
 * Source: Simple Icons 16.35.0 (CC0). One colour, never WhatsApp green: WhatsApp
 * offers single-colour versions, and green would compete with the gold button.
 */
export const WHATSAPP_ICON_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z';
