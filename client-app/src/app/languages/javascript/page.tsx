'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import ArrayConcept from '../../../../components/concepts/ArrayConcept';

const allNavItems = ["Arrays"];

export default function JavaScriptPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  useEffect(() => {
    const conceptFromUrl = searchParams.get('concept');
    if (conceptFromUrl) {
      setSelectedConcept(conceptFromUrl);
    }
  }, [searchParams]);

  const handleSelectConcept = (concept: string) => {
    router.push(`/languages/javascript?concept=${encodeURIComponent(concept.toLowerCase())}`);
    setSelectedConcept(concept);
  };

  const filteredItems = allNavItems.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = (concept: string | null) => {
    if (!concept) return null;

    switch (concept.toLowerCase()) {
      case 'arrays':
        return <ArrayConcept />;
      case 'maps':
        return <p className="concept-block">JavaScript objects store key-value pairs and represent structured data.</p>;
      case 'sets':
        return <p className="concept-block">Loops include <code>for</code>, <code>while</code>, and <code>forEach</code> for repeating operations.</p>;
      case 'conditionals':
        return <p className="concept-block">Use <code>if</code>, <code>else</code>, and <code>switch</code> to control flow based on logic.</p>;
      default:
        return null;
    }
  };

  return (
    <main className="js-layout">
      <Sidebar
        title="JavaScript"
        items={filteredItems}
        onSelect={handleSelectConcept}
      />

      <section className="js-content">
        <h1 className="js-page-title">JavaScript Visualizer</h1>
        <p className="js-page-subtitle">
          Visualize how core JavaScript programming concepts behave.
        </p>

        <input
          type="text"
          placeholder="Search concepts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <div style={{ marginTop: '40px' }}>
          {renderContent(selectedConcept)}
        </div>
      </section>
    </main>
  );
}
