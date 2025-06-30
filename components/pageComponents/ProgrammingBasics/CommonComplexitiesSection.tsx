import React from 'react';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';

const CommonComplexitiesSection: React.FC = () => (
    <>
        <p style={{ marginBottom: 32 }}>
            <b>What does O(_) mean?</b> In Big O notation, the "O" stands for "order of," and the letter or expression inside the parentheses (like n, log n, n²) describes how the amount of work (time or memory) grows as your input gets bigger.
        </p>
        <div style={{ marginBottom: 40 }}>
            <b>O(1) — Constant Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span><b>Explanation:</b> The work your code does stays the same, no matter how much data you have.</span><br />
                <b>What to look for:</b> Direct access to a value, no loops or recursion.
            </div>
            <StepThroughCodeAnimation
                code={[
                    'function getFirstItem(list):',
                    '    return list[0]',
                ]}
                steps={[
                    {
                        label: 'Look for Direct Access',
                        desc: 'Accessing a value by index (like <code>list[0]</code>) does not depend on the size of the list.',
                        highlight: 'return list[0]',
                    },
                    {
                        label: 'No Loops or Recursion',
                        desc: 'There are no loops or recursive calls. The number of steps is always the same.',
                        highlight: 'return list[0]',
                    },
                    {
                        label: 'Conclusion',
                        desc: 'This is <b>O(1)</b> because the time does not change as the input grows.',
                        highlight: 'return list[0]',
                    },
                ]}
            />
        </div>
        <div style={{ marginBottom: 40 }}>
            <b>O(log n) — Logarithmic Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span><b>Explanation:</b> Each step lets you skip over a big chunk of the data, so the work grows slowly as the data grows.</span><br />
                <b>What to look for:</b> Each step cuts the problem in half (or by a constant fraction).
            </div>
            <StepThroughCodeAnimation
                code={[
                    'function binarySearch(list, target):',
                    '    left = 0',
                    '    right = length of list - 1',
                    '    while left <= right:',
                    '        mid = (left + right) // 2',
                    '        if list[mid] == target:',
                    '            return mid',
                    '        else if list[mid] < target:',
                    '            left = mid + 1',
                    '        else:',
                    '            right = mid - 1',
                    '    return -1',
                ]}
                steps={[
                    {
                        label: 'Look for Halving',
                        desc: 'Each time through the loop, the search space is cut in half.',
                        highlight: 'while left <= right:',
                    },
                    {
                        label: 'Count the Steps',
                        desc: 'If the list has 16 items, it takes at most 4 steps (2⁴ = 16). For 32 items, 5 steps (2⁵ = 32).',
                        highlight: 'mid = (left + right) // 2',
                    },
                    {
                        label: 'Conclusion',
                        desc: 'The number of steps is about <b>log₂(n)</b>. This is <b>O(log n)</b>.',
                        highlight: 'while left <= right:',
                    },
                ]}
            />
        </div>
        <div style={{ marginBottom: 40 }}>
            <b>O(n) — Linear Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span><b>Explanation:</b> The work grows in direct proportion to the amount of data. Double the data, double the work.</span><br />
                <b>What to look for:</b> A single loop that goes through every item in the input.
            </div>
            <StepThroughCodeAnimation
                code={[
                    'function printAll(list):',
                    '    for each item in list:',
                    '        print(item)',
                ]}
                steps={[
                    {
                        label: 'Look for a Single Loop',
                        desc: 'There is one loop that goes through every item in the list.',
                        highlight: 'for each item in list:',
                    },
                    {
                        label: 'Count the Steps',
                        desc: 'If the list has n items, the loop runs n times.',
                        highlight: 'for each item in list:',
                    },
                    {
                        label: 'Conclusion',
                        desc: 'The time grows directly with the input size. This is <b>O(n)</b>.',
                        highlight: 'for each item in list:',
                    },
                ]}
            />
        </div>
        <div style={{ marginBottom: 40 }}>
            <b>O(n log n) — Linearithmic Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span><b>Explanation:</b> The work grows faster than linear, but much slower than quadratic. This is common in efficient sorting algorithms.</span><br />
                <b>What to look for:</b> The problem is divided (like in merge sort), and each division does linear work.
                <br />
                <span style={{ display: 'block', marginTop: 12 }}>
                    <b>Why do we multiply n by log(n)?</b><br />
                    When an algorithm like merge sort splits the data in half over and over, it takes <b>log(n)</b> steps to break everything down. But at each level of splitting, we still have to look at every item to merge them back together, which is <b>n</b> work. So, the total work is <b>n</b> (items per level) times <b>log(n)</b> (number of levels), or <b>O(n log n)</b>.
                </span>
            </div>
            <StepThroughCodeAnimation
                code={[
                    'function mergeSort(list):',
                    '    if length of list <= 1:',
                    '        return list',
                    '    mid = length of list // 2',
                    '    left = mergeSort(list[0:mid])',
                    '    right = mergeSort(list[mid:end])',
                    '    return merge(left, right)',
                    '',
                    'function merge(left, right):',
                    '    result = empty list',
                    '    while left and right are not empty:',
                    '        if left[0] < right[0]:',
                    '            append left[0] to result',
                    '            remove left[0] from left',
                    '        else:',
                    '            append right[0] to result',
                    '            remove right[0] from right',
                    '    append any remaining items from left and right to result',
                    '    return result',
                ]}
                steps={[
                    {
                        label: 'Look for Divide and Conquer',
                        desc: 'The list is split in half each time (log n splits).',
                        highlight: [
                            'if length of list <= 1:',
                            'mid = length of list // 2',
                            'left = mergeSort(list[0:mid])',
                            'right = mergeSort(list[mid:end])',
                        ],
                    },
                    {
                        label: 'Work per Level',
                        desc: 'At each level, merging takes O(n) time for all items.',
                        highlight: [
                            'function merge(left, right):',
                            'while left and right are not empty:',
                        ],
                    },
                    {
                        label: 'Conclusion',
                        desc: 'Total work is O(n log n): log n splits, n work per split.',
                        highlight: [
                            'return merge(left, right)',
                            'return result',
                        ],
                    },
                ]}
            />
        </div>
        <div style={{ marginBottom: 40 }}>
            <b>O(n²) — Quadratic Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span><b>Explanation:</b> The work grows much faster as the data grows. If you double the data, the work goes up four times.</span><br />
                <b>What to look for:</b> Nested loops, each going through the input.
            </div>
            <StepThroughCodeAnimation
                code={[
                    'function printAllPairs(list):',
                    '    for each a in list:',
                    '        for each b in list:',
                    '            print(a, b)',
                ]}
                steps={[
                    {
                        label: 'Look for Nested Loops',
                        desc: 'There are two loops, one inside the other, both over the same list.',
                        highlight: ['for each a in list:', 'for each b in list:'],
                    },
                    {
                        label: 'Count the Steps',
                        desc: 'If the list has n items, the inner loop runs n times for each of the n outer loop runs (n × n = n²).',
                        highlight: 'print(a, b)',
                    },
                    {
                        label: 'Conclusion',
                        desc: 'The time grows with the square of the input size. This is <b>O(n²)</b>.',
                        highlight: 'print(a, b)',
                    },
                ]}
            />
        </div>
        <div style={{ marginBottom: 40 }}>
            <b>O(2ⁿ) — Exponential Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span><b>Explanation:</b> The work doubles with every extra piece of data. This gets slow very quickly!</span><br />
                <b>What to look for:</b> Recursive calls that branch into two or more calls for each input.
            </div>
            <StepThroughCodeAnimation
                code={[
                    'function fib(n):',
                    '    if n <= 1:',
                    '        return n',
                    '    return fib(n-1) + fib(n-2)',
                ]}
                steps={[
                    {
                        label: 'Look for Multiple Recursive Calls',
                        desc: 'Each call to fib(n) makes two more calls: fib(n-1) and fib(n-2).',
                        highlight: 'return fib(n-1) + fib(n-2)',
                    },
                    {
                        label: 'Count the Calls',
                        desc: 'The number of calls doubles with each increase in n. For n=5, there are about 2⁵ = 32 calls.',
                        highlight: 'return fib(n-1) + fib(n-2)',
                    },
                    {
                        label: 'Conclusion',
                        desc: 'The time grows very quickly as n increases. This is <b>O(2ⁿ)</b>.',
                        highlight: 'return fib(n-1) + fib(n-2)',
                    },
                ]}
            />
        </div>
    </>
);

export default CommonComplexitiesSection;