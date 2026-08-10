import React from 'react';
import { ConceptWrapper, TableOfContents, Section, CalloutBox, CodeSnippet } from 'components/common';

export default function membershipoperatorsConcept() {
  const codeExample = `interface User {
  id: number;
  username: string;
}

const user: User = { id: 1, username: "dev_student" };

// Safe verification using 'in' operator
if ("username" in user) {
  console.log("User has a username property:", user.username);
}

// Checking for non-existent property
if (!("email" in user)) {
  console.log("Email property is missing safely.");
}`;

  return (
    <ConceptWrapper
      title="Membership Operators: The 'in' Keyword"
      description="Learn how to use the 'in' operator for type narrowing and property verification in TypeScript."
    >
      <TableOfContents />

      <Section title="Big Idea">
        <CalloutBox title="Verification through Membership">
          The 'in' operator is a fundamental tool for runtime property checking. 
          In Computer Science Principles, we focus on writing robust code that handles 
          data variability. By checking if a property exists before accessing it, 
          you prevent runtime errors and enable TypeScript to narrow down the possible 
          types of an object.
        </CalloutBox>
      </Section>

      <Section title="Code Walkthrough">
        <p>
          The <code>in</code> operator returns <code>true</code> if the specified property 
          is in the object or its prototype chain. Below is an example of checking for 
          object properties before interaction:
        </p>
        <CodeSnippet code={codeExample} language="typescript" />
      </Section>

      <Section title="Common Mistakes">
        <ul>
          <li style={{ color: 'var(--danger)' }}>
            <strong>Accessing properties directly:</strong> Assuming a property exists 
            without checking leads to 'undefined' errors or runtime crashes.
          </li>
          <li style={{ color: 'var(--warning)' }}>
            <strong>Confusing 'in' with Object.keys():</strong> While <code>Object.keys()</code> 
            returns an array of keys, <code>in</code> is a performance-optimized operator 
            for boolean verification.
          </li>
          <li style={{ color: 'var(--info)' }}>
            <strong>Prototype checking:</strong> Remember that <code>in</code> also returns 
            true for properties inherited from the prototype chain, not just the object's 
            own properties.
          </li>
        </ul>
      </Section>
    </ConceptWrapper>
  );
}