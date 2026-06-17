'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import CrudPlayground from './CrudPlayground';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function DeleteConcept() {
  return (
    <ConceptWrapper title="DELETE" description="Remove rows from a table.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="DELETE removes whole rows" type="key-concepts">
            <Typography variant="body2">
              <code>DELETE FROM</code> a table removes the rows matched by <code>WHERE</code>. It deletes entire rows — to blank out a single column instead, use <code>UPDATE ... SET col = NULL</code>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="Delete Specific Rows">
          <CodeSnippet lines={[{ code: 'DELETE FROM customers' }, { code: "WHERE country = 'Spain';" }]} />
          <CalloutBox title="No WHERE empties the table" type="warning">
            <Typography variant="body2">
              <code>DELETE FROM customers;</code> removes <strong>every</strong> row. As with UPDATE, preview your <code>WHERE</code> with a <code>SELECT</code> first, and ideally run deletes inside a transaction so you can roll back.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="DELETE vs TRUNCATE vs DROP">
          <CalloutBox title="Three different 'removes'" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><strong>DELETE</strong> — removes selected rows; can be filtered and rolled back.</Typography>
              <Typography variant="body2"><strong>TRUNCATE</strong> — instantly empties the whole table; faster, but no <code>WHERE</code>.</Typography>
              <Typography variant="body2"><strong>DROP</strong> — removes the table itself, structure and all.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Foreign Keys Can Block Deletes">
          <Typography variant="body2">
            If other rows reference the one you are deleting (e.g. orders pointing at a customer), a foreign key may stop the delete to protect data integrity. You then delete the dependent rows first, or configure <code>ON DELETE CASCADE</code>.
          </Typography>
        </Section>
        <Section title="Try It: Delete Rows">
          <Typography variant="body2" paragraph>
            Delete a row by id and watch the table shrink. Then press Reset — in a real database you would wrap risky deletes in a transaction so you could roll back.
          </Typography>
          <CrudPlayground only="delete" />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
