'use client';

import React from 'react';
import '../styles/javascript.css';

interface SidebarItem {
  label: string;
  value: string;
  children?: SidebarItem[];
}

interface SidebarProps {
  title: string;
  items: SidebarItem[];
  onSelect?: (value: string) => void;
}

export default function Sidebar({ title, items, onSelect }: SidebarProps) {
  return (
    <aside className="js-sidebar">
      <h2 className="js-sidebar-title">{title}</h2>
      <ul className="js-nav-list">
        {items.map((item, index) => (
          <li key={index}>
            <div
              className="js-nav-item hoverable"
            >
              <span className="js-nav-text">{item.label}</span>
            </div>

            {item.children && (
              <ul className="js-sublist">
                {item.children.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className="js-nav-subitem hoverable"
                    onClick={() => onSelect?.(subItem.value)}
                  >
                    <span className="js-nav-text">{subItem.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
