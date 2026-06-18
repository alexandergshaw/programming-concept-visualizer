import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

/**
 * Theme-compliance guard.
 *
 * Concept pages must not contain hardcoded hex colors — every color must come
 * from a theme token (e.g. `var(--ink)`) so the four themes (Light / Dark /
 * Academic / Terminal) all render correctly. See docs/THEMING.md.
 *
 * The entire components/pageComponents tree is scanned, so any NEW page is
 * covered automatically. A few shared common components that pages rely on are
 * checked explicitly too.
 */
const EXPLICIT_FILES = [
  'components/common/GenericIntroduction.tsx',
  'components/common/ScrumBoard.tsx',
];

const SCAN_DIRS = ['components/pageComponents'];

// Matches #rgb / #rrggbb color literals. rgba()/hsl() (used for shadows and
// overlays that layer over any theme) are intentionally allowed.
const HEX_COLOR = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/;

const REPO_ROOT = join(__dirname, '..', '..');

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(tsx|ts)$/.test(name)) out.push(p);
  }
  return out;
}

const files = [
  ...SCAN_DIRS.flatMap((d) => walk(join(REPO_ROOT, d))).map((p) =>
    relative(REPO_ROOT, p).split('\\').join('/'),
  ),
  ...EXPLICIT_FILES,
];

describe('theme compliance', () => {
  it.each(files)('%s uses theme tokens, not hardcoded hex colors', (file) => {
    const source = readFileSync(join(REPO_ROOT, file), 'utf8');
    // Each offender is rendered as "L<n>: <line>" so a failure points straight
    // at the hardcoded color to replace with a token (see docs/THEMING.md).
    const offenders = source
      .split('\n')
      .map((line, i) => ({ line: line.trim(), number: i + 1 }))
      .filter(({ line }) => HEX_COLOR.test(line))
      .map((o) => `L${o.number}: ${o.line}`);

    expect(offenders).toEqual([]);
  });
});
