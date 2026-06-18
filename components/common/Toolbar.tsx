'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar as MuiToolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Switch,
  Typography,
  Tooltip,
  Box,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Link from 'next/link';
import { useRememberSections } from './settings';

// Height of the bar; the spacer below keeps page content clear of the fixed bar.
const TOOLBAR_HEIGHT = 48;

/**
 * Always-on top toolbar rendered globally (see Providers). A settings gear sits
 * at the far left and opens a small preferences menu.
 */
export default function Toolbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [rememberSections, setRememberSections] = useRememberSections();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          // Warm "book spine" tone matching the sidebar; sit above it (z 1000).
          background: 'linear-gradient(180deg, #3a2f22, #2a2118)',
          color: '#f3ece0',
          borderBottom: '1px solid #5a4a37',
        }}
      >
        <MuiToolbar variant="dense" sx={{ minHeight: TOOLBAR_HEIGHT, gap: 1 }}>
          <Tooltip title="Settings">
            <IconButton
              edge="start"
              aria-label="Settings"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ color: '#f3ece0' }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          <Typography
            component={Link}
            href="/"
            sx={{
              fontFamily: 'var(--font-serif), Georgia, serif',
              fontWeight: 600,
              fontSize: '1.05rem',
              color: '#fffdf8',
              textDecoration: 'none',
              letterSpacing: '0.02em',
            }}
          >
            Concept Visuals
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
        </MuiToolbar>
      </AppBar>

      {/* Spacer pushes page content below the fixed bar. */}
      <MuiToolbar variant="dense" sx={{ minHeight: TOOLBAR_HEIGHT }} />

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={() => setRememberSections(!rememberSections)} sx={{ gap: 2 }}>
          <ListItemText
            primary="Remember open sections"
            secondary="Keep sidebar groups expanded between visits"
          />
          <Switch edge="end" checked={rememberSections} tabIndex={-1} />
        </MenuItem>
      </Menu>
    </>
  );
}
