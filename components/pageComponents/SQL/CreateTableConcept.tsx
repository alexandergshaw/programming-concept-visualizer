'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import CreateTableBuilder from './CreateTableBuilder';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CreateTableConcept() {
  return (
    <ConceptWrapper title="CREATE TABLE" description="Define a new table: its columns, their types, and their rules.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="CREATE TABLE defines structure" type="key-concepts">
            <Typography variant="body2">
              Before you can store data you define the <strong>schema</strong>: the table name, each column&apos;s name and data type, and any constraints. This is part of SQL&apos;s DDL (Data Definition Language).
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="A Complete Example">
          <CodeSnippet lines={[{ code: 'CREATE TABLE customers (' }, { code: '    id        INTEGER PRIMARY KEY,' }, { code: '    name      VARCHAR(100) NOT NULL,' }, { code: '    country   VARCHAR(50),' }, { code: "    status    VARCHAR(20) DEFAULT 'active'," }, { code: '    joined_on DATE' }, { code: ');' }]} />
          <CalloutBox title="Reading the definition" type="info">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><code>id INTEGER PRIMARY KEY</code> — unique identifier for each row.</Typography>
              <Typography variant="body2"><code>name VARCHAR(100) NOT NULL</code> — text up to 100 chars, required.</Typography>
              <Typography variant="body2"><code>status ... DEFAULT &apos;active&apos;</code> — value used when none is given.</Typography>
            </Box>
          </CalloutBox>
        </Section>

        <Section title="Auto-generated IDs">
          <Typography variant="body2" paragraph>
            Most tables let the database assign ids automatically. The keyword differs by system:
          </Typography>
          <CodeSnippet lines={[{ code: 'id SERIAL PRIMARY KEY          -- PostgreSQL' }, { code: 'id INT AUTO_INCREMENT PRIMARY KEY  -- MySQL' }, { code: 'id INTEGER PRIMARY KEY AUTOINCREMENT  -- SQLite' }]} />
        </Section>

        <Section title="Key Takeaways">
          <CalloutBox title="Summary" type="success">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25, mt: 1 }}>
              <Typography variant="body2"><code>CREATE TABLE</code> sets the name, columns, types, and constraints.</Typography>
              <Typography variant="body2">Add constraints like <code>PRIMARY KEY</code>, <code>NOT NULL</code>, <code>DEFAULT</code> per column.</Typography>
              <Typography variant="body2">Constraints are covered in depth next.</Typography>
            </Box>
          </CalloutBox>
        </Section>
        <Section title="Try It: Build a Table">
          <Typography variant="body2" paragraph>
            Toggle columns and constraints on and off and watch the <code>CREATE TABLE</code> statement assemble itself.
          </Typography>
          <CreateTableBuilder />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
