'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../../../../components/Sidebar'
import ArrayConcept from '../../../../components/concepts/Array.concept'
import '../../../../styles/javascript.css';

const allNavItems = ["Arrays", "Objects", "Loops", "Functions", "Conditionals"];

export default function JavaScriptPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  useEffect(() => {
    const conceptParam = searchParams.get('concept');
    if (conceptParam) {
      setSelectedConcept(conceptParam);
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
      case 'loops':
        return <p className="concept-block">JavaScript loops like <code>for</code>, <code>while</code>, and <code>forEach</code> allow you to repeat operations.</p>;
      case 'objects':
        return <p className="concept-block">Objects store key-value pairs. You can access properties using dot or bracket notation.</p>;
      case 'functions':
        return <p className="concept-block">Functions encapsulate logic and can be reused. JavaScript supports named and arrow functions.</p>;
      case 'conditionals':
        return <p className="concept-block">Use <code>if</code>, <code>else</code>, and <code>switch</code> to execute code conditionally.</p>;
      default:
        return null;
    }
  };

  return (
    <main className="js-layout">
      <Sidebar title="JavaScript" items={filteredItems} onSelect={handleSelectConcept} />
      <section className="js-content">
        <h1 className="js-page-title">JavaScript Visualizer</h1>
        <p className="js-page-subtitle">
          Visualize arrays, loops, functions, and more in JavaScript.
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
