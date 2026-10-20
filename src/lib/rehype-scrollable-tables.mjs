const REPORTS_PATH = 'src/content/reports/';

/** Keep Markdown tables semantic and scrollable even before JavaScript loads. */
export default function rehypeScrollableTables() {
  return (tree, file) => {
    const normalizedPath = file.path?.replaceAll('\\', '/') ?? '';
    if (!normalizedPath.includes(REPORTS_PATH)) return;

    let tableNumber = 0;

    const wrapTables = (parent) => {
      if (!parent.children) return;

      parent.children = parent.children.map((node) => {
        if (node.type !== 'element' || node.tagName !== 'table') {
          wrapTables(node);
          return node;
        }

        tableNumber += 1;
        const headerRow = node.children.find((child) => child.tagName === 'thead')?.children
          .find((child) => child.tagName === 'tr');
        if (headerRow?.children.filter((child) => child.tagName === 'th').length >= 4) {
          node.properties ??= {};
          node.properties.dataWideTable = '';
        }
        const hintId = `article-table-hint-${tableNumber}`;

        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['article-table'] },
          children: [
            {
              type: 'element',
              tagName: 'p',
              properties: {
                id: hintId,
                className: ['article-table-hint'],
                hidden: true,
              },
              children: [{ type: 'text', value: 'Swipe to see all columns, or focus the table and use the arrow keys.' }],
            },
            {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['article-table-scroll'],
                role: 'region',
                ariaLabel: `Table ${tableNumber}`,
                tabIndex: 0,
                dataArticleTable: '',
                dataTableHint: hintId,
              },
              children: [node],
            },
          ],
        };
      });
    };

    wrapTables(tree);
  };
}
