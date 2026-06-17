'use client';

import { useMemo, useState } from 'react';
import SqlTable from './SqlTable';
import '../../../styles/sql.css';

const DATA = [
  { name: 'Ana', department: 'Sales', country: 'France', salary: 50000 },
  { name: 'Ben', department: 'Engineering', country: 'Canada', salary: 80000 },
  { name: 'Chen', department: 'Sales', country: 'France', salary: 55000 },
  { name: 'Dee', department: 'Marketing', country: 'Japan', salary: 62000 },
  { name: 'Eli', department: 'Engineering', country: 'Canada', salary: 90000 },
  { name: 'Fay', department: 'Marketing', country: 'Japan', salary: 47000 },
];

type Agg = 'COUNT(*)' | 'SUM(salary)' | 'AVG(salary)' | 'MIN(salary)' | 'MAX(salary)';
type GroupCol = 'department' | 'country';

export default function GroupByPlayground({ having }: { having?: boolean }) {
  const [groupCol, setGroupCol] = useState<GroupCol>('department');
  const [agg, setAgg] = useState<Agg>('COUNT(*)');
  const [havingOp, setHavingOp] = useState('>');
  const [havingVal, setHavingVal] = useState('1');

  const aggAlias = agg === 'COUNT(*)' ? 'count' : agg.replace('(salary)', '').toLowerCase() + '_salary';

  const result = useMemo(() => {
    const groups = new Map<string, number[]>();
    for (const r of DATA) {
      const key = String(r[groupCol]);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(r.salary);
    }
    let rows: (string | number)[][] = [];
    groups.forEach((salaries, key) => {
      let val: number;
      switch (agg) {
        case 'SUM(salary)': val = salaries.reduce((a, b) => a + b, 0); break;
        case 'AVG(salary)': val = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length); break;
        case 'MIN(salary)': val = Math.min(...salaries); break;
        case 'MAX(salary)': val = Math.max(...salaries); break;
        case 'COUNT(*)':
        default: val = salaries.length;
      }
      rows.push([key, val]);
    });
    if (having) {
      const threshold = Number(havingVal);
      if (!Number.isNaN(threshold)) {
        rows = rows.filter(([, v]) => {
          const n = v as number;
          switch (havingOp) {
            case '>': return n > threshold;
            case '<': return n < threshold;
            case '>=': return n >= threshold;
            case '<=': return n <= threshold;
            case '=': return n === threshold;
            default: return true;
          }
        });
      }
    }
    return rows;
  }, [groupCol, agg, having, havingOp, havingVal]);

  const sql = [`SELECT ${groupCol}, ${agg} AS ${aggAlias}`, 'FROM employees', `GROUP BY ${groupCol}`];
  if (having) sql.push(`HAVING ${agg} ${havingOp} ${havingVal}`);

  return (
    <div className="sql-pg">
      <div className="sql-pg-block">
        <span className="sql-pg-label">Group by</span>
        <div className="sql-chip-row">
          {(['department', 'country'] as GroupCol[]).map((c) => (
            <button key={c} type="button" className={`sql-chip${groupCol === c ? ' on' : ''}`} onClick={() => setGroupCol(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="sql-pg-block">
        <span className="sql-pg-label">Aggregate</span>
        <div className="sql-chip-row">
          {(['COUNT(*)', 'SUM(salary)', 'AVG(salary)', 'MIN(salary)', 'MAX(salary)'] as Agg[]).map((a) => (
            <button key={a} type="button" className={`sql-chip${agg === a ? ' on' : ''}`} onClick={() => setAgg(a)}>{a}</button>
          ))}
        </div>
      </div>

      {having && (
        <div className="sql-pg-block">
          <span className="sql-pg-label">Filter groups (HAVING)</span>
          <div className="sql-pg-inline">
            <span style={{ fontSize: 13, color: '#475569', fontFamily: 'monospace' }}>{agg}</span>
            <select value={havingOp} onChange={(e) => setHavingOp(e.target.value)} aria-label="having operator">
              {['>', '<', '>=', '<=', '='].map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <input value={havingVal} onChange={(e) => setHavingVal(e.target.value)} aria-label="having value" style={{ width: 90 }} />
          </div>
        </div>
      )}

      <pre className="sql-pg-code">{sql.join('\n') + ';'}</pre>
      <SqlTable columns={[groupCol, aggAlias]} rows={result} />
      <p className="sql-pg-count">{result.length} group{result.length === 1 ? '' : 's'}</p>
    </div>
  );
}
