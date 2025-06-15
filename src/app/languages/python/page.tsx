import PythonPage from '@/components/pageComponents/Python/PythonPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PythonPage />
    </Suspense>
  );
}
