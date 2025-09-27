import React from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import CalloutBox from '@/components/common/CalloutBox';

const PatternsBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Inheritance vs Composition</strong> are two ways to build relationships between objects. Choose the right pattern based on whether you're modeling "IS-A" or "HAS-A" relationships.
      </p>

      <ConceptInfoCard>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          
          <div>
            <h6 style={{ margin: '0 0 16px 0', color: '#1976d2' }}>🏗️ Inheritance Pattern</h6>
            <p style={{ margin: '0 0 12px 0', fontWeight: 'bold', color: '#333' }}>When to use: "IS-A" relationships</p>
            
            <div style={{ marginBottom: 16 }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#666', fontSize: 14 }}>Best for:</h5>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14 }}>
                <li>Natural hierarchies (Animal → Dog)</li>
                <li>Shared behavior across types</li>
                <li>Consistent interfaces</li>
              </ul>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#666', fontSize: 14 }}>Example:</h5>
              <code style={{ background: '#f5f5f5', padding: '8px', borderRadius: 4, fontSize: 12, display: 'block' }}>
                {`class Animal { eat() {...} }
class Dog extends Animal {
  bark() {...}
}`}
              </code>
            </div>

            <div style={{ background: '#e8f5e9', padding: 12, borderRadius: 4, border: '1px solid #4caf50' }}>
              <div style={{ color: '#2e7d32', fontSize: 14, fontWeight: 'bold' }}>✅ Use when:</div>
              <div style={{ fontSize: 13, color: '#388e3c' }}>You can clearly say "X IS-A Y"</div>
            </div>
          </div>

          <div>
            <h6 style={{ margin: '0 0 16px 0', color: '#1976d2' }}>🔧 Composition Pattern</h6>
            <p style={{ margin: '0 0 12px 0', fontWeight: 'bold', color: '#333' }}>When to use: "HAS-A" relationships</p>
            
            <div style={{ marginBottom: 16 }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#666', fontSize: 14 }}>Best for:</h5>
              <ul style={{ margin: 0, paddingLeft: 16, fontSize: 14 }}>
                <li>Flexible combinations</li>
                <li>Reusable components</li>
                <li>Avoiding deep hierarchies</li>
              </ul>
            </div>

            <div style={{ marginBottom: 16 }}>
              <h5 style={{ margin: '0 0 8px 0', color: '#666', fontSize: 14 }}>Example:</h5>
              <code style={{ background: '#f5f5f5', padding: '8px', borderRadius: 4, fontSize: 12, display: 'block' }}>
                {`class Car {
  constructor() {
    this.engine = new Engine();
    this.gps = new GPS();
  }
}`}
              </code>
            </div>

            <div style={{ background: '#fff3e0', padding: 12, borderRadius: 4, border: '1px solid #ff9800' }}>
              <div style={{ color: '#f57c00', fontSize: 14, fontWeight: 'bold' }}>⚡ Use when:</div>
              <div style={{ fontSize: 13, color: '#ef6c00' }}>You can say "X HAS-A Y"</div>
            </div>
          </div>
        </div>

        <CalloutBox title="🤔 Quick Decision Guide" type="guide">
          <div style={{ fontSize: 14, lineHeight: 1.6 }}>
            <strong>Choose Inheritance if:</strong> Classes share the same basic nature (all are types of animals, vehicles, etc.)<br/>
            <strong>Choose Composition if:</strong> Objects are built from different parts that could be mixed/matched
          </div>
        </CalloutBox>
      </ConceptInfoCard>
    </div>
  );
};

export default PatternsBasics;