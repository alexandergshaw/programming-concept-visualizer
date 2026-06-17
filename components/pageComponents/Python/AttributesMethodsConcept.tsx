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

export default function AttributesMethodsConcept() {
  const methodCode = [
    'class BankAccount:',
    '    def __init__(self, owner, balance=0):',
    '        self.owner = owner',
    '        self.balance = balance',
    '',
    '    def deposit(self, amount):',
    '        self.balance += amount',
    '        return self.balance',
    '',
    '    def describe(self):',
    '        return f"{self.owner} has ${self.balance}"',
    '',
    'account = BankAccount("Alice", 100)',
    'account.deposit(50)',
    'print(account.describe())   # Alice has $150'
  ];

  const methodSteps = [
    {
      label: 'Set Up Attributes',
      desc: 'The constructor stores owner and balance on the object',
      highlight: ['        self.owner = owner', '        self.balance = balance']
    },
    {
      label: 'Define a Method',
      desc: 'deposit is a behavior the object can perform',
      highlight: '    def deposit(self, amount):'
    },
    {
      label: 'Change the Data',
      desc: 'The method updates the object\'s own balance attribute',
      highlight: '        self.balance += amount'
    },
    {
      label: 'Another Method',
      desc: 'describe reads the attributes and builds a sentence',
      highlight: '        return f"{self.owner} has ${self.balance}"'
    },
    {
      label: 'Create the Object',
      desc: 'Start Alice off with a balance of 100',
      highlight: 'account = BankAccount("Alice", 100)'
    },
    {
      label: 'Call a Method',
      desc: 'Calling deposit changes the object and adds 50',
      highlight: 'account.deposit(50)'
    },
    {
      label: 'See the Result',
      desc: 'The balance is now 150',
      highlight: 'print(account.describe())   # Alice has $150'
    }
  ];

  return (
    <ConceptWrapper
      title="Attributes & Methods"
      description="Objects hold data in attributes and perform actions through methods. Learn how the constructor wires them together."
    >
      <TableOfContents numbered>
        <Section title="Attributes: An Object's Data">
          <Typography variant="body2" paragraph>
            <strong>Attributes</strong> are the variables that belong to an object. They store the object&apos;s state — the facts that make one object different from another. A dog&apos;s <code>name</code> and <code>breed</code> are attributes.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Two Kinds of Attributes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>Instance attributes</strong> belong to one specific object. Each object gets its own copy. Defined with <code>self.x = ...</code> inside a method.
              </Typography>
              <Typography variant="body2">
                <strong>Class attributes</strong> are shared by every object of the class. Defined directly inside the class body, outside any method.
              </Typography>
            </Box>
          </ConceptInfoCard>

          <CodeSnippet
            language="python"
            lines={[
              { code: 'class Dog:' },
              { code: '    species = "Canis familiaris"   # class attribute (shared)' },
              { code: '' },
              { code: '    def __init__(self, name):' },
              { code: '        self.name = name           # instance attribute (per object)' },
              { code: '' },
              { code: 'a = Dog("Buddy")' },
              { code: 'b = Dog("Rex")' },
              { code: 'print(a.name, b.name)       # Buddy Rex   (different)' },
              { code: 'print(a.species, b.species) # same value for both' }
            ]}
          />
        </Section>

        <Section title="The Constructor: __init__">
          <Typography variant="body2" paragraph>
            The <code>__init__</code> method is the <strong>constructor</strong>. Python calls it automatically every time you create a new object, which makes it the perfect place to set up the object&apos;s starting attributes.
          </Typography>

          <CodePartsExplanation
            code={`class Person:
    def __init__(self, name, age=0):
        self.name = name
        self.age = age

p = Person("Sam", 30)`}
            parts={[
              {
                label: '__init__',
                part: '__init__',
                color: '#9333ea',
                desc: 'The constructor — runs automatically when the object is created'
              },
              {
                label: 'Parameters',
                part: 'self, name, age=0',
                color: '#dc2626',
                desc: 'Values the constructor receives. age has a default of 0'
              },
              {
                label: 'Assigning attributes',
                part: 'self.name = name',
                color: '#059669',
                desc: 'Copies the incoming value onto the object so it persists'
              },
              {
                label: 'Creating the object',
                part: 'p = Person("Sam", 30)',
                color: '#2563eb',
                desc: 'These arguments are passed straight into __init__'
              }
            ]}
          />
        </Section>

        <Section title="Methods: An Object's Behavior">
          <Typography variant="body2" paragraph>
            <strong>Methods</strong> are functions defined inside a class. They describe what an object can <em>do</em>, and they can read or change the object&apos;s attributes through <code>self</code>.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="body2" paragraph>
              Here a <code>BankAccount</code> stores data in attributes and exposes behavior through methods. Step through to watch the balance change:
            </Typography>
            <StepThroughCodeAnimation
              code={methodCode}
              steps={methodSteps}
            />
          </ConceptInfoCard>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              The difference between a function and a method is simply <em>where</em> it lives: a method is defined inside a class and almost always takes <code>self</code> as its first parameter.
            </Typography>
          </Alert>
        </Section>

        <Section title="Dunder Methods (a Quick Peek)">
          <Typography variant="body2" paragraph>
            Methods with double underscores on each side — like <code>__init__</code> — are called <strong>dunder</strong> (&quot;double underscore&quot;) methods. Python calls them automatically in special situations. One handy example is <code>__str__</code>, which controls what <code>print()</code> shows.
          </Typography>

          <CodeSnippet
            language="python"
            lines={[
              { code: 'class Point:' },
              { code: '    def __init__(self, x, y):' },
              { code: '        self.x = x' },
              { code: '        self.y = y' },
              { code: '' },
              { code: '    def __str__(self):' },
              { code: '        return f"Point({self.x}, {self.y})"' },
              { code: '' },
              { code: 'p = Point(2, 3)' },
              { code: 'print(p)   # Point(2, 3)   instead of a messy memory address' }
            ]}
          />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
