'use client';

import { ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Toolbar from './Toolbar';

// Warm, welcoming "old textbook" palette: faint cream paper, warm ink, sienna.
const theme = createTheme({
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

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toolbar />
      {children}
    </ThemeProvider>
  );
}
