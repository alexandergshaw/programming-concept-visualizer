import React from 'react';

const SwitchBasics: React.FC = () => {
  return (
    <div>
      <p>Switch statements provide a cleaner alternative to long if-else chains when checking the same variable against multiple values.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0' }}>
        <div style={{ padding: '15px', backgroundColor: '#fff8e1', borderRadius: '4px' }}>
          <h5>❌ If-Else Chain:</h5>
          <pre style={{ fontSize: '12px', margin: 0 }}>{`if (grade === 'A') {
  return 'Excellent';
} else if (grade === 'B') {
  return 'Good';
} else if (grade === 'C') {
  return 'Average';
} else {
  return 'Needs work';
}`}</pre>
        </div>
        
        <div style={{ padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '4px' }}>
          <h5>✅ Switch Statement:</h5>
          <pre style={{ fontSize: '12px', margin: 0 }}>{`switch (grade) {
  case 'A':
    return 'Excellent';
  case 'B':
    return 'Good';
  case 'C':
    return 'Average';
  default:
    return 'Needs work';
}`}</pre>
        </div>
      </div>
    </div>
  );
};

export default SwitchBasics;