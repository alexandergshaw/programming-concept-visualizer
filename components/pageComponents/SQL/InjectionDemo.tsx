'use client';

import { useState } from 'react';
import '../../../styles/sql.css';

const MALICIOUS = "' OR '1'='1";

export default function InjectionDemo() {
  const [input, setInput] = useState('ana');
  const [safe, setSafe] = useState(false);

  const vulnerableQuery = `SELECT * FROM users WHERE name = '${input}';`;
  const isAttack = input.includes("'") || input.toLowerCase().includes(' or ');

  return (
    <div className="sql-pg">
      <div className="sql-pg-inline" style={{ marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: '#475569' }}>username input</span>
        <input value={input} onChange={(e) => setInput(e.target.value)} aria-label="username" style={{ width: 180 }} />
        <button type="button" className="sql-chip" onClick={() => setInput(MALICIOUS)}>use a malicious input</button>
      </div>

      <div className="sql-chip-row" style={{ marginBottom: 10 }}>
        <button type="button" className={`sql-chip${!safe ? ' on' : ''}`} onClick={() => setSafe(false)}>vulnerable (string-built)</button>
        <button type="button" className={`sql-chip${safe ? ' on' : ''}`} onClick={() => setSafe(true)}>safe (parameterized)</button>
      </div>

      {safe ? (
        <>
          <pre className="sql-pg-code">{`SELECT * FROM users WHERE name = ?;
-- parameter value: ${JSON.stringify(input)}`}</pre>
          <p className="sql-pg-count" style={{ color: '#15803d' }}>
            The input travels separately as a parameter, so the database treats it as plain text — it can never become part of the SQL.
          </p>
        </>
      ) : (
        <>
          <pre className="sql-pg-code">{vulnerableQuery}</pre>
          <p className="sql-pg-count" style={{ color: isAttack ? '#b91c1c' : '#475569', fontWeight: isAttack ? 600 : 400 }}>
            {isAttack
              ? 'Danger: the quote breaks out of the string and the injected OR makes the WHERE always true — this query returns EVERY user.'
              : 'Looks fine for ordinary input — but the instant the input contains a quote, an attacker can rewrite the query. Try the malicious input.'}
          </p>
        </>
      )}
    </div>
  );
}
