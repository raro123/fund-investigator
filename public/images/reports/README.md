# Legacy Report Images

The existing files are retained for compatibility, but current report content does not reference
this directory. Do not add new report images here.

Store new charts and custom social cards in:

```text
src/assets/images/reports/<report-slug>/
```

Astro optimizes article images referenced with relative Markdown paths. Reports receive a generated
1200x675 social card by default; use the optional `seo.image` frontmatter override documented in
`docs/templates/report-template.md` only when a report needs a custom card.
