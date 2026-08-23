import React from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '../../common/TableOfContents';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';

export default function NoneTypeConcept() {
  const title = "Understanding the None Type";
  const description = "Learn how the None type represents the absence of a value, specifically in the context of missing data like URLs.";

  const codeExample = `
# Scenario: A user profile with an optional website URL
username = "coder_pro"
website_url = None

def get_website_display(url):
    if url is None:
        return "No website provided"
    return f"Visit at: {url}"

print(get_website_display(website_url))
# Output: No website provided
  `.trim();

  return (
    <ConceptWrapper title={title} description={description}>
      <TableOfContents>
        <Section title="Big Idea">
          <CalloutBox type="info">
            In programming, <strong>None</strong> is a special object used to signify the absence of a value. 
            When a URL is missing for a user account, we don't use an empty string or a placeholder; 
            we use <strong>None</strong> to explicitly represent that "nothing exists here."
          </CalloutBox>
        </Section>

        <Section title="Code Walkthrough">
          <p>
            Observe how we check for the existence of data using the <code>is</code> operator. 
            Because <code>None</code> is a singleton, it is best practice to compare it using identity.
          </p>
          <CodeSnippet language="python" code={codeExample} />
        </Section>

        <Section title="Common Mistakes">
          <ul>
            <li style={{ color: 'var(--danger)' }}>
              <strong>Confusing None with an empty string:</strong> <code>""</code> is still a string object, whereas <code>None</code> is the absence of any object.
            </li>
            <li style={{ color: 'var(--warning)' }}>
              <strong>Using equality (==) instead of identity (is):</strong> While <code>==</code> often works, <code>if variable is None:</code> is the idiomatic standard in Python.
            </li>
            <li style={{ color: 'var(--ink)' }}>
              <strong>Forgetting to handle None:</strong> Attempting to perform string operations (like <code>.split()</code>) on <code>None</code> will result in an <code>AttributeError</code>.
            </li>
          </ul>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}