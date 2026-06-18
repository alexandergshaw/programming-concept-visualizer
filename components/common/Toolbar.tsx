'use client';

import { AppBar, Toolbar as MuiToolbar, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import SettingsMenu from './SettingsMenu';

// Height of the bar; the spacer below keeps page content clear of the fixed bar.
const TOOLBAR_HEIGHT = 48;

/**
 * Top toolbar shown on topic pages (see PageWrapper). Home + settings sit at the
 * far right; the settings gear opens the theme menu.
 */
export default function Toolbar() {
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          // Matches the sidebar chrome; themed via CSS variables.
          background: 'var(--chrome-bg)',
          color: 'var(--chrome-fg)',
          borderBottom: '1px solid var(--chrome-border)',
          // The full-height sidebar owns the left rail and sits on top of this
          // bar, so on desktop the bar only spans the content area to its right.
          // Full width on mobile, where the sidebar is an off-canvas drawer.
          left: { xs: 0, md: '250px' },
          width: { xs: '100%', md: 'calc(100% - 250px)' },
        }}
      >
        <MuiToolbar variant="dense" sx={{ minHeight: TOOLBAR_HEIGHT }}>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            component={Link}
            href="/"
            aria-label="Home"
            sx={{ color: 'var(--chrome-fg)' }}
          >
            <HomeIcon />
          </IconButton>
          <SettingsMenu edge="end" color="var(--chrome-fg)" />
        </MuiToolbar>
      </AppBar>

      {/* Spacer pushes page content below the fixed bar. */}
      <MuiToolbar variant="dense" sx={{ minHeight: TOOLBAR_HEIGHT }} />
    </>
  );
}
