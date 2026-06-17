'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CteConcept() {
  return (
    <ConceptWrapper title="Common Table Expressions (WITH)" description="Name a subquery up front so the main query reads top to bottom.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="A CTE is a named, temporary result" type="key-concepts">
            <Typography variant="body2">
              A <strong>CTE</strong> defines a named query with <code>WITH</code>, then uses that name in the main query as if it were a table. It turns a nested subquery into a clear, named step.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Subquery vs CTE">
          <Typography variant="body2" paragraph>
            Same result as the &quot;above average&quot; subquery, but easier to read — the calculation is named <code>company</code>:
          </Typography>
          <CodeSnippet lines={[{ code: 'WITH company AS (' }, { code: '    SELECT AVG(salary) AS avg_salary FROM employees' }, { code: ')' }, { code: 'SELECT e.name, e.salary' }, { code: 'FROM employees e, company' }, { code: 'WHERE e.salary > company.avg_salary;' }]} />
        </Section>

        <Section title="Why Use CTEs">
          <CalloutBox title="Benefits" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Readable:</strong> complex logic reads as named steps, top to bottom.</Typography>
              <Typography variant="body2"><strong>Reusable:</strong> reference the same CTE several times in one query.</Typography>
              <Typography variant="body2"><strong>Chainable:</strong> define several CTEs separated by commas, each building on the last.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Chaining Steps">
          <CodeSnippet lines={[{ code: 'WITH sales AS (' }, { code: "    SELECT * FROM employees WHERE department = 'Sales'" }, { code: '),' }, { code: 'top_sales AS (' }, { code: '    SELECT * FROM sales WHERE salary > 52000' }, { code: ')' }, { code: 'SELECT name FROM top_sales;' }]} />
          <Typography variant="body2">
            Each CTE can use the ones defined before it, so a big problem becomes a readable pipeline.
          </Typography>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
