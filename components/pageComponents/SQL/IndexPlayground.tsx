'use client';

import { useState } from 'react';
import '../../../styles/sql.css';

const N = 100000;

export default function IndexPlayground() {
  const [indexed, setIndexed] = useState(false);
  const scanned = indexed ? 17 : N; // ~log2(100000) is about 17

  return (
    <div className="sql-pg">
      <div className="sql-pg-block">
        <span className="sql-pg-label">Index on the email column</span>
        <div className="sql-chip-row">
          <button type="button" className={`sql-chip${!indexed ? ' on' : ''}`} onClick={() => setIndexed(false)}>no index</button>
          <button type="button" className={`sql-chip${indexed ? ' on' : ''}`} onClick={() => setIndexed(true)}>CREATE INDEX</button>
        </div>
      </div>

      <pre className="sql-pg-code">{`SELECT * FROM users WHERE email = 'ana@x.com';
-- users has ${N.toLocaleString()} rows`}</pre>

      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 13, color: '#475569', marginBottom: 6 }}>Rows the database had to look at:</div>
        <div style={{ background: '#f1f5f9', borderRadius: 6, overflow: 'hidden', height: 26 }}>
          <div
            style={{
              height: '100%',
              width: indexed ? '2%' : '100%',
              background: indexed ? '#22c55e' : '#ef4444',
              transition: 'width 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              color: '#fff',
              fontSize: 12,
              fontWeight: 700,
              paddingRight: 8,
              minWidth: 40,
            }}
          >
            {scanned.toLocaleString()}
          </div>
        </div>
      </div>

      <p className="sql-pg-count">
        {indexed
          ? 'With an index, the database seeks straight to the matching row (~17 steps), like binary search on sorted data.'
          : 'Without an index, the database performs a full table scan, checking every single row.'}
      </p>
    </div>
  );
}
