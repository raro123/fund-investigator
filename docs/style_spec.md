# Fund Investigator — Style Specification

> Design system reference for the homepage and all site pages.
> Implement via `tailwind.config.mjs`. Token names map directly to Tailwind utility classes.

---

## 1. Color System

All colors are defined as semantic `fi-*` tokens in `tailwind.config.mjs`. Never use raw hex or Tailwind palette names (e.g. `slate-950`) directly in components — always use the token.

**Full palette with live swatches: `/styleguide` → Color Palette.** That page renders directly from the tokens and can't drift from them; this doc doesn't keep its own copy of the hex values.

### Section Background Rhythm

**Principle:** homepage sections alternate dark (`fi-dark`) and light (`fi-light` or white)
backgrounds to create visual rhythm — no page should read as one flat block of color, and two dark
bands should not sit back to back. The current section-by-section assignment
is owned by the `background` prop passed to each `<Section>`/`<Hero>` call in `src/pages/index.astro`;
treat that file as the source of truth rather than a table here, since homepage composition (section
order, new sections, section count) changes as the page evolves and a static list goes stale
immediately (this table previously listed 8 sections in an order that no longer matches the live
page, and omitted the Credibility Strip section entirely).

### Text

| Token | Hex | Tailwind base | Used for |
|-------|-----|---------------|---------|
| `fi-ink` | `#020617` | slate-950 | Primary text on light bg |
| `fi-muted` | `#475569` | slate-600 | Body copy · section subtitles · card body — **light surfaces only** (2.6:1 on `fi-dark`) |
| `fi-subtle` | `#94A3B8` | slate-400 | Labels and meta text on dark sections and dark cards — **dark surfaces only** |
| `fi-ink-inv` | `#F8FAFC` | slate-50 | Primary text on dark bg |
| `fi-muted-inv` | `#CBD5E1` | slate-300 | Secondary text on dark bg · footer links · hero subtitle |

### Accent

| Token | Hex | Tailwind base | Used for |
|-------|-----|---------------|---------|
| `fi-gold` | `#FBBF24` | amber-400 | Primary button fill · H1 emphasis word · gold text, links and focus rings **on dark only** |
| `fi-gold-hover` | `#FCD34D` | amber-300 | Button hover state only |
| `fi-link` | `#B45309` | amber-700 | The gold family on light surfaces: text links, link hovers, focus rings |

### Gold Usage Rules

Gold is the brand's signal for "act here". It only works if it is scarce.

1. **One gold action per section.** Use `<Button variant="primary">` once; supporting actions are
   `secondary` (neutral outline) or `tertiary` (text link). Secondary buttons are never gold.
2. **Never gold text on a light surface.** `fi-gold` is 1.7:1 on white — unreadable. Use `fi-link`
   for links, hovers and focus rings on white or `fi-light`.
3. **Gold accents are fine everywhere** when they are not text: primary button fills, the H1
   emphasis word, icon strokes on dark cards, decorative borders and underlines.

### Approved Text Pairs

Every text/background combination the site uses is listed in `scripts/check-contrast.mjs` and
tested against WCAG AA (4.5:1 text, 3:1 focus rings) by `npm run lint:design`. Light surfaces take
`fi-ink`, `fi-muted`, `fi-link`; dark surfaces take `fi-ink-inv`, `fi-muted-inv`, `fi-subtle`,
`fi-gold`. To use a new pairing, add it to that script first.

### UI Chrome

| Token | Hex | Tailwind base | Used for |
|-------|-----|---------------|---------|
| `fi-border` | `#E2E8F0` | slate-200 | Card borders · section dividers · nav bottom border |
| `fi-border-dark` | `#334155` | slate-700 | Borders on dark sections · icon bg on dark cards |
| `fi-icon-bg` | `#F1F5F9` | slate-100 | Icon container bg inside white cards — same value as `fi-light`, so never directly on a light section |
| `fi-icon-bg-inv` | `#1E293B` | slate-800 | Icon container bg on dark sections |

### Data / Semantic States

| Token | Hex | Used for |
|-------|-----|---------|
| `fi-positive` | `#047857` | Positive returns in data tables (emerald-700) |
| `fi-negative` | `#B91C1C` | Negative returns in data tables (red-700) |
| `fi-neutral` | `#475569` | Neutral / zero returns (slate-600) |

For use on light surfaces. Never rely on colour alone to show direction — always pair it with a
sign (+/−) or an arrow, for colour-blind readers.

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

One exception outside reports: brand pull quotes (e.g. "Separate the result from the reasons." on
`/about/`) use `font-serif font-bold`, no italic, to link the brand story to the research voice.
Headings, body copy and UI on brand pages stay Inter.

---

## 3. Buttons

All button variants (Primary, Secondary, Tertiary) and their exact specs are shown live at
`/styleguide` → Buttons.

| Variant | Light surface (default) | Dark surface (`surface="dark"`) |
|---------|-------------------------|---------------------------------|
| `primary` | Gold fill, ink label | Gold fill, ink label |
| `secondary` | Ink outline, ink label | Muted-inv outline, white label |
| `tertiary` | `fi-link` text link | `fi-gold` text link |

Secondary and tertiary buttons must pass `surface="light"` or `surface="dark"` — the light default
is invisible on dark sections, so `npm run lint:design` fails when it is missing. See §1 Gold Usage
Rules.

Nav Subscribe: `<Button variant="secondary" surface="dark" size="sm">` in `Header.astro`, not a gold
CTA — the header should not compete with the page's primary action.

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

**Not on the homepage or `/invest/`** (decided 2026-10-11, S46; `/invest/` S47). Every H2 already says what its section is, so a label only repeated it. Section breaks come from the headings and the dark/light background rhythm. `/about/` and `/reports/` still use labels until they are reviewed (`project_log.md` #84).

**Light sections (fi-light or white):**
- Background: white
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
- Tag pill: white bg · `fi-border` border · `fi-muted` text · `font-size: 11px` · `font-weight: 700` · `letter-spacing: 0.07em` · `padding: 4px 10px` · `border-radius: 6px`
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

### Service Cards (`ServiceCard.astro`, light section)
- One card per Invest with support service, led by the client's problem. Copy source: `src/lib/services.ts` (homepage bullets and `/invest/` details in one list).
- Grey problem strip on top (`fi-light`, dashed `fi-border` rule, `fi-muted` icon and text, `text-body-sm`), then the service: inline mono number in `fi-muted`, `text-heading-sm` title in `fi-ink`, three `CheckList` ticks.
- The number sits on the title line, never on its own coloured row: the services are a sequence, but the title must lead.
- Grid: `sm:grid-cols-2` (2×2 on desktop).

### Difference Cards (homepage, white section)
- `Card` with an `text-body-lg` bold title and a one- or two-line `text-body-sm` body. No icons: the titles carry the meaning, and the page already has icons in the service strips and ticks.
- Short paragraphs, not bullets: each card explains a belief and its reason. Service cards use bullets because they list what the client gets.
- Grid: `sm:grid-cols-2 lg:grid-cols-3`.

### Report Cards on light surfaces (`ReportCard surface="light"`)
- White card, `fi-border`, `shadow-fi-card`; meta and hook `fi-muted`, title `fi-ink`, hover and "Read Investigation" in `fi-link` (never gold on white). `/reports/` keeps the default dark surface.

### Check List (`CheckList.astro`) and FAQ List (`FaqList.astro`)
- `CheckList`: ticks in `fi-positive` (light) or `fi-gold` (dark); `layout="inline"` for a centred row, e.g. credentials.
- `FaqList`: native `<details>` rows with `fi-border` rules, a `fi-link` plus that turns into a cross when open, and a `fi-link` focus ring. Copy source: `src/lib/faq.ts`.

### Sample Brief (`SampleBrief.astro`)
- A white "document" card on the dark homepage hero, with a rotated `fi-mid` sheet behind it. Previews the brief a client receives after the review call.
- Content rules: labelled "Sample", example profile only, no fund names, no returns or projections. All values are illustrative.
- Unlike the removed decorative Deepdive mockup (§13), it shows a real deliverable, so it earns its place.
- Allocation bars: equity `fi-mid`, debt `fi-link`, gold `fi-gold`, white labels inside wide segments, plus a colour key (gold is too light to carry a label).

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
Subtle radial gradient overlay behind content, on every `background="dark"` hero:
```
background: radial-gradient(ellipse 60% 50% at 50% 30%, rgba(251,191,36,0.08) 0%, transparent 55%)
```
Owned by `Hero.astro` (`.fi-hero-glow`, a `position: absolute; inset: 0` layer) — pages do not add it.
Centred at 50% because heroes are stacked and centred (was 85% for the old split hero). Very low
opacity — atmosphere only, not decorative.

### Why FI Section
Same radial gradient treatment as hero.

---

## 11. Transitions

All interactive elements: `transition: all 0.2s`

Hover lift: `transform: translateY(-2px)` — buttons, cards

Motion level: **Subtle** (decided 2026-10-11). Two effects only, both off under `prefers-reduced-motion`:
- **Reveal on scroll:** add `data-reveal="<index>"` to an element; the script in `Layout.astro` plays `animate-fi-rise` (fade + 16px rise, 90ms stagger per index) as it nears the viewport. Elements visible at load never animate, so the first frame is always complete.
- **Page transitions:** `@view-transition { navigation: auto; }` in `Layout.astro`. Report card titles and article H1s share `view-transition-name: report-<slug>`, so the title moves into place. Unsupported browsers load pages normally.

Not used: parallax, scroll-jacking, count-up numbers, carousels.

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
| Custom animations | One only: `fi-rise` for reveal on scroll (§11). Otherwise use Tailwind defaults |
| Playfair Display | Rejected as the report serif candidate — superseded by Newsreader, see `## 2. Typography` |
| Stats Strip section | Removed from page — no traction metrics to justify it yet |
| "Coming Soon" cards | Removed — honest about current content state |
| Freemium promises in UI | Removed — "free to use · no login required" deleted to avoid constraining business model |
| Star ratings / scores | Never used — counter to the platform's analytical positioning |
| Gradient backgrounds on content sections | Removed — blue/teal gradients replaced with flat `fi-light` |
| Deepdive App Mockup (decorative fake-UI: metric tiles, chart bars, window chrome) | Removed — the Deepdive section now shows a real video walkthrough of the app instead (`project_log.md` S22). |
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

### Centre Axis (homepage and `/invest/`)
The homepage hero is stacked and centred at every width, so the sections below share its axis:
- Centre section headings, lead lines and button rows. Use `SectionHeading.astro` for every section heading.
- Keep card text, lists, the FAQ and two-column content left-aligned. Text longer than two or three lines is read from a fixed left edge.
- The homepage ends on a white final section before the dark footer, so two dark bands never touch.

### Layout Tokens
Defined in `tailwind.config.mjs`, shown live at `/styleguide` → Layout Tokens
(`z-fi-header`, `z-fi-menu`, `z-fi-progress`, `shadow-fi-card`, `shadow-fi-card-dark`, `rounded-fi-btn`, `h-fi-header`,
`h-fi-article-nav`/`-mb-fi-article-nav`,
`w-fi-icon`/`h-fi-icon`, `w-fi-icon-lg`/`h-fi-icon-lg`, `max-w-fi-content`). `h-fi-header` and all fixed-header
offset tokens resolve to the shared `--fi-header-h` CSS variable (84px), which is set in `Layout.astro`.

### Article table of contents

Below `xl`, the 48px compact TOC remains sticky and article-contained at `top-fi-article-nav`. It is
hidden while any part of the article hero intersects the viewport and fades in after the hero fully
leaves. Its equal negative margin removes the normal-flow footprint, so the initial article spacing
does not reserve an empty navigation row. The hidden state is invisible, transparent, inert and
pointer-disabled; reduced-motion users receive the same state change without a fade.

If the hero re-enters while focus is inside the compact TOC, focus moves to the hero without
scrolling before the panel closes and the control hides. Without JavaScript, a native
`details`/`summary` TOC is available below `xl`. At `xl` and above, the sticky left rail is the only
TOC in either mode.

The 4px article reading-progress track uses the same shared hero/read-mode state at every viewport:
it is hidden while the hero intersects, fades in at its current document-progress value after the
hero exits, and hides again when the hero re-enters. The `xl` TOC rail remains independently visible.

---

## 15. Enforcement

Rules in this document are enforced in code wherever possible, because written rules alone drifted
(the "no arbitrary values" rule was in `CLAUDE.md` while `text-[10px]` shipped in `ReportCard`).

| Layer | Mechanism |
|-------|-----------|
| Tokens | Role-named colours (`fi-link` vs `fi-gold`, `fi-muted` vs `fi-subtle`) so the right choice is the obvious one; values fixed once in `tailwind.config.mjs` |
| Components | `Button` `surface` prop; `formatDate()` in `src/lib/format.ts` (en-IN, UTC) for every displayed date |
| Lint | `scripts/lint-design.mjs` — scans `src/` (components, scripts and `.md`/`.mdx` content); fails on arbitrary Tailwind values, default palette colours, raw hex, date formatting outside `format.ts`, and secondary/tertiary `<Button>`s without a `surface` |
| Contrast | `scripts/check-contrast.mjs` — every approved token pairing at WCAG AA, read from the live config (tokens must be 6-digit `#RRGGBB`) |
| CI | `.github/workflows/design-checks.yml` runs `npm run lint:design` on pull requests and on pushes to `main` touching `src/`, the scripts, or the config |

Run `npm run lint:design` before committing. If a rule genuinely does not fit, add a token rather
than an exception; the last resort is a same-line `design-lint-allow` comment with a reason.

Not covered automatically: whether a given class (or a `<Button>`'s declared `surface`) actually
matches the light or dark surface it sits on (e.g. gold text placed on white). That is caught by the
token naming, the `/styleguide` pairs, and review.
