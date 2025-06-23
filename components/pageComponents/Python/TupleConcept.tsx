import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';


export default function TupleConcept() {
  return (
    <ConceptWrapper
      title="Python Tuples"
      description="A tuple in Python is an ordered collection of values, similar to a list, but tuples are immutable (they cannot be changed after creation)."
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
              src="https://www.canva.com/design/DAGrHzn1oL8/6Enn7m4iCJLh5-DkhWjifw/watch?embed"
              allowFullScreen
              allow="fullscreen"
            ></iframe>
          </div>
          <Section
            title="Creating a Tuple"
            subtitle="How to make a tuple in Python"
          >
            <StepThroughCodeAnimation
              code={[
                'coords = (4, 5)',
                'colors = ("red", "green", "blue")',
                'single = (42)',
                'empty = ()',
              ]}
              steps={[
                {
                  label: 'Numbers Tuple',
                  desc: 'A tuple of numbers is created and stored in <b>coords</b>.',
                  highlight: 'coords = (4, 5)',
                },
                {
                  label: 'Strings Tuple',
                  desc: 'A tuple of strings is created and stored in <b>colors</b>.',
                  highlight: 'colors = ("red", "green", "blue")',
                },
                {
                  label: 'Single Value Tuple',
                  desc: 'A tuple with one value (note the comma!) is stored in <b>single</b>.',
                  highlight: 'single = (42)',
                },
                {
                  label: 'Empty Tuple',
                  desc: 'An empty tuple is created and stored in <b>empty</b>.',
                  highlight: 'empty = ()',
                },
              ]}
            />
          </Section>
          <Section
            title="Accessing Values in a Tuple"
            subtitle="How to get a value from a tuple using its index"
          >
            <StepThroughCodeAnimation
              code={[
                'colors = ("red", "green", "blue")',
                'first = colors[0]',
                'print(first)',
                '# Output: red',
                '',
                'second = colors[1]',
                'print(second)',
                '# Output: green',
                '',
                'third = colors[2]',
                'print(third)',
                '# Output: blue',
                '',
                '',
                'for color in colors:',
                '    print(color)',
                '',
                'for i in range(len(colors)):',
                '    print(colors[i])',
              ]}
              steps={[
                {
                  label: 'Create Tuple',
                  desc: 'We make a tuple called <b>colors</b> with three values: "red", "green", and "blue".',
                  highlight: 'colors = ("red", "green", "blue")',
                },
                {
                  label: 'Get the First Value',
                  desc: 'We get the value at position <b>0</b> (the first item), which is <b>"red"</b>.',
                  highlight: 'first = colors[0]',
                },
                {
                  label: 'Print First Value',
                  desc: 'We print the first value.',
                  highlight: 'print(first)',
                },
                {
                  label: 'First Output',
                  desc: 'Python shows the output <b>red</b>.',
                  highlight: '# Output: red',
                },
                {
                  label: 'Get the Second Value',
                  desc: 'We get the value at position <b>1</b> (the second item), which is <b>"green"</b>.',
                  highlight: 'second = colors[1]',
                },
                {
                  label: 'Print Second Value',
                  desc: 'We print the second value.',
                  highlight: 'print(second)',
                },
                {
                  label: 'Second Output',
                  desc: 'Python shows the output <b>green</b>.',
                  highlight: '# Output: green',
                },
                {
                  label: 'Get the Third Value',
                  desc: 'We get the value at position <b>2</b> (the third item), which is <b>"blue"</b>.',
                  highlight: 'third = colors[2]',
                },
                {
                  label: 'Print Third Value',
                  desc: 'We print the third value.',
                  highlight: 'print(third)',
                },
                {
                  label: 'Third Output',
                  desc: 'Python shows the output <b>blue</b>.',
                  highlight: '# Output: blue',
                },
                {
                  label: 'For-Each Loop',
                  desc: 'We can also use a <b>for</b> loop to go through each color in the tuple, one at a time.',
                  highlight: 'for color in colors:',
                },
                {
                  label: 'Print Each Item',
                  desc: 'Inside the loop, we print the current color. This prints "red", then "green", then "blue", each on its own line.',
                  highlight: 'print(color)',
                },
                {
                  label: 'For Loop with Index',
                  desc: 'Another way is to use a loop with an index. <b>range(len(colors))</b> gives us numbers for each position in the tuple (0, 1, 2).',
                  highlight: 'for i in range(len(colors)):',
                },
                {
                  label: 'Print by Index',
                  desc: 'This prints "red", then "green", then "blue", each on its own line.',
                  highlight: 'print(colors[i])',
                },
              ]}
            />
          </Section>
        </Section>
        <Section title="Updating, Adding, and Removing Values (You Can't)">
          <Section
            title="Updating Values in a Tuple"
            subtitle="Can you change a value in a tuple?"
          >
            <StepThroughCodeAnimation
              code={[
                'coords = (4, 5)',
                'coords[0] = 10',
                '# TypeError: \'tuple\' object does not support item assignment',
                '',
              ]}
              steps={[
                {
                  label: 'Create Tuple',
                  desc: 'We create a tuple called <b>coords</b>.',
                  highlight: 'coords = (4, 5)',
                },
                {
                  label: 'Try to Update Value',
                  desc: 'We try to change the value at index 0. <b>This will cause an error because tuples cannot be changed!</b>',
                  highlight: 'coords[0] = 10',
                },
                {
                  label: 'TypeError Output',
                  desc: 'Python shows a <b>TypeError</b> because tuples are immutable.',
                  highlight: '# TypeError: \'tuple\' object does not support item assignment',
                },
              ]}
            />
          </Section>
          <Section
            title="Adding and Removing Values"
            subtitle="Can you add or remove items from a tuple?"
          >
            <StepThroughCodeAnimation
              code={[
                'animals = ("cat", "dog", "rabbit")',
                'animals.append("hamster")',
                '# AttributeError: \'tuple\' object has no attribute \'append\'',
                '',
                'animals.remove("dog")',
                '# AttributeError: \'tuple\' object has no attribute \'remove\'',
                '',
              ]}
              steps={[
                {
                  label: 'Create Tuple',
                  desc: 'We create a tuple called <b>animals</b>.',
                  highlight: 'animals = ("cat", "dog", "rabbit")',
                },
                {
                  label: 'Try to Add Value',
                  desc: 'We try to add <b>"hamster"</b> to the tuple. <b>This will cause an error because tuples cannot be changed!</b>',
                  highlight: 'animals.append("hamster")',
                },
                {
                  label: 'Append AttributeError Output',
                  desc: 'Python shows an <b>AttributeError</b> because tuples do not have an <code>append</code> method.',
                  highlight: '# AttributeError: \'tuple\' object has no attribute \'append\'',
                },
                {
                  label: 'Try to Remove Value',
                  desc: 'We try to remove <b>"dog"</b> from the tuple. <b>This will cause an error because tuples cannot be changed!</b>',
                  highlight: 'animals.remove("dog")',
                },
                {
                  label: 'Remove AttributeError Output',
                  desc: 'Python shows an <b>AttributeError</b> because tuples do not have a <code>remove</code> method.',
                  highlight: '# AttributeError: \'tuple\' object has no attribute \'remove\'',
                },
              ]}
            />
          </Section>
        </Section>
        <Section
          title="Common Helper Functions"
          subtitle="Useful built-in functions for working with tuples"
        >
          <StepThroughCodeAnimation
            code={[
              'numbers = (4, 7, 2, 9)',
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
              '',
            ]}
            steps={[
              {
                label: 'Create Tuple',
                desc: 'We create a tuple called <b>numbers</b>.',
                highlight: 'numbers = (4, 7, 2, 9)',
              },
              {
                label: 'Find Length',
                desc: 'We use <b>len()</b> to find out how many items are in the tuple.',
                highlight: 'length = len(numbers)',
              },
              {
                label: 'Print Length',
                desc: 'We print the length. The tuple has <b>4</b> items.',
                highlight: 'print(length)',
              },
              {
                label: 'Length Output',
                desc: 'Python shows the output <b>4</b>.',
                highlight: '# Output: 4',
              },
              {
                label: 'Find Smallest Value',
                desc: 'We use <b>min()</b> to get the smallest value in the tuple.',
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
                desc: 'We use <b>max()</b> to get the largest value in the tuple.',
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
                desc: 'We use <b>sum()</b> to add up all the values in the tuple.',
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