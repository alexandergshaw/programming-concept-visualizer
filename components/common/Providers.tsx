'use client';

import { ReactNode, useEffect } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useThemePreference } from './settings';

// Warm, welcoming "old textbook" palette: faint cream paper, warm ink, sienna.
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
    fontFamily: 'var(--font-geist-sans), Inter, system-ui, sans-serif',
    h1: { fontFamily: 'var(--font-serif), Georgia, serif' },
    h2: { fontFamily: 'var(--font-serif), Georgia, serif' },
    h3: { fontFamily: 'var(--font-serif), Georgia, serif' },
    h4: { fontFamily: 'var(--font-serif), Georgia, serif' },
    h5: { fontFamily: 'var(--font-serif), Georgia, serif' },
    h6: { fontFamily: 'var(--font-serif), Georgia, serif' },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});

// Retro CRT terminal palette: glowing phosphor green on near-black, monospace.
const TERMINAL_MONO = "var(--font-geist-mono), 'Courier New', monospace";
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
    fontFamily: TERMINAL_MONO,
    h1: { fontFamily: TERMINAL_MONO },
    h2: { fontFamily: TERMINAL_MONO },
    h3: { fontFamily: TERMINAL_MONO },
    h4: { fontFamily: TERMINAL_MONO },
    h5: { fontFamily: TERMINAL_MONO },
    h6: { fontFamily: TERMINAL_MONO },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  const [themePreference] = useThemePreference();
  const theme = themePreference === 'terminal' ? terminalTheme : academicTheme;

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
