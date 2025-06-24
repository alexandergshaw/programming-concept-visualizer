'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import VariableConcept from './VariableConcept';
import UserInputConcept from './UserInputConcept';
import StringManipulationConcept from './StringManipulationConcept';
import ListConcept from './ListConcept';
import TupleConcept from './TupleConcept';
import SetConcept from './SetConcept';
import DictConcept from './DictConcept';
import IfElseConcept from './IfElseConcept';
import LogicalAndOrConcept from './LogicalAndOrConcept';
import WhileLoopConcept from './WhileLoopConcept';
import ForLoopConcept from './ForLoopConcept';
import RecursionConcept from './RecursionConcept';

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
	{
		label: 'Control Flow',
		value: 'control flow',
		children: [
			{ label: 'If / Else', value: 'ifelse' },
			{ label: 'Logical And / Or', value: 'logicalandor' },
			{ label: 'For Loops', value: 'forloops' },
			{ label: 'While Loops', value: 'whileloops' },
		],
	},
	{
		label: 'Collections',
		value: 'collections',
		children: [
			{ label: 'Lists', value: 'lists' },
			{ label: 'Tuples', value: 'tuples' },
			{ label: 'Sets', value: 'sets' },
			{ label: 'Dictionaries', value: 'dicts' },
		],
	},
	{
		label: 'Functions',
		value: 'functions',
		children: [
			{ label: 'Recursion', value: 'recursion' },
		]
	}
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
		switch (concept) {
            case 'variables':
                return <VariableConcept />;
            case 'user input':
                return <UserInputConcept />;
            case 'string manipulation':
                return <StringManipulationConcept />;
            case 'lists':
                return <ListConcept />;
            case 'tuples':
                return <TupleConcept />;
            case 'sets':
                return <SetConcept />;
            case 'dicts':
                return <DictConcept />;
            case 'ifelse':
                return <IfElseConcept />;
            case 'logicalandor':
                return <LogicalAndOrConcept />;
            case 'whileloops':
                return <WhileLoopConcept />;
            case 'forloops':
                return <ForLoopConcept />;
            case 'recursion':
                return <RecursionConcept />;
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
			defaultOpen={['control flow', 'collections', 'storing data']}
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