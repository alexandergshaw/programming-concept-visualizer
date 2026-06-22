// Sidebar navigation data for every topic page, in one component-free module.
//
// Each topic page imports its own array from here (instead of defining it
// inline), and the landing-page search index (components/landing/conceptIndex.ts)
// imports all of them to build a searchable list of every concept. Keeping this
// as pure data — no `'use client'`, no component imports — means the landing
// bundle can read the concept list without pulling in any page's component code.
//
// `value` is the `?concept=` query value the matching page switches on; group
// nodes carry a `value` too, but only leaf nodes map to real concept pages.

import type { SidebarItem } from '@/components/common/Sidebar';

export const programmingBasicsNavItems: SidebarItem[] = [
  {
    label: 'How Computers Run Programs',
    value: 'how-computers-run-programs',
    children: [
      { label: 'Introduction', value: 'introduction-computers-run-programs' },
      { label: 'Interpreters & Compilers', value: 'compilers-interpreters' },
      { label: 'Hardware', value: 'hardware' },
      { label: 'Data', value: 'memory' },
    ],
  },
  {
    label: 'How We Design Programs',
    value: 'how-we-design-programs',
    children: [{ label: 'Big O Notation', value: 'big-o-notation' }],
  },
  {
    label: 'Data Structures',
    value: 'data-structures',
    children: [
      { label: 'Stacks', value: 'stacks' },
      { label: 'Queues', value: 'queues' },
      { label: 'Trees', value: 'trees' },
    ],
  },
  {
    label: 'Algorithms',
    value: 'algorithms',
    children: [
      { label: 'Algorithm Analysis & Design', value: 'algorithm-analysis' },
      { label: 'Recursion', value: 'recursion-viz' },
      { label: 'Searching', value: 'searching' },
      { label: 'Sorting', value: 'sorting' },
    ],
  },
];

export const pythonNavItems: SidebarItem[] = [
  {
    label: 'Turtle Graphics',
    value: 'turtle-graphics',
    children: [
      { label: 'Meet the Turtle', value: 'turtle-intro' },
      { label: 'Moving & Turning', value: 'turtle-moving' },
      { label: 'The Pen', value: 'turtle-pen' },
      { label: 'Drawing Shapes with Loops', value: 'turtle-shapes' },
    ],
  },
  {
    label: 'Storing Data',
    value: 'storing data',
    children: [
      { label: 'Variables', value: 'variables' },
      { label: 'Numeric Expressions', value: 'numeric-expressions' },
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
      { label: 'Accumulator Pattern', value: 'accumulator-pattern' },
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
      { label: 'Function Basics', value: 'function-basics' },
      { label: 'Recursion', value: 'recursion' },
    ],
  },
  {
    label: 'Code Organization',
    value: 'code-organization',
    children: [
      { label: 'Modules', value: 'modules' },
      { label: 'The math Library', value: 'math-library' },
    ],
  },
  {
    label: 'Object-Oriented Programming',
    value: 'oop',
    children: [
      { label: 'Classes & Objects', value: 'classes-objects' },
      { label: 'Attributes & Methods', value: 'attributes-methods' },
      { label: 'Inheritance', value: 'inheritance' },
      { label: 'Encapsulation', value: 'encapsulation' },
      { label: 'Polymorphism', value: 'polymorphism' },
      { label: 'Abstraction', value: 'abstraction' },
    ],
  },
];

export const javascriptNavItems: SidebarItem[] = [
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
    ],
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
];

export const reactNavItems: SidebarItem[] = [
  {
    label: 'Getting Started',
    value: 'getting started',
    children: [
      { label: 'React App Architecture', value: 'react-architecture' },
      { label: 'Components Basics', value: 'component-basics' },
      { label: 'JSX Syntax', value: 'jsx-syntax' },
    ],
  },
  {
    label: 'Core Concepts',
    value: 'core concepts',
    children: [
      { label: 'Props', value: 'props' },
      { label: 'State', value: 'state' },
      { label: 'Event Handling', value: 'event-handling' },
    ],
  },
  {
    label: 'React Hooks',
    value: 'react hooks',
    children: [
      { label: 'useState & useEffect', value: 'hooks-basics' },
      { label: 'useContext', value: 'use-context' },
      { label: 'Custom Hooks', value: 'custom-hooks' },
    ],
  },
  {
    label: 'Advanced Topics',
    value: 'advanced topics',
    children: [
      { label: 'Conditional Rendering', value: 'conditional-rendering' },
      { label: 'Lists & Keys', value: 'lists-keys' },
      { label: 'Forms', value: 'forms' },
    ],
  },
];

export const sqlNavItems: SidebarItem[] = [
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

export const databasesNavItems: SidebarItem[] = [
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

export const cybersecurityNavItems: SidebarItem[] = [
  {
    label: 'Foundations',
    value: 'foundations',
    children: [
      { label: 'Introduction', value: 'introduction' },
      { label: 'What is Ethical Hacking?', value: 'ethical-hacking' },
      { label: 'Phases of a Hack', value: 'hacking-phases' },
    ],
  },
  {
    label: 'Attacks & Techniques',
    value: 'attacks-and-techniques',
    children: [
      { label: 'Footprinting & Recon', value: 'footprinting' },
      { label: 'Scanning & Enumeration', value: 'scanning' },
      { label: 'Vulnerability Assessment', value: 'vulnerability-assessment' },
      { label: 'Social Engineering', value: 'social-engineering' },
      { label: 'Web App Attacks', value: 'web-attacks' },
      { label: 'Authentication Security', value: 'authentication-security' },
    ],
  },
  {
    label: 'Systems & Threats',
    value: 'systems-and-threats',
    children: [
      { label: 'Networks & Communication', value: 'networks' },
      { label: 'System Architecture', value: 'system-architecture' },
      { label: 'Malware', value: 'malware' },
      { label: 'Wireless Security', value: 'wireless-security' },
    ],
  },
  {
    label: 'Protecting Data',
    value: 'protecting-data',
    children: [
      { label: 'Cryptography', value: 'cryptography' },
      { label: 'Cryptography on the Web', value: 'web-security' },
    ],
  },
];

export const softwareTestingNavItems: SidebarItem[] = [
  {
    label: 'Types of Testing',
    value: 'types of testing',
    children: [
      { label: 'User Acceptance Testing', value: 'user-acceptance-testing' },
      { label: 'Operation Testing', value: 'operation-testing' },
    ],
  },
];

export const websiteManagementNavItems: SidebarItem[] = [
  {
    label: 'Getting Started',
    value: 'getting-started',
    children: [
      { label: 'Introduction', value: 'introduction' },
      { label: 'Website Basics', value: 'website-basics' },
    ],
  },
  {
    label: 'Content Management',
    value: 'content-management',
    children: [
      { label: 'What is a CMS?', value: 'cms-components' },
      { label: 'Advantages of a CMS', value: 'cms-intro' },
    ],
  },
];

export const projectManagementNavItems: SidebarItem[] = [
  {
    label: 'Getting Started',
    value: 'getting-started',
    children: [
      { label: 'Introduction', value: 'introduction' },
      { label: 'Project Lifecycle', value: 'project-lifecycle' },
    ],
  },
  {
    label: 'Ways of Working',
    value: 'ways-of-working',
    children: [
      { label: 'Agile vs Waterfall', value: 'methodologies' },
      { label: 'Scrum & the Board', value: 'scrum' },
      { label: 'Kanban', value: 'kanban' },
    ],
  },
  {
    label: 'Delivering the Work',
    value: 'delivering-the-work',
    children: [
      { label: 'Estimation & Planning', value: 'estimation' },
      { label: 'Risk Management', value: 'risk-management' },
      { label: 'Stakeholder Management', value: 'stakeholders' },
    ],
  },
];
