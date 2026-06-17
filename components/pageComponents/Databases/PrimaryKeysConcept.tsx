'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';

export default function PrimaryKeysConcept() {
  return (
    <ConceptWrapper title="Primary Keys" description="The column that uniquely identifies each row in a table.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="A primary key names one row, exactly" type="key-concepts">
            <Typography variant="body2">
              A <strong>primary key</strong> is a column (or set of columns) whose value is <strong>unique</strong> and <strong>never null</strong>. It is how the database — and every other table — points to one specific row.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="See It">
          <SqlTable
            name="customers"
            columns={['id (PK)', 'name', 'email']}
            rows={[
              [1, 'Ana', 'ana@x.com'],
              [2, 'Ben', 'ben@x.com'],
              [3, 'Chen', 'chen@x.com'],
            ]}
            highlight={[0]}
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            No two rows share an <code>id</code>, and every row has one. Given <code>id = 2</code> there is exactly one customer it can mean.
          </Typography>
        </Section>

        <Section title="The Two Rules">
          <CalloutBox title="Every primary key must be..." type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Unique:</strong> no two rows have the same value.</Typography>
              <Typography variant="body2"><strong>Not null:</strong> every row has a value.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Natural vs Surrogate Keys">
          <CalloutBox title="Where the key comes from" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Natural key:</strong> real data that happens to be unique (an email, an ISBN). Meaningful, but can change.</Typography>
              <Typography variant="body2"><strong>Surrogate key:</strong> a meaningless auto-generated <code>id</code>. Most tables use one because it never changes.</Typography>
            </Box>
          </CalloutBox>
          <Typography variant="body2" sx={{ mt: 1 }}>
            A primary key in one table is what other tables point at — through a <strong>foreign key</strong>, next.
          </Typography>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
