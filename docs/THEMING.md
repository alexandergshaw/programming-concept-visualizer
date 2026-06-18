# Theming

This app ships four themes — **Light** (`corporate`, the default), **Dark** (`dark`),
**Academic** (`academic`), and **Terminal** (`terminal`) — chosen from the settings gear.
They must all look correct on **every** page, including new ones.

## The one rule

> **Never hardcode a color in a page or concept component. Always use a theme token.**

A hardcoded color like `#1e293b` or `#f8fafc` is frozen to the Light theme. It will look
wrong (often unreadable) in Dark and Terminal. Tokens are redefined per theme, so a
component built from tokens themes itself for free.

## How the system works

There is a single source of truth for "which theme is active" — the user's preference,
mirrored to a cookie so the server renders the right theme with no flash. From that one
value, two coordinated layers are driven:

1. **CSS variables** — `src/app/globals.css` defines every token under `:root` (Light) and
   overrides them under `[data-theme="dark"]`, `[data-theme="academic"]`, and
   `[data-theme="terminal"]`. `Providers` sets `data-theme` on `<html>`.
2. **MUI theme** — `components/common/Providers.tsx` has a matching `createTheme` palette for
   each theme. MUI components (`<Typography>`, `<Paper>`, `<Button>`…) pull their default
   colors from this palette, so unstyled MUI is already themed.

You consume the system through **tokens**, not by reading the preference yourself.

## Tokens

Defined for all four themes in [`src/app/globals.css`](../src/app/globals.css):

| Token | Purpose |
| --- | --- |
| `--paper` | Page background |
| `--paper-raised` | Cards / panels that sit above the page |
| `--paper-sunken` | Inset / subtle fills |
| `--ink` | Primary text |
| `--ink-soft` | Secondary / muted text |
| `--ink-faint` | Tertiary text: captions, hints |
| `--line` | Hairline borders / dividers |
| `--line-strong` | Heavier divider / card outline |
| `--accent` / `--accent-strong` | Brand accent (links, emphasis) |
| `--accent-bg` | Soft accent highlight fill |
| `--code-bg` / `--code-fg` | Code & "console" panels and their text |
| `--info` / `--info-bg` | Blue — neutral emphasis |
| `--success` / `--success-bg` | Green — positive / done |
| `--warning` / `--warning-bg` | Amber — caution |
| `--danger` / `--danger-bg` | Red — error / stop |
| `--feature` / `--feature-bg` | Violet — decorative accent / variety |

Each status family is a readable **foreground** plus a **soft fill** (`-bg`) to sit behind it.
In Terminal the families collapse toward phosphor green so the retro look holds; in Academic
they become warm and muted. That happens automatically — you just use the token.

## Using tokens

**In MUI `sx` (the common case).** `sx` accepts CSS-variable strings, so a token is a drop-in
replacement for a hex literal:

```tsx
// ❌ frozen to Light
<Typography sx={{ color: '#1e293b' }}>Heading</Typography>
<Paper sx={{ bgcolor: '#eff6ff', border: '1px solid #bfdbfe' }} />

// ✅ themes itself
<Typography sx={{ color: 'var(--ink)' }}>Heading</Typography>
<Paper sx={{ bgcolor: 'var(--info-bg)', border: '1px solid var(--info)' }} />
```

**Even better — lean on MUI defaults.** Often you don't need an explicit color at all.
A plain `<Typography>` already uses themed text; `<Typography color="text.secondary">`,
`color="primary"`, and `<Divider>` all read the palette. Reach for a token when you need a
specific semantic color (a green "done" chip, a blue info panel).

**In `.css` files / `className`.** Use the variable directly:

```css
.empty-page-prompt { color: var(--ink-soft); background: var(--paper-raised); }
```

## Color → token cheat sheet

When adapting an existing snippet or AI-generated code, map the usual Tailwind-ish hexes:

| Hardcoded | Token |
| --- | --- |
| `#fff`, `#ffffff` (card) | `var(--paper-raised)` |
| `#f8fafc`, `#f1f5f9` (inset) | `var(--paper-sunken)` |
| `#1e293b`, `#0f172a` (heading text) | `var(--ink)` |
| `#475569`, `#64748b` (body/muted) | `var(--ink-soft)` |
| `#94a3b8` (caption) | `var(--ink-faint)` |
| `#e2e8f0`, `#e5e7eb` (border) | `var(--line)` |
| `#cbd5e1`, `#d1d5db` (border) | `var(--line-strong)` |
| `#3b82f6` / `#eff6ff` | `var(--info)` / `var(--info-bg)` |
| `#10b981`, `#0d9488` / `#ecfdf3` | `var(--success)` / `var(--success-bg)` |
| `#f59e0b` / `#fff7ed` | `var(--warning)` / `var(--warning-bg)` |
| `#ef4444` / `#fef2f2` | `var(--danger)` / `var(--danger-bg)` |
| `#8b5cf6` / `#f5f3ff` | `var(--feature)` / `var(--feature-bg)` |
| `#0f172a` code block | `var(--code-bg)` + `var(--code-fg)` |

`rgba(...)` used purely for shadows/overlays (e.g. `boxShadow`) is fine to leave as-is — it
layers over any theme.

## Checklist for a new page

- [ ] No hex color literals in the component. (`grep -nE '#[0-9a-fA-F]{3,6}'` your file.)
- [ ] Surfaces use `--paper*`, text uses `--ink*`, borders use `--line*`.
- [ ] Semantic colors use the `--info/--success/--warning/--danger/--feature` families.
- [ ] Add the file to the allowlist in [`tests/unit/theming.test.ts`](../tests/unit/theming.test.ts)
      so the guard keeps it clean.
- [ ] Eyeball it in **Dark** and **Terminal** via the settings gear before you're done.

## Reference implementation

The **Project Management** topic
([`components/pageComponents/ProjectManagement/`](../components/pageComponents/ProjectManagement))
is built entirely from tokens — copy its patterns when adding new pages.

## Adding or changing a token

1. Add it under `:root` in `globals.css` **and** in all three `[data-theme=...]` blocks
   (Light, Academic, Dark, Terminal) — keep the names identical.
2. If it has a natural MUI palette equivalent, keep the two in sync (e.g. `--info` ≈
   `palette.info.main` in `Providers.tsx`).
3. Document it in the token table above.
