/**
 * The Invest with support services: one source for the homepage problems and
 * solutions, and the stage names in the /invest/ journey.
 *
 * /invest/ walks through the four services as journey stages (`services`).
 * The homepage groups them into three case files, one per client problem
 * (`homeServices`): execution and ongoing reviews share a file, because the
 * client meets them as one promise, under the plain title "Ongoing support".
 * The other two titles come from `services`, so both pages use the same word
 * for the same service.
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
  { title: 'Fund selection' },
  { title: 'Execution' },
  { title: 'Ongoing reviews' },
];

const [review, selection] = services;

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
      'Your existing funds (if any): performance, fit and costs',
      'A clear brief before you decide',
    ],
  },
  {
    title: selection.title,
    // The first-time investor's problem: the start page's words ("I have savings and want to start investing").
    problem: "I have some savings and want to start investing, but I don't know where to begin.",
    mark: "I don't know where to begin",
    bullets: [
      'A shortlist that suits your goals and risk profile',
      // The commission is part of each fund's cost; the fee memo under the case
      // files explains it in writing, so it is not repeated here.
      'Why each fund and what it costs',
      'Help completing your investment, step by step',
    ],
  },
  {
    // Execution and ongoing reviews in one file (they keep their own names on /invest/).
    title: 'Ongoing support',
    // Three moments in one problem: life changes, market moves, day-to-day admin.
    // The bullets answer them in the same order. "Admin", not "paperwork": most of it is online.
    // No approval method named (OTP, email link, e-mandate): just "with your approval".
    problem: "I'd like a helping hand when my life changes, when markets move, and with the day-to-day admin.",
    mark: 'a helping hand',
    bullets: [
      'Your investments updated as your life changes',
      'Regular reviews, and someone to guide you when markets move',
      'We handle the admin, from KYC to each transaction, with your approval',
    ],
  },
];

// A mark must be part of its problem, or the highlighter silently disappears.
for (const service of homeServices) {
  if (!service.problem.includes(service.mark)) {
    throw new Error(`homeServices "${service.title}": mark "${service.mark}" is not in its problem`);
  }
}
