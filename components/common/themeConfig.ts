// Pure, server-safe theme constants — no 'use client', so both the server
// layout and client components can import these. The React hooks that read/write
// the preference live in ./settings (client only).

export const THEMES = ['corporate', 'dark', 'academic', 'terminal'] as const;
export type ThemePreference = (typeof THEMES)[number];

export const DEFAULT_THEME: ThemePreference = 'corporate';

export const THEME_KEY = 'pcv:theme';
// Mirrored to a cookie so the server can render the right theme (no flash).
// Cookie names can't contain ':', so use an underscore here.
export const THEME_COOKIE = 'pcv_theme';

/** Coerce an arbitrary value to a known theme, falling back to the default. */
export function normalizeTheme(value: string | null | undefined): ThemePreference {
  return (THEMES as readonly string[]).includes(value ?? '')
    ? (value as ThemePreference)
    : DEFAULT_THEME;
}
