'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../../../../styles/landing.css'

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
    <main className="landing-wrapper">
      <section className="landing-container">
        <h1 className="landing-title">Coding Languages Visualizer</h1>
        <p className="landing-subtitle">
          Select a language to explore how its data structures and operations work.
        </p>

        <input
          type="text"
          placeholder="Search languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="landing-search"
        />

        <div className="language-grid">
          {filteredLanguages.map((language) => (
            <div
              key={language}
              className="language-card"
              onClick={() => handleClick(language)}
            >
              {language}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
