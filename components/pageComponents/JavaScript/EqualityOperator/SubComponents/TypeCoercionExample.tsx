import React from 'react';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const TypeCoercionExample: React.FC = () => {
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const value1 = inputs.value1 as string;
    const value2 = inputs.value2 as string;
    
    return [`function demonstrateCoercion(a, b) {
  console.log('\\n=== TYPE COERCION DEMO ===');
  console.log('Original values:', a, 'vs', b);
  console.log('Original types:', typeof a, 'vs', typeof b);
  
  // JavaScript's internal conversion process
  console.log('\\n--- Conversion Process ---');
  
  // Show what JavaScript converts them to
  const convertedA = a == true ? 'truthy' : a == false ? 'falsy' : a;
  const convertedB = b == true ? 'truthy' : b == false ? 'falsy' : b;
  
  console.log('Converted A:', convertedA);
  console.log('Converted B:', convertedB);
  
  const result = a == b;
  console.log('\\nFinal result:', a, '==', b, '→', result);
  
  return result;
}

demonstrateCoercion(${value1}, ${value2});`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const value1 = inputs.value1 as string;
    const value2 = inputs.value2 as string;
    
    // Parse values to their actual types
    const parsedValue1 = value1 === 'true' ? true : value1 === 'false' ? false : value1 === 'null' ? null : value1 === 'undefined' ? undefined : value1 === '""' ? '' : value1.startsWith('"') ? value1.slice(1, -1) : Number(value1);
    const parsedValue2 = value2 === 'true' ? true : value2 === 'false' ? false : value2 === 'null' ? null : value2 === 'undefined' ? undefined : value2 === '""' ? '' : value2.startsWith('"') ? value2.slice(1, -1) : Number(value2);
    
    const result = parsedValue1 == parsedValue2; // Intentional loose equality
    const typesMatch = typeof parsedValue1 === typeof parsedValue2;

    let conversionStep = 'No conversion needed';
    if (!typesMatch) {
      if ((parsedValue1 === 0 && parsedValue2 === false) || (parsedValue1 === false && parsedValue2 === 0)) {
        conversionStep = 'false → 0, then 0 == 0';
      } else if ((parsedValue1 === '' && parsedValue2 === false) || (parsedValue1 === false && parsedValue2 === '')) {
        conversionStep = 'false → 0, "" → 0, then 0 == 0';
      } else if ((typeof parsedValue1 === 'string' && typeof parsedValue2 === 'number') || (typeof parsedValue1 === 'number' && typeof parsedValue2 === 'string')) {
        conversionStep = 'String converted to number';
      } else {
        conversionStep = 'JavaScript converts types before comparing';
      }
    }

    return [
      {
        label: 'Original Values',
        desc: 'Check what we start with',
        highlight: 'demonstrateCoercion',
        outputLine: `${value1} (${typeof parsedValue1}) vs ${value2} (${typeof parsedValue2})`
      },
      {
        label: 'Type Conversion',
        desc: typesMatch ? 'Types match, no conversion' : 'JavaScript converts types',
        highlight: 'const result = a == b',
        outputLine: conversionStep
      },
      {
        label: 'Final Comparison',
        desc: 'After any conversions',
        highlight: 'return result',
        outputLine: `Result: ${result}`
      }
    ];
  };

  return (
    <div>
      <p style={{ marginBottom: 16 }}>
        See how JavaScript converts types during loose equality.
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

      <div style={{ padding: 10, backgroundColor: '#fff3e0', borderRadius: 8, border: '1px solid #ffb74d', marginTop: 12 }}>
        <strong style={{ color: '#f57c00' }}>Coercion rules:</strong> Booleans → numbers (false=0), strings → numbers when possible
      </div>
    </div>
  );
};

export default TypeCoercionExample;