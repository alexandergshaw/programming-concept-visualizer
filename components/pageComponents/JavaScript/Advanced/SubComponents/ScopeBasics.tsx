import React from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import FlexibleGrid, { GridItem } from '@/components/common/FlexibleGrid';

const ScopeBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>JavaScript Scope</strong> determines where variables can be accessed in your code. Understanding scope is crucial for avoiding bugs and writing maintainable code.
      </p>

      <ConceptInfoCard>
        <FlexibleGrid 
          items={[
            {
              title: '🌍 Global Scope',
              description: `Accessible everywhere

Characteristics:
• Variables declared outside functions
• Accessible from anywhere in program
• Attached to window object (browser)

⚠️ Use sparingly: Too many globals can cause conflicts`,
              code: `let globalVar = "I'm global";
function test() {
  console.log(globalVar); // Works!
}`,
              titleColor: '#1976d2',
              backgroundColor: '#fff3e0',
              codeBackgroundColor: '#f5f5f5'
            },
            {
              title: '🏠 Function Scope',
              description: `Private to the function

Characteristics:
• Variables declared inside functions
• Only accessible within that function
• Created new on each function call

✅ Best practice: Keep variables in smallest needed scope`,
              code: `function myFunction() {
  let localVar = "I'm local";
  return localVar;
}
// console.log(localVar); // Error!`,
              titleColor: '#1976d2',
              backgroundColor: '#e8f5e9',
              codeBackgroundColor: '#f5f5f5'
            }
          ]}
        />

        <div style={{ marginTop: 20 }}>
          <h6 style={{ margin: '0 0 16px 0', color: '#1976d2' }}>🔗 Block Scope (let/const)</h6>
          <FlexibleGrid 
            items={[
              {
                title: '🆕 ES6+ Block Scope',
                description: `Modern block-scoped variables (preferred)`,
                code: `if (true) {
  let blockVar = "I'm in a block";
  const alsoBlock = "Me too!";
}
// console.log(blockVar); // Error!`,
                titleColor: '#4caf50',
                backgroundColor: '#e8f5e9',
                codeBackgroundColor: '#f5f5f5'
              },
              {
                title: '⚠️ Old var (function scope)',
                description: `Legacy function-scoped variables (avoid in new code)`,
                code: `if (true) {
  var oldVar = "I'm function scoped";
}
console.log(oldVar); // Works (but confusing)`,
                titleColor: '#ff9800',
                backgroundColor: '#fff3e0',
                codeBackgroundColor: '#f5f5f5'
              }
            ]}
          />
        </div>

        <div style={{ marginTop: 20, padding: 16, background: '#f8f9fa', borderRadius: 4, border: '1px solid #dee2e6' }}>
          <h5 style={{ margin: '0 0 12px 0', color: '#495057' }}>🤔 Quick Scope Rules</h5>
          <div style={{ fontSize: 14, lineHeight: 1.6 }}>
            <strong>let/const:</strong> Block-scoped (preferred in modern JavaScript)<br/>
            <strong>var:</strong> Function-scoped (avoid in new code)<br/>
            <strong>Functions:</strong> Create their own scope for variables inside them
          </div>
        </div>
      </ConceptInfoCard>
    </div>
  );
};

export default ScopeBasics;