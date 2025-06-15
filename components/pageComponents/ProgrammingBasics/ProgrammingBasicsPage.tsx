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

const navItems = [
	{
		label: 'How Computers Run Programs',
		value: 'how-computers-run-programs',
		children: [
			{ label: '1) Introduction', value: 'introduction-computers-run-programs' },
			{ label: '2) Interpreters & Compilers', value: 'compilers-interpreters' },
			{ label: '3) Hardware', value: 'hardware' },
			{ label: '4) Data', value: 'memory' },
		],
	},
	{
		label: 'How We Design Programs',
		value: 'how-we-design-programs',
		children: [
			{ label: 'Flow Charts', value: 'flow-charts'},
		],
	},
];

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
		switch (concept.toLowerCase()) {
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
							{ icon: <CodeIcon sx={{ fontSize: 48, color: '#1976d2' }} />, label: 'Your Code' },
							{ icon: <ComputerIcon sx={{ fontSize: 48, color: '#388e3c' }} />, label: 'Hardware' },
							{ icon: <MemoryIcon sx={{ fontSize: 48, color: '#fbc02d' }} />, label: 'Memory' },
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
								icon: <AutoAwesomeMotionIcon sx={{ fontSize: 48, color: '#1976d2' }} />,
								label: 'Algorithm (Step-by-step plan)'
							},
							{
								icon: <AccountTreeIcon sx={{ fontSize: 48, color: '#388e3c' }} />,
								label: 'Flow Chart (Visual diagram)'
							},
							{
								icon: <SubjectIcon sx={{ fontSize: 48, color: '#fbc02d' }} />,
								label: 'Pseudo Code (Structured outline)'
							}
						]}
						closing="You'll see how an idea becomes an algorithm, how that algorithm can be visualized with a flow chart, and how pseudo code bridges the gap between your plan and real code. Let's get started designing programs!"
					/>
				);
			case 'flow-charts':
				return <FlowchartDesigner />;
			default:
				return null;
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