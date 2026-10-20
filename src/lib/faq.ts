/**
 * Questions a prospect asks before a first call, shown on /invest/#faq in
 * groups. `investFaq` is the same list without groups.
 *
 * The 2026-10-14 answers were approved by the owner; questions added on
 * 2026-10-15 (products, fees, reviews, money, commission) are drafts for the
 * owner to check. The direct vs regular comparison lives here only: the homepage fee
 * line stays short and links to this list. Keep answers factual, name no
 * fund, and never play down the regular plan's higher cost.
 *
 * @example
 * import { investFaqGroups } from '../lib/faq';
 * {investFaqGroups.map((group) => <FaqList items={group.items} />)}
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const investFaqGroups: FaqGroup[] = [
  {
    title: 'Before the call',
    items: [
      {
        question: 'Do I need to move my existing funds?',
        answer: 'No. We review what you hold, and you decide what to keep. Nothing moves unless you approve it.',
      },
      {
        question: 'Is there a minimum amount?',
        answer: 'Each mutual fund sets its own minimum, and most are small. A SIF needs at least ₹10 lakh in total from each investor (PAN) across its strategies; see "What is a SIF?" below. GIFT City funds set their minimum in US dollars.',
      },
    ],
  },
  {
    title: 'Products',
    items: [
      {
        // Compliance's conditional draft (COM-015), pending its source-backed clearance.
        question: 'What is a SIF?',
        answer: 'A Specialised Investment Fund (SIF) is a SEBI category offered by mutual fund houses. SIFs use investment strategies that may be more complex and carry relatively higher risks than traditional mutual funds; risks vary by strategy. The minimum investment is an aggregate ₹10 lakh at PAN level across all investment strategies of the particular SIF. Investments in regular mutual-fund schemes, including schemes of the same AMC, do not count towards this threshold. Accredited investors are exempt. Review the relevant strategy documents, eligibility conditions and risks before investing.',
      },
      {
        question: 'Who can invest in GIFT City funds?',
        answer: 'Residents of India invest under the Liberalised Remittance Scheme (LRS), in US dollars. NRIs can also invest. We explain the tax and reporting rules before you decide.',
      },
    ],
  },
  {
    title: 'Costs',
    items: [
      {
        question: 'What is the difference between a direct plan and a regular plan?',
        answer: 'A direct plan has a lower yearly expense ratio because it excludes distributor commission. You can manage it yourself or separately pay a SEBI-registered Investment Adviser for help. A regular plan is bought through a distributor like us and has a higher expense ratio that includes distributor commission. The fund and its investments are the same in both, but the expense ratios and NAVs differ.',
      },
      {
        question: 'Do you choose funds by the commission they pay you?',
        answer: 'No. We shortlist funds by fit to your goals and risk profile. You get our commission on each fund, and on the alternatives we considered, in writing before you decide.',
      },
    ],
  },
  {
    title: 'After the call',
    items: [
      {
        question: 'What happens after the call?',
        answer: 'If you want to go ahead, we start with fact-finding: your goals, your time frame, a risk profile and the investments you hold (we help you download your Consolidated Account Statement). Then we investigate and walk you through a clear brief before you decide anything.',
      },
      {
        question: 'How often do you review my funds?',
        answer: 'We agree how often on the call, based on your portfolio. You can also ask for a review when your plans change.',
      },
      {
        question: 'Who holds my money?',
        answer: 'You pay the fund house directly, and the units are in your name. We never receive your money.',
      },
      {
        question: 'Can I stop at any time?',
        answer: 'Yes. Your investments stay in your name with each fund house.',
      },
    ],
  },
];

export const investFaq: FaqItem[] = investFaqGroups.flatMap((group) => group.items);
