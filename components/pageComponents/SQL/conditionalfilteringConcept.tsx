import React from 'react';
import { ConceptWrapper, TableOfContents, Section, CalloutBox, CodeSnippet } from 'components/common';

export default function ConditionalFilteringConcept() {
  const codeExample = `
// Data set
const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1000 },
  { id: 2, name: 'Coffee Mug', category: 'Kitchen', price: 15 },
  { id: 3, name: 'Headphones', category: 'Electronics', price: 200 }
];

// Conditional Filtering function
const filterProducts = (items, category, minPrice) => {
  return items.filter(item => {
    const matchesCategory = category ? item.category === category : true;
    const matchesPrice = item.price >= minPrice;
    return matchesCategory && matchesPrice;
  });
};
  `;

  return (
    <ConceptWrapper
      title="Conditional Filtering"
      description="Learn how to dynamically narrow down datasets based on user-defined criteria using declarative programming patterns."
    >
      <TableOfContents />

      <Section title="The Big Idea">
        <CalloutBox type="info">
          Conditional filtering allows your application to handle complex user queries by evaluating multiple boolean conditions against a dataset. Instead of writing multiple unique filter functions, you compose a single filter logic that returns a subset of data only when all active constraints are satisfied.
        </CalloutBox>
      </Section>

      <Section title="Code Walkthrough">
        <p>
          The most effective way to implement conditional filtering is to use the Array.prototype.filter() method combined with logical operators.
        </p>
        <CodeSnippet code={codeExample} language="typescript" />
        <p>
          In this example, we treat undefined criteria as 'pass-through' values by using short-circuit evaluation. If a filter criterion is not provided, the condition defaults to true, effectively ignoring that specific constraint.
        </p>
      </Section>

      <Section title="Common Mistakes">
        <ul>
          <li style={{ color: 'var(--danger)' }}>
            <strong>Mutating Original Data:</strong> Remember that .filter() returns a new array. Never attempt to splice or modify the source array directly within the filter callback.
          </li>
          <li style={{ color: 'var(--warning)' }}>
            <strong>Over-complicating Logic:</strong> Nesting multiple if-statements inside a filter can be difficult to read. Aim to resolve your filter criteria into simple boolean variables first.
          </li>
          <li style={{ color: 'var(--info)' }}>
            <strong>Ignoring Edge Cases:</strong> Always verify how your filter behaves when all criteria are null or undefined. Your application should ideally return the entire dataset in those instances.
          </li>
        </ul>
      </Section>
    </ConceptWrapper>
  );
}