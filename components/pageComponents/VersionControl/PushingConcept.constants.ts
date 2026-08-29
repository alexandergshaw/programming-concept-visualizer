export interface Commit {
  hash: string;
  message: string;
}

export const INITIAL_COMMITS: Commit[] = [
  { hash: 'A1B2C3', message: 'Initial project setup' },
  { hash: 'D4E5F6', message: 'Add main features' },
];
