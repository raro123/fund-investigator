/**
 * The three reader situations that route to the landing pages
 * (docs/landing_pages_plan.md): one source for the /invest/#products cards.
 *
 * Each route keeps the disclosure the old product cards showed: the minimum and
 * the main risk, taken word for word from src/lib/products.ts, so the facts
 * have one source. Name no fund house and make no return claims.
 *
 * @example
 * import { routes } from '../lib/routes';
 * {routes.map((route) => <a href={route.links[0].href}>{route.title}</a>)}
 */

import { products } from './products';

export interface RouteLink {
  label: string;
  href: string;
}

export interface RouteFact {
  label: string;
  value: string;
}

export interface Route {
  title: string;
  /** One line: what we do for a reader in this situation */
  line: string;
  links: RouteLink[];
  /** Disclosure shown on /invest/ only */
  facts: RouteFact[];
}

const product = (title: string) => {
  const match = products.find((item) => item.title === title);
  if (!match) throw new Error(`Product not found: ${title}`);
  return match;
};
const mutualFunds = product('Mutual funds');
const sif = product('SIFs');
const giftCity = product('GIFT City funds');

export const routes: Route[] = [
  {
    title: 'Already investing',
    line: 'Check that your funds work together: overlap, benchmarks, costs and fit to your goals.',
    links: [{ label: 'Get a portfolio review', href: '/invest/portfolio-review/' }],
    facts: [
      { label: 'Product', value: mutualFunds.intro },
      { label: 'Main risk', value: mutualFunds.mainRisk },
    ],
  },
  {
    title: 'Starting out',
    line: 'Your goals first, with help choosing mutual funds and setting up your investments.',
    links: [{ label: 'Start with mutual funds', href: '/invest/start-investing-mutual-funds/' }],
    facts: [
      { label: 'Minimum', value: mutualFunds.minimum },
      { label: 'Main risk', value: mutualFunds.mainRisk },
    ],
  },
  {
    title: 'Beyond mutual funds',
    line: 'Different strategies through SIFs, or US dollar assets through GIFT City funds.',
    links: [
      { label: 'SIFs', href: '/invest/sif/' },
      { label: 'GIFT City funds', href: '/invest/gift-city-funds/' },
    ],
    facts: [
      { label: 'SIF minimum', value: sif.minimum },
      { label: 'SIF main risk', value: sif.mainRisk },
      { label: 'GIFT City minimum', value: giftCity.minimum },
      { label: 'GIFT City main risk', value: giftCity.mainRisk },
    ],
  },
];
