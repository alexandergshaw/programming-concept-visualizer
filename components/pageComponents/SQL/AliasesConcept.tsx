'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AliasesConcept() {
  return (
    <ConceptWrapper title="Aliases (AS)" description="Give a column or table a temporary, friendlier name for one query.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="AS renames things in the result" type="key-concepts">
            <Typography variant="body2">
              An <strong>alias</strong> is a temporary name used only while the query runs. It makes output columns readable and lets you refer to tables with a short label.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Column Aliases">
          <Typography variant="body2" paragraph>
            Rename a column — especially a computed one — so the result header is meaningful:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name AS employee,' }, { code: '       salary * 12 AS annual_pay' }, { code: 'FROM employees;' }]} />
          <Typography variant="body2">
            The result columns are now <code>employee</code> and <code>annual_pay</code> instead of <code>name</code> and an unnamed expression.
          </Typography>
        </Section>

        <Section title="Table Aliases">
          <Typography variant="body2" paragraph>
            A short table alias keeps longer queries (especially joins) tidy:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT e.name, e.salary' }, { code: 'FROM employees AS e' }, { code: 'WHERE e.salary > 60000;' }]} />
          <CalloutBox title="Handy details" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">The <code>AS</code> keyword is optional — <code>employees e</code> works too.</Typography>
              <Typography variant="body2">If an alias contains spaces, quote it: <code>AS &quot;Annual Pay&quot;</code>.</Typography>
              <Typography variant="body2">Table aliases become essential once you join the same table to itself.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
