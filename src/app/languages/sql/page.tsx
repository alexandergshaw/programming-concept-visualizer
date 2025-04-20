import { Suspense } from 'react';
import SqlPage from '../../../../components/languages/SqlPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SqlPage />
    </Suspense>
  );
}
