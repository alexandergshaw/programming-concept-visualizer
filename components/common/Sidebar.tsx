'use client';

import React, { useState, useEffect } from 'react';
import '../../styles/javascript.css';
import { TextField } from '@mui/material';

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
}

export default function Sidebar({ title, items, onSelect, defaultOpen = [] }: SidebarProps) {
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [filteredItems, setFilteredItems] = useState<SidebarItem[]>(items); // State for filtered items

  // Initialize open state from defaultOpen prop
  useEffect(() => {
    setOpen(new Set(defaultOpen));
  }, [defaultOpen]);

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
    <aside className="js-sidebar">
      <h2 className="js-sidebar-title">{title}</h2>
      {/* Search Box */}
      <TextField
        placeholder="Search concepts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="js-sidebar-search"
        variant="outlined"
        sx={{
          marginBottom: '16px',
          backgroundColor: 'transparent', // Transparent background
          color: 'white', // White text
          borderRadius: '4px', // Optional: Add rounded corners
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white', // White outline
            },
            '&:hover fieldset': {
              borderColor: 'white', // White outline on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white', // White outline when focused
            },
          },
          '& .MuiInputBase-input': {
            color: 'white', // White text inside the input
          },
          '& .MuiInputLabel-root': {
            color: 'white', // White placeholder text
          },
        }}
      />
      <ul className="js-nav-list">
        {filteredItems.map((item) => {
          const isOpen = open.has(item.value);
          return (
            <li key={item.value} className="js-nav-group">
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
                <ul className={`js-sublist ${isOpen ? 'expanded' : 'collapsed'}`}>
                  {item.children.map((sub) => (
                    <li key={sub.value}>
                      <button
                        className="js-nav-subitem hoverable"
                        onClick={() => onSelect?.(sub.value)}
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
  );
}
