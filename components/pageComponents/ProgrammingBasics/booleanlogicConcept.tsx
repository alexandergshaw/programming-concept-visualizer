import React from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '../../common/TableOfContents';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';

export default function BooleanLogicConcept(): JSX.Element {
  return (
    <ConceptWrapper
      title="Boolean Logic: Access Control"
      description="Understanding how simple boolean return values act as the gateway for program logic and user permissions."
    >
      <TableOfContents />

      <Section id="big-idea" title="The Big Idea">
        <p>
          In computer science, boolean logic is the foundation of decision-making. 
          When we evaluate an expression, the system expects a binary outcome: 
          <strong> true</strong> (access granted) or <strong>false</strong> (access denied).
        </p>
        <CalloutBox title="Core Concept" type="info">
          A boolean check acts as a gatekeeper. By returning a single boolean value from a function, 
          you dictate the flow of the application based on specific conditions.
        </CalloutBox>
      </Section>

      <Section id="code-walkthrough" title="Code Walkthrough">
        <p>
          Observe how the <code>hasAccess</code> function evaluates user credentials and returns 
          a boolean that determines if the rest of the application should proceed.
        </p>
        <CodeSnippet language="typescript">
{`function hasAccess(userLevel: number, requiredLevel: number): boolean {
  // Returns true if the user meets the threshold, false otherwise
  return userLevel >= requiredLevel;
}

const userRole = 3;
const minLevel = 5;

if (hasAccess(userRole, minLevel)) {
  console.log("Access Granted");
} else {
  console.log("Access Denied");
}`}
        </CodeSnippet>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes">
        <p>
          Students often struggle with the following pitfalls when implementing boolean logic:
        </p>
        <ul>
          <li style={{ color: 'var(--danger)' }}>
            <strong>Confusing Assignment (=) with Comparison (===):</strong> Using a single equals sign 
            attempts to assign a value rather than checking for equality.
          </li>
          <li style={{ color: 'var(--warning)' }}>
            <strong>Redundant Boolean Checks:</strong> Writing <code>if (isLogged === true)</code> 
            is unnecessary; simply use <code>if (isLogged)</code>.
          </li>
          <li style={{ color: 'var(--success)' }}>
            <strong>Neglecting Edge Cases:</strong> Always consider what happens when values 
            are equal to the threshold (e.g., using {'>'} vs {'>='}).
          </li>
        </ul>
      </Section>
    </ConceptWrapper>
  );
}