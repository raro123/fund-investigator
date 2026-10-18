/**
 * The Invest with support services: one source for the homepage problems and
 * solutions, and the stage names in the /invest/ journey.
 *
 * /invest/ walks through the four services as journey stages (`services`).
 * The homepage groups them into three case files, one per client problem
 * (`homeServices`): execution and ongoing reviews share a file, because the
 * client meets them as one promise. Titles come from `services`, so both pages
 * use the same word for the same service.
 *
 * @example
 * import { homeServices } from '../lib/services';
 * {homeServices.map((service) => <li data-reveal={0}><CaseFile {...service} /></li>)}
 */

export interface Service {
  title: string;
}

/** The four services, in journey order (/invest/ stages 3–6). */
export const services: Service[] = [
  { title: 'Portfolio review' },
  { title: 'Fund curation' },
  { title: 'Execution' },
  { title: 'Ongoing reviews' },
];

const [review, curation, execution, ongoing] = services;

export interface HomeService {
  title: string;
  /** The client's problem, in the first person, as they would say it (homepage case files).
   *  Their words, not ours: no "overlap", "benchmark" or "rebalancing". */
  problem: string;
  /** The words in `problem` to mark with the highlighter: the heart of the problem */
  mark: string;
  /** Three short bullets: what the client gets */
  bullets: string[];
}

export const homeServices: HomeService[] = [
  {
    title: review.title,
    problem: "I've bought funds over the years. Now I'm not sure they're right for me.",
    mark: "not sure they're right for me",
    // The review starts with the person, then the funds they hold (if any),
    // so it also works for a first-time investor.
    bullets: [
      'Your goals, time frame and risk profile',
      'Your existing funds, if any: suitability, performance, overlap and costs',
      'A short brief before you decide anything',
    ],
  },
  {
    title: curation.title,
    // The first-time investor's problem: the start page's words ("I have savings and want to start investing").
    problem: "I have some savings and want to start investing, but I don't know where to begin.",
    mark: "I don't know where to begin",
    bullets: [
      'A shortlist that suits your goals and risk profile',
      'The reasons and costs for each fund, with our commission in writing',
      'Help with your first SIP or lump sum, step by step',
    ],
  },
  {
    title: `${execution.title} and ${ongoing.title.toLowerCase()}`,
    // Three moments in one problem: life changes, market moves, day-to-day admin.
    // The bullets answer them in the same order. "Admin", not "paperwork": most of it is online.
    problem: "I'd like a helping hand when my life changes, when markets move, and with the day-to-day admin.",
    mark: 'a helping hand',
    bullets: [
      'Changes to your SIPs and funds when your life changes',
      'Regular reviews, and someone to talk to when markets move',
      'We handle the setup, from KYC to each transaction. You approve each one by OTP',
    ],
  },
];

// A mark must be part of its problem, or the highlighter silently disappears.
for (const service of homeServices) {
  if (!service.problem.includes(service.mark)) {
    throw new Error(`homeServices "${service.title}": mark "${service.mark}" is not in its problem`);
  }
}
