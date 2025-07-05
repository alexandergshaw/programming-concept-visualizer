'use client';

import { useState, useEffect } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import CodeSnippet from '@/components/common/CodeSnippet';
import ConceptInfoCard from '@/components/common/ConceptInfoCard';
import StepThroughCodeAnimation from './StepThroughCodeAnimation';

export default function JQueryFormHandlingConcept() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [formOutput, setFormOutput] = useState('');
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [serializedOutput, setSerializedOutput] = useState('');

  // Simulated jQuery-style validation
  const validateField = (name: string, value: string) => {
    const errors = { ...formErrors };
    
    switch (name) {
      case 'username':
        if (value.length < 3) {
          errors.username = 'Username must be at least 3 characters';
        } else {
          delete errors.username;
        }
        break;
      case 'email':
        if (!value.includes('@')) {
          errors.email = 'Please enter a valid email';
        } else {
          delete errors.email;
        }
        break;
    }

    setFormErrors(errors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      setFormOutput(JSON.stringify({ username, email }, null, 2));
    }
  };

  const handleHobbyChange = (hobby: string) => {
    setSelectedHobbies(prev => {
      if (prev.includes(hobby)) {
        return prev.filter(h => h !== hobby);
      }
      return [...prev, hobby];
    });
  };

  useEffect(() => {
    const hobbyParams = selectedHobbies.map(h => `hobby=${encodeURIComponent(h)}`).join('&');
    setSerializedOutput(hobbyParams);
  }, [selectedHobbies]);

  return (
    <ConceptWrapper
      title="jQuery Form Handling"
      description="Learn how to handle forms, validate input, and process form submissions with jQuery."
    >
      <TableOfContents numbered>
        <Section title="Real-time Form Validation">
          <p className="mb-4">
            Try out this form to see jQuery-style validation in action. The validation happens as you type 
            and when fields lose focus:
          </p>

          <ConceptInfoCard>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Interactive Demo:</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Username:</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        validateField('username', e.target.value);
                      }}
                      onBlur={() => validateField('username', username)}
                      className={`w-full p-2 border rounded ${formErrors.username ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.username && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.username}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        validateField('email', e.target.value);
                      }}
                      onBlur={() => validateField('email', email)}
                      className={`w-full p-2 border rounded ${formErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={Object.keys(formErrors).length > 0}
                    className={`px-4 py-2 rounded text-white ${
                      Object.keys(formErrors).length > 0 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Submit Form
                  </button>
                </form>

                {formOutput && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Form Output:</h4>
                    <pre className="bg-gray-100 p-3 rounded">
                      {formOutput}
                    </pre>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-4">jQuery Implementation:</h4>
                <CodeSnippet
                  lines={[
                    { code: '// HTML Structure' },
                    { code: '<form id="signupForm">' },
                    { code: '  <input type="text" id="username" name="username" />' },
                    { code: '  <span class="error username-error"></span>' },
                    { code: '  <input type="email" id="email" name="email" />' },
                    { code: '  <span class="error email-error"></span>' },
                    { code: '  <button type="submit">Submit</button>' },
                    { code: '</form>' },
                    { code: '' },
                    { code: '// jQuery Validation Code' },
                    { code: '$(document).ready(function() {' },
                    { code: '  function validateField($field) {' },
                    { code: '    const value = $field.val();' },
                    { code: '    const name = $field.attr(\'name\');' },
                    { code: '    const $error = $(`.${name}-error`);' },
                    { code: '' },
                    { code: '    $field.removeClass(\'invalid\');' },
                    { code: '    $error.hide();' },
                    { code: '' },
                    { code: '    if (name === \'username\' && value.length < 3) {' },
                    { code: '      $field.addClass(\'invalid\');' },
                    { code: '      $error.text(\'Username must be at least 3 characters\').show();' },
                    { code: '      return false;' },
                    { code: '    }' },
                    { code: '' },
                    { code: '    if (name === \'email\' && !value.includes(\'@\')) {' },
                    { code: '      $field.addClass(\'invalid\');' },
                    { code: '      $error.text(\'Please enter a valid email\').show();' },
                    { code: '      return false;' },
                    { code: '    }' },
                    { code: '' },
                    { code: '    return true;' },
                    { code: '  }' },
                    { code: '' },
                    { code: '  // Real-time validation' },
                    { code: '  $(\'#signupForm input\').on(\'input blur\', function() {' },
                    { code: '    validateField($(this));' },
                    { code: '    ' },
                    { code: '    // Enable/disable submit button' },
                    { code: '    const hasErrors = $(\'.invalid\').length > 0;' },
                    { code: '    $(\'button[type="submit"]\').prop(\'disabled\', hasErrors);' },
                    { code: '  });' },
                    { code: '' },
                    { code: '  // Form submission' },
                    { code: '  $(\'#signupForm\').on(\'submit\', function(e) {' },
                    { code: '    e.preventDefault();' },
                    { code: '    ' },
                    { code: '    const isValid = $(\'#signupForm input\').get().every(function(input) {' },
                    { code: '      return validateField($(input));' },
                    { code: '    });' },
                    { code: '' },
                    { code: '    if (isValid) {' },
                    { code: '      const formData = {' },
                    { code: '        username: $(\'#username\').val(),' },
                    { code: '        email: $(\'#email\').val()' },
                    { code: '      };' },
                    { code: '      console.log(\'Form data:\', formData);' },
                    { code: '    }' },
                    { code: '  });' },
                    { code: '});' }
                  ]}
                  language="javascript"
                />
              </div>
            </div>
          </ConceptInfoCard>

          <div className="mt-8">
            <ConceptInfoCard>
              <h4 className="font-semibold mb-4">Step-by-Step jQuery Explanation:</h4>
              <StepThroughCodeAnimation
                code={[
                  '$(document).ready(function() {',
                  '  function validateField($field) {',
                  '    const value = $field.val();',
                  '    const name = $field.attr(\'name\');',
                  '    const $error = $(`.${name}-error`);',
                  '',
                  '    $field.removeClass(\'invalid\');',
                  '    $error.hide();',
                  '',
                  '    if (name === \'username\' && value.length < 3) {',
                  '      $field.addClass(\'invalid\');',
                  '      $error.text(\'Username must be at least 3 characters\').show();',
                  '      return false;',
                  '    }',
                  '',
                  '    if (name === \'email\' && !value.includes(\'@\')) {',
                  '      $field.addClass(\'invalid\');',
                  '      $error.text(\'Please enter a valid email\').show();',
                  '      return false;',
                  '    }',
                  '',
                  '    return true;',
                  '  }',
                  '',
                  '  $(\'#signupForm input\').on(\'input blur\', function() {',
                  '    validateField($(this));',
                  '    const hasErrors = $(\'.invalid\').length > 0;',
                  '    $(\'button[type="submit"]\').prop(\'disabled\', hasErrors);',
                  '  });',
                  '',
                  '  $(\'#signupForm\').on(\'submit\', function(e) {',
                  '    e.preventDefault();',
                  '    const isValid = $(\'#signupForm input\').get().every(function(input) {',
                  '      return validateField($(input));',
                  '    });',
                  '',
                  '    if (isValid) {',
                  '      const formData = {',
                  '        username: $(\'#username\').val(),',
                  '        email: $(\'#email\').val()',
                  '      };',
                  '      console.log(\'Form data:\', formData);',
                  '    }',
                  '  });',
                  '});'
                ]}
                steps={[
                  {
                    label: 'Document Ready Setup',
                    desc: 'jQuery code should wait for the page to fully load before running. This prevents errors that could happen if we try to work with elements that haven\'t been created yet. The $(document).ready() function is like saying "wait until the page is ready before doing anything".',
                    highlight: '$(document).ready(function() {'
                  },
                  {
                    label: 'Create Validation Function',
                    desc: 'We create a function called validateField that will check if an input is valid. The $field parameter is a jQuery object representing an input field - the $ in front of the name is just a convention to remind us it\'s a jQuery object.',
                    highlight: '  function validateField($field) {'
                  },
                  {
                    label: 'Get Field Information',
                    desc: 'We get two important pieces of information: the actual text in the field (using .val()) and the field\'s name attribute (using .attr(\'name\')). For example, if the user typed "john" in the username field, value would be "john" and name would be "username".',
                    highlight: ['    const value = $field.val();', '    const name = $field.attr(\'name\');']
                  },
                  {
                    label: 'Find Error Message Element',
                    desc: 'For each input field, we have a matching error message element with a class like "username-error" or "email-error". The ${name}-error syntax creates this class name dynamically based on the input\'s name. This lets us show errors next to the right input field.',
                    highlight: '    const $error = $(`.${name}-error`);'
                  },
                  {
                    label: 'Start Fresh',
                    desc: 'Before checking the new value, we clear any previous error state. We remove the \'invalid\' class (which might make the input red) and hide any error message that might be showing. This gives us a clean slate for the new validation.',
                    highlight: ['    $field.removeClass(\'invalid\');', '    $error.hide();']
                  },
                  {
                    label: 'Username Length Check',
                    desc: 'For username fields, we check if the text is too short (less than 3 characters). This is a common requirement to prevent usernames that are too short to be useful.',
                    highlight: '    if (name === \'username\' && value.length < 3) {'
                  },
                  {
                    label: 'Show Username Error',
                    desc: 'If the username is too short, we: 1) Add the \'invalid\' class to make the input look wrong, 2) Set the error message text, 3) Show the error message, and 4) Return false to indicate validation failed.',
                    highlight: ['      $field.addClass(\'invalid\');', '      $error.text(\'Username must be at least 3 characters\').show();', '      return false;']
                  },
                  {
                    label: 'Email Format Check',
                    desc: 'For email fields, we do a simple check to make sure the value includes an @ symbol. While this isn\'t a complete email validation, it\'s a basic check to ensure the input looks like an email address.',
                    highlight: '    if (name === \'email\' && !value.includes(\'@\')) {'
                  },
                  {
                    label: 'Show Email Error',
                    desc: 'Similar to username errors, we show an email-specific error message if the format is wrong. The error appears right below the email input field.',
                    highlight: ['      $field.addClass(\'invalid\');', '      $error.text(\'Please enter a valid email\').show();', '      return false;']
                  },
                  {
                    label: 'Validation Success',
                    desc: 'If we get past all the checks without finding any problems, we return true to indicate the field is valid. At this point, there are no error messages showing and the field looks normal.',
                    highlight: '    return true;'
                  },
                  {
                    label: 'Real-time Event Setup',
                    desc: 'We set up two types of checks: 1) \'input\' triggers while the user is typing, giving immediate feedback, and 2) \'blur\' triggers when they leave the field, catching any issues they might have missed.',
                    highlight: '  $(\'#signupForm input\').on(\'input blur\', function() {'
                  },
                  {
                    label: 'Validate on Input',
                    desc: 'Every time the user types or leaves a field, we run our validation function on that field. $(this) refers to the input field that triggered the event.',
                    highlight: '    validateField($(this));'
                  },
                  {
                    label: 'Check All Fields',
                    desc: 'We look for any fields marked as invalid (they\'ll have the \'invalid\' class). .length > 0 means we found at least one invalid field.',
                    highlight: '    const hasErrors = $(\'.invalid\').length > 0;'
                  },
                  {
                    label: 'Control Submit Button',
                    desc: 'We enable or disable the submit button based on whether there are any errors. prop(\'disabled\', hasErrors) sets the button\'s disabled property to true if there are errors, false if everything is valid.',
                    highlight: '    $(\'button[type="submit"]\').prop(\'disabled\', hasErrors);'
                  },
                  {
                    label: 'Form Submission Setup',
                    desc: 'When the user clicks submit, we first prevent the default form submission (e.preventDefault()). This gives us a chance to do our own validation first.',
                    highlight: ['  $(\'#signupForm\').on(\'submit\', function(e) {', '    e.preventDefault();']
                  },
                  {
                    label: 'Final Validation',
                    desc: 'Before submitting, we check every input one last time. The .get() converts jQuery\'s collection to a regular array, and .every() makes sure validateField returns true for every single input.',
                    highlight: ['    const isValid = $(\'#signupForm input\').get().every(function(input) {', '      return validateField($(input));', '    });']
                  },
                  {
                    label: 'Collect Form Data',
                    desc: 'If all validations pass, we gather the final values. We create an object with all the form data, ready to be sent to a server.',
                    highlight: ['    if (isValid) {', '      const formData = {', '        username: $(\'#username\').val(),', '        email: $(\'#email\').val()', '      };']
                  },
                  {
                    label: 'Process Form Data',
                    desc: 'Finally, we can do something with the valid form data. In this example, we just log it to the console, but in a real app, you might send it to a server using AJAX.',
                    highlight: '      console.log(\'Form data:\', formData);'
                  }
                ]}
              />
            </ConceptInfoCard>
          </div>
        </Section>

        <Section title="Form Serialization">
          <p className="mb-4">
            See how jQuery converts form data into different formats. Select some hobbies to see the serialized output:
          </p>

          <ConceptInfoCard>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4">Interactive Demo:</h4>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Select Your Hobbies:</h4>
                    <div className="space-y-2">
                      {['Reading', 'Gaming', 'Cooking', 'Sports', 'Music', 'Art'].map(hobby => (
                        <label key={hobby} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedHobbies.includes(hobby)}
                            onChange={() => handleHobbyChange(hobby)}
                            className="form-checkbox h-4 w-4 text-blue-500"
                          />
                          <span>{hobby}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Serialized Output:</h4>
                    <div className="bg-gray-100 p-3 rounded">
                      <p className="text-sm font-mono break-all">{serializedOutput || '(Select some hobbies)'}</p>
                    </div>

                    <h4 className="font-semibold mb-2 mt-4">Array Format:</h4>
                    <div className="bg-gray-100 p-3 rounded">
                      <pre className="text-sm">
                        {JSON.stringify(selectedHobbies, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4">jQuery Implementation:</h4>
                <CodeSnippet
                  lines={[
                    { code: '// HTML Structure' },
                    { code: '<form id="hobbiesForm">' },
                    { code: '  <label><input type="checkbox" name="hobby" value="Reading" /> Reading</label>' },
                    { code: '  <label><input type="checkbox" name="hobby" value="Gaming" /> Gaming</label>' },
                    { code: '  <label><input type="checkbox" name="hobby" value="Cooking" /> Cooking</label>' },
                    { code: '  <label><input type="checkbox" name="hobby" value="Sports" /> Sports</label>' },
                    { code: '  <label><input type="checkbox" name="hobby" value="Music" /> Music</label>' },
                    { code: '  <label><input type="checkbox" name="hobby" value="Art" /> Art</label>' },
                    { code: '</form>' },
                    { code: '' },
                    { code: '// jQuery Serialization Code' },
                    { code: '$(document).ready(function() {' },
                    { code: '  // Update on any checkbox change' },
                    { code: '  $(\'#hobbiesForm input[type="checkbox"]\').on(\'change\', function() {' },
                    { code: '    // Get URL-encoded string' },
                    { code: '    const serialized = $(\'#hobbiesForm\').serialize();' },
                    { code: '    $(\'#serializedOutput\').text(serialized);' },
                    { code: '' },
                    { code: '    // Get array of selected hobbies' },
                    { code: '    const selectedHobbies = $(\'#hobbiesForm input:checked\').map(function() {' },
                    { code: '      return $(this).val();' },
                    { code: '    }).get();' },
                    { code: '    $(\'#arrayOutput\').text(JSON.stringify(selectedHobbies, null, 2));' },
                    { code: '' },
                    { code: '    // Get as array of objects' },
                    { code: '    const arrayData = $(\'#hobbiesForm\').serializeArray();' },
                    { code: '    $(\'#objectOutput\').text(JSON.stringify(arrayData, null, 2));' },
                    { code: '  });' },
                    { code: '});' }
                  ]}
                  language="javascript"
                />
              </div>
            </div>
          </ConceptInfoCard>

          <div className="mt-8">
            <ConceptInfoCard>
              <h4 className="font-semibold mb-4">Step-by-Step jQuery Explanation:</h4>
              <StepThroughCodeAnimation
                code={[
                  '$(document).ready(function() {',
                  '  // Update on any checkbox change',
                  '  $(\'#hobbiesForm input[type="checkbox"]\').on(\'change\', function() {',
                  '    // Get URL-encoded string',
                  '    const serialized = $(\'#hobbiesForm\').serialize();',
                  '    $(\'#serializedOutput\').text(serialized);',
                  '',
                  '    // Get array of selected hobbies',
                  '    const selectedHobbies = $(\'#hobbiesForm input:checked\')',
                  '      .map(function() {',
                  '        return $(this).val();',
                  '      })',
                  '      .get();',
                  '',
                  '    // Display array format',
                  '    $(\'#arrayOutput\').text(',
                  '      JSON.stringify(selectedHobbies, null, 2)',
                  '    );',
                  '',
                  '    // Get as array of objects',
                  '    const arrayData = $(\'#hobbiesForm\').serializeArray();',
                  '',
                  '    // Convert to a more useful format',
                  '    const formObject = {};',
                  '    $.each(arrayData, function() {',
                  '      if (formObject[this.name]) {',
                  '        if (!Array.isArray(formObject[this.name])) {',
                  '          formObject[this.name] = [formObject[this.name]];',
                  '        }',
                  '        formObject[this.name].push(this.value);',
                  '      } else {',
                  '        formObject[this.name] = this.value;',
                  '      }',
                  '    });',
                  '',
                  '    // Display object format',
                  '    $(\'#objectOutput\').text(',
                  '      JSON.stringify(formObject, null, 2)',
                  '    );',
                  '  });',
                  '});'
                ]}
                steps={[
                  {
                    label: 'Document Ready Setup',
                    desc: 'Just like before, we wait for the page to load before running any code. This ensures all our checkboxes and other form elements exist and are ready to use.',
                    highlight: '$(document).ready(function() {'
                  },
                  {
                    label: 'Watch for Changes',
                    desc: 'We use a specific selector to find only checkbox inputs inside the hobbies form. When any of these checkboxes is clicked (changing its state), our code will run.',
                    highlight: '  $(\'#hobbiesForm input[type="checkbox"]\').on(\'change\', function() {'
                  },
                  {
                    label: 'Basic Serialization',
                    desc: 'The serialize() method is the simplest way to get form data. It creates a URL-friendly string like "hobby=Reading&hobby=Gaming". This format is perfect for sending data to a server.',
                    highlight: ['    const serialized = $(\'#hobbiesForm\').serialize();', '    $(\'#serializedOutput\').text(serialized);']
                  },
                  {
                    label: 'Find Checked Boxes',
                    desc: 'input:checked is a special jQuery selector that finds only checked checkboxes. This is how we get just the hobbies the user has selected.',
                    highlight: '    const selectedHobbies = $(\'#hobbiesForm input:checked\')'
                  },
                  {
                    label: 'Extract Values',
                    desc: 'The map() function transforms each checkbox into its value. For example, if "Reading" and "Gaming" are checked, we\'ll get those strings.',
                    highlight: ['      .map(function() {', '        return $(this).val();', '      })']
                  },
                  {
                    label: 'Convert to Array',
                    desc: 'jQuery\'s map() creates a special jQuery object. The get() method converts it into a regular JavaScript array that\'s easier to work with.',
                    highlight: '      .get();'
                  },
                  {
                    label: 'Format Array Display',
                    desc: 'JSON.stringify makes our array look nice when displayed. The null, 2 parameters add proper spacing and line breaks so it\'s easy to read.',
                    highlight: ['    $(\'#arrayOutput\').text(', '      JSON.stringify(selectedHobbies, null, 2)', '    );']
                  },
                  {
                    label: 'Advanced Serialization',
                    desc: 'serializeArray() is more powerful than serialize(). It creates an array of objects, where each object has the input\'s name and value. This gives us more detailed information about the form.',
                    highlight: '    const arrayData = $(\'#hobbiesForm\').serializeArray();'
                  },
                  {
                    label: 'Create Result Object',
                    desc: 'We start with an empty object that will hold our organized form data. This will group multiple values for the same field together.',
                    highlight: ['    const formObject = {};', '    $.each(arrayData, function() {']
                  },
                  {
                    label: 'Check for Existing Values',
                    desc: 'If we\'ve seen this field name before (like multiple checked hobbies), we need to handle it specially to group the values together.',
                    highlight: '      if (formObject[this.name]) {'
                  },
                  {
                    label: 'Convert to Array if Needed',
                    desc: 'The first time we find a duplicate, we need to convert the existing single value into an array so we can add more values to it.',
                    highlight: ['        if (!Array.isArray(formObject[this.name])) {', '          formObject[this.name] = [formObject[this.name]];', '        }']
                  },
                  {
                    label: 'Add to Array',
                    desc: 'Once we have an array for this field, we can add the new value to it. This lets us collect all values for fields that can have multiple selections.',
                    highlight: '        formObject[this.name].push(this.value);'
                  },
                  {
                    label: 'Handle First Value',
                    desc: 'If this is the first time we\'ve seen this field name, we just store its value directly. It might become an array later if we find more values.',
                    highlight: ['      } else {', '        formObject[this.name] = this.value;', '      }']
                  },
                  {
                    label: 'Display Final Object',
                    desc: 'Finally, we show the organized data structure. This format is often the most useful for JavaScript processing because it groups related values together.',
                    highlight: ['    $(\'#objectOutput\').text(', '      JSON.stringify(formObject, null, 2)', '    );']
                  }
                ]}
              />
            </ConceptInfoCard>
          </div>
        </Section>

        <Section title="jQuery Form Methods Reference">
          <p className="mb-4">
            Here are the key jQuery methods used for form handling:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Getting Values</h4>
              <CodeSnippet
                lines={[
                  { code: '// Get single value' },
                  { code: 'let name = $(\'#nameInput\').val();' },
                  { code: '' },
                  { code: '// Get checkbox state' },
                  { code: 'let isChecked = $(\'#checkbox\').is(\':checked\');' },
                  { code: '' },
                  { code: '// Get radio value' },
                  { code: 'let selected = $(\'input[name="choice"]:checked\').val();' }
                ]}
                language="javascript"
              />
            </div>

            <div>
              <h4 className="font-semibold">Form Events</h4>
              <CodeSnippet
                lines={[
                  { code: '// On submit' },
                  { code: '$(\'#myForm\').on(\'submit\', function(e) { ... });' },
                  { code: '' },
                  { code: '// On change' },
                  { code: '$(\'#input\').on(\'change\', function() { ... });' },
                  { code: '' },
                  { code: '// On input (real-time)' },
                  { code: '$(\'#input\').on(\'input\', function() { ... });' }
                ]}
                language="javascript"
              />
            </div>

            <div>
              <h4 className="font-semibold">Serialization</h4>
              <CodeSnippet
                lines={[
                  { code: '// Get URL-encoded string' },
                  { code: 'let str = $(\'#myForm\').serialize();' },
                  { code: '' },
                  { code: '// Get array of objects' },
                  { code: 'let arr = $(\'#myForm\').serializeArray();' }
                ]}
                language="javascript"
              />
            </div>
          </div>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
} 