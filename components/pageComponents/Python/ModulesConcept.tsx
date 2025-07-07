'use client';

import { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import Typography from '@mui/material/Typography';
import CodeSnippet from '../../common/CodeSnippet';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';
import TableOfContents from '@/components/common/TableOfContents';

export default function ModulesConcept() {
  const moduleImportCode = [
    'import math',
    'from datetime import datetime',
    'from random import randint as random_int',
    'from os import *  # Not recommended',
    '',
    '# Using the imported modules',
    'print(math.pi)',
    'print(datetime.now())',
    'print(random_int(1, 10))'
  ];

  const moduleImportSteps = [
    {
      label: 'Basic Import',
      desc: 'Import an entire module using its name',
      highlight: 'import math'
    },
    {
      label: 'Specific Import',
      desc: 'Import a specific class from a module',
      highlight: 'from datetime import datetime'
    },
    {
      label: 'Alias Import',
      desc: 'Import with an alias using "as"',
      highlight: 'from random import randint as random_int'
    },
    {
      label: 'Wildcard Import',
      desc: 'Import everything (not recommended)',
      highlight: 'from os import *  # Not recommended'
    },
    {
      label: 'Usage',
      desc: 'Using the imported functionality',
      highlight: ['print(math.pi)', 'print(datetime.now())', 'print(random_int(1, 10))']
    }
  ];

  const customModuleCode = [
    '# helpers.py',
    'def greet(name):',
    '    return f&quot;Hello, {name}!&quot;',
    '',
    'PI = 3.14159',
    '',
    '# main.py',
    'import helpers',
    '',
    'print(helpers.greet(&quot;Alice&quot;))',
    'print(f&quot;PI is {helpers.PI}&quot;)'
  ];

  const customModuleSteps = [
    {
      label: 'Module Creation',
      desc: 'Create a new Python file for your module',
      highlight: '# helpers.py'
    },
    {
      label: 'Define Functions',
      desc: 'Add functions to your module',
      highlight: ['def greet(name):', '    return f&quot;Hello, {name}!&quot;']
    },
    {
      label: 'Define Constants',
      desc: 'Add constants or variables to your module',
      highlight: 'PI = 3.14159'
    },
    {
      label: 'Import Module',
      desc: 'Import your custom module in another file',
      highlight: 'import helpers'
    },
    {
      label: 'Use Module',
      desc: 'Access functions and variables from your module',
      highlight: ['print(helpers.greet(&quot;Alice&quot;))', 'print(f&quot;PI is {helpers.PI}&quot;)']
    }
  ];

  return (
    <ConceptWrapper
      title="Python Modules"
      description="Learn how to use and create Python modules to organize your code"
    >
      <TableOfContents numbered>
        <Section title="Video Overview">
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.25%',
              paddingBottom: 0,
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: '8px',
              willChange: 'transform'
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0
              }}
              src="https://www.canva.com/design/DAGscRZwyag/2TVpDdlLEzkEt862AHkYNA/watch?embed"
              allowFullScreen={true}
              allow="fullscreen"
            >
            </iframe>
          </div>
        </Section>
        <Section title="What are Modules?">
          <Typography variant="body2" paragraph>
            Modules are files containing Python code. They let you organize related code into files that can be reused across your projects.
            Think of modules like chapters in a book - they help organize related content together.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Module Benefits
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>1. Code Organization:</strong> Keep related code together in separate files
              </Typography>
              <Typography variant="body2">
                <strong>2. Code Reuse:</strong> Use the same code across different projects
              </Typography>
              <Typography variant="body2">
                <strong>3. Namespace Management:</strong> Avoid naming conflicts between different parts of your program
              </Typography>
              <Typography variant="body2">
                <strong>4. Maintainability:</strong> Easier to update and maintain smaller, focused files
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Box sx={{ my: 4 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Using Built-in Modules
            </Typography>
            <ConceptInfoCard>
              <Typography variant="body2" paragraph>
                Python comes with many built-in modules. Here's how to use them:
              </Typography>
              <StepThroughCodeAnimation
                code={moduleImportCode}
                steps={moduleImportSteps}
              />
            </ConceptInfoCard>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Creating Your Own Module
            </Typography>
            <ConceptInfoCard>
              <Typography variant="body2" paragraph>
                You can create your own modules to organize and share your code:
              </Typography>
              <StepThroughCodeAnimation
                code={customModuleCode}
                steps={customModuleSteps}
              />
            </ConceptInfoCard>
          </Box>
        </Section>

        <Section title="Module Import Patterns">
          <Typography variant="body2" paragraph>
            There are several ways to import modules and their contents. Each has its own use case.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Import Patterns
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>Basic Import:</strong> Import the entire module
              </Typography>
              <CodeSnippet
                lines={[
                  { code: 'import math' },
                  { code: 'print(math.pi)  # Access with module name' }
                ]}
                language="python"
              />

              <Typography variant="body2">
                <strong>From Import:</strong> Import specific items
              </Typography>
              <CodeSnippet
                lines={[
                  { code: 'from math import pi, sqrt' },
                  { code: 'print(pi)  # Use directly without module name' }
                ]}
                language="python"
              />

              <Typography variant="body2">
                <strong>Alias Import:</strong> Import with a different name
              </Typography>
              <CodeSnippet
                lines={[
                  { code: 'import numpy as np' },
                  { code: 'print(np.array([1, 2, 3]))  # Use the alias' }
                ]}
                language="python"
              />
            </Box>
          </ConceptInfoCard>

          <Alert severity="warning" sx={{ mt: 4 }}>
            <Typography variant="body2">
              Avoid using `from module import *` as it can lead to naming conflicts and make code harder to understand.
              It&apos;s better to be explicit about what you&apos;re importing.
            </Typography>
          </Alert>
        </Section>

        <Section title="Module Search Path">
          <Typography variant="body2" paragraph>
            Python looks for modules in several locations. Understanding this can help you organize your code and troubleshoot import issues.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Where Python Looks for Modules
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>1. Current Directory:</strong> The folder containing your script
              </Typography>
              <Typography variant="body2">
                <strong>2. PYTHONPATH:</strong> Environment variable containing additional directories
              </Typography>
              <Typography variant="body2">
                <strong>3. Standard Library Directories:</strong> Built-in Python modules
              </Typography>
              <CodeSnippet
                lines={[
                  { code: 'import sys' },
                  { code: '' },
                  { code: '# Print all module search locations' },
                  { code: 'for path in sys.path:' },
                  { code: '    print(path)' },
                  { code: '' },
                  { code: '# Add a custom search path' },
                  { code: 'sys.path.append("/path/to/your/modules")' }
                ]}
                language="python"
              />
            </Box>
          </ConceptInfoCard>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
} 