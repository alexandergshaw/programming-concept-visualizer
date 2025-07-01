import React from 'react';
import MathStepThrough from '@/components/common/MathStepThrough';

const BigOMathWalkthrough: React.FC = () => (
    <>
        <div style={{ marginBottom: 40 }}>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/CB8JPjg_3cM?si=-EfkidmIvNHGh7eO" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen style={{ display: 'block', marginBottom: 18 }}
            ></iframe>
            <b>O(1) — Constant Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span>
                    <b>Explanation:</b> The work your code does stays the same, no matter how much data you have.
                </span>
                <br />
                <b>What to look for:</b> Direct access to a value, no loops or recursion.
            </div>
            <MathStepThrough
                steps={[
                    {
                        label: 'Count Operations',
                        expression: 'function getMax(a, b, c) {\n  let max = a;\n  if (b > max) max = b;\n  if (c > max) max = c;\n  return max;\n}',
                        explanation: 'This function does about 5 things: sets max once, checks two values, and possibly updates max twice. No matter if we have 3 numbers or 3 million numbers, we\'re only looking at these three, so the work doesn\'t change.',
                    },
                    {
                        label: 'Calculate Time Complexity',
                        expression: 'T(n) = 5 = O(1)',
                        explanation: 'We write this as O(1) because the amount of work (5 steps) is "constant" - it doesn\'t grow when our data grows. Like a fixed price menu: $20 whether you\'re feeding 1 person or 100 people.',
                    },
                ]}
            />
        </div>

        <div style={{ marginBottom: 40 }}>
            <b>O(n) — Linear Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span>
                    <b>Explanation:</b> The work grows in direct proportion to the amount of data. Double the data, double the work.
                </span>
                <br />
                <b>What to look for:</b> A single loop that goes through every item in the input.
            </div>
            <MathStepThrough
                steps={[
                    {
                        label: 'Count Operations in Loop',
                        expression: 'function sum(array) {\n  let total = 0;          // 1 operation\n  for(let i = 0; i < array.length; i++) {\n    total += array[i];   // n operations\n  }\n  return total;          // 1 operation\n}',
                        explanation: 'This function has to touch every number in the array once. If there are 10 numbers, it does 10 additions. If there are 100 numbers, it does 100 additions. The work grows in step with the data size.',
                    },
                    {
                        label: 'Calculate Total Operations',
                        expression: 'T(n) = 1 + n + 1 = n + 2',
                        explanation: 'We do 1 thing before the loop (set total to 0), n things inside the loop (one for each item), and 1 thing at the end (return the result). That\'s n + 2 total steps.',
                    },
                    {
                        label: 'Simplify to Big O',
                        expression: 'T(n) = n + 2 = O(n)',
                        explanation: 'The +2 doesn\'t really matter when n gets big. Think of it like walking n miles - whether you take 2 extra steps at the end doesn\'t change how long the journey is. So we just call it O(n), or "linear time."',
                    },
                ]}
            />
        </div>

        <div style={{ marginBottom: 40 }}>
            <b>O(n²) — Quadratic Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span>
                    <b>Explanation:</b> The work grows much faster as the data grows. If you double the data, the work goes up four times.
                </span>
                <br />
                <b>What to look for:</b> Nested loops, each going through the input.
            </div>
            <MathStepThrough
                steps={[
                    {
                        label: 'Count Operations in Nested Loops',
                        expression: 'function findDuplicates(array) {\n  let duplicates = [];           // 1 operation\n  for(let i = 0; i < array.length; i++) {\n    for(let j = i+1; j < array.length; j++) {\n      if(array[i] === array[j]) {  // This comparison happens many times\n        duplicates.push(array[i]);\n      }\n    }\n  }\n  return duplicates;              // 1 operation\n}',
                        explanation: 'Here we have a loop inside another loop. For each item in our array, we compare it with all the other items. It\'s like comparing everyone in a room with everyone else - with 10 people, that\'s about 100 comparisons.',
                    },
                    {
                        label: 'Calculate Operation Count More Precisely',
                        expression: 'Inner loop runs: (n-1) + (n-2) + ... + 2 + 1 = n(n-1)/2 times',
                        explanation: 'Think of it like a triangle: The first person compares with n-1 others, the second with n-2 others, and so on. Adding these up gives us roughly n²/2 comparisons.',
                    },
                    {
                        label: 'Simplify to Big O',
                        expression: 'T(n) = n(n-1)/2 + 2 = (n² - n)/2 + 2 = O(n²)',
                        explanation: 'When our list gets big, the n² part overwhelms everything else. With 1,000 items, that\'s about 500,000 comparisons! So we call this O(n²) or "quadratic time" - meaning the work grows by the square of the input size.',
                    },
                ]}
            />
        </div>

        <div style={{ marginBottom: 40 }}>
            <b>O(log n) — Logarithmic Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span>
                    <b>Explanation:</b> Each step lets you skip over a big chunk of the data, so the work grows slowly as the data grows.
                </span>
                <br />
                <b>What to look for:</b> Each step cuts the problem in half (or by a constant fraction).
            </div>
            <MathStepThrough
                steps={[
                    {
                        label: 'Analyze a Binary Search',
                        expression: 'function binarySearch(array, target) {\n  let left = 0;\n  let right = array.length - 1;\n  \n  while (left <= right) {\n    let mid = Math.floor((left + right) / 2);\n    if (array[mid] === target) return mid;\n    if (array[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}',
                        explanation: 'This is like finding a name in a phone book. You open to the middle, see if the name comes before or after, then only look in that half. Each step, you cut your search area in half.',
                    },
                    {
                        label: 'Count the Steps for n=16',
                        expression: '16 → 8 → 4 → 2 → 1\nThat\'s 4 steps to get down to 1 item',
                        explanation: 'If we start with 16 items, we check the middle item, then we\'re down to 8 items. Then 4, then 2, then 1. So it takes just 4 steps to find any item in a list of 16 items.',
                    },
                    {
                        label: 'Count the Steps for n=32',
                        expression: '32 → 16 → 8 → 4 → 2 → 1\nThat\'s 5 steps to get down to 1 item',
                        explanation: 'If we have 32 items, it takes just 5 steps. Notice that doubling the input size (from 16 to 32) only added ONE extra step! This is why search engines can search billions of items so quickly.',
                    },
                    {
                        label: 'Calculate the Time Complexity',
                        expression: 'T(n) = log₂(n) = O(log n)',
                        explanation: 'This growth pattern is called logarithmic, written as O(log n). It\'s super efficient because the work grows very slowly - even if n gets huge, the work only grows by a tiny amount.',
                    },
                ]}
            />
        </div>

        <div style={{ marginBottom: 40 }}>
            <b>O(n log n) — Linearithmic Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span>
                    <b>Explanation:</b> The work grows faster than linear, but much slower than quadratic. This is common in efficient sorting algorithms.
                </span>
                <br />
                <b>What to look for:</b> The problem is divided (like in merge sort), and each division does linear work.
            </div>
            <MathStepThrough
                steps={[
                    {
                        label: 'Analyze Merge Sort',
                        expression: 'function mergeSort(array) {\n  if (array.length <= 1) return array;\n  \n  const mid = Math.floor(array.length / 2);\n  const left = mergeSort(array.slice(0, mid));\n  const right = mergeSort(array.slice(mid));\n  \n  return merge(left, right); // Merging takes O(n) time\n}',
                        explanation: 'Merge sort is like sorting a deck of cards by splitting it in half, sorting each half (by splitting those further), and then merging the sorted halves together. The splitting part is fast, but we have to look at each card when merging.',
                    },
                    {
                        label: 'Calculate Recursion Depth',
                        expression: 'For n=16:\nSplitting: 16 → 8 → 4 → 2 → 1\nThat\'s log₂(16) = 4 levels of recursion',
                        explanation: 'If we start with 16 cards, we keep splitting until we have piles of 1 card each. That takes 4 splits - the same log(n) pattern we saw in binary search.',
                    },
                    {
                        label: 'Calculate Work at Each Level',
                        expression: 'Level 0: 1 merge of size n = n work\nLevel 1: 2 merges of size n/2 = n work\nLevel 2: 4 merges of size n/4 = n work\n...\nLevel log₂(n): n merges of size 1 = n work',
                        explanation: 'The clever part is when merging: at each level, we look at n total items. At the top, it\'s one big merge. At the next level, it\'s two medium merges. But the total work per level is always n.',
                    },
                    {
                        label: 'Calculate Total Work',
                        expression: 'T(n) = n + n + n + ... + n (log₂(n) times)\nT(n) = n × log₂(n) = O(n log n)',
                        explanation: 'Since we do n work at each of log(n) levels, the total work is n × log(n). This is faster than n² but slower than n. It\'s like doing a linear scan log(n) times.',
                    },
                ]}
            />
        </div>

        <div style={{ marginBottom: 40 }}>
            <b>O(2ⁿ) — Exponential Time</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span>
                    <b>Explanation:</b> The work doubles with every extra piece of data. This gets slow very quickly!
                </span>
                <br />
                <b>What to look for:</b> Recursive calls that branch into two or more calls for each input.
            </div>
            <MathStepThrough
                steps={[
                    {
                        label: 'Analyze Recursive Fibonacci',
                        expression: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n-1) + fibonacci(n-2);\n}',
                        explanation: 'This function is like a tree that keeps branching out. For each number, it has to calculate TWO other numbers. Those each need two more calculations, and so on. It\'s like the branches of a tree growing wider and wider.',
                    },
                    {
                        label: 'Count Function Calls for Small Values',
                        expression: 'fibonacci(1): 1 call\nfibonacci(2): 1 + 2 calls = 3 calls\nfibonacci(3): 1 + 3 + 1 calls = 5 calls\nfibonacci(4): 1 + 5 + 3 calls = 9 calls\nfibonacci(5): 1 + 9 + 5 calls = 15 calls',
                        explanation: 'Even for small numbers, the calls add up quickly. To calculate fibonacci(5), we end up making 15 total function calls, many calculating the same values over and over.',
                    },
                    {
                        label: 'Calculate Growth Pattern',
                        expression: 'For fibonacci(n), the number of calls grows exponentially\nEach increase in n roughly doubles the total work',
                        explanation: 'The workload doubles with each increase in n. This is like a rumor spreading where each person tells two new people - the number of people who hear it explodes quickly!',
                    },
                    {
                        label: 'Demonstrate Exponential Growth',
                        expression: 'n=10: ~177 function calls\nn=20: ~21,891 function calls\nn=30: ~2,692,537 function calls\nn=40: ~331,160,281 function calls',
                        explanation: 'Look at how fast these numbers grow! Adding just 10 to n multiplies the work by over 100 times. This is why exponential algorithms become impossible to run very quickly - even modern computers can\'t handle these workloads when n gets large.',
                    },
                ]}
            />
        </div>

        <div style={{ marginBottom: 40 }}>
            <b>Dropping Constants</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span>
                    <b>Explanation:</b> Ignore constant multipliers and additive constants. Only the fastest-growing term matters.
                </span>
            </div>
            <MathStepThrough
                steps={[
                    {
                        label: 'Analyze a Real Algorithm',
                        expression: 'function findMax(array) {\n  let max = array[0];         // 1 operation\n  for(let i = 1; i < array.length; i++) {\n    if(array[i] > max) {      // 1 comparison per iteration\n      max = array[i];        // sometimes happens\n    }\n  }\n  console.log("Max:", max);  // 1 operation\n  return max;                // 1 operation\n}',
                        explanation: 'This function finds the biggest number in an array. It checks each number once, comparing it to the current max. So for n numbers, it does roughly 2n operations plus a few extra steps.',
                    },
                    {
                        label: 'Count Operations Precisely',
                        expression: 'T(n) = 1 + 2(n-1) + 2 = 2n + 1',
                        explanation: 'We do 1 thing at the start, about 2 things for each of the n-1 remaining numbers, and 2 more things at the end. That\'s 2n + 1 total steps.',
                    },
                    {
                        label: 'Compare with Similar Algorithms',
                        expression: 'Algorithm A: T(n) = 2n + 1\nAlgorithm B: T(n) = 5n + 3\nAlgorithm C: T(n) = n + 100',
                        explanation: 'Here are three algorithms that all process n items. A does about 2 things per item. B does about 5 things per item. C does 1 thing per item plus 100 extra things. If n is really big, C might be fastest despite that big +100.',
                    },
                    {
                        label: 'Simplify to Big O Notation',
                        expression: 'T(n) = 2n + 1 = O(n)\nT(n) = 5n + 3 = O(n)\nT(n) = n + 100 = O(n)',
                        explanation: 'In Big O, we drop all constants because they don\'t matter when n gets huge. It\'s like running a marathon - whether your shoes weigh 10oz or 20oz doesn\'t really affect your total time. All these are just O(n), meaning the work grows in step with the data size.',
                    },
                ]}
            />
        </div>

        <div style={{ marginBottom: 40 }}>
            <b>Dropping Lower-Order Terms</b>
            <div style={{ margin: '8px 0 16px 0' }}>
                <span>
                    <b>Explanation:</b> For large n, the highest-order term dominates. Lower-order terms become insignificant.
                </span>
            </div>
            <MathStepThrough
                steps={[
                    {
                        label: 'Analyze a Complex Algorithm',
                        expression: 'function complexAlgorithm(array) {\n  let sum = 0;                          // 1 operation\n  \n  // First loop: O(n)\n  for(let i = 0; i < array.length; i++) {\n    sum += array[i];                   // n operations\n  }\n  \n  // Nested loops: O(n²)\n  for(let i = 0; i < array.length; i++) {\n    for(let j = 0; j < array.length; j++) {\n      console.log(i, j);               // n² operations\n    }\n  }\n  \n  return sum;                          // 1 operation\n}',
                        explanation: 'This function does two things: First, it adds up all numbers (n steps). Then it does a nested loop printing all pairs of indexes (n² steps). So it does both an n operation and an n² operation.',
                    },
                    {
                        label: 'Count All Operations',
                        expression: 'T(n) = 1 + n + n² + 1 = n² + n + 2',
                        explanation: 'Adding everything up: We do 1 thing at the start, n things in the first loop, n² things in the nested loops, and 1 thing at the end. That\'s n² + n + 2 total operations.',
                    },
                    {
                        label: 'Compare Term Magnitudes',
                        expression: 'For n = 10:\nn² = 100, n = 10, constants = 2\n100 + 10 + 2 = 112\n\nFor n = 100:\nn² = 10,000, n = 100, constants = 2\n10,000 + 100 + 2 = 10,102',
                        explanation: 'Let\'s see how much each part contributes. With 10 items: n² gives 100 operations, n gives 10, constants give 2. With 100 items: n² gives 10,000 operations, n gives just 100, constants still give 2. The n² part quickly dwarfs everything else.',
                    },
                    {
                        label: 'Simplify to Big O Notation',
                        expression: 'T(n) = n² + n + 2 = O(n²)',
                        explanation: 'Since the n² part grows so much faster, we drop the smaller terms. It\'s like worrying about a tsunami coming and ignoring a few raindrops. When n gets large, the n² term is all that matters, so we simplify to O(n²).',
                    },
                ]}
            />
        </div>
    </>
);

export default BigOMathWalkthrough;