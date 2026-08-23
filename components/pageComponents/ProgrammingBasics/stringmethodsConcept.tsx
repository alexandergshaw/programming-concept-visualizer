import React from 'react';
import { 
  ConceptWrapper, 
  TableOfContents, 
  Section, 
  CalloutBox, 
  CodeSnippet 
} from 'components/common';

export default function stringmethodsConcept() {
  const codeExample = `const url = "https://example.com";

// Using the .startsWith() method
if (url.startsWith("https")) {
  console.log("The URL is secure.");
} else {
  console.log("The URL is not secure.");
}`;

  return (
    <ConceptWrapper
      title="String Methods: Validation"
      description="Learn how to manipulate and inspect string data using built-in methods, specifically focusing on protocol validation."
    >
      <TableOfContents>
        <Section title="Big Idea">
          <CalloutBox title="Understanding String Methods">
            String methods allow developers to interact with text data dynamically. In the context of computer science principles, validating input—such as ensuring a URL starts with 'https'—is a fundamental security practice to ensure data integrity and user safety.
          </CalloutBox>
        </Section>

        <Section title="Code Walkthrough">
          <p>
            The <code>startsWith()</code> method returns a boolean value (true or false). It is highly efficient for checking the beginning of strings without needing complex regular expressions.
          </p>
          <CodeSnippet code={codeExample} language="typescript" />
          <p>
            In this example, the condition evaluates the start of the string against the literal <code>"https"</code>. If the condition is met, the program proceeds with secure operations.
          </p>
        </Section>

        <Section title="Common Mistakes">
          <ul>
            <li style={{ color: 'var(--danger)' }}>
              <strong>Case Sensitivity:</strong> Remember that <code>"Https"</code> is not the same as <code>"https"</code>. Always normalize inputs using <code>.toLowerCase()</code> if user input is inconsistent.
            </li>
            <li style={{ color: 'var(--warning)' }}>
              <strong>Type Errors:</strong> Attempting to call <code>.startsWith()</code> on a null or undefined variable will throw an error. Always ensure your input is a string first.
            </li>
            <li style={{ color: 'var(--info)' }}>
              <strong>Whitespace:</strong> Leading spaces (e.g., " https") will cause <code>.startsWith("https")</code> to return false. Use <code>.trim()</code> before checking.
            </li>
          </ul>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}