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
        answer: 'Each mutual fund sets its own minimum, and most are small. SIFs start at ₹10 lakh. GIFT City funds set their minimum in US dollars.',
      },
    ],
  },
  {
    title: 'Products',
    items: [
      {
        question: 'What is a SIF?',
        answer: 'A Specialised Investment Fund. It is a SEBI category that can use strategies a mutual fund cannot, such as long-short. The minimum is ₹10 lakh, and the risks are higher. We explain them on the call.',
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
        answer: 'Each fund is sold in two versions. You buy a direct plan on your own, with no help to choose or review. You buy a regular plan through a distributor like us. It has a higher yearly expense ratio, and our commission comes from that difference. The fund and its investments are the same in both.',
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
        answer: 'For a full review, we ask for your Consolidated Account Statement (CAS) after the call. We help you download it. Then we send you a short brief.',
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
