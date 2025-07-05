'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import Typography from '@mui/material/Typography';
import CodeSnippet from '../../common/CodeSnippet';
import Box from '@mui/material/Box';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';

export default function AdvancedFunctionsConcept() {
  const [currentStep, setCurrentStep] = useState(0);

  const decoratorCode = [
    'def timer(func):',
    '    def wrapper(*args, **kwargs):',
    '        import time',
    '        start = time.time()',
    '        result = func(*args, **kwargs)',
    '        end = time.time()',
    '        print(f"Time: {end - start:.2f}s")',
    '        return result',
    '    return wrapper',
    '',
    '@timer',
    'def slow_function():',
    '    time.sleep(1)',
    '    print("Done!")'
  ];

  const decoratorSteps = [
    {
      label: 'Decorator Definition',
      desc: 'Define a decorator function that takes another function as input',
      highlight: 'def timer(func):'
    },
    {
      label: 'Wrapper Function',
      desc: 'Create an inner function that will wrap around the original function',
      highlight: '    def wrapper(*args, **kwargs):'
    },
    {
      label: 'Start Timer',
      desc: 'Record the start time before executing the function',
      highlight: ['        import time', '        start = time.time()']
    },
    {
      label: 'Execute Function',
      desc: 'Call the original function and store its result',
      highlight: '        result = func(*args, **kwargs)'
    },
    {
      label: 'End Timer',
      desc: 'Calculate and print the execution time',
      highlight: ['        end = time.time()', '        print(f"Time: {end - start:.2f}s")']
    },
    {
      label: 'Return Result',
      desc: 'Return the original function\'s result',
      highlight: '        return result'
    },
    {
      label: 'Apply Decorator',
      desc: 'Use the @timer syntax to decorate a function',
      highlight: '@timer'
    }
  ];

  return (
    <ConceptWrapper
      title="Advanced Python Functions"
      description="Learn about advanced function concepts like lambda, decorators, and more"
    >
      <Section title="Lambda Functions">
        <Typography variant="body2" paragraph>
          Lambda functions are small, anonymous functions that can have any number of arguments but can only have one expression.
          They're useful for short operations that don't need a full function definition.
        </Typography>

        <ConceptInfoCard>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Lambda Function Examples
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" paragraph>
              Lambda functions are often used with higher-order functions like map(), filter(), and sort().
            </Typography>
            <CodeSnippet
              lines={[
                { code: '# Regular function vs Lambda' },
                { code: 'def double(x):' },
                { code: '    return x * 2' },
                { code: '' },
                { code: 'double_lambda = lambda x: x * 2' },
                { code: '' },
                { code: '# Using lambda with map()' },
                { code: 'numbers = [1, 2, 3, 4]' },
                { code: 'doubled = list(map(lambda x: x * 2, numbers))' },
                { code: 'print(doubled)  # [2, 4, 6, 8]' },
                { code: '' },
                { code: '# Using lambda with filter()' },
                { code: 'even_numbers = list(filter(lambda x: x % 2 == 0, numbers))' },
                { code: 'print(even_numbers)  # [2, 4]' }
              ]}
              language="python"
            />
          </Box>
        </ConceptInfoCard>
      </Section>

      <Section title="Function Decorators">
        <Typography variant="body2" paragraph>
          Decorators are functions that modify the behavior of other functions. They're a powerful way to add functionality to existing functions.
        </Typography>

        <ConceptInfoCard>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Understanding Decorators
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" paragraph>
              A decorator wraps a function, modifying its behavior without explicitly changing its source code.
              Below is an example of a timer decorator that measures how long a function takes to execute:
            </Typography>
            <StepThroughCodeAnimation
              code={decoratorCode}
              steps={decoratorSteps}
              onStepChange={setCurrentStep}
            />
          </Box>
        </ConceptInfoCard>
      </Section>

      <Section title="*args and **kwargs">
        <Typography variant="body2" paragraph>
          These special parameters allow functions to accept any number of positional and keyword arguments.
        </Typography>

        <ConceptInfoCard>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Flexible Arguments
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2">
              <strong>*args:</strong> Collects all positional arguments into a tuple
            </Typography>
            <Typography variant="body2">
              <strong>**kwargs:</strong> Collects all keyword arguments into a dictionary
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <CodeSnippet
              lines={[
                { code: 'def print_all(*args, **kwargs):' },
                { code: '    """Prints all positional and keyword arguments"""' },
                { code: '    # Print positional arguments' },
                { code: '    for arg in args:' },
                { code: '        print(f"Positional arg: {arg}")' },
                { code: '    # Print keyword arguments' },
                { code: '    for key, value in kwargs.items():' },
                { code: '        print(f"Keyword arg {key}: {value}")' },
                { code: '' },
                { code: '# Example usage' },
                { code: 'print_all(1, 2, 3, name="Alice", age=30)' }
              ]}
              language="python"
            />
          </Box>
        </ConceptInfoCard>
      </Section>

      <Section title="Function Annotations">
        <Typography variant="body2" paragraph>
          Python supports function annotations that can provide type hints and documentation for parameters and return values.
        </Typography>

        <ConceptInfoCard>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Type Hints
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" paragraph>
              Type hints help document expected types and enable better IDE support and static type checking:
            </Typography>
            <CodeSnippet
              lines={[
                { code: 'from typing import List, Dict' },
                { code: '' },
                { code: 'def process_data(numbers: List[int], config: Dict[str, str]) -> List[str]:' },
                { code: '    """Process a list of numbers based on configuration""" ' },
                { code: '    result = []' },
                { code: '    for num in numbers:' },
                { code: '        if config.get("format") == "hex":' },
                { code: '            result.append(hex(num))' },
                { code: '        else:' },
                { code: '            result.append(str(num))' },
                { code: '    return result' },
                { code: '' },
                { code: '# Example usage' },
                { code: 'nums = [1, 2, 3]' },
                { code: 'cfg = {"format": "hex"}' },
                { code: 'print(process_data(nums, cfg))  # Prints: [\'0x1\', \'0x2\', \'0x3\']' }
              ]}
              language="python"
            />
          </Box>
        </ConceptInfoCard>
      </Section>
    </ConceptWrapper>
  );
} 