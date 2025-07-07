'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';

export default function JQuerySelectorsAndChaining() {
  const [selectorInput, setSelectorInput] = useState('');
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [chainedElement, setChainedElement] = useState<{
    text: string;
    classes: string[];
    isVisible: boolean;
    color: string;
  }>({
    text: 'Interactive Button',
    classes: ['btn'],
    isVisible: true,
    color: '#333'
  });

  // Simulated jQuery selector function
  const simulateSelector = (selector: string) => {
    const elements: string[] = [];
    
    // Simple selector simulation
    if (selector.startsWith('#')) {
      // ID selector
      const id = selector.slice(1);
      if (id === 'header') elements.push('<div id="header">Header Content</div>');
      if (id === 'main') elements.push('<div id="main">Main Content</div>');
    } else if (selector.startsWith('.')) {
      // Class selector
      const className = selector.slice(1);
      if (className === 'item') {
        elements.push('<li class="item">First Item</li>');
        elements.push('<li class="item">Second Item</li>');
      }
      if (className === 'section') {
        elements.push('<div class="section">Section 1</div>');
        elements.push('<div class="section">Section 2</div>');
      }
    } else {
      // Element selector
      if (selector === 'p') {
        elements.push('<p>First Paragraph</p>');
        elements.push('<p>Second Paragraph</p>');
      }
      if (selector === 'button') {
        elements.push('<button>Button 1</button>');
        elements.push('<button>Button 2</button>');
      }
    }

    setSelectedElements(elements);
  };

  const handleSelectorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectorInput(e.target.value);
    simulateSelector(e.target.value);
  };

  // Method chaining handlers
  const handleAddClass = () => {
    setChainedElement(prev => ({
      ...prev,
      classes: [...prev.classes, 'highlight']
    }));
  };

  const handleChangeText = () => {
    setChainedElement(prev => ({
      ...prev,
      text: 'Changed Text!'
    }));
  };

  const handleToggleVisibility = () => {
    setChainedElement(prev => ({
      ...prev,
      isVisible: !prev.isVisible
    }));
  };

  const handleChangeColor = () => {
    setChainedElement(prev => ({
      ...prev,
      color: '#007bff'
    }));
  };

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
                      placeholder="Try: .item, #header, p"
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
                <h4 className="font-semibold mb-4">Available Elements:</h4>
                <div className="space-y-2 font-mono text-sm bg-gray-100 p-3 rounded">
                  <p>&lt;div id="header"&gt;Header Content&lt;/div&gt;</p>
                  <p>&lt;div id="main"&gt;Main Content&lt;/div&gt;</p>
                  <p>&lt;div class="section"&gt;Section 1&lt;/div&gt;</p>
                  <p>&lt;div class="section"&gt;Section 2&lt;/div&gt;</p>
                  <p>&lt;li class="item"&gt;First Item&lt;/li&gt;</p>
                  <p>&lt;li class="item"&gt;Second Item&lt;/li&gt;</p>
                  <p>&lt;p&gt;First Paragraph&lt;/p&gt;</p>
                  <p>&lt;p&gt;Second Paragraph&lt;/p&gt;</p>
                  <p>&lt;button&gt;Button 1&lt;/button&gt;</p>
                  <p>&lt;button&gt;Button 2&lt;/button&gt;</p>
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

          <h3 className="text-xl font-semibold mt-6">Selector Playground</h3>
          <ConceptInfoCard>
            <StepThroughCodeAnimation
              code={[
                '<div class="container">',
                '  <div id="header" class="section">',
                '    <h1>Welcome</h1>',
                '    <p class="intro">Start learning jQuery!</p>',
                '  </div>',
                '  <div class="section">',
                '    <h2>Features</h2>',
                '    <ul class="features">',
                '      <li class="item">Easy to learn</li>',
                '      <li class="item">Fun to use</li>',
                '    </ul>',
                '  </div>',
                '</div>'
              ]}
              steps={[
                {
                  label: 'Select by ID',
                  desc: "$('#header') finds this element",
                  highlight: '  <div id="header" class="section">'
                },
                {
                  label: 'Select by Class',
                  desc: "$('.section') finds both of these divs",
                  highlight: 'class="section"'
                },
                {
                  label: 'Select Children',
                  desc: "$('#header h1') finds the h1 inside the header",
                  highlight: '    <h1>Welcome</h1>'
                },
                {
                  label: 'Multiple Classes',
                  desc: "$('li.item') finds both list items",
                  highlight: 'class="item"'
                }
              ]}
            />
          </ConceptInfoCard>
        </Section>

        <Section title="Method Chaining">
          <p className="mb-4">
            jQuery lets you run multiple methods one after another - this is called "chaining". 
            Try out different method combinations in this interactive demo:
          </p>

          <ConceptInfoCard>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Interactive Chaining Demo:</h4>
                <div className="space-y-4">
                  <div className="flex flex-col items-center p-4 border rounded">
                    <button
                      className={`px-4 py-2 rounded ${chainedElement.classes.join(' ')}`}
                      style={{
                        display: chainedElement.isVisible ? 'block' : 'none',
                        color: chainedElement.color
                      }}
                    >
                      {chainedElement.text}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleAddClass}
                      className="w-full p-2 bg-blue-100 hover:bg-blue-200 rounded"
                    >
                      .addClass('highlight')
                    </button>
                    <button
                      onClick={handleChangeText}
                      className="w-full p-2 bg-green-100 hover:bg-green-200 rounded"
                    >
                      .text('Changed Text!')
                    </button>
                    <button
                      onClick={handleToggleVisibility}
                      className="w-full p-2 bg-yellow-100 hover:bg-yellow-200 rounded"
                    >
                      .toggle()
                    </button>
                    <button
                      onClick={handleChangeColor}
                      className="w-full p-2 bg-purple-100 hover:bg-purple-200 rounded"
                    >
                      .css('color', '#007bff')
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Current State:</h4>
                <pre className="bg-gray-100 p-3 rounded text-sm">
                  {JSON.stringify({
                    text: chainedElement.text,
                    classes: chainedElement.classes,
                    isVisible: chainedElement.isVisible,
                    color: chainedElement.color
                  }, null, 2)}
                </pre>

                <div className="mt-4">
                  <h4 className="font-semibold mb-2">jQuery Equivalent:</h4>
                  <CodeSnippet
                    lines={[
                      { code: '$(\'.btn\')' },
                      ...chainedElement.classes.slice(1).map(cls => ({ 
                        code: `  .addClass('${cls}')` 
                      })),
                      ...(chainedElement.text !== 'Interactive Button' ? 
                        [{ code: `  .text('${chainedElement.text}')` }] : []),
                      ...((!chainedElement.isVisible) ? 
                        [{ code: '  .hide()' }] : []),
                      ...(chainedElement.color !== '#333' ?
                        [{ code: `  .css('color', '${chainedElement.color}')` }] : [])
                    ]}
                    language="javascript"
                  />
                </div>
              </div>
            </div>
          </ConceptInfoCard>

          <h3 className="text-xl font-semibold mt-6">Common Chaining Examples</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">1. Styling Changes</h4>
              <CodeSnippet
                lines={[
                  { code: '$(\'.card\')' },
                  { code: '  .addClass(\'highlight\')' },
                  { code: '  .css(\'color\', \'blue\')' },
                  { code: '  .slideDown();' }
                ]}
                language="javascript"
              />
            </div>

            <div>
              <h4 className="font-semibold">2. Content Updates</h4>
              <CodeSnippet
                lines={[
                  { code: '$(\'.message\')' },
                  { code: '  .html(\'<strong>Hello!</strong>\')' },
                  { code: '  .addClass(\'active\')' },
                  { code: '  .fadeIn();' }
                ]}
                language="javascript"
              />
            </div>

            <div>
              <h4 className="font-semibold">3. Event Handling</h4>
              <CodeSnippet
                lines={[
                  { code: '$(\'.button\')' },
                  { code: '  .on(\'click\', function() { console.log(\'Clicked!\'); })' },
                  { code: '  .css(\'cursor\', \'pointer\')' },
                  { code: '  .attr(\'title\', \'Click me!\');' }
                ]}
                language="javascript"
              />
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
    </ConceptWrapper>
  );
} 