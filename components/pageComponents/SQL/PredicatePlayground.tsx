'use client';

import { useState } from 'react';
import SqlTable from './SqlTable';
import '../../../styles/sql.css';

type Person = { name: string; age: number | null };

const PEOPLE: Person[] = [
  { name: 'Ana', age: 30 },
  { name: 'Ben', age: null },
  { name: 'Cara', age: 25 },
  { name: 'Dan', age: 40 },
  { name: 'Eve', age: null },
];

export type PredicateKind = 'IN' | 'BETWEEN' | 'LIKE' | 'IS NULL' | 'IS NOT NULL' | '= NULL';

function likeMatch(value: string, pattern: string): boolean {
  const esc = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/%/g, '.*').replace(/_/g, '.');
  try { return new RegExp(`^${esc}$`, 'i').test(value); } catch { return false; }
}

export default function PredicatePlayground({ kinds }: { kinds: PredicateKind[] }) {
  const [kind, setKind] = useState<PredicateKind>(kinds[0]);
  const [text, setText] = useState('A%');
  const [list, setList] = useState('Ana, Dan');
  const [lo, setLo] = useState('25');
  const [hi, setHi] = useState('35');

  let matched: Person[] = [];
  let clause = '';
  if (kind === 'LIKE') {
    matched = PEOPLE.filter((p) => likeMatch(p.name, text));
    clause = `WHERE name LIKE '${text}'`;
  } else if (kind === 'IN') {
    const set = list.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean);
    matched = PEOPLE.filter((p) => set.includes(p.name.toLowerCase()));
    clause = `WHERE name IN (${list.split(',').map((s) => `'${s.trim()}'`).join(', ')})`;
  } else if (kind === 'BETWEEN') {
    const a = Number(lo);
    const b = Number(hi);
    matched = PEOPLE.filter((p) => p.age !== null && p.age >= a && p.age <= b);
    clause = `WHERE age BETWEEN ${lo} AND ${hi}`;
  } else if (kind === 'IS NULL') {
    matched = PEOPLE.filter((p) => p.age === null);
    clause = 'WHERE age IS NULL';
  } else if (kind === 'IS NOT NULL') {
    matched = PEOPLE.filter((p) => p.age !== null);
    clause = 'WHERE age IS NOT NULL';
  } else {
    matched = [];
    clause = 'WHERE age = NULL';
  }

  return (
    <div className="sql-pg">
      <div className="sql-pg-block">
        <span className="sql-pg-label">Predicate</span>
        <div className="sql-chip-row">
          {kinds.map((k) => (
            <button key={k} type="button" className={`sql-chip${kind === k ? ' on' : ''}`} onClick={() => setKind(k)}>{k}</button>
          ))}
        </div>
      </div>

      {kind === 'LIKE' && (
        <div className="sql-pg-inline" style={{ marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>name LIKE</span>
          <input value={text} onChange={(e) => setText(e.target.value)} aria-label="like pattern" />
        </div>
      )}
      {kind === 'IN' && (
        <div className="sql-pg-inline" style={{ marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>name IN</span>
          <input value={list} onChange={(e) => setList(e.target.value)} aria-label="in list" style={{ width: 170 }} />
        </div>
      )}
      {kind === 'BETWEEN' && (
        <div className="sql-pg-inline" style={{ marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>age BETWEEN</span>
          <input value={lo} onChange={(e) => setLo(e.target.value)} aria-label="between low" style={{ width: 64 }} />
          <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>and</span>
          <input value={hi} onChange={(e) => setHi(e.target.value)} aria-label="between high" style={{ width: 64 }} />
        </div>
      )}

      <pre className="sql-pg-code">{`SELECT name, age FROM people
${clause};`}</pre>
      <SqlTable columns={['name', 'age']} rows={matched.map((p) => [p.name, p.age])} />
      <p className="sql-pg-count">
        {matched.length} row{matched.length === 1 ? '' : 's'}{kind === '= NULL' ? ' — "= NULL" never matches; you must use IS NULL.' : ''}
      </p>
    </div>
  );
}
