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
import { databasesNavItems as navItems } from '../navItems';

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
