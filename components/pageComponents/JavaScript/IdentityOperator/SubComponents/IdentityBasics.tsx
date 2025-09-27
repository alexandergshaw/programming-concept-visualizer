import React from 'react';

const IdentityBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        Identity operators (=== and !==) compare both value AND type, preventing bugs from automatic type conversion.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div style={{ padding: 12, backgroundColor: '#e8f5e9', borderRadius: 8, border: '1px solid #4caf50' }}>
          <h5 style={{ color: '#2e7d32', margin: '0 0 8px 0' }}>✅ === (Strict Equality)</h5>
          <p style={{ margin: '0 0 8px 0', fontSize: 14, color: '#388e3c' }}>Both value and type must match</p>
          <code style={{ fontSize: 13, color: '#1b5e20' }}>&quot;5&quot; === 5 → false<br/>5 === 5 → true</code>
        </div>
        
        <div style={{ padding: 12, backgroundColor: '#fff3e0', borderRadius: 8, border: '1px solid #ffb74d' }}>
          <h5 style={{ color: '#f57c00', margin: '0 0 8px 0' }}>⚠️ !== (Strict Inequality)</h5>
          <p style={{ margin: '0 0 8px 0', fontSize: 14, color: '#ef6c00' }}>Value or type differs</p>
          <code style={{ fontSize: 13, color: '#e65100' }}>&quot;5&quot; !== 5 → true<br/>0 !== false → true</code>
        </div>
      </div>

      <div style={{ padding: 12, backgroundColor: '#e8f5e9', borderRadius: 8, border: '1px solid #4caf50' }}>
        <strong style={{ color: '#2e7d32' }}>Rule:</strong> Always use === and !== to avoid type coercion surprises like <code>0 == false</code> → true
      </div>
    </div>
  );
};

export default IdentityBasics;