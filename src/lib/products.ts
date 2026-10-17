/**
 * The products we help clients invest in: the facts behind the /invest/#products
 * route cards (src/lib/routes.ts) and the SIF and GIFT City landing pages.
 *
 * Each product is framed by fit (who it suits, the minimum, the main risk),
 * not as a catalogue. Name no fund house and make no return claims
 * (content_philosophy_v2.md, Legal limits). Draft copy: the owner checks it.
 *
 * @example
 * import { products } from '../lib/products';
 * {products.map((product) => <h3>{product.title}</h3>)}
 */

export interface Product {
  title: string;
  /** One line: what the product is */
  intro: string;
  suits: string;
  minimum: string;
  mainRisk: string;
}

export const products: Product[] = [
  {
    title: 'Mutual funds',
    intro: 'Equity, debt and hybrid funds, from every fund house.',
    suits: 'Most goals, from a first SIP to a large portfolio.',
    minimum: 'Set by each fund. Most SIPs start at ₹500 a month or less.',
    mainRisk: 'Values move with markets. Equity funds can fall sharply in the short term.',
  },
  {
    title: 'SIFs',
    intro: 'Specialised Investment Funds: a SEBI category with more flexible strategies than mutual funds.',
    suits: 'Experienced investors who want strategies such as long-short.',
    minimum: '₹10 lakh across a fund house\'s SIFs.',
    mainRisk: 'Strategies can use derivatives. Some SIFs limit when you can redeem.',
  },
  {
    title: 'GIFT City funds',
    intro: 'Funds based in GIFT City (IFSC), held in US dollars.',
    suits: 'Investors who want to hold assets in US dollars, including NRIs.',
    minimum: 'Set by each fund, in US dollars. Residents invest under the LRS limit.',
    mainRisk: 'Returns change with the rupee–dollar rate. Tax and reporting rules differ from Indian funds.',
  },
];
