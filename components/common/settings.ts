'use client';

import { useEffect, useState } from 'react';

/**
 * Lightweight, client-only user preferences persisted to localStorage.
 *
 * A custom window event keeps every subscriber in sync without a reload (and the
 * native `storage` event keeps other tabs in sync too).
 */

const SETTINGS_EVENT = 'pcv:settingschange';

// --- Theme preference -------------------------------------------------------

export type ThemePreference = 'academic' | 'terminal';

const THEME_KEY = 'pcv:theme';
// Mirrored to a cookie so the server can render the right theme (no flash).
// Cookie names can't contain ':', so use an underscore here.
export const THEME_COOKIE = 'pcv_theme';

/** The selected color theme. "academic" is the default look. */
export function getThemePreference(): ThemePreference {
  if (typeof window === 'undefined') return 'academic';
  return window.localStorage.getItem(THEME_KEY) === 'terminal' ? 'terminal' : 'academic';
}

export function setThemePreference(value: ThemePreference): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(THEME_KEY, value);
  // Keep a cookie copy so the server-rendered HTML matches on the next load.
  document.cookie = `${THEME_COOKIE}=${value}; path=/; max-age=31536000; SameSite=Lax`;
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

/**
 * Subscribe to the theme preference. Returns the current value and a setter; a
 * change made anywhere updates every subscriber. Pass the server-resolved theme
 * as `initial` so the first client render matches the SSR markup.
 */
export function useThemePreference(
  initial: ThemePreference = 'academic',
): [ThemePreference, (value: ThemePreference) => void] {
  const [value, setValue] = useState<ThemePreference>(initial);

  useEffect(() => {
    const sync = () => setValue(getThemePreference());
    sync();
    window.addEventListener(SETTINGS_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(SETTINGS_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return [value, setThemePreference];
}

// --- Per-topic open/closed section state ------------------------------------

const sectionsKey = (title: string) => `pcv:sections:${title}`;

/** Load the saved set of expanded section values for a topic, or null if none. */
export function loadOpenSections(title: string): string[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(sectionsKey(title));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((v) => typeof v === 'string') : null;
  } catch {
    return null;
  }
}

/** Persist the set of expanded section values for a topic. */
export function saveOpenSections(title: string, values: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(sectionsKey(title), JSON.stringify(values));
  } catch {
    /* ignore quota / private-mode write failures */
  }
}
