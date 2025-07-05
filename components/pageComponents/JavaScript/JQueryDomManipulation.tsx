import CodeSnippet from '../../common/CodeSnippet';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import { useState } from 'react';

interface DemoElementState {
  text: string;
  isVisible: boolean;
  classes: string[];
}

export default function JQueryDomManipulation() {
  const [demoElement, setDemoElement] = useState<DemoElementState>({
    text: 'Hello!',
    isVisible: true,
    classes: []
  });

  return (
    <div className="space-y-4">
      <p>
        jQuery makes it easy to change your webpage. Here's how to do common tasks like changing text, 
        adding new elements, and styling things.
      </p>

      <h3 className="text-xl font-semibold mt-4">Changing Content</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h4 className="font-semibold">Change Text and HTML:</h4>
          <CodeSnippet
            lines={[
              { code: '// Get or change text' },
              { code: 'let message = $("#greeting").text();     // Get text' },
              { code: '$("#greeting").text("Hello!");          // Change text' },
              { code: '' },
              { code: '// Get or change HTML' },
              { code: 'let content = $("#info").html();        // Get HTML' },
              { code: '$("#info").html("<b>Important!</b>");  // Change HTML' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Change Settings:</h4>
          <CodeSnippet
            lines={[
              { code: '// Change image source' },
              { code: '$("img").attr("src", "new-pic.jpg");' },
              { code: '' },
              { code: '// Check or change checkboxes' },
              { code: 'let isChecked = $("#terms").prop("checked");' },
              { code: '$("#terms").prop("checked", true);' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Adding and Removing</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h4 className="font-semibold">Add New Things:</h4>
          <CodeSnippet
            lines={[
              { code: '// Add a new paragraph' },
              { code: '$("<p>New text</p>").appendTo("#container");' },
              { code: '' },
              { code: '// Add things in different spots' },
              { code: '$("p").before("<hr>");         // Add before' },
              { code: '$("p").after("<hr>");          // Add after' },
              { code: '$("div").prepend("Start");     // Add at start' },
              { code: '$("div").append("End");        // Add at end' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Remove Things:</h4>
          <CodeSnippet
            lines={[
              { code: '// Remove elements completely' },
              { code: '$(".old-stuff").remove();' },
              { code: '' },
              { code: '// Empty a container' },
              { code: '$("#container").empty();' },
              { code: '' },
              { code: '// Replace something' },
              { code: '$("p").replaceWith("<div>New</div>");' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Styling Things</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h4 className="font-semibold">Using Classes:</h4>
          <CodeSnippet
            lines={[
              { code: '// Add or remove classes' },
              { code: '$("div").addClass("highlight");' },
              { code: '$("div").removeClass("old");' },
              { code: '' },
              { code: '// Toggle a class (add/remove)' },
              { code: '$("div").toggleClass("active");' },
              { code: '' },
              { code: '// Check for a class' },
              { code: 'if ($("div").hasClass("important")) {' },
              { code: '  // Do something' },
              { code: '}' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Direct Styling:</h4>
          <CodeSnippet
            lines={[
              { code: '// Change one style' },
              { code: '$("p").css("color", "blue");' },
              { code: '' },
              { code: '// Change many styles at once' },
              { code: '$("div").css({' },
              { code: '  "background": "yellow",' },
              { code: '  "padding": "10px",' },
              { code: '  "border": "1px solid black"' },
              { code: '});' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
        <p className="text-yellow-700">
          <strong>Speed Tip:</strong> When changing many things at once, save your jQuery selection in a 
          variable. For example: <code>let menu = $("#menu");</code> then use <code>menu</code> instead 
          of searching for it again.
        </p>
      </div>

      <h3 className="text-xl font-semibold mt-6">Watch DOM Changes Step by Step</h3>
      <StepThroughCodeAnimation
        code={[
          '// Start with a div',
          '<div id="greeting">Hello!</div>',
          '',
          '// Change its content',
          '$("#greeting")',
          '  .text("Welcome!")',
          '  .addClass("highlight")',
          '  .fadeOut()',
          '  .delay(1000)',
          '  .fadeIn()',
          '  .css("color", "blue");'
        ]}
        steps={[
          {
            label: 'Initial State',
            desc: 'We start with a simple div element on our page',
            highlight: '<div id="greeting">Hello!</div>'
          },
          {
            label: 'Select Element',
            desc: 'Use jQuery to find the element by its ID',
            highlight: '$("#greeting")'
          },
          {
            label: 'Change Text',
            desc: 'Update the text content inside the div',
            highlight: '.text("Welcome!")'
          },
          {
            label: 'Add Class',
            desc: 'Add a CSS class to style the element',
            highlight: '.addClass("highlight")'
          },
          {
            label: 'Fade Out',
            desc: 'Make the element fade away smoothly',
            highlight: '.fadeOut()'
          },
          {
            label: 'Wait',
            desc: 'Pause for a moment (1 second)',
            highlight: '.delay(1000)'
          },
          {
            label: 'Fade In',
            desc: 'Bring the element back smoothly',
            highlight: '.fadeIn()'
          },
          {
            label: 'Change Color',
            desc: 'Finally, change the text color to blue',
            highlight: '.css("color", "blue")'
          }
        ]}
      />

      <h3 className="text-xl font-semibold mt-6">Try It Live</h3>
      <ConceptInfoCard>
        <div className="space-y-4">
          <div 
            className={`p-4 rounded transition-all duration-500 text-center
              ${demoElement.isVisible ? 'opacity-100' : 'opacity-0'}
              ${demoElement.classes.includes('highlight') ? 'bg-yellow-100' : ''}
            `}
            style={{
              color: demoElement.classes.includes('blue') ? 'blue' : 'black'
            }}
          >
            {demoElement.text}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={() => setDemoElement(prev => ({ ...prev, text: 'Welcome!' }))}
              className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
            >
              Change Text
            </button>
            <button
              onClick={() => setDemoElement(prev => ({ 
                ...prev, 
                classes: [...prev.classes, 'highlight']
              }))}
              className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
            >
              Add Highlight
            </button>
            <button
              onClick={() => setDemoElement(prev => ({ ...prev, isVisible: false }))}
              className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
            >
              Fade Out
            </button>
            <button
              onClick={() => setDemoElement(prev => ({ 
                ...prev, 
                classes: [...prev.classes, 'blue']
              }))}
              className="p-2 text-sm bg-blue-100 hover:bg-blue-200 rounded"
            >
              Make Blue
            </button>
          </div>

          <button
            onClick={() => setDemoElement({
              text: 'Hello!',
              isVisible: true,
              classes: []
            })}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Reset Demo
          </button>
        </div>
      </ConceptInfoCard>
    </div>
  );
} 