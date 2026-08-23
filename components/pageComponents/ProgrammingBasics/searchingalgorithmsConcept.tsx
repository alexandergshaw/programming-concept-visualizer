import React from 'react';
import { ConceptWrapper, TableOfContents, Section, CalloutBox, CodeSnippet } from 'components/common';

export default function SearchingAlgorithmsConcept() {
  const sections = [
    { id: 'big-idea', title: 'The Big Idea' },
    { id: 'algorithms', title: 'Linear vs. Binary Search' },
    { id: 'walkthrough', title: 'Code Walkthrough' },
    { id: 'mistakes', title: 'Common Mistakes' }
  ];

  return (
    <ConceptWrapper
      title="Searching Algorithms"
      description="Exploring fundamental techniques to locate data within structured collections like arrays, lists, and trees."
    >
      <TableOfContents sections={sections} />

      <Section id="big-idea" title="The Big Idea">
        <CalloutBox type="info">
          Searching is the process of retrieving information stored within some data structure. 
          The efficiency of your search depends heavily on the structure: linear structures 
          like arrays often require linear time, while sorted structures or trees 
          can leverage logarithmic time via divide-and-conquer strategies.
        </CalloutBox>
      </Section>

      <Section id="algorithms" title="Linear vs. Binary Search">
        <p style={{ color: 'var(--ink)' }}>
          Linear Search iterates through every element, resulting in <strong>O(n)</strong> complexity. 
          Binary Search, applicable only on sorted lists, splits the search space in half 
          repeatedly, achieving <strong>O(log n)</strong> complexity.
        </p>
      </Section>

      <Section id="walkthrough" title="Code Walkthrough">
        <p style={{ color: 'var(--ink)' }}>
          Here is a standard implementation of Binary Search using recursion, which is 
          common in tree-based searching algorithms:
        </p>
        <CodeSnippet language="typescript">
{`function binarySearch(arr: number[], target: number, low: number, high: number): number {
  if (low > high) return -1;
  
  const mid = Math.floor((low + high) / 2);
  
  if (arr[mid] === target) return mid;
  if (arr[mid] > target) return binarySearch(arr, target, low, mid - 1);
  
  return binarySearch(arr, target, mid + 1, high);
}`}
        </CodeSnippet>
      </Section>

      <Section id="mistakes" title="Common Mistakes">
        <ul style={{ color: 'var(--danger)' }}>
          <li>Attempting binary search on an unsorted array.</li>
          <li>Off-by-one errors in index calculation (midpoint).</li>
          <li>Failing to define a base case in recursive searching, leading to stack overflow.</li>
          <li>Ignoring the time cost of sorting prior to a search operation.</li>
        </ul>
      </Section>
    </ConceptWrapper>
  );
}