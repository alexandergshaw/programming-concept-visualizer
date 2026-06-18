'use client';

import { useState } from 'react';
import SqlTable from './SqlTable';
import '../../../styles/sql.css';

type Kind = '1:1' | '1:many' | 'many:many';

export default function RelationshipExplorer() {
  const [kind, setKind] = useState<Kind>('1:many');

  return (
    <div className="sql-pg">
      <div className="sql-chip-row" style={{ marginBottom: 10 }}>
        {(['1:1', '1:many', 'many:many'] as Kind[]).map((k) => (
          <button key={k} type="button" className={`sql-chip${kind === k ? ' on' : ''}`} onClick={() => setKind(k)}>{k}</button>
        ))}
      </div>

      {kind === '1:1' && (
        <>
          <p style={{ fontSize: 14, color: 'var(--ink)' }}>One row matches exactly one row. A user has one profile. The foreign key lives on either side and is marked UNIQUE so it can only match once.</p>
          <SqlTable name="users" columns={['id', 'name']} rows={[[1, 'Ana'], [2, 'Ben']]} />
          <SqlTable name="profiles" columns={['id', 'user_id (UNIQUE FK)', 'bio']} rows={[[10, 1, 'climber'], [11, 2, 'baker']]} highlight={[1]} />
        </>
      )}
      {kind === '1:many' && (
        <>
          <p style={{ fontSize: 14, color: 'var(--ink)' }}>One customer has many orders, but each order has one customer. The &quot;many&quot; side carries the foreign key.</p>
          <SqlTable name="customers" columns={['id', 'name']} rows={[[1, 'Ana'], [2, 'Ben']]} />
          <SqlTable name="orders" columns={['id', 'customer_id (FK)', 'total']} rows={[[101, 1, 40], [102, 1, 25], [103, 2, 90]]} highlight={[1]} />
        </>
      )}
      {kind === 'many:many' && (
        <>
          <p style={{ fontSize: 14, color: 'var(--ink)' }}>Students take many courses; each course has many students. A junction table records one row per pairing.</p>
          <SqlTable name="students" columns={['id', 'name']} rows={[[1, 'Ana'], [2, 'Ben']]} />
          <SqlTable name="enrollments (junction)" columns={['student_id', 'course_id']} rows={[[1, 10], [1, 11], [2, 10]]} highlight={[0, 1]} />
          <SqlTable name="courses" columns={['id', 'title']} rows={[[10, 'Math'], [11, 'Art']]} />
        </>
      )}
    </div>
  );
}
