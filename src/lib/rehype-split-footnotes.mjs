import { toHtml } from 'hast-util-to-html';

const REPORTS_PATH = 'src/content/reports/';
const NOTES_MARKER = /^<!--\s*notes\s*-->$/i;

/**
 * Lift a report's footnotes out of the rendered body so ArticleLayout can place
 * the service invite between the article and its notes. The footnotes HTML is
 * handed over as `remarkPluginFrontmatter.footnotesHtml`; footnote links keep
 * working because both halves render on the same page.
 *
 * The same goes for an optional `<!-- notes -->` marker: everything after it
 * (questions, sources, method, limits) is lifted out as
 * `remarkPluginFrontmatter.notesHtml` and placed after the service invite, so
 * the story is not broken by notes. One marker per report.
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
    const frontmatter = (file.data.astro ??= {}).frontmatter ??= {};
    if (index !== -1) {
      const [footnotes] = tree.children.splice(index, 1);
      frontmatter.footnotesHtml = toHtml(footnotes);
    }

    const markers = tree.children
      .map((node, i) => (node.type === 'raw' && NOTES_MARKER.test(node.value.trim()) ? i : -1))
      .filter((i) => i !== -1);
    if (markers.length > 1) {
      throw new Error(`${normalizedPath}: use at most one <!-- notes --> marker.`);
    }
    if (markers.length === 1) {
      const notes = tree.children.splice(markers[0]).slice(1);
      frontmatter.notesHtml = toHtml({ type: 'root', children: notes }, { allowDangerousHtml: true });
    }
  };
}
