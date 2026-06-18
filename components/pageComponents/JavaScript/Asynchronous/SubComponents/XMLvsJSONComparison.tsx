import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import FlexibleGrid from '@/components/common/FlexibleGrid';

const XMLvsJSONComparison: React.FC = () => {
  const xmlExampleCode = `<?xml version="1.0" encoding="UTF-8"?>
<library>
  <book id="1" isbn="978-1234567890">
    <title>JavaScript: The Good Parts</title>
    <author>
      <firstName>Douglas</firstName>
      <lastName>Crockford</lastName>
    </author>
    <publisher>O'Reilly Media</publisher>
    <publicationDate>2008-05-01</publicationDate>
    <price currency="USD">29.99</price>
    <categories>
      <category>Programming</category>
      <category>JavaScript</category>
      <category>Web Development</category>
    </categories>
    <inStock>true</inStock>
    <description>
      A comprehensive guide to JavaScript best practices
      and avoiding common pitfalls.
    </description>
  </book>
</library>`;

  const jsonExampleCode = `{
  "library": {
    "book": {
      "id": "1",
      "isbn": "978-1234567890",
      "title": "JavaScript: The Good Parts",
      "author": {
        "firstName": "Douglas",
        "lastName": "Crockford"
      },
      "publisher": "O'Reilly Media",
      "publicationDate": "2008-05-01",
      "price": {
        "amount": 29.99,
        "currency": "USD"
      },
      "categories": [
        "Programming",
        "JavaScript", 
        "Web Development"
      ],
      "inStock": true,
      "description": "A comprehensive guide to JavaScript best practices and avoiding common pitfalls."
    }
  }
}`;

  const comparisonTableData = [
    {
      aspect: 'Size',
      xml: 'Larger due to verbose tags',
      json: 'More compact, less characters',
      winner: 'json'
    },
    {
      aspect: 'Readability',
      xml: 'Self-documenting tag names',
      json: 'Clean, minimal syntax',
      winner: 'tie'
    },
    {
      aspect: 'Parsing Speed',
      xml: 'Slower, requires DOM parsing',
      json: 'Faster, direct to objects',
      winner: 'json'
    },
    {
      aspect: 'Data Types',
      xml: 'Everything is text/strings',
      json: 'Numbers, booleans, null, arrays',
      winner: 'json'
    },
    {
      aspect: 'Attributes',
      xml: 'Built-in attribute support',
      json: 'No attributes, only properties',
      winner: 'xml'
    },
    {
      aspect: 'Comments',
      xml: 'Supports comments',
      json: 'No comment support',
      winner: 'xml'
    },
    {
      aspect: 'Schema Validation',
      xml: 'XSD, DTD validation',
      json: 'JSON Schema available',
      winner: 'xml'
    },
    {
      aspect: 'Namespaces',
      xml: 'Full namespace support',
      json: 'No namespace concept',
      winner: 'xml'
    }
  ];

  const useCasesCode = `// When to use XML:
// 1. Document-oriented data with metadata
const xmlDocumentExample = \`
<report generatedBy="system" timestamp="2024-01-15T10:30:00Z">
  <!-- This report contains sensitive information -->
  <title>Quarterly Sales Report</title>
  <metadata>
    <author>Jane Smith</author>
    <department>Sales</department>
    <confidential>true</confidential>
  </metadata>
  <content>
    <section title="Q1 Overview">
      <paragraph>Sales increased by 15% this quarter...</paragraph>
    </section>
  </content>
</report>\`;

// When to use JSON:
// 1. API responses and web services
const apiResponse = {
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "username": "jsmith",
        "profile": {
          "firstName": "John", 
          "lastName": "Smith",
          "email": "john@example.com"
        },
        "permissions": ["read", "write"],
        "lastLogin": "2024-01-15T09:00:00Z",
        "isActive": true
      }
    ]
  },
  "pagination": {
    "currentPage": 1,
    "totalPages": 10,
    "totalResults": 95
  }
};`;

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>XML and JSON</strong> serve similar purposes but have different strengths. Understanding when to use each format is crucial for effective web development and data exchange.
      </p>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Same Data, Different Formats
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ color: 'var(--info)' }}>
            📄 XML Version
          </Typography>
          <CodePartsExplanation 
            code={xmlExampleCode}
            parts={[
              {
                label: 'Attributes',
                part: 'id="1" isbn="978-1234567890"',
                color: 'var(--warning)',
                desc: 'Additional data stored as element attributes'
              },
              {
                label: 'Nested Elements',
                part: '<author>\n      <firstName>Douglas</firstName>',
                color: 'var(--success)',
                desc: 'Hierarchical structure with nested elements'
              },
              {
                label: 'Mixed Attributes',
                part: '<price currency="USD">29.99</price>',
                color: 'var(--danger)',
                desc: 'Combining attributes with text content'
              }
            ]}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ color: 'var(--warning)' }}>
            📋 JSON Version
          </Typography>
          <CodePartsExplanation 
            code={jsonExampleCode}
            parts={[
              {
                label: 'Object Properties',
                part: '"id": "1", "isbn": "978-1234567890"',
                color: 'var(--warning)',
                desc: 'Data stored as key-value pairs in objects'
              },
              {
                label: 'Nested Objects',
                part: '"author": {\n        "firstName": "Douglas"',
                color: 'var(--success)',
                desc: 'Hierarchical structure with nested objects'
              },
              {
                label: 'Arrays',
                part: '"categories": [\n        "Programming"',
                color: 'var(--feature)',
                desc: 'Lists represented as arrays with typed values'
              }
            ]}
          />
        </Box>
      </Box>

      {/* Comparison Table */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Feature Comparison
        </Typography>
        <Box sx={{ 
          border: '1px solid var(--paper-sunken)',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 2fr',
            bgcolor: 'var(--paper-raised)',
            borderBottom: '1px solid var(--paper-sunken)'
          }}>
            <Box sx={{ p: 2, fontWeight: 600 }}>Aspect</Box>
            <Box sx={{ p: 2, fontWeight: 600, borderLeft: '1px solid var(--paper-sunken)', color: 'var(--info)' }}>XML</Box>
            <Box sx={{ p: 2, fontWeight: 600, borderLeft: '1px solid var(--paper-sunken)', color: 'var(--warning)' }}>JSON</Box>
          </Box>
          
          {/* Rows */}
          {comparisonTableData.map((row, index) => (
            <Box key={index} sx={{ 
              display: 'grid',
              gridTemplateColumns: '1fr 2fr 2fr',
              borderBottom: index < comparisonTableData.length - 1 ? '1px solid var(--paper-sunken)' : 'none',
              '&:hover': { bgcolor: 'var(--paper-raised)' }
            }}>
              <Box sx={{ p: 2, fontWeight: 600, color: 'var(--ink)' }}>
                {row.aspect}
              </Box>
              <Box sx={{ 
                p: 2, 
                borderLeft: '1px solid var(--paper-sunken)',
                bgcolor: row.winner === 'xml' ? 'var(--info-bg)' : 'transparent',
                fontWeight: row.winner === 'xml' ? 600 : 400
              }}>
                {row.xml}
                {row.winner === 'xml' && <span style={{ color: 'var(--success)', marginLeft: 8 }}>✅</span>}
              </Box>
              <Box sx={{ 
                p: 2, 
                borderLeft: '1px solid var(--paper-sunken)',
                bgcolor: row.winner === 'json' ? 'var(--warning-bg)' : 'transparent',
                fontWeight: row.winner === 'json' ? 600 : 400
              }}>
                {row.json}
                {row.winner === 'json' && <span style={{ color: 'var(--success)', marginLeft: 8 }}>✅</span>}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          When to Use Each Format
        </Typography>
        <CodePartsExplanation 
          code={useCasesCode}
          parts={[
            {
              label: 'XML Comments',
              part: '<!-- This report contains sensitive information -->',
              color: 'var(--ink-faint)',
              desc: 'XML supports comments for documentation'
            },
            {
              label: 'XML Attributes',
              part: 'generatedBy="system" timestamp="2024-01-15T10:30:00Z"',
              color: 'var(--ink-soft)',
              desc: 'Metadata can be stored as attributes'
            },
            {
              label: 'JSON Arrays',
              part: '"permissions": ["read", "write"]',
              color: 'var(--feature)',
              desc: 'Native array support with proper data types'
            },
            {
              label: 'JSON Nesting',
              part: '"profile": {\n          "firstName"',
              color: 'var(--info)',
              desc: 'Clean nested object structure'
            }
          ]}
        />
      </Box>

      {/* Decision Guide */}
      <FlexibleGrid 
        items={[
          {
            title: "📄 Choose XML When:",
            description: "• Document-oriented data with complex structure\n• Need attributes to store metadata\n• Require comments for documentation\n• Schema validation is critical\n• Working with legacy systems\n• Need namespace support\n• Processing with XSLT transformations",
            titleColor: "var(--info)",
            backgroundColor: "var(--info-bg)"
          },
          {
            title: "📋 Choose JSON When:",
            description: "• Web APIs and AJAX responses\n• JavaScript applications\n• Need lightweight data transfer\n• Mobile applications\n• NoSQL database storage\n• Configuration files\n• Real-time data exchange",
            titleColor: "var(--warning)",
            backgroundColor: "var(--warning-bg)"
          }
        ]}
        gap={3}
      />
    </div>
  );
};

export default XMLvsJSONComparison;