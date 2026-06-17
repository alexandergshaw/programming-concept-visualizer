'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function DataTypesConcept() {
  return (
    <ConceptWrapper title="Data Types" description="Every column stores one kind of value — text, numbers, dates, or true/false.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Each column has a fixed type" type="key-concepts">
            <Typography variant="body2">
              When a table is created, every column is given a <strong>data type</strong>. That type decides what can be stored, how it sorts, and which operations make sense (you can add numbers, but not text).
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="The Common Types">
          <SqlTable
            columns={['Category', 'Example types', 'Stores']}
            rows={[
              ['Text', 'VARCHAR(n), TEXT, CHAR(n)', "'Ana', 'France'"],
              ['Whole numbers', 'INTEGER, BIGINT, SMALLINT', '42, -7'],
              ['Decimals', 'DECIMAL(p,s), NUMERIC, REAL', '19.99'],
              ['True / false', 'BOOLEAN', 'TRUE, FALSE'],
              ['Dates & times', 'DATE, TIME, TIMESTAMP', "'2024-05-01'"],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="Choosing a Type">
          <CalloutBox title="Rules of thumb" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Use <code>DECIMAL</code> for money</strong>, never a floating-point type — <code>REAL</code>/<code>FLOAT</code> can introduce rounding errors.</Typography>
              <Typography variant="body2"><strong>Use <code>VARCHAR(n)</code> for short text</strong> with a sensible limit; <code>TEXT</code> for long, free-form text.</Typography>
              <Typography variant="body2"><strong>Store dates as <code>DATE</code>/<code>TIMESTAMP</code></strong>, not text, so you can sort and do date math.</Typography>
            </Box>
          </CalloutBox>
          <CodeSnippet
            lines={[
              { code: 'CREATE TABLE products (' },
              { code: '    id        INTEGER,' },
              { code: '    name      VARCHAR(100),' },
              { code: '    price     DECIMAL(10, 2),' },
              { code: '    in_stock  BOOLEAN,' },
              { code: '    added_on  DATE' },
              { code: ');' },
            ]}
          />
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">Types control what a column can hold and how it behaves.</Typography>
              <Typography variant="body2">Money -&gt; DECIMAL; short text -&gt; VARCHAR; dates -&gt; DATE/TIMESTAMP.</Typography>
              <Typography variant="body2">Exact type names vary a little between database systems.</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
