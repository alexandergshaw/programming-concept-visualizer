import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AsyncAwaitExample: React.FC = () => {
  const comparisonCode = `// Promise chains (.then style)
function loadUserProfile(userId) {
  return fetchUser(userId)
    .then(user => {
      return fetchUserPosts(user.id);
    })
    .then(posts => {
      return fetchPostComments(posts[0].id);
    })
    .then(comments => {
      return { user, posts, comments };
    })
    .catch(error => {
      console.error('Error:', error);
      throw error;
    });
}

// Async/await style (same functionality, cleaner syntax)
async function loadUserProfile(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchPostComments(posts[0].id);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`;

  const asyncAwaitCode = `// Complete async/await example
async function processOrder(orderId) {
  try {
    // Show loading state
    updateStatus('Processing order...');
    
    // Step 1: Fetch order details
    const order = await fetchOrder(orderId);
    updateStatus('Order loaded, processing payment...');
    
    // Step 2: Process payment
    const payment = await processPayment(order.total);
    updateStatus('Payment successful, updating inventory...');
    
    // Step 3: Update inventory
    const inventory = await updateInventory(order.items);
    updateStatus('Inventory updated, sending confirmation...');
    
    // Step 4: Send confirmation email
    await sendConfirmationEmail(order.customerEmail);
    updateStatus('Order complete!');
    
    return {
      orderId: order.id,
      paymentId: payment.id,
      status: 'completed'
    };
    
  } catch (error) {
    updateStatus(\`Error: \${error.message}\`);
    
    // Handle specific error types
    if (error.type === 'PAYMENT_FAILED') {
      await refundOrder(orderId);
    } else if (error.type === 'INVENTORY_ERROR') {
      await restoreInventory(order.items);
    }
    
    throw error;
  }
}`;

  const codeParts: CodePart[] = [
    {
      label: 'Async Function',
      part: 'async function processOrder',
      color: 'var(--feature)',
      desc: 'Declares function as asynchronous, enabling await usage'
    },
    {
      label: 'Await Keyword',
      part: 'await fetchOrder(orderId)',
      color: 'var(--info)',
      desc: 'Pauses execution until Promise resolves, returns the value'
    },
    {
      label: 'Try-Catch Block',
      part: 'try { ... } catch (error) { ... }',
      color: 'var(--danger)',
      desc: 'Handles Promise rejections with familiar error handling'
    },
    {
      label: 'Error Recovery',
      part: 'await refundOrder(orderId)',
      color: 'var(--warning)',
      desc: 'Perform cleanup operations when errors occur'
    }
  ];

  const parallelCode = `// Sequential vs Parallel execution
// ❌ Sequential (slower) - operations wait for each other
async function loadDataSequential() {
  const user = await fetchUser(123);        // Takes 1 second
  const posts = await fetchPosts();         // Takes 1 second  
  const comments = await fetchComments();   // Takes 1 second
  // Total time: 3 seconds
  
  return { user, posts, comments };
}

// ✅ Parallel (faster) - operations run simultaneously
async function loadDataParallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(123),        // All start at the same time
    fetchPosts(),          // All start at the same time
    fetchComments()        // All start at the same time
  ]);
  // Total time: 1 second (fastest operation)
  
  return { user, posts, comments };
}`;

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Async/await</strong> is syntactic sugar that makes Promise-based code look and feel like synchronous code. It's easier to read, write, and debug than traditional Promise chains.
      </p>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Promise Chains vs Async/Await
        </Typography>
        <CodePartsExplanation 
          code={comparisonCode}
          parts={[
            {
              label: 'Promise Chains',
              part: '.then(user => { return fetchUserPosts(user.id); })',
              color: 'var(--warning)',
              desc: 'Traditional approach with nested .then() calls'
            },
            {
              label: 'Async/Await',
              part: 'const user = await fetchUser(userId);',
              color: 'var(--success)',
              desc: 'Modern approach that looks like synchronous code'
            }
          ]}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Complete Async/Await Example
        </Typography>
        <CodePartsExplanation 
          code={asyncAwaitCode}
          parts={codeParts}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Sequential vs Parallel Execution
        </Typography>
        <CodePartsExplanation 
          code={parallelCode}
          parts={[
            {
              label: 'Sequential Await',
              part: 'const user = await fetchUser(123);',
              color: 'var(--danger)',
              desc: 'Each operation waits for the previous one to complete'
            },
            {
              label: 'Parallel Promise.all',
              part: 'await Promise.all([fetchUser(123), fetchPosts()])',
              color: 'var(--success)',
              desc: 'All operations start simultaneously for better performance'
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Async/Await Concepts" type="key-concepts">
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: 'var(--ink-soft)' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>async function:</Typography> Always returns a Promise, enables await keyword usage</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>await keyword:</Typography> Pauses function execution until Promise resolves</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Error handling:</Typography> Use try/catch blocks instead of .catch() chains</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: 'var(--info)' }}>Parallel execution:</Typography> Use Promise.all() for concurrent operations</li>
        </Box>
      </CalloutBox>
    </div>
  );
};

export default AsyncAwaitExample;