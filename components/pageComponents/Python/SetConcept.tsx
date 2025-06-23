import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation, { Step } from '../JavaScript/StepThroughCodeAnimation';

const createSetSteps: Step[] = [
  {
    label: 'Variable Name',
    desc: 'We create variables called <b>unique_numbers</b>, <b>colors</b>, and <b>mixed</b> for each set.',
    highlight: (codeLines: string[], idx: number) => {
      return /^(\w+)/.test(codeLines[idx]);
    },
  },
  {
    label: 'Assignment',
    desc: 'We use <b>=</b> to assign a value to each variable.',
    highlight: '=',
  },
  {
    label: 'Opening Brace',
    desc: 'We use <b>{</b> to start each set.',
    highlight: '{',
  },
  {
    label: 'Values',
    desc: 'We put values inside the sets. These can be numbers, strings, or a mix.',
    highlight: (codeLines: string[], idx: number) => {
      const match = codeLines[idx].match(/\{(.*)\}/);
      return !!(match && match[1].trim());
    },
  },
  {
    label: 'Closing Brace',
    desc: 'We close each set with a <b>}</b>.',
    highlight: '}',
  },
];

export default function SetConcept() {
  return (
    <ConceptWrapper
      title="Python Sets"
      description="A set in Python is an unordered collection of unique values. Sets are mutable, but cannot contain duplicate items."
    >
      <TableOfContents numbered>
        <Section title="Introduction">
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.25%',
              paddingBottom: 0,
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: 8,
              willChange: 'transform',
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGrHqNMVgw/33I1Uxnyn_JrGR9mE-sg0g/watch?embed"
              allowFullScreen
              allow="fullscreen"
            ></iframe>
          </div>
          <Section
            title="Creating a Set"
          >
            <StepThroughCodeAnimation
              code={[
                'unique_numbers = {1, 2, 3}',
                'colors = {"red", "green", "blue"}',
                'mixed = {1, "two", 3.0}',
              ]}
              steps={createSetSteps}
            />
          </Section>
          <Section
            title="Accessing Values in a Set"
          >
            <div style={{ marginBottom: 16 }}>
              <b>Note:</b> You <b>cannot</b> access a set by index in Python, because sets are unordered collections. If you need to access items by position, use a list or tuple instead.
            </div>
            <StepThroughCodeAnimation
              code={[
                'fruits = {"apple", "banana", "cherry"}',
                '',
                'print(fruits[0])',
                '# TypeError: \'set\' object is not subscriptable',
                '',
                'print("apple" in fruits)',
                '# Output: True',
                '',
                'print("orange" in fruits)',
                '# Output: False',
                '',
                'for fruit in fruits:',
                '   print(fruit)',
              ]}
              steps={[
                {
                  label: 'Create Set',
                  desc: 'We make a set called <b>fruits</b> with three values: "apple", "banana", and "cherry".',
                  highlight: 'fruits = {"apple", "banana", "cherry"}',
                },
                {
                  label: 'Try Index Access',
                  desc: 'We try to access the first element by index. <b>This will cause a TypeError because sets do not support indexing (because they do not maintain the order of their items).</b>',
                  highlight: 'print(fruits[0])',
                },
                {
                  label: 'TypeError Output',
                  desc: 'Python shows a <b>TypeError</b> because sets do not maintain order (they are unordered).',
                  highlight: "# TypeError: 'set' object is not subscriptable",
                },
                {
                  label: 'Check for Value',
                  desc: 'We can, however, check if <b>"apple"</b> is in the set. This prints <b>True</b>, since it is in the set.',
                  highlight: 'print("apple" in fruits)',
                },
                {
                  label: 'Check for Another Value',
                  desc: 'We can also check if <b>"orange"</b> is in the set. This prints <b>False</b>, since it is not in the set.',
                  highlight: 'print("orange" in fruits)',
                },
                {
                  label: 'For-Each Loop',
                  desc: 'We use a <b>for</b> loop to go through each fruit in the set. The order is not guaranteed.',
                  highlight: 'for fruit in fruits:',
                },
                {
                  label: 'Print Each Item',
                  desc: 'Inside the loop, we print the current fruit. Each fruit is printed, but the order may be different each time.',
                  highlight: 'print(fruit)',
                },
              ]}
            />
          </Section>
        </Section>

        <Section
          title="Adding and Removing Values in a Set"
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 0,
              paddingTop: '56.25%',
              paddingBottom: 0,
              boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
              marginTop: '1.6em',
              marginBottom: '0.9em',
              overflow: 'hidden',
              borderRadius: 8,
              willChange: 'transform',
            }}
          >
            <iframe
              loading="lazy"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                border: 'none',
                padding: 0,
                margin: 0,
              }}
              src="https://www.canva.com/design/DAGrHsqkpKQ/gnAXOUSXbDInvjhdp8POmA/watch?embed"
              allowFullScreen
              allow="fullscreen"
            ></iframe>
          </div>
          <a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAGrHsqkpKQ&#x2F;gnAXOUSXbDInvjhdp8POmA&#x2F;watch?utm_content=DAGrHsqkpKQ&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Python - Sets - Adding and Removing Values</a> by Alex Shaw
          <StepThroughCodeAnimation
            code={[
              'colors = {"red", "green", "blue"}',
              'colors.add("yellow")',
              'print(colors)',
              '# Output: {\'red\', \'green\', \'yellow\', \'blue\'}',
              '',
              'colors.remove("green")',
              'print(colors)',
              "# Output: {'red', 'yellow', 'blue'}",
            ]}
            steps={[
              {
                label: 'Create Set',
                desc: 'We create a set called <b>colors</b>.',
                highlight: 'colors = {"red", "green", "blue"}',
              },
              {
                label: 'Add Value',
                desc: 'We add <b>"yellow"</b> to the set.',
                highlight: 'colors.add("yellow")',
              },
              {
                label: 'First Output',
                desc: 'Python shows the output with all items, including "yellow". The order may be different, since a Python set does not maintain order like a list or tuple.',
                highlight: "# Output: {'red', 'green', 'yellow', 'blue'}",
              },
              {
                label: 'Remove Value',
                desc: 'We remove <b>"green"</b> from the set.',
                highlight: 'colors.remove("green")',
              },
              {
                label: 'Second Output',
                desc: 'Python shows the output with "green" removed. The order may be different, since a Python set does not maintain order like a list or tuple.',
                highlight: "# Output: {'red', 'yellow', 'blue'}",
              },
            ]}
          />
        </Section>
        <Section
          title="Common Helper Functions"
          subtitle="Useful built-in functions for working with sets"
        >
          <StepThroughCodeAnimation
            code={[
              'numbers = {4, 7, 2, 9}',
              '',
              'length = len(numbers)',
              'print(length)',
              '# Output: 4',
              '',
              'smallest = min(numbers)',
              'print(smallest)',
              '# Output: 2',
              '',
              'largest = max(numbers)',
              'print(largest)',
              '# Output: 9',
              '',
              'total = sum(numbers)',
              'print(total)',
              '# Output: 22',
            ]}
            steps={[
              {
                label: 'Create Set',
                desc: 'We create a set called <b>numbers</b>.',
                highlight: 'numbers = {4, 7, 2, 9}',
              },
              {
                label: 'Find Length',
                desc: 'We use <b>len()</b> to find out how many items are in the set.',
                highlight: 'length = len(numbers)',
              },
              {
                label: 'Print Length',
                desc: 'We print the length. The set has <b>4</b> items.',
                highlight: 'print(length)',
              },
              {
                label: 'Length Output',
                desc: 'Python shows the output <b>4</b>.',
                highlight: '# Output: 4',
              },
              {
                label: 'Find Smallest Value',
                desc: 'We use <b>min()</b> to get the smallest value in the set.',
                highlight: 'smallest = min(numbers)',
              },
              {
                label: 'Print Smallest',
                desc: 'We print the smallest value.',
                highlight: 'print(smallest)',
              },
              {
                label: 'Smallest Output',
                desc: 'Python shows the output <b>2</b>.',
                highlight: '# Output: 2',
              },
              {
                label: 'Find Largest Value',
                desc: 'We use <b>max()</b> to get the largest value in the set.',
                highlight: 'largest = max(numbers)',
              },
              {
                label: 'Print Largest',
                desc: 'We print the largest value.',
                highlight: 'print(largest)',
              },
              {
                label: 'Largest Output',
                desc: 'Python shows the output <b>9</b>.',
                highlight: '# Output: 9',
              },
              {
                label: 'Find Sum',
                desc: 'We use <b>sum()</b> to add up all the values in the set.',
                highlight: 'total = sum(numbers)',
              },
              {
                label: 'Print Sum',
                desc: 'We print the total.',
                highlight: 'print(total)',
              },
              {
                label: 'Sum Output',
                desc: 'Python shows the output <b>22</b>.',
                highlight: '# Output: 22',
              },
            ]}
          />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}