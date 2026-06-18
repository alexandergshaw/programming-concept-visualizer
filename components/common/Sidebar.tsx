'use client';

import React, { useState, useEffect } from 'react';
import '../../styles/javascript.css';
import { TextField } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import TechIcon from './TechIcon';

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
  // Initialized once from defaultOpen; afterwards a section stays open until
  // the user explicitly collapses it (navigation no longer resets it).
  const [open, setOpen] = useState<Set<string>>(() => new Set(defaultOpen));
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [filteredItems, setFilteredItems] = useState<SidebarItem[]>(items); // State for filtered items
  const [mobileOpen, setMobileOpen] = useState(false); // Off-canvas drawer state (mobile only)

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
          top: '0', // Stick to the top of the viewport
          left: '0', // Align it to the left of the viewport
          width: '250px', // Set a fixed width for the sidebar
          height: '100vh', // Make it span the full height of the viewport
          zIndex: 1000, // Ensure it stays above other content
          background: 'linear-gradient(180deg, #3a2f22, #2a2118)', // Warm "book spine" tone
          color: '#f3ece0',
          overflowY: 'auto', // Allow scrolling if the content overflows
          padding: '16px', // Add some padding for better spacing
          display: 'flex',
          flexDirection: 'column',
        }}
      >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        {headerImage && (
          <Image 
            src={headerImage} 
            alt="Header Icon" 
            width={32}
            height={32}
            style={{  
              marginRight: '12px',
              borderRadius: '4px',
              objectFit: 'contain'
            }} 
          />
        )}
        <TechIcon title={title} />
        <h2 className="js-sidebar-title" style={{ margin: 0 }}>{title}</h2>
      </div>
      {/* Back to the home page from any topic */}
      <Link href="/" className="js-home-link" onClick={() => setMobileOpen(false)}>
        &larr; Home
      </Link>
      {/* Search Box */}
      <TextField
        placeholder="Search concepts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="js-sidebar-search"
        sx={{
          marginBottom: '16px',
          backgroundColor: 'transparent',
          color: 'white',
          borderRadius: '4px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white',
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
