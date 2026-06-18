'use client';

import { useState } from 'react';
import SqlTable from './SqlTable';
import '../../../styles/sql.css';

type User = { id: number; name: string; country: string };

const INITIAL: User[] = [
  { id: 1, name: 'Ana', country: 'France' },
  { id: 2, name: 'Ben', country: 'Canada' },
  { id: 3, name: 'Chen', country: 'France' },
];

export default function CrudPlayground({ only }: { only?: 'insert' | 'update' | 'delete' }) {
  const [rows, setRows] = useState<User[]>(INITIAL);
  const [nextId, setNextId] = useState(4);
  const [last, setLast] = useState('');

  const [name, setName] = useState('Dee');
  const [country, setCountry] = useState('Japan');
  const [targetId, setTargetId] = useState('1');
  const [newCountry, setNewCountry] = useState('Spain');

  const show = (op: string) => !only || only === op;

  const doInsert = () => {
    setRows((r) => [...r, { id: nextId, name: name || 'Newbie', country: country || 'Unknown' }]);
    setLast(`INSERT INTO users (name, country) VALUES ('${name}', '${country}');`);
    setNextId((n) => n + 1);
  };
  const doUpdate = () => {
    const id = parseInt(targetId, 10);
    setRows((r) => r.map((u) => (u.id === id ? { ...u, country: newCountry } : u)));
    setLast(`UPDATE users SET country = '${newCountry}' WHERE id = ${id};`);
  };
  const doDelete = () => {
    const id = parseInt(targetId, 10);
    setRows((r) => r.filter((u) => u.id !== id));
    setLast(`DELETE FROM users WHERE id = ${id};`);
  };
  const reset = () => { setRows(INITIAL); setNextId(4); setLast(''); };

  return (
    <div className="sql-pg">
      {show('insert') && (
        <div className="sql-pg-block">
          <span className="sql-pg-label">Create (INSERT)</span>
          <div className="sql-pg-inline">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="name" aria-label="name" style={{ width: 110 }} />
            <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="country" aria-label="country" style={{ width: 110 }} />
            <button type="button" className="sql-chip on" onClick={doInsert}>INSERT</button>
          </div>
        </div>
      )}
      {show('update') && (
        <div className="sql-pg-block">
          <span className="sql-pg-label">Update (UPDATE)</span>
          <div className="sql-pg-inline">
            <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>where id =</span>
            <input value={targetId} onChange={(e) => setTargetId(e.target.value)} aria-label="update id" style={{ width: 64 }} />
            <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>set country =</span>
            <input value={newCountry} onChange={(e) => setNewCountry(e.target.value)} aria-label="new country" style={{ width: 110 }} />
            <button type="button" className="sql-chip on" onClick={doUpdate}>UPDATE</button>
          </div>
        </div>
      )}
      {show('delete') && (
        <div className="sql-pg-block">
          <span className="sql-pg-label">Delete (DELETE)</span>
          <div className="sql-pg-inline">
            <span style={{ fontSize: 13, color: 'var(--ink-soft)' }}>where id =</span>
            <input value={targetId} onChange={(e) => setTargetId(e.target.value)} aria-label="delete id" style={{ width: 64 }} />
            <button type="button" className="sql-chip" onClick={doDelete}>DELETE</button>
          </div>
        </div>
      )}

      {last && <pre className="sql-pg-code">{last}</pre>}
      <SqlTable name="users" columns={['id', 'name', 'country']} rows={rows.map((u) => [u.id, u.name, u.country])} />
      <button type="button" className="sql-chip" style={{ marginTop: 10 }} onClick={reset}>Reset table</button>
    </div>
  );
}
