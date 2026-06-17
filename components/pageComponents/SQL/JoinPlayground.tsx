'use client';

import { useMemo, useState } from 'react';
import SqlTable from './SqlTable';
import '../../../styles/sql.css';

type JoinType = 'INNER' | 'LEFT' | 'RIGHT' | 'FULL';

const CUSTOMERS = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Ben' },
  { id: 3, name: 'Chen' }, // has no orders
];

const ORDERS = [
  { id: 101, customer_id: 1, total: 40 },
  { id: 102, customer_id: 1, total: 25 },
  { id: 103, customer_id: 2, total: 90 },
  { id: 104, customer_id: 9, total: 15 }, // points to a customer that doesn't exist
];

type ResultCell = string | number | null;

function computeJoin(type: JoinType): ResultCell[][] {
  const rows: ResultCell[][] = [];

  // Customers with their matching orders (covers INNER + the left side of LEFT/FULL)
  for (const c of CUSTOMERS) {
    const matched = ORDERS.filter((o) => o.customer_id === c.id);
    if (matched.length > 0) {
      for (const o of matched) rows.push([c.name, o.id, o.total]);
    } else if (type === 'LEFT' || type === 'FULL') {
      rows.push([c.name, null, null]);
    }
  }

  // Orders with no matching customer (the extra right side of RIGHT/FULL)
  if (type === 'RIGHT' || type === 'FULL') {
    for (const o of ORDERS) {
      const hasCustomer = CUSTOMERS.some((c) => c.id === o.customer_id);
      if (!hasCustomer) rows.push([null, o.id, o.total]);
    }
  }

  // RIGHT also keeps matched rows; the loop above already added them for INNER-style,
  // but it skipped customers with no orders, which is correct for RIGHT.
  return rows;
}

const JOIN_KEYWORD: Record<JoinType, string> = {
  INNER: 'INNER JOIN',
  LEFT: 'LEFT JOIN',
  RIGHT: 'RIGHT JOIN',
  FULL: 'FULL OUTER JOIN',
};

const NOTE: Record<JoinType, string> = {
  INNER: 'Only customers that have orders, and only orders that have a customer.',
  LEFT: 'Every customer (Chen appears with NULLs); unmatched orders are dropped.',
  RIGHT: 'Every order (order 104 appears with a NULL customer); customers without orders are dropped.',
  FULL: 'Everything from both sides; gaps on either side are filled with NULL.',
};

export default function JoinPlayground() {
  const [type, setType] = useState<JoinType>('INNER');

  const rows = useMemo(() => computeJoin(type), [type]);

  return (
    <div className="sql-pg">
      <div className="sql-pg-block">
        <span className="sql-pg-label">Join type</span>
        <div className="sql-chip-row">
          {(['INNER', 'LEFT', 'RIGHT', 'FULL'] as JoinType[]).map((t) => (
            <button key={t} type="button" className={`sql-chip${type === t ? ' on' : ''}`} onClick={() => setType(t)}>{t}</button>
          ))}
        </div>
      </div>

      <SqlTable name="customers" columns={['id', 'name']} rows={CUSTOMERS.map((c) => [c.id, c.name])} />
      <SqlTable name="orders" columns={['id', 'customer_id', 'total']} rows={ORDERS.map((o) => [o.id, o.customer_id, o.total])} highlight={[1]} />

      <pre className="sql-pg-code">{`SELECT c.name, o.id, o.total
FROM customers c
${JOIN_KEYWORD[type]} orders o ON c.id = o.customer_id;`}</pre>

      <SqlTable columns={['c.name', 'o.id', 'o.total']} rows={rows} />
      <p className="sql-pg-count">{rows.length} row{rows.length === 1 ? '' : 's'} — {NOTE[type]}</p>
    </div>
  );
}
