'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function UnionConcept() {
  return (
    <ConceptWrapper title="UNION" description="Stack the rows of two queries on top of each other.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="JOIN adds columns, UNION adds rows" type="key-concepts">
            <Typography variant="body2">
              A <code>JOIN</code> widens the result by combining columns side by side. <code>UNION</code> lengthens it by appending the rows of one query below another.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Combining Two Result Sets">
          <Typography variant="body2" paragraph>
            Build one mailing list from current customers and newsletter sign-ups:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT email FROM customers' }, { code: 'UNION' }, { code: 'SELECT email FROM newsletter_signups;' }]} />
          <SqlTable
            caption="Result — duplicates removed by UNION"
            columns={['email']}
            rows={[['ana@x.com'], ['ben@x.com'], ['chen@x.com']]}
          />
        </Section>

        <Section title="The Rules">
          <CalloutBox title="Both queries must line up" type="warning">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Each query must return the <strong>same number of columns</strong>, in the same order, with compatible types.</Typography>
              <Typography variant="body2">The result uses the <strong>first</strong> query&apos;s column names.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="UNION vs UNION ALL">
          <CalloutBox title="Keep duplicates with ALL" type="info">
            <Typography variant="body2">
              <code>UNION</code> removes duplicate rows (which costs a sort). <code>UNION ALL</code> keeps every row and is faster — use it when you know there are no duplicates or you want the repeats.
            </Typography>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
