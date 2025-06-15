'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
// Import your Python concept components here
import VariableConcept from './VariableConcept';
import ConstantConcept from './ConstantConcept';
import DataTypesConcept from './DataTypesConcept';
import ListConcept from './ListConcept';
import DictConcept from './DictConcept';
import SetConcept from './SetConcept';
import UserInputConcept from './UserInputConcept';
import StringManipulationConcept from './StringManipulationConcept';

const navItems = [
	{
		label: 'Storing Data',
		value: 'storing data',
		children: [
			{ label: 'Variables', value: 'variables' },
			{ label: 'User Input', value: 'user input' },
            { label: 'String Manipulation', value: 'string manipulation' },
        ],
	},
];

export default function PythonPage() {
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
            case 'variables':
                return <VariableConcept />;
            case 'user input':
                return <UserInputConcept />;
            case 'string manipulation':
                return <StringManipulationConcept />;
            default:
				return null;
		}
	};

	const handleSelect = (value: string) => {
		router.push(`/languages/python?concept=${value}`);
		setSelectedConcept(value);
	};

	return (
		<PageWrapper
			pageTitle={'Python Visualizer'}
			navItems={navItems}
			defaultOpen={['storing data']}
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