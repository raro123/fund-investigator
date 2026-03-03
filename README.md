# Fund Investigator

A financial advisory brand platform showcasing comprehensive mutual fund analysis for Indian investors. Built as a fast, content-driven static site with a systematic design approach.

## Architecture

**Hub + Spoke Pattern:**
- **Hub:** `fundinvestigator.com` (Marketing & Reports) - Static site on Cloudflare Pages
- **Spoke:** `deepdive.fundinvestigator.com` (Analysis Tool) - Interactive app on Railway

This architecture separates the fast, SEO-optimized content layer from the compute-heavy application layer.

## Tech Stack

- **Astro v4** - Static site generator (SSG mode, zero-JS output)
- **Tailwind CSS v3** - Utility-first styling with custom design tokens
- **TypeScript** - Type-safe components and props
- **Cloudflare Pages** - Deployment and hosting
- **Cloudflare RUM** - Analytics

## 3-Layer Design System

### Layer 1: Design Tokens
**Source of Truth:** `tailwind.config.mjs`

All visual properties are defined as Tailwind tokens. Never use arbitrary values (e.g., `bg-[#1E3A5F]`).

**Available Tokens:**
- **Colors:** `navy`, `gold`, `cream` (with light/dark variants) + semantic colors (`success`, `error`, `warning`, `info`)
- **Typography:** Display, Heading, Body, Caption sizes (each with line-height and letter-spacing)
- **Spacing:** `section-y`, `card-padding`, `element-gap`, etc.
- **Shadows:** Standard shadows + branded `shadow-gold`, `shadow-navy`
- **Animations:** fade-in, scale-in, slide-in-right, shimmer, etc.

### Layer 2: UI Components
**Location:** `src/components/ui/`

12 TypeScript-typed Astro components with strict variant-based architecture:
- Button, Card, Badge, Hero, Section
- Input, LoginForm, SearchInput, SubscribeForm
- Table, SortableTable, OptimizedImage

**Usage Pattern:**
```astro
import { Button } from '@/components/ui/Button.astro';
import { Card } from '@/components/ui/Card.astro';

<Button variant="primary" size="lg" icon="arrow-right">Launch Tool</Button>
<Card variant="elevated" padding="lg">...</Card>
```

**Rules:**
- Always use component props, never inline custom classes
- All variants derive from design tokens
- No ad-hoc styling

### Layer 3: Documentation
**Live Reference:** Visit `/styleguide` to see all available components, variants, and usage examples.

## Project Structure

```
fund-investigator/
├── src/
│   ├── assets/images/          # Auto-optimized images (WebP/AVIF)
│   │   └── reports/            # Per-article image folders
│   ├── components/
│   │   ├── ui/                 # 12 UI components
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   ├── Badge.astro
│   │   │   └── [9 more...]
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Logo.astro
│   ├── layouts/
│   │   ├── Layout.astro        # Global layout
│   │   └── ArticleLayout.astro # Report pages
│   └── pages/
│       ├── index.astro         # Landing page
│       ├── reports.astro       # Report listing
│       ├── reports/            # Markdown report files
│       │   ├── _TEMPLATE.md    # Content template
│       │   └── [articles].md
│       ├── about.astro
│       ├── styleguide.astro    # Component showcase
│       ├── disclaimer.astro
│       ├── privacy.astro
│       └── terms.astro
├── public/
│   ├── images/reports/         # Static social card images
│   └── _redirects              # Cloudflare routing config
├── docs/
│   ├── CONTENT-GUIDE.md        # Writing tone & style
│   └── DEPLOYMENT.md           # Deploy procedures
├── CLAUDE.md                   # Project context
├── tailwind.config.mjs         # Design tokens (source of truth)
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

## Creating Content

### New Report Workflow

1. **Copy template:** Duplicate `src/pages/reports/_TEMPLATE.md`
2. **Update frontmatter:**
   ```yaml
   ---
   layout: ../../layouts/ArticleLayout.astro
   title: "Report Title"
   description: "SEO description (under 160 chars)"
   date: 2025-01-11
   readTime: "8 min read"
   category: "Fund Analysis"
   tags: ["Flexicap", "HDFC", "Long-term"]
   featured: true
   coverImage: "/images/reports/article-slug.png"
   coverImageAlt: "Chart description"
   ---
   ```

3. **Add images:**
   - **Charts/graphs:** Save to `src/assets/images/reports/article-slug/` (auto-optimized)
   - **Social cards:** Save to `public/images/reports/` (static URLs for OpenGraph)

4. **Follow Investigation Arc:** Premise → Evidence → Analysis → Verdict

### Image Strategy

| Image Type | Location | Path Format | Processing |
|------------|----------|-------------|------------|
| Charts, graphs, content images | `src/assets/images/reports/{slug}/` | `../../assets/images/...` | Auto-optimized (WebP/AVIF) |
| Social cards, OpenGraph | `public/images/reports/` | `"/images/reports/..."` | Static (no processing) |

## Development

### Component Usage
```astro
---
import Button from '@/components/ui/Button.astro';
import Card from '@/components/ui/Card.astro';
import Badge from '@/components/ui/Badge.astro';
---

<Card variant="elevated" padding="lg">
  <Badge variant="success">High Conviction</Badge>
  <h3>Fund Name</h3>
  <p>Analysis summary...</p>
  <Button variant="primary" href="/reports/article-slug">Read Report</Button>
</Card>
```

### Mobile-First Responsive Design
Use Tailwind breakpoints for responsive layouts:
```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards... -->
</div>
```

### Essential Commands
- `npm run dev` - Start local development server
- `npm run build` - Build for production (`dist/` directory)
- `npm run preview` - Preview production build locally
- `npm run astro check` - Type-check TypeScript

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Project architecture, design system, and development workflow
- **[docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)** - Writing guidelines and tone reference
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Deployment procedures and troubleshooting
- **Live Styleguide** - Visit `/styleguide` for component reference

## Deployment

This project deploys automatically to Cloudflare Pages on pushes to `main`.

For detailed deployment setup, custom domains, and troubleshooting, see **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**.

## Content Guidelines

**Persona:** Investigator Colleague - Professional, matter-of-fact, peer-to-peer communication.

**Core Philosophy:** Fact-Based Storytelling - Use data to create the narrative arc, not adjectives.

### Quick Checklist

✅ **Do:**
- Use specific metrics (e.g., "15% CAGR" not "huge returns")
- Structure reports with Investigation Arc (Premise → Evidence → Analysis → Verdict)
- Write complete sentences in paragraph form
- Let data provide the drama

❌ **Avoid:**
- Superlatives ("best", "massive", "revolutionary")
- Exclamation marks (max 1 per page)
- Sales tactics ("act now", "limited time")
- Bullet lists (except in technical/code contexts)

**Full guidelines:** See [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)

## Brand Identity

- **Colors:** Navy (#1E3A5F), Gold (#D4AF37), Cream (#fefce8)
- **Typography:** Inter font family with generous line-height (1.7)
- **Logo:** "FIN" in magnifying glass lens (Navy primary, Gold accent on "I")

## License

© 2025 Ishpreet Singh Modi

---

For questions or support: contact@fundinvestigator.com
