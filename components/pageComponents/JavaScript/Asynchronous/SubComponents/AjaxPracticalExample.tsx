import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import StepThroughCodeAnimation, { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const AjaxPracticalExample: React.FC = () => {
  const practicalCode = `// Complete Ajax Example: Dynamic User Search
const searchInput = document.getElementById('search');
const resultsContainer = document.getElementById('results');
const loadingSpinner = document.getElementById('loading');

async function searchUsers(query) {
  // Show loading state
  loadingSpinner.style.display = 'block';
  resultsContainer.innerHTML = '';
  
  try {
    // Make API request
    const response = await fetch(\`/api/users/search?q=\${encodeURIComponent(query)}\`);
    
    if (!response.ok) {
      throw new Error(\`Search failed: \${response.status}\`);
    }
    
    const users = await response.json();
    
    // Hide loading state
    loadingSpinner.style.display = 'none';
    
    // Update page with results
    if (users.length === 0) {
      resultsContainer.innerHTML = '<p>No users found</p>';
    } else {
      displayUsers(users);
    }
    
  } catch (error) {
    loadingSpinner.style.display = 'none';
    resultsContainer.innerHTML = '<p>Error loading users</p>';
    console.error('Search error:', error);
  }
}

function displayUsers(users) {
  const userHTML = users.map(user => \`
    <div class="user-card">
      <img src="\${user.avatar}" alt="\${user.name}">
      <h5>\${user.name}</h5>
      <p>\${user.email}</p>
    </div>
  \`).join('');
  
  resultsContainer.innerHTML = userHTML;
}

// Add event listener for live search
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (query.length > 2) {
    searchUsers(query);
  }
});`;

  const codeParts: CodePart[] = [
    {
      label: 'API Request',
      part: 'fetch(`/api/users/search?q=${encodeURIComponent(query)}`)',
      color: '#e91e63',
      desc: 'Make HTTP request with search query parameter'
    },
    {
      label: 'Loading State',
      part: 'loadingSpinner.style.display = \'block\'',
      color: '#4caf50',
      desc: 'Show visual feedback while request is processing'
    },
    {
      label: 'DOM Updates',
      part: 'resultsContainer.innerHTML = userHTML',
      color: '#ff9800',
      desc: 'Update page content without full reload'
    },
    {
      label: 'Error Handling',
      part: 'catch (error)',
      color: '#f44336',
      desc: 'Handle network errors and show user-friendly messages'
    }
  ];

  const ajaxSteps: Step[] = [
    {
      label: "User Types",
      desc: "User enters search query in input field",
      highlight: "searchInput.addEventListener('input')"
    },
    {
      label: "Show Loading", 
      desc: "Display loading spinner for better UX",
      highlight: "loadingSpinner.style.display = 'block'"
    },
    {
      label: "Make Request",
      desc: "Send Ajax request to search API endpoint",
      highlight: "fetch(`/api/users/search?q=${query}`)"
    },
    {
      label: "Process Response",
      desc: "Parse JSON response and handle any errors",
      highlight: "const users = await response.json()"
    },
    {
      label: "Update UI",
      desc: "Replace page content with search results",
      highlight: "resultsContainer.innerHTML = userHTML"
    }
  ];

  const formSubmissionCode = `// Ajax Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent page reload
  
  const formData = new FormData(contactForm);
  const submitButton = contactForm.querySelector('button[type="submit"]');
  
  // Disable button during submission
  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      showSuccessMessage('Message sent successfully!');
      contactForm.reset();
    } else {
      showErrorMessage('Failed to send message');
    }
  } catch (error) {
    showErrorMessage('Network error occurred');
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
  }
});`;

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        Let's build a complete Ajax application that demonstrates real-world patterns: <strong>dynamic search with live results</strong>. This shows how Ajax creates smooth, responsive user experiences.
      </p>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Complete Dynamic Search Example
        </Typography>
        <CodePartsExplanation 
          code={practicalCode}
          parts={codeParts}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ajax Workflow Step by Step
        </Typography>
        <StepThroughCodeAnimation
          code={[
            "searchInput.addEventListener('input')",
            "loadingSpinner.style.display = 'block'",
            "fetch(`/api/users/search?q=${query}`)",
            "const users = await response.json()",
            "resultsContainer.innerHTML = userHTML"
          ]}
          steps={ajaxSteps}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ajax Form Submission
        </Typography>
        <CodePartsExplanation 
          code={formSubmissionCode}
          parts={[
            {
              label: 'Prevent Default',
              part: 'e.preventDefault()',
              color: '#9c27b0',
              desc: 'Stop normal form submission to handle with Ajax'
            },
            {
              label: 'Form Data',
              part: 'new FormData(contactForm)',
              color: '#2196f3',
              desc: 'Collect all form fields into FormData object'
            },
            {
              label: 'User Feedback',
              part: 'submitButton.disabled = true',
              color: '#ff5722',
              desc: 'Provide visual feedback during submission'
            }
          ]}
        />
      </Box>

      {/* Key Concepts */}
      <Box sx={{ 
        p: 3, 
        bgcolor: '#f8fafc', 
        borderRadius: 2, 
        border: '1px solid #e2e8f0',
        mt: 4,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          🔑 Ajax Best Practices
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: '#475569' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Loading states:</Typography> Always show feedback during requests (spinners, disabled buttons)</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Error handling:</Typography> Gracefully handle network errors and show user-friendly messages</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Progressive enhancement:</Typography> Ensure basic functionality works without JavaScript</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Debouncing:</Typography> For search, wait for user to stop typing before making requests</li>
        </Box>
      </Box>
    </div>
  );
};

export default AjaxPracticalExample;