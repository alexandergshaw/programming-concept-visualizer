'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import GroupByPlayground from './GroupByPlayground';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function HavingConcept() {
  return (
    <ConceptWrapper title="HAVING" description="Filter groups after aggregating — like WHERE, but for GROUP BY results.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="WHERE filters rows, HAVING filters groups" type="key-concepts">
            <Typography variant="body2">
              <code>WHERE</code> runs <em>before</em> grouping, on individual rows. <code>HAVING</code> runs <em>after</em> grouping, on the aggregated results — so it can test things like <code>COUNT(*)</code> or <code>AVG(salary)</code>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Keep Only Big Departments">
          <Typography variant="body2" paragraph>
            Show departments with more than one employee:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT department, COUNT(*) AS people' }, { code: 'FROM employees' }, { code: 'GROUP BY department' }, { code: 'HAVING COUNT(*) > 1;' }]} />
          <SqlTable
            caption="Result — Engineering (1 person) is filtered out"
            columns={['department', 'people']}
            rows={[['Sales', 2]]}
          />
        </Section>

        <Section title="WHERE and HAVING Together">
          <Typography variant="body2" paragraph>
            They are complementary. Filter rows first with <code>WHERE</code>, group, then filter groups with <code>HAVING</code>:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT department, AVG(salary) AS avg_salary' }, { code: 'FROM employees' }, { code: 'WHERE salary > 0' }, { code: 'GROUP BY department' }, { code: 'HAVING AVG(salary) > 60000;' }]} />
          <CalloutBox title="Quick rule" type="info">
            <Typography variant="body2">
              If your condition uses an aggregate, it belongs in <code>HAVING</code>. If it tests a plain column value, put it in <code>WHERE</code> (it is faster — fewer rows reach the grouping step).
            </Typography>
          </CalloutBox>
        </Section>
        <Section title="Try It: Filter Groups">
          <Typography variant="body2" paragraph>
            Group the rows, then set a <code>HAVING</code> condition on the aggregate. Watch groups disappear when they fail the test.
          </Typography>
          <GroupByPlayground having />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
