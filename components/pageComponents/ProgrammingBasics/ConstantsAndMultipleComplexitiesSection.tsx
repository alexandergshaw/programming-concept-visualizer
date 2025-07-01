import React, { useState } from 'react';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartLabels = Array.from({ length: 21 }, (_, i) => i * 50); // [0, 50, 100, ..., 1000]
const chartOptions = {
    responsive: true,
    plugins: {
        legend: { display: true },
        title: { display: false },
    },
    scales: {
        x: { title: { display: true, text: 'n' } },
        y: { title: { display: true, text: 'Steps' }, beginAtZero: true },
    },
};

const ConstantsAndMultipleComplexitiesSection = () => {
    // State for multipliers and toggles
    const [customMultiplier] = useState<number>(2);
    const [selectedMultipliers, setSelectedMultipliers] = useState<number[]>([1, 2, 5]);
    const [showLinear, setShowLinear] = useState(true);
    const [showQuadratic, setShowQuadratic] = useState(true);
    const [showLog, setShowLog] = useState(false);
    const [showCombined, setShowCombined] = useState(true);
    const [multiXAxisMax] = useState<number | ''>('');
    const [multiYAxisMax] = useState<number | ''>('');

    const multipliers = [
        { value: 1, label: 'n' },
        { value: 2, label: '2n' },
    ];
    const allMultipliers = [
        ...multipliers,
        ...(customMultiplier !== 1 && customMultiplier !== 2 && customMultiplier !== 5
            ? [{ value: customMultiplier, label: `${customMultiplier}n` }]
            : []),
    ];

    // Chart data for "Same Trend"
    const chartDataWithShapes = {
        labels: chartLabels,
        datasets: [
            ...selectedMultipliers.map(m => ({
                label: `${m}n`,
                data: chartLabels.map(n => m * n),
                borderColor: '#1976d2',
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                tension: 0.2,
                borderWidth: 2,
            })),
            ...(showQuadratic
                ? [{
                    label: 'n²',
                    data: chartLabels.map(n => n * n),
                    borderColor: '#e53935',
                    backgroundColor: 'rgba(229, 57, 53, 0.1)',
                    tension: 0.2,
                    borderWidth: 2,
                }] : []),
            ...(showLog
                ? [{
                    label: 'log n',
                    data: chartLabels.map(n => n > 0 ? Math.log2(n) : 0),
                    borderColor: '#ff9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    tension: 0.2,
                    borderWidth: 2,
                }] : []),
        ],
    };

    return (
        <>
            <p style={{ marginBottom: 24 }}>
                When analyzing Big O, it&apos;s important to understand how constants and multiple terms affect the overall complexity. This helps you simplify your answer and focus on what really matters as your input grows.
            </p>
            <div style={{ marginBottom: 32 }}>
                <b>Dropping Constants</b>
                <div style={{ margin: '10px 0 18px 0', color: '#444', fontSize: 15 }}>
                    <b>What is a constant?</b> In Big O, a <b>constant</b> is any fixed amount of work that doesn&apos;t change as your input grows. For example, printing a message once, or doing a small number of extra steps before or after a loop, is a constant. Even if you do something 10 or 100 times, that&apos;s still a constant if it doesn&apos;t depend on the size of your input.
                </div>
                <StepThroughCodeAnimation
                    code={[
                        'function printAll(list):',
                        '    for each item in list:',
                        '        print(item)',
                        '    print("done")',
                    ]}
                    steps={[
                        {
                            label: 'Count Steps',
                            desc: 'The loop runs n times (once for each item). The print at the end is 1 extra step. So, the total number of steps is n + 1.',
                            highlight: ['for each item in list:', 'print("done")'],
                        },
                        {
                            label: 'Drop the Constant',
                            desc: 'In Big O, we ignore constant numbers like +1, because as n gets very large, they don’t make much difference. So, O(n + 1) becomes O(n).',
                            highlight: ['print("done")'],
                        },
                    ]}
                />
                <StepThroughCodeAnimation
                    code={[
                        'function printTwice(list):',
                        '    for each item in list:',
                        '        print(item)',
                        '        print("-")',
                    ]}
                    steps={[
                        {
                            label: 'Count Steps',
                            desc: 'Each time through the loop, you do 2 things. If the list has n items, that’s 2n steps.',
                            highlight: ['print(item)', 'print("-")'],
                        },
                        {
                            label: 'Drop the Multiplier',
                            desc: 'In Big O, we ignore constant multipliers like 2. O(2n) is just O(n), because doubling the work is still linear growth.',
                            highlight: ['print(item)', 'print("-")'],
                        },
                    ]}
                />
                <div style={{ marginTop: 12, color: '#444', fontSize: 15 }}>
                    <b>Why?</b> Constants and constant multipliers don&apos;t change how fast your code grows as n gets huge. They only affect the exact number of steps, not the overall trend.
                </div>
                <div style={{ margin: '24px 0 0 0', maxWidth: 520 }}>
                    <b>Visual: What Do We Mean by &quot;Same Trend&quot;?</b>
                    <div style={{ margin: '12px 0 12px 0', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        {allMultipliers.map(m => (
                            <label key={m.value} style={{ fontSize: 14, cursor: 'pointer', marginRight: 8 }}>
                                <input
                                    type="checkbox"
                                    checked={selectedMultipliers.includes(m.value)}
                                    onChange={e => {
                                        setSelectedMultipliers(sel =>
                                            e.target.checked
                                                ? [...sel, m.value]
                                                : sel.filter(v => v !== m.value)
                                        );
                                    }}
                                    style={{ marginRight: 6 }}
                                />
                                {m.label}
                            </label>
                        ))}
                        <label style={{ fontSize: 14, cursor: 'pointer', marginRight: 8 }}>
                            <input
                                type="checkbox"
                                checked={showQuadratic}
                                onChange={() => setShowQuadratic(v => !v)}
                                style={{ marginRight: 6 }}
                            />
                            <span style={{ color: '#e53935' }}>Quadratic (n²)</span>
                        </label>
                        <label style={{ fontSize: 14, cursor: 'pointer', marginRight: 8 }}>
                            <input
                                type="checkbox"
                                checked={showLog}
                                onChange={() => setShowLog(v => !v)}
                                style={{ marginRight: 6 }}
                            />
                            <span style={{ color: '#ff9800' }}>Logarithmic (log n)</span>
                        </label>
                    </div>
                    <Line data={chartDataWithShapes} options={chartOptions} height={260} />
                    <div style={{ color: '#444', fontSize: 14, marginTop: 8 }}>
                        <div>
                            <b>What do you notice?</b>
                        </div>
                        <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
                            <li>
                                In Big O, we care about the <b>shape</b> of the growth, not the exact steepness. That&apos;s why O(2n), O(5n), and O(n) are all considered <b>O(n)</b>, but O(n²) is not.
                            </li>
                            <li>
                                All the <b>linear</b> lines (n, 2n, 5n) have the same shape—they just start higher or lower. This is what we mean by &quot;same trend.&quot;
                            </li>
                            <li>
                                If you turn on <b>Quadratic (n²)</b> or <b>Logarithmic (log n)</b>, you&apos;ll see those lines curve differently. These are <b>different trends</b>—they grow at different rates as n increases.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: 32 }}>
                <b>Multiple Complexities</b>
                <div style={{ margin: '10px 0 18px 0', color: '#444', fontSize: 15 }}>
                    <b>What do we mean by multiple complexities?</b> Sometimes, your code has more than one part that grows at a different rate. For example, you might have a loop that runs <b>n</b> times and then a nested loop that runs <b>n²</b> times.
                </div>
                <StepThroughCodeAnimation
                    code={[
                        'function doBoth(list):',
                        '    for each item in list:',
                        '        print(item)',
                        '    for each a in list:',
                        '        for each b in list:',
                        '            print(a, b)',
                    ]}
                    steps={[
                        {
                            label: 'Add Steps',
                            desc: 'The first loop runs n times (O(n)). The nested loops run n × n = n² times (O(n²)). So, the total is O(n + n²).',
                            highlight: [
                                'for each item in list:',
                                'for each a in list:',
                                'for each b in list:',
                            ],
                        },
                        {
                            label: 'Keep the Biggest',
                            desc: 'As n gets large, n² grows much faster than n. In Big O, we keep only the fastest-growing term. So, O(n + n²) simplifies to O(n²).',
                            highlight: [
                                'for each a in list:',
                                'for each b in list:',
                            ],
                        },
                    ]}
                />
                <StepThroughCodeAnimation
                    code={[
                        'function linearAndLog(list):',
                        '    for each item in list:',
                        '        print(item)',
                        '    i = 1',
                        '    while i < n:',
                        '        print(i)',
                        '        i = i * 2',
                    ]}
                    steps={[
                        {
                            label: 'Add Steps',
                            desc: 'The first loop runs n times (O(n)). The while loop runs about log₂(n) times (O(log n)). So, the total is O(n + log n).',
                            highlight: [
                                'for each item in list:',
                                'while i < n:',
                            ],
                        },
                        {
                            label: 'Keep the Biggest',
                            desc: 'As n grows, n is much bigger than log n. So, O(n + log n) simplifies to O(n).',
                            highlight: [
                                'for each item in list:',
                            ],
                        },
                    ]}
                />
                <div style={{ marginTop: 12, color: '#444', fontSize: 15 }}>
                    <b>Why?</b> When you have several parts with different complexities, the slowest-growing part becomes insignificant for large n. Only the fastest-growing term matters for Big O.
                </div>
                <div style={{ margin: '32px 0 0 0', maxWidth: 520 }}>
                    <b>Visual: Why Only the Fastest-Growing Term Matters</b>
                    <div style={{ margin: '12px 0 12px 0', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                        <label style={{ fontSize: 14, cursor: 'pointer', marginRight: 8 }}>
                            <input
                                type="checkbox"
                                checked={showLinear}
                                onChange={() => setShowLinear(v => !v)}
                                style={{ marginRight: 6 }}
                            />
                            <span style={{ color: '#1976d2' }}>Linear (n)</span>
                        </label>
                        <label style={{ fontSize: 14, cursor: 'pointer', marginRight: 8 }}>
                            <input
                                type="checkbox"
                                checked={showQuadratic}
                                onChange={() => setShowQuadratic(v => !v)}
                                style={{ marginRight: 6 }}
                            />
                            <span style={{ color: '#e53935' }}>Quadratic (n²)</span>
                        </label>
                        <label style={{ fontSize: 14, cursor: 'pointer', marginRight: 8 }}>
                            <input
                                type="checkbox"
                                checked={showCombined}
                                onChange={() => setShowCombined(v => !v)}
                                style={{ marginRight: 6 }}
                            />
                            <span style={{ color: '#43a047' }}>Total (n + n²)</span>
                        </label>
                    </div>
                    <Line
                        data={{
                            labels: chartLabels,
                            datasets: [
                                ...(showLinear
                                    ? [{
                                        label: 'n',
                                        data: chartLabels,
                                        borderColor: '#1976d2',
                                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                        tension: 0.2,
                                    }] : []),
                                ...(showQuadratic
                                    ? [{
                                        label: 'n²',
                                        data: chartLabels.map(n => n * n),
                                        borderColor: '#e53935',
                                        backgroundColor: 'rgba(229, 57, 53, 0.1)',
                                        tension: 0.2,
                                    }] : []),
                                ...(showCombined
                                    ? [{
                                        label: 'n + n²',
                                        data: chartLabels.map(n => n + n * n),
                                        borderColor: '#43a047',
                                        backgroundColor: 'rgba(67, 160, 71, 0.1)',
                                        borderDash: [8, 4],
                                        tension: 0.2,
                                    }] : []),
                            ],
                        }}
                        options={{
                            ...chartOptions,
                            scales: {
                                ...chartOptions.scales,
                                x: {
                                    ...chartOptions.scales.x,
                                    max: multiXAxisMax === '' ? undefined : multiXAxisMax,
                                },
                                y: {
                                    ...chartOptions.scales.y,
                                    max: multiYAxisMax === '' ? undefined : multiYAxisMax,
                                },
                            },
                        }}
                        height={260}
                    />
                    <div style={{ color: '#444', fontSize: 14, marginTop: 8 }}>
                        <div>
                            <b>What do you notice?</b>
                        </div>
                        <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
                            <li>
                                As n gets large, <b>n + n²</b> looks nearly identical to <b>n²</b> at larger numbers.
                            </li>
                            <li>
                                This is why, in Big O, we drop the smaller terms (like the n in O(n + n²)) and keep only the fastest-growing one: <b>O(n + n²)</b> simplifies to <b>O(n²)</b>.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConstantsAndMultipleComplexitiesSection;