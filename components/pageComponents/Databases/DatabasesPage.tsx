'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../../common/PageWrapper';

import WhatIsADatabaseConcept from './WhatIsADatabaseConcept';
import WhyDatabasesConcept from './WhyDatabasesConcept';
import DbmsConcept from './DbmsConcept';
import DatabaseTypesConcept from './DatabaseTypesConcept';
import TablesRowsColumnsConcept from './TablesRowsColumnsConcept';
import PrimaryKeysConcept from './PrimaryKeysConcept';
import ForeignKeysConcept from './ForeignKeysConcept';
import RelationshipTypesConcept from './RelationshipTypesConcept';
import ErDiagramsConcept from './ErDiagramsConcept';
import SchemaDesignConcept from './SchemaDesignConcept';
import NormalizationConcept from './NormalizationConcept';
import DenormalizationConcept from './DenormalizationConcept';
import CrudConcept from './CrudConcept';
import DataIntegrityConcept from './DataIntegrityConcept';
import IndexesConcept from './IndexesConcept';
import TransactionsAcidConcept from './TransactionsAcidConcept';
import SqlVsNosqlConcept from './SqlVsNosqlConcept';
import NosqlTypesConcept from './NosqlTypesConcept';
import ChoosingDatabaseConcept from './ChoosingDatabaseConcept';
import BackupsConcept from './BackupsConcept';
import SecurityConcept from './SecurityConcept';
import ScalingConcept from './ScalingConcept';

const navItems = [
  {
    label: 'Foundations',
    value: 'foundations',
    children: [
      { label: 'What Is a Database?', value: 'what-is-a-database' },
      { label: 'Why Not Spreadsheets?', value: 'why-databases' },
      { label: 'The DBMS', value: 'dbms' },
      { label: 'Types of Databases', value: 'database-types' },
    ],
  },
  {
    label: 'The Relational Model',
    value: 'relational-model',
    children: [
      { label: 'Tables, Rows & Columns', value: 'tables-rows-columns' },
      { label: 'Primary Keys', value: 'primary-keys' },
      { label: 'Foreign Keys', value: 'foreign-keys' },
      { label: 'Relationship Types', value: 'relationship-types' },
    ],
  },
  {
    label: 'Designing a Database',
    value: 'design',
    children: [
      { label: 'ER Diagrams', value: 'er-diagrams' },
      { label: 'Schema Design', value: 'schema-design' },
      { label: 'Normalization', value: 'normalization' },
      { label: 'Denormalization', value: 'denormalization' },
    ],
  },
  {
    label: 'Working with Data',
    value: 'working-with-data',
    children: [
      { label: 'CRUD Operations', value: 'crud' },
      { label: 'Constraints & Integrity', value: 'data-integrity' },
      { label: 'Indexes & Performance', value: 'indexes' },
      { label: 'Transactions & ACID', value: 'transactions-acid' },
    ],
  },
  {
    label: 'Beyond Relational',
    value: 'beyond-relational',
    children: [
      { label: 'SQL vs NoSQL', value: 'sql-vs-nosql' },
      { label: 'NoSQL Types', value: 'nosql-types' },
      { label: 'When to Use Which', value: 'choosing' },
    ],
  },
  {
    label: 'Operations & Safety',
    value: 'operations',
    children: [
      { label: 'Backups & Recovery', value: 'backups' },
      { label: 'Security & Access', value: 'security' },
      { label: 'Scaling', value: 'scaling' },
    ],
  },
];

export default function DatabasesPage() {
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
      case 'what-is-a-database':
        return <WhatIsADatabaseConcept />;
      case 'why-databases':
        return <WhyDatabasesConcept />;
      case 'dbms':
        return <DbmsConcept />;
      case 'database-types':
        return <DatabaseTypesConcept />;
      case 'tables-rows-columns':
        return <TablesRowsColumnsConcept />;
      case 'primary-keys':
        return <PrimaryKeysConcept />;
      case 'foreign-keys':
        return <ForeignKeysConcept />;
      case 'relationship-types':
        return <RelationshipTypesConcept />;
      case 'er-diagrams':
        return <ErDiagramsConcept />;
      case 'schema-design':
        return <SchemaDesignConcept />;
      case 'normalization':
        return <NormalizationConcept />;
      case 'denormalization':
        return <DenormalizationConcept />;
      case 'crud':
        return <CrudConcept />;
      case 'data-integrity':
        return <DataIntegrityConcept />;
      case 'indexes':
        return <IndexesConcept />;
      case 'transactions-acid':
        return <TransactionsAcidConcept />;
      case 'sql-vs-nosql':
        return <SqlVsNosqlConcept />;
      case 'nosql-types':
        return <NosqlTypesConcept />;
      case 'choosing':
        return <ChoosingDatabaseConcept />;
      case 'backups':
        return <BackupsConcept />;
      case 'security':
        return <SecurityConcept />;
      case 'scaling':
        return <ScalingConcept />;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/skills/databases?concept=${value}`);
    setSelectedConcept(value);
  };

  return (
    <PageWrapper
      pageTitle={'Databases'}
      navItems={navItems}
      defaultOpen={[]}
      handleSelect={handleSelect}
      activeValue={selectedConcept || undefined}
    >
      {selectedConcept ? (
        <>{renderContent(selectedConcept)}</>
      ) : (
        <div className="empty-page-prompt">
          Please select a topic from the sidebar to get started.
        </div>
      )}
    </PageWrapper>
  );
}
