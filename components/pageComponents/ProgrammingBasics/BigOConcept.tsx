import React, { useState } from 'react';
import ConceptWrapper from '../../common/ConceptWrapper';
import TableOfContents from '@/components/common/TableOfContents';
import Section from '@/components/common/Section';
import StepThroughCodeAnimation from '../JavaScript/StepThroughCodeAnimation';
import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import WhatIsBigOSection from './WhatIsBigOSection';
import CommonComplexitiesSection from './CommonComplexitiesSection';
import ConstantsAndMultipleComplexitiesSection from './ConstantsAndMultipleComplexitiesSection';
import BigOMathWalkthrough from './BigOMathWalkthrough';

// Register Chart.js components (only once in your app)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function BigOConcept() {
	// --- State for interactive chart ---
	const [multiYAxisMax, setMultiYAxisMax] = useState<number | ''>('');
	const [showCombined, setShowCombined] = useState(true);
	const [customMultiplier, setCustomMultiplier] = useState<number>(2);
	const [selectedMultipliers, setSelectedMultipliers] = useState<number[]>([1, 2, 5]);
	const multipliers = [
		{ value: 1, label: 'n' },
		{ value: 2, label: '2n' },
		{ value: 5, label: '5n' },
	];

	// Add custom multiplier if not already present
	const allMultipliers = [
		...multipliers,
		...(customMultiplier !== 1 && customMultiplier !== 2 && customMultiplier !== 5
			? [{ value: customMultiplier, label: `${customMultiplier}n` }]
			: []),
	];

	// Use a high number of steps to show the trend for large inputs
	const maxN = 1000;
	const step = 50;
	const chartLabels = Array.from({ length: Math.floor(maxN / step) + 1 }, (_, i) => i * step);

	const chartData = {
		labels: chartLabels,
		datasets: allMultipliers
			.filter(m => selectedMultipliers.includes(m.value))
			.map(m => ({
				label: m.label,
				data: chartLabels.map(n => m.value * n),
				borderColor:
					m.value === 1
						? '#1976d2'
						: m.value === 2
							? '#43a047'
							: m.value === 5
								? '#fbc02d'
								: '#8e24aa',
				backgroundColor:
					m.value === 1
						? 'rgba(25, 118, 210, 0.1)'
						: m.value === 2
							? 'rgba(67, 160, 71, 0.1)'
							: m.value === 5
								? 'rgba(251, 192, 45, 0.1)'
								: 'rgba(142, 36, 170, 0.1)',
				tension: 0.2,
			})),
	};

	// Add these toggles for different shapes/trends
	const [showLinear, setShowLinear] = useState(true);
	const [showQuadratic, setShowQuadratic] = useState(false);
	const [showLog, setShowLog] = useState(false);

	const trendShapes = [
		{
			key: 'linear',
			label: 'Linear (n)',
			checked: showLinear,
			toggle: () => setShowLinear(v => !v),
			color: '#1976d2',
			data: chartLabels.map(n => n),
		},
		{
			key: 'quadratic',
			label: 'Quadratic (n²)',
			checked: showQuadratic,
			toggle: () => setShowQuadratic(v => !v),
			color: '#e53935',
			data: chartLabels.map(n => n * n),
		},
		{
			key: 'log',
			label: 'Logarithmic (log n)',
			checked: showLog,
			toggle: () => setShowLog(v => !v),
			color: '#ff9800',
			data: chartLabels.map(n => n === 0 ? 0 : Math.log2(n) * 100), // scale for visibility
		},
	];

	// Compose all datasets for the chart
	const allShapeDatasets = [
		...allMultipliers
			.filter(m => selectedMultipliers.includes(m.value) && showLinear)
			.map(m => ({
				label: m.label,
				data: chartLabels.map(n => m.value * n),
				borderColor:
					m.value === 1
						? '#1976d2'
						: m.value === 2
							? '#43a047'
							: m.value === 5
								? '#fbc02d'
								: '#8e24aa',
				backgroundColor:
					m.value === 1
						? 'rgba(25, 118, 210, 0.1)'
						: m.value === 2
							? 'rgba(67, 160, 71, 0.1)'
							: m.value === 5
								? 'rgba(251, 192, 45, 0.1)'
								: 'rgba(142, 36, 170, 0.1)',
				tension: 0.2,
			})),
		...(showQuadratic
			? [
				{
					label: 'n²',
					data: chartLabels.map(n => n * n),
					borderColor: '#e53935',
					backgroundColor: 'rgba(229, 57, 53, 0.1)',
					tension: 0.2,
				},
			]
			: []),
		...(showLog
			? [
				{
					label: 'log n',
					data: chartLabels.map(n => n === 0 ? 0 : Math.log2(n) * 100),
					borderColor: '#ff9800',
					backgroundColor: 'rgba(255, 152, 0, 0.1)',
					tension: 0.2,
				},
			]
			: []),
	];

	const chartDataWithShapes = {
		labels: chartLabels,
		datasets: allShapeDatasets,
	};

	// --- Chart options ---
	const chartOptions = {
		responsive: true,
		plugins: {
			legend: { display: true, position: 'top' },
			title: { display: false },
		},
		scales: {
			x: {
				title: { display: true, text: 'Input Size (n)' },
				grid: { display: false },
			},
			y: {
				title: { display: true, text: 'Steps' },
				grid: { display: false },
			},
		},
	};

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