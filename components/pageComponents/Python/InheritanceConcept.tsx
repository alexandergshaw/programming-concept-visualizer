'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import CodePartsExplanation from '../../common/CodePartsExplanation';
import CodeSnippet from '../../common/CodeSnippet';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';
import TableOfContents from '@/components/common/TableOfContents';

export default function InheritanceConcept() {
  const inheritanceCode = [
    'class Animal:',
    '    def __init__(self, name):',
    '        self.name = name',
    '',
    '    def speak(self):',
    '        return "Some generic sound"',
    '',
    'class Dog(Animal):',
    '    def speak(self):',
    '        return "Woof!"',
    '',
    'class Cat(Animal):',
    '    def speak(self):',
    '        return "Meow!"',
    '',
    'd = Dog("Buddy")',
    'print(d.name)      # Buddy   (inherited from Animal)',
    'print(d.speak())   # Woof!   (overridden in Dog)'
  ];

  const inheritanceSteps = [
    {
      label: 'The Parent Class',
      desc: 'Animal defines what every animal has and does',
      highlight: 'class Animal:'
    },
    {
      label: 'Shared Behavior',
      desc: 'speak provides a default that children can reuse or replace',
      highlight: '        return "Some generic sound"'
    },
    {
      label: 'A Child Class',
      desc: 'Dog(Animal) means Dog inherits everything from Animal',
      highlight: 'class Dog(Animal):'
    },
    {
      label: 'Override a Method',
      desc: 'Dog provides its own version of speak',
      highlight: ['class Dog(Animal):', '        return "Woof!"']
    },
    {
      label: 'Another Child',
      desc: 'Cat also inherits from Animal but speaks differently',
      highlight: ['class Cat(Animal):', '        return "Meow!"']
    },
    {
      label: 'Inherited Attribute',
      desc: 'Dog never defined __init__, so it uses Animal\'s — name still works',
      highlight: 'print(d.name)      # Buddy   (inherited from Animal)'
    },
    {
      label: 'Overridden Method',
      desc: 'Calling speak on a Dog uses Dog\'s version',
      highlight: 'print(d.speak())   # Woof!   (overridden in Dog)'
    }
  ];

  return (
    <ConceptWrapper
      title="Inheritance"
      description="Build new classes on top of existing ones so child classes reuse and extend a parent's behavior."
    >
      <TableOfContents numbered>
        <Section title="What is Inheritance?">
          <Typography variant="body2" paragraph>
            <strong>Inheritance</strong> lets one class take on the attributes and methods of another. The class being inherited from is the <strong>parent</strong> (or base/super) class, and the class doing the inheriting is the <strong>child</strong> (or derived/sub) class.
          </Typography>
          <Typography variant="body2" paragraph>
            It models an &quot;is-a&quot; relationship: a Dog <em>is an</em> Animal, a SavingsAccount <em>is a</em> BankAccount. The child automatically gets everything the parent has, so you don&apos;t repeat shared code.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Why Use Inheritance?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>♻️ Avoid repetition:</strong> Write shared behavior once in the parent
              </Typography>
              <Typography variant="body2">
                <strong>🌳 Model hierarchies:</strong> Express natural &quot;is-a&quot; relationships
              </Typography>
              <Typography variant="body2">
                <strong>🔧 Extend safely:</strong> Add or change behavior in a child without touching the parent
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Creating a Child Class">
          <Typography variant="body2" paragraph>
            To inherit, put the parent class name in parentheses after the child class name. Hover the parts below:
          </Typography>

          <CodePartsExplanation
            code={`class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return "Woof!"`}
            parts={[
              {
                label: 'Parent class',
                part: 'class Animal:',
                color: '#9333ea',
                desc: 'The base class that holds shared behavior'
              },
              {
                label: 'Inheriting',
                part: 'class Dog(Animal):',
                color: '#059669',
                desc: 'Dog inherits everything from Animal by naming it in parentheses'
              },
              {
                label: 'Overriding',
                part: 'return "Woof!"',
                color: '#dc2626',
                desc: 'Dog replaces the inherited speak with its own version'
              }
            ]}
          />

          <ConceptInfoCard>
            <Typography variant="body2" paragraph>
              Step through to see what gets inherited and what gets overridden:
            </Typography>
            <StepThroughCodeAnimation
              code={inheritanceCode}
              steps={inheritanceSteps}
            />
          </ConceptInfoCard>
        </Section>

        <Section title="Extending the Parent with super()">
          <Typography variant="body2" paragraph>
            Sometimes a child wants to <em>add to</em> the parent&apos;s work rather than replace it entirely. The <code>super()</code> function calls the parent&apos;s version of a method — most often the constructor.
          </Typography>

          <CodeSnippet
            language="python"
            lines={[
              { code: 'class Animal:' },
              { code: '    def __init__(self, name):' },
              { code: '        self.name = name' },
              { code: '' },
              { code: 'class Dog(Animal):' },
              { code: '    def __init__(self, name, breed):' },
              { code: '        super().__init__(name)   # let Animal set up name' },
              { code: '        self.breed = breed       # then add Dog-specific data' },
              { code: '' },
              { code: 'd = Dog("Buddy", "Beagle")' },
              { code: 'print(d.name, d.breed)   # Buddy Beagle' }
            ]}
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <code>super().__init__(...)</code> reuses the parent&apos;s setup so you don&apos;t copy/paste it. The child then layers on whatever extra attributes it needs.
            </Typography>
          </Alert>
        </Section>

        <Section title="Checking Types: isinstance">
          <Typography variant="body2" paragraph>
            Because a child &quot;is a&quot; kind of its parent, Python recognizes it as both types. <code>isinstance</code> lets you check this at runtime.
          </Typography>

          <CodeSnippet
            language="python"
            lines={[
              { code: 'd = Dog("Buddy", "Beagle")' },
              { code: '' },
              { code: 'print(isinstance(d, Dog))      # True' },
              { code: 'print(isinstance(d, Animal))   # True  (a Dog is also an Animal)' },
              { code: 'print(isinstance(d, Cat))      # False' }
            ]}
          />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
