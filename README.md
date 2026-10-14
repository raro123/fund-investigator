# Fund Investigator

FundInvestigator.com — a distribution-led website for an AMFI-registered Mutual Fund Distributor.
Its main goal is booked first calls for the "Invest with support" service. Free investigations of Indian
mutual funds, and the Deepdive app for email subscribers, build authority.

## Architecture

**Hub + Spoke:**
- **Hub:** `fundinvestigator.com` (Marketing/Content) — static Astro site on Cloudflare Pages.
- **Spoke:** `deepdive.fundinvestigator.com` (Analytics tool) — Streamlit app on Railway, **separate codebase, not part of this repo**.

Subdomains separate the fast, SEO-optimized content layer from the compute-heavy application layer.

## Tech Stack

- **Astro v5** (SSG mode, zero-JS output by default)
- **Tailwind CSS v3.4** — utility-first, custom `fi-*` design tokens (see `docs/style_spec.md`)
- **TypeScript** — typed components and content schema
- **Content:** Markdown + YAML frontmatter, via Astro content collections (`src/content.config.ts`)
- **Cloudflare Pages** — hosting/deployment
- **Email/Newsletter:** Substack — subscription capture and distribution (`src/lib/substack.ts`). Full investigations stay on this site; Substack carries teasers, summaries, and newsletters.
- **Analytics:** PostHog funnel events (`src/lib/analytics.ts`)
- **Error tracking:** custom client-side beacon in `Layout.astro`

### Key File Locations
- **Design Tokens:** `tailwind.config.mjs` — see `docs/style_spec.md` for the full token reference
- **UI Components:** `src/components/ui/`
- **Content Config:** `src/content.config.ts`
- **Report Content:** `src/content/reports/`
- **Report Images:** `src/assets/images/reports/[slug]/` — charts/graphs embedded in the article body via markdown
- **Social Images:** generated at build time; use the optional `seo.image` report override only for a custom card

## Design System

Design tokens, component rules, and responsive conventions are enforced in [CLAUDE.md](CLAUDE.md).
Exact values and design rationale: `docs/style_spec.md`. Live component reference: `/styleguide`.

## Project Structure

```
fund-investigator/
├── src/
│   ├── assets/images/reports/[slug]/   # Report charts and optional custom social card
│   ├── components/
│   │   ├── ui/                         # Button, Card, Badge, Hero, Section, Table, ... (see /styleguide)
│   │   ├── Header.astro / Footer.astro / Logo.astro
│   │   └── ReportCard.astro
│   ├── content/
│   │   └── reports/                    # Report markdown — the content collection
│   ├── content.config.ts               # Schema for the reports collection
│   ├── layouts/
│   │   ├── Layout.astro                # Global layout
│   │   └── ArticleLayout.astro         # Report page layout
│   ├── lib/                            # responsive.ts, schema.ts (JSON-LD), services.ts, faq.ts,
│   │                                   # distributor.ts, whatsapp.ts, substack.ts, analytics.ts
│   └── pages/
│       ├── index.astro
│       ├── invest.astro                # "Invest with support" service page
│       ├── reports.astro               # Report listing
│       ├── reports/[...slug].astro     # Report detail route
│       ├── about.astro / disclaimer.astro / privacy.astro / terms.astro
│       ├── styleguide.astro            # Live component reference — /styleguide
│       └── llms.txt.ts                 # Machine-readable summary for AI crawlers
├── public/
│   ├── images/                         # Static social/OG images
│   ├── videos/                         # Deepdive snapshot poster
│   └── robots.txt
├── docs/                                # Design spec, content, deployment, funnel handoff, project log
├── CLAUDE.md                           # Agent instructions (AGENTS.md symlinks here)
├── tailwind.config.mjs                  # Design tokens
├── astro.config.mjs
└── package.json
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Site available at `http://localhost:4321`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```
5. **Type-check:**
   ```bash
   npm run astro check
   ```

## Creating Content

Copy `docs/templates/report-template.md` and follow the inline instructions — it's the maintained
reference for frontmatter fields, image paths, and the Investigation Arc structure (Premise →
Evidence → Analysis → Verdict), and stays in sync with the schema in `src/content.config.ts`.

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Design system rules and development workflow
- **[docs/content_philosophy.md](docs/content_philosophy.md)** - Writing guidelines and tone reference
- **[docs/style_spec.md](docs/style_spec.md)** - Design token values and rationale
- **[docs/templates/report-template.md](docs/templates/report-template.md)** - Report authoring reference
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment procedures and troubleshooting
- **[docs/mfd_funnel_handoff.md](docs/mfd_funnel_handoff.md)** - Distribution funnel rules, compliance wording, build status
- **[docs/mfd_whatsapp_kit.md](docs/mfd_whatsapp_kit.md)** - WhatsApp Business texts
- **[docs/seo_audit.md](docs/seo_audit.md)** - SEO audit and checks
- **[docs/project_log.md](docs/project_log.md)** - Session history and pending decisions
- **Live Styleguide** - Visit `/styleguide` for component reference

## Deployment

This project deploys automatically to Cloudflare Pages on pushes to `main`.

For detailed deployment setup, custom domains, and troubleshooting, see **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## License

© 2026 Fund Investigator

---

For questions or support: contact@fundinvestigator.com
