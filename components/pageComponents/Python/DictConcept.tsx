import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation, { Step } from '../JavaScript/StepThroughCodeAnimation';
import { CodePart } from '@/components/common/CodePartsExplanation';

const createDictSteps: Step[] = [
  {
    label: 'Variable Name',
    desc: 'We create variables called <b>person</b>, <b>colors</b>, and <b>mixed</b> for each dictionary.',
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
    desc: 'We use <b>{</b> to start each dictionary.',
    highlight: '{',
  },
  {
    label: 'Key-Value Pairs',
    desc: 'We put key-value pairs inside the dictionary. Keys and values can be strings, numbers, or a mix.',
    highlight: (codeLines: string[], idx: number) => {
      const match = codeLines[idx].match(/\{(.*)\}/);
      return !!(match && match[1].trim());
    },
  },
  {
    label: 'Closing Brace',
    desc: 'We close each dictionary with a <b>}</b>.',
    highlight: '}',
  },
];

export default function DictConcept() {
  return (
    <ConceptWrapper
      title="Python Dictionaries"
      description="A dictionary in Python is a collection of key-value pairs. Dictionaries are mutable and allow you to quickly look up a value by its key."
    >
      <TableOfContents numbered>
        <Section
          title="Creating a Dictionary"
          subtitle="How to make a dictionary in Python"
        >
          <StepThroughCodeAnimation
            code={[
              "person = {'name': 'Alice', 'age': 30}",
              "colors = {'primary': 'red', 'secondary': 'blue'}",
              "mixed = {1: 'one', 'two': 2, 3.0: [1, 2, 3]}",
            ]}
            steps={createDictSteps}
          />
        </Section>
        <Section
          title="What is a Key-Value Pair?"
          subtitle="Understanding how dictionaries store data"
        >
          <StepThroughCodeAnimation
            code={[
              `{`,
              `   'name': 'Alice',`,
              `   'age': 30`,
              `}`
            ]}
            steps={[
              {
                label: 'Key',
                desc: 'The key is what you use to look up a value in the dictionary. Keys must be unique.',
                highlight: "'name'",
              },
              {
                label: 'Colon',
                desc: 'The colon <b>:</b> separates the key from the value.',
                highlight: ':',
              },
              {
                label: 'Value',
                desc: 'The value is the data stored for that key. It can be any type.',
                highlight: 'Alice',
              },
              {
                label: 'Another Key-Value Pair',
                desc: 'Here is another key-value pair: <b>\'age\': 30</b>. The key is <b>\'age\'</b> and the value is <b>30</b>.',
                highlight: "'age': 30",
              },
            ]}
          />
        </Section>
        <Section
          title="Accessing Values in a Dictionary"
          subtitle="How to get a value from a dictionary using its key"
        >
          <StepThroughCodeAnimation
            code={[
              "person = {'name': 'Alice', 'age': 30}",
              "name = person['name']",
              "print(name)",
              "# Output: Alice",
              "",
              "age = person['age']",
              "print(age)",
              "# Output: 30",
              "",
              "for key in person:",
              "    print(key, person[key])",
              "",
              "for key, value in person.items():",
              "    print(key, value)",
            ]}
            steps={[
              {
                label: 'Create Dictionary',
                desc: 'We make a dictionary called <b>person</b> with two key-value pairs: "name" and "age".',
                highlight: "person = {'name': 'Alice', 'age': 30}",
              },
              {
                label: 'Get Value by Key',
                desc: 'We get the value for the key <b>"name"</b>, which is <b>"Alice"</b>.',
                highlight: "name = person['name']",
              },
              {
                label: 'Print Name',
                desc: 'We print the value for "name".',
                highlight: 'print(name)',
              },
              {
                label: 'Name Output',
                desc: 'Python shows the output <b>Alice</b>.',
                highlight: '# Output: Alice',
              },
              {
                label: 'Get Another Value',
                desc: 'We get the value for the key <b>"age"</b>, which is <b>30</b>.',
                highlight: "age = person['age']",
              },
              {
                label: 'Print Age',
                desc: 'We print the value for "age".',
                highlight: 'print(age)',
              },
              {
                label: 'Age Output',
                desc: 'Python shows the output <b>30</b>.',
                highlight: '# Output: 30',
              },
              {
                label: 'For-Each Key',
                desc: 'We can use a <b>for</b> loop to go through each key in the dictionary and print the key and its value.',
                highlight: 'for key in person:',
              },
              {
                label: 'Print Key and Value',
                desc: 'Inside the loop, we print the key and its value.',
                highlight: 'print(key, person[key])',
              },
              {
                label: 'For-Each Key, Value Pair',
                desc: 'We can also use <b>person.items()</b> to get both the key and value in each loop.',
                highlight: 'for key, value in person.items():',
              },
              {
                label: 'Print Key and Value (items)',
                desc: 'Inside the loop, we print the key and value.',
                highlight: 'print(key, value)',
              },
            ]}
          />
        </Section>
        <Section
          title="Updating Values in a Dictionary"
          subtitle="How to change a value in a dictionary"
        >
          <StepThroughCodeAnimation
            code={[
              "person = {'name': 'Alice', 'age': 30}",
              "person['age'] = 31",
              "print(person)",
              "# Output: {'name': 'Alice', 'age': 31}",
            ]}
            steps={[
              {
                label: 'Create Dictionary',
                desc: 'We create a dictionary called <b>person</b>.',
                highlight: "person = {'name': 'Alice', 'age': 30}",
              },
              {
                label: 'Update Value',
                desc: 'We change the value for the key <b>"age"</b> to <b>31</b>.',
                highlight: "person['age'] = 31",
              },
              {
                label: 'Print Dictionary',
                desc: 'We print the updated dictionary.',
                highlight: 'print(person)',
              },
              {
                label: 'Output',
                desc: 'Python shows the updated dictionary.',
                highlight: "# Output: {'name': 'Alice', 'age': 31}",
              },
            ]}
          />
        </Section>
        <Section
          title="Adding and Removing Values"
          subtitle="How to add or remove items from a dictionary"
        >
          <StepThroughCodeAnimation
            code={[
              "person = {'name': 'Alice', 'age': 30}",
              "person['city'] = 'New York'",
              "print(person)",
              "# Output: {'name': 'Alice', 'age': 30, 'city': 'New York'}",
              "",
              "del person['age']",
              "print(person)",
              "# Output: {'name': 'Alice', 'city': 'New York'}",
            ]}
            steps={[
              {
                label: 'Create Dictionary',
                desc: 'We create a dictionary called <b>person</b>.',
                highlight: "person = {'name': 'Alice', 'age': 30}",
              },
              {
                label: 'Add Value',
                desc: 'We add a new key-value pair: <b>"city": "New York"</b>.',
                highlight: "person['city'] = 'New York'",
              },
              {
                label: 'First Output',
                desc: 'Python shows the dictionary with the new key-value pair.',
                highlight: "# Output: {'name': 'Alice', 'age': 30, 'city': 'New York'}",
              },
              {
                label: 'Remove Value',
                desc: 'We remove the key <b>"age"</b> from the dictionary.',
                highlight: "del person['age']",
              },
              {
                label: 'Second Output',
                desc: 'Python shows the dictionary with "age" removed.',
                highlight: "# Output: {'name': 'Alice', 'city': 'New York'}",
              },
            ]}
          />
        </Section>
        <Section
          title="Common Helper Functions"
          subtitle="Useful built-in functions for working with dictionaries"
        >
          <StepThroughCodeAnimation
            code={[
              "person = {'name': 'Alice', 'age': 30, 'city': 'New York'}",
              '',
              '# Get the number of key-value pairs',
              'length = len(person)',
              'print(length)',
              '# Output: 3',
              '',
              "# Get all the keys in the dictionary",
              "keys = person.keys()",
              "print(keys)",
              "# Output: dict_keys(['name', 'age', 'city'])",
              '',
              "# Get all the values in the dictionary",
              "values = person.values()",
              "print(values)",
              "# Output: dict_values(['Alice', 30, 'New York'])",
              '',
              "# Get all the key-value pairs as tuples",
              "items = person.items()",
              "print(items)",
              "# Output: dict_items([('name', 'Alice'), ('age', 30), ('city', 'New York')])",
            ]}
            steps={[
              {
                label: 'Create Dictionary',
                desc: 'We create a dictionary called <b>person</b>.',
                highlight: "person = {'name': 'Alice', 'age': 30, 'city': 'New York'}",
              },
              {
                label: 'Find Length',
                desc: 'We use <b>len()</b> to find out how many key-value pairs are in the dictionary.',
                highlight: 'length = len(person)',
              },
              {
                label: 'Print Length',
                desc: 'We print the length. The dictionary has <b>3</b> items.',
                highlight: 'print(length)',
              },
              {
                label: 'Length Output',
                desc: 'Python shows the output <b>3</b>.',
                highlight: '# Output: 3',
              },
              {
                label: 'Get Keys',
                desc: 'We use <b>keys()</b> to get all the keys in the dictionary.',
                highlight: 'keys = person.keys()',
              },
              {
                label: 'Print Keys',
                desc: 'We print the keys.',
                highlight: 'print(keys)',
              },
              {
                label: 'Keys Output',
                desc: 'Python shows the keys.',
                highlight: "# Output: dict_keys(['name', 'age', 'city'])",
              },
              {
                label: 'Get Values',
                desc: 'We use <b>values()</b> to get all the values in the dictionary.',
                highlight: 'values = person.values()',
              },
              {
                label: 'Print Values',
                desc: 'We print the values.',
                highlight: 'print(values)',
              },
              {
                label: 'Values Output',
                desc: 'Python shows the values.',
                highlight: "# Output: dict_values(['Alice', 30, 'New York'])",
              },
              {
                label: 'Get Items',
                desc: 'We use <b>items()</b> to get all the key-value pairs in the dictionary.',
                highlight: 'items = person.items()',
              },
              {
                label: 'Print Items',
                desc: 'We print the items.',
                highlight: 'print(items)',
              },
              {
                label: 'Items Output',
                desc: 'Python shows the items.',
                highlight: "# Output: dict_items([('name', 'Alice'), ('age', 30), ('city', 'New York')])",
              },
            ]}
          />
        </Section>
      </TableOfContents>
    </ConceptWrapper>
  );
}