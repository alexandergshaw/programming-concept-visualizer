'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';
import ArrayConcept from './ArrayConcept';
import MapConcept from './MapConcept';
import ObjectConcept from './ObjectConcept';
import SetConcept from './SetConcept';
import VariableConcept from './VariableConcept';
import ConstantConcept from './ConstantConcept';
import DataTypesConcept from './DataTypesConcept';
import UserInputConcept from './UserInputConcept';
import ConditionalConcept from './ConditionalConcept';
import LoopConcept from './LoopConcept';
import FunctionConcept from './FunctionConcept';

const navItems = [
  {
    label: 'Storing Data',
    value: 'storing data',
    children: [
      { label: 'Variables', value: 'variables' },
      { label: 'Constants', value: 'constants' },
      { label: 'Data Types', value: 'data types' },
    ],
  },
  {
    label: 'Control Flow',
    value: 'control flow',
    children: [
      { label: 'Conditionals', value: 'conditionals' },
      { label: 'Loops', value: 'loops' },
    ]
  },
  {
    label: 'Functions',
    value: 'functions',
    children: [
      { label: 'Functions', value: 'functions' },
      // { label: 'jQuery Event Listeners', value: 'jQuery Event Listeners' },
    ],
  },
  // {
  //   label: 'Control Flow',
  //   value: 'control flow',
  //   children: [
  //     { label: 'Operators', value: 'operators' },
  //     { label: 'Control Flow', value: 'control flow' },
  //     { label: 'Loops', value: 'loops' },
  //     { label: 'Conditionals', value: 'conditionals' },
  //   ],
  // },
  // {
  //   label: 'Functions',
  //   value: 'functions',
  //   children: [
  //     { label: 'Function Declaration', value: 'function declaration' },
  //     { label: 'Function Expression', value: 'function expression' },
  //     { label: 'Arrow Functions', value: 'arrow functions' },
  //     { label: 'Higher Order Functions', value: 'higher order functions' },
  //   ],
  // },
  // {
  //   label: 'Collections',
  //   value: 'collections',
  //   children: [
  //     { label: 'Arrays', value: 'arrays' },
  //     { label: 'Sets', value: 'sets' },
  //     { label: 'Maps', value: 'maps' },
  //   ],
  // },
  // {
  //   label: 'Object Oriented Programming',
  //   value: 'object oriented programming',
  //   children: [
  //     { label: 'Objects', value: 'objects' },
  //     { label: 'Classes', value: 'classes' },
  //   ],
  // },
  // {
  //   label: 'jQuery',
  //   value: 'jquery',
  //   children: [
  //     { label: 'Selectors', value: 'selectors' },
  //     { label: 'Events', value: 'events' },
  //   ],
  // },
  // {
  //   label: 'Advanced Topics',
  //   value: 'advanced topics',
  //   children: [
  //     { label: 'Asynchronous JavaScript', value: 'asynchronous' },
  //     { label: 'Promises', value: 'promises' },
  //   ],
  // },
];

export default function JavaScriptPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [codeSnippet, setCodeSnippet] = useState<string | null>(null);


  useEffect(() => {
    const conceptFromUrl = searchParams.get('concept');
    if (conceptFromUrl) {
      setSelectedConcept(conceptFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    setCodeSnippet('')
  }, [selectedConcept])

  const renderContent = (concept: string | null) => {
    if (!concept) return null;

    switch (concept.toLowerCase()) {
      case 'arrays':
        return <ArrayConcept onCodeChange={setCodeSnippet} />;
      case 'maps':
        return <MapConcept onCodeChange={setCodeSnippet} />;
      case 'sets':
        return <SetConcept onCodeChange={setCodeSnippet} />;
      case 'objects':
        return <ObjectConcept />;
      case 'variables': 
        return <VariableConcept />;
      case 'constants':
        return <ConstantConcept />;
      case 'data types':
        return <DataTypesConcept/>;
      case 'user input':
        return <UserInputConcept/>;
      case 'conditionals':
        return <ConditionalConcept />;
      case 'loops':
        return <LoopConcept />;
      case 'functions':
        return <FunctionConcept />;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/languages/javascript?concept=${value}`);
    setSelectedConcept(value);
  };

  const renderCodePreview = () => {
    return (
      <div className="js-code-preview">
        <div className="code-preview-header">
          <h3>JavaScript Code</h3>
        </div>
        <pre>
          <code>{codeSnippet}</code>
        </pre>
      </div>
    )
  }

  return (
    <PageWrapper pageTitle={'JavaScript Visualizer'} navItems={navItems} defaultOpen={["storing data", "control flow"]} handleSelect={handleSelect} activeValue={selectedConcept || undefined}>
      {selectedConcept ? (
        <>
          {renderContent(selectedConcept)}
          {codeSnippet && renderCodePreview()}
        </>
      ) : (
        <div className="empty-page-prompt">
          Please select a topic from the sidebar to get started.
        </div>
      )}
    </PageWrapper>
  );
}
