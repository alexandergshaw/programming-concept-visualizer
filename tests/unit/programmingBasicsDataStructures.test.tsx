import React from 'react';
import { render, screen } from '@testing-library/react';
import { programmingBasicsNavItems } from '@/components/pageComponents/navItems';

let selectedConcept: string | null = null;
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({ get: () => selectedConcept }),
}));

jest.mock('framer-motion');

import ProgrammingBasicsPage from '@/components/pageComponents/ProgrammingBasics/ProgrammingBasicsPage';

const dataStructuresConcepts: Array<{ value: string; title: string }> = [
  { value: 'intro-algorithm-analysis', title: 'Introduction to Algorithm Analysis' },
  { value: 'object-oriented-foundations', title: 'Object-Oriented Foundations' },
  { value: 'dynamic-lists', title: 'Dynamic Lists' },
  { value: 'linked-lists', title: 'Linked Lists' },
  { value: 'recursion-foundations', title: 'Recursion Foundations' },
  { value: 'backtracking', title: 'Backtracking' },
  { value: 'advanced-recursion', title: 'Advanced Recursion' },
  { value: 'searching-algorithms', title: 'Searching Algorithms' },
  { value: 'elementary-sorting', title: 'Elementary Sorting' },
  { value: 'advanced-sorting', title: 'Advanced Sorting' },
  { value: 'binary-trees', title: 'Binary Trees' },
  { value: 'binary-search-trees', title: 'Binary Search Trees' },
  { value: 'heaps', title: 'Heaps' },
  { value: 'priority-queues', title: 'Priority Queues' },
  { value: 'hashing', title: 'Hashing' },
  { value: 'hash-tables', title: 'Hash Tables' },
  { value: 'graph-fundamentals', title: 'Graph Fundamentals' },
  { value: 'advanced-algorithm-design-patterns', title: 'Advanced Algorithm Design Patterns' },
];

describe('Programming Basics data structures coverage', () => {
  beforeEach(() => {
    selectedConcept = null;
    mockPush.mockReset();
  });

  it('includes every new Data Structures concept in sidebar nav items', () => {
    const dataStructuresSection = programmingBasicsNavItems.find((item) => item.value === 'data-structures');
    const values = new Set((dataStructuresSection?.children ?? []).map((child) => child.value));

    dataStructuresConcepts.forEach(({ value }) => {
      expect(values.has(value)).toBe(true);
    });
  });

  it.each(dataStructuresConcepts)('renders a concept page for "$title"', async ({ value, title }) => {
    selectedConcept = value;
    render(<ProgrammingBasicsPage />);
    expect(await screen.findByRole('heading', { name: title })).toBeInTheDocument();
  });
});
