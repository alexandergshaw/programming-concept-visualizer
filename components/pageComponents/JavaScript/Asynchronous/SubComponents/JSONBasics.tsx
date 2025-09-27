import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';

const JSONBasics: React.FC = () => {
  const jsonStructureCode = `{
  "students": [
    {
      "id": "001",
      &quot;name&quot;: "John Doe",
      &quot;age&quot;: 20,
      "courses": [
        {
          "code": "CS101",
          "title": "Introduction to Programming",
          "credits": 3
        },
        {
          "code": "MATH201",
          "title": "Calculus I",
          "credits": 4
        }
      ],
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "state": "NY",
        "zip": "12345"
      },
      "isActive": true,
      "graduationDate": null
    },
    {
      "id": "002",
      &quot;name&quot;: "Jane Smith",
      &quot;age&quot;: 19,
      "courses": [
        {
          "code": "ENG101",
          "title": "English Composition",
          "credits": 3
        }
      ],
      "address": null,
      "isActive": false
    }
  ]
}`;

  const jsonParsingCode = `// JavaScript JSON parsing example
const jsonString = \`{
  "book": {
    "title": "JavaScript Guide",
    "author": "John Doe", 
    "price": 29.99,
    "currency": "USD",
    "available": true,
    "tags": ["programming", "javascript", "web"]
  }
}\`;

// Parse JSON string to JavaScript object
const data = JSON.parse(jsonString);

// Access data properties
const book = data.book;
console.log(\`Title: \${book.title}\`);           // "JavaScript Guide"
console.log(\`Author: \${book.author}\`);         // "John Doe"
console.log(\`Price: \${book.price} \${book.currency}\`); // "29.99 USD"
console.log(\`Available: \${book.available}\`);   // true
console.log(\`Tags: \${book.tags.join(', ')}\`);  // "programming, javascript, web"

// Convert JavaScript object back to JSON string
const bookObject = {
  title: "Advanced JavaScript",
  author: "Jane Smith",
  chapters: ["Closures", "Promises", "Modules"],
  metadata: {
    pages: 350,
    isbn: "978-1234567890"
  }
};

const jsonOutput = JSON.stringify(bookObject, null, 2);
console.log(jsonOutput);`;

  const jsonDataTypesCode = `{
  // String values - must be in double quotes
  &quot;name&quot;: "John Doe",
  "description": "A student in the computer science program",
  
  // Number values - integers or floating-point
  &quot;age&quot;: 25,
  "gpa": 3.75,
  "negativeBalance": -150.50,
  
  // Boolean values
  "isEnrolled": true,
  "hasGraduated": false,
  
  // Null value
  "middleName": null,
  
  // Array values - ordered list
  "courses": ["Math", "Physics", "Chemistry"],
  "grades": [85, 92, 78, 95],
  "mixedArray": ["text", 123, true, null],
  
  // Object values - nested key-value pairs
  "address": {
    "street": "123 Main St",
    "city": "Boston",
    "coordinates": {
      "latitude": 42.3601,
      "longitude": -71.0589
    }
  },
  
  // Array of objects
  "transcripts": [
    {
      "semester": "Fall 2023",
      "courses": 4,
      "gpa": 3.8
    },
    {
      "semester": "Spring 2024", 
      "courses": 5,
      "gpa": 3.7
    }
  ]
}`;

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>JSON (JavaScript Object Notation)</strong> is a lightweight, text-based data interchange format. Despite its name, JSON is language-independent and is widely used for data exchange between servers and web applications.
      </p>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          JSON Structure and Syntax
        </Typography>
        <CodePartsExplanation 
          code={jsonStructureCode}
          parts={[
            {
              label: 'Root Object',
              part: '{\n  "students"',
              color: '#2196f3',
              desc: 'JSON document starts with a root object or array'
            },
            {
              label: 'Arrays',
              part: '"students": [',
              color: '#4caf50',
              desc: 'Square brackets define ordered lists of values'
            },
            {
              label: 'Objects',
              part: '{\n      "id": "001"',
              color: '#ff9800',
              desc: 'Curly braces define collections of key-value pairs'
            },
            {
              label: 'String Keys',
              part: '&quot;name&quot;: "John Doe"',
              color: '#f44336',
              desc: 'All keys must be strings enclosed in double quotes'
            },
            {
              label: 'Nested Objects',
              part: '"address": {\n        "street"',
              color: '#9c27b0',
              desc: 'Objects can contain other objects for hierarchical data'
            },
            {
              label: 'Null Values',
              part: '"graduationDate": null',
              color: '#607d8b',
              desc: 'Use null to represent empty or missing values'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          JSON Parsing and Stringifying
        </Typography>
        <CodePartsExplanation 
          code={jsonParsingCode}
          parts={[
            {
              label: 'JSON.parse()',
              part: 'JSON.parse(jsonString)',
              color: '#3f51b5',
              desc: 'Convert JSON string to JavaScript object'
            },
            {
              label: 'Property Access',
              part: 'data.book.title',
              color: '#009688',
              desc: 'Access object properties using dot notation'
            },
            {
              label: 'Array Methods',
              part: 'book.tags.join(\', \')',
              color: '#795548',
              desc: 'Arrays in parsed JSON work like regular JavaScript arrays'
            },
            {
              label: 'JSON.stringify()',
              part: 'JSON.stringify(bookObject, null, 2)',
              color: '#e91e63',
              desc: 'Convert JavaScript object to JSON string (null=no filter, 2=indent)'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          JSON Data Types
        </Typography>
        <CodePartsExplanation 
          code={jsonDataTypesCode}
          parts={[
            {
              label: 'Strings',
              part: '&quot;name&quot;: "John Doe"',
              color: '#ff5722',
              desc: 'Text values must be enclosed in double quotes'
            },
            {
              label: 'Numbers',
              part: '&quot;age&quot;: 25',
              color: '#673ab7',
              desc: 'Integers and floating-point numbers (no quotes needed)'
            },
            {
              label: 'Booleans',
              part: '"isEnrolled": true',
              color: '#4caf50',
              desc: 'true or false values (lowercase, no quotes)'
            },
            {
              label: 'Arrays',
              part: '"courses": ["Math", "Physics"]',
              color: '#ff9800',
              desc: 'Ordered lists of values of any type'
            },
            {
              label: 'Nested Objects',
              part: '"address": {\n    "street"',
              color: '#2196f3',
              desc: 'Objects can contain other objects for complex structures'
            }
          ]}
        />
      </Box>

      {/* JSON Rules */}
      <Box sx={{ 
        p: 3, 
        bgcolor: '#fff3e0', 
        borderRadius: 2, 
        border: '1px solid #ffcc02',
        mt: 4,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#e65100', display: 'flex', alignItems: 'center', gap: 1 }}>
          📏 JSON Syntax Rules
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: '#424242' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#f57c00' }}>Double quotes only:</Typography> Strings must use double quotes, not single quotes</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#f57c00' }}>No trailing commas:</Typography> Last item in object or array cannot have comma</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#f57c00' }}>No comments:</Typography> JSON does not support comments or remarks</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#f57c00' }}>No undefined:</Typography> Use null instead of undefined values</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#f57c00' }}>No functions:</Typography> Cannot store function definitions in JSON</li>
        </Box>
      </Box>

      {/* JSON Advantages */}
      <Box sx={{ 
        p: 3, 
        bgcolor: '#e8f5e8', 
        borderRadius: 2, 
        border: '1px solid #4caf50',
        mt: 3,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#2e7d32', display: 'flex', alignItems: 'center', gap: 1 }}>
          ✅ JSON Advantages
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: '#424242' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#388e3c' }}>Lightweight:</Typography> More compact than XML, faster to parse and transfer</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#388e3c' }}>Native JavaScript:</Typography> Direct mapping to JavaScript objects and arrays</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#388e3c' }}>Human-readable:</Typography> Easy to read and write by developers</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#388e3c' }}>Wide support:</Typography> Supported by virtually all programming languages</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#388e3c' }}>RESTful APIs:</Typography> Standard format for web API responses</li>
        </Box>
      </Box>
    </div>
  );
};

export default JSONBasics;