/**
 * Who we help → how we help: one source for the homepage and /invest/.
 *
 * The homepage shows the short version (tag + summary); /invest/ shows the
 * finalised long copy (tag + title + body). Keeping both in one list stops the
 * two pages drifting apart when a pair is reworded.
 *
 * @example
 * import { whoWeHelp, shortPairs, fullPairs } from '../lib/who-we-help';
 * <ProblemAnswer pairs={shortPairs} />   // homepage
 * <ProblemAnswer pairs={fullPairs} />    // /invest/
 */
import type { ProblemAnswerSide } from '../components/ui/ProblemAnswer.astro';

interface Side {
  /** SVG inner markup on a 24×24 stroke grid */
  icon: string;
  /** Two- or three-word name for the problem or answer */
  tag: string;
  /** Finalised headline (long version) */
  title: string;
  /** Finalised body copy (long version) */
  body: string;
  /** One line, about 12 words (short version) */
  summary: string;
  /** Lead-in for the long version when `tag` and `title` are the same words */
  longTag?: string;
}

export const whoWeHelp: { problem: Side; answer: Side }[] = [
  {
    problem: {
      icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      tag: 'Too many choices',
      title: 'Looking to invest, but not sure how?',
      body: 'You want to invest, but there are thousands of funds. You do not know which of them suit your goals and your risk profile, or how to start.',
      summary: 'Thousands of funds, and no clear way to know which suit you.',
    },
    answer: {
      icon: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
      tag: 'Curated choice',
      title: 'Evidence-backed fund selection',
      body: 'We curate a shortlist that fits your portfolio and your risk profile. Our investigations make the risk, returns and costs of each fund clear before you choose.',
      summary: 'A shortlist that fits your goals and risk, with the evidence for each fund.',
    },
  },
  {
    problem: {
      icon: '<path d="M3 3l18 18"/><path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.2 3.8M6.6 6.6A17 17 0 0 0 2 12s3.5 6 10 6a9.6 9.6 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
      tag: 'Little clarity',
      title: 'Many funds, little clarity?',
      body: 'Your funds may hold the same stocks. You cannot easily tell how they perform, or how your money is spread across equity, debt and gold.',
      summary: 'Your funds may overlap, and you cannot easily tell how they perform.',
    },
    answer: {
      icon: '<path d="M21 12a9 9 0 1 1-9-9v9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/>',
      tag: 'Portfolio first',
      longTag: 'Clear picture',
      title: 'Portfolio first',
      body: 'Before any new fund, we review the ones you hold. You see how diversified you really are, and how each fund performs against a fair benchmark. Then you decide what to keep.',
      summary: 'We review the funds you hold before we suggest a new one.',
    },
  },
  {
    problem: {
      icon: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
      tag: 'Left alone',
      title: 'Invested, but alone when markets move?',
      body: 'No one follows up after you invest. When markets rise or fall, you have no one to look at the facts with before you act.',
      summary: 'No one follows up when markets rise or fall.',
    },
    answer: {
      icon: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
      tag: 'Ongoing support',
      title: 'Your investigator, from review to action',
      body: 'After you invest, we stay in touch and review your portfolio at regular intervals. When markets move or your plans change, we look at the facts together, and help you carry out what you decide.',
      summary: 'Regular reviews, and help to act when markets or your plans change.',
    },
  },
];

const toShort = ({ icon, tag, summary }: Side): ProblemAnswerSide => ({ icon, tag, body: summary });

// The long version shows the tag as a small lead-in above the finalised headline,
// so every card on /invest/ has the same three parts.
const toFull = ({ icon, tag, longTag, title, body }: Side): ProblemAnswerSide =>
  ({ icon, tag: longTag ?? tag, title, body });

export const shortPairs = whoWeHelp.map(({ problem, answer }) => ({ problem: toShort(problem), answer: toShort(answer) }));
export const fullPairs = whoWeHelp.map(({ problem, answer }) => ({ problem: toFull(problem), answer: toFull(answer) }));
