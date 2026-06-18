'use client';

import { useState } from 'react';
import '../../../styles/sql.css';

export default function TransactionPlayground() {
  const [a, setA] = useState(100);
  const [b, setB] = useState(50);
  const [savedA, setSavedA] = useState(100);
  const [savedB, setSavedB] = useState(50);
  const [phase, setPhase] = useState(0); // 0 idle, 1 begun, 2 debited, 3 credited
  const [log, setLog] = useState<string[]>([]);

  const addLog = (s: string) => setLog((l) => [...l, s]);

  const next = () => {
    if (phase === 0) { setPhase(1); addLog('BEGIN;'); }
    else if (phase === 1) { setA((x) => x - 100); setPhase(2); addLog('UPDATE accounts SET balance = balance - 100 WHERE id = 1;'); }
    else if (phase === 2) { setB((x) => x + 100); setPhase(3); addLog('UPDATE accounts SET balance = balance + 100 WHERE id = 2;'); }
  };
  const commit = () => { setSavedA(a); setSavedB(b); setPhase(0); addLog('COMMIT;  -- changes saved permanently'); };
  const rollback = () => { setA(savedA); setB(savedB); setPhase(0); addLog('ROLLBACK;  -- working changes undone'); };
  const reset = () => { setA(100); setB(50); setSavedA(100); setSavedB(50); setPhase(0); setLog([]); };

  const dirty = a !== savedA || b !== savedB;
  const nextLabel = phase === 0 ? 'BEGIN' : phase === 1 ? 'Debit A (-100)' : phase === 2 ? 'Credit B (+100)' : 'all steps done';

  const card = (title: string, value: string, bg: string, border: string, color: string) => (
    <div style={{ padding: '10px 16px', borderRadius: 8, background: bg, border: `1px solid ${border}` }}>
      <div style={{ fontSize: 12, color: 'var(--ink-soft)' }}>{title}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color }}>{value}</div>
    </div>
  );

  return (
    <div className="sql-pg">
      <div className="sql-chip-row" style={{ marginBottom: 12 }}>
        <button type="button" className="sql-chip on" onClick={next} disabled={phase === 3}>{nextLabel}</button>
        <button type="button" className="sql-chip" onClick={commit} disabled={phase === 0}>COMMIT</button>
        <button type="button" className="sql-chip" onClick={rollback} disabled={phase === 0}>ROLLBACK</button>
        <button type="button" className="sql-chip" onClick={reset}>Reset</button>
      </div>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 12 }}>
        {card('Account 1 (working)', `$${a}`, 'var(--paper-sunken)', 'var(--line)', dirty ? 'var(--warning)' : 'var(--success)')}
        {card('Account 2 (working)', `$${b}`, 'var(--paper-sunken)', 'var(--line)', dirty ? 'var(--warning)' : 'var(--success)')}
        {card('Last committed', `$${savedA} / $${savedB}`, 'var(--success-bg)', 'var(--success-bg)', 'var(--success)')}
      </div>

      <pre className="sql-pg-code">{log.length ? log.join('\n') : '-- press BEGIN to start a transaction'}</pre>
      <p className="sql-pg-count">
        {dirty
          ? 'Working balances changed but are NOT saved yet. COMMIT keeps them; ROLLBACK undoes everything.'
          : 'No uncommitted changes. The two balances always total $150 — that is consistency.'}
      </p>
    </div>
  );
}
