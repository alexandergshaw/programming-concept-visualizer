'use client';

import ConceptWrapper from '../../common/ConceptWrapper';
import Section from '../../common/Section';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ConceptInfoCard from '../../common/ConceptInfoCard';
import CodePartsExplanation from '../../common/CodePartsExplanation';
import CodeSnippet from '../../common/CodeSnippet';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';
import TableOfContents from '@/components/common/TableOfContents';

export default function AbstractionConcept() {
  const abstractionCode = [
    'from abc import ABC, abstractmethod',
    '',
    'class PaymentMethod(ABC):',
    '    @abstractmethod',
    '    def pay(self, amount):',
    '        pass',
    '',
    'class CreditCard(PaymentMethod):',
    '    def pay(self, amount):',
    '        return f"Paid ${amount} by credit card"',
    '',
    '# PaymentMethod() would raise an error — it is abstract',
    'card = CreditCard()',
    'print(card.pay(50))   # Paid $50 by credit card'
  ];

  const abstractionSteps = [
    {
      label: 'Import the Tools',
      desc: 'ABC and abstractmethod come from the abc module',
      highlight: 'from abc import ABC, abstractmethod'
    },
    {
      label: 'Define an Abstract Base',
      desc: 'PaymentMethod(ABC) declares a contract, not a usable class',
      highlight: 'class PaymentMethod(ABC):'
    },
    {
      label: 'Require a Method',
      desc: '@abstractmethod forces every child to provide pay',
      highlight: ['    @abstractmethod', '    def pay(self, amount):']
    },
    {
      label: 'Fulfill the Contract',
      desc: 'CreditCard implements the required pay method',
      highlight: ['class CreditCard(PaymentMethod):', '        return f"Paid ${amount} by credit card"']
    },
    {
      label: 'Can\'t Skip It',
      desc: 'You cannot create a PaymentMethod directly — only complete children',
      highlight: '# PaymentMethod() would raise an error — it is abstract'
    },
    {
      label: 'Use the Concrete Class',
      desc: 'CreditCard is complete, so it works normally',
      highlight: 'print(card.pay(50))   # Paid $50 by credit card'
    }
  ];

  return (
    <ConceptWrapper
      title="Abstraction"
      description="Hide complex details behind a simple interface, and define contracts that every implementation must follow."
    >
      <TableOfContents numbered>
        <Section title="What is Abstraction?">
          <Typography variant="body2" paragraph>
            <strong>Abstraction</strong> means exposing <em>only the essential features</em> of something while hiding the messy details. You focus on <em>what</em> an object does, not <em>how</em> it does it.
          </Typography>
          <Typography variant="body2" paragraph>
            When you drive a car, you use the steering wheel and pedals. You don&apos;t need to understand combustion or transmissions. The complex machinery is abstracted away behind a simple interface — and the same idea makes large programs manageable.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Abstraction vs. Encapsulation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>Encapsulation</strong> is about <em>hiding the data</em> and protecting it behind methods.
              </Typography>
              <Typography variant="body2">
                <strong>Abstraction</strong> is about <em>hiding the complexity</em> and exposing a clean, simple interface.
              </Typography>
              <Typography variant="body2">
                They work hand in hand: encapsulation is one of the tools you use to achieve abstraction.
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Abstract Base Classes">
          <Typography variant="body2" paragraph>
            Python provides <strong>abstract base classes (ABCs)</strong> through the <code>abc</code> module. An abstract class defines a <em>contract</em>: it lists methods that must exist, but it can&apos;t be instantiated on its own. Every concrete child is required to fill in those methods.
          </Typography>

          <CodePartsExplanation
            code={`from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount):
        pass`}
            parts={[
              {
                label: 'ABC base',
                part: 'class PaymentMethod(ABC):',
                color: '#9333ea',
                desc: 'Inheriting from ABC marks this as an abstract class'
              },
              {
                label: 'Abstract method',
                part: '@abstractmethod',
                color: '#dc2626',
                desc: 'Every child class is forced to implement the method below'
              },
              {
                label: 'No body needed',
                part: 'pass',
                color: '#059669',
                desc: 'The abstract class only declares the method, it doesn\'t define it'
              }
            ]}
          />

          <ConceptInfoCard>
            <Typography variant="body2" paragraph>
              Step through to see the contract enforced:
            </Typography>
            <StepThroughCodeAnimation
              code={abstractionCode}
              steps={abstractionSteps}
            />
          </ConceptInfoCard>

          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Trying to create an object of an abstract class — or a child that forgot to implement an abstract method — raises a <code>TypeError</code>. That&apos;s the contract doing its job.
            </Typography>
          </Alert>
        </Section>

        <Section title="Why Contracts Help">
          <Typography variant="body2" paragraph>
            Once several classes share the same abstract interface, the rest of your program can rely on that interface and treat them interchangeably — abstraction and polymorphism working together.
          </Typography>

          <CodeSnippet
            language="python"
            lines={[
              { code: 'class PayPal(PaymentMethod):' },
              { code: '    def pay(self, amount):' },
              { code: '        return f"Paid ${amount} via PayPal"' },
              { code: '' },
              { code: 'def checkout(method, amount):' },
              { code: '    # Works with ANY PaymentMethod, present or future' },
              { code: '    print(method.pay(amount))' },
              { code: '' },
              { code: 'checkout(CreditCard(), 50)   # Paid $50 by credit card' },
              { code: 'checkout(PayPal(), 75)       # Paid $75 via PayPal' }
            ]}
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <code>checkout</code> never needs to change when you add a new payment type. As long as the new class honors the <code>PaymentMethod</code> contract, it just works.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
