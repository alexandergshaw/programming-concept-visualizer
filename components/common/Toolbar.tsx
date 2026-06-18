'use client';

import { useState } from 'react';
import {
  AppBar,
  Toolbar as MuiToolbar,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Tooltip,
  Box,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import { useThemePreference, type ThemePreference } from './settings';

// Height of the bar; the spacer below keeps page content clear of the fixed bar.
const TOOLBAR_HEIGHT = 48;

// Available color themes shown in the settings menu. "Terminal" is listed now;
// its styling will be implemented later.
const THEME_OPTIONS: { value: ThemePreference; label: string; note?: string }[] = [
  { value: 'academic', label: 'Academic' },
  { value: 'terminal', label: 'Terminal', note: 'Coming soon' },
];

/**
 * Top toolbar shown on topic pages (see PageWrapper). A settings gear sits at
 * the far right and opens a small preferences menu (theme selection).
 */
export default function Toolbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [themePreference, setThemePreference] = useThemePreference();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          // Warm "book spine" tone matching the sidebar.
          background: 'linear-gradient(180deg, #3a2f22, #2a2118)',
          color: '#f3ece0',
          borderBottom: '1px solid #5a4a37',
          // The full-height sidebar owns the left rail and sits on top of this
          // bar, so on desktop the bar only spans the content area to its right.
          // Full width on mobile, where the sidebar is an off-canvas drawer.
          left: { xs: 0, md: '250px' },
          width: { xs: '100%', md: 'calc(100% - 250px)' },
        }}
      >
        <MuiToolbar variant="dense" sx={{ minHeight: TOOLBAR_HEIGHT }}>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Settings">
            <IconButton
              edge="end"
              aria-label="Settings"
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{ color: '#f3ece0' }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </MuiToolbar>
      </AppBar>

      {/* Spacer pushes page content below the fixed bar. */}
      <MuiToolbar variant="dense" sx={{ minHeight: TOOLBAR_HEIGHT }} />

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { minWidth: 200 } } }}
      >
        <ListSubheader sx={{ bgcolor: 'transparent', lineHeight: '36px' }}>
          Theme
        </ListSubheader>
        {THEME_OPTIONS.map((opt) => (
          <MenuItem
            key={opt.value}
            selected={themePreference === opt.value}
            onClick={() => {
              setThemePreference(opt.value);
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>
              {themePreference === opt.value && <CheckIcon fontSize="small" />}
            </ListItemIcon>
            <ListItemText primary={opt.label} secondary={opt.note} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
