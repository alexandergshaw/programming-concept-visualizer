'use client';

import { ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline, type Theme } from '@mui/material';
import { useThemePreference, type ThemePreference } from './settings';

// Shared across every theme: flat buttons, no Paper gradient.
const sharedComponents = {
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: { root: { textTransform: 'none' as const, fontWeight: 600 } },
  },
  MuiPaper: {
    styleOverrides: { root: { backgroundImage: 'none' } },
  },
};

const SANS = 'var(--font-geist-sans), Inter, system-ui, sans-serif';

// Light (default): dark slate on light gray, clean sans throughout.
const corporateTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1f2937', dark: '#111827', light: '#374151', contrastText: '#d1d5db' },
    secondary: { main: '#4b5563', contrastText: '#d1d5db' },
    background: { default: '#d1d5db', paper: '#d1d5db' },
    text: { primary: '#1f2937', secondary: '#4b5563' },
    divider: '#9ca3af',
    info: { main: '#2563eb' },
    success: { main: '#15803d' },
    warning: { main: '#b45309' },
    error: { main: '#b91c1c' },
  },
  shape: { borderRadius: 8 },
  typography: { fontFamily: SANS },
  components: sharedComponents,
});

// Dark: neutral charcoal with a cool blue accent.
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#5b9dff', dark: '#3b7fe0', light: '#8fbcff', contrastText: '#0a0f1a' },
    secondary: { main: '#22d3ee', contrastText: '#0a0f1a' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#e6e6e6', secondary: '#a0a0a0' },
    divider: '#2e2e2e',
    info: { main: '#5b9dff' },
    success: { main: '#4ade80' },
    warning: { main: '#fbbf24' },
    error: { main: '#f87171' },
  },
  shape: { borderRadius: 8 },
  typography: { fontFamily: SANS },
  components: sharedComponents,
});

// Academic: warm "old textbook" — cream paper, warm ink, sienna, serif headings.
const SERIF = 'var(--font-serif), Georgia, serif';
const academicTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#8a5a2b', dark: '#6e461f', light: '#a87a4c', contrastText: '#fffdf8' },
    secondary: { main: '#5b6e57', contrastText: '#fffdf8' },
    background: { default: '#faf6ee', paper: '#fffdf8' },
    text: { primary: '#322e27', secondary: '#6f6657' },
    divider: '#e7dfd0',
    info: { main: '#4f7384' },
    success: { main: '#5b7a4f' },
    warning: { main: '#b5862f' },
    error: { main: '#a4472f' },
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: SANS,
    h1: { fontFamily: SERIF },
    h2: { fontFamily: SERIF },
    h3: { fontFamily: SERIF },
    h4: { fontFamily: SERIF },
    h5: { fontFamily: SERIF },
    h6: { fontFamily: SERIF },
  },
  components: sharedComponents,
});

// Retro CRT terminal palette: glowing phosphor green on near-black, monospace.
const MONO = "var(--font-geist-mono), 'Courier New', monospace";
const terminalTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#39ff66', dark: '#22c24a', light: '#7dffa0', contrastText: '#04140a' },
    secondary: { main: '#33ffae', contrastText: '#04140a' },
    background: { default: '#0a0f0a', paper: '#0e160e' },
    text: { primary: '#39ff66', secondary: '#1faa55' },
    divider: '#1c5c30',
    info: { main: '#39ffd0' },
    success: { main: '#39ff66' },
    warning: { main: '#d4ff3a' },
    error: { main: '#ff6a4a' },
  },
  shape: { borderRadius: 4 }, // sharper corners read more "terminal"
  typography: {
    fontFamily: MONO,
    h1: { fontFamily: MONO },
    h2: { fontFamily: MONO },
    h3: { fontFamily: MONO },
    h4: { fontFamily: MONO },
    h5: { fontFamily: MONO },
    h6: { fontFamily: MONO },
  },
  components: sharedComponents,
});

const THEMES: Record<ThemePreference, Theme> = {
  corporate: corporateTheme,
  dark: darkTheme,
  academic: academicTheme,
  terminal: terminalTheme,
};

export default function Providers({
  children,
  initialTheme = 'corporate',
}: {
  children: ReactNode;
  initialTheme?: ThemePreference;
}) {
  // Seed from the server-resolved theme (cookie) so SSR and the first client
  // render agree — no flash, no hydration mismatch.
  const [themePreference] = useThemePreference(initialTheme);
  const theme = THEMES[themePreference] ?? corporateTheme;

  // Drive the CSS-variable themes (see globals.css) off the same preference.
  useEffect(() => {
    document.documentElement.dataset.theme = themePreference;
  }, [themePreference]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
