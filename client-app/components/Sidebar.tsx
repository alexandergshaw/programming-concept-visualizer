// components/Sidebar.tsx
import React from "react";
import "../styles/javascript.css";

interface SidebarProps {
  title: string;
  items: string[];
  onSelect?: (item: string) => void;
}

export default function Sidebar({ title, items, onSelect }: SidebarProps) {
  return (
    <aside className="js-sidebar">
      <h2 className="js-sidebar-title">{title}</h2>
      <ul className="js-nav-list">
        {items.map((item, index) => (
          <li
            key={index}
            className="js-nav-item hoverable"
            onClick={() => onSelect?.(item)}
          >
            <span className="js-nav-text">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}