'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const languages = ["Python", "JavaScript", "TypeScript", "Java", "PHP"];

export default function LandingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (language: string) => {
    const slug = language.toLowerCase();
    router.push(`/languages/${slug}`);
  };

  return (
    <main style={{ padding: '60px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold' }}>Coding Languages Visualizer</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '30px' }}>
          Select a language to explore how its data structures work.
        </p>

        <input
          type="text"
          placeholder="Search languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            width: '100%',
            maxWidth: '400px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            marginBottom: '30px'
          }}
        />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '16px'
        }}>
          {filteredLanguages.map((language) => (
            <div
              key={language}
              onClick={() => handleClick(language)}
              style={{
                padding: '20px 30px',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '10px',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              {language}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
