'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PageWrapper from '../common/PageWrapper';

import WhatIsSqlConcept from './SQL/WhatIsSqlConcept';
import DatabasesTablesConcept from './SQL/DatabasesTablesConcept';
import DataTypesConcept from './SQL/DataTypesConcept';
import SelectConcept from './SQL/SelectConcept';
import WhereConcept from './SQL/WhereConcept';
import OrderByConcept from './SQL/OrderByConcept';
import LimitConcept from './SQL/LimitConcept';
import DistinctConcept from './SQL/DistinctConcept';
import AliasesConcept from './SQL/AliasesConcept';
import OperatorsConcept from './SQL/OperatorsConcept';
import InBetweenLikeConcept from './SQL/InBetweenLikeConcept';
import NullConcept from './SQL/NullConcept';
import AggregateFunctionsConcept from './SQL/AggregateFunctionsConcept';
import GroupByConcept from './SQL/GroupByConcept';
import HavingConcept from './SQL/HavingConcept';
import KeysConcept from './SQL/KeysConcept';
import InnerJoinConcept from './SQL/InnerJoinConcept';
import OuterJoinsConcept from './SQL/OuterJoinsConcept';
import UnionConcept from './SQL/UnionConcept';
import SubqueriesConcept from './SQL/SubqueriesConcept';
import CteConcept from './SQL/CteConcept';
import InsertConcept from './SQL/InsertConcept';
import UpdateConcept from './SQL/UpdateConcept';
import DeleteConcept from './SQL/DeleteConcept';
import TransactionsConcept from './SQL/TransactionsConcept';
import CreateTableConcept from './SQL/CreateTableConcept';
import ConstraintsConcept from './SQL/ConstraintsConcept';
import IndexesConcept from './SQL/IndexesConcept';
import ViewsConcept from './SQL/ViewsConcept';

const navItems = [
  {
    label: 'Getting Started',
    value: 'getting-started',
    children: [
      { label: 'What Is SQL?', value: 'what-is-sql' },
      { label: 'Databases & Tables', value: 'databases-tables' },
      { label: 'Data Types', value: 'data-types' },
    ],
  },
  {
    label: 'Reading Data',
    value: 'reading-data',
    children: [
      { label: 'SELECT & FROM', value: 'select' },
      { label: 'WHERE', value: 'where' },
      { label: 'ORDER BY', value: 'order-by' },
      { label: 'LIMIT & OFFSET', value: 'limit' },
      { label: 'DISTINCT', value: 'distinct' },
      { label: 'Aliases (AS)', value: 'aliases' },
    ],
  },
  {
    label: 'Filtering',
    value: 'filtering',
    children: [
      { label: 'Operators (AND/OR/NOT)', value: 'operators' },
      { label: 'IN, BETWEEN, LIKE', value: 'in-between-like' },
      { label: 'Working with NULL', value: 'null' },
    ],
  },
  {
    label: 'Aggregation',
    value: 'aggregation',
    children: [
      { label: 'Aggregate Functions', value: 'aggregate-functions' },
      { label: 'GROUP BY', value: 'group-by' },
      { label: 'HAVING', value: 'having' },
    ],
  },
  {
    label: 'Joining Tables',
    value: 'joins',
    children: [
      { label: 'Keys & Relationships', value: 'keys' },
      { label: 'INNER JOIN', value: 'inner-join' },
      { label: 'LEFT & RIGHT JOIN', value: 'outer-joins' },
      { label: 'UNION', value: 'union' },
    ],
  },
  {
    label: 'Subqueries & CTEs',
    value: 'subqueries-ctes',
    children: [
      { label: 'Subqueries', value: 'subqueries' },
      { label: 'Common Table Expressions', value: 'cte' },
    ],
  },
  {
    label: 'Changing Data',
    value: 'changing-data',
    children: [
      { label: 'INSERT', value: 'insert' },
      { label: 'UPDATE', value: 'update' },
      { label: 'DELETE', value: 'delete' },
      { label: 'Transactions', value: 'transactions' },
    ],
  },
  {
    label: 'Schema & Performance',
    value: 'schema',
    children: [
      { label: 'CREATE TABLE', value: 'create-table' },
      { label: 'Constraints', value: 'constraints' },
      { label: 'Indexes', value: 'indexes' },
      { label: 'Views', value: 'views' },
    ],
  },
];

export default function SqlPage() {
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
      case 'what-is-sql':
        return <WhatIsSqlConcept />;
      case 'databases-tables':
        return <DatabasesTablesConcept />;
      case 'data-types':
        return <DataTypesConcept />;
      case 'select':
        return <SelectConcept />;
      case 'where':
        return <WhereConcept />;
      case 'order-by':
        return <OrderByConcept />;
      case 'limit':
        return <LimitConcept />;
      case 'distinct':
        return <DistinctConcept />;
      case 'aliases':
        return <AliasesConcept />;
      case 'operators':
        return <OperatorsConcept />;
      case 'in-between-like':
        return <InBetweenLikeConcept />;
      case 'null':
        return <NullConcept />;
      case 'aggregate-functions':
        return <AggregateFunctionsConcept />;
      case 'group-by':
        return <GroupByConcept />;
      case 'having':
        return <HavingConcept />;
      case 'keys':
        return <KeysConcept />;
      case 'inner-join':
        return <InnerJoinConcept />;
      case 'outer-joins':
        return <OuterJoinsConcept />;
      case 'union':
        return <UnionConcept />;
      case 'subqueries':
        return <SubqueriesConcept />;
      case 'cte':
        return <CteConcept />;
      case 'insert':
        return <InsertConcept />;
      case 'update':
        return <UpdateConcept />;
      case 'delete':
        return <DeleteConcept />;
      case 'transactions':
        return <TransactionsConcept />;
      case 'create-table':
        return <CreateTableConcept />;
      case 'constraints':
        return <ConstraintsConcept />;
      case 'indexes':
        return <IndexesConcept />;
      case 'views':
        return <ViewsConcept />;
      default:
        return null;
    }
  };

  const handleSelect = (value: string) => {
    router.push(`/languages/sql?concept=${value}`);
    setSelectedConcept(value);
  };

  return (
    <PageWrapper
      pageTitle={'SQL Visualizer'}
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
