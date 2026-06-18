'use client';

import { useEffect, useState } from 'react';

/**
 * Lightweight, client-only user preferences persisted to localStorage.
 *
 * The toolbar settings menu and the sidebar both read/write the same values
 * here. A custom window event keeps every subscriber in sync without a reload
 * (and the native `storage` event keeps other tabs in sync too).
 */

const REMEMBER_SECTIONS_KEY = 'pcv:rememberSections';
const SETTINGS_EVENT = 'pcv:settingschange';

/** Whether expanded/collapsed sidebar sections are remembered between visits. */
export function getRememberSections(): boolean {
  if (typeof window === 'undefined') return true; // SSR default: on
  // Default to on unless the user has explicitly turned it off.
  return window.localStorage.getItem(REMEMBER_SECTIONS_KEY) !== 'false';
}

export function setRememberSections(value: boolean): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(REMEMBER_SECTIONS_KEY, String(value));
  window.dispatchEvent(new Event(SETTINGS_EVENT));
}

/**
 * Subscribe to the "remember open sidebar sections" preference. Returns the
 * current value and a setter; a change made anywhere updates every subscriber.
 */
export function useRememberSections(): [boolean, (value: boolean) => void] {
  // Start with the SSR default so the server and first client render match,
  // then correct from localStorage after mount.
  const [value, setValue] = useState(true);

  useEffect(() => {
    const sync = () => setValue(getRememberSections());
    sync();
    window.addEventListener(SETTINGS_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(SETTINGS_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  return [value, setRememberSections];
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
