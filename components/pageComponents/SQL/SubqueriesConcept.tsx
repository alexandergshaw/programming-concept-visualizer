'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function SubqueriesConcept() {
  return (
    <ConceptWrapper title="Subqueries" description="A query nested inside another query — a query that feeds a query.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="A query inside a query" type="key-concepts">
            <Typography variant="body2">
              A <strong>subquery</strong> runs first and hands its result to the outer query. It lets you use a computed value — like &quot;the average salary&quot; — inside a <code>WHERE</code> without knowing it in advance.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="A Value from Another Query">
          <Typography variant="body2" paragraph>
            Find everyone paid above the company average. The inner query computes the average; the outer query compares against it:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name, salary' }, { code: 'FROM employees' }, { code: 'WHERE salary > (' }, { code: '    SELECT AVG(salary) FROM employees' }, { code: ');' }]} />
          <Typography variant="body2">
            The parentheses run first, producing one number, which the outer <code>WHERE</code> then uses.
          </Typography>
        </Section>

        <Section title="Subqueries with IN">
          <Typography variant="body2" paragraph>
            A subquery can return a <em>list</em> for <code>IN</code> — e.g. customers who have placed at least one order:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name' }, { code: 'FROM customers' }, { code: 'WHERE id IN (' }, { code: '    SELECT customer_id FROM orders' }, { code: ');' }]} />
        </Section>

        <Section title="Where Subqueries Can Go">
          <CalloutBox title="Three common spots" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>In WHERE</strong> — compare against a value or list (shown above).</Typography>
              <Typography variant="body2"><strong>In FROM</strong> — treat the subquery&apos;s result as a temporary table.</Typography>
              <Typography variant="body2"><strong>In SELECT</strong> — compute a value per row.</Typography>
            </Box>
          </CalloutBox>
          <Typography variant="body2" sx={{ mt: 1 }}>
            When subqueries get long or repeat, a <strong>CTE</strong> (next) makes them far more readable.
          </Typography>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
