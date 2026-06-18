import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const LooseEqualityExample: React.FC = () => {
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const value1 = inputs.value1 as string;
    const value2 = inputs.value2 as string;
    
    return [`function checkLooseEquality(a, b) {
  console.log('Comparing:', a, 'and', b);
  console.log('Type of a:', typeof a);
  console.log('Type of b:', typeof b);
  
  const result = a == b; // Loose equality
  console.log('a == b:', result);
  
  if (typeof a !== typeof b && result) {
    console.log('⚠️ Type coercion occurred!');
  }
  
  return result;
}

checkLooseEquality(${value1}, ${value2});`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const value1 = inputs.value1 as string;
    const value2 = inputs.value2 as string;
    
    // Parse the values to their actual types
    const parsedValue1 = value1 === 'true' ? true : value1 === 'false' ? false : value1 === 'null' ? null : value1 === 'undefined' ? undefined : value1.startsWith('"') ? value1.slice(1, -1) : Number(value1);
    const parsedValue2 = value2 === 'true' ? true : value2 === 'false' ? false : value2 === 'null' ? null : value2 === 'undefined' ? undefined : value2.startsWith('"') ? value2.slice(1, -1) : Number(value2);
    
    const result = parsedValue1 == parsedValue2; // Intentional loose equality
    const typesMatch = typeof parsedValue1 === typeof parsedValue2;

    return [
      {
        label: 'Check Values',
        desc: 'What are we comparing?',
        highlight: 'checkLooseEquality',
        outputLine: `a = ${value1}, b = ${value2}`
      },
      {
        label: 'Check Types',
        desc: 'Are the types the same?',
        highlight: 'typeof a',
        outputLine: `typeof a = ${typeof parsedValue1}, typeof b = ${typeof parsedValue2}`
      },
      {
        label: 'Loose Comparison',
        desc: typesMatch ? 'Types match, direct comparison' : 'Types differ, coercion happens',
        highlight: 'a == b',
        outputLine: `${value1} == ${value2} = ${result}${!typesMatch && result ? ' ⚠️ Coerced!' : ''}`
      }
    ];
  };

  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        The == operator converts types automatically, causing unexpected results.
      </p>

      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'value1',
            label: 'First Value:',
            options: [
              { value: '0', label: '0 (number)' },
              { value: 'false', label: 'false (boolean)' },
              { value: '""', label: '"" (empty string)' }
            ]
          },
          {
            name: 'value2',
            label: 'Second Value:',
            options: [
              { value: '0', label: '0 (number)' },
              { value: 'false', label: 'false (boolean)' },
              { value: '""', label: '"" (empty string)' }
            ]
          }
        ]}
      />

      <div style={{ padding: 10, backgroundColor: 'var(--warning-bg)', borderRadius: 8, border: '1px solid var(--warning)', marginTop: 12 }}>
        <strong style={{ color: 'var(--warning)' }}>Surprise:</strong> <code>0 == false</code> → true, <code>&quot;&quot; == false</code> → true
      </div>
    </div>
  );
};

export default LooseEqualityExample;