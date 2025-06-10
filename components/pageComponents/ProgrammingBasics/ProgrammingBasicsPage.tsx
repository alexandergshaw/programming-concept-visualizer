'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import CompilersInterpretersConcept from './CompilersInterpretersConcept';
import MemoryConcept from './MemoryConcept';
import HardwareConcept from './HardwareConcept';
import IntroductionConcept from './IntroductionConcept';

const navItems = [
	{
		label: 'How Computers Run Programs',
		value: 'how-computers-run-programs',
		children: [
			{ label: '1) Introduction', value: 'introduction' },
			{ label: '2) Interpreters & Compilers', value: 'compilers-interpreters' },
			{ label: '3) Hardware', value: 'hardware' },
			{ label: '4) Data', value: 'memory' },
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
			case 'introduction':
				return <IntroductionConcept />;
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
			defaultOpen={['how-computers-run-programs']}
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