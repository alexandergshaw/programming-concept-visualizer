'use client';

import { useState } from 'react';
import SqlTable from './SqlTable';
import '../../../styles/sql.css';

export default function NormalizationToggle() {
  const [normalized, setNormalized] = useState(false);

  return (
    <div className="sql-pg">
      <div className="sql-chip-row" style={{ marginBottom: 10 }}>
        <button type="button" className={`sql-chip${!normalized ? ' on' : ''}`} onClick={() => setNormalized(false)}>un-normalized</button>
        <button type="button" className={`sql-chip${normalized ? ' on' : ''}`} onClick={() => setNormalized(true)}>normalized</button>
      </div>

      {!normalized ? (
        <>
          <SqlTable
            name="orders (one big table)"
            columns={['order_id', 'customer', 'city', 'product']}
            rows={[[101, 'Ana', 'Paris', 'Book'], [102, 'Ana', 'Paris', 'Pen'], [103, 'Ben', 'Rome', 'Lamp']]}
            highlight={[1, 2]}
          />
          <p className="sql-pg-count" style={{ color: 'var(--danger)' }}>
            Ana&apos;s name and city repeat on every order. Move her to a new city and you must update several rows — and might miss one (an update anomaly).
          </p>
        </>
      ) : (
        <>
          <SqlTable name="customers" columns={['id', 'name', 'city']} rows={[[1, 'Ana', 'Paris'], [2, 'Ben', 'Rome']]} />
          <SqlTable name="orders" columns={['id', 'customer_id', 'product']} rows={[[101, 1, 'Book'], [102, 1, 'Pen'], [103, 2, 'Lamp']]} highlight={[1]} />
          <p className="sql-pg-count" style={{ color: 'var(--success)' }}>
            Each fact is stored once. Ana&apos;s city lives in a single place, so the anomalies are gone.
          </p>
        </>
      )}
    </div>
  );
}
