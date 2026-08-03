# Fund Investigator

FundInvestigator.com — a content-driven website analyzing Indian mutual funds beyond headline
returns, built to establish credibility and attract readers, Deepdive users, and prospective clients.

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
- **Error tracking:** custom client-side beacon in `Layout.astro` — description intentionally omitted, endpoint accuracy under review (see `docs/project_log.md` #37)

### Key File Locations
- **Design Tokens:** `tailwind.config.mjs` — see `docs/style_spec.md` for the full token reference
- **UI Components:** `src/components/ui/`
- **Content Config:** `src/content.config.ts`
- **Report Content:** `src/content/reports/`
- **Report Images:** `src/assets/images/reports/[slug]/` — charts/graphs embedded in the article body via markdown
- **Cover Image:** `coverImage` frontmatter field, same folder today (see `docs/project_log.md` #27 for a possible future split)

## Design System

Design tokens, component rules, and responsive conventions are enforced in [CLAUDE.md](CLAUDE.md).
Exact values and design rationale: `docs/style_spec.md`. Live component reference: `/styleguide`.

## Project Structure

```
fund-investigator/
├── src/
│   ├── assets/images/reports/[slug]/   # Chart images + cover image, auto-optimized (WebP/AVIF)
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
│   ├── lib/                            # responsive.ts, schema.ts (JSON-LD), substack.ts
│   └── pages/
│       ├── index.astro
│       ├── reports.astro               # Report listing
│       ├── reports/[...slug].astro     # Report detail route
│       ├── about.astro / disclaimer.astro / privacy.astro / terms.astro
│       ├── styleguide.astro            # Live component reference — /styleguide
│       └── llms.txt.ts                 # Machine-readable summary for AI crawlers
├── functions/api/                      # Cloudflare Pages Functions
├── public/
│   ├── images/                         # Static social/OG images
│   ├── videos/                         # Deepdive showcase promo reels
│   └── robots.txt
├── docs/                                # Design spec, content philosophy, deployment, project log
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
- **[docs/project_log.md](docs/project_log.md)** - Session history and pending decisions
- **Live Styleguide** - Visit `/styleguide` for component reference

## Deployment

This project deploys automatically to Cloudflare Pages on pushes to `main`.

For detailed deployment setup, custom domains, and troubleshooting, see **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## License

© 2026 Fund Investigator

---

For questions or support: contact@fundinvestigator.com
