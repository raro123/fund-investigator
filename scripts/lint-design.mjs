#!/usr/bin/env node
/**
 * Design-system lint — fails when code bypasses the fi-* tokens or shared helpers.
 *
 * Rules (each one is a mistake that has shipped before):
 *   arbitrary-value   Tailwind arbitrary values like text-[10px] or bg-[#1E3A5F].
 *                     Add a token to tailwind.config.mjs instead. Arbitrary
 *                     *variants* such as data-[active=true]: are allowed.
 *   palette-colour    Default Tailwind palette classes (gray-100, border-t-blue-700…).
 *                     Use an fi-* colour token. white/black are allowed.
 *   raw-hex           Hex colours anywhere in src/ (markup, scripts, content).
 *                     Use an fi-* colour token.
 *   date-format       toLocaleDateString / toLocaleString / Intl.DateTimeFormat
 *                     outside src/lib/format.ts. Use formatDate() so every date
 *                     is en-IN.
 *   button-surface    <Button variant="secondary|tertiary"> without a surface
 *                     prop. Their colours differ per surface, and the light
 *                     default is invisible on dark sections.
 *
 * Escape hatch: add `design-lint-allow` in a comment on the same line, with a
 * reason. Prefer adding a token.
 *
 * Usage: node scripts/lint-design.mjs   (part of `npm run lint:design`)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const srcDir = join(root, 'src');
const extensions = new Set(['.astro', '.ts', '.tsx', '.js', '.mjs', '.md', '.mdx']);

// Files whose raw values are intentional and documented.
const allow = {
  'raw-hex': new Set([
    'src/components/Logo.astro', // brand SVG fills
    'src/lib/og-card.ts', // satori social cards — rendered outside Tailwind
  ]),
  'date-format': new Set([
    'src/lib/format.ts', // the one shared formatter
  ]),
};

const palette = 'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';
const utilities = 'bg|text|border(?:-[trblxyse])?|ring|ring-offset|divide|from|via|to|decoration|outline|fill|stroke|placeholder|shadow|accent|caret';

const rules = [
  {
    id: 'arbitrary-value',
    // utility-[value] not followed by ':' (which would make it a variant)
    pattern: /(?<![\w-])-?[a-z][a-z0-9-]*-\[[^\]\s]+\](?!:)/g,
    message: 'Arbitrary Tailwind value — add a token to tailwind.config.mjs',
  },
  {
    id: 'palette-colour',
    pattern: new RegExp(`(?<![\\w-])(?:${utilities})-(?:${palette})-\\d{2,3}(?![\\w-])`, 'g'),
    message: 'Default palette colour — use an fi-* colour token',
  },
  {
    id: 'raw-hex',
    pattern: /(?<![&\w])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})(?![\w-])/g,
    message: 'Raw hex colour — use an fi-* colour token',
  },
  {
    id: 'date-format',
    pattern: /\btoLocale(?:Date|Time)?String\s*\(|\bIntl\.DateTimeFormat\s*\(/g,
    message: 'Ad-hoc date formatting — use formatDate() from src/lib/format.ts',
  },
];

// Whole-tag check: a <Button> may span several lines.
const buttonTag = /<Button\b[^>]*>/g;
const surfaceDependentVariant = /\bvariant=["'](?:secondary|tertiary)["']/;

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (extensions.has(extname(entry.name))) yield path;
  }
}

const problems = [];

for (const file of walk(srcDir)) {
  const rel = relative(root, file).split('\\').join('/');
  const source = readFileSync(file, 'utf8');
  const lines = source.split('\n');

  lines.forEach((line, index) => {
    if (line.includes('design-lint-allow')) return;
    for (const rule of rules) {
      if (allow[rule.id]?.has(rel)) continue;
      for (const match of line.matchAll(rule.pattern)) {
        problems.push(`${rel}:${index + 1}  ${rule.id}  ${match[0]}  — ${rule.message}`);
      }
    }
  });

  for (const match of source.matchAll(buttonTag)) {
    if (!surfaceDependentVariant.test(match[0]) || /\bsurface=/.test(match[0])) continue;
    const lineNumber = source.slice(0, match.index).split('\n').length;
    if (lines[lineNumber - 1].includes('design-lint-allow')) continue;
    problems.push(`${rel}:${lineNumber}  button-surface  ${match[0].split('\n')[0]}  — pass surface="light" or surface="dark"`);
  }
}

if (problems.length > 0) {
  console.error(`Design lint: ${problems.length} problem(s)\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  console.error('\nSee docs/style_spec.md §1 and CLAUDE.md for the rules.');
  process.exit(1);
}

console.log('Design lint: no problems found.');
