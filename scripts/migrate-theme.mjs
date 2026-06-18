// One-off migration: replace hardcoded hex colors in concept pages with theme
// tokens (see docs/THEMING.md). Run a dry run first (no flag), then `--apply`.
//
//   node scripts/migrate-theme.mjs            # report only
//   node scripts/migrate-theme.mjs --apply    # rewrite files
//
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Directories to migrate. pageComponents is already clean (idempotent re-run);
// this pass also covers shared common components and the standalone stylesheets.
const ROOTS = ['components/pageComponents', 'components/common', 'styles'].map((p) =>
  join(process.cwd(), p),
);
// Intentional, theme-independent colors handled elsewhere or by design:
//  - Providers: defines the MUI palettes (the token source of truth)
//  - TechIcon: deliberate brand tints (already special-cases the terminal theme)
//  - PythonConsole*: a simulated dark terminal, themed by hand with code-bg/fg
const EXCLUDE = new Set([
  'Providers.tsx',
  'TechIcon.tsx',
  'PythonConsoleStatic.tsx',
  'PythonConsoleAnimation.tsx',
]);
const APPLY = process.argv.includes('--apply');

// Explicit map for neutrals/grays/slates (which a hue classifier would wrongly
// route into the blue family) and well-known palette values. Keys are lowercase.
const OVERRIDES = {
  // --- surfaces: near-white -------------------------------------------------
  '#fff': 'paper-raised', '#ffffff': 'paper-raised', '#fafafa': 'paper-raised',
  '#f9fafb': 'paper-raised', '#fafbff': 'paper-raised', '#f7f7f7': 'paper-raised',
  '#f8f9fa': 'paper-raised', '#f5f7fa': 'paper-raised', '#f4f6fa': 'paper-raised',
  '#f3f6fa': 'paper-raised', '#f3f6ff': 'paper-raised', '#f0f4fa': 'paper-raised',
  '#f5f5f5': 'paper-raised', '#f4f4f4': 'paper-raised', '#f0f0f0': 'paper-raised',
  // --- surfaces: light inset fills -----------------------------------------
  '#f8fafc': 'paper-sunken', '#f1f5f9': 'paper-sunken', '#eee': 'paper-sunken',
  '#e0e0e0': 'paper-sunken', '#dee2e6': 'paper-sunken', '#e0e4ea': 'paper-sunken',
  '#d4d4d4': 'paper-sunken',
  // --- borders --------------------------------------------------------------
  '#e2e8f0': 'line', '#e5e7eb': 'line', '#ddd': 'line', '#ccc': 'line',
  '#cbd5e1': 'line-strong', '#d1d5db': 'line-strong', '#bdbdbd': 'line-strong',
  '#bbb': 'line-strong',
  // --- neutral text tiers ---------------------------------------------------
  '#94a3b8': 'ink-faint', '#9ca3af': 'ink-faint', '#9e9e9e': 'ink-faint',
  '#aaa': 'ink-faint', '#888': 'ink-faint',
  '#64748b': 'ink-soft', '#475569': 'ink-soft', '#6b7280': 'ink-soft',
  '#607d8b': 'ink-soft', '#495057': 'ink-soft', '#777': 'ink-soft',
  '#666': 'ink-soft', '#555': 'ink-soft', '#795548': 'ink-soft',
  '#334155': 'ink', '#374151': 'ink', '#1e293b': 'ink', '#444': 'ink',
  '#424242': 'ink', '#404040': 'ink', '#333': 'ink',
  // --- dark panels (code/console backgrounds) -------------------------------
  '#0f172a': 'code-bg', '#23272f': 'code-bg', '#222': 'code-bg',
  // --- blue: info -----------------------------------------------------------
  '#1976d2': 'info', '#2196f3': 'info', '#3b82f6': 'info', '#2563eb': 'info',
  '#3f51b5': 'info', '#0066cc': 'info', '#1565c0': 'info', '#0d47a1': 'info',
  '#42a5f5': 'info', '#64b5f6': 'info', '#0ea5e9': 'info', '#0369a1': 'info',
  '#0284c7': 'info', '#0288d1': 'info', '#00319b': 'info', '#1e3a8a': 'info',
  '#00bcd4': 'info', '#60a5fa': 'info', '#90caf9': 'info',
  '#e3f2fd': 'info-bg', '#bbdefb': 'info-bg', '#dbeafe': 'info-bg',
  '#bfdbfe': 'info-bg', '#eff6ff': 'info-bg', '#f0f7ff': 'info-bg',
  '#e3f7fc': 'info-bg', '#f0f9ff': 'info-bg',
  // --- green/teal: success --------------------------------------------------
  '#4caf50': 'success', '#10b981': 'success', '#43a047': 'success',
  '#388e3c': 'success', '#219653': 'success', '#2e7d32': 'success',
  '#059669': 'success', '#16a34a': 'success', '#28a745': 'success',
  '#22c55e': 'success', '#166534': 'success', '#15803d': 'success',
  '#81c784': 'success', '#4ade80': 'success', '#14b8a6': 'success',
  '#009688': 'success', '#047857': 'success', '#1b5e20': 'success',
  '#e8f5e9': 'success-bg', '#f0fdf4': 'success-bg', '#e3fcec': 'success-bg',
  '#dcfce7': 'success-bg', '#bbf7d0': 'success-bg', '#ecfdf5': 'success-bg',
  '#f6ffed': 'success-bg', '#f0f9f0': 'success-bg', '#e8f5e8': 'success-bg',
  '#86efac': 'success-bg', '#b7eb8f': 'success-bg',
  // --- orange/amber/yellow: warning ----------------------------------------
  '#ff9800': 'warning', '#ffb300': 'warning', '#f57c00': 'warning',
  '#fbc02d': 'warning', '#f59e0b': 'warning', '#ff5722': 'warning',
  '#e65100': 'warning', '#ffb74d': 'warning', '#ef6c00': 'warning',
  '#ffcc02': 'warning', '#fcd34d': 'warning', '#facc15': 'warning',
  '#f97316': 'warning', '#ea580c': 'warning', '#d84315': 'warning',
  '#ca8a04': 'warning', '#fbbf24': 'warning', '#b45309': 'warning',
  '#92400e': 'warning', '#ffd54f': 'warning', '#ffe082': 'warning',
  '#fff3e0': 'warning-bg', '#fffbeb': 'warning-bg', '#fffde7': 'warning-bg',
  '#fff8e1': 'warning-bg', '#fff8e6': 'warning-bg', '#fff7ed': 'warning-bg',
  '#fef9c3': 'warning-bg', '#fef3c7': 'warning-bg', '#fde68a': 'warning-bg',
  // --- red: danger ----------------------------------------------------------
  '#f44336': 'danger', '#e53935': 'danger', '#dc2626': 'danger',
  '#d32f2f': 'danger', '#ef4444': 'danger', '#b91c1c': 'danger',
  '#c62828': 'danger', '#991b1b': 'danger', '#cc0000': 'danger',
  '#e57373': 'danger', '#f87171': 'danger', '#d14': 'danger',
  '#ffebee': 'danger-bg', '#fef2f2': 'danger-bg', '#fee2e2': 'danger-bg',
  '#fff1f0': 'danger-bg', '#fecaca': 'danger-bg', '#ffa39e': 'danger-bg',
  '#fca5a5': 'danger-bg',
  // --- purple/violet/pink: feature -----------------------------------------
  '#9c27b0': 'feature', '#8b5cf6': 'feature', '#9333ea': 'feature',
  '#7b1fa2': 'feature', '#673ab7': 'feature', '#f472b6': 'feature',
  '#ba68c8': 'feature', '#8e24aa': 'feature', '#7e57c2': 'feature',
  '#6a1b9a': 'feature', '#7c43bd': 'feature', '#6366f1': 'feature',
  '#5b21b6': 'feature', '#e91e63': 'feature',
  '#f5f3ff': 'feature-bg', '#ede9fe': 'feature-bg', '#ddd6fe': 'feature-bg',
  '#f3e5f5': 'feature-bg', '#faf5ff': 'feature-bg', '#f3e8ff': 'feature-bg',
  '#e9d5ff': 'feature-bg', '#c7d2fe': 'feature-bg', '#ce93d8': 'feature-bg',
  // --- second pass (styles + common): hue-classifier misses -----------------
  '#0f766e': 'success', // teal, partners with #14b8a6
  '#5d4037': 'warning', '#efebe9': 'warning-bg', '#d7ccc8': 'warning-bg', // FlexibleGrid warm card palette
  '#2b2620': 'code-bg', '#3a322a': 'code-bg', // dark warm panel backgrounds
  '#e3d3b6': 'line-strong', // CalloutBox key-concepts border (sits on --accent-bg)
  '#f3ece0': 'chrome-fg', // sidebar home button, lives on the dark chrome
};

// HSL fallback for any hex not in OVERRIDES.
function hexToRgb(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let hh = 0; const l = (max + min) / 2; const d = max - min;
  let s = 0;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) hh = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) hh = (b - r) / d + 2;
    else hh = (r - g) / d + 4;
    hh *= 60;
  }
  return [hh, s * 100, l * 100];
}
function classify(hex) {
  if (OVERRIDES[hex]) return OVERRIDES[hex];
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  if (s < 12) {
    if (l >= 96) return 'paper-raised';
    if (l >= 88) return 'paper-sunken';
    if (l >= 72) return 'line';
    if (l >= 55) return 'ink-faint';
    if (l >= 35) return 'ink-soft';
    if (l >= 14) return 'ink';
    return 'code-bg';
  }
  const bg = l >= 88;
  let fam;
  if (h < 16 || h >= 345) fam = 'danger';
  else if (h < 70) fam = 'warning';
  else if (h < 170) fam = 'success';
  else if (h < 250) fam = 'info';
  else fam = 'feature';
  return bg ? fam + '-bg' : fam;
}

// Walk .tsx/.ts/.css files, skipping the already-compliant ProjectManagement
// topic and the intentional-color files listed in EXCLUDE.
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      if (name === 'ProjectManagement') continue;
      out.push(...walk(p));
    } else if (/\.(tsx|ts|css)$/.test(name) && !EXCLUDE.has(name)) {
      out.push(p);
    }
  }
  return out;
}

const HEX = /#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
const files = ROOTS.flatMap(walk);
const tokenTally = {};
const seen = {};
let totalReplaced = 0;
let filesChanged = 0;

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  let count = 0;
  const next = src.replace(HEX, (m) => {
    const key = m.toLowerCase();
    const token = classify(key);
    tokenTally[token] = (tokenTally[token] || 0) + 1;
    seen[key] = token;
    count++;
    return `var(--${token})`;
  });
  if (count > 0) {
    totalReplaced += count;
    filesChanged++;
    if (APPLY) writeFileSync(file, next);
  }
}

console.log(`${APPLY ? 'APPLIED' : 'DRY RUN'}: ${totalReplaced} replacements across ${filesChanged} files\n`);
console.log('Token totals:');
for (const [t, c] of Object.entries(tokenTally).sort((a, b) => b[1] - a[1])) {
  console.log(`  --${t}: ${c}`);
}
console.log('\nUnique hex -> token:');
for (const [hex, token] of Object.entries(seen).sort()) {
  console.log(`  ${hex} -> --${token}`);
}
