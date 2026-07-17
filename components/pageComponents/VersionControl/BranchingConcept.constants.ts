export interface BranchCommit {
  id: number;
  hash: string;
  message: string;
}

export interface Branch {
  name: string;
  commits: BranchCommit[];
  color: string;
}

export const MAIN_BRANCH: Branch = {
  name: 'main',
  commits: [
    { id: 1, hash: 'A1B2C3', message: 'Initial commit' },
    { id: 2, hash: 'D4E5F6', message: 'Add database' },
    { id: 3, hash: 'G7H8I9', message: 'Update API' },
  ],
  color: 'var(--info)',
};

export const FEATURE_BRANCH: Branch = {
  name: 'feature/dark-mode',
  commits: [
    { id: 3, hash: 'G7H8I9', message: 'Update API' },
    { id: 4, hash: 'J1K2L3', message: 'Add dark mode toggle' },
    { id: 5, hash: 'M4N5O6', message: 'Style dark theme' },
  ],
  color: 'var(--feature)',
};
