/**
 * WhatsApp chat link builder for the Invest with support enquiry route.
 *
 * Mirrors `deepdive.ts`: each button placement has its own prefilled text and
 * a `ref` tag, so an incoming chat shows which button started it. The visitor
 * only taps Send, so the texts are friendly and name no fund
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
  | 'footer';

const prefilledText: Record<WhatsappPlacement, string> = {
  homepage_hero: `Hi ${FIRST_NAME}, I'd like to know how you can help with my investments.`,
  homepage_services: `Hi ${FIRST_NAME}, I'd like to know more about your services.`,
  homepage_final: `Hi ${FIRST_NAME}, I'd like to book a first call.`,
  invest_hero: `Hi ${FIRST_NAME}, I'd like to know more about Invest with support.`,
  invest_review: `Hi ${FIRST_NAME}, I'd like to book a first call.`,
  invest_cta: `Hi ${FIRST_NAME}, I'd like to know more about Invest with support.`,
  footer: `Hi ${FIRST_NAME}, I have a question.`,
};

/**
 * Build a wa.me link with the placement's prefilled text and ref tag.
 *
 * @param placement - Button placement; becomes the `(ref: …)` suffix.
 * @returns The full https://wa.me/… URL.
 */
export function whatsappUrl(placement: WhatsappPlacement): string {
  const text = `${prefilledText[placement]} (ref: ${placement})`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
