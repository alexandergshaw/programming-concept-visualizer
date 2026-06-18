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
import EventHandlersConcept from './EventHandlers';
import EventDrivenDomConcept from './EventDrivenDomConcept';
import JQueryConcept from './JQueryConcept';
import JQuerySelectorsAndChainingConcept from './JQuerySelectorsAndChainingConcept';
import JQueryFormHandlingConcept from './JQueryFormHandlingConcept';
import JQueryDomManipulation from './JQueryDomManipulation';
import TryCatchFinallyConcept from './TryCatchFinally/TryCatchFinallyConcept';
import ErrorsConcept from './Errors/ErrorsConcept';
import SwitchStatementConcept from './SwitchCase/SwitchStatementConcept';
import TernaryOperatorConcept from './TernaryOperator/TernaryOperatorConcept';
import IdentityOperatorConcept from './IdentityOperator/IdentityOperatorConcept';
import EqualityOperatorConcept from './EqualityOperator/EqualityOperatorConcept';
import ObjectFundamentalsConcept from './ObjectOriented/ObjectFundamentalsConcept';
import InheritanceHierarchiesConcept from './ObjectOriented/InheritanceHierarchiesConcept';
import ObjectPatternsConcept from './ObjectOriented/ObjectPatternsConcept';
import FunctionParametersConcept from './Advanced/FunctionParametersConcept';
import ScopeClosuresConcept from './Advanced/ScopeClosuresConcept';
import ModulesPatternsConcept from './Advanced/ModulesPatternsConcept';

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
    label: 'Operators',
    value: 'operators',
    children: [
      { label: 'Identity Operators', value: 'identity-operators' },
      { label: 'Equality Operators', value: 'equality-operators' },
    ],
  },
  {
    label: 'Control Flow',
    value: 'control flow',
    children: [
      { label: 'Ternary Operator', value: 'ternary-operator' },
      { label: 'If/Else', value: 'conditionals' },
      { label: 'Switch Statement', value: 'switch-statement' },
      { label: 'Loops', value: 'loops' },
    ]
  },
  {
    label: 'Collections',
    value: 'collections',
    children: [
      { label: 'Arrays', value: 'arrays' },
      { label: 'Sets', value: 'sets' },
      { label: 'Maps', value: 'maps' },
    ],
  },
  {
    label: 'Functions',
    value: 'functions',
    children: [
      { label: 'Functions', value: 'functions' },
      { label: 'Event Handlers', value: 'Event Listeners' },
      { label: 'Event-Driven DOM', value: 'event-driven dom' },
    ],
  },
  {
    label: 'Error Handling',
    value: 'error handling',
    children: [
      { label: 'Common Errors', value: 'javascript-errors' },
      { label: 'Try-Catch-Finally', value: 'try-catch-finally' },
    ],
  },
  {
    label: 'Object Oriented Programming',
    value: 'object oriented programming',
    children: [
      { label: 'Object Fundamentals', value: 'object-fundamentals' },
      { label: 'Inheritance & Hierarchies', value: 'inheritance-hierarchies' },
      { label: 'Object Patterns', value: 'object-patterns' },
    ],
  },
  {
    label: 'Advanced JavaScript',
    value: 'advanced javascript',
    children: [
      { label: 'Function Parameters', value: 'function-parameters' },
      { label: 'Scope & Closures', value: 'scope-closures' },
      { label: 'Modules & Patterns', value: 'modules-patterns' },
    ],
  },
  {
    label: 'jQuery',
    value: 'jquery',
    children: [
      { label: 'jQuery Basics', value: 'jquery-basics' },
      { label: 'Selectors & Chaining', value: 'jquery-selectors-chaining' },
      { label: 'DOM Manipulation', value: 'jquery-dom-manipulation' },
    ],
  },
  // {
  //   label: 'Object Oriented Programming',
  //   value: 'object oriented programming',
  //   children: [
  //     { label: 'Objects', value: 'objects' },
  //     { label: 'Classes', value: 'classes' },
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
      case 'object-fundamentals':
        return <ObjectFundamentalsConcept />;
      case 'inheritance-hierarchies':
        return <InheritanceHierarchiesConcept />;
      case 'object-patterns':
        return <ObjectPatternsConcept />;
      case 'variables': 
        return <VariableConcept />;
      case 'constants':
        return <ConstantConcept />;
      case 'data types':
        return <DataTypesConcept/>;
      case 'user input':
        return <UserInputConcept/>;
      case 'identity-operators':
        return <IdentityOperatorConcept />;
      case 'equality-operators':
        return <EqualityOperatorConcept />;
      case 'ternary-operator':
        return <TernaryOperatorConcept />;
      case 'conditionals':
        return <ConditionalConcept />;
      case 'switch-statement':
        return <SwitchStatementConcept />;
      case 'loops':
        return <LoopConcept />;
      case 'functions':
        return <FunctionConcept />;
      case 'event listeners':
        return <EventHandlersConcept />;
      case 'event-driven dom':
        return <EventDrivenDomConcept />;
      case 'jquery-basics':
        return <JQueryConcept />;
      case 'jquery-selectors-chaining':
        return <JQuerySelectorsAndChainingConcept />;
      case 'jquery-form-handling':
        return <JQueryFormHandlingConcept />;
      case 'jquery-dom-manipulation':
        return <JQueryDomManipulation />;
      case 'try-catch-finally':
        return <TryCatchFinallyConcept />;
      case 'javascript-errors':
        return <ErrorsConcept />;
      case 'function-parameters':
        return <FunctionParametersConcept />;
      case 'scope-closures':
        return <ScopeClosuresConcept />;
      case 'modules-patterns':
        return <ModulesPatternsConcept />;
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
          <h5>JavaScript Code</h5>
        </div>
        <pre>
          <code>{codeSnippet}</code>
        </pre>
      </div>
    )
  }

  return (
    <PageWrapper pageTitle={'JavaScript Visualizer'} navItems={navItems} defaultOpen={[]} handleSelect={handleSelect} activeValue={selectedConcept || undefined}>
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
