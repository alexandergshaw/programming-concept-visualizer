import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';

const AsynchronousPatternsExample: React.FC = () => {
  const retryPatternCode = `// Retry pattern with exponential backoff
async function fetchWithRetry(url, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      
      if (response.ok) {
        return await response.json();
      }
      
      throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
    } catch (error) {
      console.log(\`Attempt \${attempt} failed:, error.message\`);
      
      // If this was the last attempt, give up
      if (attempt === maxRetries) {
        throw new Error(\`Failed after \${maxRetries} attempts: \${error.message}\`);
      }
      
      // Wait before retrying (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s...
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}`;

  const timeoutPatternCode = `// Timeout pattern - cancel slow requests
function fetchWithTimeout(url, timeoutMs = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), timeoutMs)
    )
  ]);
}

// Usage with async/await
async function loadUserData(userId) {
  try {
    const response = await fetchWithTimeout(\`/api/users/\${userId}\`, 3000);
    return await response.json();
  } catch (error) {
    if (error.message === 'Request timeout') {
      console.log('Request took too long, please try again');
    }
    throw error;
  }
}`;

  const cachePatternCode = `// Caching pattern - avoid redundant requests
class APICache {
  constructor() {
    this.cache = new Map();
    this.promises = new Map(); // Track in-flight requests
  }
  
  async fetch(url) {
    // Return cached result if available
    if (this.cache.has(url)) {
      console.log('Cache hit:', url);
      return this.cache.get(url);
    }
    
    // Return existing promise if request is in-flight
    if (this.promises.has(url)) {
      console.log('Request in-flight:', url);
      return this.promises.get(url);
    }
    
    // Make new request
    console.log('Making new request:', url);
    const promise = fetch(url)
      .then(response => response.json())
      .then(data => {
        this.cache.set(url, data);
        this.promises.delete(url);
        return data;
      })
      .catch(error => {
        this.promises.delete(url);
        throw error;
      });
    
    this.promises.set(url, promise);
    return promise;
  }
}

const apiCache = new APICache();
const userData = await apiCache.fetch('/api/user/123');`;

  const rateLimitCode = `// Rate limiting pattern - control request frequency
class RateLimiter {
  constructor(requestsPerSecond = 5) {
    this.queue = [];
    this.interval = 1000 / requestsPerSecond;
    this.lastRequestTime = 0;
    this.processing = false;
  }
  
  async add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  }
  
  async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const now = Date.now();
      const timeSinceLastRequest = now - this.lastRequestTime;
      
      if (timeSinceLastRequest < this.interval) {
        await new Promise(resolve => 
          setTimeout(resolve, this.interval - timeSinceLastRequest)
        );
      }
      
      const { requestFn, resolve, reject } = this.queue.shift();
      this.lastRequestTime = Date.now();
      
      try {
        const result = await requestFn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }
    
    this.processing = false;
  }
}`;

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Advanced asynchronous patterns</strong> help you handle complex scenarios like retries, timeouts, caching, and rate limiting. These patterns make your applications more robust and user-friendly.
      </p>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Retry Pattern with Exponential Backoff
        </Typography>
        <CodePartsExplanation 
          code={retryPatternCode}
          parts={[
            {
              label: 'Retry Loop',
              part: 'for (let attempt = 1; attempt <= maxRetries; attempt++)',
              color: 'var(--info)',
              desc: 'Try the operation multiple times before giving up'
            },
            {
              label: 'Exponential Backoff',
              part: 'Math.pow(2, attempt) * 1000',
              color: 'var(--warning)',
              desc: 'Increase delay between retries: 2s, 4s, 8s...'
            },
            {
              label: 'Final Failure',
              part: 'if (attempt === maxRetries)',
              color: 'var(--danger)',
              desc: 'Throw error after all retry attempts are exhausted'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Timeout Pattern - Cancel Slow Requests
        </Typography>
        <CodePartsExplanation 
          code={timeoutPatternCode}
          parts={[
            {
              label: 'Promise.race',
              part: 'Promise.race([fetch(url), timeout])',
              color: 'var(--feature)',
              desc: 'First promise to resolve (success or timeout) wins'
            },
            {
              label: 'Timeout Promise',
              part: 'setTimeout(() => reject(new Error(\'Request timeout\')), timeoutMs)',
              color: 'var(--danger)',
              desc: 'Create a promise that rejects after specified time'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Caching Pattern - Avoid Redundant Requests
        </Typography>
        <CodePartsExplanation 
          code={cachePatternCode}
          parts={[
            {
              label: 'Cache Check',
              part: 'if (this.cache.has(url))',
              color: 'var(--success)',
              desc: 'Return cached data immediately if available'
            },
            {
              label: 'In-flight Check',
              part: 'if (this.promises.has(url))',
              color: 'var(--warning)',
              desc: 'Avoid duplicate requests by sharing existing promises'
            },
            {
              label: 'Cache Storage',
              part: 'this.cache.set(url, data)',
              color: 'var(--feature)',
              desc: 'Store successful responses for future use'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Rate Limiting Pattern
        </Typography>
        <CodePartsExplanation 
          code={rateLimitCode}
          parts={[
            {
              label: 'Request Queue',
              part: 'this.queue.push({ requestFn, resolve, reject })',
              color: 'var(--ink-soft)',
              desc: 'Queue requests to be processed at controlled rate'
            },
            {
              label: 'Timing Control',
              part: 'if (timeSinceLastRequest < this.interval)',
              color: 'var(--ink-soft)',
              desc: 'Wait if not enough time has passed since last request'
            }
          ]}
        />
      </Box>

      {/* Key Concepts */}
      <Box sx={{ 
        p: 3, 
        bgcolor: 'var(--paper-sunken)', 
        borderRadius: 2, 
        border: '1px solid var(--line)',
        mt: 4,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: 1 }}>
          🔑 Advanced Pattern Benefits
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: 'var(--ink-soft)' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Retry patterns:</Typography> Handle temporary network failures gracefully</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Timeout patterns:</Typography> Prevent hanging requests from blocking user interface</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Caching patterns:</Typography> Improve performance and reduce server load</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Rate limiting:</Typography> Respect API limits and avoid overwhelming servers</li>
        </Box>
      </Box>
    </div>
  );
};

export default AsynchronousPatternsExample;