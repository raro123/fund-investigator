/**
 * Mid-article subscribe box (article template, backlog T-37).
 *
 * The writer puts the marker `<!-- subscribe -->` on its own line in a report,
 * right after the main finding. The build swaps the marker for the subscribe
 * box. One marker per report; no marker, no box. The text is fixed here so it
 * is the same on every article (fund_distribution_business
 * content/article_template.md §1). Change it only with the owner's yes.
 */
const REPORTS_PATH = 'src/content/reports/';
const SUBSCRIBE_PATH = '/subscribe/';
const MARKER = /^<!--\s*subscribe\s*-->$/i;
const MARKER_LINE = /^<!--\s*subscribe\s*-->\s*$/gim;

export const SUBSCRIBE_BOX = {
  heading: 'Get the next evidence piece by email',
  line: 'One short note when we publish a new evidence piece. No spam. Unsubscribe any time.',
  button: 'Subscribe',
  placement: 'article_mid',
};

/** Report slug from the Markdown file path (src/content/reports/<slug>.md). */
function reportSlug(path) {
  const match = /src\/content\/reports\/([^/]+)\.mdx?$/.exec(path);
  return match ? match[1] : '';
}

function subscribeBox(slug) {
  return {
    type: 'subscribeBox',
    data: {
      hName: 'aside',
      hProperties: {
        className: ['article-subscribe-box', 'not-prose'],
        ariaLabel: 'New evidence pieces by email',
      },
    },
    children: [
      {
        type: 'paragraph',
        data: { hProperties: { className: ['article-subscribe-box-heading'] } },
        children: [{ type: 'strong', children: [{ type: 'text', value: SUBSCRIBE_BOX.heading }] }],
      },
      {
        type: 'paragraph',
        data: { hProperties: { className: ['article-subscribe-box-line'] } },
        children: [{ type: 'text', value: SUBSCRIBE_BOX.line }],
      },
      {
        type: 'paragraph',
        children: [{
          type: 'link',
          url: SUBSCRIBE_PATH,
          title: null,
          data: {
            hProperties: {
              className: ['article-subscribe-box-button'],
              dataTrack: 'subscribe_click',
              dataPlacement: SUBSCRIBE_BOX.placement,
              ...(slug ? { dataReport: slug } : {}),
            },
          },
          children: [{ type: 'text', value: SUBSCRIBE_BOX.button }],
        }],
      },
    ],
  };
}

/**
 * Check the raw Markdown body. Runs from the report route, where a throw stops
 * the build: more than one marker is a writing error.
 */
export function validateSubscribeMarker(source, reportId) {
  const count = (source.match(MARKER_LINE) ?? []).length;
  if (count > 1) {
    throw new Error(`${reportId}: use one \`<!-- subscribe -->\` marker, not ${count}.`);
  }
}

/** Remove the marker from text copies of a report (the .md endpoint). */
export const stripSubscribeMarker = (source) => source.replace(MARKER_LINE, '');

/** Swap the `<!-- subscribe -->` marker for the subscribe box. */
export default function remarkInvestigationBriefCta() {
  return (tree, file) => {
    const normalizedPath = file.path?.replaceAll('\\', '/') ?? '';
    if (!normalizedPath.includes(REPORTS_PATH)) return;

    const index = tree.children.findIndex(
      (node) => node.type === 'html' && MARKER.test(node.value.trim()),
    );
    if (index === -1) return;
    tree.children.splice(index, 1, subscribeBox(reportSlug(normalizedPath)));
  };
}
