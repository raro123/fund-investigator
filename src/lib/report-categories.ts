/** Display labels for report categories, in filter order. */
export const categoryLabels = {
  'Fund Analysis': 'Fund Analysis',
  'Category Comparison': 'Comparisons',
  'Methodology': 'Methodology',
} as const;

export type ReportCategory = keyof typeof categoryLabels;

export function reportCategoryLabel(category: ReportCategory): string {
  return categoryLabels[category];
}
