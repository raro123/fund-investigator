import { getCollection } from 'astro:content';
import { formatDate } from '../../../lib/format';
import { renderOgCard } from '../../../lib/og-card';

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
  const { title, category, date } = props.report.data;
  return renderOgCard({
    eyebrow: category,
    title,
    footerLeft: 'Benchmark-led fund research.',
    footerRight: formatDate(date, 'month'),
  });
}
