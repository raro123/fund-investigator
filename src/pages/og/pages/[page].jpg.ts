import { OG_PAGE_FOOTER, OG_PAGES, renderOgCard, type OgPageId } from '../../../lib/og-card';

export function getStaticPaths() {
  return Object.keys(OG_PAGES).map((page) => ({ params: { page } }));
}

export async function GET({ params }) {
  return renderOgCard({ ...OG_PAGES[params.page as OgPageId], ...OG_PAGE_FOOTER });
}
