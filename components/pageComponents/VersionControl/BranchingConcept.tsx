'use client';

import { Box, Typography } from '@mui/material';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import TableOfContents from '@/components/common/TableOfContents';
import BranchGraph from './SubComponents/BranchGraph';

export default function BranchingConcept() {
  return (
    <ConceptWrapper
      title="Branching: Parallel Lines of Work"
      description="Branches let you experiment and develop features in isolation, keeping the main code safe."
    >
      <TableOfContents>
        <Section title="1. Why Branch?">
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Typography sx={{ mb: 2 }}>
              Imagine you're working on a large project with a team. You want to add a new feature (like a dark mode) but you're not ready to put it in the main product yet. You also don't want your half-finished code to break things for other developers.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              This is where <b>branches</b> come in. A branch is a separate line of development that diverges from the main code. You can work on a branch without affecting the main branch, test your changes thoroughly, and only merge them back when you're confident they work.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Branches make it safe for multiple developers to work on different features at the same time.
            </Typography>
          </Box>
        </Section>

        <Section
          title="2. Visualize Branches and Commits"
          subtitle="Try it: switch between branches, make commits, and merge them back to main."
        >
          <BranchGraph />
        </Section>

        <Section title="3. Common Branching Patterns">
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, mb: 1, color: 'var(--info)' }}>
                Feature Branch
              </Typography>
              <Typography sx={{ color: 'var(--ink-soft)', mb: 2 }}>
                Used to develop a single feature in isolation.
              </Typography>
              <Box
                sx={{
                  p: 1,
                  background: 'var(--code-bg)',
                  color: 'var(--code-fg)',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                }}
              >
                git checkout -b feature/dark-mode
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, mb: 1, color: 'var(--success)' }}>
                Bug Fix Branch
              </Typography>
              <Typography sx={{ color: 'var(--ink-soft)', mb: 2 }}>
                Created to fix a specific bug in production.
              </Typography>
              <Box
                sx={{
                  p: 1,
                  background: 'var(--code-bg)',
                  color: 'var(--code-fg)',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                }}
              >
                git checkout -b bugfix/login-issue
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 1, color: 'var(--warning)' }}>
                Release Branch
              </Typography>
              <Typography sx={{ color: 'var(--ink-soft)', mb: 2 }}>
                Prepared for a release to production.
              </Typography>
              <Box
                sx={{
                  p: 1,
                  background: 'var(--code-bg)',
                  color: 'var(--code-fg)',
                  borderRadius: 1,
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                }}
              >
                git checkout -b release/v1.2.0
              </Box>
            </Box>
          </Box>
        </Section>

        <Section title="4. Merging: Bringing It All Together">
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Typography sx={{ mb: 2 }}>
              When you're happy with the work on your branch, you <b>merge</b> it back into the main branch. This combines your commits with the main history so everyone can use your new feature or bug fix.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              A typical merge workflow looks like this:
            </Typography>
            <Box sx={{ pl: 2, mb: 2 }}>
              <Typography sx={{ mb: 1 }}>
                1. <code>git checkout main</code> — switch to main
              </Typography>
              <Typography sx={{ mb: 1 }}>
                2. <code>git pull</code> — get the latest changes from your team
              </Typography>
              <Typography sx={{ mb: 1 }}>
                3. <code>git merge feature/dark-mode</code> — merge your branch into main
              </Typography>
              <Typography sx={{ mb: 1 }}>
                4. <code>git push</code> — send your merged work to the remote
              </Typography>
            </Box>
            <Typography sx={{ mb: 2 }}>
              <b>Tip:</b> Before merging, make sure your branch is up to date with main (by pulling or rebasing). This prevents merge conflicts.
            </Typography>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
