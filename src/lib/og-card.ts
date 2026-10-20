/**
 * Build-time social cards (Open Graph images), drawn with satori and encoded as JPEG.
 *
 * One card design for reports and static pages, so every shared link looks like
 * the same brand. JPEG, not WebP: social platforms do not reliably show WebP.
 * 1200×675 (16:9) meets the Google Discover minimum width.
 *
 * @example
 * // src/pages/og/pages/[page].jpg.ts
 * return renderOgCard({ eyebrow: 'Invest with support', title: '…', footerLeft: '…', footerRight: '…' });
 */

import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { ARN, TAGLINE } from './distributor';

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 675;

// Read from the project root: the build runs there, and bundling moves this
// module, so an import.meta.url-relative path would break.
const fontFile = (weight: 400 | 700) => fs.readFileSync(
  path.resolve(`node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`),
);
const regularFont = fontFile(400);
const boldFont = fontFile(700);

// Satori cannot read Tailwind classes, so the card repeats the fi-* token values.
const colors = {
  background: '#101c2b',
  ink: '#f8fafc',
  gold: '#e8b84a',
  eyebrow: '#9caec3',
  rule: '#32445c',
  footer: '#b7c3d1',
};

export interface OgCardInput {
  /** Small uppercase line above the title (category or section name). */
  eyebrow: string;
  title: string;
  footerLeft: string;
  footerRight: string;
}

const box = (style: Record<string, unknown>, children: unknown) => ({
  type: 'div',
  props: { style: { display: 'flex', ...style }, children },
});

/** Renders the card and returns it as a cacheable JPEG response for a static endpoint. */
export const renderOgCard = async ({ eyebrow, title, footerLeft, footerRight }: OgCardInput): Promise<Response> => {
  const card = box({
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: `${OG_WIDTH}px`,
    height: `${OG_HEIGHT}px`,
    padding: '72px',
    backgroundColor: colors.background,
    color: colors.ink,
    fontFamily: 'Inter',
  }, [
    box({ alignItems: 'center', color: colors.gold, fontSize: '28px', fontWeight: 700, letterSpacing: '5px' }, 'FUND INVESTIGATOR'),
    box({ flexDirection: 'column', maxWidth: '1030px', marginTop: '48px', marginBottom: '48px' }, [
      box({
        color: colors.eyebrow,
        fontSize: '24px',
        fontWeight: 700,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        marginBottom: '24px',
      }, eyebrow),
      box({ fontSize: '58px', lineHeight: 1.12, fontWeight: 700 }, title),
    ]),
    box({
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      borderTop: `2px solid ${colors.rule}`,
      paddingTop: '24px',
      color: colors.footer,
      fontSize: '24px',
    }, [box({}, footerLeft), box({}, footerRight)]),
  ]);

  const svg = await satori(card as Parameters<typeof satori>[0], {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: 'Inter', data: regularFont, weight: 400, style: 'normal' },
      { name: 'Inter', data: boldFont, weight: 700, style: 'normal' },
    ],
  });
  const jpg = await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer();

  return new Response(new Uint8Array(jpg), {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

/**
 * Cards for the static pages people share. The title reuses each page's H1, so
 * the card makes no claim the page does not. Legal pages keep the default image.
 */
export const OG_PAGES = {
  home: { eyebrow: 'Mutual funds · SIFs · GIFT City funds', title: 'We investigate, so you can invest.' },
  about: { eyebrow: 'About', title: 'Why Fund Investigator exists' },
  invest: { eyebrow: 'Invest with support', title: 'We do the investigation. You make the call.' },
  reports: { eyebrow: 'Research and guides', title: 'Mutual fund research and guides' },
  subscribe: { eyebrow: 'Newsletter', title: 'New guides and investigations, by email' },
} as const satisfies Record<string, { eyebrow: string; title: string }>;

export type OgPageId = keyof typeof OG_PAGES;

/** AMFI requires the SIF tagline and ARN in all communication, so every page card carries them. */
export const OG_PAGE_FOOTER = { footerLeft: TAGLINE, footerRight: ARN };

export const pageOgImagePath = (page: OgPageId): string => `/og/pages/${page}.jpg`;
