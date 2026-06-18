import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Theme-compliance guard.
 *
 * Components in the list below must not contain hardcoded hex colors — every
 * color must come from a theme token (e.g. `var(--ink)`) so the four themes
 * (Light / Dark / Academic / Terminal) all render correctly. See docs/THEMING.md.
 *
 * When you build a new page the token-compliant way, ADD IT HERE so the guard
 * keeps it from regressing. (The wider legacy codebase still has hardcoded
 * colors and is migrated opportunistically — this list is the clean set.)
 */
const THEME_COMPLIANT_FILES = [
  'components/pageComponents/ProjectManagement/ProjectManagementPage.tsx',
  'components/pageComponents/ProjectManagement/ProjectLifecycleConcept.tsx',
  'components/pageComponents/ProjectManagement/MethodologiesConcept.tsx',
  'components/pageComponents/ProjectManagement/ScrumConcept.tsx',
  'components/pageComponents/Python/NumericExpressionsConcept.tsx',
  'components/pageComponents/Python/AccumulatorPatternConcept.tsx',
  'components/pageComponents/Python/MathLibraryConcept.tsx',
  'components/common/GenericIntroduction.tsx',
  'components/common/ScrumBoard.tsx',
];

// Matches #rgb / #rrggbb color literals. rgba()/hsl() (used for shadows and
// overlays that layer over any theme) are intentionally allowed.
const HEX_COLOR = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/;

const REPO_ROOT = join(__dirname, '..', '..');

describe('theme compliance', () => {
  it.each(THEME_COMPLIANT_FILES)('%s uses theme tokens, not hardcoded hex colors', (file) => {
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
