'use client';

import { useState } from 'react';
import '../../../styles/sql.css';

export interface ExplorerOption {
  label: string;
  points: string[];
  code?: string;
}

export default function OptionExplorer({ options }: { options: ExplorerOption[] }) {
  const [i, setI] = useState(0);
  const active = options[i] ?? options[0];

  return (
    <div className="sql-pg">
      <div className="sql-chip-row">
        {options.map((o, idx) => (
          <button key={o.label} type="button" className={`sql-chip${i === idx ? ' on' : ''}`} onClick={() => setI(idx)}>
            {o.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 12 }}>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          {active.points.map((p, idx) => (
            <li key={idx} style={{ fontSize: 14, color: '#334155', marginBottom: 6 }}>{p}</li>
          ))}
        </ul>
        {active.code && <pre className="sql-pg-code">{active.code}</pre>}
      </div>
    </div>
  );
}
