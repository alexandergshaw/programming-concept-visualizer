import CodeSnippet from '../../common/CodeSnippet';
import { useState } from 'react';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';

export default function JQuerySelectorsSyntax() {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  
  const demoElements = [
    { type: 'h1', id: 'title', class: 'header', text: 'Main Title' },
    { type: 'p', id: 'intro', class: 'text', text: 'Introduction paragraph' },
    { type: 'div', id: 'box1', class: 'box important', text: 'Important Box' },
    { type: 'div', id: 'box2', class: 'box', text: 'Regular Box' },
    { type: 'button', id: 'submit', class: 'btn primary', text: 'Submit' },
    { type: 'button', id: 'cancel', class: 'btn', text: 'Cancel' }
  ];

  const handleSelectorClick = (selector: string) => {
    // Simulate jQuery selection
    const newSelected = demoElements.filter(el => {
      switch (selector) {
        case 'div':
          return el.type === 'div';
        case '.box':
          return el.class.includes('box');
        case '.btn.primary':
          return el.class.includes('btn') && el.class.includes('primary');
        case '#title':
          return el.id === 'title';
        case '[class*="important"]':
          return el.class.includes('important');
        default:
          return false;
      }
    }).map(el => el.id);
    
    setSelectedElements(newSelected);
  };

  return (
    <div className="space-y-4">
      <p>
        jQuery selectors help you find things on your webpage. Think of them like a search tool - you tell 
        jQuery what to look for, and it finds those elements for you.
      </p>

      <h3 className="text-xl font-semibold mt-4">Basic Pattern</h3>
      <CodeSnippet
        lines={[{ code: '$(\'what-to-find\').whatToDo()' }]}
        language="javascript"
      />

      <p>It's like saying: "Find this thing, then do something with it."</p>

      <h3 className="text-xl font-semibold mt-6">Finding Elements</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h4 className="font-semibold">Find by Tag Name:</h4>
          <CodeSnippet
            lines={[
              { code: '// Find all paragraphs' },
              { code: '$("p").hide();' },
              { code: '' },
              { code: '// Find all divs' },
              { code: '$("div").show();' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Find by ID:</h4>
          <CodeSnippet
            lines={[
              { code: '// Find element with id="menu"' },
              { code: '$("#menu").show();' },
              { code: '' },
              { code: '// Find element with id="header"' },
              { code: '$("#header").hide();' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="font-semibold">Find by Class:</h4>
          <CodeSnippet
            lines={[
              { code: '// Find elements with class="button"' },
              { code: '$(".button").fadeIn();' },
              { code: '' },
              { code: '// When buttons are clicked' },
              { code: '$(".button").click(function() {' },
              { code: '  // Do something' },
              { code: '});' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Find by Attribute:</h4>
          <CodeSnippet
            lines={[
              { code: '// Find checkboxes' },
              { code: '$("input[type=\'checkbox\']");' },
              { code: '' },
              { code: '// Find required fields' },
              { code: '$("[required]");' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Finding Multiple Things</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold">Find Several Types:</h4>
          <CodeSnippet
            lines={[
              { code: '// Find all headings' },
              { code: '$("h1, h2, h3").css("color", "blue");' },
              { code: '' },
              { code: '// Find special buttons' },
              { code: '$("button.special").addClass("highlight");' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Find Inside Other Elements:</h4>
          <CodeSnippet
            lines={[
              { code: '// Find items in a list' },
              { code: '$("ul > li");  // Direct children' },
              { code: '' },
              { code: '// Find all spans in divs' },
              { code: '$("div span");  // Any nested spans' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
        <p className="text-blue-700">
          <strong>Quick Tip:</strong> Using IDs (like #menu) is the fastest way to find elements. If you 
          can, use IDs for elements you need to work with often.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6">Try Different Selectors</h3>
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => handleSelectorClick('div')}
            className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
          >
            $("div")
          </button>
          <button
            onClick={() => handleSelectorClick('.box')}
            className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
          >
            $(".box")
          </button>
          <button
            onClick={() => handleSelectorClick('.btn.primary')}
            className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
          >
            $(".btn.primary")
          </button>
          <button
            onClick={() => handleSelectorClick('#title')}
            className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
          >
            $("#title")
          </button>
          <button
            onClick={() => handleSelectorClick('[class*="important"]')}
            className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
          >
            $('[class*="important"]')
          </button>
        </div>

        <div className="space-y-2">
          {demoElements.map(el => (
            <div
              key={el.id}
              className={`p-3 rounded transition-colors ${
                selectedElements.includes(el.id)
                  ? 'bg-yellow-100 border-2 border-yellow-400'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="text-sm font-mono mb-1">
                &lt;{el.type} id="{el.id}" class="{el.class}"&gt;
              </div>
              <div className="pl-4">{el.text}</div>
              <div className="text-sm font-mono mt-1">
                &lt;/{el.type}&gt;
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Click the buttons above to see which elements get selected. The highlighted elements are the ones that match the selector!
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6">See How Selectors Work</h3>
      <StepThroughCodeAnimation
        code={[
          '<!-- Our webpage structure -->',
          '<div id="container" class="main">',
          '  <h1 id="title">Welcome</h1>',
          '  <nav class="menu">',
          '    <ul>',
          '      <li class="active">Home</li>',
          '      <li>About</li>',
          '      <li>Contact</li>',
          '    </ul>',
          '  </nav>',
          '  <div class="content">',
          '    <p class="intro">Hello there!</p>',
          '    <button type="submit">Click me</button>',
          '  </div>',
          '</div>',
          '',
          '// Different ways to select elements',
          '$("#title")                    // By ID',
          '$(".menu")                     // By class',
          '$("button")                    // By tag',
          '$(".menu li")                  // Nested elements',
          '$(".menu li.active")           // Multiple conditions',
          '$("[type=\'submit\']")         // By attribute',
          '$(".content > p")              // Direct children',
          '$("h1, button")                // Multiple elements'
        ]}
        steps={[
          {
            label: 'Page Structure',
            desc: 'This is our example webpage layout',
            highlight: ['<div id="container" class="main">', '</div>']
          },
          {
            label: 'Select by ID',
            desc: 'Find a single element with a specific ID',
            highlight: ['<h1 id="title">Welcome</h1>', '$("#title")']
          },
          {
            label: 'Select by Class',
            desc: 'Find all elements with a specific class',
            highlight: ['class="menu"', '$(".menu")']
          },
          {
            label: 'Select by Tag',
            desc: 'Find all elements of a specific type',
            highlight: ['<button', '$("button")']
          },
          {
            label: 'Nested Elements',
            desc: 'Find elements inside other elements',
            highlight: ['<li class="active">Home</li>', '$(".menu li")']
          },
          {
            label: 'Multiple Conditions',
            desc: 'Find elements that match several criteria',
            highlight: ['<li class="active">Home</li>', '$(".menu li.active")']
          },
          {
            label: 'By Attribute',
            desc: 'Find elements with specific attributes',
            highlight: ['type="submit"', '$("[type=\'submit\']")']
          },
          {
            label: 'Direct Children',
            desc: 'Find elements that are direct children',
            highlight: ['<p class="intro">Hello there!</p>', '$(".content > p")']
          },
          {
            label: 'Multiple Elements',
            desc: 'Find several different types of elements',
            highlight: ['<h1', '$("h1, button")']
          }
        ]}
      />
    </div>
  );
} 