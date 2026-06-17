'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function DistinctConcept() {
  return (
    <ConceptWrapper title="DISTINCT" description="Remove duplicate rows from a result.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="DISTINCT collapses duplicates" type="key-concepts">
            <Typography variant="body2">
              <code>SELECT DISTINCT</code> returns each unique combination of the selected columns once, dropping repeats. It is the quickest way to answer &quot;what are the different values here?&quot;
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Unique Values of a Column">
          <Typography variant="body2" paragraph>
            The <code>employees</code> table has Sales twice. To list the departments that exist:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT DISTINCT department' }, { code: 'FROM employees;' }]} />
          <SqlTable
            caption="Result — each department once"
            columns={['department']}
            rows={[['Sales'], ['Engineering']]}
          />
        </Section>

        <Section title="DISTINCT Applies to the Whole Row">
          <Typography variant="body2" paragraph>
            With several columns, <code>DISTINCT</code> keeps each unique <em>combination</em>, not each unique column value:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT DISTINCT department, salary' }, { code: 'FROM employees;' }]} />
          <Typography variant="body2">
            Two rows are duplicates only if <strong>both</strong> department and salary match.
          </Typography>
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><code>DISTINCT</code> removes duplicate result rows.</Typography>
              <Typography variant="body2">It considers all selected columns together.</Typography>
              <Typography variant="body2">To also count the unique values, see <code>COUNT(DISTINCT ...)</code> in Aggregate Functions.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
