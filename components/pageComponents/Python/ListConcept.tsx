import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';

const createListSteps = [
  {
    label: 'Variable Name',
    desc: 'We create variables called <b>numbers</b>, <b>colors</b>, and <b>mixed</b> for each list.',
    highlight: (codeLines: string[], idx: number) => {
      // Highlight the variable name at the start of each line
      return /^(\w+)/.test(codeLines[idx]);
    },
  },
  {
    label: 'Assignment',
    desc: 'We use <b>=</b> to assign a value to each variable.',
    highlight: '=',
  },
  {
    label: 'Opening Bracket',
    desc: 'We use <b>[</b> to start each list.',
    highlight: '[',
  },
  {
    label: 'Values',
    desc: 'We put values inside the lists. These can be numbers, strings, or a mix.',
    highlight: (codeLines: string[], idx: number) => {
      // Check if there are values inside the brackets
      const match = codeLines[idx].match(/\[(.*)\]/);
      return !!(match && match[1].trim());
    },
  },
  {
    label: 'Closing Bracket',
    desc: 'We close each list with a <b>]</b>.',
    highlight: ']',
  },
];

export default function ListConcept() {
  return (
    <ConceptWrapper
      title="Python Lists"
      description="A list in Python is an ordered collection of values. Lists are mutable, so you can change, add, or remove items."
    >
      <TableOfContents numbered>
        <Section
          title="Creating a List"
          subtitle="How to make a list in Python"
        >
          <StepThroughCodeAnimation
            code={[
              'numbers = [1, 2, 3]',
              'colors = ["red", "green", "blue"]',
              'mixed = [1, "two", 3.0]',
            ]}
            steps={createListSteps}
          />
        </Section>
        <Section
          title="Accessing Values in a List"
          subtitle="How to get a value from a list using its index"
        >
          <StepThroughCodeAnimation
            code={[
              'fruits = ["apple", "banana", "cherry"]',
              'first = fruits[0]',
              'print(first)',
              '# Output: apple',
              '',
              'second = fruits[1]',
              'print(second)',
              '# Output: banana',
              '',
              'third = fruits[2]',
              'print(third)',
              '# Output: cherry',
              '',
              '',
              'for fruit in fruits:',
              '    print(fruit)',
              '',
              'for i in range(len(fruits)):',
              '    print(fruits[i])',
            ]}
            steps={[
              {
                label: 'Create List',
                desc: 'We make a list called <b>fruits</b> with three values: "apple", "banana", and "cherry".',
                highlight: 'fruits = ["apple", "banana", "cherry"]',
              },
              {
                label: 'Get the First Value',
                desc: 'We get the value at position <b>0</b> (the first item), which is <b>"apple"</b>.',
                highlight: 'first = fruits[0]',
              },
              {
                label: 'Print First Value',
                desc: 'We print the first value.',
                highlight: 'print(first)',
              },
              {
                label: 'Get the Second Value',
                desc: 'We get the value at position <b>1</b> (the second item), which is <b>"banana"</b>.',
                highlight: 'second = fruits[1]',
              },
              {
                label: 'Print Second Value',
                desc: 'We print the second value.',
                highlight: 'print(second)',
              },
              {
                label: 'Get the Third Value',
                desc: 'We get the value at position <b>2</b> (the third item), which is <b>"cherry"</b>.',
                highlight: 'third = fruits[2]',
              },
              {
                label: 'Print Third Value',
                desc: 'We print the third value.',
                highlight: 'print(third)',
              },
              {
                label: 'For-Each Loop',
                desc: 'We can also use a <b>for</b> loop to go through each fruit in the list, one at a time.',
                highlight: 'for fruit in fruits:',
              },
              {
                label: 'Print Each Item',
                desc: 'Inside the loop, we print the current fruit. This prints "apple", then "banana", then "cherry", each on its own line.',
                highlight: 'print(fruit)',
              },
              {
                label: 'For Loop with Index',
                desc: 'Another way is to use a loop with an index. <b>range(len(fruits))</b> gives us numbers for each position in the list (0, 1, 2).',
                highlight: 'for i in range(len(fruits)):',
              },
              {
                label: 'Print by Index',
                desc: 'We print each fruit by its index.',
                highlight: 'print(fruits[i])',
              },
            ]}
          />
        </Section>
        <Section
          title="Updating Values in a List"
          subtitle="How to change a value in a list"
        >
          <StepThroughCodeAnimation
            code={[
              'cars = ["Toyota", "Honda", "Ford"]',
              'cars[1] = "Chevrolet"',
              'print(cars)',
              '# Output: [\'Toyota\', \'Chevrolet\', \'Ford\']',
            ]}
            steps={[
              {
                label: 'Create List',
                desc: 'We create a list called <b>cars</b> with three values: "Toyota", "Honda", and "Ford".',
                highlight: 'cars = ["Toyota", "Honda", "Ford"]',
              },
              {
                label: 'Update Value',
                desc: 'We change the value at index 1 (the second value) to <b>"Chevrolet"</b>.',
                highlight: 'cars[1] = "Chevrolet"',
              },
              {
                label: 'Print List',
                desc: 'We print the updated list: <b>[\'Toyota\', \'Chevrolet\', \'Ford\']</b>.',
                highlight: 'print(cars)',
              },
            ]}
          />
        </Section>
        <Section
          title="Adding and Removing Values"
          subtitle="How to add or remove items from a list"
        >
          <StepThroughCodeAnimation
            code={[
              'animals = ["cat", "dog", "rabbit"]',
              'animals.append("hamster")',
              'print(animals)',
              '# Output: [\'cat\', \'dog\', \'rabbit\', \'hamster\']',
              ' ',
              'animals.remove("dog")',
              'print(animals)',
              '# Output: [\'cat\', \'rabbit\', \'hamster\']',
            ]}
            steps={[
              {
                label: 'Create List',
                desc: 'We create a list called <b>animals</b>.',
                highlight: 'animals = ["cat", "dog", "rabbit"]',
              },
              {
                label: 'Add Value',
                desc: 'We add <b>"hamster"</b> to the end of the list.',
                highlight: 'animals.append("hamster")',
              },
              {
                label: 'Print List',
                desc: 'We print the list: <b>[\'cat\', \'dog\', \'rabbit\', \'hamster\']</b>.',
                highlight: '# Output: [\'cat\', \'dog\', \'rabbit\', \'hamster\']',
              },
              {
                label: 'Remove Value',
                desc: 'We remove <b>"dog"</b> from the list.',
                highlight: 'animals.remove("dog")',
              },
              {
                label: 'Print List',
                desc: 'We print the updated list: <b>[\'cat\', \'rabbit\', \'hamster\']</b>.',
                highlight: '# Output: [\'cat\', \'rabbit\', \'hamster\']',
              },
            ]}
          />
        </Section>
        <Section
          title="Common Helper Functions"
          subtitle="Useful built-in functions for working with lists"
        >
          <StepThroughCodeAnimation
            code={[
              'numbers = [4, 7, 2, 9]',
              ' ',
              'length = len(numbers)',
              'print(length)',
              '# Output: 4',
              ' ',
              'smallest = min(numbers)',
              'print(smallest)',
              '# Output: 2',
              ' ',
              'largest = max(numbers)',
              'print(largest)',
              '# Output: 9',
              ' ',
              'total = sum(numbers)',
              'print(total)',
              '# Output: 22',
            ]}
            steps={[
              {
                label: 'Create List',
                desc: 'We create a list called <b>numbers</b>.',
                highlight: 'numbers = [4, 7, 2, 9]',
              },
              {
                label: 'Find Length',
                desc: 'We use <b>len()</b> to find out how many items are in the list.',
                highlight: 'length = len(numbers)',
              },
              {
                label: 'Print Length',
                desc: 'We print the length. The list has <b>4</b> items.',
                highlight: 'print(length)',
              },
              {
                label: 'Find Smallest Value',
                desc: 'We use <b>min()</b> to get the smallest value in the list.',
                highlight: 'smallest = min(numbers)',
              },
              {
                label: 'Print Smallest',
                desc: 'We print the smallest value.',
                highlight: 'print(smallest)',
              },
              {
                label: 'Find Largest Value',
                desc: 'We use <b>max()</b> to get the largest value in the list.',
                highlight: 'largest = max(numbers)',
              },
              {
                label: 'Print Largest',
                desc: 'We print the largest value.',
                highlight: 'print(largest)',
              },
              {
                label: 'Find Sum',
                desc: 'We use <b>sum()</b> to add up all the values in the list.',
                highlight: 'total = sum(numbers)',
              },
              {
                label: 'Print Sum',
                desc: 'We print the total.',
                highlight: 'print(total)',
              },
            ]}
          />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}