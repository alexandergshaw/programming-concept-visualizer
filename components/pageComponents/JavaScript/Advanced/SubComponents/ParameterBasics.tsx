import React from 'react';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import FlexibleGrid from '@/components/common/FlexibleGrid';
import CalloutBox from '@/components/common/CalloutBox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ParameterBasics: React.FC = () => {
  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Function Parameters</strong> are how functions receive input data. JavaScript offers powerful parameter features like default values, rest parameters, and spread syntax to make functions more flexible and easier to use.
      </p>

      <ConceptInfoCard>
        <FlexibleGrid 
          items={[
            {
              title: '🔧 Default Parameters',
              description: 'Provide fallback values when arguments are not provided. Set default values for parameters that activate when argument is undefined.',
              code: `function greet(name = "World") {
  return \`Hello \${name}!\`;
}

greet(); // "Hello World!"
greet("Alice"); // "Hello Alice!"`,
              titleColor: '#1976d2',
              backgroundColor: '#f0f7ff', 
              codeBackgroundColor: '#f8fafc'
            },
            {
              title: '📦 Rest & Spread',
              description: 'Handle variable numbers of arguments. Rest collects arguments into array, Spread expands array into arguments.',
              code: `// Rest: collect arguments
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}

// Spread: expand array
sum(...[1, 2, 3]); // same as sum(1, 2, 3)`,
              titleColor: '#1976d2',
              backgroundColor: '#fff7ed',
              codeBackgroundColor: '#f8fafc'
            }
          ]}
        />

        <CalloutBox title="Quick Decision Guide" type="guide">
          <Typography component="div" sx={{ mb: 1, fontSize: 14 }}>
            <strong>Default Parameters:</strong> When parameters have sensible default values
          </Typography>
          <Typography component="div" sx={{ mb: 1, fontSize: 14 }}>
            <strong>Rest (...args):</strong> When you don't know how many arguments you'll receive
          </Typography>
          <Typography component="div" sx={{ fontSize: 14 }}>
            <strong>Spread (...array):</strong> When you have an array but need separate arguments
          </Typography>
        </CalloutBox>
      </ConceptInfoCard>
    </div>
  );
};

export default ParameterBasics;
