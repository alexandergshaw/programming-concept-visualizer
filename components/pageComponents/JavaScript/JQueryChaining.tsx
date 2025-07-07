import CodeSnippet from '../../common/CodeSnippet';
import { useState } from 'react';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';

interface DemoBoxState {
  color: string;
  size: number;
  opacity: number;
  text: string;
  classes: string[];
}

export default function JQueryChaining() {
  const [demoBox, setDemoBox] = useState<DemoBoxState>({
    color: 'black',
    size: 100,
    opacity: 1,
    text: 'Click buttons to change me!',
    classes: []
  });

  const resetDemo = () => {
    setDemoBox({
      color: 'black',
      size: 100,
      opacity: 1,
      text: 'Click buttons to change me!',
      classes: []
    });
  };

  const runChainedEffects = () => {
    // Simulate chained jQuery effects
    setDemoBox(prev => ({ ...prev, color: 'blue' }));
    setTimeout(() => {
      setDemoBox(prev => ({ ...prev, size: 150 }));
      setTimeout(() => {
        setDemoBox(prev => ({ ...prev, text: 'Changed by chaining!' }));
        setTimeout(() => {
          setDemoBox(prev => ({ ...prev, classes: [...prev.classes, 'shadow'] }));
        }, 500);
      }, 500);
    }, 500);
  };

  const runSeparateEffects = () => {
    // Simulate separate jQuery calls with delays
    setTimeout(() => {
      setDemoBox(prev => ({ ...prev, color: 'blue' }));
    }, 300);
    setTimeout(() => {
      setDemoBox(prev => ({ ...prev, size: 150 }));
    }, 600);
    setTimeout(() => {
      setDemoBox(prev => ({ ...prev, text: 'Changed separately!' }));
    }, 900);
    setTimeout(() => {
      setDemoBox(prev => ({ ...prev, classes: [...prev.classes, 'shadow'] }));
    }, 1200);
  };

  return (
    <div className="space-y-4">
      <p>
        jQuery lets you do many things to the same element all at once. This is called &quot;chaining&quot; - 
        it&apos;s like giving a list of commands one after another.
      </p>

      <h3 className="text-xl font-semibold mt-4">The Old Way vs The jQuery Way</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <p className="font-semibold mb-2">Writing Each Step Separately:</p>
          <CodeSnippet
            lines={[
              { code: '// Do one thing at a time' },
              { code: '$(&quot;p&quot;).css(&quot;color&quot;, &quot;blue&quot;);' },
              { code: '$(&quot;p&quot;).hide();' },
              { code: '$(&quot;p&quot;).fadeIn();' },
              { code: '$(&quot;p&quot;).addClass(&quot;done&quot;);' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <p className="font-semibold mb-2">Doing Everything at Once:</p>
          <CodeSnippet
            lines={[
              { code: '// Do many things in one go' },
              { code: '$(&quot;p&quot;)' },
              { code: '  .css(&quot;color&quot;, &quot;blue&quot;)' },
              { code: '  .hide()' },
              { code: '  .fadeIn()' },
              { code: '  .addClass(&quot;done&quot;);' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Real-World Examples</h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold">Working with Forms:</h4>
          <CodeSnippet
            lines={[
              { code: '// Disable a form and show it&apos;s inactive' },
              { code: '$(&quot;form&quot;)' },
              { code: '  .find(&quot;input&quot;)          // Find all inputs' },
              { code: '  .prop(&quot;disabled&quot;, true) // Disable them' },
              { code: '  .addClass(&quot;inactive&quot;)   // Make them look disabled' },
              { code: '  .val(&quot;&quot;);              // Clear their values' }
            ]}
            language="javascript"
          />
        </div>

        <div>
          <h4 className="font-semibold">Making Things Move:</h4>
          <CodeSnippet
            lines={[
              { code: '// Create a smooth animation' },
              { code: '$(&quot;.box&quot;)' },
              { code: '  .fadeOut()                    // Fade away' },
              { code: '  .delay(1000)                 // Wait a second' },
              { code: '  .fadeIn()                    // Fade back' },
              { code: '  .animate({ width: &quot;200px&quot; }) // Get wider' }
            ]}
            language="javascript"
          />
        </div>

        <div>
          <h4 className="font-semibold">Handling Mouse Actions:</h4>
          <CodeSnippet
            lines={[
              { code: '// React to mouse movements' },
              { code: '$(&quot;button&quot;)' },
              { code: '  .on(&quot;mouseenter&quot;, function() {  // When mouse moves in' },
              { code: '    $(this).addClass(&quot;hover&quot;);' },
              { code: '  })' },
              { code: '  .on(&quot;mouseleave&quot;, function() {  // When mouse leaves' },
              { code: '    $(this).removeClass(&quot;hover&quot;);' },
              { code: '  });' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Understanding Method Chaining</h3>
      <StepThroughCodeAnimation
        code={[
          '// Example 1: Simple animation chain',
          '$(&quot;.box&quot;)',
          '  .fadeOut()',
          '  .delay(500)',
          '  .fadeIn()',
          '  .css(&quot;background&quot;, &quot;yellow&quot;);',
          '',
          '// Example 2: Form handling chain',
          '$(&quot;form&quot;)',
          '  .find(&quot;input&quot;)',
          '  .prop(&quot;disabled&quot;, true)',
          '  .val(&quot;&quot;)',
          '  .addClass(&quot;inactive&quot;);',
          '',
          '// Example 3: Content update chain',
          '$(&quot;.message&quot;)',
          '  .text(&quot;Loading...&quot;)',
          '  .addClass(&quot;loading&quot;)',
          '  .delay(1000)',
          '  .text(&quot;Done!&quot;)',
          '  .removeClass(&quot;loading&quot;)',
          '  .addClass(&quot;success&quot;);'
        ]}
        steps={[
          {
            label: 'Animation Chain',
            desc: 'Chain multiple animation effects together',
            highlight: [
              '$(&quot;.box&quot;)',
              '  .fadeOut()',
              '  .delay(500)',
              '  .fadeIn()',
              '  .css(&quot;background&quot;, &quot;yellow&quot;);'
            ]
          },
          {
            label: 'Form Chain',
            desc: 'Chain form field modifications together',
            highlight: [
              '$(&quot;form&quot;)',
              '  .find(&quot;input&quot;)',
              '  .prop(&quot;disabled&quot;, true)',
              '  .val(&quot;&quot;)',
              '  .addClass(&quot;inactive&quot;);'
            ]
          },
          {
            label: 'Content Chain',
            desc: 'Chain content and style updates together',
            highlight: [
              '$(&quot;.message&quot;)',
              '  .text(&quot;Loading...&quot;)',
              '  .addClass(&quot;loading&quot;)',
              '  .delay(1000)',
              '  .text(&quot;Done!&quot;)',
              '  .removeClass(&quot;loading&quot;)',
              '  .addClass(&quot;success&quot;);'
            ]
          }
        ]}
      />

      <h3 className="text-xl font-semibold mt-6">Watch Chaining in Action</h3>
      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <div 
          className={`mx-auto mb-6 flex items-center justify-center transition-all duration-500 rounded
            ${demoBox.classes.includes('shadow') ? 'shadow-lg' : ''}`}
          style={{
            width: demoBox.size,
            height: demoBox.size,
            backgroundColor: demoBox.color === 'black' ? '#f3f4f6' : '#93c5fd',
            opacity: demoBox.opacity,
            color: demoBox.color === 'black' ? 'black' : 'white'
          }}
        >
          <p className="text-center p-2 text-sm">{demoBox.text}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <button
              onClick={runSeparateEffects}
              className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              Run Effects Separately
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Each change happens one after another, with delays
            </p>
          </div>

          <div>
            <button
              onClick={runChainedEffects}
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
            >
              Run Chained Effects
            </button>
            <p className="text-sm text-gray-600 mt-2">
              Changes flow smoothly from one to the next
            </p>
          </div>
        </div>

        <button
          onClick={resetDemo}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700"
        >
          Reset Demo
        </button>

        <p className="text-sm text-gray-600 mt-4">
          See how chaining makes the changes flow better? That's why jQuery's chaining is so useful!
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
        <p className="text-blue-700">
          <strong>Writing Tip:</strong> When chaining lots of commands, put each one on a new line. 
          This makes your code easier to read and fix later.
        </p>
      </div>
    </div>
  );
} 