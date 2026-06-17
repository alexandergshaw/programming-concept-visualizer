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

export default function EncapsulationConcept() {
  const encapsulationCode = [
    'class BankAccount:',
    '    def __init__(self, balance):',
    '        self.__balance = balance      # private attribute',
    '',
    '    def deposit(self, amount):',
    '        if amount > 0:',
    '            self.__balance += amount',
    '',
    '    def get_balance(self):',
    '        return self.__balance',
    '',
    'acct = BankAccount(100)',
    'acct.deposit(50)',
    'print(acct.get_balance())   # 150',
    'acct.deposit(-999)          # ignored by the rule above',
    'print(acct.get_balance())   # still 150'
  ];

  const encapsulationSteps = [
    {
      label: 'Hide the Data',
      desc: 'The double underscore makes __balance private to the class',
      highlight: '        self.__balance = balance      # private attribute'
    },
    {
      label: 'Guard the Changes',
      desc: 'deposit checks the amount before touching the balance',
      highlight: ['    def deposit(self, amount):', '        if amount > 0:']
    },
    {
      label: 'Controlled Access',
      desc: 'get_balance is the safe, official way to read the balance',
      highlight: '    def get_balance(self):'
    },
    {
      label: 'Use It Normally',
      desc: 'A valid deposit passes the check and updates the balance',
      highlight: 'acct.deposit(50)'
    },
    {
      label: 'Invalid Input Blocked',
      desc: 'A negative deposit fails the if-check and is ignored',
      highlight: 'acct.deposit(-999)          # ignored by the rule above'
    },
    {
      label: 'Data Stays Valid',
      desc: 'The balance could never be corrupted from outside',
      highlight: 'print(acct.get_balance())   # still 150'
    }
  ];

  return (
    <ConceptWrapper
      title="Encapsulation"
      description="Bundle data with the methods that protect it, and hide the internal details behind a clean, safe interface."
    >
      <TableOfContents numbered>
        <Section title="What is Encapsulation?">
          <Typography variant="body2" paragraph>
            <strong>Encapsulation</strong> means keeping an object&apos;s data and the code that operates on it together, while <em>hiding</em> the internal details from the outside world. Other code interacts with the object only through a controlled set of methods.
          </Typography>
          <Typography variant="body2" paragraph>
            Think of a vending machine. You press buttons (the public interface) — you don&apos;t reach inside to rearrange the mechanics. The machine protects its internals and only lets you do valid operations.
          </Typography>

          <ConceptInfoCard>
            <Typography variant="subtitle1" gutterBottom fontWeight="medium">
              Why Encapsulate?
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>🛡️ Protect data:</strong> Stop outside code from putting the object in an invalid state
              </Typography>
              <Typography variant="body2">
                <strong>✅ Validate changes:</strong> Run checks before allowing a value to change
              </Typography>
              <Typography variant="body2">
                <strong>🔌 Stable interface:</strong> Change internals later without breaking other code
              </Typography>
            </Box>
          </ConceptInfoCard>
        </Section>

        <Section title="Public, Protected, and Private">
          <Typography variant="body2" paragraph>
            Python signals how &quot;private&quot; an attribute is by convention, using underscores:
          </Typography>

          <ConceptInfoCard>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="body2">
                <strong>name</strong> — <em>public.</em> Anyone can read and change it freely.
              </Typography>
              <Typography variant="body2">
                <strong>_name</strong> — <em>protected (by convention).</em> A single underscore says &quot;internal, please don&apos;t touch from outside.&quot; Python doesn&apos;t enforce it.
              </Typography>
              <Typography variant="body2">
                <strong>__name</strong> — <em>private.</em> A double underscore triggers <strong>name mangling</strong>, which makes it hard (on purpose) to access from outside the class.
              </Typography>
            </Box>
          </ConceptInfoCard>

          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              Python doesn&apos;t have truly enforced private variables like some languages. The underscores are mostly a strong agreement between programmers — but the double underscore makes accidental access much less likely.
            </Typography>
          </Alert>
        </Section>

        <Section title="A Protected Bank Account">
          <Typography variant="body2" paragraph>
            By making the balance private and only exposing controlled methods, we guarantee the balance can never be set to something invalid:
          </Typography>

          <CodePartsExplanation
            code={`class BankAccount:
    def __init__(self, balance):
        self.__balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance`}
            parts={[
              {
                label: 'Private attribute',
                part: 'self.__balance = balance',
                color: '#dc2626',
                desc: 'The leading __ hides this value from outside code'
              },
              {
                label: 'Validation',
                part: 'if amount > 0:',
                color: '#9333ea',
                desc: 'A guard that only allows sensible deposits'
              },
              {
                label: 'Getter method',
                part: 'def get_balance(self):',
                color: '#059669',
                desc: 'The safe, read-only way to view the balance'
              }
            ]}
          />

          <ConceptInfoCard>
            <Typography variant="body2" paragraph>
              Step through to see the guard reject bad input:
            </Typography>
            <StepThroughCodeAnimation
              code={encapsulationCode}
              steps={encapsulationSteps}
            />
          </ConceptInfoCard>
        </Section>

        <Section title="The Pythonic Way: @property">
          <Typography variant="body2" paragraph>
            Writing <code>get_x()</code> and <code>set_x()</code> methods everywhere gets clunky. Python&apos;s <code>@property</code> decorator lets you guard an attribute while still using clean dot-syntax to access it.
          </Typography>

          <CodeSnippet
            language="python"
            lines={[
              { code: 'class Temperature:' },
              { code: '    def __init__(self, celsius):' },
              { code: '        self._celsius = celsius' },
              { code: '' },
              { code: '    @property' },
              { code: '    def celsius(self):' },
              { code: '        return self._celsius' },
              { code: '' },
              { code: '    @celsius.setter' },
              { code: '    def celsius(self, value):' },
              { code: '        if value < -273.15:' },
              { code: '            raise ValueError("Below absolute zero!")' },
              { code: '        self._celsius = value' },
              { code: '' },
              { code: 't = Temperature(20)' },
              { code: 't.celsius = 25        # looks like a normal attribute...' },
              { code: 'print(t.celsius)      # ...but the setter validated it: 25' }
            ]}
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            <Typography variant="body2">
              With <code>@property</code>, callers write <code>t.celsius = 25</code> as if it were a plain attribute, but your validation still runs behind the scenes. Best of both worlds.
            </Typography>
          </Alert>
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}
