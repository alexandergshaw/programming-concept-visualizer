'use client';

import { Box, Typography } from '@mui/material';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import TableOfContents from '@/components/common/TableOfContents';
import CommitDemo from './SubComponents/CommitDemo';

export default function CommittingConcept() {
  return (
    <ConceptWrapper
      title="Making Commits: Saving Your Work"
      description="A commit is a snapshot of your code at a point in time. Learn how to stage changes and create meaningful commit messages."
    >
      <TableOfContents>
        <Section title="1. What Is a Commit?">
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Typography sx={{ mb: 2 }}>
              When you work on code, you make many small changes — fixing a bug, adding a feature, or refactoring a section. A <b>commit</b> is a snapshot that captures all those changes at one moment in time.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Think of commits like save points in a video game. After each one, you can always go back to a previous version if something breaks, or see exactly what changed between two points in history.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Each commit has two key parts:
            </Typography>
            <Box sx={{ pl: 2, mb: 2 }}>
              <Typography sx={{ mb: 1 }}>
                <b>The changes:</b> Which files changed and how.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <b>The message:</b> A short description of <i>why</i> you made these changes, like "Fix login button styling" or "Add email validation."
              </Typography>
            </Box>
          </Box>
        </Section>

        <Section
          title="2. Make a Commit"
          subtitle="Try it yourself: move files from your working directory to the staging area, write a message, and commit."
        >
          <CommitDemo />
        </Section>

        <Section title="3. Anatomy of a Good Commit Message">
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Typography sx={{ mb: 2 }}>
              A good commit message is short, clear, and describes <b>what changed and why</b>. Here are some examples:
            </Typography>

            <Box
              sx={{
                my: 3,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
              }}
            >
              {/* Good example */}
              <Box
                sx={{
                  p: 2,
                  background: 'var(--success-bg)',
                  border: '2px solid var(--success)',
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontWeight: 700, color: 'var(--success)', mb: 1 }}>
                  ✓ Good
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    background: 'var(--code-bg)',
                    color: 'var(--code-fg)',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    mb: 1,
                  }}
                >
                  Fix login button styling on mobile
                </Box>
                <Typography sx={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                  Clear, specific, and actionable.
                </Typography>
              </Box>

              {/* Bad example */}
              <Box
                sx={{
                  p: 2,
                  background: 'var(--danger-bg)',
                  border: '2px solid var(--danger)',
                  borderRadius: 1,
                }}
              >
                <Typography sx={{ fontWeight: 700, color: 'var(--danger)', mb: 1 }}>
                  ✗ Avoid
                </Typography>
                <Box
                  sx={{
                    p: 1,
                    background: 'var(--code-bg)',
                    color: 'var(--code-fg)',
                    borderRadius: 1,
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    mb: 1,
                  }}
                >
                  updates
                </Box>
                <Typography sx={{ fontSize: '0.85rem', color: 'var(--ink-soft)' }}>
                  Vague. Future you won't remember what this was.
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ mb: 2, mt: 3 }}>
              <b>Pro tip:</b> Use the present tense and imagine you're completing the sentence: "If applied, this commit will <i>[your message]</i>." For example: "If applied, this commit will <i>fix login button styling on mobile.</i>"
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
