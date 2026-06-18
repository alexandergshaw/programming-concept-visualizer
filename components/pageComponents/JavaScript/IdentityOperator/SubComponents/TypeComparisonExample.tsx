import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const TypeComparisonExample: React.FC = () => {
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const comparisonType = inputs.comparisonType as string;
    const value1 = inputs.value1 as string;
    const value2 = inputs.value2 as string;
    
    // Parse values to their correct types
    const parsedValue1 = value1 === 'true' ? true : value1 === 'false' ? false : value1 === '0' ? 0 : value1 === '""' ? '' : value1;
    const parsedValue2 = value2 === 'true' ? true : value2 === 'false' ? false : value2 === '0' ? 0 : value2 === '""' ? '' : value2;
    
    return [`function demonstrateComparison(a, b, useStrict) {
  console.log('\\n=== COMPARISON DEMO ===');
  console.log('Value A:', a, '(type:', typeof a + ')');
  console.log('Value B:', b, '(type:', typeof b + ')');
  
  if (useStrict) {
    console.log('Using strict equality (===)');
    const result = a === b;
    console.log('Result:', result);
    return result;
  } else {
    console.log('Using loose equality (==)');
    const result = a == b;
    console.log('Result:', result);
    return result;
  }
}

demonstrateComparison(${JSON.stringify(parsedValue1)}, ${JSON.stringify(parsedValue2)}, ${comparisonType === 'strict'});`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const comparisonType = inputs.comparisonType as string;
    const value1 = inputs.value1 as string;
    const value2 = inputs.value2 as string;
    
    // Parse values to their correct types
    const parsedValue1 = value1 === 'true' ? true : value1 === 'false' ? false : value1 === '0' ? 0 : value1 === '""' ? '' : value1;
    const parsedValue2 = value2 === 'true' ? true : value2 === 'false' ? false : value2 === '0' ? 0 : value2 === '""' ? '' : value2;
    
    const type1 = typeof parsedValue1;
    const type2 = typeof parsedValue2;
    const isStrict = comparisonType === 'strict';
    const operator = isStrict ? '===' : '==';
    
    let result: boolean;
    if (isStrict) {
      result = parsedValue1 === parsedValue2;
    } else {
      result = parsedValue1 == parsedValue2; // Intentional loose equality for demonstration
    }

    const steps: Step[] = [
      {
        label: 'Analyze Values',
        desc: 'Check what we\'re comparing',
        highlight: 'a, b',
        outputLine: `A: ${JSON.stringify(parsedValue1)} (${type1}), B: ${JSON.stringify(parsedValue2)} (${type2})`
      },
      {
        label: 'Choose Operator',
        desc: `Using ${isStrict ? 'strict' : 'loose'} equality`,
        highlight: isStrict ? 'a === b' : 'a == b',
        outputLine: `Operator: ${operator}`
      }
    ];

    if (!isStrict && type1 !== type2) {
      steps.push({
        label: 'Type Coercion',
        desc: 'JavaScript converts types automatically',
        highlight: 'a == b',
        outputLine: `Converting types before comparison...`
      });
    }

    steps.push({
      label: 'Final Result',
      desc: isStrict ? 'No type conversion performed' : 'After any type conversion',
      highlight: `${operator}`,
      outputLine: `${JSON.stringify(parsedValue1)} ${operator} ${JSON.stringify(parsedValue2)} = ${result}`
    });

    return steps;
  };

  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        Compare loose (==) vs strict (===) equality to see why identity operators prevent bugs.
      </p>

      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'comparisonType',
            label: 'Comparison Type:',
            options: [
              { value: 'strict', label: 'Strict (===) - Safe' },
              { value: 'loose', label: 'Loose (==) - Risky' }
            ]
          },
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        <div style={{ padding: 12, backgroundColor: 'var(--danger-bg)', borderRadius: 8, border: '1px solid var(--danger)' }}>
          <h5 style={{ color: 'var(--danger)', margin: '0 0 8px 0' }}>❌ Loose (==) Surprises:</h5>
          <code style={{ fontSize: 13, color: 'var(--danger)' }}>0 == false → true<br/>&quot;&quot; == false → true</code>
        </div>
        
        <div style={{ padding: 12, backgroundColor: 'var(--success-bg)', borderRadius: 8, border: '1px solid var(--success)' }}>
          <h5 style={{ color: 'var(--success)', margin: '0 0 8px 0' }}>✅ Strict (===) Clarity:</h5>
          <code style={{ fontSize: 13, color: 'var(--success)' }}>0 === false → false<br/>&quot;&quot; === false → false</code>
        </div>
      </div>
    </div>
  );
};

export default TypeComparisonExample;