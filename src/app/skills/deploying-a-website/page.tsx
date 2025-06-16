import { Suspense } from 'react';
import DeployingPage from '@/components/pageComponents/DeployingPage/DeployingPage';
import Loader from '@/components/common/Loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <DeployingPage />
    </Suspense>
  );
}