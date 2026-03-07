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
        // fi-light:  Problem · Deepdive · Email Capture sections
        'fi-dark':   '#020617',   // slate-950
        'fi-mid':    '#1E293B',   // slate-800 (dark card surfaces, label pill bg)
        'fi-light':  '#E2E8F0',   // slate-200 (alternating light sections)

        // --- PRIMARY TEXT ---
        // fi-ink:      Primary text on light bg, primary text on dark bg (via opacity)
        // fi-muted:    Secondary body copy on light bg
        // fi-subtle:   Tertiary / placeholder text
        'fi-ink':    '#020617',   // slate-950
        'fi-muted':  '#64748B',   // slate-500
        'fi-subtle': '#94A3B8',   // slate-400

        // --- INVERSE TEXT (on dark sections) ---
        // fi-ink-inv:   Primary text on dark bg
        // fi-muted-inv: Secondary text on dark bg (col headings, footer links)
        'fi-ink-inv':   '#F8FAFC',  // slate-50
        'fi-muted-inv': '#CBD5E1',  // slate-300

        // --- ACCENT ---
        // fi-gold:       Buttons (all bg), H1 emphasis word on dark bg
        // fi-gold-hover: Button hover only
        'fi-gold':       '#FBBF24',  // amber-400
        'fi-gold-hover': '#FCD34D',  // amber-300

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
        // For data tables: positive returns, negative returns
        'fi-positive': '#10B981',  // emerald-500
        'fi-negative': '#EF4444',  // red-500
        'fi-neutral':  '#64748B',  // slate-500
      },

      // ─────────────────────────────────────────
      // TYPOGRAPHY
      // Font: Inter only (loaded via @fontsource/inter in Layout.astro)
      // Mono: for tabular financial data
      // ─────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
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
        'fi-btn-x':    '1.625rem',   // 26px
        'fi-btn-x-sm': '1.125rem',   // 18px
        'fi-btn-y':    '0.8125rem',  // 13px
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
      });
    },
  ],
};
