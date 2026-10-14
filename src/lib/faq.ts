/**
 * Questions a prospect asks before a first call, shown on /invest/#faq.
 *
 * Answers were approved by the owner on 2026-10-14. The direct vs regular
 * comparison lives here only: the homepage fee line stays short and links to
 * this list. Keep answers factual, name no fund, and never play down the
 * regular plan's higher cost.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export const investFaq: FaqItem[] = [
  {
    question: 'Do I need to move my existing funds?',
    answer: 'No. We review what you hold, and you decide what to keep. Nothing moves unless you approve it.',
  },
  {
    question: 'What is the difference between a direct plan and a regular plan?',
    answer: 'Each fund is sold in two versions. You buy a direct plan on your own, with no help to choose or review. You buy a regular plan through a distributor like us. It has a higher yearly expense ratio, and our commission comes from that difference. The fund and its investments are the same in both.',
  },
  {
    question: 'I invest in direct plans. Can you still help?',
    answer: 'Yes, we review them on the call. Investments through us are in regular plans, which cost more each year. We show you that difference before you decide.',
  },
  {
    question: 'Is there a minimum amount?',
    answer: 'No minimum for mutual funds. SIFs start at ₹10 lakh.',
  },
  {
    question: 'What happens after the call?',
    answer: 'For a full review, we ask for your holding details after the call. Then we send you a short brief.',
  },
  {
    question: 'Can I stop at any time?',
    answer: 'Yes. Your investments stay in your name with each fund house.',
  },
];
