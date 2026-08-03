# Fund Investigator — Style Specification

> Design system reference for the homepage and all site pages.
> Implement via `tailwind.config.mjs`. Token names map directly to Tailwind utility classes.

---

## 1. Color System

All colors are defined as semantic `fi-*` tokens in `tailwind.config.mjs`. Never use raw hex or Tailwind palette names (e.g. `slate-950`) directly in components — always use the token.

**Full palette with live swatches: `/styleguide` → Color Palette.** That page renders directly from the tokens and can't drift from them; this doc doesn't keep its own copy of the hex values.

### Section Background Rhythm

**Principle:** homepage sections alternate `fi-dark` and `fi-light` backgrounds to create visual
rhythm — no page should read as one flat block of color. The current section-by-section assignment
is owned by the `background` prop passed to each `<Section>`/`<Hero>` call in `src/pages/index.astro`;
treat that file as the source of truth rather than a table here, since homepage composition (section
order, new sections, section count) changes as the page evolves and a static list goes stale
immediately (this table previously listed 8 sections in an order that no longer matches the live
page, and omitted the Credibility Strip section entirely).

### Text

| Token | Hex | Tailwind base | Used for |
|-------|-----|---------------|---------|
| `fi-ink` | `#020617` | slate-950 | Primary text on light bg |
| `fi-muted` | `#64748B` | slate-500 | Body copy · section subtitles · card body |
| `fi-subtle` | `#94A3B8` | slate-400 | Placeholder text · tertiary labels |
| `fi-ink-inv` | `#F8FAFC` | slate-50 | Primary text on dark bg |
| `fi-muted-inv` | `#CBD5E1` | slate-300 | Secondary text on dark bg · footer links · hero subtitle |

### Accent

| Token | Hex | Tailwind base | Used for |
|-------|-----|---------------|---------|
| `fi-gold` | `#FBBF24` | amber-400 | All buttons · H1 emphasis word on dark · section label text (dark) |
| `fi-gold-hover` | `#FCD34D` | amber-300 | Button hover state only |

### UI Chrome

| Token | Hex | Tailwind base | Used for |
|-------|-----|---------------|---------|
| `fi-border` | `#E2E8F0` | slate-200 | Card borders · section dividers · nav bottom border |
| `fi-border-dark` | `#334155` | slate-700 | Borders on dark sections · icon bg on dark cards |
| `fi-icon-bg` | `#F1F5F9` | slate-100 | Icon container bg on light sections |
| `fi-icon-bg-inv` | `#1E293B` | slate-800 | Icon container bg on dark sections |

### Data / Semantic States

| Token | Hex | Used for |
|-------|-----|---------|
| `fi-positive` | `#10B981` | Positive returns in data tables |
| `fi-negative` | `#EF4444` | Negative returns in data tables |
| `fi-neutral` | `#64748B` | Neutral / zero returns |

---

## 2. Typography

Fonts and the full type scale are shown live at `/styleguide` → Typography, rendered from the actual
`tailwind.config.mjs` tokens.

### Hero Headline

The H1 uses fluid sizing via `clamp()` applied at the component level — not in the config:

```
font-size: clamp(34px, 5.5vw, 58px)
```

The emphasis word ("Investigated") is rendered in `fi-gold` using an `<em>` with `font-style: normal`.

### Report Serif (Newsreader)

Report article content only (`src/layouts/ArticleLayout.astro`) uses a second typeface, Newsreader
(self-hosted via `@fontsource/newsreader`, weights 400/700), applied to: the H1, deck/hook, all
heading levels, body copy (paragraphs + lists), pull-quotes, and markdown tables. Figure captions,
the disclaimer block, and all site-wide UI chrome — nav, buttons, cards, footer, `ReportCard.astro`
— remain Inter. Config: `tailwind.config.mjs` → `fontFamily.serif`.

---

## 3. Buttons

All button variants (Primary, Secondary, Tertiary, Outline) and their exact specs are shown live at
`/styleguide` → Buttons.

Nav CTA (compact variant): `padding: 8px 18px` · `border-radius: 8px` · same primary colours — not
shown on `/styleguide` since it's a one-off usage in `Header.astro`, not a `Button` variant.

---

## 4. Navigation

**Principle:** the nav is always pinned to the top of the viewport, above all content, using the
`z-fi-header` layout token. Exact current theming (background color, height, padding, link styling)
is owned by `src/components/Header.astro` — treat that file as the source of truth. It has changed
design direction before (this doc previously described a white, translucent, blurred nav; the live
header is currently solid `fi-dark`) and will likely change again, so specific values aren't
duplicated here.

---

## 5. Section Labels (Pills)

Appear above section headings. Two variants based on section background.

**Light sections (fi-light or white):**
- Background: `fi-icon-bg` (slate-100)
- Border: `1px solid fi-border` (slate-200)
- Text: `fi-muted` (slate-600)

**Dark sections (fi-dark):**
- Background: `fi-mid` (slate-800)
- Border: `1px solid fi-border-dark` (slate-700)
- Text: `fi-muted-inv` (slate-300)

Both: `font-size: 11px (caption)` · `font-weight: 700` · `letter-spacing: 0.13em` · `text-transform: uppercase` · `padding: 5px 12px` · `border-radius: 999px` · `display: inline-block` · `margin-bottom: 20px`

---

## 6. Cards

### Problem Cards (light section)
- Background: white
- Border: `1px solid fi-border`
- Border-radius: `16px`
- Padding: `28px 24px`
- Hover: border → `fi-border` darkened (slate-300) · `box-shadow: 0 8px 28px rgba(2,6,23,0.07)` · `translateY(-2px)`
- Icon container: `44×44px` · `border-radius: 12px` · bg: `fi-icon-bg` · icon: 22×22px · stroke: `fi-muted`
- Title: `15px` · `font-weight: 700` · `fi-ink` · `line-height: 1.3`
- Body: `13px` · `fi-muted` · `line-height: 1.65`

### Investigation Cards (light section)
- Background: white
- Border: `1px solid fi-border`
- Border-radius: `16px`
- Padding: `28px`
- Top accent bar: `3px solid fi-border` (slate-200, not gold)
- Hover: border → slate-300 · `box-shadow: 0 16px 44px rgba(2,6,23,0.09)` · `translateY(-4px)`
- Tag pill: `fi-icon-bg` bg · `fi-border` border · `fi-muted` text · `font-size: 11px` · `font-weight: 700` · `letter-spacing: 0.07em` · `padding: 4px 10px` · `border-radius: 6px`
- Metric tags: `fi-light` bg · `fi-border` border · `fi-muted` text · `font-size: 11px` · `padding: 3px 10px` · `border-radius: 6px`
- Arrow link: `fi-muted` (slate-600) · `font-weight: 700` · `font-size: 13px`
- Grid: fixed 2-column · `gap: 20px` · `max-width: 960px`

### Why FI Cards (dark section)
- Background: `fi-mid` (slate-800)
- Border: `1px solid fi-border-dark` (slate-700)
- Border-radius: `16px`
- Padding: `32px 24px`
- Text align: center
- Hover: border → slate-600 · `box-shadow: 0 8px 32px rgba(0,0,0,0.30)` · `translateY(-2px)`
- Icon container: `44×44px` · `border-radius: 12px` · bg: `fi-border-dark` (slate-700) · icon: 22×22px · stroke: `fi-muted-inv`
- Title: `15px` · `font-weight: 700` · `fi-ink-inv`
- Body: `13px` · `fi-muted-inv` · `line-height: 1.65`

---

## 7. Section Spacing

**Principle:** vertical spacing is never a fixed pixel value — it comes from `Section.astro`'s named
spacing scale (`none`/`sm`/`md`/`lg`/`xl`, each a responsive Tailwind pair, e.g. `py-16 md:py-24`) so
it adapts per breakpoint instead of being set once for desktop. Current scale values live in
`spacingStyles` in `src/components/ui/Section.astro`. Horizontal padding is owned by `Section.astro`
and `Hero.astro` (`px-4 sm:px-6 lg:px-10` — see §14 Responsive Patterns), not set per-page.

---

## 8. Icons

Library: **Lucide** (same as shadcn/ui).

Global defaults: `stroke-width: 1.75` · `stroke-linecap: round` · `stroke-linejoin: round` · `fill: none`

Arrow icons on buttons and links: `stroke-width: 2.25`

Check icons in feature lists: `stroke-width: 2.5`

No emoji anywhere on the site.

---

## 9. Footer

**Principle:** dark-themed, collapses to fewer columns on mobile. Exact current grid, padding, and
spacing values are owned by `src/components/Footer.astro` — treat that file as the source of truth
(this doc previously specified a `2fr 1fr 1fr 1fr` desktop-only grid and fixed `60px 40px 32px`
padding; the live footer uses a responsive `grid-cols-2 md:grid-cols-4` and responsive padding, from
the mobile-footer fix logged in `project_log.md`).

---

## 10. Background Accents

### Hero
Subtle radial gradient overlay behind content:
```
background: radial-gradient(ellipse 60% 50% at 85% 40%, rgba(251,191,36,0.05) 0%, transparent 55%)
```
Accent sits on a `position: absolute; inset: 0` layer. Very low opacity — atmosphere only, not decorative.

### Why FI Section
Same radial gradient treatment as hero.

---

## 11. Transitions

All interactive elements: `transition: all 0.2s`

Hover lift: `transform: translateY(-2px)` — buttons, cards

---

## 12. Custom Utilities (non-Tailwind)

Defined in `tailwind.config.mjs` via `addUtilities`:

| Class | Property | Used for |
|-------|----------|---------|
| `.tabular-nums` | `font-variant-numeric: tabular-nums` | Data tables, metric values |
| `.slashed-zero` | `font-variant-numeric: slashed-zero` | Distinguishes 0 from O in data |
| `.text-balance` | `text-wrap: balance` | Section headings |

---

## 13. What Was Deliberately Excluded

| Element | Decision |
|---------|----------|
| Custom shadows | Tokenized as `shadow-fi-card` and `shadow-fi-card-dark` in `tailwind.config.mjs` |
| Custom spacing tokens | Button-specific tokens (`fi-btn-x`, `fi-btn-y`) added; general spacing uses Tailwind's native 4px scale |
| Custom border-radius | Button radius tokenized as `rounded-fi-btn` (10px); others use Tailwind defaults |
| Custom transitions | Removed — use Tailwind defaults |
| Custom animations | Removed — use Tailwind defaults |
| Playfair Display | Rejected as the report serif candidate — superseded by Newsreader, see `## 2. Typography` |
| Stats Strip section | Removed from page — no traction metrics to justify it yet |
| "Coming Soon" cards | Removed — honest about current content state |
| Freemium promises in UI | Removed — "free to use · no login required" deleted to avoid constraining business model |
| Star ratings / scores | Never used — counter to the platform's analytical positioning |
| Gradient backgrounds on content sections | Removed — blue/teal gradients replaced with flat `fi-light` |
| Deepdive App Mockup (decorative fake-UI: metric tiles, chart bars, window chrome) | Removed — the Deepdive section now shows a real video walkthrough of the app instead (`project_log.md` S22). Leftover code: `TearsheetMockup.astro`, unused (`project_log.md` #40) |
| Inline homepage email-capture input | Removed — subscription moved entirely to Substack redirect buttons (`project_log.md` #30). No `type="email"` field remains on the homepage |

---

## 14. Responsive Patterns

### Breakpoints
Standard Tailwind defaults. No custom breakpoints.
- `sm:` 640px | `md:` 768px | `lg:` 1024px | `xl:` 1280px

### Typography Presets
Import from `src/lib/responsive.ts`. Never write breakpoint classes inline for headings.

| Preset | Usage | Resolves to |
|--------|-------|-------------|
| `responsive.display` | Hero H1 | `text-4xl sm:text-5xl md:text-6xl lg:text-display-xl` |
| `responsive.h2Large` | Section H2 (large) | `text-heading-lg sm:text-heading-xl lg:text-display-md` |
| `responsive.h2` | Section H2 (standard) | `text-heading-md sm:text-heading-lg lg:text-heading-xl` |
| `responsive.h3` | Subsection H3 | `text-heading-sm sm:text-heading-md` |
| `responsive.subtitle` | Lead/subtitle | `text-body-md sm:text-body-lg` |

Body text (`text-body-md`, `text-body-sm`) does NOT need responsive scaling.

### Grid Progression
Always provide an intermediate breakpoint. Never jump from 1 to 3 columns.

| Target | Pattern |
|--------|---------|
| 2-col | `grid sm:grid-cols-2` |
| 3-col | `grid sm:grid-cols-2 lg:grid-cols-3` |
| 4-col | `grid grid-cols-2 md:grid-cols-4` |

Gap pattern: `gap-5 lg:gap-8` (tighter mobile, wider desktop).

### Containers
Use `Section maxWidth` prop. Never create manual inner containers with `maxWidth="full"`.

| Page type | `maxWidth` | Effective width |
|-----------|-----------|-----------------|
| Homepage sections | `2xl` | max-w-7xl (1280px) |
| Content pages | `md` | max-w-4xl (896px) |
| Report listing | `xl` | max-w-6xl (1152px) |
| Article prose | `sm` | max-w-3xl (768px) |

### Horizontal Padding
Owned by `Section.astro` and `Hero.astro`: `px-4 sm:px-6 lg:px-10`.
Pages should not add their own horizontal padding.

### Layout Tokens
Defined in `tailwind.config.mjs`, shown live at `/styleguide` → Layout Tokens
(`z-fi-header`, `z-fi-menu`, `shadow-fi-card`, `shadow-fi-card-dark`, `rounded-fi-btn`, `w-fi-icon`/`h-fi-icon`,
`w-fi-icon-lg`/`h-fi-icon-lg`, `max-w-fi-content`). The `--fi-header-h` CSS var (73px) isn't a Tailwind
token so it doesn't appear there — it's set directly in `Layout.astro`.