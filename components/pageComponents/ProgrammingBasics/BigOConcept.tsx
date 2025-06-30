import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';
import MathStepThrough from '@/components/common/MathStepThrough';

export default function BigOConcept() {
	return (
		<ConceptWrapper
			title="Big O Notation"
			description="Big O notation describes how the running time or space requirements of an algorithm grow as the input size grows. It helps you compare the efficiency of different algorithms."
		>
			<TableOfContents numbered>
				<Section title="What is Big O Notation?">
					<p style={{ marginBottom: 32 }}>
						<b>Big O notation</b> is a way to measure how much <b>time</b> (how long it takes) or <b>memory</b> (how much space it uses) a program will need to finish its work, especially as the amount of data gets bigger.
					</p>
				</Section>
				<Section title="Common Complexities">
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
				</Section>


				<Section title="How to Handle Constants and Multiple Complexities">
					<p style={{ marginBottom: 24 }}>
						When analyzing Big O, it's important to understand how constants and multiple terms affect the overall complexity. This helps you simplify your answer and focus on what really matters as your input grows.
					</p>
					<div style={{ marginBottom: 32 }}>
						<b>Dropping Constants</b>
						<div style={{ margin: '10px 0 18px 0', color: '#444', fontSize: 15 }}>
							<b>What is a constant?</b> In Big O, a <b>constant</b> is any fixed amount of work that doesn't change as your input grows. For example, printing a message once, or doing a small number of extra steps before or after a loop, is a constant. Even if you do something 10 or 100 times, that's still a constant if it doesn't depend on the size of your input.
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
									highlight: ['for each item in list:'],
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
									highlight: ['for each item in list:'],
								},
							]}
						/>
						<div style={{ marginTop: 12, color: '#444', fontSize: 15 }}>
							<b>Why?</b> Constants and constant multipliers don’t change how fast your code grows as n gets huge. They only affect the exact number of steps, not the overall trend.
						</div>
					</div>
					<div style={{ marginBottom: 32 }}>
						<b>Multiple Complexities</b>
						<div style={{ margin: '10px 0 18px 0', color: '#444', fontSize: 15 }}>
							<b>What do we mean by multiple complexities?</b> Sometimes, your code has more than one part that grows at a different rate. For example, you might have a loop that runs <b>n</b> times and then a nested loop that runs <b>n²</b> times. Or you might have a linear part and a logarithmic part. In these cases, you add up the work from each part to get the total complexity.
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
					</div>
				</Section>

				<Section title="How to Calculate Big O: Step-by-Step Math Examples">
					<p style={{ marginBottom: 32 }}>
						Let's focus on the math behind calculating Big O for different code patterns. We'll break down how to count steps and simplify to Big O, using variables instead of specific numbers.
					</p>

					<div style={{ marginBottom: 40 }}>
						<b>Example 1: Linear Time (O(n))</b>
						<StepThroughCodeAnimation
							code={[
								'function printAll(list):',
								'    for each item in list:',
								'        print(item)',
							]}
							steps={[
								{
									label: 'Count the Loop',
									desc: 'The loop runs once for each item. If there are n items, that’s n steps.',
									highlight: 'for each item in list:',
								},
								{
									label: 'Add Constant',
									desc: 'If you add a step before or after (like print("done")), total steps = n + c, where c is a constant.',
									highlight: '',
								},
								{
									label: 'Big O',
									desc: 'In Big O, drop constants. O(n + c) becomes O(n).',
									highlight: 'for each item in list:',
								},
							]}
						/>
					</div>

					<div style={{ marginBottom: 40 }}>
						<b>Example 2: Quadratic Time (O(n²))</b>
						<StepThroughCodeAnimation
							code={[
								'function printAllPairs(list):',
								'    for each a in list:',
								'        for each b in list:',
								'            print(a, b)',
							]}
							steps={[
								{
									label: 'Count Outer Loop',
									desc: 'Outer loop runs n times.',
									highlight: 'for each a in list:',
								},
								{
									label: 'Count Inner Loop',
									desc: 'For each a, inner loop runs n times. Total: n × n = n².',
									highlight: 'for each b in list:',
								},
								{
									label: 'Add Constant Work',
									desc: 'If you do c things in the inner loop, total is c × n².',
									highlight: 'print(a, b)',
								},
								{
									label: 'Big O',
									desc: 'Drop the constant. O(c n²) = O(n²).',
									highlight: 'print(a, b)',
								},
							]}
						/>
					</div>

					<div style={{ marginBottom: 40 }}>
						<b>Example 3: Logarithmic Time (O(log n))</b>
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
							]}
							steps={[
								{
									label: 'Halve Each Step',
									desc: 'Each loop cuts the list in half.',
									highlight: 'while left <= right:',
								},
								{
									label: 'Count Halves',
									desc: 'How many times can you halve n? log₂(n) times.',
									highlight: 'while left <= right:',
								},
								{
									label: 'Big O',
									desc: 'O(log n) is the result.',
									highlight: 'while left <= right:',
								},
							]}
						/>
					</div>

					<div style={{ marginBottom: 40 }}>
						<b>Example 4: Linearithmic Time (O(n log n))</b>
						<StepThroughCodeAnimation
							code={[
								'function mergeSort(list):',
								'    if length of list <= 1:',
								'        return list',
								'    mid = length of list // 2',
								'    left = mergeSort(list[0:mid])',
								'    right = mergeSort(list[mid:end])',
								'    return merge(left, right)',
							]}
							steps={[
								{
									label: 'Count Levels',
									desc: 'Splitting in half gives log₂(n) levels.',
									highlight: [
										'if length of list <= 1:',
										'mid = length of list // 2',
										'left = mergeSort(list[0:mid])',
										'right = mergeSort(list[mid:end])',
									],
								},
								{
									label: 'Work per Level',
									desc: 'Each level merges n items.',
									highlight: 'return merge(left, right)',
								},
								{
									label: 'Multiply',
									desc: 'Total work: n × log n.',
									highlight: 'return merge(left, right)',
								},
								{
									label: 'Big O',
									desc: 'O(n log n) is the result.',
									highlight: 'return merge(left, right)',
								},
							]}
						/>
					</div>

					<div style={{ marginBottom: 40 }}>
						<b>Example 5: Multiple Terms (O(n + n²))</b>
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
									desc: 'First loop is n steps. Nested loops are n² steps.',
									highlight: ['for each item in list:', 'for each a in list:', 'for each b in list:'],
								},
								{
									label: 'Big O',
									desc: 'O(n + n²) simplifies to O(n²) (drop the smaller term).',
									highlight: ['for each a in list:', 'for each b in list:'],
								},
							]}
						/>
					</div>
				</Section>

			</TableOfContents>
		</ConceptWrapper>
	);
}