# Project Context & Goals

## 1. Project Overview
- **What:** FundInvestigator.com - A financial advisory brand platform.
- **Why:** To showcase "investigations" (reports/tools) that establish credibility and attract high-value clients.
- **How:** By maintaining a fast, content-driven static site (Astro) that links to specialized interactive apps (Streamlit) on subdomains.

## 2. Architecture & Tech Stack

### System Design
- **Hub:** `fundinvestigator.com` (Marketing/Content) hosted on **Cloudflare Pages**.
- **Spoke:** `deepdive.fundinvestigator.com` (App) hosted on **Railway**.
- **Strategy:** Subdomains separate the static marketing layer (speed/SEO) from the compute-heavy application layer.

### Tech Stack
- **Core:** Astro v5 (SSG mode). Zero-JS output by default.
- **Style:** Tailwind CSS v3 (Utility-first) + Typography plugin.
- **Content:** Standard Markdown (`.md`) + YAML Frontmatter.
- **Images:**
    - *Content:* `src/assets` (Auto-optimized by Astro).
    - *Social/SEO:* `public/images` (Static URLs).
- **Analytics:** Cloudflare RUM (Beacon script in `Layout.astro`).

### Key File Locations
- **Design Tokens:** `tailwind.config.mjs` (Source of Truth for colors/spacing).
- **UI Components:** `src/components/ui/` (Button, Card, Badge, etc.).
- **Content Config:** `src/content.config.ts` (Schema definitions for reports).
- **Report Content:** `src/content/reports/` (Markdown files with typed frontmatter).
- **Report Images:** `src/assets/images/reports/[slug]/` (Optimized charts).
- **Cover Images:** `src/assets/images/reports/[slug]/` (Auto-optimized via schema).

## 3. Design System (3-Layer)

### Layer 1: Design Tokens
- **Source:** `tailwind.config.mjs`
- **What:** Custom Tailwind theme extending the default palette.
- **How:** **Never** use arbitrary values (e.g., `bg-[#1E3A5F]`). Always use tokens:
    - *Colors:* `text-navy`, `bg-gold`, `border-cream`.
    - *Semantic:* `text-success`, `bg-error`.
    - *Shadows:* `shadow-gold`, `shadow-navy`.

### Layer 2: UI Components
- **Source:** `src/components/ui/`
- **What:** TypeScript-typed Astro components with strict variants.
- **How:** **Never** build inline UI. Always import components.
    ```astro
    <Button variant="primary" icon="arrow-right">Launch Tool</Button>
    <Card variant="elevated">...</Card>
    ```

### Layer 3: Documentation
- **Source:** `src/pages/styleguide.astro` (Live at `/styleguide`).
- **Use:** Refer to this file to see available component props and variants.

## 4. Content & Tone Guidelines

- **Source:** `docs/CONTENT-GUIDE.md`
- **Core Philosophy:** **Fact-Based Storytelling**. Use data to create the narrative arc, not adjectives.
- **Persona:** An **Investigator Colleague**. Professional, matter-of-fact, peer-to-peer and fact based storytelling.
- **Rules:**
    1.  **Evidence over Adjectives:** **Never** use "huge", "best", or "massive." Replace with specific metrics (e.g., "15% CAGR").
    2.  **No Hype:** Let the data provide the drama.
    3.  **Investigation Arc:** Structure reports logically: *Premise -> Evidence -> Analysis -> Verdict*.
- **Tone Check:** Avoid exclamation mark per page. No urgency tactics ("act now").

## 5. Development Workflow

### Usage Rules
1.  **Mobile First:** Use Tailwind breakpoints (`md:`, `lg:`) for responsive layouts.
2.  **Strict Props:** Use Component Props over custom classes.
3.  **Image Strategy:**
    - *Charts/Graphs:* Save to `src/assets/...`. Link via relative path `../../assets/...`.
    - *Cover Images:* Save to `src/assets/images/reports/[slug]/`. Reference in frontmatter via relative path.

### Essential Commands
- `npm run dev`: Start local server.
- `npm run build`: Build for production (`dist/`).
- `npm run preview`: Preview build locally.

## 6. Agent Behavior Guidelines
- **Planning:** Plan before execution. Keep plans concise.
- **Clarity:** If a requirement is unclear, ask clarifying questions and recommend a preference.
- **Simplicity:** Prioritize simple, maintainable solutions over complex ones.