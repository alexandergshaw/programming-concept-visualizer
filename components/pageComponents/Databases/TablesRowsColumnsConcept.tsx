'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';
import SqlPlayground from '../SQL/SqlPlayground';

export default function TablesRowsColumnsConcept() {
  return (
    <ConceptWrapper title="Tables, Rows & Columns" description="The grid that the entire relational model is built on.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="A table is a grid of one kind of thing" type="key-concepts">
            <Typography variant="body2">
              In a relational database, data lives in <strong>tables</strong>. Each table holds one kind of entity; each <strong>row</strong> is one of those entities; each <strong>column</strong> is one attribute they all share.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="See It">
          <SqlTable
            name="students"
            columns={['id', 'name', 'grade', 'enrolled']}
            rows={[
              [1, 'Ana', 'A', 'true'],
              [2, 'Ben', 'B', 'true'],
              [3, 'Chen', 'A', 'false'],
            ]}
          />
          <CalloutBox title="The vocabulary" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Table:</strong> the whole grid — all students.</Typography>
              <Typography variant="body2"><strong>Row (record / tuple):</strong> one student.</Typography>
              <Typography variant="body2"><strong>Column (field / attribute):</strong> one property, like <code>grade</code>, with a fixed type.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Two Quiet Rules">
          <CalloutBox title="What makes it 'relational'" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Every column has one type.</strong> A <code>grade</code> column holds grades, never a phone number.</Typography>
              <Typography variant="body2"><strong>Row order doesn&apos;t matter.</strong> You identify a row by its data (its key), not its position.</Typography>
            </Box>
          </CalloutBox>
          <Typography variant="body2" sx={{ mt: 1 }}>
            That second rule is why every table needs a reliable way to point at a single row — a <strong>primary key</strong>, up next.
          </Typography>
        </Section>
        <Section title="Try It: Query a Table">
          <Typography variant="body2" paragraph>
            Here is a sample <code>employees</code> table. Choose columns, filter, and sort it — the query and result update live. This is exactly what reading from a table feels like.
          </Typography>
          <SqlPlayground features={{ columns: true, where: true, orderBy: true, limit: false }} />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
