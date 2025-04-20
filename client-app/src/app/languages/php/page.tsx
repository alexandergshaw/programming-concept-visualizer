import { Suspense } from 'react';
import PhpPage from '../../../../components/languages/PhpPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PhpPage />
    </Suspense>
  );
}
