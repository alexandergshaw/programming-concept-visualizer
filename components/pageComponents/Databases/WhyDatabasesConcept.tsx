'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';

export default function WhyDatabasesConcept() {
  return (
    <ConceptWrapper title="Why Not Just Spreadsheets?" description="What a database gives you that a pile of files or a spreadsheet cannot.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Spreadsheets break down at scale" type="key-concepts">
            <Typography variant="body2">
              A spreadsheet is fine for a few hundred rows used by one person. A database is built for <strong>lots of data, many users at once, and rules that keep the data correct</strong> — exactly where spreadsheets fall apart.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Where Files & Spreadsheets Struggle">
          <SqlTable
            columns={['Problem', 'Spreadsheet / files', 'Database']}
            rows={[
              ['Many editors at once', 'overwrite each other', 'safe concurrent access'],
              ['Millions of rows', 'slow, crashes', 'fast with indexes'],
              ['Bad data', 'anything can be typed', 'constraints reject it'],
              ['Finding data', 'manual search/filter', 'precise queries'],
              ['Relationships', 'copy/paste duplication', 'linked by keys'],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="What You Gain">
          <CalloutBox title="The big wins" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Integrity:</strong> rules stop invalid or duplicated data from ever being saved.</Typography>
              <Typography variant="body2"><strong>Concurrency:</strong> thousands of users read and write at once without corruption.</Typography>
              <Typography variant="body2"><strong>Speed at scale:</strong> indexes find rows fast even in huge tables.</Typography>
              <Typography variant="body2"><strong>Safety:</strong> transactions and backups protect against half-finished changes and crashes.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
