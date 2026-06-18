'use client';

import { useState } from 'react';
import SqlTable from './SqlTable';
import '../../../styles/sql.css';

type Acct = { id: number; email: string; balance: number };

const INITIAL: Acct[] = [
  { id: 1, email: 'ana@x.com', balance: 100 },
  { id: 2, email: 'ben@x.com', balance: 50 },
];

export default function ConstraintPlayground() {
  const [rows, setRows] = useState<Acct[]>(INITIAL);
  const [id, setId] = useState('3');
  const [email, setEmail] = useState('cara@x.com');
  const [balance, setBalance] = useState('75');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const tryInsert = () => {
    const idNum = parseInt(id, 10);
    if (id.trim() === '' || Number.isNaN(idNum)) { setMsg({ ok: false, text: 'NOT NULL violation: id is required (it is the PRIMARY KEY).' }); return; }
    if (rows.some((r) => r.id === idNum)) { setMsg({ ok: false, text: `PRIMARY KEY violation: id ${idNum} already exists.` }); return; }
    if (email.trim() === '') { setMsg({ ok: false, text: 'NOT NULL violation: email is required.' }); return; }
    if (rows.some((r) => r.email.toLowerCase() === email.trim().toLowerCase())) { setMsg({ ok: false, text: `UNIQUE violation: the email '${email}' is already taken.` }); return; }
    const bal = Number(balance);
    if (balance.trim() === '' || Number.isNaN(bal) || bal < 0) { setMsg({ ok: false, text: 'CHECK violation: balance must be a number that is 0 or greater.' }); return; }
    setRows((r) => [...r, { id: idNum, email: email.trim(), balance: bal }]);
    setMsg({ ok: true, text: 'Row inserted — it passed every constraint.' });
  };
  const reset = () => { setRows(INITIAL); setMsg(null); };

  return (
    <div className="sql-pg">
      <span className="sql-pg-label">Try to insert an account &mdash; id is the PRIMARY KEY, email is UNIQUE, balance has CHECK (balance &gt;= 0)</span>
      <div className="sql-pg-inline" style={{ marginTop: 6, marginBottom: 10 }}>
        <input value={id} onChange={(e) => setId(e.target.value)} placeholder="id" aria-label="id" style={{ width: 64 }} />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" aria-label="email" style={{ width: 150 }} />
        <input value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="balance" aria-label="balance" style={{ width: 90 }} />
        <button type="button" className="sql-chip on" onClick={tryInsert}>INSERT</button>
      </div>
      {msg && (
        <p className="sql-pg-count" style={{ color: msg.ok ? 'var(--success)' : 'var(--danger)', fontWeight: 600 }}>
          {msg.ok ? '[accepted] ' : '[rejected] '}{msg.text}
        </p>
      )}
      <SqlTable name="accounts" columns={['id', 'email', 'balance']} rows={rows.map((a) => [a.id, a.email, a.balance])} />
      <button type="button" className="sql-chip" style={{ marginTop: 10 }} onClick={reset}>Reset</button>
    </div>
  );
}
