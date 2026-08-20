import fs from 'node:fs';
import satori from 'satori';
import sharp from 'sharp';
import { getCollection } from 'astro:content';

const regularFont = fs.readFileSync(
  new URL('../../../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff', import.meta.url),
);
const boldFont = fs.readFileSync(
  new URL('../../../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff', import.meta.url),
);

export async function getStaticPaths() {
  const reports = await getCollection('reports');

  return reports
    .filter((report) => !report.id.startsWith('_'))
    .map((report) => ({
      params: { slug: report.slug },
      props: { report },
    }));
}

export async function GET({ props }) {
  const { report } = props;
  const { title, category, date } = report.data;
  const dateLabel = new Intl.DateTimeFormat('en-IN', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));

  const card = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '1200px',
        height: '675px',
        padding: '72px',
        backgroundColor: '#101c2b',
        color: '#f8fafc',
        fontFamily: 'Inter',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              color: '#e8b84a',
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '5px',
            },
            children: 'FUND INVESTIGATOR',
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '1030px',
              marginTop: '48px',
              marginBottom: '48px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    color: '#9caec3',
                    fontSize: '24px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                  },
                  children: category,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontSize: '58px',
                    lineHeight: 1.12,
                    fontWeight: 700,
                  },
                  children: title,
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderTop: '2px solid #32445c',
              paddingTop: '24px',
              color: '#b7c3d1',
              fontSize: '24px',
            },
            children: [
              { type: 'div', props: { children: 'Benchmark-led fund research.' } },
              { type: 'div', props: { children: dateLabel } },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(card, {
    width: 1200,
    height: 675,
    fonts: [
      { name: 'Inter', data: regularFont, weight: 400, style: 'normal' },
      { name: 'Inter', data: boldFont, weight: 700, style: 'normal' },
    ],
  });
  const jpg = await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer();

  return new Response(jpg, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
