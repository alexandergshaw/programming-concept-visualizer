import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Contract tests for the CSS-variable theme layer in src/app/globals.css.
 *
 * These guard the invariants that make the four themes work:
 *  - every theme overrides the same set of tokens (no token defined for one
 *    theme but forgotten in another);
 *  - :root (the Light default) defines every token, so nothing is undefined;
 *  - no component or stylesheet references a token that doesn't exist.
 */

const REPO_ROOT = join(__dirname, '..', '..', '..');
const GLOBALS = readFileSync(join(REPO_ROOT, 'src', 'app', 'globals.css'), 'utf8');

// The semantic palette every theme must define. (--background/--foreground are
// derived aliases that only live in :root.)
const REQUIRED_TOKENS = [
  'paper', 'paper-raised', 'paper-sunken',
  'ink', 'ink-soft', 'ink-faint',
  'line', 'line-strong',
  'accent', 'accent-strong', 'accent-bg',
  'code-bg', 'code-fg',
  'info', 'info-bg',
  'success', 'success-bg',
  'warning', 'warning-bg',
  'danger', 'danger-bg',
  'feature', 'feature-bg',
  'chrome-bg', 'chrome-fg', 'chrome-border',
  'scrollbar-thumb',
];

const THEME_SELECTORS: Record<string, string> = {
  root: ':root',
  academic: '[data-theme="academic"]',
  dark: '[data-theme="dark"]',
  terminal: '[data-theme="terminal"]',
};

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Body of the first rule matching `selector { ... }` (token blocks are flat). */
function ruleBody(selector: string): string {
  const m = GLOBALS.match(new RegExp(escapeRegExp(selector) + '\\s*\\{([^}]*)\\}'));
  return m ? m[1] : '';
}

function tokensDefinedIn(selector: string): Set<string> {
  return new Set([...ruleBody(selector).matchAll(/--([\w-]+)\s*:/g)].map((m) => m[1]));
}

function tokenValue(selector: string, token: string): string | undefined {
  const m = ruleBody(selector).match(new RegExp('--' + token + ':\\s*([^;]+);'));
  return m ? m[1].trim() : undefined;
}

describe('globals.css theme tokens', () => {
  it('defines all four theme blocks', () => {
    for (const [name, sel] of Object.entries(THEME_SELECTORS)) {
      expect({ name, hasTokens: tokensDefinedIn(sel).size > 0 }).toEqual({ name, hasTokens: true });
    }
  });

  it(':root defines every required token plus the derived aliases', () => {
    const root = tokensDefinedIn(':root');
    const missing = REQUIRED_TOKENS.filter((t) => !root.has(t));
    expect(missing).toEqual([]);
    expect(root.has('background')).toBe(true);
    expect(root.has('foreground')).toBe(true);
  });

  it.each(['academic', 'dark', 'terminal'])(
    'theme "%s" overrides exactly the required token set (parity with the others)',
    (theme) => {
      const defined = tokensDefinedIn(THEME_SELECTORS[theme]);
      const missing = REQUIRED_TOKENS.filter((t) => !defined.has(t));
      const extra = [...defined].filter((t) => !REQUIRED_TOKENS.includes(t));
      expect({ theme, missing, extra }).toEqual({ theme, missing: [], extra: [] });
    },
  );

  it('the three theme overrides define an identical set of tokens', () => {
    const academic = [...tokensDefinedIn(THEME_SELECTORS.academic)].sort();
    const dark = [...tokensDefinedIn(THEME_SELECTORS.dark)].sort();
    const terminal = [...tokensDefinedIn(THEME_SELECTORS.terminal)].sort();
    expect(dark).toEqual(academic);
    expect(terminal).toEqual(academic);
  });

  it('every token in a theme block is also defined in :root', () => {
    const root = tokensDefinedIn(':root');
    for (const theme of ['academic', 'dark', 'terminal']) {
      const orphans = [...tokensDefinedIn(THEME_SELECTORS[theme])].filter((t) => !root.has(t));
      expect({ theme, orphans }).toEqual({ theme, orphans: [] });
    }
  });

  it('each :root token has a plausible color/gradient value', () => {
    const root = tokensDefinedIn(':root');
    const bad: string[] = [];
    for (const t of root) {
      const v = tokenValue(':root', t) ?? '';
      if (!/^(#[0-9a-fA-F]{3,8}|rgb|rgba|hsl|linear-gradient|var\()/.test(v)) {
        bad.push(`${t}: ${v}`);
      }
    }
    expect(bad).toEqual([]);
  });

  it('themes actually differ — key surface/text tokens are distinct per theme', () => {
    const papers = ['root', 'academic', 'dark', 'terminal'].map((k) =>
      tokenValue(THEME_SELECTORS[k], 'paper'),
    );
    const inks = ['root', 'academic', 'dark', 'terminal'].map((k) =>
      tokenValue(THEME_SELECTORS[k], 'ink'),
    );
    expect(new Set(papers).size).toBe(4);
    expect(new Set(inks).size).toBe(4);
  });
});

// --- No component/stylesheet references an undefined token ------------------

// Fonts are injected by next/font on <body>, not declared in globals.css.
const EXTERNAL_VARS = new Set(['font-geist-sans', 'font-geist-mono', 'font-serif']);

function walk(dir: string, exts: RegExp): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === 'node_modules' || name === '.next') continue;
      out.push(...walk(p, exts));
    } else if (exts.test(name)) {
      out.push(p);
    }
  }
  return out;
}

describe('theme token references', () => {
  it('every var(--token) used in components/styles is defined in :root', () => {
    const defined = tokensDefinedIn(':root');
    const files = [
      ...walk(join(REPO_ROOT, 'components'), /\.(tsx|ts|css)$/),
      ...walk(join(REPO_ROOT, 'styles'), /\.css$/),
      ...walk(join(REPO_ROOT, 'src', 'app'), /\.(tsx|ts|css)$/),
    ];

    const undefinedRefs: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, 'utf8');
      for (const m of src.matchAll(/var\(\s*--([\w-]+)/g)) {
        const token = m[1];
        if (!defined.has(token) && !EXTERNAL_VARS.has(token)) {
          undefinedRefs.push(`${file.replace(REPO_ROOT, '').replace(/\\/g, '/')}: --${token}`);
        }
      }
    }
    expect([...new Set(undefinedRefs)]).toEqual([]);
  });
});
