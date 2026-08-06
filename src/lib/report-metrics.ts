export const reportMetricIconNames = [
  'rulebook',
  'pie-chart',
  'compass',
  'trending-up',
  'shield',
  'repeat',
] as const;

export type ReportMetricIconName = typeof reportMetricIconNames[number];
