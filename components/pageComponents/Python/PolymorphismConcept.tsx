'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import CodePartsExplanation from '../../common/CodePartsExplanation';
import CodeSnippet from '../../common/CodeSnippet';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

export default function PolymorphismConcept() {
  const [radius, setRadius] = useState(2);
  const [side, setSide] = useState(3);
  const [base, setBase] = useState(4);
  const [height, setHeight] = useState(5);
  const [output, setOutput] = useState<string[]>([]);

  const runAreas = () => {
    const circle = Math.PI * radius * radius;
    const square = side * side;
    const triangle = 0.5 * base * height;
    setOutput([
      'for shape in shapes:',
      '    print(shape.area())',
      '',
      `Circle(r=${radius}).area()    ->  ${circle.toFixed(2)}`,
      `Square(s=${side}).area()    ->  ${square.toFixed(2)}`,
      `Triangle(${base}, ${height}).area() ->  ${triangle.toFixed(2)}`,
    ]);
  };

  const polymorphismCode = [
    'class Dog:',
    '    def speak(self):',
    '        return "Woof!"',
    '',
    'class Cat:',
    '    def speak(self):',
    '        return "Meow!"',
    '',
    'class Cow:',
    '    def speak(self):',
    '        return "Moo!"',
    '',
    '# One loop, many different objects',
    'for animal in [Dog(), Cat(), Cow()]:',
    '    print(animal.speak())',
    '',
    '# Output:',
    '# Woof!',
    '# Meow!',
    '# Moo!'
  ];

  const polymorphismSteps = [
    {
      label: 'Same Method Name',
      desc: 'Every animal class defines its own speak method',
      highlight: ['    def speak(self):']
    },
    {
      label: 'Different Behavior',
      desc: 'Each speak returns something different',
      highlight: ['        return "Woof!"', '        return "Meow!"', '        return "Moo!"']
    },
    {
      label: 'One Loop for All',
      desc: 'The loop doesn\'t care what type each animal is',
      highlight: 'for animal in [Dog(), Cat(), Cow()]:'
    },
    {
      label: 'The Magic Call',
      desc: 'animal.speak() runs the right version for each object',
      highlight: '    print(animal.speak())'
    }
  ];

  return (
    <ConceptWrapper
      title="Polymorphism"
      description="Write code that works with many different types through a shared interface — one call, many behaviors."
    >
      <TableOfContents numbered>
        <Section title="What is Polymorphism?">
          <Typography variant="body2" paragraph>
            <strong>Polymorphism</strong> means &quot;many forms.&quot; In OOP it&apos;s the idea that different objects can respond to the <em>same</em> method call in their <em>own</em> way. You call <code>speak()</code> and each object does the right thing for its type.
          </Typography>
          <Typography variant="body2" paragraph>
            This is powerful because your code can work with a whole family of objects without knowing or caring exactly which one it&apos;s holding — it just trusts that they all understand the same method.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Why Use Polymorphism?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>Less branching:</strong> No long if/elif chains checking the type
              </Typography>
              <Typography variant="body2">
                <strong>Easy to extend:</strong> Add a new type and existing code just works
              </Typography>
              <Typography variant="body2">
                <strong>Cleaner code:</strong> One uniform way to treat many different objects
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="One Interface, Many Behaviors">
          <Typography variant="body2" paragraph>
            Here three unrelated classes all define a <code>speak</code> method. A single loop treats them all the same way:
          </Typography>

          <CodePartsExplanation
            code={`for animal in [Dog(), Cat(), Cow()]:
    print(animal.speak())`}
            parts={[
              {
                label: 'Mixed list',
                part: '[Dog(), Cat(), Cow()]',
                color: 'var(--feature)',
                desc: 'Objects of three different types in one list'
              },
              {
                label: 'Uniform call',
                part: 'animal.speak()',
                color: 'var(--success)',
                desc: 'The same call works on every object, no type checks needed'
              }
            ]}
          />

          <ConceptInfoCard>
            <Typography variant="body2" paragraph>
              Step through to see one call produce three different results:
            </Typography>
            <StepThroughCodeAnimation
              code={polymorphismCode}
              steps={polymorphismSteps}
            />
          </ConceptInfoCard>
        </Section>

        <Section title="Try It Yourself: One Call, Many Shapes">
          <Typography variant="body2" paragraph>
            Three different shape classes each define their own <code>area()</code>. Adjust their dimensions, then run a single loop that calls <code>shape.area()</code> on every one — the same call produces a different, correct result for each type.
          </Typography>

          <div className="ds-viz">
            <div className="shape-row" style={{ marginBottom: 16 }}>
              <div className="shape-card">
                <svg width="60" height="60"><circle cx="30" cy="30" r="24" fill="var(--info-bg)" stroke="var(--info)" strokeWidth="2" /></svg>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Circle</Typography>
                <TextField label="radius" type="number" size="small" value={radius} onChange={(e) => setRadius(Number(e.target.value) || 0)} sx={{ width: 110 }} />
              </div>
              <div className="shape-card">
                <svg width="60" height="60"><rect x="8" y="8" width="44" height="44" rx="4" fill="var(--success-bg)" stroke="var(--success)" strokeWidth="2" /></svg>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Square</Typography>
                <TextField label="side" type="number" size="small" value={side} onChange={(e) => setSide(Number(e.target.value) || 0)} sx={{ width: 110 }} />
              </div>
              <div className="shape-card">
                <svg width="60" height="60"><polygon points="30,8 52,52 8,52" fill="var(--warning-bg)" stroke="var(--warning)" strokeWidth="2" /></svg>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>Triangle</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField label="base" type="number" size="small" value={base} onChange={(e) => setBase(Number(e.target.value) || 0)} sx={{ width: 80 }} />
                  <TextField label="height" type="number" size="small" value={height} onChange={(e) => setHeight(Number(e.target.value) || 0)} sx={{ width: 80 }} />
                </Box>
              </div>
            </div>

            <Button variant="contained" onClick={runAreas}>Run: shape.area() on every shape</Button>

            <div className="output-panel" style={{ marginTop: 14 }}>
              {output.length === 0 ? (
                <span className="muted"># Adjust the dimensions and run the loop</span>
              ) : (
                output.map((line, i) => <div key={i}>{line || ' '}</div>)
              )}
            </div>
          </div>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              The loop never checks what type each shape is. It simply trusts that every shape understands <code>area()</code> — that trust is what makes polymorphism so flexible.
            </Typography>
          </Alert>
        </Section>

        <Section title="Duck Typing">
          <Typography variant="body2" paragraph>
            Python takes polymorphism a step further with <strong>duck typing</strong>: &quot;If it walks like a duck and quacks like a duck, it&apos;s a duck.&quot; The objects above didn&apos;t even need a shared parent class — Python only cares that each one <em>has</em> a <code>speak</code> method when it&apos;s called.
          </Typography>

          <CodeSnippet
            language="python"
            lines={[
              { code: 'def make_it_speak(thing):' },
              { code: '    # We never check the type — we just trust it has speak()' },
              { code: '    return thing.speak()' },
              { code: '' },
              { code: 'print(make_it_speak(Dog()))   # Woof!' },
              { code: 'print(make_it_speak(Cat()))   # Meow!' },
              { code: '' },
              { code: 'class Robot:' },
              { code: '    def speak(self):' },
              { code: '        return "Beep boop"' },
              { code: '' },
              { code: 'print(make_it_speak(Robot()))  # Beep boop — works too!' }
            ]}
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              A brand-new <code>Robot</code> class slots right in without changing <code>make_it_speak</code> at all. That&apos;s the real payoff of polymorphism.
            </Typography>
          </Alert>
        </Section>

        <Section title="Polymorphism with Inheritance">
          <Typography variant="body2" paragraph>
            Polymorphism often pairs with inheritance: a parent defines a method and each child <em>overrides</em> it. Code written against the parent type automatically gets each child&apos;s behavior.
          </Typography>

          <CodeSnippet
            language="python"
            lines={[
              { code: 'class Shape:' },
              { code: '    def area(self):' },
              { code: '        return 0' },
              { code: '' },
              { code: 'class Circle(Shape):' },
              { code: '    def __init__(self, r):' },
              { code: '        self.r = r' },
              { code: '    def area(self):' },
              { code: '        return 3.14159 * self.r ** 2' },
              { code: '' },
              { code: 'class Square(Shape):' },
              { code: '    def __init__(self, side):' },
              { code: '        self.side = side' },
              { code: '    def area(self):' },
              { code: '        return self.side ** 2' },
              { code: '' },
              { code: 'shapes = [Circle(2), Square(3)]' },
              { code: 'for s in shapes:' },
              { code: '    print(s.area())   # 12.566... then 9' }
            ]}
          />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
