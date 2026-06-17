'use client';

import React from 'react';
import '../../../styles/sql.css';

type Cell = string | number | null;

interface SqlTableProps {
  /** Optional table name shown above the grid (e.g. "users"). */
  name?: string;
  columns: string[];
  rows: Cell[][];
  /** Optional italic caption above the grid. */
  caption?: string;
  /** Column indexes to highlight (header + cells). */
  highlight?: number[];
}

export default function SqlTable({ name, columns, rows, caption, highlight = [] }: SqlTableProps) {
  return (
    <div className="sql-table-wrap">
      {name && <div className="sql-table-title">{name}</div>}
      <table className="sql-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} className={highlight.includes(i) ? 'hl' : undefined}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className={highlight.includes(ci) ? 'hl' : undefined}>
                  {cell === null ? <span className="sql-null">NULL</span> : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
