import React from 'react';

const IdentityBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        Identity operators (=== and !==) compare both value AND type, preventing bugs from automatic type conversion.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ padding: 12, backgroundColor: 'var(--success-bg)', borderRadius: 8, border: '1px solid var(--success)' }}>
          <h5 style={{ color: 'var(--success)', margin: '0 0 8px 0' }}>✅ === (Strict Equality)</h5>
          <p style={{ margin: '0 0 8px 0', fontSize: 14, color: 'var(--success)' }}>Both value and type must match</p>
          <code style={{ fontSize: 13, color: 'var(--success)' }}>&quot;5&quot; === 5 → false<br/>5 === 5 → true</code>
        </div>
        
        <div style={{ padding: 12, backgroundColor: 'var(--warning-bg)', borderRadius: 8, border: '1px solid var(--warning)' }}>
          <h5 style={{ color: 'var(--warning)', margin: '0 0 8px 0' }}>⚠️ !== (Strict Inequality)</h5>
          <p style={{ margin: '0 0 8px 0', fontSize: 14, color: 'var(--warning)' }}>Value or type differs</p>
          <code style={{ fontSize: 13, color: 'var(--warning)' }}>&quot;5&quot; !== 5 → true<br/>0 !== false → true</code>
        </div>
      </div>

      <div style={{ padding: 12, backgroundColor: 'var(--success-bg)', borderRadius: 8, border: '1px solid var(--success)' }}>
        <strong style={{ color: 'var(--success)' }}>Rule:</strong> Always use === and !== to avoid type coercion surprises like <code>0 == false</code> → true
      </div>
    </div>
  );
};

export default IdentityBasics;