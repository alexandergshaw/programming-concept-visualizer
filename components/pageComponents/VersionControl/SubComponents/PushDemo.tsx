'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { INITIAL_COMMITS, Commit } from '../PushingConcept.constants';

export default function PushDemo() {
  const [remoteCommits, setRemoteCommits] = useState<Commit[]>(INITIAL_COMMITS);
  const [localCommits, setLocalCommits] = useState<Commit[]>(INITIAL_COMMITS);
  const [aheadBy, setAheadBy] = useState(0);
  const [isPushing, setIsPushing] = useState(false);
  const [pushMessage, setPushMessage] = useState('');

  useEffect(() => {
    setAheadBy(Math.max(0, localCommits.length - remoteCommits.length));
  }, [localCommits, remoteCommits]);

  const addLocalCommit = () => {
    const newCommit: Commit = {
      hash: Math.random().toString(16).substring(2, 8).toUpperCase(),
      message: `New commit #${localCommits.length + 1}`,
    };
    setLocalCommits([...localCommits, newCommit]);
  };

  const handlePush = async () => {
    if (aheadBy === 0) return;

    setIsPushing(true);
    setPushMessage('');

    // Simulate push animation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Add pending commits to remote
    const pendingCommits = localCommits.slice(remoteCommits.length);
    setRemoteCommits([...remoteCommits, ...pendingCommits]);

    setPushMessage(`✓ Pushed ${pendingCommits.length} commit(s) to GitHub!`);
    setIsPushing(false);

    // Clear message after 3 seconds
    setTimeout(() => setPushMessage(''), 3000);
  };

  const handleReset = () => {
    setLocalCommits(INITIAL_COMMITS);
    setRemoteCommits(INITIAL_COMMITS);
    setAheadBy(0);
    setPushMessage('');
  };

  const renderCommit = (commit: Commit, isAnimating: boolean) => (
    <Box
      key={commit.hash}
      sx={{
        p: 1.5,
        background: 'var(--paper-raised)',
        border: '1px solid var(--line)',
        borderRadius: 1,
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        animation: isAnimating
          ? 'slideRight 0.8s ease-out forwards'
          : 'none',
        '@keyframes slideRight': {
          from: { opacity: 0.5, transform: 'translateX(-40px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: 'var(--info-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: 'var(--info)',
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: '0.75rem',
        }}
      >
        {commit.hash}
      </Box>
      <Typography
        sx={{
          flex: 1,
          fontSize: '0.9rem',
          color: 'var(--ink)',
          fontWeight: 500,
        }}
      >
        {commit.message}
      </Typography>
    </Box>
  );

  const animatingCommits = localCommits.slice(remoteCommits.length);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', my: 4 }}>
      {/* Status indicator */}
      <Paper
        sx={{
          p: 2.5,
          background:
            aheadBy > 0
              ? 'var(--warning-bg)'
              : 'var(--success-bg)',
          border:
            aheadBy > 0
              ? '1px solid var(--warning)'
              : '1px solid var(--success)',
          borderRadius: 2,
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SyncAltIcon
            sx={{
              color: aheadBy > 0 ? 'var(--warning)' : 'var(--success)',
            }}
          />
          <Typography sx={{ fontWeight: 700, color: 'var(--ink)' }}>
            Sync Status
          </Typography>
        </Box>
        {aheadBy > 0 ? (
          <Typography sx={{ color: 'var(--ink-soft)' }}>
            Your local repository is <b>ahead by {aheadBy} commit{aheadBy !== 1 ? 's' : ''}</b>. Push to sync with GitHub.
          </Typography>
        ) : (
          <Typography sx={{ color: 'var(--ink-soft)' }}>
            Your local and remote repositories are <b>in sync</b>. Good job!
          </Typography>
        )}
      </Paper>

      {/* Two-panel layout */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2,
          mb: 3,
        }}
      >
        {/* Local Repository */}
        <Paper
          sx={{
            p: 2,
            background: 'var(--paper-sunken)',
            border: '2px solid var(--line-strong)',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'var(--ink)',
            }}
          >
            Local Repository
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'var(--ink-faint)', display: 'block', mb: 2 }}
          >
            Your computer
          </Typography>
          <Stack spacing={1}>
            {localCommits.map((commit, index) => {
              const isAnimating =
                animatingCommits.some((ac) => ac.hash === commit.hash);
              return renderCommit(commit, isAnimating);
            })}
          </Stack>
        </Paper>

        {/* Remote Repository */}
        <Paper
          sx={{
            p: 2,
            background: 'var(--paper-sunken)',
            border: '2px solid var(--line-strong)',
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'var(--ink)',
            }}
          >
            Remote Repository
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'var(--ink-faint)', display: 'block', mb: 2 }}
          >
            GitHub / GitLab
          </Typography>
          <Stack spacing={1}>
            {remoteCommits.map((commit) =>
              renderCommit(commit, false)
            )}
            {remoteCommits.length === 0 && (
              <Typography
                sx={{
                  color: 'var(--ink-faint)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  py: 3,
                }}
              >
                Empty
              </Typography>
            )}
          </Stack>
        </Paper>
      </Box>

      {/* Push message */}
      {pushMessage && (
        <Paper
          sx={{
            p: 2,
            background: 'var(--success-bg)',
            border: '1px solid var(--success)',
            borderRadius: 2,
            mb: 2,
            textAlign: 'center',
          }}
        >
          <Typography sx={{ color: 'var(--success)', fontWeight: 600 }}>
            {pushMessage}
          </Typography>
        </Paper>
      )}

      {/* Action buttons */}
      <Paper
        sx={{
          p: 2,
          background: 'var(--paper-raised)',
          border: '1px solid var(--line)',
          borderRadius: 2,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
          <Button
            onClick={addLocalCommit}
            variant="contained"
            sx={{
              bgcolor: 'var(--info)',
              color: 'white',
              '&:hover': { bgcolor: 'var(--info)', opacity: 0.9 },
            }}
          >
            + Make Local Commit
          </Button>

          <Button
            onClick={handlePush}
            disabled={aheadBy === 0 || isPushing}
            variant="contained"
            sx={{
              bgcolor: 'var(--feature)',
              color: 'white',
              '&:hover': { bgcolor: 'var(--feature)', opacity: 0.9 },
              '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
            }}
          >
            <CloudUploadIcon sx={{ mr: 1, fontSize: 18 }} />
            Push to GitHub
          </Button>

          <Button
            onClick={handleReset}
            variant="outlined"
            sx={{
              borderColor: 'var(--line-strong)',
              color: 'var(--ink-soft)',
              '&:hover': { borderColor: 'var(--line)', bgcolor: 'var(--paper-sunken)' },
            }}
          >
            Reset
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
