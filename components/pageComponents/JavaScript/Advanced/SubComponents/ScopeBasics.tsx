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
              titleColor: 'var(--info)',
              backgroundColor: 'var(--warning-bg)',
              codeBackgroundColor: 'var(--paper-raised)'
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
              titleColor: 'var(--info)',
              backgroundColor: 'var(--success-bg)',
              codeBackgroundColor: 'var(--paper-raised)'
            }
          ]}
        />

        <div style={{ marginTop: 20 }}>
          <h6 style={{ margin: '0 0 16px 0', color: 'var(--info)' }}>🔗 Block Scope (let/const)</h6>
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
                titleColor: 'var(--success)',
                backgroundColor: 'var(--success-bg)',
                codeBackgroundColor: 'var(--paper-raised)'
              },
              {
                title: '⚠️ Old var (function scope)',
                description: `Legacy function-scoped variables (avoid in new code)`,
                code: `if (true) {
  var oldVar = "I'm function scoped";
}
console.log(oldVar); // Works (but confusing)`,
                titleColor: 'var(--warning)',
                backgroundColor: 'var(--warning-bg)',
                codeBackgroundColor: 'var(--paper-raised)'
              }
            ]}
          />
        </div>

        <div style={{ marginTop: 20, padding: 16, background: 'var(--paper-raised)', borderRadius: 4, border: '1px solid var(--paper-sunken)' }}>
          <h5 style={{ margin: '0 0 12px 0', color: 'var(--ink-soft)' }}>🤔 Quick Scope Rules</h5>
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