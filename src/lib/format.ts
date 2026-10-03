/**
 * Date formatting — single source of truth for every date shown on the site.
 *
 * Indian English (en-IN) for an Indian readership: day before month. Formatted
 * in UTC so a YYYY-MM-DD frontmatter date never shifts by a day with the build
 * machine's timezone. `npm run lint:design` rejects toLocaleDateString /
 * Intl.DateTimeFormat anywhere else in src/.
 *
 * @example
 * formatDate('2026-07-15', 'short') // "15 Jul 2026"  — cards, compact meta
 * formatDate('2026-07-15')          // "15 July 2026" — article metadata, notices
 * formatDate('2026-07-15', 'month') // "July 2026"    — social cards
 * formatDate('2026-07-15', 'monthShort') // "Jul 2026" — compact labels
 */
export type DateStyle = 'short' | 'long' | 'month' | 'monthShort';

const styles: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { day: 'numeric', month: 'short', year: 'numeric' },
  long: { day: 'numeric', month: 'long', year: 'numeric' },
  month: { month: 'long', year: 'numeric' },
  monthShort: { month: 'short', year: 'numeric' },
};

const formatters = Object.fromEntries(
  Object.entries(styles).map(([style, options]) => [
    style,
    new Intl.DateTimeFormat('en-IN', { ...options, timeZone: 'UTC' }),
  ]),
) as Record<DateStyle, Intl.DateTimeFormat>;

/** Format a YYYY-MM-DD content date for display. */
export function formatDate(date: string, style: DateStyle = 'long'): string {
  return formatters[style].format(new Date(`${date}T00:00:00Z`));
}
