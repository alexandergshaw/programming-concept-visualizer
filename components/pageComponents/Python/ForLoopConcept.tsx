import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation, { Step } from '../JavaScript/StepThroughCodeAnimation';
import InteractiveStepThrough from '../../common/InteractiveStepThrough';

const forLoopSteps: Step[] = [
    {
        label: 'Create List',
        desc: 'We define a list called <b>fruits</b> with three items: "apple", "banana", and "cherry".',
        highlight: 'fruits = ["apple", "banana", "cherry"]',
    },
    {
        label: 'Start For Loop',
        desc: 'The <b>for</b> loop begins. It will repeat once for each item in <b>fruits</b>.',
        highlight: 'for fruit in fruits:',
    },
    {
        label: 'Assign Value to Variable',
        desc: 'On each loop, the next value from <b>fruits</b> is stored in the <b>fruit</b> variable. First "apple", then "banana", then "cherry".',
        highlight: [' fruit ', 'apple, banana, cherry'],
    },
    {
        label: 'First Iteration',
        desc: 'On the first loop, <b>fruit</b> is <b style="color:#d14;">"apple"</b>.',
        highlight: ' fruit ',
    },
    {
        label: 'Print First Item',
        desc: 'We print the value of <b>fruit</b>, which is "apple".',
        highlight: '    print(fruit)',
    },
    {
        label: 'Second Iteration',
        desc: 'On the second loop, <b>fruit</b> is "banana".',
        highlight: ' fruit ',
    },
    {
        label: 'Print Second Item',
        desc: 'We print the value of <b>fruit</b>, which is "banana".',
        highlight: '    print(fruit)',
    },
    {
        label: 'Third Iteration',
        desc: 'On the third loop, <b>fruit</b> is "cherry".',
        highlight: ' fruit ',
    },
    {
        label: 'Print Third Item',
        desc: 'We print the value of <b>fruit</b>, which is "cherry".',
        highlight: '    print(fruit)',
    },
    {
        label: 'Loop Ends',
        desc: 'All items have been printed. The loop ends.',
        highlight: '# Output:',
    },
];

const rangeSteps: Step[] = [
    {
        label: 'Start For Loop with range()',
        desc: 'We use <b>range(3)</b> to create a sequence of numbers: 0, 1, 2.',
        highlight: 'for i in range(3):',
    },
    {
        label: 'First Iteration',
        desc: '<b>i</b> is 0 on the first loop.',
        highlight: 'for i in range(3):',
    },
    {
        label: 'Print 0',
        desc: 'We print the value of <b>i</b>, which is 0.',
        highlight: '    print(i)',
    },
    {
        label: 'Second Iteration',
        desc: '<b>i</b> is 1 on the second loop.',
        highlight: 'for i in range(3):',
    },
    {
        label: 'Print 1',
        desc: 'We print the value of <b>i</b>, which is 1.',
        highlight: '    print(i)',
    },
    {
        label: 'Third Iteration',
        desc: '<b>i</b> is 2 on the third loop.',
        highlight: 'for i in range(3):',
    },
    {
        label: 'Print 2',
        desc: 'We print the value of <b>i</b>, which is 2.',
        highlight: '    print(i)',
    },
    {
        label: 'Loop Ends',
        desc: 'The loop ends after printing 2, since <b>range(3)</b> only includes 0, 1, and 2.',
        highlight: '# Output:',
    },
];

const filesSteps = [
    {
        label: 'Create List of Files',
        desc: 'We define a list called <b>files</b> with three filenames.',
        highlight: 'files = ["report1.csv", "report2.csv", "report3.csv"]',
    },
    {
        label: 'Start For Loop',
        desc: 'The <b>for</b> loop will repeat once for each file in <b>files</b>.',
        highlight: 'for filename in files:',
    },
    {
        label: 'First Iteration',
        desc: '<b>filename</b> is "report1.csv".',
        highlight: 'for filename in files:',
    },
    {
        label: 'Process First File',
        desc: 'We print a message for "report1.csv".',
        highlight: '    print("Processing", filename)',
    },
    {
        label: 'Second Iteration',
        desc: '<b>filename</b> is "report2.csv".',
        highlight: 'for filename in files:',
    },
    {
        label: 'Process Second File',
        desc: 'We print a message for "report2.csv".',
        highlight: '    print("Processing", filename)',
    },
    {
        label: 'Third Iteration',
        desc: '<b>filename</b> is "report3.csv".',
        highlight: 'for filename in files:',
    },
    {
        label: 'Process Third File',
        desc: 'We print a message for "report3.csv".',
        highlight: '    print("Processing", filename)',
    },
    {
        label: 'Loop Ends',
        desc: 'All files have been processed. The loop ends.',
        highlight: '# End',
    },
];

export default function ForLoopConcept() {
    return (
        <ConceptWrapper
            title="Python For Loops"
            description="A for loop lets you repeat code for each item in a collection, like a list or a string."
        >
            <TableOfContents numbered>
                <Section title="What is a For Loop?">
                    <p>
                        A <b>for loop</b> lets you run code for each item in a sequence (like a list, tuple, or string). It's perfect when you know how many times you want to repeat something.
                    </p>
                </Section>
                <Section title="Try It: Interactive For Loop">
                    <InteractiveStepThrough
                        codeTemplate={inputs => [
                            `fruits = ["${inputs.fruit1}", "${inputs.fruit2}", "${inputs.fruit3}"]`,
                            'for fruit in fruits:',
                            '    print(fruit)',
                            '# Output:',
                            `# ${inputs.fruit1}`,
                            `# ${inputs.fruit2}`,
                            `# ${inputs.fruit3}`,
                        ]}
                        stepsTemplate={inputs => [
                            {
                                label: 'Create List',
                                desc: `We define a list called <b>fruits</b> with three items: "${inputs.fruit1}", "${inputs.fruit2}", and "${inputs.fruit3}".`,
                                highlight: `fruits = ["${inputs.fruit1}", "${inputs.fruit2}", "${inputs.fruit3}"]`,
                            },
                            {
                                label: 'Start For Loop',
                                desc: 'The <b>for</b> loop begins. It will repeat once for each item in <b>fruits</b>.',
                                highlight: 'for fruit in fruits:',
                            },
                            {
                                label: 'Assign Value to Variable',
                                desc: `On each loop, the next value from <b>fruits</b> is stored in the <b>fruit</b> variable. First "${inputs.fruit1}", then "${inputs.fruit2}", then "${inputs.fruit3}".`,
                                highlight: [' fruit ', `"${String(inputs.fruit1)}"`, `"${String(inputs.fruit2)}"`, `"${String(inputs.fruit3)}"`],
                            },
                            {
                                label: 'First Iteration',
                                desc: `On the first loop, <b>fruit</b> is <b style="color:#d14;">"${inputs.fruit1}"</b>.`,
                                highlight: [' fruit ', `"${inputs.fruit1}"`],
                            },
                            {
                                label: 'Print First Item',
                                desc: `We print the value of <b>fruit</b>, which is "${inputs.fruit1}".`,
                                highlight: ['    print(fruit)', `# ${inputs.fruit1}`],
                            },
                            {
                                label: 'Second Iteration',
                                desc: `On the second loop, <b>fruit</b> is "${inputs.fruit2}".`,
                                highlight: [' fruit ', `"${inputs.fruit2}"`],
                            },
                            {
                                label: 'Print Second Item',
                                desc: `We print the value of <b>fruit</b>, which is "${inputs.fruit2}".`,
                                highlight: ['    print(fruit)', `# ${inputs.fruit2}`],
                            },
                            {
                                label: 'Third Iteration',
                                desc: `On the third loop, <b>fruit</b> is "${inputs.fruit3}".`,
                                highlight: [' fruit ', `"${inputs.fruit3}"`],
                            },
                            {
                                label: 'Print Third Item',
                                desc: `We print the value of <b>fruit</b>, which is "${inputs.fruit3}".`,
                                highlight: ['    print(fruit)', `# ${inputs.fruit3}`],
                            },
                            {
                                label: 'Loop Ends',
                                desc: 'All values in the list have been looped over. The loop ends.',
                                highlight: '',
                            },
                        ]}
                        inputConfigs={[
                            {
                                name: 'fruit1',
                                label: 'First Fruit',
                                options: [
                                    { label: 'apple', value: 'apple' },
                                    { label: 'orange', value: 'orange' },
                                    { label: 'grape', value: 'grape' },
                                ],
                                defaultValue: 'apple',
                            },
                            {
                                name: 'fruit2',
                                label: 'Second Fruit',
                                options: [
                                    { label: 'banana', value: 'banana' },
                                    { label: 'pear', value: 'pear' },
                                    { label: 'kiwi', value: 'kiwi' },
                                ],
                                defaultValue: 'banana',
                            },
                            {
                                name: 'fruit3',
                                label: 'Third Fruit',
                                options: [
                                    { label: 'cherry', value: 'cherry' },
                                    { label: 'mango', value: 'mango' },
                                    { label: 'lemon', value: 'lemon' },
                                ],
                                defaultValue: 'cherry',
                            },
                        ]}
                    />
                </Section>
                <Section title="What is range()? (Interactive)">
                    <p>
                        <b>range</b> is a built-in Python function that generates a sequence of numbers, starting from 0 by default, and stopping before the number you give it. It's commonly used to repeat something a specific number of times in a loop.
                    </p>
                    <p>
                        <b>Try changing the range below to see how it affects the loop:</b>
                    </p>
                    <InteractiveStepThrough
                        codeTemplate={inputs => [
                            `for i in range(${inputs.count}):`,
                            '    print(i)',
                            '# Output:',
                            ...Array.from({ length: Number(inputs.count) }, (_, i) => `# ${i}`),
                        ]}
                        stepsTemplate={inputs => {
                            const count = Number(inputs.count);
                            const steps: Step[] = [
                                {
                                    label: 'Start For Loop with range()',
                                    desc: `We use <b>range(${count})</b> to create a sequence of numbers: ${Array.from({ length: count }, (_, i) => i).join(', ')}.`,
                                    highlight: `for i in range(${count}):`,
                                },
                            ];
                            for (let i = 0; i < count; i++) {
                                steps.push(
                                    {
                                        label: `Iteration ${i + 1}`,
                                        desc: `<b>i</b> is ${i} on this loop.`,
                                        highlight: `for i in range(${count}):`,
                                    },
                                    {
                                        label: `Print ${i}`,
                                        desc: `We print the value of <b>i</b>, which is ${i}.`,
                                        highlight: ['    print(i)', `# ${i}`],
                                    }
                                );
                            }
                            steps.push({
                                label: 'Loop Ends',
                                desc: `The loop ends after printing ${count - 1}, since <b>range(${count})</b> only includes numbers up to ${count - 1}.`,
                                highlight: '# Output:',
                            });
                            return steps;
                        }}
                        inputConfigs={[
                            {
                                name: 'count',
                                label: 'Range Count',
                                options: [
                                    { label: '3', value: 3 },
                                    { label: '5', value: 5 },
                                    { label: '10', value: 10 },
                                ],
                                defaultValue: 3,
                            },
                        ]}
                    />
                </Section>
                <Section title="Real-World Example: Processing Files">
                    <p>
                        For loops are often used to process items in a list, such as files in a folder.
                    </p>
                    <StepThroughCodeAnimation
                        code={[
                            'files = ["report1.csv", "report2.csv", "report3.csv"]',
                            'for filename in files:',
                            '    print("Processing", filename)',
                        ]}
                        steps={filesSteps}
                    />
                </Section>
                <Section title="Tips & Common Mistakes">
                    <ul>
                        <li>Use <b>for</b> when you know how many times to repeat, or when looping through a collection.</li>
                        <li>Remember: <b>range(n)</b> goes from 0 up to (but not including) n.</li>
                        <li>Don't change the list you're looping over inside the loop.</li>
                    </ul>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}