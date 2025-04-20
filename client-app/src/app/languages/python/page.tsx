import { Suspense } from 'react';
import PythonPage from '../../../../components/languages/PythonPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PythonPage />
    </Suspense>
  );
}
