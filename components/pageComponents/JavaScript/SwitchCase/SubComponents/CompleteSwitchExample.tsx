import React from 'react';
import CodePartsExplanation, { CodePart } from '@/components/common/CodePartsExplanation';
import InteractiveStepThrough from '@/components/common/InteractiveStepThrough';
import { Step } from '@/components/pageComponents/JavaScript/StepThroughCodeAnimation';

const CompleteSwitchExample: React.FC = () => {
  const codeParts: CodePart[] = [
    {
      label: 'Switch Statement',
      part: 'switch (status)',
      color: 'var(--success)',
      desc: 'Evaluates order status'
    },
    {
      label: 'Pending Case',
      part: 'case "pending":\n      return "Order received";',
      color: 'var(--info)',
      desc: 'Handle pending orders'
    },
    {
      label: 'Processing Case',
      part: 'case "processing":\n      return "Being prepared";',
      color: 'var(--warning)',
      desc: 'Handle processing orders'
    },
    {
      label: 'Shipped Case',
      part: 'case "shipped":\n      return "On the way";',
      color: 'var(--feature)',
      desc: 'Handle shipped orders'
    },
    {
      label: 'Delivered Case',
      part: 'case "delivered":\n      return "Delivered!";',
      color: 'var(--success)',
      desc: 'Handle delivered orders'
    },
    {
      label: 'Default Case',
      part: 'default:\n      return "Unknown status";',
      color: 'var(--danger)',
      desc: 'Handle unknown statuses'
    }
  ];

  const codeTemplate = (inputs: Record<string, string | number>) => {
    return [`function getOrderMessage(status) {
  switch (status) {
    case "pending":
      return "Order received";
    case "processing":
      return "Being prepared";
    case "shipped":
      return "On the way";
    case "delivered":
      return "Delivered!";
    default:
      return "Unknown status";
  }
}

getOrderMessage("${inputs.status}");`];
  };

  const stepsTemplate = (inputs: Record<string, string | number>): Step[] => {
    const status = inputs.status as string;
    const steps: Step[] = [
      {
        label: 'Call function',
        desc: 'Function called with order status',
        highlight: 'getOrderMessage',
        outputLine: `Called getOrderMessage("${status}")`
      },
      {
        label: 'Evaluate switch',
        desc: 'The status value is evaluated',
        highlight: 'switch (status)',
        outputLine: `Switch expression evaluated: "${status}"`
      }
    ];

    // Add dynamic steps based on the status
    if (status === 'pending') {
      steps.push({
        label: 'Check pending case',
        desc: 'Check if status matches "pending"',
        highlight: 'case "pending":',
        outputLine: `"${status}" === "pending"? YES - Match found!`
      });
      steps.push({
        label: 'Return pending message',
        desc: 'Execute pending case',
        highlight: 'return "Order received";',
        outputLine: 'Return "Order received" and exit switch'
      });
    } else if (status === 'processing') {
      steps.push({
        label: 'Check pending case',
        desc: 'Check if status matches "pending"',
        highlight: 'case "pending":',
        outputLine: `"${status}" === "pending"? NO - Continue to next case`
      });
      steps.push({
        label: 'Check processing case',
        desc: 'Check if status matches "processing"',
        highlight: 'case "processing":',
        outputLine: `"${status}" === "processing"? YES - Match found!`
      });
      steps.push({
        label: 'Return processing message',
        desc: 'Execute processing case',
        highlight: 'return "Being prepared";',
        outputLine: 'Return "Being prepared" and exit switch'
      });
    } else if (status === 'shipped') {
      steps.push({
        label: 'Check earlier cases',
        desc: 'Check pending and processing cases',
        highlight: 'case "pending":',
        outputLine: `"${status}" doesn&apos;t match earlier cases - continue checking`
      });
      steps.push({
        label: 'Check shipped case',
        desc: 'Check if status matches "shipped"',
        highlight: 'case "shipped":',
        outputLine: `"${status}" === "shipped"? YES - Match found!`
      });
      steps.push({
        label: 'Return shipped message',
        desc: 'Execute shipped case',
        highlight: 'return "On the way";',
        outputLine: 'Return "On the way" and exit switch'
      });
    } else if (status === 'delivered') {
      steps.push({
        label: 'Check earlier cases',
        desc: 'Check previous cases',
        highlight: 'case "pending":',
        outputLine: `"${status}" doesn&apos;t match earlier cases - continue checking`
      });
      steps.push({
        label: 'Check delivered case',
        desc: 'Check if status matches "delivered"',
        highlight: 'case "delivered":',
        outputLine: `"${status}" === "delivered"? YES - Match found!`
      });
      steps.push({
        label: 'Return delivered message',
        desc: 'Execute delivered case',
        highlight: 'return "Delivered!";',
        outputLine: 'Return "Delivered!" and exit switch'
      });
    } else {
      steps.push({
        label: 'Check all cases',
        desc: 'Check all known status cases',
        highlight: 'case "pending":',
        outputLine: `"${status}" doesn&apos;t match any known status - continue to default`
      });
      steps.push({
        label: 'Execute default case',
        desc: 'No cases matched, use default',
        highlight: 'default:',
        outputLine: 'No matching cases - using default case'
      });
      steps.push({
        label: 'Return unknown message',
        desc: 'Execute default case',
        highlight: 'return "Unknown status";',
        outputLine: 'Return "Unknown status" and exit switch'
      });
    }

    return steps;
  };

  return (
    <div>
      <p>Here's a complete switch statement that demonstrates all the key concepts working together:</p>

      <h5>Order Status System:</h5>
      <CodePartsExplanation
        code={`function getOrderMessage(status) {
  switch (status) {
    case "pending":
      return "Order received";
    case "processing":
      return "Being prepared";
    case "shipped":
      return "On the way";
    case "delivered":
      return "Delivered!";
    default:
      return "Unknown status";
  }
}`}
        parts={codeParts}
      />

      <h5>Interactive Example:</h5>
      <p>Try different order statuses to see the complete switch statement in action:</p>
      <InteractiveStepThrough
        codeTemplate={codeTemplate}
        stepsTemplate={stepsTemplate}
        inputConfigs={[
          {
            name: 'status',
            label: 'Order Status:',
            options: [
              { value: 'pending', label: 'Pending' },
              { value: 'processing', label: 'Processing' },
              { value: 'shipped', label: 'Shipped' },
              { value: 'delivered', label: 'Delivered' },
              { value: 'cancelled', label: 'Cancelled (unknown)' }
            ]
          }
        ]}
      />
    </div>
  );
};

export default CompleteSwitchExample;