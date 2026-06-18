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

/** The selected color theme. "academic" is the current/default look. */
export function getThemePreference(): ThemePreference {
  if (typeof window === 'undefined') return 'academic';
  return window.localStorage.getItem(THEME_KEY) === 'terminal' ? 'terminal' : 'academic';
}

export function setThemePreference(value: ThemePreference): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(THEME_KEY, value);
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

/**
 * Subscribe to the theme preference. Returns the current value and a setter; a
 * change made anywhere updates every subscriber.
 */
export function useThemePreference(): [ThemePreference, (value: ThemePreference) => void] {
  // Start with the default so server and first client render match, then correct
  // from localStorage after mount.
  const [value, setValue] = useState<ThemePreference>('academic');

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
