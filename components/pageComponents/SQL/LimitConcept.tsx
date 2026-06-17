'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';
import SqlPlayground from './SqlPlayground';

export default function LimitConcept() {
  return (
    <ConceptWrapper title="LIMIT & OFFSET" description="Return only a slice of the rows — the top few, or one page at a time.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="LIMIT caps the number of rows" type="key-concepts">
            <Typography variant="body2">
              <code>LIMIT n</code> returns at most <strong>n</strong> rows. Combined with <code>ORDER BY</code>, it answers &quot;top N&quot; questions; combined with <code>OFFSET</code>, it powers pagination.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Top N">
          <Typography variant="body2" paragraph>
            The two highest-paid employees: sort by salary, then keep the first two rows.
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name, salary' }, { code: 'FROM employees' }, { code: 'ORDER BY salary DESC' }, { code: 'LIMIT 2;' }]} />
          <SqlTable
            caption="Result"
            columns={['name', 'salary']}
            rows={[
              ['Ben', 80000],
              ['Chen', 55000],
            ]}
          />
          <CalloutBox title="LIMIT without ORDER BY is risky" type="warning">
            <Typography variant="body2">
              &quot;Give me 2 rows&quot; with no order returns <em>any</em> 2 rows, which can change between runs. For a meaningful top-N, always pair <code>LIMIT</code> with <code>ORDER BY</code>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Pagination with OFFSET">
          <Typography variant="body2" paragraph>
            <code>OFFSET</code> skips rows before <code>LIMIT</code> takes over. To show &quot;page 2&quot; of 10-row pages, skip the first 10:
          </Typography>
          <CodeSnippet lines={[{ code: 'SELECT name' }, { code: 'FROM employees' }, { code: 'ORDER BY name' }, { code: 'LIMIT 10 OFFSET 10;' }]} />
          <Typography variant="body2">
            Page <em>p</em> with page size <em>s</em> is <code>LIMIT s OFFSET (p - 1) * s</code>.
          </Typography>
        </Section>

        <Section title="Dialect Note">
          <CalloutBox title="Not every database spells it the same" type="info">
            <Typography variant="body2">
              PostgreSQL, MySQL, and SQLite use <code>LIMIT</code>. SQL Server uses <code>TOP</code> or <code>OFFSET ... FETCH</code>. The idea is identical; the keyword differs.
            </Typography>
          </CalloutBox>
        </Section>
        <Section title="Try It: Top N">
          <Typography variant="body2" paragraph>
            Sort by salary (DESC) and set a limit to get the &quot;top N&quot; rows. Change the limit and watch the result shrink.
          </Typography>
          <SqlPlayground features={{ columns: false, where: false, orderBy: true, limit: true }} />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
