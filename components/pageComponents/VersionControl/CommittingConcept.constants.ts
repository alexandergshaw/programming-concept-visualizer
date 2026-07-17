export interface ChangedFile {
  id: string;
  name: string;
  status: 'modified' | 'new';
}

export const INITIAL_CHANGED_FILES: ChangedFile[] = [
  { id: '1', name: 'app.js', status: 'modified' },
  { id: '2', name: 'utils.js', status: 'modified' },
  { id: '3', name: 'config.json', status: 'new' },
];

export interface Commit {
  hash: string;
  message: string;
  timestamp: string;
}

export const generateCommitHash = (): string => {
  return Math.random().toString(16).substring(2, 9).toUpperCase();
};

export const getCurrentTimestamp = (): string => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};
