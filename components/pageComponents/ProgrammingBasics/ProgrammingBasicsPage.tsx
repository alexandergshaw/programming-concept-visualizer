'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import CompilersInterpretersConcept from './CompilersInterpretersConcept';
import MemoryConcept from './MemoryConcept';
import HardwareConcept from './HardwareConcept';
import GenericIntroduction from '../../common/GenericIntroduction';
import CodeIcon from '@mui/icons-material/Code';
import MemoryIcon from '@mui/icons-material/Memory';
import ComputerIcon from '@mui/icons-material/Computer';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SubjectIcon from '@mui/icons-material/Subject';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'; 
import FlowchartDesigner from './FlowchartDesigner';
import BigOConcept from './BigOConcept';
// Data Structures + Algorithms concepts (general CS topics that live in the
// Python folder but are surfaced here on the intro-to-programming page).
import StackConcept from '../Python/StackConcept';
import QueueConcept from '../Python/QueueConcept';
import TreeConcept from '../Python/TreeConcept';
import AlgorithmAnalysisConcept from '../Python/AlgorithmAnalysisConcept';
import RecursionVisualConcept from '../Python/RecursionVisualConcept';
import SearchingConcept from '../Python/SearchingConcept';
import SortingConcept from '../Python/SortingConcept';
import { programmingBasicsNavItems as navItems } from '../navItems';

const dataStructuresConceptContent: Record<
	string,
	{ title: string; paragraphs: string[]; closing: string }
> = {
	'intro-algorithm-analysis': {
		title: 'Introduction to Algorithm Analysis',
		paragraphs: [
			'Algorithm analysis compares how different solutions scale as input sizes grow.',
			'You will use time and space complexity to estimate performance before writing production code.',
		],
		closing: 'Start by focusing on growth trends (Big O) so you can choose solutions that stay efficient at scale.',
	},
	'object-oriented-foundations': {
		title: 'Object-Oriented Foundations',
		paragraphs: [
			'Object-oriented design models software around objects that combine data and behavior.',
			'Core ideas include classes, encapsulation, and relationships between objects.',
		],
		closing: 'Strong OOP foundations make large codebases easier to maintain, test, and extend.',
	},
	'dynamic-lists': {
		title: 'Dynamic Lists',
		paragraphs: [
			'Dynamic lists can grow and shrink during runtime while preserving ordered elements.',
			'They usually rely on resizing strategies to balance memory usage and append performance.',
		],
		closing: 'Understanding resizing costs helps you know when dynamic lists are the right default structure.',
	},
	'linked-lists': {
		title: 'Linked Lists',
		paragraphs: [
			'Linked lists store elements in nodes connected by references instead of contiguous memory.',
			'They support cheap insertions and removals near known positions, with slower random access.',
		],
		closing: 'Choose linked lists when pointer updates matter more than constant-time indexing.',
	},
	'recursion-foundations': {
		title: 'Recursion Foundations',
		paragraphs: [
			'Recursion solves problems by reducing them into smaller versions of the same problem.',
			'Every recursive function needs a base case and a rule that moves toward that base case.',
		],
		closing: 'Clear base cases and progress guarantees are the keys to safe recursive solutions.',
	},
	'backtracking': {
		title: 'Backtracking',
		paragraphs: [
			'Backtracking explores possible choices step by step, undoing decisions that fail constraints.',
			'It is effective for search spaces like puzzles, combinations, and path finding problems.',
		],
		closing: 'Think of backtracking as depth-first exploration with systematic undo operations.',
	},
	'advanced-recursion': {
		title: 'Advanced Recursion',
		paragraphs: [
			'Advanced recursion combines recursive decomposition with optimization ideas like memoization.',
			'These techniques reduce repeated work while preserving recursive clarity.',
		],
		closing: 'When performance matters, pair recursion with caching or better subproblem structure.',
	},
	'searching-algorithms': {
		title: 'Searching Algorithms',
		paragraphs: [
			'Searching algorithms find target values in collections using different trade-offs.',
			'Linear and binary search illustrate how data ordering changes performance dramatically.',
		],
		closing: 'Pick a search strategy based on data shape, ordering guarantees, and query frequency.',
	},
	'elementary-sorting': {
		title: 'Elementary Sorting',
		paragraphs: [
			'Elementary sorts like bubble, selection, and insertion sort build intuition for ordering data.',
			'They are simple to reason about and useful for understanding algorithm behavior.',
		],
		closing: 'Use elementary sorts to build fundamentals before moving to faster divide-and-conquer methods.',
	},
	'advanced-sorting': {
		title: 'Advanced Sorting',
		paragraphs: [
			'Advanced sorting algorithms improve efficiency on larger datasets through better partitioning and merging.',
			'Examples include merge sort and quicksort, each with different performance characteristics.',
		],
		closing: 'Analyze worst-case and average-case behavior to choose the best sort for your workload.',
	},
	'binary-trees': {
		title: 'Binary Trees',
		paragraphs: [
			'Binary trees organize data hierarchically with each node having up to two children.',
			'Tree traversals provide structured ways to process nodes for search, output, and analysis.',
		],
		closing: 'Tree structure is foundational for efficient hierarchical data operations.',
	},
	'binary-search-trees': {
		title: 'Binary Search Trees',
		paragraphs: [
			'Binary search trees maintain ordering: left subtree values are smaller, right subtree values are larger.',
			'This property enables efficient insertion, deletion, and lookup in balanced cases.',
		],
		closing: 'BST performance depends on shape, which is why balancing strategies are important.',
	},
	'heaps': {
		title: 'Heaps',
		paragraphs: [
			'Heaps are specialized tree-based structures optimized for repeated access to min or max values.',
			'They power fast priority operations and heap sort workflows.',
		],
		closing: 'Use heaps when top-priority retrieval is more important than full sorted order.',
	},
	'priority-queues': {
		title: 'Priority Queues',
		paragraphs: [
			'Priority queues remove items by priority rather than arrival order.',
			'They are commonly implemented with heaps to keep inserts and removals efficient.',
		],
		closing: 'Priority queues are essential in scheduling, pathfinding, and simulation systems.',
	},
	hashing: {
		title: 'Hashing',
		paragraphs: [
			'Hashing converts keys into array indexes to support near-constant-time lookup patterns.',
			'Good hash functions spread keys evenly and reduce collisions.',
		],
		closing: 'Hash quality and collision strategy are critical to reliable performance.',
	},
	'hash-tables': {
		title: 'Hash Tables',
		paragraphs: [
			'Hash tables store key-value pairs using hashed keys for fast insert, find, and delete operations.',
			'Collision handling approaches include chaining and open addressing.',
		],
		closing: 'Understand load factor and resizing to keep hash table operations efficient.',
	},
	'graph-fundamentals': {
		title: 'Graph Fundamentals',
		paragraphs: [
			'Graphs model relationships using vertices and edges, representing networks and connections.',
			'Core traversals like BFS and DFS reveal reachability and structure.',
		],
		closing: 'Graph thinking helps solve routing, dependency, and connectivity problems.',
	},
	'advanced-algorithm-design-patterns': {
		title: 'Advanced Algorithm Design Patterns',
		paragraphs: [
			'Design patterns like divide-and-conquer, greedy methods, and dynamic programming guide advanced solutions.',
			'Patterns help you map unfamiliar problems to proven algorithmic strategies.',
		],
		closing: 'Mastering algorithm patterns improves speed and confidence in problem solving.',
	},
};

export default function ProgrammingBasicsPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

	useEffect(() => {
		const conceptFromUrl = searchParams.get('concept');
		if (conceptFromUrl) {
			setSelectedConcept(conceptFromUrl);
		}
	}, [searchParams]);

	const renderContent = (concept: string | null) => {
		if (!concept) return null;
		const normalizedConcept = concept.toLowerCase();
		switch (normalizedConcept) {
			case 'memory':
				return <MemoryConcept />;
			case 'compilers-interpreters':
				return <CompilersInterpretersConcept />;
			case 'hardware':
				return <HardwareConcept />;
			case 'introduction-computers-run-programs':
				return (
					<GenericIntroduction
						title="Welcome!"
						paragraphs={[
							"We'll be covering concepts that apply to almost all programming languages! We'll start with the part of programming you'll interact with the most: writing code.",
							"As you progress, we'll peel back the layers and take you further and further \"behind the scenes\" to show you how a computer actually runs your code.",
						]}
						steps={[
							{ icon: <CodeIcon sx={{ fontSize: 48, color: 'var(--info)' }} />, label: 'Your Code' },
							{ icon: <ComputerIcon sx={{ fontSize: 48, color: 'var(--success)' }} />, label: 'Hardware' },
							{ icon: <MemoryIcon sx={{ fontSize: 48, color: 'var(--warning)' }} />, label: 'Memory' },
						]}
						closing="You'll see how your code is translated, how the computer's hardware and memory work together, and how everything comes together to make your programs run. Let's begin our journey from the code you write, all the way down to the circuits inside your computer!"
					/>
				);
			case 'introduction-design-programs':
				return (
					<GenericIntroduction
						title="Designing Programs: From Idea to Code"
						paragraphs={[
							"Before you write code, you need a plan! In this section, you'll learn how programmers design solutions to problems before ever touching a keyboard.",
							"We'll explore three key tools: algorithms, flow charts, and pseudo code. Each helps you move from a rough idea to a clear plan for your program."
						]}
						steps={[
							{
								icon: <AutoAwesomeMotionIcon sx={{ fontSize: 48, color: 'var(--info)' }} />,
								label: 'Algorithm (Step-by-step plan)'
							},
							{
								icon: <AccountTreeIcon sx={{ fontSize: 48, color: 'var(--success)' }} />,
								label: 'Flow Chart (Visual diagram)'
							},
							{
								icon: <SubjectIcon sx={{ fontSize: 48, color: 'var(--warning)' }} />,
								label: 'Pseudo Code (Structured outline)'
							}
						]}
						closing="You'll see how an idea becomes an algorithm, how that algorithm can be visualized with a flow chart, and how pseudo code bridges the gap between your plan and real code. Let's get started designing programs!"
					/>
				);
			case 'flow-charts':
				return <FlowchartDesigner />;
			case 'big-o-notation':
				return <BigOConcept />;
			case 'stacks':
				return <StackConcept />;
			case 'queues':
				return <QueueConcept />;
			case 'trees':
				return <TreeConcept />;
			case 'algorithm-analysis':
				return <AlgorithmAnalysisConcept />;
			case 'recursion-viz':
				return <RecursionVisualConcept />;
			case 'searching':
				return <SearchingConcept />;
			case 'sorting':
				return <SortingConcept />;
			default: {
				const dataStructureConcept = dataStructuresConceptContent[normalizedConcept];
				if (dataStructureConcept) {
					return (
						<GenericIntroduction
							title={dataStructureConcept.title}
							paragraphs={dataStructureConcept.paragraphs}
							closing={dataStructureConcept.closing}
						/>
					);
				}
				return null;
			}
		}
	};

	const handleSelect = (value: string) => {
		router.push(`/skills/programming-basics?concept=${value}`);
		setSelectedConcept(value);
	};

	return (
		<PageWrapper
			pageTitle="Programming Basics"
			navItems={navItems}
			defaultOpen={['how-computers-run-programs', 'how-we-design-programs']}
			handleSelect={handleSelect}
			activeValue={selectedConcept || undefined}
		>
			{selectedConcept ? (
				<>
					{renderContent(selectedConcept)}
				</>
			) : (
				<div className="empty-page-prompt">
					Please select a topic from the sidebar to get started.
				</div>
			)}
		</PageWrapper>
	);
}