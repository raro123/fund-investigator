#!/usr/bin/env node
/**
 * Contrast check — every approved text/background pairing must meet WCAG AA.
 *
 * Colours are read from tailwind.config.mjs, so changing a token re-tests every
 * pairing that uses it. To use a new combination on the site, add it to `pairs`
 * first; if it fails here it will fail for readers too.
 *
 * Thresholds: 4.5:1 for text, 3:1 for large text and non-text UI (focus rings,
 * input borders) per WCAG 2.2 SC 1.4.3 / 1.4.11.
 *
 * Usage: node scripts/check-contrast.mjs   (part of `npm run lint:design`)
 */
import config from '../tailwind.config.mjs';

const colours = { white: '#FFFFFF', ...config.theme.extend.colors };

const TEXT = 4.5;
const UI = 3;

// [foreground, background, minimum, where it is used]
const pairs = [
  // Light surfaces
  ['fi-ink', 'white', TEXT, 'Headings and body on white'],
  ['fi-ink', 'fi-light', TEXT, 'Headings and body on light sections'],
  ['fi-muted', 'white', TEXT, 'Secondary copy, article body on white'],
  ['fi-muted', 'fi-light', TEXT, 'Secondary copy on light sections'],
  ['fi-link', 'white', TEXT, 'Links and link hovers on white'],
  ['fi-link', 'fi-light', TEXT, 'Links and link hovers on light sections'],
  ['fi-positive', 'white', TEXT, 'Positive returns in tables'],
  ['fi-negative', 'white', TEXT, 'Negative returns in tables'],
  ['fi-neutral', 'white', TEXT, 'Unchanged values in tables'],
  ['fi-neutral', 'fi-light', TEXT, 'Unchanged values on light sections'],

  // Dark surfaces
  ['fi-ink-inv', 'fi-dark', TEXT, 'Headings and body on dark sections'],
  ['fi-ink-inv', 'fi-mid', TEXT, 'Headings on dark cards'],
  ['fi-muted-inv', 'fi-dark', TEXT, 'Secondary copy on dark sections'],
  ['fi-muted-inv', 'fi-mid', TEXT, 'Secondary copy on dark cards'],
  ['fi-subtle', 'fi-dark', TEXT, 'Labels and meta text on dark sections'],
  ['fi-subtle', 'fi-mid', TEXT, 'Labels and meta text on dark cards'],
  ['fi-gold', 'fi-dark', TEXT, 'Gold text and links on dark sections'],
  ['fi-gold', 'fi-mid', TEXT, 'Gold CTA text on dark cards'],

  // Buttons
  ['fi-ink', 'fi-gold', TEXT, 'Primary button label'],
  ['fi-ink', 'fi-gold-hover', TEXT, 'Primary button label on hover'],

  // Non-text UI
  ['fi-link', 'white', UI, 'Focus rings on light surfaces'],
  ['fi-gold', 'fi-dark', UI, 'Focus rings on dark surfaces'],
];

function luminance(hex) {
  const value = hex.replace('#', '');
  const channels = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(fg, bg) {
  const [light, dark] = [luminance(fg), luminance(bg)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

let failures = 0;

for (const [fg, bg, min, usage] of pairs) {
  if (!colours[fg] || !colours[bg]) {
    console.error(`  MISSING  ${fg} on ${bg} — token not found in tailwind.config.mjs`);
    failures += 1;
    continue;
  }
  const value = ratio(colours[fg], colours[bg]);
  const pass = value >= min;
  if (!pass) failures += 1;
  const line = `  ${pass ? 'pass' : 'FAIL'}  ${value.toFixed(2).padStart(5)}:1 (min ${min})  ${fg} on ${bg}  — ${usage}`;
  (pass ? console.log : console.error)(line);
}

if (failures > 0) {
  console.error(`\nContrast check: ${failures} pairing(s) below WCAG AA.`);
  process.exit(1);
}

console.log(`\nContrast check: all ${pairs.length} pairings meet WCAG AA.`);
