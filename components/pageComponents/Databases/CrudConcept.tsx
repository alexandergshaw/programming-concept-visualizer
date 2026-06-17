'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';
import TableOfContents from '@/components/common/TableOfContents';
import CrudPlayground from '../SQL/CrudPlayground';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SqlTable from '../SQL/SqlTable';

export default function CrudConcept() {
  return (
    <ConceptWrapper title="CRUD Operations" description="The four things every app does with data: Create, Read, Update, Delete.">
      <TableOfContents numbered>
        <Section title="The Big Idea">
          <CalloutBox title="CRUD = the four basic actions" type="key-concepts">
            <Typography variant="body2">
              Almost everything an application does to stored data is one of four operations: <strong>C</strong>reate, <strong>R</strong>ead, <strong>U</strong>pdate, <strong>D</strong>elete. Together they are called <strong>CRUD</strong>.
            </Typography>
          </CalloutBox>
        </Section>

        <Section title="CRUD Maps to SQL">
          <SqlTable
            columns={['Action', 'SQL', 'Everyday example']}
            rows={[
              ['Create', 'INSERT', 'sign up a new user'],
              ['Read', 'SELECT', 'load your profile'],
              ['Update', 'UPDATE', 'change your password'],
              ['Delete', 'DELETE', 'remove a post'],
            ]}
            highlight={[0]}
          />
        </Section>

        <Section title="One of Each">
          <CodeSnippet
            lines={[
              { code: "INSERT INTO users (name) VALUES ('Ana');  -- Create" },
              { code: 'SELECT * FROM users WHERE id = 1;          -- Read' },
              { code: "UPDATE users SET name = 'Ana B.' WHERE id = 1;  -- Update" },
              { code: 'DELETE FROM users WHERE id = 1;            -- Delete' },
            ]}
          />
        </Section>

        <Section title="Why the Acronym Matters">
          <CalloutBox title="A shared vocabulary" type="success">
            <Typography variant="body2">
              CRUD shows up far beyond SQL — REST APIs, admin panels, and form builders are all organized around the same four actions. Each detailed statement (INSERT/SELECT/UPDATE/DELETE) has its own page in the SQL section.
            </Typography>
          </CalloutBox>
        </Section>
        <Section title="Try It: All Four Operations">
          <Typography variant="body2" paragraph>
            Create, read, update, and delete rows in a live table. Every change shows the SQL it maps to.
          </Typography>
          <CrudPlayground />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
