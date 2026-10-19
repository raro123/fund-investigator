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

/** One shared answer by its question, so a landing page reuses it word for word. */
function sharedAnswer(question: string): FaqItem {
  const item = investFaq.find((faq) => faq.question === question);
  if (!item) throw new Error(`FAQ not found: ${question}`);
  return item;
}

/**
 * /invest/portfolio-review/: questions an existing investor asks first, then the
 * shared answers on costs and money. The first two answers are drafts for the
 * owner to check (S55).
 */
export const reviewFaq: FaqItem[] = [
  {
    question: 'What do I need to share?',
    answer: 'For the call, your goals and a rough idea of what you hold. For the full review, we ask for your Consolidated Account Statement (CAS) after the call. It lists every fund you hold, across fund houses, and we help you download it.',
  },
  {
    question: 'Will you ask me to sell my funds?',
    answer: 'Not by default. Selling can mean tax and exit loads, so fewer changes are often better. The brief says what to keep, what to watch and what to change, with the reasons. You decide, and nothing moves without your approval.',
  },
  sharedAnswer('What is the difference between a direct plan and a regular plan?'),
  sharedAnswer('Do you choose funds by the commission they pay you?'),
  sharedAnswer('Who holds my money?'),
  sharedAnswer('Can I stop at any time?'),
];

/**
 * /invest/start-investing-mutual-funds/: what a first-time investor with savings asks.
 * New answers are drafts for the owner to check (S56).
 */
export const startFaq: FaqItem[] = [
  {
    question: 'How much do I need to start?',
    answer: 'Each mutual fund sets its own minimum for SIPs and lump sums. We check the minimums for the funds that suit you. The ₹15 lakh in the sample brief is only an example, not a minimum for starting.',
  },
  {
    question: 'What if I need some of the money soon?',
    answer: 'Some mutual funds are built for short periods, such as overnight and liquid funds. They carry lower risk than equity funds, but no fund is free of risk. We match each part of your money to when you need it.',
  },
  {
    question: 'What if markets fall after I invest?',
    answer: 'Markets fall at times, and equity funds can fall sharply in the short term. That is why we discuss your time frame, risk profile and emergency reserve before choosing funds. Investing in stages may suit your circumstances, but it does not remove market risk. You can talk to us before deciding what to do.',
  },
  {
    question: 'SIP or lump sum?',
    answer: 'It depends on how much you have and when you need it. A monthly SIP suits money you save from your income. A large amount can move in stages, for example through a systematic transfer plan (STP). We explain the options on the call.',
  },
  {
    question: 'Do I need a demat account?',
    answer: 'No. Mutual fund units are held in your name with each fund house. You need KYC, and we help you complete it.',
  },
  {
    question: 'Do I need to break my FDs?',
    answer: 'No. We look at your goals and when you need the money, then you decide how much, if any, goes into mutual funds, and when. FDs can remain part of your savings.',
  },
  sharedAnswer('What is the difference between a direct plan and a regular plan?'),
  sharedAnswer('Who holds my money?'),
];

/**
 * /invest/sif/: what an experienced investor asks before a SIF. New answers
 * are drafts for the owner to check against the SIF promotion rules (S56, log item 110).
 */
export const sifFaq: FaqItem[] = [
  {
    question: 'How is a SIF different from a mutual fund?',
    answer: 'A SIF is run by a mutual fund house under its own SEBI rules. It can use strategies a mutual fund cannot, such as taking limited short positions through derivatives. The minimum is higher, and some SIFs limit when you can redeem.',
  },
  {
    question: 'Is the ₹10 lakh minimum per SIF?',
    answer: 'No. It applies per investor across all the SIFs of one fund house.',
  },
  {
    question: 'Can I take my money out at any time?',
    answer: 'It depends on the strategy. Some SIFs allow redemptions only on set days, or need notice. We show you the rules of each SIF before you invest.',
  },
  {
    question: 'Should I sell my mutual funds to invest in a SIF?',
    answer: 'Not by default. We start from your whole portfolio. A SIF, if it suits you, is usually a part of it, not a replacement. Selling can also mean tax and exit loads.',
  },
  sharedAnswer('Do you choose funds by the commission they pay you?'),
  sharedAnswer('Who holds my money?'),
];

/**
 * /invest/gift-city-funds/: what a resident or NRI asks before investing in
 * US dollars. New answers are drafts for the owner to check (S56, log item 110). Tax
 * answers stay general and point to the client's tax adviser.
 */
export const giftCityFaq: FaqItem[] = [
  sharedAnswer('Who can invest in GIFT City funds?'),
  {
    question: 'How much can I send under the LRS?',
    answer: 'Up to USD 250,000 per person in a financial year, across all your uses of the Liberalised Remittance Scheme (LRS), such as travel and studies abroad.',
  },
  {
    question: 'Is my money leaving India?',
    answer: 'The fund is based in GIFT City, India\'s International Financial Services Centre (IFSC). It holds your money in US dollars, and it may invest in markets outside India.',
  },
  {
    question: 'How are GIFT City funds taxed?',
    answer: 'The rules differ from rupee funds, and tax collected at source (TCS) can apply when you send money under the LRS. We explain the points that apply to you before you decide. Please confirm them with your tax adviser.',
  },
  sharedAnswer('Do you choose funds by the commission they pay you?'),
  sharedAnswer('Who holds my money?'),
];

/** Residence-specific setup questions stay visibly separate on the GIFT City page. */
export const giftCityFaqGroups: FaqGroup[] = [
  {
    title: 'Resident in India',
    items: [giftCityFaq[1], giftCityFaq[3]],
  },
  {
    title: 'NRI',
    items: [
      {
        question: 'Can I invest from my country of residence?',
        answer: 'Eligibility depends on your country of residence and the selected fund. We confirm the fund\'s requirements, documents and funding route before you decide.',
      },
      {
        question: 'Do I use the resident LRS route?',
        answer: 'The LRS guidance on this page is for residents in India. For NRIs, we confirm the funding route for the selected fund and your country of residence. Confirm your tax and reporting obligations with your tax adviser.',
      },
    ],
  },
  {
    title: 'For both routes',
    items: [giftCityFaq[2], giftCityFaq[4], giftCityFaq[5]],
  },
];
