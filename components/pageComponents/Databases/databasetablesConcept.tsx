import React from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '../../common/TableOfContents';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';

export default function DatabasetablesConcept() {
  const codeExample = `// A database table schema definition
const UsersTable = {
  tableName: "users",
  columns: [
    { name: "id", type: "INTEGER", primaryKey: true },
    { name: "username", type: "VARCHAR(50)" },
    { name: "email", type: "VARCHAR(100)" }
  ],
  rows: [
    { id: 1, username: "alice_dev", email: "alice@example.com" },
    { id: 2, username: "bob_coder", email: "bob@example.com" }
  ]
};`;

  return (
    <ConceptWrapper
      title="Understanding Database Tables"
      description="Learn how relational databases organize data into structured grids of rows and columns."
    >
      <TableOfContents>
        <Section title="The Big Idea">
          <CalloutBox variant="info">
            Think of a database table as a digital spreadsheet. It is the fundamental structure used to store related information in a relational database. Each table acts as a collection of records that share the same attributes.
          </CalloutBox>
          <p style={{ color: 'var(--ink)' }}>
            A database table consists of two main components:
            <ul>
              <li><strong>Columns:</strong> Define the categories of data (e.g., "Email" or "Created Date"). Every cell in a column must contain the same data type.</li>
              <li><strong>Rows:</strong> Represent a single, unique record in the table. Each row contains data for every column defined in the table structure.</li>
            </ul>
          </p>
        </Section>

        <Section title="Code Walkthrough">
          <p style={{ color: 'var(--ink)' }}>
            In code, we represent tables by defining a schema (the structure) and then populating it with data entries. Observe how each row maps precisely to the columns defined in the schema.
          </p>
          <CodeSnippet language="typescript" code={codeExample} />
        </Section>

        <Section title="Common Mistakes">
          <div style={{ borderLeft: '4px solid var(--danger)', paddingLeft: '1rem' }}>
            <h4 style={{ color: 'var(--danger)' }}>1. Using inconsistent data types</h4>
            <p style={{ color: 'var(--ink)' }}>Attempting to store text in a column strictly defined as an integer will cause database errors or silent data truncation.</p>

            <h4 style={{ color: 'var(--warning)' }}>2. Neglecting Primary Keys</h4>
            <p style={{ color: 'var(--ink)' }}>Every table should have a primary key. Without a unique identifier for each row, it becomes impossible to reliably update or delete specific records.</p>
          </div>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}