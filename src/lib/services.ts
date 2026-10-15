/**
 * The four Invest with support services: one source for the homepage cards
 * and the stage names in the /invest/ journey.
 *
 * The homepage shows each service with the problem it solves and three short
 * bullets (`ServiceCard`). /invest/ uses the titles as journey stage names,
 * so both pages use the same word for the same service.
 *
 * @example
 * import { services } from '../lib/services';
 * {services.map((service) => <ServiceCard {...service} />)}
 */

export interface Service {
  /** Two-digit order, shown inline before the title: the services are a sequence */
  number: string;
  title: string;
  /** SVG inner markup on a 24×24 stroke grid, shown in the problem strip */
  icon: string;
  /** The client's problem, in their words (homepage strip) */
  problem: string;
  /** Three short bullets for the homepage card */
  bullets: string[];
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Portfolio review',
    icon: '<path d="M3 3l18 18"/><path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.6 6.6A17 17 0 0 0 2 12s3.5 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    problem: 'Not sure your investments suit your goals, or how they perform?',
    // The review starts with the person, then the funds they hold (if any),
    // so it also works for a first-time investor.
    bullets: [
      'Your goals, time frame and risk profile',
      'Your existing funds, if any: suitability, performance, overlap and costs',
      'A short brief before you decide anything',
    ],
  },
  {
    number: '02',
    title: 'Fund curation',
    icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    problem: 'Thousands of funds, and no clear way to know which suit you.',
    bullets: [
      'A shortlist that suits your goals and risk profile',
      'The reasons and costs for each fund, with our commission in writing',
      'For your first SIP or an existing portfolio',
    ],
  },
  {
    number: '03',
    title: 'Execution',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    problem: 'KYC, forms and switches take time, so decisions wait.',
    bullets: [
      'We do the setup, from KYC to each transaction',
      'You approve every transaction by OTP',
      'Your money goes directly to the fund house',
    ],
  },
  {
    number: '04',
    title: 'Ongoing reviews',
    icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    problem: 'No one follows up when markets rise or fall.',
    bullets: [
      'Reviews against benchmarks at regular intervals',
      'Help with rebalancing, SIP changes and redemptions',
      'Someone to talk to when markets move',
    ],
  },
];
