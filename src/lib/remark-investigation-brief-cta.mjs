const REPORTS_PATH = 'src/content/reports/';
const TAKEAWAYS_HEADING = 'key takeaways';

function nodeText(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value ?? '';
  if (!Array.isArray(node.children)) return '';
  return node.children.map(nodeText).join('');
}

function containsSubscribeLink(node) {
  if (node.type === 'link' && node.url === '/subscribe') return true;
  return Array.isArray(node.children) && node.children.some(containsSubscribeLink);
}

function ctaNode() {
  return {
    type: 'paragraph',
    children: [
      {
        type: 'emphasis',
        children: [
          {
            type: 'text',
            value: 'Get notified when we publish new fund research or update an existing investigation. ',
          },
          {
            type: 'link',
            url: '/subscribe',
            title: null,
            children: [{ type: 'text', value: 'Subscribe for Investigation Briefs' }],
          },
          { type: 'text', value: '.' },
        ],
      },
    ],
  };
}

/**
 * Validate the raw Markdown body after Astro has resolved typed lifecycle data.
 * This runs from the report route, where throwing reliably stops the build.
 */
export function validateCurrentReportTakeaways(source, reportId) {
  const heading = /^## Key takeaways\s*$/m.exec(source);
  if (!heading) {
    throw new Error(`${reportId}: add an exact \`## Key takeaways\` heading.`);
  }

  const sectionStart = heading.index + heading[0].length;
  const nextHeading = /^##\s+/m.exec(source.slice(sectionStart));
  const sectionEnd = nextHeading ? sectionStart + nextHeading.index : source.length;
  const section = source.slice(sectionStart, sectionEnd);

  if (section.includes('](/subscribe)')) {
    throw new Error(`${reportId}: remove the manual \`/subscribe\` link; it is injected automatically.`);
  }
}

/**
 * Inject the skimmer subscription prompt after a report's Key Takeaways section.
 * Missing headings and manual duplicates are validated after lifecycle data is typed.
 */
export default function remarkInvestigationBriefCta() {
  return (tree, file) => {
    const normalizedPath = file.path?.replaceAll('\\', '/') ?? '';
    if (!normalizedPath.includes(REPORTS_PATH)) return;

    const headingIndex = tree.children.findIndex(
      (node) =>
        node.type === 'heading' &&
        node.depth === 2 &&
        nodeText(node).trim().toLowerCase() === TAKEAWAYS_HEADING
    );

    if (headingIndex === -1) return;

    const nextHeadingOffset = tree.children
      .slice(headingIndex + 1)
      .findIndex((node) => node.type === 'heading' && node.depth === 2);
    const sectionEnd = nextHeadingOffset === -1
      ? tree.children.length
      : headingIndex + 1 + nextHeadingOffset;

    const sectionNodes = tree.children.slice(headingIndex + 1, sectionEnd);
    if (sectionNodes.some(containsSubscribeLink)) return;

    tree.children.splice(sectionEnd, 0, ctaNode());
  };
}
