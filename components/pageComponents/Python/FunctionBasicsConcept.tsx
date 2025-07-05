'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import Typography from '@mui/material/Typography';
import CodeSnippet from '../../common/CodeSnippet';
import Box from '@mui/material/Box';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';

export default function FunctionBasicsConcept() {
  const [functionOutput, setFunctionOutput] = useState<string>('');
  const [currentStep, setCurrentStep] = useState(0);

  const basicFunctionCode = [
    'def greet(name):',
    '    """This function prints a greeting"""',
    '    print(f"Hello, {name}!")',
    '',
    '# Call the function',
    'greet("Alice")'
  ];

  const basicFunctionSteps = [
    {
      label: 'Function Definition',
      desc: 'Define a function named "greet" that takes a parameter "name"',
      highlight: 'def greet(name):'
    },
    {
      label: 'Docstring',
      desc: 'Add documentation to explain what the function does',
      highlight: '"""This function prints a greeting"""'
    },
    {
      label: 'Function Body',
      desc: 'The actual code that runs when the function is called',
      highlight: 'print(f"Hello, {name}!")'
    },
    {
      label: 'Function Call',
      desc: 'Execute the function with an argument',
      highlight: 'greet("Alice")'
    }
  ];

  return (
    <ConceptWrapper
      title="Python Functions: The Basics"
      description="Learn how to create and use functions in Python"
    >
      <Section title="What is a Function?">
        <Typography variant="body2" paragraph>
          A function is a reusable block of code that performs a specific task. Think of it like a recipe - you define the steps once and can use them again and again.
        </Typography>

        <ConceptInfoCard>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Key Function Concepts
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2">
              <strong>1. Definition:</strong> Functions are defined using the 'def' keyword, followed by the function name and parameters in parentheses.
            </Typography>
            <Typography variant="body2">
              <strong>2. Parameters:</strong> Variables listed in the function definition that act as placeholders for the values the function will receive.
            </Typography>
            <Typography variant="body2">
              <strong>3. Arguments:</strong> The actual values passed to the function when it's called.
            </Typography>
            <Typography variant="body2">
              <strong>4. Return Value:</strong> The data that a function sends back to the code that called it (using the 'return' statement).
            </Typography>
          </Box>
        </ConceptInfoCard>

        <Box sx={{ my: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Basic Function Structure
          </Typography>
          <ConceptInfoCard>
            <StepThroughCodeAnimation
              code={basicFunctionCode}
              steps={basicFunctionSteps}
              onStepChange={setCurrentStep}
            />
          </ConceptInfoCard>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Functions with Return Values
          </Typography>
          <ConceptInfoCard>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" paragraph>
                Functions can send back values using the 'return' statement. This is useful when you want to get a result from a function's computation.
              </Typography>
              <CodeSnippet
                lines={[
                  { code: 'def add_numbers(a, b):' },
                  { code: '    """Returns the sum of two numbers"""' },
                  { code: '    return a + b' },
                  { code: '' },
                  { code: 'result = add_numbers(5, 3)' },
                  { code: 'print(result)    # Prints: 8' }
                ]}
                language="python"
              />
            </Box>
          </ConceptInfoCard>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Parameters and Arguments
          </Typography>
          <ConceptInfoCard>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" paragraph>
                Functions can have default parameter values and accept arguments in different ways.
              </Typography>
              <CodeSnippet
                lines={[
                  { code: 'def describe_pet(name, animal_type="dog"):' },
                  { code: '    """Demonstrates default parameters"""' },
                  { code: '    print(f"I have a {animal_type} named {name}.")' },
                  { code: '' },
                  { code: '# Different ways to call the function' },
                  { code: 'describe_pet("Rover")                  # Uses default animal_type' },
                  { code: 'describe_pet("Whiskers", "cat")        # Overrides default' },
                  { code: 'describe_pet(animal_type="fish", name="Bubbles")  # Named arguments' }
                ]}
                language="python"
              />
            </Box>
          </ConceptInfoCard>
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Try It Out
          </Typography>
          <ConceptInfoCard>
            <Typography variant="body2" gutterBottom>
              Here's a practical example of a function that calculates area:
            </Typography>
            <CodeSnippet
              lines={[
                { code: 'def calculate_area(length, width):' },
                { code: '    """Calculate the area of a rectangle"""' },
                { code: '    return length * width' },
                { code: '' },
                { code: '# Test the function' },
                { code: 'print(calculate_area(5, 3))   # Should print: 15' },
                { code: 'print(calculate_area(10, 2))  # Should print: 20' },
                { code: '' },
                { code: '# Using named arguments' },
                { code: 'area = calculate_area(width=4, length=6)' },
                { code: 'print(area)                   # Should print: 24' }
              ]}
              language="python"
            />
          </ConceptInfoCard>
        </Box>
      </Section>
    </ConceptWrapper>
  );
} 