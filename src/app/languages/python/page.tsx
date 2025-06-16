import PythonPage from '@/components/pageComponents/Python/PythonPage';
import { Suspense } from 'react';
import Loader from '@/components/common/Loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <PythonPage />
    </Suspense>
  );
}
