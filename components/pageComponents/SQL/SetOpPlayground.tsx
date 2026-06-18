'use client';

import { useState } from 'react';
import '../../../styles/sql.css';

const A = ['ana@x.com', 'ben@x.com', 'cara@x.com'];
const B = ['ben@x.com', 'dan@x.com'];

export default function SetOpPlayground() {
  const [all, setAll] = useState(false);
  const combined = [...A, ...B];
  const result = all ? combined : combined.filter((v, i) => combined.indexOf(v) === i);

  return (
    <div className="sql-pg">
      <div className="sql-chip-row" style={{ marginBottom: 10 }}>
        <button type="button" className={`sql-chip${!all ? ' on' : ''}`} onClick={() => setAll(false)}>UNION</button>
        <button type="button" className={`sql-chip${all ? ' on' : ''}`} onClick={() => setAll(true)}>UNION ALL</button>
      </div>

      <pre className="sql-pg-code">{`SELECT email FROM customers
${all ? 'UNION ALL' : 'UNION'}
SELECT email FROM newsletter_signups;`}</pre>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
        {result.map((e, i) => (
          <span key={i} style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--info-bg)', border: '1px solid var(--info-bg)', borderRadius: 6, padding: '4px 10px', color: 'var(--info)' }}>{e}</span>
        ))}
      </div>
      <p className="sql-pg-count">{result.length} rows — {all ? 'duplicates kept (ben@x.com appears twice)' : 'duplicates removed'}</p>
    </div>
  );
}
