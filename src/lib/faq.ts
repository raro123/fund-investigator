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
        // GIFT City promotional copy: needs an explicit compliance PASS (rulebook H-08).
        // Risk lines in our words: IFSCA, not SEBI; market and currency risk (decision 23). T-06.
        question: 'Who can invest in GIFT City funds?',
        answer: 'Residents of India invest under the Liberalised Remittance Scheme (LRS), in US dollars. NRIs can also invest. GIFT City funds are regulated by the IFSCA, not by SEBI. They carry market risk and currency risk, and you can lose money. Read the offer documents before you invest. We explain the tax and reporting rules before you decide.',
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
        // "Working with you": the bare question reads as "I can redeem at any time" (R-13, R-15). T-06.
        question: 'Can I stop working with you at any time?',
        answer: 'Yes. Your investments stay in your name with each fund house.',
      },
    ],
  },
];

export const investFaq: FaqItem[] = investFaqGroups.flatMap((group) => group.items);

/** One shared answer by its question, so a service page reuses it word for word. */
function sharedAnswer(question: string): FaqItem {
  const item = investFaq.find((faq) => faq.question === question);
  if (!item) throw new Error(`FAQ not found: ${question}`);
  return item;
}

/**
 * /invest/portfolio-review/, rebuilt from the agreed demo (owner, 9 Nov 2026).
 * The five answers were locked one by one with the owner; copy them word for
 * word. Goal: clear the doubts that stop a reader from sending the WhatsApp
 * message. Never "free" about the review (R-17, H-03): "No separate fee from
 * you", with the commission in the same answer. Q2, Q3 and Q4 wait for the
 * weekly compliance review (Fri 13 Nov 2026) before release.
 * Q2 ends with "Our comparison explains when each one fits.", linked to K02,
 * once K02 is live: add it then (FaqList answers are plain text today).
 */
export const reviewFaq: FaqItem[] = [
  {
    question: 'Is the first call a sales call?',
    answer: 'No. It is a short conversation at a time that suits you. We introduce ourselves as an AMFI-registered mutual fund distributor and explain how we are paid. Then we ask about your goals and any concerns with your funds, and answer your questions. There is no pressure, and you decide if you want to go ahead.',
  },
  {
    question: 'Why do I need a mutual fund distributor?',
    answer: "You don't need one to invest. Apps and direct plans let you do it yourself, if you have the time and the knowledge. An AMFI-registered mutual fund distributor helps when you want someone to look at all your funds together, explain what the numbers mean and keep reviewing them as markets and your plans change. Our recommendations for clients come with the what, the why and the trade-offs. We are paid by the fund house through regular plans, which have higher expense ratios than direct plans. A SEBI-registered investment adviser is another route: you pay the adviser a fee and invest in direct plans on their advice.",
  },
  {
    question: 'Do I pay for a mutual fund portfolio review?',
    answer: 'No separate fee from you. On your request, Fund Investigator prepares your portfolio review and walks you through it. When you invest through us, the fund house pays us a commission from the fund\'s yearly expense ratio, and we give you the rates in writing before you invest. Your ongoing reviews come with no separate fee either.',
  },
  {
    question: 'Will you ask me to sell or move my funds?',
    answer: "Only when the analysis says so, and you decide based on our recommendations. We never ask you to sell a good fund to bring it to us. Any sale or purchase comes from the analysis, with the tax and exit load explained clearly. If you're happy with us, we may ask to become the distributor on your regular plans. There is no sale, so no tax and no exit load. A direct plan that fits your portfolio stays direct.",
  },
  {
    question: 'How do I check my mutual fund portfolio?',
    answer: 'Your investing app shows each fund and its value. A Consolidated Account Statement (CAS) from CAMS or KFintech lists all your funds in one place. To see if the portfolio works, check five things: how each fund has done against its stated benchmark index over several years, stock overlap, sector overlap, your mix of equity, debt and gold against your goals, and your total costs. A portfolio review from Fund Investigator checks all five and explains what they mean.',
  },
];

/**
 * /invest/sif/ (T-59, Phase 2 item C). SIF promotional copy: every change needs
 * the compliance officer's PASS (rulebook H-08). Copy v2.0, as for reviewFaq.
 */
export const sifFaq: FaqItem[] = [
  {
    question: 'How is a SIF different from a mutual fund?',
    answer: 'A SIF is run by a mutual fund house under SEBI rules for SIFs. It can use investment strategies that a mutual fund cannot, such as limited short positions through derivatives. The minimum is higher, and some SIF investment strategies limit when you can redeem. Because of this, a SIF carries relatively higher risk, and you can lose money.',
  },
  {
    question: 'Is the ₹10 lakh minimum per investment strategy?',
    answer: 'No. It applies per investor, across all the SIF investment strategies of one fund house (source: SEBI circular on Specialised Investment Funds, 27 February 2025).',
  },
  {
    question: 'Do I need a distributor to invest in a SIF?',
    answer: 'No. You can invest with the fund house directly. We earn a commission from the fund house when you invest through us, and we give you the rate in writing before you invest. We review your whole portfolio first and give you the risks and redemption terms in writing.',
  },
  {
    question: 'Can I take my money out at any time?',
    answer: 'It depends on the investment strategy. Some allow redemptions only on set days, or need notice. You must also keep at least ₹10 lakh in that fund house\'s SIF. A redemption that takes you below ₹10 lakh freezes your units, and they are sold after 30 days unless you top up. If market falls take you below ₹10 lakh, you can only redeem everything, not a part. Lock-ins and exit loads also depend on the strategy. We show you the redemption terms of each investment strategy before you invest.',
  },
  {
    question: 'Should I sell my mutual funds to invest in a SIF?',
    answer: 'Not by default. We start from your whole portfolio. If you invest in a SIF, it is usually one part of your portfolio, not a replacement for it. Selling can also mean tax and exit loads.',
  },
  sharedAnswer('Do you choose funds by the commission they pay you?'),
  sharedAnswer('Who holds my money?'),
];

/**
 * /invest/where-to-invest-lump-sum/ (T-59, Phase 2 item B, decision 87). The
 * first answer is new (copy v1.0); the next four are the approved start-investing
 * answers (v1.4, decision 28); the last two are the /invest/ answers, word for word.
 */
export const lumpSumFaq: FaqItem[] = [
  {
    question: 'Should I invest a lump sum at once or in stages?',
    answer: 'It depends on how much you have and when you need it. A large amount can move in stages, for example through a systematic transfer plan (STP). Each transfer is a sale of units, so tax and exit loads can apply. Investing in stages does not remove market risk. We explain the options on the call.',
  },
  {
    question: 'What if I need some of the money soon?',
    answer: 'Some mutual funds are built for short periods, such as overnight and liquid funds. They carry lower risk than equity funds, but every fund carries some risk. We match each part of your money to when you need it.',
  },
  {
    question: 'What if markets fall after I invest?',
    answer: 'Markets fall at times, and equity funds can fall sharply in the short term. That is why we discuss your time frame, risk profile and cash needs before we choose funds. We can discuss investing in stages, but it does not remove market risk. You can talk to us before you decide what to do.',
  },
  {
    question: 'Do I need to break my FDs?',
    answer: 'No. We look at your goals and when you need the money. Then you decide how much, if any, goes into mutual funds, and when. FDs can remain part of your savings.',
  },
  {
    question: 'Do I need a demat account?',
    answer: 'No. Mutual fund units are held in your name with each fund house. You need KYC, and we help you complete it.',
  },
  sharedAnswer('What is the difference between a direct plan and a regular plan?'),
  sharedAnswer('Who holds my money?'),
];
