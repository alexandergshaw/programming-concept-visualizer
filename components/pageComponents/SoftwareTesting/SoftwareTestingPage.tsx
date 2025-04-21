'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';

const navItems = [
  {
    label: 'User Acceptance Testing',
    value: 'user acceptance testing',
    children: [
      { label: 'Demo', value: 'demo' },
    ],
  },
];

export default function JavaScriptPage() {
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
      case 'user acceptance testing':
        return <>test</>;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/skills/software-testing?concept=${value}`);
    setSelectedConcept(value);
  };

  return (
    <PageWrapper pageTitle={'Software Testing'} navItems={navItems} defaultOpen={["user acceptance testing"]} handleSelect={handleSelect}>
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
