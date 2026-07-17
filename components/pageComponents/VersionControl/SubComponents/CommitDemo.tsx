'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  INITIAL_CHANGED_FILES,
  ChangedFile,
  Commit,
  generateCommitHash,
  getCurrentTimestamp,
} from '../CommittingConcept.constants';

export default function CommitDemo() {
  const [workingDir, setWorkingDir] = useState<ChangedFile[]>(INITIAL_CHANGED_FILES);
  const [stagingArea, setStagingArea] = useState<ChangedFile[]>([]);
  const [commitMessage, setCommitMessage] = useState('');
  const [commits, setCommits] = useState<Commit[]>([]);
  const [hasError, setHasError] = useState(false);

  const moveToStaging = (file: ChangedFile) => {
    setWorkingDir(workingDir.filter((f) => f.id !== file.id));
    setStagingArea([...stagingArea, file]);
  };

  const moveBackToWorking = (file: ChangedFile) => {
    setStagingArea(stagingArea.filter((f) => f.id !== file.id));
    setWorkingDir([...workingDir, file]);
  };

  const handleCommit = () => {
    if (stagingArea.length === 0) {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
      return;
    }
    if (!commitMessage.trim()) {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
      return;
    }

    const newCommit: Commit = {
      hash: generateCommitHash(),
      message: commitMessage,
      timestamp: getCurrentTimestamp(),
    };

    setCommits([newCommit, ...commits]);
    setStagingArea([]);
    setCommitMessage('');
    setHasError(false);
  };

  const handleReset = () => {
    setWorkingDir(INITIAL_CHANGED_FILES);
    setStagingArea([]);
    setCommitMessage('');
    setCommits([]);
    setHasError(false);
  };

  const statusColor = (status: 'modified' | 'new') => {
    return status === 'modified' ? 'var(--warning)' : 'var(--info)';
  };

  const statusLabel = (status: 'modified' | 'new') => {
    return status === 'modified' ? 'modified' : 'new file';
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', my: 4 }}>
      {/* Flow diagram */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 4 }}>
        {/* Working Directory */}
        <Paper
          sx={{
            p: 2,
            background: 'var(--paper-sunken)',
            border: '2px solid var(--line-strong)',
            minHeight: 300,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: 'var(--ink)' }}
          >
            Working Directory
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'var(--ink-faint)', display: 'block', mb: 2 }}
          >
            Changed files in your project
          </Typography>
          <Stack spacing={1}>
            {workingDir.length === 0 ? (
              <Typography
                sx={{
                  color: 'var(--ink-faint)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  py: 3,
                }}
              >
                No changes
              </Typography>
            ) : (
              workingDir.map((file) => (
                <Box
                  key={file.id}
                  sx={{
                    p: 1,
                    background: 'var(--paper-raised)',
                    border: `1px solid var(--line)`,
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        color: 'var(--ink)',
                        fontWeight: 500,
                        wordBreak: 'break-word',
                      }}
                    >
                      {file.name}
                    </Typography>
                    <Chip
                      label={statusLabel(file.status)}
                      size="small"
                      sx={{
                        mt: 0.5,
                        bgcolor: statusColor(file.status),
                        color: 'white',
                        fontSize: '0.7rem',
                      }}
                    />
                  </Box>
                  <Button
                    size="small"
                    onClick={() => moveToStaging(file)}
                    sx={{
                      minWidth: 'auto',
                      px: 1,
                      py: 0.5,
                      fontSize: '0.75rem',
                      bgcolor: 'var(--info)',
                      color: 'white',
                      '&:hover': { bgcolor: 'var(--info)', opacity: 0.9 },
                    }}
                  >
                    <AddIcon sx={{ fontSize: 14 }} />
                  </Button>
                </Box>
              ))
            )}
          </Stack>
        </Paper>

        {/* Staging Area */}
        <Paper
          sx={{
            p: 2,
            background: 'var(--paper-sunken)',
            border: '2px solid var(--success)',
            minHeight: 300,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: 'var(--ink)' }}
          >
            Staging Area
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'var(--ink-faint)', display: 'block', mb: 2 }}
          >
            Files ready to commit
          </Typography>
          <Stack spacing={1}>
            {stagingArea.length === 0 ? (
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
            ) : (
              stagingArea.map((file) => (
                <Box
                  key={file.id}
                  sx={{
                    p: 1,
                    background: 'var(--success-bg)',
                    border: '1px solid var(--success)',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        color: 'var(--ink)',
                        fontWeight: 500,
                        wordBreak: 'break-word',
                      }}
                    >
                      {file.name}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => moveBackToWorking(file)}
                    sx={{
                      minWidth: 'auto',
                      px: 1,
                      py: 0.5,
                      fontSize: '0.75rem',
                      bgcolor: 'var(--success)',
                      color: 'white',
                      '&:hover': { bgcolor: 'var(--success)', opacity: 0.9 },
                    }}
                  >
                    −
                  </Button>
                </Box>
              ))
            )}
          </Stack>
        </Paper>

        {/* Commit History */}
        <Paper
          sx={{
            p: 2,
            background: 'var(--paper-sunken)',
            border: '2px solid var(--feature)',
            minHeight: 300,
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: 'var(--ink)' }}
          >
            Commit History
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'var(--ink-faint)', display: 'block', mb: 2 }}
          >
            Snapshots of your work
          </Typography>
          <Stack spacing={1}>
            {commits.length === 0 ? (
              <Typography
                sx={{
                  color: 'var(--ink-faint)',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  py: 3,
                }}
              >
                No commits yet
              </Typography>
            ) : (
              commits.map((commit) => (
                <Box
                  key={commit.hash}
                  sx={{
                    p: 1.5,
                    background: 'var(--feature-bg)',
                    border: '1px solid var(--feature)',
                    borderRadius: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1, mb: 0.5 }}>
                    <CheckCircleIcon
                      sx={{ fontSize: 16, color: 'var(--success)', flexShrink: 0 }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontFamily: 'monospace',
                        color: 'var(--ink-soft)',
                      }}
                    >
                      {commit.hash}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.85rem',
                      color: 'var(--ink)',
                      fontWeight: 500,
                      wordBreak: 'break-word',
                      ml: 3,
                    }}
                  >
                    {commit.message}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.7rem',
                      color: 'var(--ink-faint)',
                      ml: 3,
                      mt: 0.5,
                    }}
                  >
                    {commit.timestamp}
                  </Typography>
                </Box>
              ))
            )}
          </Stack>
        </Paper>
      </Box>

      {/* Message input and buttons */}
      <Paper
        sx={{
          p: 3,
          background: 'var(--paper-raised)',
          border: '1px solid var(--line)',
          borderRadius: 2,
          mb: 2,
        }}
      >
        <TextField
          fullWidth
          label="Commit message"
          placeholder="Describe what you changed..."
          value={commitMessage}
          onChange={(e) => setCommitMessage(e.target.value)}
          multiline
          rows={2}
          sx={{ mb: 2 }}
          error={hasError && (!commitMessage.trim() || stagingArea.length === 0)}
          helperText={
            hasError && stagingArea.length === 0
              ? 'Add files to the staging area first'
              : hasError && !commitMessage.trim()
              ? 'Write a commit message'
              : ''
          }
        />

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
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
          <Button
            onClick={handleCommit}
            variant="contained"
            sx={{
              bgcolor: 'var(--feature)',
              color: 'white',
              '&:hover': { bgcolor: 'var(--feature)', opacity: 0.9 },
            }}
          >
            Commit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
