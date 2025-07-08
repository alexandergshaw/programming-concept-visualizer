'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';
import CodePartsExplanation from '../../common/CodePartsExplanation';
import TableOfContents from '@/components/common/TableOfContents';

export default function FunctionBasicsConcept() {
  const basicFunctionCode = [
    'def greet(name):',
    '    """This function prints a greeting"""',
    '    print(f"Hello, {name}!")',
    '',
    '# Call the function',
    'greet("Alice")'
  ];

  const functionCode = "def greet(name):\n    print(f\"Hello, {name}!\")\n\n# Call the function\ngreet(\"Alice\")";

  return (
    <ConceptWrapper
      title="Python Functions: The Basics"
      description="Learn how to create and use functions in Python"
    >
      <TableOfContents numbered>
        <Section title="What is a Function?">
          <Typography variant="body2" paragraph>
            A function is like a mini-program inside your program. It&apos;s a way to package up code so you can use it over and over again, just like how you might save a recipe to cook the same dish multiple times.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Why Use Functions?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>📦 Package Code:</strong> Put related code together in one place
              </Typography>
              <Typography variant="body2">
                <strong>🔄 Reuse Code:</strong> Write once, use many times
              </Typography>
              <Typography variant="body2">
                <strong>🧹 Stay Organized:</strong> Keep your code neat and easy to understand
              </Typography>
              <Typography variant="body2">
                <strong>🐛 Debug Easier:</strong> Test and fix smaller pieces of code
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="How to Write a Function">
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.25%',
              paddingBottom: 0,
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: 8,
              willChange: 'transform'
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0
              }}
              src="https://www.canva.com/design/DAGscnUHEEg/Fspg52MHC_gKtjnFwELo2Q/watch?embed"
              allowFullScreen
              allow="fullscreen"
            />
          </div>
          <ConceptInfoCard>
            <StepThroughCodeAnimation
              code={basicFunctionCode}
              steps={[
                {
                  label: 'Step 1: Start the Function',
                  desc: 'Tell Python you want to create a function called &quot;greet&quot;',
                  highlight: 'def greet(name):'
                },
                {
                  label: 'Step 2: Add a Description',
                  desc: 'Write a note so you remember what this function does',
                  highlight: '"""This function prints a greeting"""'
                },
                {
                  label: 'Step 3: Function Body',
                  desc: 'Write the code that actually does something useful',
                  highlight: 'print(f"Hello, {name}!")'
                },
                {
                  label: 'Step 4: Use the Function',
                  desc: 'Now you can use your function by calling its name',
                  highlight: 'greet("Alice")'
                }
              ]}
            />
          </ConceptInfoCard>
        </Section>

        <Section title="Return Statements">
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.25%',
              paddingBottom: 0,
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: 8,
              willChange: 'transform'
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0
              }}
              src="https://www.canva.com/design/DAGscpNX8I0/Pu7P7XkfDzrXeMITVE6ZSg/watch?embed"
              allowFullScreen
              allow="fullscreen"
            />
          </div>
          <ConceptInfoCard>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" paragraph>
                Sometimes you want your function to give you back an answer, like a calculator. Use &quot;return&quot; to send back a result:
              </Typography>
              <CodePartsExplanation
                code={`def add_numbers(a, b):
    """Returns the sum of two numbers"""
    return a + b

result = add_numbers(5, 3)
print(result)    # Prints: 8`}
                parts={[
                  {
                    label: 'Return Statement',
                    part: 'return',
                    color: '#9333ea',
                    desc: 'This gives back an answer to whoever asked for it'
                  },
                  {
                    label: 'Catch the answer',
                    part: 'result = add_numbers(5, 3)',
                    color: '#059669',
                    desc: 'Put the answer in a variable so you can use it'
                  },
                  {
                    label: 'Multiple parameters',
                    part: 'a, b',
                    color: '#dc2626',
                    desc: 'You can give your function multiple pieces of information'
                  }
                ]}
              />
            </Box>
            <StepThroughCodeAnimation
              code={[
                'def add_numbers(a, b):',
                '    """Returns the sum of two numbers"""',
                '    return a + b',
                '',
                'result = add_numbers(5, 3)',
                'print(result)    # Prints: 8'
              ]}
              steps={[
                {
                  label: 'Create a Calculator Function',
                  desc: 'Make a function that can add two numbers together',
                  highlight: 'def add_numbers(a, b):'
                },
                {
                  label: 'Explain What It Does',
                  desc: 'Write a note so others know this function adds numbers',
                  highlight: '"""Returns the sum of two numbers"""'
                },
                {
                  label: 'Do the Math and Send Back Answer',
                  desc: 'Add the numbers and give back the result',
                  highlight: 'return a + b'
                },
                {
                  label: 'Use the Function',
                  desc: 'Ask the function to add 5 + 3 and save the answer',
                  highlight: 'result = add_numbers(5, 3)'
                },
                {
                  label: 'Show the Answer',
                  desc: 'Print the answer that the function gave us',
                  highlight: 'print(result)    # Prints: 8'
                }
              ]}
              onStepChange={() => { }}
            />
          </ConceptInfoCard>
        </Section>

        <Section title="Parameters and Arguments">
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.25%',
              paddingBottom: 0,
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: 8,
              willChange: 'transform'
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0
              }}
              src="https://www.canva.com/design/DAGscgRCtlY/xPXPZYjLgBObw_8fr5DQtA/watch?embed"
              allowFullScreen
              allow="fullscreen"
            />
          </div>
          <ConceptInfoCard>
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" paragraph>
                Functions can have default parameter values and accept arguments in different ways.
              </Typography>

              <CodePartsExplanation
                code={`def describe_pet(name, animal_type="dog"):
    """Demonstrates default parameters"""
    print(f"I have a {animal_type} named {name}.")

# Different ways to call the function
describe_pet("Rover")                  # Output: I have a dog named Rover.
describe_pet("Whiskers", "cat")        # Output: I have a cat named Whiskers.
describe_pet(animal_type="fish", name="Bubbles")  # Output: I have a fish named Bubbles.`}
                parts={[
                  {
                    label: 'Default parameter',
                    part: 'animal_type="dog"',
                    color: '#9333ea',
                    desc: 'A default value is used if no argument is provided for this parameter'
                  },
                  {
                    label: 'Named arguments',
                    part: 'animal_type="fish", name="Bubbles"',
                    color: '#059669',
                    desc: 'You can specify which parameter gets which value by using names'
                  },
                  {
                    label: 'Positional arguments',
                    part: '"Whiskers", "cat"',
                    color: '#dc2626',
                    desc: 'Arguments passed in order without specifying parameter names'
                  }
                ]}
              />
            </Box>
            <StepThroughCodeAnimation
              code={[
                'def describe_pet(name, animal_type=&quot;dog&quot;):',
                '    &quot;&quot;&quot;Demonstrates default parameters&quot;&quot;&quot;',
                '    print(f&quot;I have a {animal_type} named {name}.&quot;)',
                '',
                '# Different ways to call the function',
                'describe_pet(&quot;Rover&quot;)                  # Output: I have a dog named Rover.',
                'describe_pet(&quot;Whiskers&quot;, &quot;cat&quot;)        # Output: I have a cat named Whiskers.',
                'describe_pet(animal_type=&quot;fish&quot;, name=&quot;Bubbles&quot;)  # Output: I have a fish named Bubbles.'
              ]}
              steps={[
                {
                  label: 'Function with Default Parameter',
                  desc: 'Define a function where animal_type has a default value of &quot;dog&quot;',
                  highlight: 'def describe_pet(name, animal_type=&quot;dog&quot;):'
                },
                {
                  label: 'Function Body',
                  desc: 'The function prints information about the pet using both parameters',
                  highlight: 'print(f&quot;I have a {animal_type} named {name}.&quot;)'
                },
                {
                  label: 'Call with Default',
                  desc: 'Call with only required parameter - animal_type defaults to &quot;dog&quot;',
                  highlight: 'describe_pet(&quot;Rover&quot;)                  # Output: I have a dog named Rover.'
                },
                {
                  label: 'Call with All Arguments',
                  desc: 'Provide both arguments in order to override the default',
                  highlight: 'describe_pet(&quot;Whiskers&quot;, &quot;cat&quot;)        # Output: I have a cat named Whiskers.'
                },
                {
                  label: 'Call with Named Arguments',
                  desc: 'Use parameter names to specify which value goes where',
                  highlight: 'describe_pet(animal_type=&quot;fish&quot;, name=&quot;Bubbles&quot;)  # Output: I have a fish named Bubbles.'
                }
              ]}
              onStepChange={() => { }}
            />
          </ConceptInfoCard>
        </Section>

        <Section title="Try It Out">
          <ConceptInfoCard>
            <Typography variant="body2" gutterBottom>
              Here&apos;s a practical example of a function that calculates area:
            </Typography>
            <Box sx={{ mb: 3 }}>
              <CodePartsExplanation
                code={`def calculate_area(length, width):
    """Calculate the area of a rectangle"""
    return length * width

# Test the function
print(calculate_area(5, 3))   # Should print: 15
print(calculate_area(10, 2))  # Should print: 20

# Using named arguments
area = calculate_area(width=4, length=6)
print(area)                   # Should print: 24`}
                parts={[
                  {
                    label: 'Function definition',
                    part: 'def calculate_area(length, width):',
                    color: '#9333ea',
                    desc: 'Define a function that takes length and width parameters'
                  },
                  {
                    label: 'Return calculation',
                    part: 'return length * width',
                    color: '#dc2626',
                    desc: 'Calculate and return the area (length × width)'
                  },
                  {
                    label: 'Direct function call',
                    part: 'print(calculate_area(5, 3))',
                    color: '#059669',
                    desc: 'Call the function directly inside print()'
                  },
                  {
                    label: 'Named arguments',
                    part: 'calculate_area(width=4, length=6)',
                    color: '#2563eb',
                    desc: 'Use parameter names to make the code more readable'
                  }
                ]}
              />
            </Box>
            <StepThroughCodeAnimation
              code={[
                'def calculate_area(length, width):',
                '    """Calculate the area of a rectangle"""',
                '    return length * width',
                '',
                '# Test the function',
                'print(calculate_area(5, 3))   # Should print: 15',
                'print(calculate_area(10, 2))  # Should print: 20',
                '',
                '# Using named arguments',
                'area = calculate_area(width=4, length=6)',
                'print(area)                   # Should print: 24'
              ]}
              steps={[
                {
                  label: 'Define the Function',
                  desc: 'Create a function that calculates the area of a rectangle',
                  highlight: 'def calculate_area(length, width):'
                },
                {
                  label: 'Add Documentation',
                  desc: 'Include a docstring to explain what the function does',
                  highlight: '"""Calculate the area of a rectangle"""'
                },
                {
                  label: 'Return the Calculation',
                  desc: 'Calculate area by multiplying length × width and return the result',
                  highlight: 'return length * width'
                },
                {
                  label: 'Test with Direct Call',
                  desc: 'Test the function by calling it directly in a print statement',
                  highlight: 'print(calculate_area(5, 3))   # Should print: 15'
                },
                {
                  label: 'Test with Different Values',
                  desc: 'Try another set of values to verify the function works correctly',
                  highlight: 'print(calculate_area(10, 2))  # Should print: 20'
                },
                {
                  label: 'Store Result in Variable',
                  desc: 'Call the function with named arguments and store the result',
                  highlight: 'area = calculate_area(width=4, length=6)'
                },
                {
                  label: 'Print the Stored Result',
                  desc: 'Print the area that was calculated and stored in the variable',
                  highlight: 'print(area)                   # Should print: 24'
                }
              ]}
              onStepChange={() => { }}
            />
          </ConceptInfoCard>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
} 