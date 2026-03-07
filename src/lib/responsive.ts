/**
 * Responsive typography presets — single source of truth.
 *
 * Import and use instead of writing breakpoint classes inline on pages.
 * Each preset maps a semantic role to a mobile-first breakpoint progression.
 *
 * @example
 * import { responsive } from '../lib/responsive';
 * <h1 class={`${responsive.display} font-bold text-fi-ink-inv`}>Title</h1>
 */
export const responsive = {
  /** Hero H1: 36px -> 48px -> 60px -> 72px */
  display: 'text-4xl sm:text-5xl md:text-6xl lg:text-display-xl',

  /** Section H2 (large): 30px -> 36px -> 48px */
  h2Large: 'text-heading-lg sm:text-heading-xl lg:text-display-md',

  /** Section H2 (standard): 24px -> 30px -> 36px */
  h2: 'text-heading-md sm:text-heading-lg lg:text-heading-xl',

  /** Subsection H3: 20px -> 24px */
  h3: 'text-heading-sm sm:text-heading-md',

  /** Lead/subtitle: 16px -> 18px */
  subtitle: 'text-body-md sm:text-body-lg',
} as const;
