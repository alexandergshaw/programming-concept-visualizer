'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function BackupsConcept() {
  return (
    <ConceptWrapper title="Backups & Recovery" description="Copies of your data that let you recover from disasters and mistakes.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="A backup is a safety copy" type="key-concepts">
            <Typography variant="body2">
              A <strong>backup</strong> is a saved copy of your database you can restore later. It is your protection against the things that <em>will</em> eventually happen: hardware failure, a bad deploy, or a fat-fingered <code>DELETE</code>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Kinds of Backup">
          <CalloutBox title="Two common strategies" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Full backup:</strong> a complete copy of everything. Simple, but large and slow.</Typography>
              <Typography variant="body2"><strong>Incremental backup:</strong> only what changed since the last backup. Smaller and faster, restored on top of a full one.</Typography>
              <Typography variant="body2"><strong>Point-in-time recovery:</strong> replay the change log to restore the database to any exact moment — e.g. just before a mistake.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="A Backup You Haven't Tested Isn't a Backup">
          <CalloutBox title="The golden rule" type="warning">
            <Typography variant="body2">
              The only thing that matters is whether you can <strong>restore</strong>. Practice restores regularly, store copies <strong>off-site</strong> (a different machine/region), and automate the schedule so it never depends on someone remembering.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Backups vs Replication">
          <CalloutBox title="They solve different problems" type="success">
            <Typography variant="body2">
              A live replica protects against a server dying, but it faithfully copies your mistakes too. A backup is a snapshot from the <em>past</em> you can return to. You want both — replication for availability, backups for recovery.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
