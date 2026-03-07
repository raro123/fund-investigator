# Fund Investigator — Style Specification

> Design system reference for the homepage and all site pages.
> Implement via `tailwind.config.mjs`. Token names map directly to Tailwind utility classes.

---

## 1. Color System

All colors are defined as semantic `fi-*` tokens in `tailwind.config.mjs`. Never use raw hex or Tailwind palette names (e.g. `slate-950`) directly in components — always use the token.

### Structural Backgrounds

| Token | Hex | Tailwind base | Used on |
|-------|-----|---------------|---------|
| `fi-dark` | `#020617` | slate-950 | Hero · Why FI · Footer |
| `fi-mid` | `#1E293B` | slate-800 | Cards on dark bg · label pill bg (dark) |
| `fi-light` | `#F8FAFC` | slate-50 | Problem · Deepdive · Email Capture · alternating sections |

White (`#FFFFFF`) is used for Nav and Investigations sections. Use Tailwind's native `white`.

### Section Background Rhythm

| # | Section | Background |
|---|---------|------------|
| 1 | Nav | `white` (sticky) |
| 2 | Hero | `fi-dark` |
| 3 | The Problem | `fi-light` |
| 4 | Investigations | `white` |
| 5 | Deepdive | `fi-light` |
| 6 | Why Fund Investigator | `fi-dark` |
| 7 | Email Capture | `fi-light` |
| 8 | Footer | `fi-dark` |

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

### Fonts

| Role | Family | Load via |
|------|--------|---------|
| Primary (all UI) | Inter | `@fontsource/inter` in `Layout.astro` |
| Monospace (financial data) | JetBrains Mono, Fira Code | CDN or system fallback |

Weights loaded: **400 · 500 · 600 · 700 · 800**

### Type Scale — 1.250 ratio

| Token | Size | Line Height | Letter Spacing | Weight | Used for |
|-------|------|-------------|----------------|--------|---------|
| `display-xl` | 44px / 2.75rem | 1.08 | −0.02em | 800 | Hero H1 (with `clamp()` for fluid sizing) |
| `display-lg` | 36px / 2.25rem | 1.10 | −0.02em | 800 | Large section headings |
| `display-md` | 28px / 1.75rem | 1.15 | −0.01em | 800 | Medium section headings |
| `heading-xl` | 36px / 2.25rem | 1.20 | −0.01em | 700 | — |
| `heading-lg` | 28px / 1.75rem | 1.25 | −0.01em | 700 | Section headings |
| `heading-md` | 22px / 1.375rem | 1.30 | — | 700 | Card headings |
| `heading-sm` | 18px / 1.125rem | 1.35 | — | 700 | Sub-headings |
| `body-lg` | 18px / 1.125rem | 1.75 | — | 400 | Lead paragraphs · hero subtitle |
| `body-md` | 15px / 0.9375rem | 1.65 | — | 400 | Standard body · card copy |
| `body-sm` | 13px / 0.8125rem | 1.60 | — | 400 | Footer links · meta · secondary UI |
| `caption` | 11px / 0.6875rem | 1.40 | +0.13em | 700 | Section label pills · metric tags |

Usage in components: `class="text-display-xl"`, `class="text-body-md"`, etc.

### Hero Headline

The H1 uses fluid sizing via `clamp()` applied at the component level — not in the config:

```
font-size: clamp(34px, 5.5vw, 58px)
```

The emphasis word ("Investigated") is rendered in `fi-gold` using an `<em>` with `font-style: normal`.

---

## 3. Buttons

All buttons share: `border-radius: 10px` · `font-weight: 700` · `font-size: 14px` · `padding: 13px 26px` · `transition: all 0.2s` · `display: inline-flex; align-items: center; gap: 8px`

Hover on all variants: `transform: translateY(-2px)`

| Variant | Background | Border | Text | Hover bg |
|---------|------------|--------|------|---------|
| Primary | `fi-gold` | `fi-gold` (2px) | `fi-ink` | `fi-gold-hover` |
| Secondary | transparent | `fi-gold` (2px) | `fi-gold` | `rgba(fi-gold, 0.08)` |
| Tertiary | transparent | none | `fi-gold` | — (underline darkens) |
| Outline | transparent | `fi-ink` (2px) | `fi-ink` | `fi-ink` bg · white text |

Tertiary uses `text-decoration: underline` with `text-decoration-color: rgba(fi-gold, 0.4)`, full `fi-gold` on hover.

Nav CTA (compact variant): `padding: 8px 18px` · `border-radius: 8px` · same primary colours.

Arrow icon on all buttons: 15×15px · `stroke: currentColor` · `stroke-width: 2.25`.

---

## 4. Navigation

- Position: `sticky top-0` · `z-index: 100`
- Background: `rgba(white, 0.97)` · `backdrop-filter: blur(10px)`
- Border: `1px solid fi-border` (bottom only)
- Height: `64px` · horizontal padding: `40px`
- Logo: `fi-ink` text · `fi-dark` circle (34×34px, 50% radius) · icon 16×16px white stroke
- Nav links: `fi-muted` (slate-600) · `font-size: 14px` · `font-weight: 500` · hover: `fi-ink`
- Tools dropdown: white bg · `fi-border` border · `border-radius: 12px` · `box-shadow` · `min-width: 180px`
- Chevron: rotates 180° on hover

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

| Property | Value |
|----------|-------|
| Section vertical padding | `88px` top and bottom (desktop) |
| Hero padding | `100px` top · `96px` bottom |
| Why FI section padding | `96px` top and bottom |
| Max content width | `960px` centered |
| Horizontal section padding | `40px` (desktop) |
| Card grid gap | `20px` |
| Two-column layout gap | `64px` (Deepdive section) |

---

## 8. Icons

Library: **Lucide** (same as shadcn/ui).

Global defaults: `stroke-width: 1.75` · `stroke-linecap: round` · `stroke-linejoin: round` · `fill: none`

Arrow icons on buttons and links: `stroke-width: 2.25`

Check icons in feature lists: `stroke-width: 2.5`

No emoji anywhere on the site.

---

## 9. Deepdive App Mockup

Decorative UI element in the Deepdive section.

| Element | Value |
|---------|-------|
| Outer card bg | `fi-dark` (slate-950) |
| Outer card radius | `18px` |
| Outer card shadow | `0 28px 64px rgba(2,6,23,0.20)` |
| Inner content bg | `fi-mid` (slate-800) |
| Inner content radius | `12px` |
| Window chrome dots | 10×10px · `fi-border-dark` · `border-radius: 50%` |
| Metric tile bg | `fi-border-dark` (slate-700) |
| Metric value | `fi-gold` · `font-size: 16px` · `font-weight: 700` |
| Metric label | `fi-subtle` (slate-400) · `font-size: 9px` |
| Chart bar bg | `fi-gold` · low opacity `0.45` · highlight bars `0.80` |
| Tag pill | `rgba(fi-gold, 0.12)` bg · `fi-gold` text |

---

## 10. Email Input

- Background: white
- Border: `1.5px solid fi-border`
- Border-radius: `10px`
- Padding: `13px 16px`
- Font-size: `15px`
- Placeholder: `fi-subtle` (slate-400)
- Focus: border → `fi-ink` (slate-950) · `box-shadow: 0 0 0 3px rgba(2,6,23,0.07)`

---

## 11. Footer

- Background: `fi-dark`
- Padding: `60px 40px 32px`
- Top grid: 4 columns (`2fr 1fr 1fr 1fr`) · gap `40px`
- Section divider: `1px solid fi-border-dark` (between top grid and bottom bar)
- Brand tagline: `fi-gold` · italic · display font · `font-size: 13px`
- Column headings: `fi-muted` (slate-500) · `font-size: 11px` · `font-weight: 700` · `letter-spacing: 0.1em` · uppercase
- Links: `fi-muted-inv` (slate-300) · `font-size: 13px` · hover: `fi-ink-inv`
- Copyright: `fi-muted-inv` · `font-size: 12px`
- Social icons: `34×34px` · `border-radius: 8px` · bg `rgba(white, 0.07)` · icon 16×16px `fi-muted-inv` · hover: bg `rgba(white, 0.14)` · icon `fi-ink-inv`

---

## 12. Background Accents

### Hero
Subtle radial gradient overlay behind content:
```
background: radial-gradient(ellipse 60% 50% at 85% 40%, rgba(251,191,36,0.05) 0%, transparent 55%)
```
Accent sits on a `position: absolute; inset: 0` layer. Very low opacity — atmosphere only, not decorative.

### Why FI Section
Same radial gradient treatment as hero.

---

## 13. Transitions

All interactive elements: `transition: all 0.2s`

Hover lift: `transform: translateY(-2px)` — buttons, cards

---

## 14. Custom Utilities (non-Tailwind)

Defined in `tailwind.config.mjs` via `addUtilities`:

| Class | Property | Used for |
|-------|----------|---------|
| `.tabular-nums` | `font-variant-numeric: tabular-nums` | Data tables, metric values |
| `.slashed-zero` | `font-variant-numeric: slashed-zero` | Distinguishes 0 from O in data |
| `.text-balance` | `text-wrap: balance` | Section headings |

---

## 15. What Was Deliberately Excluded

| Element | Decision |
|---------|----------|
| Custom shadows | Tokenized as `shadow-fi-card` and `shadow-fi-card-dark` in `tailwind.config.mjs` |
| Custom spacing tokens | Button-specific tokens (`fi-btn-x`, `fi-btn-y`) added; general spacing uses Tailwind's native 4px scale |
| Custom border-radius | Button radius tokenized as `rounded-fi-btn` (10px); others use Tailwind defaults |
| Custom transitions | Removed — use Tailwind defaults |
| Custom animations | Removed — use Tailwind defaults |
| Playfair Display | Removed — Inter only |
| Stats Strip section | Removed from page — no traction metrics to justify it yet |
| "Coming Soon" cards | Removed — honest about current content state |
| Freemium promises in UI | Removed — "free to use · no login required" deleted to avoid constraining business model |
| Star ratings / scores | Never used — counter to the platform's analytical positioning |
| Gradient backgrounds on content sections | Removed — blue/teal gradients replaced with flat `fi-light` |

---

## 15. Responsive Patterns

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
Defined in `tailwind.config.mjs`:

| Token | Value | Replaces |
|-------|-------|----------|
| `z-fi-header` | 100 | `z-[10000]` |
| `z-fi-menu` | 90 | `z-[9999]` |
| `shadow-fi-card` | light card shadow | `shadow-[0_4px_24px...]` |
| `shadow-fi-card-dark` | dark card shadow | `shadow-[0_16px_44px...]` |
| `rounded-fi-btn` | 10px | `rounded-[10px]` |
| `w-fi-icon` / `h-fi-icon` | 22px | `w-[22px] h-[22px]` |
| `w-fi-icon-lg` / `h-fi-icon-lg` | 44px | `w-[34px] h-[34px]` |
| `max-w-fi-content` | 65ch | `max-w-[65ch]` |
| `--fi-header-h` | 73px (CSS var) | `top-[73px]` |