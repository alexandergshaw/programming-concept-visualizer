'use client';

import { useState, useEffect } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface PreviewState {
  highlight?: boolean;
  color?: string;
  visible?: boolean;
  content?: string;
  active?: boolean;
  clickCount?: number;
  hasPointer?: boolean;
  title?: string;
}

export default function JQuerySelectorsAndChainingConcept() {
  const [selectorInput, setSelectorInput] = useState('');
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [chainedElement, setChainedElement] = useState<{
    text: string;
    classes: string[];
    isVisible: boolean;
    color: string;
    fontSize: string;
    animation: string;
  }>({
    text: 'Interactive Element',
    classes: ['demo-element'],
    isVisible: true,
    color: '#333',
    fontSize: '16px',
    animation: 'none'
  });

  // Track current step for each example
  const [stylingStep, setStylingStep] = useState(0);
  const [contentStep, setContentStep] = useState(0);
  const [eventStep, setEventStep] = useState(0);

  // State for styling example based on current step
  const [stylingExample, setStylingExample] = useState({
    isHighlighted: false,
    color: 'inherit',
    isVisible: true
  });

  // State for content example based on current step
  const [contentExample, setContentExample] = useState({
    content: 'Click to update content',
    isActive: false,
    isVisible: true
  });

  // State for event example based on current step
  const [eventExample, setEventExample] = useState({
    clickCount: 0,
    hasPointer: false,
    title: ''
  });

  // Step-through data for each example
  const stylingCode = [
    '$(\'.card\')',
    '  .addClass(\'highlight\')',
    '  .css(\'color\', \'blue\')',
    '  .slideDown();'
  ];

  const stylingSteps = [
    {
      label: 'Select Element',
      desc: 'Selects elements with class "card"',
      highlight: '$(\'.card\')'
    },
    {
      label: 'Add Class',
      desc: 'Adds yellow highlight background',
      highlight: '.addClass(\'highlight\')'
    },
    {
      label: 'Change Color',
      desc: 'Changes text color to blue',
      highlight: '.css(\'color\', \'blue\')'
    },
    {
      label: 'Animate',
      desc: 'Animates the element sliding down',
      highlight: '.slideDown()'
    }
  ];

  const contentCode = [
    '$(\'.message\')',
    '  .html(\'<strong>Hello!</strong>\')',
    '  .addClass(\'active\')',
    '  .fadeIn();'
  ];

  const contentSteps = [
    {
      label: 'Select Element',
      desc: 'Selects elements with class "message"',
      highlight: '$(\'.message\')'
    },
    {
      label: 'Update Content',
      desc: 'Updates the HTML content with bold text',
      highlight: '.html(\'<strong>Hello!</strong>\')'
    },
    {
      label: 'Add Class',
      desc: 'Adds active class for styling',
      highlight: '.addClass(\'active\')'
    },
    {
      label: 'Fade In',
      desc: 'Fades in the element',
      highlight: '.fadeIn()'
    }
  ];

  const eventCode = [
    '$(\'.button\')',
    '  .on(\'click\', function() {',
    '    console.log(\'Clicked!\');',
    '  })',
    '  .css(\'cursor\', \'pointer\')',
    '  .attr(\'title\', \'Click me!\');'
  ];

  const eventSteps = [
    {
      label: 'Select Element',
      desc: 'Selects elements with class "button"',
      highlight: '$(\'.button\')'
    },
    {
      label: 'Add Click Handler',
      desc: 'Attaches click event handler',
      highlight: ['.on(\'click\'', 'console.log(\'Clicked!\');']
    },
    {
      label: 'Change Cursor',
      desc: 'Changes cursor to pointer on hover',
      highlight: '.css(\'cursor\', \'pointer\')'
    },
    {
      label: 'Add Tooltip',
      desc: 'Adds tooltip text',
      highlight: '.attr(\'title\', \'Click me!\')'
    }
  ];

  // Simulated jQuery selector function
  const simulateSelector = (selector: string) => {
    const elements: string[] = [];
    const sampleDOM = {
      header: { id: 'header', classes: ['section'], content: 'Welcome Header' },
      nav: { id: 'nav', classes: ['navigation'], content: 'Navigation Menu' },
      items: [
        { classes: ['item', 'active'], content: 'First Item' },
        { classes: ['item'], content: 'Second Item' },
        { classes: ['item', 'disabled'], content: 'Third Item' }
      ],
      paragraphs: [
        { classes: ['text', 'intro'], content: 'Introduction text' },
        { classes: ['text'], content: 'Regular paragraph' }
      ]
    };
    
    try {
      // Basic selector parsing
      if (selector.startsWith('#')) {
        // ID selector
        const id = selector.slice(1);
        if (sampleDOM.header.id === id) {
          elements.push(`<div id="${id}" class="${sampleDOM.header.classes.join(' ')}">${sampleDOM.header.content}</div>`);
        }
        if (sampleDOM.nav.id === id) {
          elements.push(`<div id="${id}" class="${sampleDOM.nav.classes.join(' ')}">${sampleDOM.nav.content}</div>`);
        }
      } else if (selector.startsWith('.')) {
        // Class selector
        const className = selector.slice(1);
        // Check items
        sampleDOM.items.forEach(item => {
          if (item.classes.includes(className)) {
            elements.push(`<li class="${item.classes.join(' ')}">${item.content}</li>`);
          }
        });
        // Check paragraphs
        sampleDOM.paragraphs.forEach(p => {
          if (p.classes.includes(className)) {
            elements.push(`<p class="${p.classes.join(' ')}">${p.content}</p>`);
          }
        });
      } else if (selector.includes('.')) {
        // Combined selector (e.g., "li.active")
        const [tag, className] = selector.split('.');
        if (tag === 'li') {
          sampleDOM.items.forEach(item => {
            if (item.classes.includes(className)) {
              elements.push(`<li class="${item.classes.join(' ')}">${item.content}</li>`);
            }
          });
        }
      } else {
        // Element selector
        if (selector === 'p') {
          sampleDOM.paragraphs.forEach(p => {
            elements.push(`<p class="${p.classes.join(' ')}">${p.content}</p>`);
          });
        }
        if (selector === 'li') {
          sampleDOM.items.forEach(item => {
            elements.push(`<li class="${item.classes.join(' ')}">${item.content}</li>`);
          });
        }
      }
    } catch (error) {
      console.error('Selector parsing error:', error);
    }

    setSelectedElements(elements);
  };

  const handleSelectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectorInput(e.target.value);
    simulateSelector(e.target.value);
  };

  // Method chaining handlers
  const handleAddClass = (className: string) => {
    setChainedElement(prev => ({
      ...prev,
      classes: [...prev.classes.filter(c => c !== className), className]
    }));
  };

  const handleRemoveClass = (className: string) => {
    setChainedElement(prev => ({
      ...prev,
      classes: prev.classes.filter(c => c !== className)
    }));
  };

  const handleChangeText = () => {
    setChainedElement(prev => ({
      ...prev,
      text: prev.text === 'Interactive Element' ? 'Text Changed!' : 'Interactive Element'
    }));
  };

  const handleToggleVisibility = () => {
    setChainedElement(prev => ({
      ...prev,
      isVisible: !prev.isVisible
    }));
  };

  const handleChangeColor = () => {
    const colors = ['#333', '#007bff', '#28a745', '#dc3545'];
    setChainedElement(prev => ({
      ...prev,
      color: colors[(colors.indexOf(prev.color) + 1) % colors.length]
    }));
  };

  const handleChangeFontSize = () => {
    const sizes = ['16px', '20px', '24px', '28px'];
    setChainedElement(prev => ({
      ...prev,
      fontSize: sizes[(sizes.indexOf(prev.fontSize) + 1) % sizes.length]
    }));
  };

  const handleAnimate = () => {
    const animations = ['none', 'fadeOut', 'slideUp', 'bounce'];
    setChainedElement(prev => ({
      ...prev,
      animation: animations[(animations.indexOf(prev.animation) + 1) % animations.length]
    }));
  };

  // Update styling example based on current step
  useEffect(() => {
    switch (stylingStep) {
      case 0: // Initial selection
        setStylingExample({
          isHighlighted: false,
          color: 'inherit',
          isVisible: true
        });
        break;
      case 1: // addClass('highlight')
        setStylingExample(prev => ({
          ...prev,
          isHighlighted: true
        }));
        break;
      case 2: // css('color', 'blue')
        setStylingExample(prev => ({
          ...prev,
          color: 'blue'
        }));
        break;
      case 3: // slideDown()
        setStylingExample(prev => ({
          ...prev,
          isVisible: false
        }));
        break;
    }
  }, [stylingStep]);

  // Update content example based on current step
  useEffect(() => {
    switch (contentStep) {
      case 0: // Initial selection
        setContentExample({
          content: 'Click to update content',
          isActive: false,
          isVisible: false
        });
        break;
      case 1: // html('<strong>Hello!</strong>')
        setContentExample(prev => ({
          ...prev,
          content: '<strong>Hello!</strong>'
        }));
        break;
      case 2: // addClass('active')
        setContentExample(prev => ({
          ...prev,
          isActive: true
        }));
        break;
      case 3: // fadeIn()
        setContentExample(prev => ({
          ...prev,
          isVisible: true
        }));
        break;
    }
  }, [contentStep]);

  // Update event example based on current step
  useEffect(() => {
    switch (eventStep) {
      case 0: // Initial selection
        setEventExample({
          clickCount: 0,
          hasPointer: false,
          title: ''
        });
        break;
      case 1: // on('click')
        // Just attach the click handler, no visual change
        break;
      case 2: // css('cursor', 'pointer')
        setEventExample(prev => ({
          ...prev,
          hasPointer: true
        }));
        break;
      case 3: // attr('title', 'Click me!')
        setEventExample(prev => ({
          ...prev,
          title: 'Click me!'
        }));
        break;
    }
  }, [eventStep]);

  return (
    <ConceptWrapper
      title="jQuery Selectors and Method Chaining"
      description="Learn how to select elements and chain methods together in jQuery."
    >
      <TableOfContents numbered>
        <Section title="jQuery Selectors">
          <Typography variant="body2" paragraph>
            jQuery makes it super easy to find and work with elements on your webpage. Try out different selectors below:
          </Typography>

          <ConceptInfoCard>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">Interactive Selector Tester</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Enter a selector:</Typography>
                    <TextField
                      fullWidth
                      value={selectorInput}
                      onChange={handleSelectorChange}
                      placeholder="Try: .item, #header, p, li.active"
                      size="small"
                    />
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" gutterBottom>Selected Elements</Typography>
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 2, 
                        bgcolor: 'grey.50',
                        minHeight: '100px',
                        fontFamily: 'monospace',
                        fontSize: '0.875rem'
                      }}
                    >
                      {selectedElements.length > 0 ? (
                        <Box component="ul" sx={{ m: 0, pl: 2, '& > li': { mb: 1 } }}>
                          {selectedElements.map((element, index) => (
                            <li key={index}>{element}</li>
                          ))}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                          No elements selected
                        </Typography>
                      )}
                    </Paper>
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="medium">Sample DOM Structure</Typography>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 2, 
                    bgcolor: 'grey.50',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                    '& > p': { mb: 0.5 }
                  }}
                >
                  <Typography component="p" variant="body2">&lt;div id="header" class="section"&gt;Welcome Header&lt;/div&gt;</Typography>
                  <Typography component="p" variant="body2">&lt;div id="nav" class="navigation"&gt;Navigation Menu&lt;/div&gt;</Typography>
                  <Typography component="p" variant="body2">&lt;ul&gt;</Typography>
                  <Typography component="p" variant="body2" sx={{ pl: 2 }}>&lt;li class="item active"&gt;First Item&lt;/li&gt;</Typography>
                  <Typography component="p" variant="body2" sx={{ pl: 2 }}>&lt;li class="item"&gt;Second Item&lt;/li&gt;</Typography>
                  <Typography component="p" variant="body2" sx={{ pl: 2 }}>&lt;li class="item disabled"&gt;Third Item&lt;/li&gt;</Typography>
                  <Typography component="p" variant="body2">&lt;/ul&gt;</Typography>
                  <Typography component="p" variant="body2">&lt;p class="text intro"&gt;Introduction text&lt;/p&gt;</Typography>
                  <Typography component="p" variant="body2">&lt;p class="text"&gt;Regular paragraph&lt;/p&gt;</Typography>
                </Paper>
              </Box>
            </Box>
          </ConceptInfoCard>

          <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }} fontWeight="medium">Common Selector Types</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>1. Element Selectors</Typography>
              <CodeSnippet
                lines={[
                  { code: '$(\'p\')        // Finds all <p> elements' },
                  { code: '$(\'div\')      // Finds all <div> elements' },
                  { code: '$(\'button\')   // Finds all <button> elements' }
                ]}
                language="javascript"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>2. ID Selectors</Typography>
              <CodeSnippet
                lines={[
                  { code: '$(\'#myId\')    // Finds the element with id="myId"' },
                  { code: '$(\'#header\')  // Finds the element with id="header"' }
                ]}
                language="javascript"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>3. Class Selectors</Typography>
              <CodeSnippet
                lines={[
                  { code: '$(\'.myClass\')   // Finds all elements with class="myClass"' },
                  { code: '$(\'.btn\')       // Finds all elements with class="btn"' }
                ]}
                language="javascript"
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>4. Combined Selectors</Typography>
              <CodeSnippet
                lines={[
                  { code: '$(\'.btn.primary\')     // Elements with both btn AND primary classes' },
                  { code: '$(\'.card p\')          // <p> elements inside elements with class="card"' },
                  { code: '$(\'.nav > .item\')     // Direct children with class="item" inside class="nav"' }
                ]}
                language="javascript"
              />
            </Box>
          </Box>
        </Section>

        <Section title="Method Chaining">
          <Typography variant="body2" paragraph>
            jQuery lets you run multiple methods one after another - this is called "chaining". 
            Try out these examples to see method chaining in action:
          </Typography>

          <Typography variant="subtitle1" sx={{ mt: 4, mb: 2 }} fontWeight="medium">Common Chaining Examples</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>1. Styling Changes</Typography>
              <ConceptInfoCard>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <StepThroughCodeAnimation
                    code={stylingCode}
                    steps={stylingSteps}
                    onStepChange={setStylingStep}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 2,
                        border: 1,
                        borderColor: theme => stylingExample.isHighlighted ? 'warning.light' : 'grey.300',
                        bgcolor: theme => stylingExample.isHighlighted ? 'warning.50' : 'background.paper',
                        color: stylingExample.color,
                        opacity: stylingExample.isVisible ? 1 : 0,
                        transform: `translateY(${stylingExample.isVisible ? '0' : '20px'})`,
                        transition: 'all 0.5s ease-in-out'
                      }}
                    >
                      <Typography variant="subtitle2">Demo Card</Typography>
                      <Typography>This card will be styled</Typography>
                    </Paper>
                  </Box>
                </Box>
              </ConceptInfoCard>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>2. Content Updates</Typography>
              <ConceptInfoCard>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <StepThroughCodeAnimation
                    code={contentCode}
                    steps={contentSteps}
                    onStepChange={setContentStep}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: 2,
                        border: 1,
                        borderColor: theme => contentExample.isActive ? 'success.light' : 'grey.300',
                        bgcolor: theme => contentExample.isActive ? 'success.50' : 'background.paper',
                        opacity: contentExample.isVisible ? 1 : 0,
                        transform: `scale(${contentExample.isVisible ? 1 : 0.95})`,
                        transition: 'all 0.5s ease-in-out'
                      }}
                      dangerouslySetInnerHTML={{ __html: contentExample.content }}
                    />
                  </Box>
                </Box>
              </ConceptInfoCard>
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>3. Event Handling</Typography>
              <ConceptInfoCard>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <StepThroughCodeAnimation
                    code={eventCode}
                    steps={eventSteps}
                    onStepChange={setEventStep}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Button
                      onClick={() => eventStep >= 1 && setEventExample(prev => ({ ...prev, clickCount: prev.clickCount + 1 }))}
                      variant={eventStep >= 1 ? 'contained' : 'outlined'}
                      color="secondary"
                      sx={{
                        cursor: eventExample.hasPointer ? 'pointer' : 'default',
                        opacity: eventStep > 0 ? 1 : 0.7,
                        transition: 'all 0.3s ease-in-out'
                      }}
                      title={eventExample.title}
                      disabled={eventStep < 1}
                    >
                      Interactive Button
                    </Button>
                    {eventExample.clickCount > 0 && (
                      <Typography variant="body2" color="text.secondary">
                        Click count: {eventExample.clickCount}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </ConceptInfoCard>
            </Box>
          </Box>

          <Paper 
            variant="outlined" 
            sx={{ 
              mt: 4,
              p: 2,
              bgcolor: 'warning.50',
              borderColor: 'warning.main',
              borderLeftWidth: 4
            }}
          >
            <Typography variant="subtitle1" color="warning.dark" sx={{ fontWeight: 600 }}>
              Pro Tip:
            </Typography>
            <Typography variant="body2" color="warning.dark">
              When chaining methods, it's common to put each method on a new line 
              (indented) to make your code easier to read. The dots at the start of each line show that 
              the methods are chained together.
            </Typography>
          </Paper>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
} 