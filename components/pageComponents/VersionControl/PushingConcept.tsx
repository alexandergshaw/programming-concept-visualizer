'use client';

import { Box, Typography } from '@mui/material';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import TableOfContents from '@/components/common/TableOfContents';
import PushDemo from './SubComponents/PushDemo';

export default function PushingConcept() {
  return (
    <ConceptWrapper
      title="Pushing: Syncing with the Remote"
      description="Learn how to send your local commits to a remote repository so your team can see your work."
    >
      <TableOfContents>
        <Section title="1. Local vs Remote">
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Typography sx={{ mb: 2 }}>
              When you work on a project, you have two repositories:
            </Typography>
            <Box sx={{ pl: 2, mb: 2 }}>
              <Typography sx={{ mb: 1 }}>
                <b>Local repository:</b> The copy of your code on your computer. All your commits live here.
              </Typography>
              <Typography sx={{ mb: 1 }}>
                <b>Remote repository:</b> The central copy hosted on GitHub, GitLab, or another server. This is where your team collaborates and where the "official" version lives.
              </Typography>
            </Box>
            <Typography sx={{ mb: 2 }}>
              When you <b>push</b>, you upload your local commits to the remote so everyone else can see and use your work.
            </Typography>
          </Box>
        </Section>

        <Section
          title="2. Try Pushing"
          subtitle="Create local commits and push them to simulate syncing with GitHub."
        >
          <PushDemo />
        </Section>

        <Section title="3. Pull vs Push: A Quick Comparison">
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 2,
                mb: 2,
              }}
            >
              {/* Push */}
              <Box
                sx={{
                  p: 2,
                  background: 'var(--feature-bg)',
                  border: '2px solid var(--feature)',
                  borderRadius: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: 'var(--feature)',
                    mb: 1,
                  }}
                >
                  Push
                </Typography>
                <Typography sx={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
                  Sends your local commits <b>up to</b> the remote. Share your work with the team.
                </Typography>
              </Box>

              {/* Pull */}
              <Box
                sx={{
                  p: 2,
                  background: 'var(--info-bg)',
                  border: '2px solid var(--info)',
                  borderRadius: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: 'var(--info)',
                    mb: 1,
                  }}
                >
                  Pull
                </Typography>
                <Typography sx={{ color: 'var(--ink-soft)', fontSize: '0.9rem' }}>
                  Downloads commits <b>from</b> the remote. Catch up with your team's changes.
                </Typography>
              </Box>
            </Box>

            <Typography sx={{ mb: 2, mt: 3 }}>
              <b>Workflow tip:</b> Always pull before pushing. This ensures your local branch has all the latest changes from your teammates, reducing conflicts.
            </Typography>
          </Box>
        </Section>

        <Section title="4. Common Push Scenarios">
          <Box sx={{ maxWidth: 700, mx: 'auto', my: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, mb: 1, color: 'var(--info)' }}>
                Push a new feature branch
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
                git push origin feature/new-feature
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, mb: 1, color: 'var(--success)' }}>
                Push to main after merging
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
                git push origin main
              </Box>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 1, color: 'var(--warning)' }}>
                Force push (use with caution!)
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
                git push origin --force
              </Box>
              <Typography
                sx={{
                  fontSize: '0.85rem',
                  color: 'var(--danger)',
                  fontStyle: 'italic',
                }}
              >
                Only use force push if you know what you're doing. It can overwrite your team's work!
              </Typography>
            </Box>
          </Box>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
