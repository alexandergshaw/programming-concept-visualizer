import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import InteractiveStepThrough from '../../common/InteractiveStepThrough';
import StepThroughCodeAnimation, { Step } from '../JavaScript/StepThroughCodeAnimation';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

const bigOExamples = [
	{
		label: 'Constant Time',
		value: 'constant',
		code: ['def get_first_item(arr):', ' return arr[0]'],
		steps: [
			{
				label: 'Access First Item',
				desc: 'No matter how big the array is, getting the first item always takes the same amount of time.',
				highlight: 'return arr[0]',
			},
		],
		explanation: 'O(1): The operation takes the same time no matter how large the input is.',
		visual: (n: number) => (
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2 }}>
				<Box sx={{ display: 'flex', gap: 0.5 }}>
					{Array.from({ length: n }, (_, i) => (
						<Box
							key={i}
							sx={{
								width: 18,
								height: 18,
								borderRadius: '50%',
								background: i === 0 ? '#1976d2' : '#e0e0e0',
								border: i === 0 ? '2px solid #1976d2' : '1px solid #bbb',
								display: 'inline-block',
							}}
							title={i === 0 ? 'Accessed' : 'Not Accessed'}
						/>
					))}
				</Box>
				<span style={{ marginLeft: 12, fontSize: 15, color: '#1976d2' }}>
					Only the first item is accessed!
				</span>
			</Box>
		),
	},
	{
		label: 'Linear Time',
		value: 'linear',
		code: [
			'def print_all(arr):',
			' for item in arr:',
			' print(item)',
		],
		steps: [
			{
				label: 'Loop Over All Items',
				desc: 'The function prints every item. If the array has 10 items, it prints 10 times; if 1,000, it prints 1,000 times.',
				highlight: 'for item in arr:',
			},
			{
				label: 'Print Each Item',
				desc: 'Each item is printed once.',
				highlight: 'print(item)',
			},
		],
		explanation: 'O(n): The time grows in direct proportion to the input size.',
		visual: (n: number) => (
			<Box sx={{ display: 'flex', gap: 0.5, mt: 2 }}>
				{Array.from({ length: n }, (_, i) => (
					<Box
						key={i}
						sx={{
							width: 18,
							height: 18,
							borderRadius: '50%',
							background: '#43a047',
							border: '2px solid #43a047',
							display: 'inline-block',
						}}
						title={`Accessed item ${i}`}
					/>
				))}
				<span style={{ marginLeft: 12, fontSize: 15, color: '#43a047' }}>
					Every item is accessed once.
				</span>
			</Box>
		),
	},
	{
		label: 'Quadratic Time',
		value: 'quadratic',
		code: [
			'def print_all_pairs(arr):',
			' for a in arr:',
			' for b in arr:',
			' print(a, b)',
		],
		steps: [
			{
				label: 'Outer Loop',
				desc: 'The outer loop runs once for each item in the array.',
				highlight: 'for a in arr:',
			},
			{
				label: 'Inner Loop',
				desc: 'For each item in the outer loop, the inner loop runs for every item again.',
				highlight: 'for b in arr:',
			},
			{
				label: 'Print Pair',
				desc: 'Each possible pair is printed. If the array has 10 items, this prints 100 pairs.',
				highlight: 'print(a, b)',
			},
		],
		explanation: 'O(n²): The time grows with the square of the input size.',
		visual: (n: number) => (
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: `repeat(${n}, 18px)`,
					gap: 0.5,
					mt: 2,
				}}
			>
				{Array.from({ length: n * n }, (_, i) => (
					<Box
						key={i}
						sx={{
							width: 16,
							height: 16,
							borderRadius: 2,
							background: '#fbc02d',
							border: '2px solid #fbc02d',
							display: 'inline-block',
						}}
						title={`Pair ${Math.floor(i / n)},${i % n}`}
					/>
				))}
				<span
					style={{
						gridColumn: `span ${n}`,
						marginTop: 8,
						fontSize: 15,
						color: '#fbc02d',
					}}
				>
					Every possible pair is accessed ({n} × {n} = {n * n} times).
				</span>
			</Box>
		),
	},
];

function GrowthChart({ n, type }: { n: number; type: string }) {
	// Visualize the growth for different complexities
	const colors: Record<string, string> = {
		constant: '#1976d2',
		linear: '#43a047',
		quadratic: '#fbc02d',
	};
	const getY = (type: string, x: number) => {
		switch (type) {
			case 'constant':
				return 1;
			case 'linear':
				return x;
			case 'quadratic':
				return x * x;
			default:
				return 1;
		}
	};
	return (
		<svg
			width={240}
			height={120}
			style={{
				background: '#f8fafc',
				borderRadius: 8,
				border: '1px solid #eee',
				marginBottom: 12,
			}}
		>
			{[...Object.keys(colors)].map((t, idx) => (
				<polyline
					key={t}
					fill="none"
					stroke={colors[t]}
					strokeWidth={t === type ? 4 : 2}
					points={
						Array.from({ length: n }, (_, i) => {
							const x = (i / (n - 1)) * 220 + 10;
							const y =
								110 -
								(getY(t, i) / getY('quadratic', n - 1)) * 100;
							return `${x},${y}`;
						}).join(' ')
					}
					opacity={t === type ? 1 : 0.4}
				/>
			))}
			{/* Axes */}
			<line
				x1={10}
				y1={110}
				x2={230}
				y2={110}
				stroke="#888"
				strokeWidth={1}
			/>
			<line
				x1={10}
				y1={10}
				x2={10}
				y2={110}
				stroke="#888"
				strokeWidth={1}
			/>
			{/* Labels */}
			<text
				x={120}
				y={118}
				fontSize={12}
				textAnchor="middle"
				fill="#888"
			>
				Input Size (n)
			</text>
			<text
				x={0}
				y={20}
				fontSize={12}
				fill="#888"
				transform="rotate(-90 0,20)"
			>
				Steps
			</text>
		</svg>
	);
}

export default function BigOConcept() {
    const [inputSize, setInputSize] = useState(6);
    const [selectedType, setSelectedType] = useState('constant');
    const currentExample = bigOExamples.find(e => e.value === selectedType) || bigOExamples[0];

    return (
        <ConceptWrapper
            title="Big O Notation"
            description="Big O notation describes how the running time or space requirements of an algorithm grow as the input size grows. It helps you compare the efficiency of different algorithms."
        >
            <TableOfContents numbered>
                <Section title="What is an Algorithm?">
                    <p>
                        An <b>algorithm</b> is a step-by-step set of instructions for solving a problem or completing a task. In programming, algorithms are the recipes that tell the computer exactly what to do, in what order, and how to handle different situations.
                    </p>
                    <p>
                        Many algorithms use <b>loops</b> to repeat actions. For example, you might loop through a list to find an item, add up numbers, or print every value. Loops are a key building block in most algorithms, letting you process lots of data with just a few lines of code.
                    </p>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 2, mb: 2, flexWrap: 'wrap' }}>
                        {/* Visual: Sandwich Algorithm */}
                        <Box sx={{ minWidth: 260, bgcolor: '#f8fafc', borderRadius: 2, p: 2, border: '1px solid #e0e0e0' }}>
                            <b>Sandwich Algorithm</b>
                            <ol style={{ margin: '10px 0 0 18px', padding: 0, fontSize: 15 }}>
                                <li>Get two slices of bread</li>
                                <li>Add peanut butter</li>
                                <li>Add jelly</li>
                                <li>Put slices together</li>
                                <li>Eat!</li>
                            </ol>
                        </Box>
                        {/* Visual: Flowchart */}
                        <Box sx={{ minWidth: 220, bgcolor: '#f8fafc', borderRadius: 2, p: 2, border: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <b style={{ marginBottom: 8 }}>Algorithm as a Flowchart</b>
                            <svg width={180} height={160}>
                                {/* Start */}
                                <rect x={60} y={10} width={60} height={28} rx={14} fill="#1976d2" />
                                <text x={90} y={28} textAnchor="middle" fill="#fff" fontSize={13}>Start</text>
                                {/* Step 1 */}
                                <rect x={40} y={48} width={100} height={24} rx={6} fill="#fff" stroke="#1976d2" />
                                <text x={90} y={64} textAnchor="middle" fill="#1976d2" fontSize={12}>Get bread</text>
                                {/* Step 2 */}
                                <rect x={40} y={80} width={100} height={24} rx={6} fill="#fff" stroke="#1976d2" />
                                <text x={90} y={96} textAnchor="middle" fill="#1976d2" fontSize={12}>Add filling</text>
                                {/* Step 3 */}
                                <rect x={40} y={112} width={100} height={24} rx={6} fill="#fff" stroke="#1976d2" />
                                <text x={90} y={128} textAnchor="middle" fill="#1976d2" fontSize={12}>Eat</text>
                                {/* End */}
                                <rect x={60} y={144} width={60} height={28} rx={14} fill="#1976d2" />
                                <text x={90} y={162} textAnchor="middle" fill="#fff" fontSize={13}>End</text>
                                {/* Arrows */}
                                <line x1={90} y1={38} x2={90} y2={48} stroke="#1976d2" strokeWidth={2} markerEnd="url(#arrow)" />
                                <line x1={90} y1={72} x2={90} y2={80} stroke="#1976d2" strokeWidth={2} markerEnd="url(#arrow)" />
                                <line x1={90} y1={104} x2={90} y2={112} stroke="#1976d2" strokeWidth={2} markerEnd="url(#arrow)" />
                                <line x1={90} y1={136} x2={90} y2={144} stroke="#1976d2" strokeWidth={2} markerEnd="url(#arrow)" />
                                <defs>
                                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
                                        <path d="M0,0 L8,4 L0,8 Z" fill="#1976d2" />
                                    </marker>
                                </defs>
                            </svg>
                        </Box>
                        {/* Visual: Pseudocode */}
                        <Box sx={{ minWidth: 220, bgcolor: '#f8fafc', borderRadius: 2, p: 2, border: '1px solid #e0e0e0' }}>
                            <b>Pseudocode</b>
                            <pre style={{ margin: 0, fontSize: 14, color: '#1976d2' }}>
{`bread = get_bread()
add_filling(bread)
eat(bread)`}
                            </pre>
                        </Box>
                    </Box>
                    <p>
                        <i>Algorithms can be written as lists, drawn as flowcharts, or described in pseudocode. In programming, you'll often turn your algorithm into real code! Loops are a common way to repeat steps in an algorithm, especially when working with collections of data.</i>
                    </p>
                </Section>
                <Section title="What is Big O?">
                    <p>
                        <b>Big O notation</b> is a way to talk about how fast (or slow) an algorithm is, as the amount of data grows. It ignores small details and focuses on the big picture: how does the time or space needed change as the input gets bigger?
                    </p>
                </Section>
                <Section title="Visualizing Growth">
                    <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', mb: 2 }}>
                        <Box>
                            <GrowthChart n={inputSize} type={selectedType} />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                <span style={{ fontSize: 15 }}>Input Size (n):</span>
                                <Slider
                                    min={2}
                                    max={12}
                                    value={inputSize}
                                    onChange={(_, v) => setInputSize(Number(v))}
                                    step={1}
                                    marks
                                    sx={{ width: 160 }}
                                />
                                <span style={{ fontWeight: 500, fontSize: 15 }}>{inputSize}</span>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                                {bigOExamples.map(e => (
                                    <button
                                        key={e.value}
                                        style={{
                                            background: selectedType === e.value ? '#1976d2' : '#e3eafc',
                                            color: selectedType === e.value ? '#fff' : '#222',
                                            border: 'none',
                                            borderRadius: 6,
                                            padding: '6px 16px',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            fontSize: 15,
                                        }}
                                        onClick={() => setSelectedType(e.value)}
                                    >
                                        {e.label}
                                    </button>
                                ))}
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                {currentExample.visual(inputSize)}
                            </Box>
                        </Box>
                        <Box sx={{ minWidth: 220, bgcolor: '#f8fafc', borderRadius: 2, p: 2, border: '1px solid #e0e0e0', flex: 1, maxWidth: 320 }}>
                            <b>Pseudocode Example</b>
                            <pre style={{ margin: 0, fontSize: 15, color: '#1976d2' }}>
{selectedType === 'constant' && `# O(1) - Constant Time
return arr[0]
`}
{selectedType === 'linear' && `# O(n) - Linear Time
for each item in arr:
    print(item)
`}
{selectedType === 'quadratic' && `# O(n^2) - Quadratic Time
for each a in arr:
    for each b in arr:
        print(a, b)
`}
                            </pre>
                        </Box>
                    </Box>
                    <p>
                        <b>How to use this visualization:</b>
                        <ul>
                            <li>
                                <b>Input Size (n):</b> Use the slider to change the size of the input. This simulates how much data your algorithm is working with.
                            </li>
                            <li>
                                <b>Algorithm Type:</b> Click the buttons to switch between different types of algorithms (constant, linear, quadratic). Each type has a different growth curve and visual.
                            </li>
                            <li>
                                <b>Growth Chart:</b> The chart shows how the number of steps (vertical axis) increases as the input size (horizontal axis) grows for each algorithm type. Notice how O(1) stays flat, O(n) grows steadily, and O(n²) rises much faster.
                            </li>
                            <li>
                                <b>Visual Representation:</b> Below the chart, you’ll see a visual showing which items are accessed for the selected algorithm and input size. For example, O(1) only accesses one item, O(n) accesses all, and O(n²) accesses every possible pair.
                            </li>
                            <li>
                                <b>Pseudocode Example:</b> On the right, see a simple pseudocode version of each algorithm. This helps you connect the concept to real code.
                            </li>
                        </ul>
                        <b>Try adjusting the input size and algorithm type to see how the work done by each algorithm changes. This is the heart of what Big O notation is all about!</b>
                    </p>
                </Section>
                <Section title="Try It: See Big O in Action">
                    <InteractiveStepThrough
                        codeTemplate={inputs => {
                            const example = bigOExamples.find(e => e.value === inputs.type) || bigOExamples[0];
                            return example.code;
                        }}
                        stepsTemplate={inputs => {
                            const example = bigOExamples.find(e => e.value === inputs.type) || bigOExamples[0];
                            return example.steps as Step[];
                        }}
                        inputConfigs={[
                            {
                                name: 'type',
                                label: 'Algorithm Type',
                                options: bigOExamples.map(e => ({ label: e.label, value: e.value })),
                                defaultValue: 'constant',
                            },
                        ]}
                    />
                </Section>
                <Section title="Explanation">
                    <InteractiveStepThrough
                        codeTemplate={inputs => {
                            const example = bigOExamples.find(e => e.value === inputs.type) || bigOExamples[0];
                            return [`# ${example.label}`, ...example.code];
                        }}
                        stepsTemplate={inputs => {
                            const example = bigOExamples.find(e => e.value === inputs.type) || bigOExamples[0];
                            return [
                                {
                                    label: example.label,
                                    desc: example.explanation,
                                    highlight: '',
                                },
                            ];
                        }}
                        inputConfigs={[
                            {
                                name: 'type',
                                label: 'Algorithm Type',
                                options: bigOExamples.map(e => ({ label: e.label, value: e.value })),
                                defaultValue: 'constant',
                            },
                        ]}
                    />
                </Section>
                <Section title="Common Big O Classes">
                    <ul>
                        <li>
                            <b>O(1)</b> — Constant time: does not grow with input size.
                        </li>
                        <li>
                            <b>O(log n)</b> — Logarithmic time: grows slowly (e.g., binary search).
                        </li>
                        <li>
                            <b>O(n)</b> — Linear time: grows directly with input size.
                        </li>
                        <li>
                            <b>O(n log n)</b> — Linearithmic time: e.g., efficient sorts like mergesort.
                        </li>
                        <li>
                            <b>O(n²)</b> — Quadratic time: nested loops over the data.
                        </li>
                        <li>
                            <b>O(2ⁿ)</b> — Exponential time: doubles with each extra input (e.g., recursive Fibonacci).
                        </li>
                    </ul>
                </Section>
                <Section title="Why Does Big O Matter?">
                    <p>
                        Understanding Big O helps you write code that scales well. For small inputs, any algorithm might be fast. But as your data grows, the difference between O(n) and O(n²) can be huge!
                    </p>
                </Section>
            </TableOfContents>
        </ConceptWrapper>
    );
}