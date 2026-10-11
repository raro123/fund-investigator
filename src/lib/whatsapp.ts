/**
 * WhatsApp chat link builder for the Invest with Support enquiry route.
 *
 * Mirrors `deepdive.ts`: each button placement has its own prefilled text and
 * a `ref` tag, so an incoming chat shows which button started it. The texts
 * come from docs/mfd_whatsapp_kit.md §4 and must name no fund.
 */

import { WHATSAPP_NUMBER } from './distributor';

export type WhatsappPlacement = 'invest_hero' | 'invest_review' | 'invest_cta';

const prefilledText: Record<WhatsappPlacement, string> = {
  invest_hero: "Hi, I'd like to know more about Invest with Support.",
  invest_review: "Hi, I'd like a portfolio review.",
  invest_cta: "Hi, I'd like to know more about Invest with Support.",
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
