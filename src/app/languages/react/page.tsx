import ReactPage from '@/components/pageComponents/React/ReactPage';
import { Suspense } from 'react';
import Loader from '@/components/common/Loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <ReactPage />
    </Suspense>
  );
}