import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';

const whileLoopSteps = [
    {
        label: 'Initialize Variable',
        desc: 'We start by creating a variable <b>count</b> and set it to <b>0</b>.',
        highlight: 'count = 0',
    },
    {
        label: 'While Condition',
        desc: 'The <b>while</b> loop will keep running as long as <b>count &lt; 3</b> is true.',
        highlight: 'while count < 3:',
    },
    {
        label: 'Print Statement',
        desc: 'Inside the loop, we print the current value of <b>count</b>.',
        highlight: '    print(count)',
    },
    {
        label: 'Increment Variable',
        desc: 'We add <b>1</b> to <b>count</b> each time the loop runs.',
        highlight: '    count += 1',
    },
    {
        label: 'Loop Ends',
        desc: 'When <b>count</b> is no longer less than <b>3</b>, the loop stops.',
        highlight: '# Output:',
    },
];

export default function WhileLoopConcept() {
    return (
        <ConceptWrapper
            title="Python While Loops"
            description="A while loop repeats a block of code as long as a condition is true. Let's explore how it works, see common patterns, and try it yourself!"
        >
            <TableOfContents numbered>
                <Section title="What is a While Loop?">
                    <p>
                        A <b>while loop</b> lets you repeat code as long as a condition is <b>true</b>. It&apos;s like saying: &quot;Keep doing this until something changes.&quot;
                    </p>
                </Section>
                <Section title="Basic While Loop (Code Animation)">
                    <StepThroughCodeAnimation
                        code={[
                            'count = 0',
                            'while count < 3:',
                            '    print(count)',
                            '    count += 1',
                            '# Output:',
                            '# 0',
                            '# 1',
                            '# 2',
                        ]}
                        steps={whileLoopSteps}
                    />
                </Section>

                <Section title="Real-World Example: Waiting for a File to Arrive">
                    <p>
                        In many workplace scripts, you might need to <b>wait for a file</b> to appear before continuing. A <b>while loop</b> can check repeatedly until the file exists.
                    </p>
                    <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 6, padding: '10px 14px', margin: '12px 0' }}>
                        <b>Scenario:</b> Your script should process a report as soon as it arrives in a folder.
                    </div>
                    <StepThroughCodeAnimation
                        code={[
                            'import os',
                            'import time',
                            '',
                            'while not os.path.exists("report.csv"):',
                            '    print("Waiting for report.csv...")',
                            '    time.sleep(5)  # Wait 5 seconds before checking again',
                            '',
                            'print("File found! Processing...")',
                        ]}
                        steps={[
                            {
                                label: 'Import Modules',
                                desc: 'We import <b>os</b> to check for files and <b>time</b> to pause the script.',
                                highlight: 'import os',
                            },
                            {
                                label: 'Start Loop',
                                desc: 'The <b>while</b> loop runs as long as <b>report.csv</b> does not exist.',
                                highlight: 'while not os.path.exists("report.csv"):',
                            },
                            {
                                label: 'Print Waiting Message',
                                desc: 'If the file is not found, print a waiting message.',
                                highlight: '    print("Waiting for report.csv...")',
                            },
                            {
                                label: 'Pause Before Next Check',
                                desc: 'Wait 5 seconds before checking again, so we don&apos;t overload the system.',
                                highlight: '    time.sleep(5)',
                            },
                            {
                                label: 'File Found!',
                                desc: 'When <b>report.csv</b> appears, the loop ends and we print a confirmation.',
                                highlight: 'print("File found! Processing...")',
                            },
                        ]}
                    />
                </Section>

                <Section title="Infinite Loop (Common Mistake)">
                    <p>
                        When a loop continues forever because the condition never becomes false, we call this an <b>infinite loop</b>. This usually occurs when the loop condition never becomes <b>false</b> because a variable isn’t updated correctly.
                    </p>
                    <div style={{ background: '#fff1f0', border: '1px solid #ffa39e', borderRadius: 6, padding: '10px 14px', margin: '12px 0' }}>
                        <b>Example:</b> The variable <code>count</code> is never changed, so the loop never ends.
                    </div>

                    <StepThroughCodeAnimation
                        code={[
                            'count = 0',
                            'while count < 5:',
                            '    print("Counting...")',
                            '    # Oops! Forgot to increment count',
                        ]}
                        steps={[
                            {
                                label: 'Initialize Variable',
                                desc: 'Set <b>count</b> to 0.',
                                highlight: 'count = 0',
                            },
                            {
                                label: 'Start Loop',
                                desc: 'The loop checks if <b>count &lt; 5</b>. Since <b>count</b> never changes, this is always true!',
                                highlight: 'while count < 5:',
                            },
                            {
                                label: 'Print Statement',
                                desc: 'This line runs forever, printing "Counting..." again and again.',
                                highlight: '    print("Counting...")',
                            },
                        ]}
                    />
                </Section>
                <Section title="Tips & Common Mistakes">
                    <ul>
                        <li>Make sure your loop condition will eventually become <b>false</b>, or use <b>break</b> to exit.</li>
                        <li>Use <b>while</b> when you don't know exactly how many times you need to loop.</li>
                        <li>Be careful with <b>break</b> and <b>continue</b>; they can make your code harder to understand.</li>
                    </ul>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}