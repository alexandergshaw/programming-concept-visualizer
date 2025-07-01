import React from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import WhatIsBigOSection from './WhatIsBigOSection';
import CommonComplexitiesSection from './CommonComplexitiesSection';
import ConstantsAndMultipleComplexitiesSection from './ConstantsAndMultipleComplexitiesSection';
import BigOMathWalkthrough from './BigOMathWalkthrough';

export default function BigOConcept() {
	return (
		<ConceptWrapper
			title="Big O Notation"
			description="Big O notation describes how the running time or space requirements of an algorithm grow as the input size grows. It helps you compare the efficiency of different algorithms."
		>
			<TableOfContents numbered>
				<Section title="What is Big O Notation?">
					<WhatIsBigOSection />
				</Section>
				<Section title="Common Complexities">
					<CommonComplexitiesSection />
				</Section>
				<Section title="How to Handle Constants and Multiple Complexities">
					<ConstantsAndMultipleComplexitiesSection />
				</Section>
				<Section title="Calculating Complexities">
					<BigOMathWalkthrough />
				</Section>
			</TableOfContents>
		</ConceptWrapper>
	);
}