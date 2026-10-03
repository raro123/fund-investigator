/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {

      // ─────────────────────────────────────────
      // SEMANTIC COLOR TOKENS
      //
      // Single source of truth. Change a value here once,
      // every component using that token updates automatically.
      //
      // Usage in components: bg-fi-dark, text-fi-gold, border-fi-border
      // ─────────────────────────────────────────
      colors: {

        // --- STRUCTURAL BACKGROUNDS ---
        // fi-dark:   Hero · Why FI · Footer sections
        // fi-mid:    Unused for now — available for cards on dark bg
        // fi-light:  Alternating light sections (Problem · Email Capture)
        'fi-dark':   '#020617',   // slate-950
        'fi-mid':    '#1E293B',   // slate-800 (dark card surfaces, label pill bg)
        'fi-light':  '#F1F5F9',   // slate-100 — was slate-200, which read grey and dropped fi-muted below 4.5:1

        // --- PRIMARY TEXT ---
        // fi-ink:      Primary text on light bg
        // fi-muted:    Secondary body copy on light bg — LIGHT SURFACES ONLY (2.6:1 on fi-dark)
        // fi-subtle:   Labels and meta text on dark bg / dark cards (fails on light)
        'fi-ink':    '#020617',   // slate-950
        'fi-muted':  '#475569',   // slate-600 — was slate-500 (3.9:1 on the old fi-light)
        'fi-subtle': '#94A3B8',   // slate-400

        // --- INVERSE TEXT (on dark sections) ---
        // fi-ink-inv:   Primary text on dark bg
        // fi-muted-inv: Secondary text on dark bg (col headings, footer links)
        'fi-ink-inv':   '#F8FAFC',  // slate-50
        'fi-muted-inv': '#CBD5E1',  // slate-300

        // --- ACCENT ---
        // fi-gold:       Primary button bg · H1 emphasis · gold text/links ON DARK ONLY
        //                (1.7:1 on white — never use as text, hover or focus ring on light)
        // fi-gold-hover: Button hover only
        // fi-link:       The gold family on light surfaces: text links, link hovers, focus rings
        'fi-gold':       '#FBBF24',  // amber-400
        'fi-gold-hover': '#FCD34D',  // amber-300
        'fi-link':       '#B45309',  // amber-700 (5.0:1 on white)

        // --- UI CHROME ---
        // fi-border:      Card borders on light · section dividers
        // fi-border-dark: Borders on dark sections
        // fi-icon-bg:     Icon container bg on light
        // fi-icon-bg-inv: Icon container bg on dark
        'fi-border':      '#E2E8F0',  // slate-200
        'fi-border-dark': '#334155',  // slate-700
        'fi-icon-bg':     '#F1F5F9',  // slate-100
        'fi-icon-bg-inv': '#1E293B',  // slate-800

        // --- SECTION LABEL PILL ---
        // (two variants: light + dark section)
        // Light: bg fi-icon-bg · border fi-border · text fi-muted
        // Dark:  bg fi-mid     · border fi-border-dark · text fi-muted-inv

        // --- SEMANTIC STATES ---
        // For data tables on light surfaces: positive returns, negative returns.
        // Never rely on colour alone — always pair with a sign (+/−) or arrow.
        'fi-positive': '#047857',  // emerald-700 — was emerald-500 (2.5:1 on white)
        'fi-negative': '#B91C1C',  // red-700 — was red-500 (3.8:1 on white)
        'fi-neutral':  '#475569',  // slate-600 — was slate-500 (4.3:1 on fi-light)
      },

      // Every approved text/background pairing above is contrast-tested by
      // `npm run lint:design` (scripts/check-contrast.mjs). Add a pair there
      // before using a new combination.

      // ─────────────────────────────────────────
      // TYPOGRAPHY
      // Sans: Inter — site-wide UI chrome (nav, buttons, cards, body copy outside articles)
      // Serif: Newsreader — report article content only: h1, deck, all heading levels, body
      //   copy, lists, pull-quotes, and markdown tables (see src/layouts/ArticleLayout.astro).
      //   Loaded via @fontsource/newsreader in Layout.astro. Weights: 400 · 700 only.
      // Mono: for tabular financial data
      // ─────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },

      // Font scale — 1.250 ratio
      // Weights loaded: 400 · 500 · 600 · 700 · 800
      //
      // NAMING NOTE:
      // Codebase uses: text-display-xl/lg/md, text-heading-xl/lg/md/sm, text-body-lg/md/sm, text-caption
      // Config maps those names exactly — do not rename without updating all components.
      // ─────────────────────────────────────────
      // LAYOUT TOKENS
      // Eliminates arbitrary values across components.
      // ─────────────────────────────────────────

      // Z-index scale — replaces z-[10000] etc.
      zIndex: {
        'fi-header':  '100',
        'fi-menu':    '90',
        'fi-progress': '85',
        'fi-overlay': '80',
        'fi-modal':   '70',
      },

      // Shadow scale — replaces inline shadow-[...] values
      boxShadow: {
        'fi-card':      '0 4px 24px rgba(2, 6, 23, 0.08)',
        'fi-card-dark': '0 16px 44px rgba(0, 0, 0, 0.30)',
      },

      // Button border radius
      borderRadius: {
        'fi-btn': '10px',
      },

      // Button + icon spacing tokens
      spacing: {
        'fi-header':      'var(--fi-header-h)',
        'fi-article-nav': '3rem',       // 48px — compact article TOC height/flow compensation
        'fi-btn-x':       '1.625rem',   // 26px
        'fi-btn-x-sm':    '1.125rem',   // 18px
        'fi-btn-y':       '0.8125rem',  // 13px
      },

      // Icon sizing — replaces w-[22px] and w-[34px]
      width: {
        'fi-icon':    '1.375rem',   // 22px — card icons
        'fi-icon-lg': '2.75rem',    // 44px — social icons (WCAG touch target)
      },
      height: {
        'fi-icon':    '1.375rem',
        'fi-icon-lg': '2.75rem',
      },

      // Max-width tokens
      maxWidth: {
        'fi-content': '65ch',       // article prose reading width
        'fi-disclaimer': '60ch',    // compact legal copy below reports
        'fi-lightbox': '92vw',      // enlarged report image
      },

      // Hero H1 tracking/leading, kept constant across the responsive.display sizes
      lineHeight: {
        'fi-display': '1.08',
      },
      letterSpacing: {
        'fi-display': '-0.02em',
        'fi-label': '0.13em',       // section label pills (matches text-caption)
      },

      // Deepdive showcase frame: matched to each video rendition
      aspectRatio: {
        'fi-portrait': '9 / 16',
        'fi-tablet': '3 / 4',
      },

      // Pressed-state shrink for submit buttons
      scale: {
        'fi-press': '0.98',
      },

      // Symmetrical side rails keep the 65ch article column optically centred
      // while reserving the left rail for in-page navigation at xl widths.
      gridTemplateColumns: {
        'fi-article': 'minmax(12rem, 1fr) minmax(0, 65ch) minmax(12rem, 1fr)',
      },

      inset: {
        'fi-header': 'var(--fi-header-h)',
        'fi-article-nav': 'calc(var(--fi-header-h) + 0.25rem)',
        'fi-article': 'calc(var(--fi-header-h) + 1.5rem)',
      },

      maxHeight: {
        'fi-article-toc': 'calc(100vh - var(--fi-header-h) - 3rem)',
        'fi-lightbox': '90vh',
      },

      fontSize: {
        // ── Display ── Hero H1 (use clamp() wrapper in component for fluid sizing)
        'display-xl': ['4.5rem',   { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '800' }], // 72px
        'display-lg': ['3.75rem',  { lineHeight: '1.1',  letterSpacing: '-0.02em', fontWeight: '800' }], // 60px — section headings (large)
        'display-md': ['3rem',     { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '800' }], // 48px

        // ── Headings ──
        'heading-xl': ['2.25rem',  { lineHeight: '1.2',  letterSpacing: '-0.01em', fontWeight: '700' }], // 36px
        'heading-lg': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }], // 30px
        'heading-md': ['1.5rem',   { lineHeight: '1.3',  fontWeight: '700' }],                           // 24px
        'heading-sm': ['1.25rem',  { lineHeight: '1.35', fontWeight: '700' }],                           // 20px

        // ── Body ──
        'body-lg':    ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],  // 18px — lead paragraphs
        'body-md':    ['1rem',     { lineHeight: '1.65', fontWeight: '400' }],  // 16px — standard body
        'body-sm':    ['0.875rem', { lineHeight: '1.6',  fontWeight: '400' }],  // 14px — footer, meta

        // ── Label ── Section label pills · metric tags
        'caption':    ['0.75rem',  { lineHeight: '1.4',  letterSpacing: '0.13em', fontWeight: '700' }], // 12px
      },

    },
  },
  plugins: [
    typography,
    function({ addUtilities }) {
      addUtilities({
        // Aligned decimal points — financial data tables
        '.tabular-nums': { 'font-variant-numeric': 'tabular-nums' },
        // Distinguishes 0 from O
        '.slashed-zero': { 'font-variant-numeric': 'slashed-zero' },
        // Balanced line breaks for headings
        '.text-balance': { 'text-wrap': 'balance' },
        // Hide native scrollbar (horizontal pill/chip strips)
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', // IE/Edge legacy
          'scrollbar-width': 'none', // Firefox
        },
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none', // Chrome/Safari
        },
      });
    },
  ],
};
