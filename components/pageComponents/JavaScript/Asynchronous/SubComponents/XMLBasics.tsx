import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';

const XMLBasics: React.FC = () => {
  const xmlStructureCode = `<?xml version="1.0" encoding="UTF-8"?>
<students>
  <student id="001">
    <name>John Doe</name>
    <age>20</age>
    <courses>
      <course code="CS101">
        <title>Introduction to Programming</title>
        <credits>3</credits>
      </course>
      <course code="MATH201">
        <title>Calculus I</title>
        <credits>4</credits>
      </course>
    </courses>
    <address>
      <street>123 Main St</street>
      <city>Anytown</city>
      <state>NY</state>
      <zip>12345</zip>
    </address>
  </student>
  <student id="002">
    <name>Jane Smith</name>
    <age>19</age>
    <courses>
      <course code="ENG101">
        <title>English Composition</title>
        <credits>3</credits>
      </course>
    </courses>
  </student>
</students>`;

  const xmlParsingCode = `// JavaScript XML parsing example
const xmlString = \`<?xml version="1.0"?>
<book>
  <title>JavaScript Guide</title>
  <author>John Doe</author>
  <price currency="USD">29.99</price>
</book>\`;

// Parse XML string
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xmlString, "text/xml");

// Extract data from XML
const title = xmlDoc.querySelector('title').textContent;
const author = xmlDoc.querySelector('author').textContent;
const priceElement = xmlDoc.querySelector('price');
const price = priceElement.textContent;
const currency = priceElement.getAttribute('currency');

console.log(\`Title: \${title}\`);       // "JavaScript Guide"
console.log(\`Author: \${author}\`);     // "John Doe"
console.log(\`Price: \${price} \${currency}\`); // "29.99 USD"`;

  const xmlNamespaceCode = `<?xml version="1.0"?>
<library xmlns:book="http://example.com/book"
         xmlns:author="http://example.com/author">
  <book:catalog>
    <book:item id="1">
      <book:title>Web Development</book:title>
      <author:name>
        <author:first>Jane</author:first>
        <author:last>Smith</author:last>
      </author:name>
      <book:price currency="USD">39.99</book:price>
    </book:item>
  </book:catalog>
</library>`;

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>XML (eXtensible Markup Language)</strong> is a markup language that defines rules for encoding documents in a format that is both human-readable and machine-readable. It's widely used for data storage and transmission.
      </p>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Basic XML Structure
        </Typography>
        <CodePartsExplanation 
          code={xmlStructureCode}
          parts={[
            {
              label: 'XML Declaration',
              part: '<?xml version="1.0" encoding="UTF-8"?>',
              color: '#9c27b0',
              desc: 'Specifies XML version and character encoding'
            },
            {
              label: 'Root Element',
              part: '<students>',
              color: '#2196f3',
              desc: 'Every XML document must have exactly one root element'
            },
            {
              label: 'Attributes',
              part: 'id="001"',
              color: '#ff9800',
              desc: 'Additional information about elements stored as key-value pairs'
            },
            {
              label: 'Nested Elements',
              part: '<courses>\n      <course',
              color: '#4caf50',
              desc: 'Elements can contain other elements creating hierarchical structure'
            },
            {
              label: 'Text Content',
              part: '<name>John Doe</name>',
              color: '#f44336',
              desc: 'Elements can contain text data between opening and closing tags'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          XML Parsing in JavaScript
        </Typography>
        <CodePartsExplanation 
          code={xmlParsingCode}
          parts={[
            {
              label: 'DOMParser',
              part: 'new DOMParser()',
              color: '#673ab7',
              desc: 'Built-in browser API for parsing XML strings'
            },
            {
              label: 'Parse Method',
              part: 'parseFromString(xmlString, "text/xml")',
              color: '#3f51b5',
              desc: 'Convert XML string into a DOM document object'
            },
            {
              label: 'Query Elements',
              part: 'querySelector(\'title\')',
              color: '#009688',
              desc: 'Use CSS selectors to find elements in parsed XML'
            },
            {
              label: 'Get Attributes',
              part: 'getAttribute(\'currency\')',
              color: '#795548',
              desc: 'Extract attribute values from XML elements'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          XML Namespaces
        </Typography>
        <CodePartsExplanation 
          code={xmlNamespaceCode}
          parts={[
            {
              label: 'Namespace Declaration',
              part: 'xmlns:book="http://example.com/book"',
              color: '#e91e63',
              desc: 'Declare namespace prefixes to avoid element name conflicts'
            },
            {
              label: 'Prefixed Elements',
              part: '<book:title>',
              color: '#ff5722',
              desc: 'Use namespace prefixes to specify which namespace elements belong to'
            }
          ]}
        />
      </Box>

      {/* XML Rules */}
      <Box sx={{ 
        p: 3, 
        bgcolor: '#f0f7ff', 
        borderRadius: 2, 
        border: '1px solid #e3f2fd',
        mt: 4,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1565c0', display: 'flex', alignItems: 'center', gap: 1 }}>
          📏 XML Syntax Rules
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: '#424242' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Well-formed:</Typography> All tags must be properly closed and nested</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Case-sensitive:</Typography> {'<Title>'} and {'<title>'} are different elements</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Quoted attributes:</Typography> All attribute values must be in quotes</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Single root:</Typography> Document can have only one root element</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Reserved characters:</Typography> {'<, >, &, \', "'} must be escaped in content</li>
        </Box>
      </Box>

      {/* XML Advantages */}
      <Box sx={{ 
        p: 3, 
        bgcolor: '#f8f9fa', 
        borderRadius: 2, 
        border: '1px solid #dee2e6',
        mt: 3,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#495057', display: 'flex', alignItems: 'center', gap: 1 }}>
          ✅ XML Advantages
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: '#495057' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#28a745' }}>Self-documenting:</Typography> Tag names describe the data they contain</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#28a745' }}>Hierarchical:</Typography> Natural representation of nested relationships</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#28a745' }}>Extensible:</Typography> Can add new elements without breaking existing parsers</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#28a745' }}>Validation:</Typography> Can use schemas (XSD) to validate structure</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#28a745' }}>Namespace support:</Typography> Avoid naming conflicts in complex documents</li>
        </Box>
      </Box>
    </div>
  );
};

export default XMLBasics;