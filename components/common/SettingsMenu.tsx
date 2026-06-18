'use client';

import { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Tooltip,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import { useThemePreference, type ThemePreference } from './settings';

const THEME_OPTIONS: { value: ThemePreference; label: string; note?: string }[] = [
  { value: 'academic', label: 'Academic', note: 'Warm textbook' },
  { value: 'terminal', label: 'Terminal', note: 'Retro CRT, glowing green' },
];

/**
 * Settings gear that opens the theme-selection menu. Reused by the topic-page
 * toolbar and as a floating control on the landing page.
 */
export default function SettingsMenu({
  edge = false,
  color = 'inherit',
}: {
  edge?: 'start' | 'end' | false;
  color?: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [themePreference, setThemePreference] = useThemePreference();

  return (
    <>
      <Tooltip title="Settings">
        <IconButton
          edge={edge}
          aria-label="Settings"
          aria-haspopup="true"
          aria-expanded={open}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          sx={{ color }}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { minWidth: 220 } } }}
      >
        <ListSubheader sx={{ bgcolor: 'transparent', lineHeight: '36px' }}>Theme</ListSubheader>
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
