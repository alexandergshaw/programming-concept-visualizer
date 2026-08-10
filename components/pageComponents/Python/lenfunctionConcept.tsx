import React from 'react';
import { 
  ConceptWrapper, 
  TableOfContents, 
  Section, 
  CalloutBox, 
  CodeSnippet 
} from 'components/common';

export default function lenfunctionConcept() {
  return (
    <ConceptWrapper
      title="The len() Function in Dictionaries"
      description="Understanding how to determine the size and presence of data within Python dictionaries using the built-in len() function."
    >
      <TableOfContents />

      <Section id="big-idea" title="Big Idea: Size Matters">
        <p>
          In Computer Science, knowing whether a data structure contains information is a fundamental task. 
          The <code>len()</code> function returns the number of key-value pairs present in a dictionary.
        </p>
        <CalloutBox variant="info">
          <strong>Key Principle:</strong> If <code>len(my_dict)</code> returns 0, the dictionary is empty. 
          This is a common and efficient way to check if a collection contains any data before attempting to access its keys.
        </CalloutBox>
      </Section>

      <Section id="code-walkthrough" title="Code Walkthrough">
        <p>Observe how <code>len()</code> updates as we populate the dictionary:</p>
        <CodeSnippet language="python">
{`# Initialize an empty dictionary
student_grades = {}
print(len(student_grades))  # Output: 0

# Adding data
student_grades["Alice"] = 95
student_grades["Bob"] = 88

# Check length again
print(len(student_grades))  # Output: 2

# Using len() to check for data
if len(student_grades) > 0:
    print("Classroom has active records.")`}
        </CodeSnippet>
      </Section>

      <Section id="common-mistakes" title="Common Mistakes">
        <ul>
          <li>
            <strong>Confusing 0 with None:</strong> An empty dictionary <code>{"{}"}</code> has a length of 0, but it is not <code>None</code>.
          </li>
          <li>
            <strong>Counting Keys vs Values:</strong> Remember that <code>len()</code> counts the number of <em>entries</em> (pairs). If a dictionary has 3 keys, it has 3 values, and <code>len()</code> will return 3.
          </li>
          <li>
            <strong>Misinterpreting Truthiness:</strong> While <code>if len(my_dict):</code> works, Pythonic style often prefers <code>if my_dict:</code> to check for non-emptiness. However, <code>len()</code> is explicit and helpful for conditional logic involving size thresholds.
          </li>
        </ul>
      </Section>
    </ConceptWrapper>
  );
}