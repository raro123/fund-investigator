# Held reports: approval-needed, not publishable

These reports are outside `src/content/reports/`, so the site does not build them:
no page, sitemap entry, feed item, OG image, llms.txt line, schema entry or
markdown endpoint.

Held under the website compliance review of 19 October 2026
(`fund_distribution_business/website_compliance_tasks.md`):

| Report | Task | To publish again |
|---|---|---|
| `hdfc-flexicap-performance.md` | COM-001 | Do not restore. Rewrite needed: the promotional framing is not cured by approval. |
| `ppfas-flexicap-performance.md` | COM-001 | Do not restore. Rewrite needed: the promotional framing is not cured by approval. |
| `five-checks-mutual-fund.md` | COM-002 | Written AMC approval for the exact version (body, charts, card copy), or a generic rewrite with no identifiable scheme. |
| `icici-largecap-five-checks.md` | COM-002 | Written AMC approval for the exact version, or a generic rewrite. COM-020 Sharpe wording if retained. |
| `ppfas-flexicap-five-checks.md` | COM-002 | Written AMC approval for the exact version, or a generic rewrite. COM-020 Sharpe wording if retained. |
| `mutual-fund-categories-explained.md` | COM-002, COM-014 | Remove or get approval for the four named examples; recast "If you want… Look at…" as characteristics and risks. |

To publish a cleared report, move it back to `src/content/reports/` (image paths
are relative and resolve the same from both folders) and record the approval in
the approval register.
