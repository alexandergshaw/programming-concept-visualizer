'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import TableOfContents from '@/components/common/TableOfContents';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from './SqlTable';

export default function DatabasesTablesConcept() {
  return (
    <ConceptWrapper title="Databases, Tables & Rows" description="How data is organized before you can query it.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="Database -> tables -> rows" type="key-concepts">
            <Typography variant="body2">
              A <strong>database</strong> is a collection of <strong>tables</strong>. Each table holds one kind of thing (customers, orders, products). Every table is a grid of <strong>rows</strong> (records) and <strong>columns</strong> (fields).
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="A Table Is a Grid">
          <Typography variant="body2" paragraph>
            Here is a <code>customers</code> table. Each <strong>row</strong> is one customer; each <strong>column</strong> is one piece of information about every customer.
          </Typography>
          <SqlTable
            name="customers"
            columns={['id', 'name', 'country', 'signup_year']}
            rows={[
              [1, 'Ana', 'France', 2021],
              [2, 'Ben', 'Canada', 2022],
              [3, 'Chen', 'France', 2023],
            ]}
          />
          <CalloutBox title="Vocabulary" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>Row / record:</strong> one entity — a single customer.</Typography>
              <Typography variant="body2"><strong>Column / field:</strong> one attribute — like <code>country</code> — with a fixed data type.</Typography>
              <Typography variant="body2"><strong>Primary key:</strong> a column (often <code>id</code>) whose value uniquely identifies each row.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Why Split Data Across Tables?">
          <Typography variant="body2" paragraph>
            Instead of one giant spreadsheet, related data is split into focused tables that link to each other by id. Customers live in one table, their orders in another:
          </Typography>
          <SqlTable
            name="orders"
            columns={['id', 'customer_id', 'total']}
            rows={[
              [101, 1, 40],
              [102, 1, 25],
              [103, 3, 90],
            ]}
            highlight={[1]}
          />
          <Typography variant="body2" paragraph>
            The highlighted <code>customer_id</code> points back to <code>customers.id</code>. This keeps each fact in one place and lets you combine tables later with a <strong>JOIN</strong>.
          </Typography>
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2">A database is made of tables; a table is rows and columns.</Typography>
              <Typography variant="body2">Each column has a fixed data type; each row is one record.</Typography>
              <Typography variant="body2">Tables reference each other by id, which is what makes SQL &quot;relational.&quot;</Typography>
            </Box>
          </CalloutBox>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
