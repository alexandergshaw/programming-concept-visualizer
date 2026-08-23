import React from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '../../common/TableOfContents';
import Section from '../../common/Section';
import CalloutBox from '../../common/CalloutBox';
import CodeSnippet from '../../common/CodeSnippet';

export default function LinkedListsConcept() {
  const sections = [
    { id: 'big-idea', title: 'The Big Idea' },
    { id: 'code-walkthrough', title: 'Code Walkthrough' },
    { id: 'common-mistakes', title: 'Common Mistakes' },
  ];

  return (
    <ConceptWrapper
      title="Linked Lists: Dynamic Data Structures"
      description="A fundamental building block for stacks, queues, and trees, linked lists offer dynamic memory allocation compared to static arrays."
    >
      <TableOfContents sections={sections} />

      <Section id="big-idea" title="The Big Idea">
        <CalloutBox variant="info">
          Unlike arrays that store elements in contiguous memory, linked lists consist of nodes where each element points to the next. 
          This structure is the backbone for implementing complex data structures like stacks, queues, and tree traversal algorithms.
        </CalloutBox>
        <p style={{ color: 'var(--ink)' }}>
          Linked lists allow for efficient insertion and deletion of elements, as you only need to update the pointers. 
          However, they lack the O(1) random access provided by arrays, making searching slower.
        </p>
      </Section>

      <Section id="code-walkthrough" title="Code Walkthrough">
        <p style={{ color: 'var(--ink)' }}>
          Below is a simple implementation of a Singly Linked List node and a basic insertion method in TypeScript:
        </p>
        <CodeSnippet code={`
class Node<T> {
  value: T;
  next: Node<T> | null = null;
  constructor(val: T) { this.value = val; }
}

class LinkedList<T> {
  head: Node<T> | null = null;
  
  append(val: T): void {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }
}`} />
      </Section>

      <Section id="common-mistakes" title="Common Mistakes">
        <ul style={{ color: 'var(--danger)' }}>
          <li>
            <strong>Dangling Pointers:</strong> Forgetting to update references during node deletion, leading to memory leaks or orphaned nodes.
          </li>
          <li>
            <strong>Infinite Loops:</strong> Failing to handle the termination condition in recursive traversals or while loops.
          </li>
          <li>
            <strong>Empty List Edge Cases:</strong> Attempting to access .next on a null head reference without proper null-checking.
          </li>
        </ul>
      </Section>
    </ConceptWrapper>
  );
}