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
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';
import TableOfContents from '@/components/common/TableOfContents';
import '../../../styles/dataStructures.css';

type DogObject = { id: number; name: string; breed: string };

export default function ClassesObjectsConcept() {
  const [dogs, setDogs] = useState<DogObject[]>([]);
  const [dogName, setDogName] = useState('');
  const [dogBreed, setDogBreed] = useState('');
  const [nextDogId, setNextDogId] = useState(1);
  const [barkLog, setBarkLog] = useState<string[]>([]);

  const createDog = () => {
    const name = dogName.trim() || 'Buddy';
    const breed = dogBreed.trim() || 'Mixed';
    setDogs((prev) => [...prev, { id: nextDogId, name, breed }]);
    setNextDogId((n) => n + 1);
    setDogName('');
    setDogBreed('');
  };

  const bark = (d: DogObject) => {
    setBarkLog((prev) => [...prev, `${d.name}.bark()  ->  "${d.name} says Woof!"`].slice(-6));
  };

  const clearAll = () => {
    setDogs([]);
    setBarkLog([]);
  };

  const classDefinitionCode = [
    'class Dog:',
    '    def __init__(self, name, breed):',
    '        self.name = name',
    '        self.breed = breed',
    '',
    '# Create two objects (instances) of the Dog class',
    'buddy = Dog("Buddy", "Golden Retriever")',
    'rex = Dog("Rex", "German Shepherd")',
    '',
    'print(buddy.name)   # Buddy',
    'print(rex.breed)    # German Shepherd'
  ];

  const classDefinitionSteps = [
    {
      label: 'Define the Class',
      desc: 'Use the "class" keyword to create a blueprint named Dog',
      highlight: 'class Dog:'
    },
    {
      label: 'The Constructor',
      desc: '__init__ runs automatically whenever a new Dog is created',
      highlight: '    def __init__(self, name, breed):'
    },
    {
      label: 'Store the Data',
      desc: 'Save the name and breed onto this specific object using self',
      highlight: ['        self.name = name', '        self.breed = breed']
    },
    {
      label: 'Create an Object',
      desc: 'Calling Dog(...) builds a real dog from the blueprint',
      highlight: 'buddy = Dog("Buddy", "Golden Retriever")'
    },
    {
      label: 'Make Another One',
      desc: 'Each object is independent and has its own data',
      highlight: 'rex = Dog("Rex", "German Shepherd")'
    },
    {
      label: 'Use the Objects',
      desc: 'Access each object\'s data with dot notation',
      highlight: ['print(buddy.name)   # Buddy', 'print(rex.breed)    # German Shepherd']
    }
  ];

  return (
    <ConceptWrapper
      title="Classes & Objects"
      description="Learn the building blocks of Object-Oriented Programming: classes (blueprints) and objects (the things built from them)."
    >
      <TableOfContents numbered>
        <Section title="What is Object-Oriented Programming?">
          <Typography variant="body2" paragraph>
            Object-Oriented Programming (OOP) is a way of organizing your code around <strong>objects</strong> instead of just functions and variables. An object bundles together <em>data</em> (what something is) and <em>behavior</em> (what it can do) into a single, self-contained unit.
          </Typography>
          <Typography variant="body2" paragraph>
            It mirrors how we think about the real world. A car has properties (color, speed) and actions (drive, brake). A bank account has a balance and can be deposited into or withdrawn from. OOP lets you model these things directly in code.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Why Use OOP?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>Organization:</strong> Group related data and behavior together
              </Typography>
              <Typography variant="body2">
                <strong>Reusability:</strong> Define a blueprint once, create many objects from it
              </Typography>
              <Typography variant="body2">
                <strong>Maintainability:</strong> Change behavior in one place and every object benefits
              </Typography>
              <Typography variant="body2">
                <strong>Real-world modeling:</strong> Code that maps cleanly onto how we think about problems
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Classes vs. Objects">
          <Typography variant="body2" paragraph>
            These two words are at the heart of OOP, and it&apos;s important to keep them straight:
          </Typography>

          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>A Class is a blueprint.</strong> It describes <em>what</em> something will look like and <em>what</em> it can do, but it isn&apos;t the thing itself. Think of the architectural plan for a house.
              </Typography>
              <Typography variant="body2">
                <strong>An Object is a real thing built from that blueprint.</strong> It&apos;s a concrete instance with its own actual data. From one house plan you can build many houses, each painted a different color.
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              You write the class <strong>once</strong>. You can then create as many objects (also called <strong>instances</strong>) from it as you need.
            </Typography>
          </Alert>
        </Section>

        <Section title="Defining a Class and Creating Objects">
          <Typography variant="body2" paragraph>
            Let&apos;s define a <code>Dog</code> class and use it to create some actual dogs. Hover over each labeled part to see what it does.
          </Typography>

          <CodePartsExplanation
            code={`class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

buddy = Dog("Buddy", "Golden Retriever")
print(buddy.name)`}
            parts={[
              {
                label: 'class keyword',
                part: 'class Dog:',
                color: '#9333ea',
                desc: 'Declares a new class (blueprint) named Dog'
              },
              {
                label: 'Constructor',
                part: 'def __init__(self, name, breed):',
                color: '#dc2626',
                desc: 'A special method that runs when a new object is created'
              },
              {
                label: 'self',
                part: 'self',
                color: '#2563eb',
                desc: 'Refers to the specific object being created or used'
              },
              {
                label: 'Creating an object',
                part: 'buddy = Dog("Buddy", "Golden Retriever")',
                color: '#059669',
                desc: 'Builds a real Dog object and stores it in the variable buddy'
              }
            ]}
          />

          <ConceptInfoCard>
            <Typography variant="body2" paragraph>
              Step through the full example to see how one class produces multiple independent objects:
            </Typography>
            <StepThroughCodeAnimation
              code={classDefinitionCode}
              steps={classDefinitionSteps}
            />
          </ConceptInfoCard>
        </Section>

        <Section title="Try It Yourself: An Object Factory">
          <Typography variant="body2" paragraph>
            The <code>Dog</code> class is the blueprint. Fill in a name and breed, then create as many <code>Dog</code> objects as you like. Each one is an independent instance with its own data — and each can run the same <code>bark()</code> method.
          </Typography>

          <div className="ds-viz">
            <div className="ds-controls">
              <TextField
                label="name"
                size="small"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') createDog(); }}
                sx={{ width: 160 }}
              />
              <TextField
                label="breed"
                size="small"
                value={dogBreed}
                onChange={(e) => setDogBreed(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') createDog(); }}
                sx={{ width: 180 }}
              />
              <Button variant="contained" onClick={createDog}>Create Dog object</Button>
              <Button variant="text" color="secondary" onClick={clearAll} disabled={dogs.length === 0}>Clear</Button>
            </div>

            {dogs.length === 0 ? (
              <Typography variant="body2" sx={{ color: '#94a3b8', fontStyle: 'italic' }}>
                No objects yet. Create one from the Dog blueprint above.
              </Typography>
            ) : (
              <div className="obj-grid">
                {dogs.map((d) => (
                  <div className="obj-card" key={d.id}>
                    <div className="obj-card-title">Dog instance</div>
                    <div className="obj-attr"><span className="obj-key">name</span> = &quot;{d.name}&quot;</div>
                    <div className="obj-attr"><span className="obj-key">breed</span> = &quot;{d.breed}&quot;</div>
                    <Button size="small" variant="outlined" sx={{ mt: 1 }} onClick={() => bark(d)}>
                      call bark()
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="output-panel">
              {barkLog.length === 0 ? (
                <span className="muted"># Output of bark() calls will appear here</span>
              ) : (
                barkLog.map((line, i) => (
                  <div key={i}><span className="out-prompt">&gt;&gt;&gt; </span>{line}</div>
                ))
              )}
            </div>
          </div>

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Notice that every object shares the same blueprint and the same <code>bark()</code> behavior, yet each keeps its own separate <code>name</code> and <code>breed</code>.
            </Typography>
          </Alert>
        </Section>

        <Section title="The self Parameter">
          <Typography variant="body2" paragraph>
            You&apos;ll see <code>self</code> everywhere in Python classes. It always refers to <em>the particular object</em> that a method is working on. When you write <code>buddy.name</code>, Python passes <code>buddy</code> in as <code>self</code> behind the scenes.
          </Typography>

          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="body2">
                <strong>self.name</strong> means &quot;the name belonging to <em>this</em> object&quot;
              </Typography>
              <Typography variant="body2">
                Two different dogs each have their own <strong>self.name</strong>, so they never get mixed up
              </Typography>
              <Typography variant="body2">
                Python fills in <strong>self</strong> automatically — you never pass it in yourself when calling a method
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Forgetting <code>self</code> as the first parameter of a method is one of the most common beginner mistakes. Every instance method needs it.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
