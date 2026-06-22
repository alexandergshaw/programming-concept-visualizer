'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import VariableConcept from './VariableConcept';
import NumericExpressionsConcept from './NumericExpressionsConcept';
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
import AccumulatorPatternConcept from './AccumulatorPatternConcept';
import FunctionBasicsConcept from './FunctionBasicsConcept';
import ModulesConcept from './ModulesConcept';
import MathLibraryConcept from './MathLibraryConcept';
import ClassesObjectsConcept from './ClassesObjectsConcept';
import AttributesMethodsConcept from './AttributesMethodsConcept';
import InheritanceConcept from './InheritanceConcept';
import EncapsulationConcept from './EncapsulationConcept';
import PolymorphismConcept from './PolymorphismConcept';
import AbstractionConcept from './AbstractionConcept';
import TurtleIntroConcept from './TurtleIntroConcept';
import TurtleMovingConcept from './TurtleMovingConcept';
import TurtlePenConcept from './TurtlePenConcept';
import TurtleShapesConcept from './TurtleShapesConcept';
import { pythonNavItems as navItems } from '../navItems';

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
			case 'turtle-intro':
				return <TurtleIntroConcept />;
			case 'turtle-moving':
				return <TurtleMovingConcept />;
			case 'turtle-pen':
				return <TurtlePenConcept />;
			case 'turtle-shapes':
				return <TurtleShapesConcept />;
			case 'variables':
				return <VariableConcept />;
			case 'numeric-expressions':
				return <NumericExpressionsConcept />;
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
			case 'accumulator-pattern':
				return <AccumulatorPatternConcept />;
			case 'function-basics':
				return <FunctionBasicsConcept />;
			case 'modules':
				return <ModulesConcept />;
			case 'math-library':
				return <MathLibraryConcept />;
			case 'classes-objects':
				return <ClassesObjectsConcept />;
			case 'attributes-methods':
				return <AttributesMethodsConcept />;
			case 'inheritance':
				return <InheritanceConcept />;
			case 'encapsulation':
				return <EncapsulationConcept />;
			case 'polymorphism':
				return <PolymorphismConcept />;
			case 'abstraction':
				return <AbstractionConcept />;
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
			pageTitle={'Python'}
			navItems={navItems}
			defaultOpen={[]}
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
