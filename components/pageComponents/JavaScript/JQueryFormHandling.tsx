import CodeSnippet from '../../common/CodeSnippet';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import { useState } from 'react';

interface FormDemoState {
  username: string;
  email: string;
  errors: { [key: string]: string };
  isSubmitted: boolean;
}

export default function JQueryFormHandling() {
  const [formDemo, setFormDemo] = useState<FormDemoState>({
    username: '',
    email: '',
    errors: {},
    isSubmitted: false
  });

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    
    if (!formDemo.username) {
      errors.username = 'Username is required';
    }
    
    if (!formDemo.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formDemo.email)) {
      errors.email = 'Email is invalid';
    }

    setFormDemo(prev => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setFormDemo(prev => ({ ...prev, isSubmitted: true }));
    }
  };

  return (
    <div className="space-y-4">
      <p>
        Forms are a big part of websites. jQuery makes it easy to work with forms - getting what users 
        type in, checking boxes, and handling when forms are sent.
      </p>

      <h3 className="text-xl font-semibold mt-4">Form Basics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h4 className="font-semibold">When Forms Are Used:</h4>
          <CodeSnippet
            lines={[
              { code: '// When someone submits a form' },
              { code: '$("form").on("submit", function(e) {' },
              { code: '  e.preventDefault();  // Stop normal submit' },
              { code: '  // Handle the form data here' },
              { code: '});' },
              { code: '' },
              { code: '// When form is reset' },
              { code: '$("form").on("reset", function() {' },
              { code: '  alert("Form cleared!");' },
              { code: '});' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Getting Form Info:</h4>
          <CodeSnippet
            lines={[
              { code: '// Get all form data as one string' },
              { code: 'let data = $("form").serialize();' },
              { code: '// Result: "name=John&email=john@example.com"' },
              { code: '' },
              { code: '// Get form data as an array' },
              { code: 'let dataArray = $("form").serializeArray();' },
              { code: '// Result: [{name: "name", value: "John"}, ...]' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Working with Text Boxes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h4 className="font-semibold">Getting and Setting Text:</h4>
          <CodeSnippet
            lines={[
              { code: '// Get what\'s typed in' },
              { code: 'let name = $("#username").val();' },
              { code: '' },
              { code: '// Put some text in' },
              { code: '$("#email").val("test@example.com");' },
              { code: '' },
              { code: '// Watch for typing' },
              { code: '$("input").on("input", function() {' },
              { code: '  console.log("Typing:", $(this).val());' },
              { code: '});' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Special Effects:</h4>
          <CodeSnippet
            lines={[
              { code: '// When clicked on' },
              { code: '$("input").focus(function() {' },
              { code: '  $(this).css("background", "yellow");' },
              { code: '});' },
              { code: '' },
              { code: '// When clicked away' },
              { code: '$("input").blur(function() {' },
              { code: '  $(this).css("background", "white");' },
              { code: '});' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Checkboxes and Radio Buttons</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h4 className="font-semibold">Working with Checkboxes:</h4>
          <CodeSnippet
            lines={[
              { code: '// See if it\'s checked' },
              { code: 'let agreed = $("#terms").is(":checked");' },
              { code: '' },
              { code: '// When checkbox changes' },
              { code: '$("input[type=\'checkbox\']").change(function() {' },
              { code: '  if ($(this).is(":checked")) {' },
              { code: '    console.log("Checked!");' },
              { code: '  }' },
              { code: '});' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Working with Radio Buttons:</h4>
          <CodeSnippet
            lines={[
              { code: '// Get picked option' },
              { code: 'let choice = $("input[name=\'size\']:checked").val();' },
              { code: '' },
              { code: '// When selection changes' },
              { code: '$("input[type=\'radio\']").change(function() {' },
              { code: '  console.log("Picked:", $(this).val());' },
              { code: '});' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Dropdown Menus</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <h4 className="font-semibold">Single Choice Dropdowns:</h4>
          <CodeSnippet
            lines={[
              { code: '// Get picked option' },
              { code: 'let country = $("#country").val();' },
              { code: '' },
              { code: '// Set an option' },
              { code: '$("#country").val("USA");' },
              { code: '' },
              { code: '// Add a new option' },
              { code: '$("<option>").val("new").text("New Choice")' },
              { code: '  .appendTo("#country");' }
            ]}
            language="javascript"
          />
        </div>
        <div>
          <h4 className="font-semibold">Multi-Choice Dropdowns:</h4>
          <CodeSnippet
            lines={[
              { code: '// Get all picked options' },
              { code: 'let picks = $("#foods").val();' },
              { code: '' },
              { code: '// Pick several options' },
              { code: '$("#foods").val(["pizza", "burger"]);' },
              { code: '' },
              { code: '// Get the text of picked options' },
              { code: 'let foodNames = $("#foods option:selected")' },
              { code: '  .map(function() { return $(this).text(); })' },
              { code: '  .get();' }
            ]}
            language="javascript"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold mt-6">Watch Form Validation in Action</h3>
      <StepThroughCodeAnimation
        code={[
          '// Set up form validation',
          '$("form").on("submit", function(e) {',
          '  e.preventDefault();',
          '  ',
          '  // Clear previous errors',
          '  $(".error").remove();',
          '  let hasErrors = false;',
          '  ',
          '  // Check username',
          '  let username = $("#username").val();',
          '  if (!username) {',
          '    $("#username")',
          '      .addClass("error-field")',
          '      .after("<span class=\'error\'>Username required</span>");',
          '    hasErrors = true;',
          '  }',
          '  ',
          '  // Check email',
          '  let email = $("#email").val();',
          '  if (!email) {',
          '    $("#email")',
          '      .addClass("error-field")',
          '      .after("<span class=\'error\'>Email required</span>");',
          '    hasErrors = true;',
          '  } else if (!email.match(/\\S+@\\S+\\.\\S+/)) {',
          '    $("#email")',
          '      .addClass("error-field")',
          '      .after("<span class=\'error\'>Invalid email</span>");',
          '    hasErrors = true;',
          '  }',
          '  ',
          '  // Submit if no errors',
          '  if (!hasErrors) {',
          '    // Send form data',
          '    $(this).submit();',
          '  }',
          '});'
        ]}
        steps={[
          {
            label: 'Form Setup',
            desc: 'Listen for when the form is submitted',
            highlight: ['$("form").on("submit", function(e) {', 'e.preventDefault();']
          },
          {
            label: 'Clear Errors',
            desc: 'Remove any previous error messages',
            highlight: ['$(".error").remove();', 'let hasErrors = false;']
          },
          {
            label: 'Username Check',
            desc: 'Make sure username is filled in',
            highlight: [
              'let username = $("#username").val();',
              'if (!username) {',
              '  $("#username")',
              '    .addClass("error-field")',
              '    .after("<span class=\'error\'>Username required</span>");',
              '  hasErrors = true;',
              '}'
            ]
          },
          {
            label: 'Email Check',
            desc: 'Validate email format',
            highlight: [
              'let email = $("#email").val();',
              'if (!email) {',
              '} else if (!email.match(/\\S+@\\S+\\.\\S+/)) {',
              '  $("#email")',
              '    .addClass("error-field")',
              '    .after("<span class=\'error\'>Invalid email</span>");'
            ]
          },
          {
            label: 'Submit Form',
            desc: 'If everything is valid, submit the form',
            highlight: [
              'if (!hasErrors) {',
              '  // Send form data',
              '  $(this).submit();',
              '}'
            ]
          }
        ]}
      />

      <h3 className="text-xl font-semibold mt-6">Try the Form</h3>
      <ConceptInfoCard>
        <div className="space-y-4">
          {formDemo.isSubmitted ? (
            <div className="text-green-600 text-center p-4 bg-green-50 rounded">
              Form submitted successfully!
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={formDemo.username}
                  onChange={(e) => setFormDemo(prev => ({ 
                    ...prev, 
                    username: e.target.value,
                    errors: { ...prev.errors, username: '' }
                  }))}
                  className={`mt-1 block w-full rounded border-gray-300 shadow-sm
                    ${formDemo.errors.username ? 'border-red-300' : ''}`}
                />
                {formDemo.errors.username && (
                  <p className="mt-1 text-sm text-red-600">{formDemo.errors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formDemo.email}
                  onChange={(e) => setFormDemo(prev => ({ 
                    ...prev, 
                    email: e.target.value,
                    errors: { ...prev.errors, email: '' }
                  }))}
                  className={`mt-1 block w-full rounded border-gray-300 shadow-sm
                    ${formDemo.errors.email ? 'border-red-300' : ''}`}
                />
                {formDemo.errors.email && (
                  <p className="mt-1 text-sm text-red-600">{formDemo.errors.email}</p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Submit Form
                </button>
                <button
                  onClick={() => setFormDemo({
                    username: '',
                    email: '',
                    errors: {},
                    isSubmitted: false
                  })}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Reset Form
                </button>
              </div>
            </form>
          )}
        </div>
      </ConceptInfoCard>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
        <p className="text-blue-700">
          <strong>Helpful Tip:</strong> For bigger forms with lots of rules (like password checking or 
          email format), try using the jQuery Validate plugin. It makes form checking much easier!
        </p>
      </div>
    </div>
  );
} 