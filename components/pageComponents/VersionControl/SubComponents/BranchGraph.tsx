'use client';

import React, { useState } from 'react';
import { Box, Button, Typography, Paper, Stack, Chip } from '@mui/material';
import {
  MAIN_BRANCH,
  FEATURE_BRANCH,
  Branch,
  BranchCommit,
} from '../BranchingConcept.constants';

export default function BranchGraph() {
  const [currentBranch, setCurrentBranch] = useState<'main' | 'feature'>('main');
  const [mainCommits, setMainCommits] = useState<BranchCommit[]>(MAIN_BRANCH.commits);
  const [featureCommits, setFeatureCommits] = useState<BranchCommit[]>(
    FEATURE_BRANCH.commits
  );
  const [isMerged, setIsMerged] = useState(false);

  const addCommit = () => {
    if (currentBranch === 'main') {
      const lastId = Math.max(...mainCommits.map((c) => c.id));
      const newCommit: BranchCommit = {
        id: lastId + 1,
        hash: Math.random().toString(16).substring(2, 8).toUpperCase(),
        message: `Commit on main #${lastId + 1}`,
      };
      setMainCommits([...mainCommits, newCommit]);
    } else {
      const lastId = Math.max(...featureCommits.map((c) => c.id));
      const newCommit: BranchCommit = {
        id: lastId + 1,
        hash: Math.random().toString(16).substring(2, 8).toUpperCase(),
        message: `Commit on feature #${lastId + 1}`,
      };
      setFeatureCommits([...featureCommits, newCommit]);
    }
  };

  const merge = () => {
    setIsMerged(true);
  };

  const reset = () => {
    setMainCommits(MAIN_BRANCH.commits);
    setFeatureCommits(FEATURE_BRANCH.commits);
    setIsMerged(false);
    setCurrentBranch('main');
  };

  const renderCommit = (commit: BranchCommit, color: string) => (
    <Box
      key={commit.id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: '0.85rem',
          boxShadow: 2,
        }}
      >
        {commit.id}
      </Box>
      <Typography
        sx={{
          mt: 1,
          fontSize: '0.75rem',
          textAlign: 'center',
          color: 'var(--ink-faint)',
          fontFamily: 'monospace',
          maxWidth: 60,
        }}
      >
        {commit.hash}
      </Typography>
    </Box>
  );

  const renderBranchLine = (commits: BranchCommit[], color: string) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
      {commits.map((commit, index) => (
        <React.Fragment key={commit.id}>
          {renderCommit(commit, color)}
          {index < commits.length - 1 && (
            <Box
              sx={{
                flex: 1,
                height: 3,
                background: color,
                minWidth: 40,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', my: 4 }}>
      {/* Current branch indicator */}
      <Paper
        sx={{
          p: 2,
          background: 'var(--paper-sunken)',
          border: '1px solid var(--line)',
          mb: 3,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ fontSize: '0.85rem', color: 'var(--ink-soft)', mb: 1 }}>
          You are on:
        </Typography>
        <Chip
          label={`🌿 ${currentBranch === 'main' ? 'main' : 'feature/dark-mode'}`}
          sx={{
            bgcolor:
              currentBranch === 'main'
                ? 'var(--info-bg)'
                : 'var(--feature-bg)',
            color:
              currentBranch === 'main'
                ? 'var(--info)'
                : 'var(--feature)',
            fontWeight: 700,
          }}
        />
      </Paper>

      {/* Graph visualization */}
      <Paper
        sx={{
          p: 3,
          background: 'var(--paper-raised)',
          border: '1px solid var(--line)',
          borderRadius: 2,
          mb: 3,
          overflowX: 'auto',
        }}
      >
        <Typography sx={{ fontWeight: 700, mb: 2, color: 'var(--ink)' }}>
          Commit History
        </Typography>

        {/* Main branch */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: 600,
              mb: 2,
              color: 'var(--info)',
            }}
          >
            main
          </Typography>
          {renderBranchLine(mainCommits, 'var(--info)')}
        </Box>

        {/* Feature branch (diverges from commit 3) */}
        {!isMerged && (
          <Box>
            <Typography
              sx={{
                fontSize: '0.85rem',
                fontWeight: 600,
                mb: 2,
                color: 'var(--feature)',
              }}
            >
              feature/dark-mode
            </Typography>
            {renderBranchLine(featureCommits, 'var(--feature)')}
          </Box>
        )}

        {/* Merge indicator */}
        {isMerged && (
          <Box sx={{ mt: 3, p: 2, background: 'var(--success-bg)', borderRadius: 1 }}>
            <Typography sx={{ color: 'var(--success)', fontWeight: 600 }}>
              ✓ Merged! feature/dark-mode is now part of main.
            </Typography>
          </Box>
        )}
      </Paper>

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
            onClick={() => setCurrentBranch('main')}
            variant={currentBranch === 'main' ? 'contained' : 'outlined'}
            sx={{
              bgcolor:
                currentBranch === 'main'
                  ? 'var(--info)'
                  : 'transparent',
              borderColor: 'var(--line-strong)',
              color: currentBranch === 'main' ? 'white' : 'var(--ink-soft)',
              '&:hover': {
                bgcolor:
                  currentBranch === 'main'
                    ? 'var(--info)'
                    : 'var(--paper-sunken)',
              },
            }}
          >
            Switch to main
          </Button>

          <Button
            onClick={() => setCurrentBranch('feature')}
            variant={currentBranch === 'feature' ? 'contained' : 'outlined'}
            sx={{
              bgcolor:
                currentBranch === 'feature'
                  ? 'var(--feature)'
                  : 'transparent',
              borderColor: 'var(--line-strong)',
              color:
                currentBranch === 'feature'
                  ? 'white'
                  : 'var(--ink-soft)',
              '&:hover': {
                bgcolor:
                  currentBranch === 'feature'
                    ? 'var(--feature)'
                    : 'var(--paper-sunken)',
              },
            }}
          >
            Switch to feature/dark-mode
          </Button>

          <Button
            onClick={addCommit}
            variant="contained"
            disabled={isMerged}
            sx={{
              bgcolor: 'var(--info)',
              color: 'white',
              '&:hover': { bgcolor: 'var(--info)', opacity: 0.9 },
              '&:disabled': { opacity: 0.5, cursor: 'not-allowed' },
            }}
          >
            + Commit on {currentBranch}
          </Button>

          {!isMerged && (
            <Button
              onClick={merge}
              variant="contained"
              sx={{
                bgcolor: 'var(--success)',
                color: 'white',
                '&:hover': { bgcolor: 'var(--success)', opacity: 0.9 },
              }}
            >
              Merge feature/dark-mode → main
            </Button>
          )}

          <Button
            onClick={reset}
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
