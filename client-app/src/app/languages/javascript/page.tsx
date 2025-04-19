'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../../../../components/Sidebar';
import ArrayConcept from '../../../../components/concepts/ArrayConcept';
import SetConcept from '../../../../components/concepts/SetConcept';
import MapConcept from '../../../../components/concepts/MapConcept';
import { Alert } from '@mui/material';
import Link from 'next/link';

const allNavItems = ["Arrays", "Sets", "Maps"];

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
        return <MapConcept />;
      case 'sets':
        return <SetConcept />;
      case 'conditionals':
        return <p className="concept-block">Use <code>if</code>, <code>else</code>, and <code>switch</code> to control flow based on logic.</p>;
      default:
        return null;
    }
  };

  return (
    <main className="js-layout">
      <Sidebar
        title="Topics"
        items={filteredItems}
        onSelect={handleSelectConcept}
      />
      <div>
        <Alert severity="info" className="feedback-banner" sx={{ mb: 3 }}>
          Have ideas to improve this page?{' '}
          <Link
            href="https://your-feedback-form-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
              Submit feedback here.
          </Link>
        </Alert>
        <section className="js-content">
          <h1 className="js-page-title">JavaScript Visualizer</h1>
          <p className="js-page-subtitle">
            Visualize how core JavaScript programming concepts behave.
          </p>
          <div style={{ marginTop: '40px' }}>
            {renderContent(selectedConcept)}
          </div>
        </section>
      </div>

    </main>
  );
}
