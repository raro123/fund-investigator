# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

**Development:**
```bash
npm run dev       # Start dev server at http://localhost:4321
npm run build     # Build for production (output: dist/)
npm run preview   # Preview production build locally
```

## Architecture Overview

### Tech Stack
- **Astro 4.16.18** - Static site generator with component-based architecture
- **Tailwind CSS 3.4.17** - Utility-first CSS with extensive custom design tokens
- **Deployment** - Cloudflare Pages (landing) + Railway (app routing via `public/_redirects`)

### 3-Layer Design System

This project implements a comprehensive design system with strict consistency requirements:

**Layer 1: Design Tokens** (`tailwind.config.mjs`)
- Extended Tailwind theme with brand colors (navy/gold/cream) + semantic colors (success/warning/error/info)
- Typography scale: display-xl to caption with defined line-height and letter-spacing
- Spacing tokens: section-y, card-padding, element-gap, etc.
- Shadow system including brand-specific shadows (shadow-gold, shadow-navy)
- Custom animations and transitions

**Layer 2: UI Components** (`src/components/ui/`)
All UI components use TypeScript interfaces and support variants:
- `Button.astro` - 4 variants (primary/secondary/tertiary/outline), 3 sizes, icon support
- `Card.astro` - 4 variants (default/elevated/bordered/glass), padding control, hover toggle
- `Badge.astro` - 7 color variants, 3 sizes
- `Section.astro` - Background variants (white/cream/gradient/navy), spacing levels, maxWidth
- `Hero.astro` - Size variants (sm/md/lg), centered/left-aligned options

**Layer 3: Documentation** (`src/pages/styleguide.astro`)
- Living style guide showcasing all components, colors, typography, spacing
- Accessible at `/styleguide` during development

### Component Architecture

**Pages** (`src/pages/`)
- Astro's file-based routing: `index.astro` → `/`, `reports.astro` → `/reports`
- All pages use the `Layout.astro` wrapper
- Pages should compose UI components from `src/components/ui/` rather than inline markup

**Global Components** (`src/components/`)
- `Header.astro` - Fixed navigation with mobile menu, uses Button component for CTAs
- `Footer.astro` - Site footer with links to terms/privacy/methodology/disclaimer
- `Logo.astro` - SVG-based "FIN" magnifying glass logo with brand colors
- `TearsheetMockup.astro` - Sample fund analysis visualization

**Routing Configuration** (`public/_redirects`)
Cloudflare Pages routing rules:
```
/app/* https://your-railway-app.railway.app/:splat 200
```
This enables:
- Landing site: `fundinvestigator.com` (Cloudflare Pages)
- Analysis tool: `fundinvestigator.com/app` (proxied to Railway)

## Content & Tone Guidelines

**Critical:** Read `CONTENT-GUIDE.md` before editing any user-facing content.

The site persona is an **investigator colleague** sharing insights and tools—not a teacher, salesperson, or guru.

**Key principles:**
- Informative and matter-of-fact, not instructional or pushy
- Explains WHAT exists and WHY it matters, without preaching
- Treats readers as intelligent professionals
- Avoid: exclamation marks (max 1/page), superlatives, urgency tactics, imperatives
- Aim for trust and credibility through professional restraint

## Design System Usage

**When creating/modifying pages:**

1. **Always use UI components** - Never create inline buttons, cards, or badges
2. **Consistent CTA styling** - Use `<Button variant="primary">` for main CTAs (resolves mobile/desktop consistency)
3. **Component props over inline classes** - Prefer `<Card variant="elevated">` over custom Tailwind classes
4. **Maintain backwards compatibility** - Design tokens extend Tailwind; existing classes still work

**Example refactoring pattern:**
```astro
<!-- ❌ Old: Inline markup -->
<button class="px-6 py-3 bg-navy hover:bg-navy-light text-white rounded-full">
  Click me
</button>

<!-- ✅ New: UI component -->
<Button variant="primary" size="md">Click me</Button>
```

## Brand Identity

**Colors:**
- Navy (#1E3A5F) - Primary brand color
- Gold (#D4AF37) - Accent color for hover states and highlights
- Cream (#fefce8) - Light backgrounds

**Logo design:**
- "FIN" text inside magnifying glass lens
- Gold accent on the "I"
- Navy as primary color

**Typography:**
- Inter font family throughout
- Line height: 1.7 for body text (readability)
- Use semantic font size tokens (e.g., `text-heading-lg`, `text-body-md`)

## Common Patterns

**Page structure:**
```astro
---
import Layout from '../layouts/Layout.astro';
import Hero from '../components/ui/Hero.astro';
import Section from '../components/ui/Section.astro';
---

<Layout title="Page Title" description="SEO description">
  <Hero size="lg">
    <h1>Page Heading</h1>
  </Hero>

  <Section background="white" spacing="lg">
    <!-- Content -->
  </Section>
</Layout>
```

**Button usage:**
- Primary CTAs: `<Button variant="primary" href="/app">Launch Tool</Button>`
- Navigation links: `<Button variant="tertiary">About</Button>`
- Filter buttons: `<Button variant="secondary" size="sm">Category</Button>`

**Responsive design:**
- Mobile-first approach with Tailwind breakpoints (sm/md/lg/xl)
- Header includes mobile menu overlay (see `Header.astro` for implementation)
- All UI components are responsive by default

## Site Configuration

**Deployment:**
- Site URL: `https://fundinvestigator.com` (set in `astro.config.mjs`)
- Platform: Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 18+

**SEO:**
- Each page sets title/description via Layout props
- Clean semantic HTML structure
- Fast static generation (no runtime JS for content)
