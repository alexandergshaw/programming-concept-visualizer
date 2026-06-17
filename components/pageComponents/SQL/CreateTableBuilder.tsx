'use client';

import { useState } from 'react';
import '../../../styles/sql.css';

const OPTIONAL = ['email', 'age', 'created_at'];

export default function CreateTableBuilder() {
  const [included, setIncluded] = useState<string[]>(['email']);
  const [nameRequired, setNameRequired] = useState(true);
  const [emailUnique, setEmailUnique] = useState(true);

  const toggle = (c: string) =>
    setIncluded((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const lines: string[] = [
    '    id INTEGER PRIMARY KEY',
    `    name VARCHAR(100)${nameRequired ? ' NOT NULL' : ''}`,
  ];
  if (included.includes('email')) lines.push(`    email VARCHAR(255)${emailUnique ? ' UNIQUE' : ''}`);
  if (included.includes('age')) lines.push('    age INTEGER');
  if (included.includes('created_at')) lines.push('    created_at DATE');

  const sql = `CREATE TABLE users (\n${lines.join(',\n')}\n);`;

  return (
    <div className="sql-pg">
      <div className="sql-pg-block">
        <span className="sql-pg-label">Optional columns (id &amp; name are always included)</span>
        <div className="sql-chip-row">
          {OPTIONAL.map((c) => (
            <button key={c} type="button" className={`sql-chip${included.includes(c) ? ' on' : ''}`} onClick={() => toggle(c)}>{c}</button>
          ))}
        </div>
      </div>
      <div className="sql-pg-block">
        <span className="sql-pg-label">Constraints</span>
        <div className="sql-chip-row">
          <button type="button" className={`sql-chip${nameRequired ? ' on' : ''}`} onClick={() => setNameRequired((v) => !v)}>name NOT NULL</button>
          <button
            type="button"
            className={`sql-chip${emailUnique && included.includes('email') ? ' on' : ''}`}
            onClick={() => setEmailUnique((v) => !v)}
            disabled={!included.includes('email')}
          >
            email UNIQUE
          </button>
        </div>
      </div>
      <pre className="sql-pg-code">{sql}</pre>
    </div>
  );
}
