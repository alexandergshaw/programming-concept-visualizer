'use client';

import React, { useState, useEffect } from 'react';
import '../../styles/javascript.css';
import { TextField } from '@mui/material';
import Image from 'next/image';
import TechIcon from './TechIcon';
import { loadOpenSections, saveOpenSections } from './settings';

export interface SidebarItem {
  label: string;
  value: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
  onSelect?: (value: string) => void;
  defaultOpen?: string[];
  activeValue?: string;
  headerImage?: string;
}

export default function Sidebar({ title, items, onSelect, defaultOpen = [], activeValue, headerImage }: SidebarProps) {
  // Starts from defaultOpen, then (once mounted) is restored from localStorage
  // so the user's expanded/collapsed sections persist across visits.
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));
  const [hydrated, setHydrated] = useState(false); // becomes true after the restore pass
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [filteredItems, setFilteredItems] = useState<SidebarItem[]>(items); // State for filtered items
  const [mobileOpen, setMobileOpen] = useState(false); // Off-canvas drawer state (mobile only)

  // Restore the saved open sections for this topic (keyed by title).
  useEffect(() => {
    const saved = loadOpenSections(title);
    if (saved) setOpen(new Set(saved));
    setHydrated(true);
  }, [title]);

  // Persist open sections whenever they change (after the initial restore pass).
  useEffect(() => {
    if (!hydrated) return;
    saveOpenSections(title, Array.from(open));
  }, [open, hydrated, title]);

  // Filter items based on the search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredItems(items);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filterItems = (items: SidebarItem[]): SidebarItem[] =>
        items
          .map((item) => ({
            ...item,
            children: item.children ? filterItems(item.children) : undefined,
          }))
          .filter(
            (item) =>
              item.label.toLowerCase().includes(lowerQuery) ||
              (item.children && item.children.length > 0)
          );

      setFilteredItems(filterItems(items));
    }
  }, [searchQuery, items]);

  const toggle = (value: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  return (
    <>
      <button
        className="js-sidebar-toggle"
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((o) => !o)}
      >
        {mobileOpen ? '✕' : '☰'}
      </button>
      {mobileOpen && (
        <button
          className="js-sidebar-backdrop"
          aria-label="Close navigation menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`js-sidebar${mobileOpen ? ' open' : ''}`}
        style={{
          position: 'fixed', // Fix the sidebar in place
          top: '0', // Full-height left rail, starting at the very top
          left: '0', // Align it to the left of the viewport
          width: '250px', // Set a fixed width for the sidebar
          height: '100vh', // Span the full height of the viewport
          zIndex: 1200, // Sit on top of the header bar (AppBar z-index 1100)
          background: 'var(--chrome-bg)', // Themed "book spine" / terminal rail
          color: 'var(--chrome-fg)',
          overflowY: 'auto', // Allow scrolling if the content overflows
          padding: '16px', // Add some padding for better spacing
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      {/* Topic icon to the left of its title, with one underline beneath both.
          A custom image if provided, otherwise the matching tech icon. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
          paddingBottom: '8px',
          borderBottom: '1px solid var(--chrome-border)',
        }}
      >
        {headerImage ? (
          <Image
            src={headerImage}
            alt=""
            width={20}
            height={20}
            style={{ borderRadius: '4px', objectFit: 'contain', flexShrink: 0 }}
          />
        ) : (
          <TechIcon title={title} />
        )}
        <h2 className="js-sidebar-title" style={{ margin: 0 }}>{title}</h2>
      </div>
      {/* Search Box */}
      <TextField
        placeholder="Search concepts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="js-sidebar-search"
        sx={{
          marginBottom: '16px',
          backgroundColor: 'transparent',
          color: 'var(--chrome-fg)',
          borderRadius: '4px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'var(--chrome-border)',
            },
            '&:hover fieldset': {
              borderColor: 'var(--chrome-fg)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'var(--chrome-fg)',
            },
          },
          '& .MuiInputBase-input': {
            color: 'var(--chrome-fg)',
          },
          '& .MuiInputLabel-root': {
            color: 'var(--chrome-fg)',
          },
        }}
      />
      <ul className="js-nav-list" style={{ padding: 0, margin: 0 }}>
        {filteredItems.map((item) => {
          const isOpen = open.has(item.value);
          return (
            <li
              key={item.value}
              className="js-nav-group"
              style={{ marginBottom: "8px", listStyle: "none" }} // Add margin between options
            >
              <button
                className={`js-nav-item hoverable ${item.children ? 'js-nav-parent' : ''}`}
                onClick={() => item.children && toggle(item.value)}
                aria-expanded={isOpen}
              >
                <span>{item.label}</span>
                {item.children && (
                  <span className={`chevron ${isOpen ? 'rotate' : ''}`}>›</span>
                )}
              </button>

              {item.children && (
                <ul className={`js-sublist ${isOpen ? 'expanded' : 'collapsed'}`} style={{ marginTop: 4 }}>
                  {item.children.map((sub) => (
                    <li key={sub.value} style={{ marginBottom: "4px", listStyle: "none" }}>
                      <button
                        className={`js-nav-subitem hoverable ${activeValue === sub.value ? 'active' : ''}`}
                        onClick={() => { onSelect?.(sub.value); setMobileOpen(false); }}
                      >
                        {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      </aside>
    </>
  );
}
