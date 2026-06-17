'use client';

import { useMemo, useState } from 'react';
import SqlTable from './SqlTable';
import '../../../styles/sql.css';

type Cell = string | number;
type Row = Record<string, Cell>;

const DATA: Row[] = [
  { id: 1, name: 'Ana', department: 'Sales', salary: 50000, country: 'France' },
  { id: 2, name: 'Ben', department: 'Engineering', salary: 80000, country: 'Canada' },
  { id: 3, name: 'Chen', department: 'Sales', salary: 55000, country: 'France' },
  { id: 4, name: 'Dee', department: 'Marketing', salary: 62000, country: 'Japan' },
  { id: 5, name: 'Eli', department: 'Engineering', salary: 90000, country: 'Canada' },
  { id: 6, name: 'Fay', department: 'Marketing', salary: 47000, country: 'Japan' },
];

const ALL_COLUMNS = ['id', 'name', 'department', 'salary', 'country'];
const NUMERIC = new Set(['id', 'salary']);

export interface PlaygroundFeatures {
  columns?: boolean;
  distinct?: boolean;
  where?: boolean;
  orderBy?: boolean;
  limit?: boolean;
}

function likeToRegex(pattern: string): RegExp {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const body = escaped.replace(/%/g, '.*').replace(/_/g, '.');
  return new RegExp(`^${body}$`, 'i');
}

function matches(cell: Cell, op: string, raw: string): boolean {
  if (raw === '') return true;
  const numericCompare = typeof cell === 'number' && raw.trim() !== '' && !Number.isNaN(Number(raw));
  const numVal = Number(raw);
  switch (op) {
    case '=':
      return String(cell).toLowerCase() === raw.toLowerCase();
    case '<>':
      return String(cell).toLowerCase() !== raw.toLowerCase();
    case '>':
      return numericCompare ? (cell as number) > numVal : String(cell) > raw;
    case '<':
      return numericCompare ? (cell as number) < numVal : String(cell) < raw;
    case '>=':
      return numericCompare ? (cell as number) >= numVal : String(cell) >= raw;
    case '<=':
      return numericCompare ? (cell as number) <= numVal : String(cell) <= raw;
    case 'LIKE':
      try { return likeToRegex(raw).test(String(cell)); } catch { return false; }
    default:
      return true;
  }
}

function compareCells(a: Cell, b: Cell): number {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
}

export default function SqlPlayground({ features }: { features?: PlaygroundFeatures }) {
  const f: PlaygroundFeatures = {
    columns: true, distinct: false, where: true, orderBy: true, limit: true, ...features,
  };

  const [cols, setCols] = useState<string[]>(['name', 'department', 'salary']);
  const [distinct, setDistinct] = useState(false);
  const [whereCol, setWhereCol] = useState('department');
  const [whereOp, setWhereOp] = useState('=');
  const [whereVal, setWhereVal] = useState('Sales');
  const [orderCol, setOrderCol] = useState('salary');
  const [orderDir, setOrderDir] = useState<'ASC' | 'DESC'>('DESC');
  const [limit, setLimit] = useState('');

  const toggleCol = (c: string) =>
    setCols((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const selectedCols = f.columns
    ? (cols.length ? ALL_COLUMNS.filter((c) => cols.includes(c)) : ALL_COLUMNS)
    : ALL_COLUMNS;

  const resultRows = useMemo(() => {
    let rows = [...DATA];
    if (f.where) rows = rows.filter((r) => matches(r[whereCol], whereOp, whereVal));
    if (f.orderBy && orderCol) {
      rows = [...rows].sort((a, b) => compareCells(a[orderCol], b[orderCol]) * (orderDir === 'DESC' ? -1 : 1));
    }
    let projected: Cell[][] = rows.map((r) => selectedCols.map((c) => r[c]));
    if (f.distinct && distinct) {
      const seen = new Set<string>();
      projected = projected.filter((row) => {
        const key = JSON.stringify(row);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    const lim = parseInt(limit, 10);
    if (f.limit && !Number.isNaN(lim) && lim >= 0) projected = projected.slice(0, lim);
    return projected;
  }, [f, whereCol, whereOp, whereVal, orderCol, orderDir, distinct, limit, selectedCols]);

  const sql = useMemo(() => {
    const colList = f.columns ? (cols.length ? selectedCols.join(', ') : '*') : '*';
    const lines: string[] = [`SELECT ${f.distinct && distinct ? 'DISTINCT ' : ''}${colList}`, 'FROM employees'];
    if (f.where && whereVal !== '') {
      const val = NUMERIC.has(whereCol) && whereOp !== 'LIKE' ? whereVal : `'${whereVal}'`;
      lines.push(`WHERE ${whereCol} ${whereOp} ${val}`);
    }
    if (f.orderBy && orderCol) lines.push(`ORDER BY ${orderCol} ${orderDir}`);
    const lim = parseInt(limit, 10);
    if (f.limit && !Number.isNaN(lim) && lim >= 0) lines.push(`LIMIT ${lim}`);
    return lines.join('\n') + ';';
  }, [f, cols, selectedCols, distinct, whereCol, whereOp, whereVal, orderCol, orderDir, limit]);

  return (
    <div className="sql-pg">
      {f.columns && (
        <div className="sql-pg-block">
          <span className="sql-pg-label">Columns to return (SELECT)</span>
          <div className="sql-chip-row">
            {ALL_COLUMNS.map((c) => (
              <button key={c} type="button" className={`sql-chip${cols.includes(c) ? ' on' : ''}`} onClick={() => toggleCol(c)}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {f.distinct && (
        <div className="sql-pg-block">
          <span className="sql-pg-label">Remove duplicates (DISTINCT)</span>
          <button type="button" className={`sql-chip${distinct ? ' on' : ''}`} onClick={() => setDistinct((d) => !d)}>
            DISTINCT {distinct ? 'on' : 'off'}
          </button>
        </div>
      )}

      {f.where && (
        <div className="sql-pg-block">
          <span className="sql-pg-label">Filter rows (WHERE)</span>
          <div className="sql-pg-inline">
            <select value={whereCol} onChange={(e) => setWhereCol(e.target.value)}>
              {ALL_COLUMNS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={whereOp} onChange={(e) => setWhereOp(e.target.value)}>
              {['=', '<>', '>', '<', '>=', '<=', 'LIKE'].map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <input value={whereVal} onChange={(e) => setWhereVal(e.target.value)} placeholder="value" aria-label="filter value" />
          </div>
        </div>
      )}

      {f.orderBy && (
        <div className="sql-pg-block">
          <span className="sql-pg-label">Sort rows (ORDER BY)</span>
          <div className="sql-pg-inline">
            <select value={orderCol} onChange={(e) => setOrderCol(e.target.value)} aria-label="order by column">
              <option value="">(none)</option>
              {ALL_COLUMNS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button type="button" className={`sql-chip${orderDir === 'ASC' ? ' on' : ''}`} onClick={() => setOrderDir('ASC')}>ASC</button>
            <button type="button" className={`sql-chip${orderDir === 'DESC' ? ' on' : ''}`} onClick={() => setOrderDir('DESC')}>DESC</button>
          </div>
        </div>
      )}

      {f.limit && (
        <div className="sql-pg-block">
          <span className="sql-pg-label">Cap rows (LIMIT)</span>
          <div className="sql-pg-inline">
            <input type="number" min={0} value={limit} onChange={(e) => setLimit(e.target.value)} placeholder="no limit" aria-label="limit" />
          </div>
        </div>
      )}

      <pre className="sql-pg-code">{sql}</pre>

      <SqlTable columns={selectedCols} rows={resultRows} />
      <p className="sql-pg-count">{resultRows.length} row{resultRows.length === 1 ? '' : 's'} returned</p>
    </div>
  );
}
