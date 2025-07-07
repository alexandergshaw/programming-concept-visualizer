import CodeSnippet from '../../common/CodeSnippet';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

export default function JQueryIntroduction() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="body2">
        jQuery makes JavaScript easier to write. It's like a toolkit that helps you do common tasks with
        less code. Instead of writing lots of complicated JavaScript, jQuery lets you write simple commands
        to make things happen on your webpage.
      </Typography>

      <Box>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Why Use jQuery?
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body2"><strong>Works everywhere:</strong> Your code works the same in all browsers</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body2"><strong>Easy to use:</strong> Change webpage content with simple commands</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body2"><strong>Click handling made simple:</strong> Respond to clicks and other actions easily</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body2"><strong>Get data easily:</strong> Load information from servers without refreshing the page</Typography>}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary={<Typography variant="body2"><strong>Cool effects:</strong> Add animations with just one line of code</Typography>}
            />
          </ListItem>
        </List>
      </Box>

      <Box>
        <Typography variant="subtitle1" gutterBottom fontWeight="medium">
          Common JavaScript vs jQuery Patterns
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              1. Document Ready
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography variant="body2" gutterBottom color="text.secondary">Regular JavaScript:</Typography>
                <CodeSnippet
                  lines={[
                    { code: 'document.addEventListener(\'DOMContentLoaded\', function() {' },
                    { code: '  // Your code here' },
                    { code: '});' }
                  ]}
                />
              </Box>
              <Box>
                <Typography variant="body2" gutterBottom color="text.secondary">jQuery:</Typography>
                <CodeSnippet
                  lines={[
                    { code: '$(document).ready(function() {' },
                    { code: '  // Your code here' },
                    { code: '});' },
                    { code: '' },
                    { code: '// Or shorter version:' },
                    { code: '$(function() {' },
                    { code: '  // Your code here' },
                    { code: '});' }
                  ]}
                />
              </Box>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              2. Event Handling
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography variant="body2" gutterBottom color="text.secondary">Regular JavaScript:</Typography>
                <CodeSnippet
                  lines={[
                    { code: '// Click event' },
                    { code: 'element.addEventListener(\'click\', function(e) {' },
                    { code: '  e.preventDefault();' },
                    { code: '});' },
                    { code: '' },
                    { code: '// Hover events' },
                    { code: 'element.addEventListener(\'mouseenter\', function() {});' },
                    { code: 'element.addEventListener(\'mouseleave\', function() {});' },
                    { code: '' },
                    { code: '// Form submit' },
                    { code: 'form.addEventListener(\'submit\', function(e) {' },
                    { code: '  e.preventDefault();' },
                    { code: '});' }
                  ]}
                />
              </Box>
              <Box>
                <Typography variant="body2" gutterBottom color="text.secondary">jQuery:</Typography>
                <CodeSnippet
                  lines={[
                    { code: '// Click event' },
                    { code: '$(\'element\').click(function(e) {' },
                    { code: '  e.preventDefault();' },
                    { code: '});' },
                    { code: '' },
                    { code: '// Hover events' },
                    { code: '$(\'element\').hover(' },
                    { code: '  function() {}, // mouseenter' },
                    { code: '  function() {}  // mouseleave' },
                    { code: ');' },
                    { code: '' },
                    { code: '// Form submit' },
                    { code: '$(\'form\').submit(function(e) {' },
                    { code: '  e.preventDefault();' },
                    { code: '});' }
                  ]}
                />
              </Box>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              3. DOM Manipulation
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography variant="body2" gutterBottom color="text.secondary">Regular JavaScript:</Typography>
                <CodeSnippet
                  lines={[
                    { code: '// Add/remove classes' },
                    { code: 'element.classList.add(\'active\');' },
                    { code: 'element.classList.remove(\'active\');' },
                    { code: 'element.classList.toggle(\'active\');' },
                    { code: '' },
                    { code: '// Change HTML content' },
                    { code: 'element.innerHTML = \'<span>New content</span>\';' },
                    { code: '' },
                    { code: '// Change text content' },
                    { code: 'element.textContent = \'New text\';' },
                    { code: '' },
                    { code: '// Change styles' },
                    { code: 'element.style.display = \'none\';' },
                    { code: 'element.style.backgroundColor = \'red\';' }
                  ]}
                />
              </Box>
              <Box>
                <Typography variant="body2" gutterBottom color="text.secondary">jQuery:</Typography>
                <CodeSnippet
                  lines={[
                    { code: '// Add/remove classes' },
                    { code: '$(\'element\').addClass(\'active\');' },
                    { code: '$(\'element\').removeClass(\'active\');' },
                    { code: '$(\'element\').toggleClass(\'active\');' },
                    { code: '' },
                    { code: '// Change HTML content' },
                    { code: '$(\'element\').html(\'<span>New content</span>\');' },
                    { code: '' },
                    { code: '// Change text content' },
                    { code: '$(\'element\').text(\'New text\');' },
                    { code: '' },
                    { code: '// Change styles' },
                    { code: '$(\'element\').hide();' },
                    { code: '$(\'element\').css(\'background-color\', \'red\');' }
                  ]}
                />
              </Box>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              4. AJAX Requests
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <Box>
                <Typography variant="body2" gutterBottom color="text.secondary">Regular JavaScript:</Typography>
                <CodeSnippet
                  lines={[
                    { code: 'fetch(\'/api/data\')' },
                    { code: '  .then(response => response.json())' },
                    { code: '  .then(data => {' },
                    { code: '    console.log(data);' },
                    { code: '  })' },
                    { code: '  .catch(error => {' },
                    { code: '    console.error(\'Error:\', error);' },
                    { code: '  });' }
                  ]}
                />
              </Box>
              <Box>
                <Typography variant="body2" gutterBottom color="text.secondary">jQuery:</Typography>
                <CodeSnippet
                  lines={[
                    { code: '$.ajax({' },
                    { code: '  url: \'/api/data\',' },
                    { code: '  method: \'GET\',' },
                    { code: '  success: function(data) {' },
                    { code: '    console.log(data);' },
                    { code: '  },' },
                    { code: '  error: function(xhr, status, error) {' },
                    { code: '    console.error(\'Error:\', error);' },
                    { code: '  }' },
                    { code: '});' }
                  ]}
                />
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Typography variant="body2">
        As you can see, jQuery makes your code shorter and easier to read. While modern JavaScript has
        gotten better, many developers still use jQuery because it's simple and gets the job done quickly.
      </Typography>
    </Box>
  );
} 