import React from 'react';

const EqualityBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        Loose equality operators (== and !=) convert types automatically before comparing.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div style={{ padding: 10, backgroundColor: 'var(--warning-bg)', borderRadius: 8, border: '1px solid var(--warning)' }}>
          <h5 style={{ color: 'var(--warning)', margin: '0 0 6px 0' }}>⚠️ == (Loose)</h5>
          <code style={{ fontSize: 12, color: 'var(--warning)' }}>0 == false → true</code>
        </div>
        
        <div style={{ padding: 10, backgroundColor: 'var(--warning-bg)', borderRadius: 8, border: '1px solid var(--warning)' }}>
          <h5 style={{ color: 'var(--warning)', margin: '0 0 6px 0' }}>⚠️ != (Loose)</h5>
          <code style={{ fontSize: 12, color: 'var(--warning)' }}>0 != false → false</code>
        </div>
      </div>

      <div style={{ padding: 10, backgroundColor: 'var(--danger-bg)', borderRadius: 8, border: '1px solid var(--danger)' }}>
        <strong style={{ color: 'var(--danger)' }}>Usually better:</strong> Use strict operators (=== and !==) for predictable results.
      </div>
    </div>
  );
};

export default EqualityBasics;