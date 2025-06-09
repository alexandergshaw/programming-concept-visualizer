'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import CompilersInterpretersConcept from './CompilersInterpretersConcept';
import MemoryConcept from './MemoryConcept';
import HardwareConcept from './HardwareConcept';

const navItems = [
	{
		label: 'Foundational Concepts',
		value: 'foundational-concepts',
		children: [
			{ label: 'Hardware', value: 'hardware' },
			{ label: 'Memory', value: 'memory' },
			{ label: 'Compilers & Interpreters', value: 'compilers-interpreters' },
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
			defaultOpen={['Programming Basics']}
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