import { toHtml } from 'hast-util-to-html';

const REPORTS_PATH = 'src/content/reports/';

/**
 * Lift a report's footnotes out of the rendered body so ArticleLayout can place
 * the service invite between the article and its notes. The footnotes HTML is
 * handed over as `remarkPluginFrontmatter.footnotesHtml`; footnote links keep
 * working because both halves render on the same page.
 *
 * Only the site build uses this plugin. The RSS feed renders with its own
 * processor, so feed items keep their footnotes inline.
 */
export default function rehypeSplitFootnotes() {
  return (tree, file) => {
    const normalizedPath = file.path?.replaceAll('\\', '/') ?? '';
    if (!normalizedPath.includes(REPORTS_PATH)) return;

    const index = tree.children.findIndex(
      (node) => node.type === 'element' && node.properties?.dataFootnotes !== undefined
    );
    if (index === -1) return;

    const [footnotes] = tree.children.splice(index, 1);
    const frontmatter = (file.data.astro ??= {}).frontmatter ??= {};
    frontmatter.footnotesHtml = toHtml(footnotes);
  };
}
