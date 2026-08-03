# Project Context & Goals

Architecture, tech stack, and file locations: see [README.md](README.md).

## 1. Design System (3-Layer)

### Layer 1: Design Tokens
- **Source:** `tailwind.config.mjs`
- **What:** Custom Tailwind theme extending the default palette.
- **How:** **Never** use arbitrary values (e.g., `bg-[#1E3A5F]`). Always use tokens:
    - *Colors:* `text-fi-ink`, `bg-fi-gold`, `border-fi-border` (all `fi-*` prefixed).
    - *Shadows:* `shadow-fi-card`, `shadow-fi-card-dark`.
    - *Z-index:* `z-fi-header`, `z-fi-menu`, `z-fi-overlay`.
    - *Sizing:* `w-fi-icon`, `h-fi-icon-lg`, `rounded-fi-btn`.

### Layer 2: UI Components
- **Source:** `src/components/ui/`
- **What:** TypeScript-typed Astro components with strict variants.
- **How:** **Never** build inline UI. Always import components.
    ```astro
    <Button variant="primary" icon="arrow-right">Launch Tool</Button>
    <Card variant="elevated">...</Card>
    ```
- **Responsive behavior is owned by components, not pages** — `Section.astro` owns horizontal padding and max-width, `Hero.astro` owns vertical padding via its `size` prop. Never write responsive breakpoints inline; import presets from `src/lib/responsive.ts`:
    ```astro
    import { responsive } from '../lib/responsive';
    <h1 class:list={[responsive.display, 'font-bold text-fi-ink']}>Title</h1>
    ```
    See `docs/style_spec.md` for exact values.

### Layer 3: Documentation
- **Source:** `src/pages/styleguide.astro` (Live at `/styleguide`).
- **Use:** Refer to this file to see available component props and variants.

## 2. Content & Tone Guidelines

- **Source:** `docs/content_philosophy.md`
- **Adding a report category?** Update it in both `src/content.config.ts` (the enum — the build gate) and `categoryLabels` in `src/pages/reports.astro` (display label + pill order). The schema alone won't catch a missed second update: the build still passes, but the filter pill for that category silently never appears on `/reports`.

## 3. Development Workflow

### Usage Rules
1.  **Mobile First:** Use Tailwind breakpoints (`sm:`, `md:`, `lg:`) for responsive layouts.
2.  **Strict Props:** Use Component Props over custom classes.
3.  **Responsive Patterns:** See `docs/style_spec.md` for grid progression, typography presets, and container conventions.

### Essential Commands
- Source Linux Node through nvm before running npm commands in WSL:
  ```bash
  source ~/.nvm/nvm.sh
  ```
- Do not use Windows npm from `/mnt/c/Program Files/nodejs` inside WSL.
- `npm run dev`: Start local server.
- `npm run build`: Build for production (`dist/`).
- `npm run preview`: Preview build locally.
