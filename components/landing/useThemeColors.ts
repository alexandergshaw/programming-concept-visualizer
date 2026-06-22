'use client';

import { useEffect, useState } from 'react';
import { useThemePreference } from '@/components/common/settings';

// Tokens the concept web needs. WebGL materials can't read `var(--…)` directly,
// so we resolve these to concrete hex values from the computed styles on <html>
// and re-resolve whenever the selected theme changes.
const TOKENS = [
  '--info',
  '--success',
  '--warning',
  '--danger',
  '--feature',
  '--accent-strong',
  '--ink',
  '--ink-soft',
  '--paper',
  '--line',
] as const;

export type ThemeColors = Record<string, string>;

// Corporate (default) values, used until the computed styles are read on the
// client and as a safety net if a token is ever missing.
const FALLBACK: ThemeColors = {
  '--info': '#2563eb',
  '--success': '#15803d',
  '--warning': '#b45309',
  '--danger': '#b91c1c',
  '--feature': '#7c3aed',
  '--accent-strong': '#141d33',
  '--ink': '#232733',
  '--ink-soft': '#5f636b',
  '--paper': '#f7f8fa',
  '--line': '#e2e5ea',
};

function readColors(): ThemeColors {
  if (typeof window === 'undefined') return { ...FALLBACK };
  const cs = getComputedStyle(document.documentElement);
  const out: ThemeColors = { ...FALLBACK };
  for (const t of TOKENS) {
    const v = cs.getPropertyValue(t).trim();
    if (v) out[t] = v;
  }
  return out;
}

/**
 * Returns the theme tokens resolved to hex. Updates on theme change — we wait a
 * frame so the `data-theme` attribute (set by Providers) and the resulting style
 * recalculation have landed before reading.
 */
export function useThemeColors(): ThemeColors {
  const [theme] = useThemePreference();
  const [colors, setColors] = useState<ThemeColors>(FALLBACK);

  useEffect(() => {
    const id = requestAnimationFrame(() => setColors(readColors()));
    return () => cancelAnimationFrame(id);
  }, [theme]);

  return colors;
}
