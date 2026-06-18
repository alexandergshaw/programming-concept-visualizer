import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';

const DataParsingExamples: React.FC = () => {
  const xmlParsingCode = `// Complete XML parsing example
async function fetchAndParseXML(url) {
  try {
    // Fetch XML data
    const response = await fetch(url);
    const xmlText = await response.text();
    
    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    
    // Check for parsing errors
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      throw new Error("XML parsing failed: " + parseError.textContent);
    }
    
    // Extract data from XML
    const books = [];
    const bookElements = xmlDoc.querySelectorAll("book");
    
    bookElements.forEach(book => {
      const bookData = {
        id: book.getAttribute("id"),
        title: book.querySelector("title")?.textContent || "",
        author: book.querySelector("author")?.textContent || "",
        price: parseFloat(book.querySelector("price")?.textContent || "0"),
        currency: book.querySelector("price")?.getAttribute("currency") || "USD",
        categories: Array.from(book.querySelectorAll("category"))
          .map(cat => cat.textContent)
      };
      books.push(bookData);
    });
    
    return { success: true, data: books };
    
  } catch (error) {
    console.error("XML processing error:", error);
    return { success: false, error: error.message };
  }
}

// Usage
fetchAndParseXML("/api/books.xml")
  .then(result => {
    if (result.success) {
      console.log("Books loaded:", result.data);
    } else {
      console.error("Failed to load books:", result.error);
    }
  });`;

  const jsonParsingCode = `// Complete JSON parsing example
async function fetchAndParseJSON(url) {
  try {
    // Fetch JSON data
    const response = await fetch(url);
    
    // Check if response is ok
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    // Parse JSON
    const data = await response.json();
    
    // Validate expected structure
    if (!data.books || !Array.isArray(data.books)) {
      throw new Error("Invalid JSON structure: expected 'books' array");
    }
    
    // Process and validate each book
    const processedBooks = data.books.map((book, index) => {
      // Validate required fields
      if (!book.id || !book.title) {
        throw new Error(\`Book at index \${index} missing required fields\`);
      }
      
      return {
        id: String(book.id),
        title: book.title,
        author: book.author || "Unknown Author",
        price: typeof book.price === 'number' ? book.price : 0,
        currency: book.currency || "USD",
        categories: Array.isArray(book.categories) ? book.categories : [],
        inStock: Boolean(book.inStock),
        publishedDate: book.publishedDate ? new Date(book.publishedDate) : null
      };
    });
    
    return {
      success: true,
      data: processedBooks,
      metadata: {
        total: processedBooks.length,
        lastUpdated: data.lastUpdated || new Date().toISOString()
      }
    };
    
  } catch (error) {
    console.error("JSON processing error:", error);
    
    // Provide more specific error messages
    if (error instanceof SyntaxError) {
      return { success: false, error: "Invalid JSON format" };
    }
    
    return { success: false, error: error.message };
  }
}

// Usage with error handling
async function loadBooksData() {
  const result = await fetchAndParseJSON("/api/books.json");
  
  if (result.success) {
    console.log("Books loaded:", result.data);
    console.log("Metadata:", result.metadata);
    
    // Use the data
    displayBooks(result.data);
  } else {
    console.error("Failed to load books:", result.error);
    showErrorMessage(result.error);
  }
}`;

  const errorHandlingCode = `// Robust error handling for both formats
class DataProcessor {
  async processXML(xmlString) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(xmlString, "text/xml");
      
      // Check for XML parsing errors
      const errorNode = doc.querySelector("parsererror");
      if (errorNode) {
        return this.createError("XML_PARSE_ERROR", errorNode.textContent);
      }
      
      // Check for empty document
      if (!doc.documentElement) {
        return this.createError("EMPTY_DOCUMENT", "XML document is empty");
      }
      
      return this.createSuccess(this.extractXMLData(doc));
      
    } catch (error) {
      return this.createError("UNKNOWN_ERROR", error.message);
    }
  }
  
  async processJSON(jsonString) {
    try {
      // Attempt to parse JSON
      const data = JSON.parse(jsonString);
      
      // Validate data structure
      const validation = this.validateJSONStructure(data);
      if (!validation.isValid) {
        return this.createError("VALIDATION_ERROR", validation.message);
      }
      
      return this.createSuccess(data);
      
    } catch (error) {
      if (error instanceof SyntaxError) {
        return this.createError("JSON_SYNTAX_ERROR", 
          \`Invalid JSON at position \${error.message.match(/\\d+/)?.[0] || 'unknown'}\`);
      }
      
      return this.createError("UNKNOWN_ERROR", error.message);
    }
  }
  
  createError(type, message) {
    return {
      success: false,
      errorType: type,
      message: message,
      timestamp: new Date().toISOString()
    };
  }
  
  createSuccess(data) {
    return {
      success: true,
      data: data,
      timestamp: new Date().toISOString()
    };
  }
  
  validateJSONStructure(data) {
    if (typeof data !== 'object' || data === null) {
      return { isValid: false, message: "Root element must be an object" };
    }
    
    // Add specific validation rules
    if (data.books && !Array.isArray(data.books)) {
      return { isValid: false, message: "Books must be an array" };
    }
    
    return { isValid: true };
  }
}`;

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Parsing and processing</strong> XML and JSON data requires careful error handling and validation. Here are comprehensive examples showing best practices for working with both formats.
      </p>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          XML Parsing with Error Handling
        </Typography>
        <CodePartsExplanation 
          code={xmlParsingCode}
          parts={[
            {
              label: 'Fetch XML',
              part: 'const response = await fetch(url);\n    const xmlText = await response.text();',
              color: 'var(--info)',
              desc: 'Fetch XML data as text (not JSON)'
            },
            {
              label: 'Parse XML',
              part: 'const parser = new DOMParser();\n    const xmlDoc = parser.parseFromString(xmlText, "text/xml");',
              color: 'var(--warning)',
              desc: 'Use DOMParser to convert XML string to DOM document'
            },
            {
              label: 'Error Check',
              part: 'const parseError = xmlDoc.querySelector("parsererror");',
              color: 'var(--danger)',
              desc: 'Check for XML parsing errors in the parsed document'
            },
            {
              label: 'Query Elements',
              part: 'xmlDoc.querySelectorAll("book")',
              color: 'var(--success)',
              desc: 'Use CSS selectors to find elements in XML document'
            },
            {
              label: 'Extract Attributes',
              part: 'book.getAttribute("id")',
              color: 'var(--feature)',
              desc: 'Get attribute values from XML elements'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          JSON Parsing with Validation
        </Typography>
        <CodePartsExplanation 
          code={jsonParsingCode}
          parts={[
            {
              label: 'HTTP Check',
              part: 'if (!response.ok)',
              color: 'var(--feature)',
              desc: 'Verify HTTP response status before parsing'
            },
            {
              label: 'Parse JSON',
              part: 'const data = await response.json();',
              color: 'var(--info)',
              desc: 'Use built-in JSON parsing method'
            },
            {
              label: 'Structure Validation',
              part: 'if (!data.books || !Array.isArray(data.books))',
              color: 'var(--warning)',
              desc: 'Validate expected data structure exists'
            },
            {
              label: 'Data Processing',
              part: 'data.books.map((book, index) => {',
              color: 'var(--success)',
              desc: 'Process and validate each data item'
            },
            {
              label: 'Type Coercion',
              part: 'typeof book.price === \'number\' ? book.price : 0',
              color: 'var(--ink-soft)',
              desc: 'Ensure correct data types with fallback values'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Professional Error Handling
        </Typography>
        <CodePartsExplanation 
          code={errorHandlingCode}
          parts={[
            {
              label: 'Error Types',
              part: 'return this.createError("XML_PARSE_ERROR", errorNode.textContent);',
              color: 'var(--danger)',
              desc: 'Categorize errors with specific types for better handling'
            },
            {
              label: 'Syntax Error Check',
              part: 'if (error instanceof SyntaxError)',
              color: 'var(--warning)',
              desc: 'Handle JSON syntax errors specifically'
            },
            {
              label: 'Consistent Response',
              part: 'createSuccess(data)',
              color: 'var(--success)',
              desc: 'Return consistent response format for success and errors'
            },
            {
              label: 'Data Validation',
              part: 'validateJSONStructure(data)',
              color: 'var(--feature)',
              desc: 'Validate data structure before processing'
            }
          ]}
        />
      </Box>

      {/* Best Practices */}
      <Box sx={{ 
        p: 3, 
        bgcolor: 'var(--feature-bg)', 
        borderRadius: 2, 
        border: '1px solid var(--feature)',
        mt: 4,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'var(--feature)', display: 'flex', alignItems: 'center', gap: 1 }}>
          🚀 Parsing Best Practices
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: 'var(--ink)' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--feature)' }}>Always validate:</Typography> Check data structure and required fields exist</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--feature)' }}>Handle errors gracefully:</Typography> Provide meaningful error messages to users</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--feature)' }}>Use try-catch blocks:</Typography> Wrap parsing code in error handling</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--feature)' }}>Provide fallback values:</Typography> Set defaults for optional or missing data</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--feature)' }}>Log errors properly:</Typography> Include context for debugging</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--feature)' }}>Validate HTTP responses:</Typography> Check status codes before parsing</li>
        </Box>
      </Box>

      {/* Common Pitfalls */}
      <Box sx={{ 
        p: 3, 
        bgcolor: 'var(--warning-bg)', 
        borderRadius: 2, 
        border: '1px solid var(--warning)',
        mt: 3,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: 1 }}>
          ⚠️ Common Pitfalls to Avoid
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: 'var(--ink)' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--warning)' }}>Assuming data exists:</Typography> Always check if elements/properties exist before accessing</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--warning)' }}>Ignoring data types:</Typography> JSON preserves types, XML treats everything as strings</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--warning)' }}>Not handling empty responses:</Typography> Check for null, undefined, or empty data</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--warning)' }}>Poor error messages:</Typography> Give users actionable feedback, not technical errors</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--warning)' }}>Memory leaks:</Typography> Clean up large parsed documents when done</li>
        </Box>
      </Box>
    </div>
  );
};

export default DataParsingExamples;