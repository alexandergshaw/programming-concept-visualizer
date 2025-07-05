import CodeSnippet from '../../common/CodeSnippet';
import { useState } from 'react';

export default function JQueryIntroduction() {
  const [demoText, setDemoText] = useState('Click the buttons to see the difference!');
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="space-y-4">
      <p>
        jQuery makes JavaScript easier to write. It's like a toolkit that helps you do common tasks with
        less code. Instead of writing lots of complicated JavaScript, jQuery lets you write simple commands
        to make things happen on your webpage.
      </p>

      <h3 className="text-xl font-semibold mt-4">Why Use jQuery?</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Works everywhere:</strong> Your code works the same in all browsers
        </li>
        <li>
          <strong>Easy to use:</strong> Change webpage content with simple commands
        </li>
        <li>
          <strong>Click handling made simple:</strong> Respond to clicks and other actions easily
        </li>
        <li>
          <strong>Get data easily:</strong> Load information from servers without refreshing the page
        </li>
        <li>
          <strong>Cool effects:</strong> Add animations with just one line of code
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-4">See the Difference</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <p className="font-semibold mb-2">Regular JavaScript:</p>
          <CodeSnippet
            lines={[
              { code: '// Change text on the page' },
              { code: 'document.getElementById(\'myElement\')' },
              { code: '  .textContent = \'New text\';' },
              { code: '' },
              { code: '// Handle a button click' },
              { code: 'document.querySelector(\'.btn\')' },
              { code: '  .addEventListener(\'click\', function() {' },
              { code: '    console.log(\'Clicked!\');' },
              { code: '});' }
            ]}
          />
        </div>
        <div>
          <p className="font-semibold mb-2">jQuery:</p>
          <CodeSnippet
            lines={[
              { code: '', comment: '// Change text on the page' },
              { code: '$(\'#myElement\').text(\'New text\');' },
              { code: '' },
              { code: '', comment: '// Handle a button click' },
              { code: '$(\'.btn\').click(function() {' },
              { code: '  console.log(\'Clicked!\');' },
              { code: '});' }
            ]}
          />
        </div>
      </div>

      <p className="mt-4">
        As you can see, jQuery makes your code shorter and easier to read. While modern JavaScript has
        gotten better, many developers still use jQuery because it's simple and gets the job done quickly.
      </p>
    </div>
  );
} 