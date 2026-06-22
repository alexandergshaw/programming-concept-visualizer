'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import ReactArchitectureConcept from './ReactArchitectureConcept';
import { reactNavItems as navItems } from '../navItems';

export default function ReactPage() {
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
			case 'react-architecture':
				return <ReactArchitectureConcept />;
			case 'component-basics':
			case 'jsx-syntax':
			case 'props':
			case 'state':
			case 'event-handling':
			case 'hooks-basics':
			case 'use-context':
			case 'custom-hooks':
			case 'conditional-rendering':
			case 'lists-keys':
			case 'forms':
				return <div style={{ padding: '2rem' }}>This concept is coming soon...</div>;
			default:
				return null;
		}
	};

	const handleSelect = (value: string) => {
		router.push(`/languages/react?concept=${value}`);
		setSelectedConcept(value);
	};

	return (
		<PageWrapper
			pageTitle='React'
			navItems={navItems}
			defaultOpen={[]}
			handleSelect={handleSelect}
			activeValue={selectedConcept || undefined}
		>
			{selectedConcept ? (
				renderContent(selectedConcept)
			) : (
				<div className='empty-page-prompt'>
					Please select a topic from the sidebar to get started.
				</div>
			)}
		</PageWrapper>
	);
}