import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import CalloutBox from '@/components/common/CalloutBox';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ClosuresExample: React.FC = () => {
  // Code parts for highlighting different sections
  const codeParts: CodePart[] = [
    {
      label: 'Outer Function',
      part: 'function createCounter() {\n  let count = 0;',
      color: '#e91e63',
      desc: 'Outer function creates private variable in its scope'
    },
    {
      label: 'Inner Function',
      part: 'return function() {\n    count++;\n    return count;\n  }',
      color: '#4caf50',
      desc: 'Inner function accesses outer variable (closure formed)'
    },
    {
      label: 'Closure Creation',
      part: 'const counter = createCounter()',
      color: '#2196f3',
      desc: 'Calling outer function returns inner function with closure'
    },
    {
      label: 'Persistent Access',
      part: 'counter(); // 1\ncounter(); // 2',
      color: '#ff9800',
      desc: 'Inner function remembers outer variables even after outer function returns'
    }
  ];

  // Template for generating executable code
  const codeTemplate = (inputs: Record<string, string | number>) => {
    const closureType = inputs.closureType as string;
    const initialValue = inputs.initialValue as number;
    
    const examples = {
      basic: `// Basic Closure: Counter Example
function createCounter(start = ${initialValue}) {
  let count = start;
  
  // Return function that "closes over" the count variable
  return function() {
    count++;
    return count;
  };
}

console.log("=== Basic Closure Example ===");

// Create multiple independent counters
const counter1 = createCounter();
const counter2 = createCounter(100);

console.log("Counter 1:");
console.log(counter1()); // ${initialValue + 1}
console.log(counter1()); // ${initialValue + 2}
console.log(counter1()); // ${initialValue + 3}

console.log("\nCounter 2:");
console.log(counter2()); // 101
console.log(counter2()); // 102

console.log("\nBack to Counter 1:");
console.log(counter1()); // ${initialValue + 4} (kept its own state!)

// Each closure maintains its own copy of variables
console.log("\nIndependent state demonstrated:");
console.log("Counter1 next:", counter1()); // ${initialValue + 5}
console.log("Counter2 next:", counter2()); // 103`,

      practical: `// Practical Closure: Module Pattern
function createBankAccount(initialBalance = ${initialValue}) {
  let balance = initialBalance;
  let transactions = [];
  
  // Return object with methods that access private variables
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        transactions.push({ type: 'deposit', amount, balance, date: new Date() });
        return \`Deposited $\{amount}. New balance: $\{balance}\`;
      }
      return 'Invalid deposit amount';
    },
    
    withdraw(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        transactions.push({ type: 'withdraw', amount, balance, date: new Date() });
        return \`Withdrew $\{amount}. New balance: $\{balance}\`;
      }
      return 'Invalid withdrawal amount or insufficient funds';
    },
    
    getBalance() {
      return \`Current balance: $\{balance}\`;
    },
    
    getTransactionHistory() {
      return transactions.map((t, i) => \`\${i + 1}. \${t.type}: $\{t.amount} (Balance: $\{t.balance})\`);
    }
  };
}

console.log("=== Practical Closure: Bank Account ===");

const account = createBankAccount();

console.log(account.getBalance());
console.log(account.deposit(50));
console.log(account.deposit(25));
console.log(account.withdraw(30));
console.log(account.getBalance());

console.log("\nTransaction History:");
account.getTransactionHistory().forEach(t => console.log(t));

// Private variables are truly private!
console.log("\nTrying to access private variables:");
console.log("account.balance:", account.balance); // undefined
console.log("account.transactions:", account.transactions); // undefined`,

      advanced: `// Advanced Closure: Function Factory
function createValidator(validationType) {
  // Each validator type has different rules
  const rules = {
    email: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    phone: /^\\d{3}-\\d{3}-\\d{4}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{${initialValue},}$/
  };
  
  const rule = rules[validationType];
  if (!rule) {
    throw new Error(\`Unknown validation type: \${validationType}\`);
  }
  
  // Return customized validator function
  return function validate(input) {
    const isValid = rule.test(input);
    return {
      isValid: isValid,
      input: input,
      type: validationType,
      message: isValid 
        ? \`Valid \${validationType}\` 
        : \`Invalid \${validationType} format\`,
      timestamp: new Date().toISOString()
    };
  };
}

console.log("=== Advanced Closure: Validator Factory ===");

// Create specialized validators
const emailValidator = createValidator('email');
const phoneValidator = createValidator('phone');
const passwordValidator = createValidator('password');

// Test email validation
console.log("Email Tests:");
console.log(emailValidator('test@example.com'));
console.log(emailValidator('invalid-email'));

// Test phone validation
console.log("\nPhone Tests:");
console.log(phoneValidator('555-123-4567'));
console.log(phoneValidator('not-a-phone'));

// Test password validation (minimum ${initialValue} chars, mixed case, number)
console.log("\nPassword Tests:");
console.log(passwordValidator('MyPass123'));
console.log(passwordValidator('weak'));

// Each validator remembers its own validation type
console.log("\nValidator types remembered:");
console.log("Email validator type:", emailValidator('test').type);
console.log("Phone validator type:", phoneValidator('test').type);`
    };
    
    return [examples[closureType as keyof typeof examples]];
  };

  // Template for generating step-by-step explanation
  const stepsTemplate = (inputs: Record<string, string | number>) => {
    const closureType = inputs.closureType as string;
    const initialValue = inputs.initialValue as number;
    
    if (closureType === 'basic') {
      return [
        {
          label: "Create Outer Function",
          desc: `Function createCounter defines private variable count = ${initialValue}`,
          highlight: `function createCounter(start = ${initialValue}) { let count = start;`
        },
        {
          label: "Return Inner Function",
          desc: "Inner function accesses count variable from outer scope",
          highlight: 'return function() { count++; return count; }'
        },
        {
          label: "Call Outer Function",
          desc: "Calling createCounter() returns the inner function with closure",
          highlight: 'const counter1 = createCounter() // returns function + closure'
        },
        {
          label: "Closure Formed",
          desc: "Inner function \"closes over\" count variable, keeping it alive",
          highlight: 'counter1() // accesses count even after createCounter finished'
        },
        {
          label: "Persistent State",
          desc: "Each call remembers previous count value through closure",
          highlight: `counter1() // ${initialValue + 1}, counter1() // ${initialValue + 2}, counter1() // ${initialValue + 3}`
        },
        {
          label: "Independent Closures",
          desc: "Multiple counters each have their own private count variable",
          highlight: 'counter1 and counter2 have separate count variables'
        }
      ];
    }
    
    if (closureType === 'practical') {
      return [
        {
          label: "Private Variables Setup",
          desc: `Create private balance and transactions variables in outer function`,
          highlight: `let balance = ${initialValue}; let transactions = [];`
        },
        {
          label: "Return Public Methods",
          desc: "Return object with methods that access private variables",
          highlight: 'return { deposit(amount) {...}, withdraw(amount) {...} }'
        },
        {
          label: "Method Closures",
          desc: "Each method forms closure with private variables",
          highlight: 'deposit() and withdraw() both access private balance/transactions'
        },
        {
          label: "Data Encapsulation",
          desc: "Private variables are only accessible through public methods",
          highlight: 'account.balance is undefined - cannot access directly!'
        },
        {
          label: "Persistent State",
          desc: "Balance and transactions persist across method calls",
          highlight: 'Each deposit/withdraw updates the same private balance'
        }
      ];
    }
    
    if (closureType === 'advanced') {
      return [
        {
          label: "Factory Function Setup",
          desc: "Outer function takes validation type and sets up rules",
          highlight: 'function createValidator(validationType) { const rules = {...}; }'
        },
        {
          label: "Select Rule",
          desc: "Based on type parameter, select appropriate validation rule",
          highlight: 'const rule = rules[validationType] // email, phone, or password'
        },
        {
          label: "Return Specialized Function",
          desc: "Inner function closes over the selected rule and validation type",
          highlight: 'return function validate(input) { rule.test(input) }'
        },
        {
          label: "Create Validators",
          desc: "Each call creates validator with different rules in closure",
          highlight: 'emailValidator closes over email rule, phoneValidator over phone rule'
        },
        {
          label: "Specialized Behavior",
          desc: "Each validator remembers its type and applies correct validation",
          highlight: 'emailValidator tests email format, phoneValidator tests phone format'
        }
      ];
    }
    
    return [];
  };

  return (
    <div>
      <p style={{ marginBottom: 18, fontSize: 16, lineHeight: 1.6 }}>
        <strong>Closures</strong> are functions that have access to variables from their outer (enclosing) scope even after the outer function has finished executing. This creates powerful patterns for data privacy and function factories.
      </p>

      {/* Code Parts Explanation */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          How Closures Work: Functions with Memory
        </Typography>
        <CodePartsExplanation 
          code={`// Closure formation:
function createCounter() {
  let count = 0;           // Private variable in outer scope
  
  return function() {      // Inner function forms closure
    count++;               // Accesses outer variable
    return count;
  };
}                          // Outer function finishes...

const counter = createCounter();  // ...but closure keeps count alive!
counter();  // 1 - count still accessible
counter();  // 2 - count persists between calls
counter();  // 3 - each call sees previous changes

// Multiple closures are independent:
const counter2 = createCounter(); // New closure, new count
counter2(); // 1 - separate from first counter`}
          parts={codeParts}
        />
      </Box>

      {/* Interactive Step Through */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Try It Yourself: Closure Patterns
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Explore different ways closures are used in real applications:
        </Typography>
        
        <InteractiveStepThrough
          codeTemplate={codeTemplate}
          stepsTemplate={stepsTemplate}
          inputConfigs={[
            {
              name: "closureType",
              label: "Closure Pattern",
              options: [
                { label: "Basic Counter", value: "basic" },
                { label: "Module Pattern (Bank Account)", value: "practical" },
                { label: "Function Factory (Validators)", value: "advanced" }
              ],
              defaultValue: "basic"
            },
            {
              name: "initialValue", 
              label: "Initial Value",
              options: [
                { label: "0", value: 0 },
                { label: "10", value: 10 },
                { label: "50", value: 50 },
                { label: "100", value: 100 }
              ],
              defaultValue: 0
            }
          ]}
        />
      </Box>

      <CalloutBox title="Key Closure Concepts" type="key-concepts">
        <Box component="ul" sx={{ margin: 0, paddingLeft: 3, '& li': { marginBottom: 1.5, color: '#475569' } }}>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Lexical Scoping:</Typography> Inner functions have access to outer function variables</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Persistent Variables:</Typography> Outer variables stay alive as long as closure exists</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Private Data:</Typography> Variables in closures can't be accessed from outside</li>
          <li><Typography component="span" fontWeight={600} sx={{ color: '#1976d2' }}>Independent Instances:</Typography> Each closure maintains its own copy of variables</li>
        </Box>
      </CalloutBox>
    </div>
  );
};

export default ClosuresExample;