'use client';

import { useState, useEffect } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';

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
          <p className="mb-4">
            jQuery makes it super easy to find and work with elements on your webpage. Try out different selectors below:
          </p>

          <ConceptInfoCard>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Interactive Selector Tester:</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Enter a selector:</label>
                    <input
                      type="text"
                      value={selectorInput}
                      onChange={handleSelectorChange}
                      placeholder="Try: .item, #header, p, li.active"
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Selected Elements:</h5>
                    <div className="bg-gray-100 p-3 rounded min-h-[100px]">
                      {selectedElements.length > 0 ? (
                        <ul className="space-y-2">
                          {selectedElements.map((element, index) => (
                            <li key={index} className="font-mono text-sm">
                              {element}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">No elements selected</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Sample DOM Structure:</h4>
                <div className="space-y-2 font-mono text-sm bg-gray-100 p-3 rounded">
                  <p>&lt;div id="header" class="section"&gt;Welcome Header&lt;/div&gt;</p>
                  <p>&lt;div id="nav" class="navigation"&gt;Navigation Menu&lt;/div&gt;</p>
                  <p>&lt;ul&gt;</p>
                  <p>&nbsp;&nbsp;&lt;li class="item active"&gt;First Item&lt;/li&gt;</p>
                  <p>&nbsp;&nbsp;&lt;li class="item"&gt;Second Item&lt;/li&gt;</p>
                  <p>&nbsp;&nbsp;&lt;li class="item disabled"&gt;Third Item&lt;/li&gt;</p>
                  <p>&lt;/ul&gt;</p>
                  <p>&lt;p class="text intro"&gt;Introduction text&lt;/p&gt;</p>
                  <p>&lt;p class="text"&gt;Regular paragraph&lt;/p&gt;</p>
                </div>
              </div>
            </div>
          </ConceptInfoCard>

          <h3 className="text-xl font-semibold mt-6">Common Selector Types</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">1. Element Selectors</h4>
              <CodeSnippet
                lines={[
                  { code: '$(\'p\')        // Finds all <p> elements' },
                  { code: '$(\'div\')      // Finds all <div> elements' },
                  { code: '$(\'button\')   // Finds all <button> elements' }
                ]}
                language="javascript"
              />
            </div>

            <div>
              <h4 className="font-semibold">2. ID Selectors</h4>
              <CodeSnippet
                lines={[
                  { code: '$(\'#myId\')    // Finds the element with id="myId"' },
                  { code: '$(\'#header\')  // Finds the element with id="header"' }
                ]}
                language="javascript"
              />
            </div>

            <div>
              <h4 className="font-semibold">3. Class Selectors</h4>
              <CodeSnippet
                lines={[
                  { code: '$(\'.myClass\')   // Finds all elements with class="myClass"' },
                  { code: '$(\'.btn\')       // Finds all elements with class="btn"' }
                ]}
                language="javascript"
              />
            </div>

            <div>
              <h4 className="font-semibold">4. Combined Selectors</h4>
              <CodeSnippet
                lines={[
                  { code: '$(\'.btn.primary\')     // Elements with both btn AND primary classes' },
                  { code: '$(\'.card p\')          // <p> elements inside elements with class="card"' },
                  { code: '$(\'.nav > .item\')     // Direct children with class="item" inside class="nav"' }
                ]}
                language="javascript"
              />
            </div>
          </div>
        </Section>

        <Section title="Method Chaining">
          <p className="mb-4">
            jQuery lets you run multiple methods one after another - this is called "chaining". 
            Try out these examples to see method chaining in action:
          </p>

          <h3 className="text-xl font-semibold mt-6">Common Chaining Examples</h3>
          <div className="space-y-8">
            <div>
              <h4 className="font-semibold">1. Styling Changes</h4>
              <ConceptInfoCard>
                <div className="space-y-6">
                  <StepThroughCodeAnimation
                    code={stylingCode}
                    steps={stylingSteps}
                    onStepChange={setStylingStep}
                  />
                  <div className="flex items-center justify-center">
                    <div 
                      className={`p-4 border rounded transition-all duration-500 ${
                        stylingExample.isHighlighted ? 'bg-yellow-100 border-yellow-300' : ''
                      }`}
                      style={{
                        color: stylingExample.color,
                        opacity: stylingExample.isVisible ? 1 : 0,
                        transform: `translateY(${stylingExample.isVisible ? '0' : '20px'})`,
                      }}
                    >
                      <h5 className="text-lg font-medium">Demo Card</h5>
                      <p>This card will be styled</p>
                    </div>
                  </div>
                </div>
              </ConceptInfoCard>
            </div>

            <div>
              <h4 className="font-semibold">2. Content Updates</h4>
              <ConceptInfoCard>
                <div className="space-y-6">
                  <StepThroughCodeAnimation
                    code={contentCode}
                    steps={contentSteps}
                    onStepChange={setContentStep}
                  />
                  <div className="flex items-center justify-center">
                    <div 
                      className={`p-4 border rounded transition-all duration-500 ${
                        contentExample.isActive ? 'bg-green-100 border-green-300' : ''
                      }`}
                      style={{
                        opacity: contentExample.isVisible ? 1 : 0,
                        transform: `scale(${contentExample.isVisible ? 1 : 0.95})`
                      }}
                      dangerouslySetInnerHTML={{ __html: contentExample.content }}
                    />
                  </div>
                </div>
              </ConceptInfoCard>
            </div>

            <div>
              <h4 className="font-semibold">3. Event Handling</h4>
              <ConceptInfoCard>
                <div className="space-y-6">
                  <StepThroughCodeAnimation
                    code={eventCode}
                    steps={eventSteps}
                    onStepChange={setEventStep}
                  />
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      onClick={() => eventStep >= 1 && setEventExample(prev => ({ ...prev, clickCount: prev.clickCount + 1 }))}
                      className={`px-6 py-3 ${eventStep >= 1 ? 'bg-purple-100 hover:bg-purple-200' : 'bg-gray-100'} rounded transition-all duration-300`}
                      style={{
                        cursor: eventExample.hasPointer ? 'pointer' : 'default',
                        opacity: eventStep > 0 ? 1 : 0.7
                      }}
                      title={eventExample.title}
                      disabled={eventStep < 1}
                    >
                      Interactive Button
                    </button>
                    {eventExample.clickCount > 0 && (
                      <div className="text-sm text-gray-600">
                        Click count: {eventExample.clickCount}
                      </div>
                    )}
                  </div>
                </div>
              </ConceptInfoCard>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <p className="text-yellow-700">
              <strong>Pro Tip:</strong> When chaining methods, it's common to put each method on a new line 
              (indented) to make your code easier to read. The dots at the start of each line show that 
              the methods are chained together.
            </p>
          </div>
        </Section>
      </TableOfContents>

      <style jsx>{`
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0.3; }
        }
        @keyframes slideUp {
          from { transform: translateY(0); }
          to { transform: translateY(-10px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .highlight {
          background-color: #fff3cd;
          border: 1px solid #ffeeba;
        }
        .demo-element {
          transition: all 0.3s ease;
        }
        .transition-all {
          transition: all 0.5s ease-in-out;
        }
      `}</style>
    </ConceptWrapper>
  );
} 