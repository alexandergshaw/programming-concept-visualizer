'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import FetchExecuteConcept from './FetchExecuteConcept';
import CompilersInterpretersConcept from './CompilersInterpretersConcept';
import MemoryConcept from './MemoryConcept';

const navItems = [
  {
    label: 'Foundational Concepts',
    value: 'foundational-concepts',
    children: [
      { label: 'Compilers & Interpreters', value: 'compilers-interpreters' },
      { label: 'Fetch & Execute Cycle', value: 'fetch-execute' },
      { label: 'Memory', value: 'memory' },
    ],
  },
];

export default function ProgrammingBasicsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  useEffect(() => {
    const conceptFromUrl = searchParams.get('concept');
    if (conceptFromUrl) {
      setSelectedConcept(conceptFromUrl);
    }
  }, [searchParams]);

  const renderContent = (concept: string | null) => {
    if (!concept) return null;
    switch (concept.toLowerCase()) {
      case 'fetch-execute':
        return <FetchExecuteConcept />;
      case 'compilers-interpreters':
        return <CompilersInterpretersConcept />;
      case 'memory':
        return <MemoryConcept />;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/skills/programming-basics?concept=${value}`);
    setSelectedConcept(value);
  };

  return (
    <PageWrapper
      pageTitle="Programming Basics"
      navItems={navItems}
      defaultOpen={['Programming Basics']}
      handleSelect={handleSelect}
    >
      {selectedConcept ? (
        <>
          {renderContent(selectedConcept)}
        </>
      ) : (
        <div className="empty-page-prompt">
          Please select a topic from the sidebar to get started.
        </div>
      )}
    </PageWrapper>
  );
}