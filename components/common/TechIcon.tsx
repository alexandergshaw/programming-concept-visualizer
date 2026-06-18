'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPython, faJs, faReact } from '@fortawesome/free-brands-svg-icons';
import { faDatabase, faGraduationCap, faBug, faSitemap } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Entry {
  icon: IconDefinition;
  color: string;
}

// Match the sidebar title (e.g. "Python Visualizer") to the official-ish icon.
// Tints are chosen to read well on the dark sidebar.
function resolve(title: string): Entry | null {
  const t = title.toLowerCase();
  if (t.includes('python')) return { icon: faPython, color: '#5a9fd4' };
  if (t.includes('javascript')) return { icon: faJs, color: '#f7df1e' };
  if (t.includes('react')) return { icon: faReact, color: '#61dafb' };
  if (t.includes('sql')) return { icon: faDatabase, color: '#4fc3b0' };
  if (t.includes('database')) return { icon: faDatabase, color: '#8b8ff5' };
  if (t.includes('basics')) return { icon: faGraduationCap, color: '#34d399' };
  if (t.includes('testing')) return { icon: faBug, color: '#fbbf24' };
  if (t.includes('website') || t.includes('management')) return { icon: faSitemap, color: '#a78bfa' };
  return null;
}

export default function TechIcon({ title }: { title: string }) {
  const entry = resolve(title);
  if (!entry) return null;
  return (
    <FontAwesomeIcon
      icon={entry.icon}
      style={{ color: entry.color, fontSize: 22, marginRight: 10, flexShrink: 0 }}
    />
  );
}
