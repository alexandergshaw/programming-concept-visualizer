import React from 'react';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const DefaultCaseExample: React.FC = () => {
  const codeParts: CodePart[] = [
    {
      label: 'Switch Statement',
      part: 'switch (role)',
      color: 'var(--success)',
      desc: 'Evaluates user role'
    },
    {
      label: 'Admin Case',
      part: 'case "admin":\n    return "Full access";',
      color: 'var(--info)',
      desc: 'Admin gets full access'
    },
    {
      label: 'User Case',
      part: 'case "user":\n    return "Limited access";',
      color: 'var(--warning)',
      desc: 'User gets limited access'
    },
    {
      label: 'Default Case',
      part: 'default:\n    return "No access";',
      color: 'var(--danger)',
      desc: 'Default handles unknown roles'
    }
  ];

  const codeTemplate = (inputs: Record<string, string | number>) => {
    return [`function getPermissions(role) {
  switch (role) {
    case "admin":
      return "Full access";
    case "user":
      return "Limited access";
    default:
      return "No access";
  }
}

getPermissions("${inputs.role}");`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const role = inputs.role as string;
    const steps: Step[] = [
      {
        label: 'Call function',
        desc: 'Function called with role',
        highlight: 'getPermissions',
        outputLine: `Called getPermissions("${role}")`
      },
      {
        label: 'Evaluate switch',
        desc: 'The role value is evaluated',
        highlight: 'switch (role)',
        outputLine: `Switch expression evaluated: "${role}"`
      }
    ];

    // Add dynamic steps based on the role
    if (role === 'admin') {
      steps.push({
        label: 'Check admin case',
        desc: 'Check if role matches "admin"',
        highlight: 'case "admin":',
        outputLine: `"${role}" === "admin"? YES - Match found!`
      });
      steps.push({
        label: 'Return admin access',
        desc: 'Execute admin case',
        highlight: 'return "Full access";',
        outputLine: 'Return "Full access" and exit switch'
      });
    } else if (role === 'user') {
      steps.push({
        label: 'Check admin case',
        desc: 'Check if role matches "admin"',
        highlight: 'case "admin":',
        outputLine: `"${role}" === "admin"? NO - Continue to next case`
      });
      steps.push({
        label: 'Check user case',
        desc: 'Check if role matches "user"',
        highlight: 'case "user":',
        outputLine: `"${role}" === "user"? YES - Match found!`
      });
      steps.push({
        label: 'Return user access',
        desc: 'Execute user case',
        highlight: 'return "Limited access";',
        outputLine: 'Return "Limited access" and exit switch'
      });
    } else {
      steps.push({
        label: 'Check admin case',
        desc: 'Check if role matches "admin"',
        highlight: 'case "admin":',
        outputLine: `"${role}" === "admin"? NO - Continue to next case`
      });
      steps.push({
        label: 'Check user case',
        desc: 'Check if role matches "user"',
        highlight: 'case "user":',
        outputLine: `"${role}" === "user"? NO - Continue to default`
      });
      steps.push({
        label: 'Execute default case',
        desc: 'No cases matched, use default',
        highlight: 'default:',
        outputLine: 'No matching cases - using default case'
      });
      steps.push({
        label: 'Return no access',
        desc: 'Execute default case',
        highlight: 'return "No access";',
        outputLine: 'Return "No access" and exit switch'
      });
    }

    return steps;
  };

  return (
    <div>
      <p>The <strong>default</strong> case handles any value that doesn&apos;t match other cases. It's like the "else" in an if-else statement:</p>

      <h5>Permission System:</h5>
      <CodePartsExplanation
        code={`function getPermissions(role) {
  switch (role) {
    case "admin":
      return "Full access";
    case "user":
      return "Limited access";
    default:
      return "No access";
  }
}`}
        parts={codeParts}
      />

      <h5>Interactive Example:</h5>
      <p>Try different roles - notice how unknown roles get handled by the default case:</p>
      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'role',
            label: 'User Role:',
            options: [
              { value: 'admin', label: 'admin (matches case)' },
              { value: 'user', label: 'user (matches case)' },
              { value: 'guest', label: 'guest (uses default)' },
              { value: 'hacker', label: 'hacker (uses default)' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default DefaultCaseExample;