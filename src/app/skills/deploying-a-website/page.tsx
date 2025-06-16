import { Suspense } from 'react';
import DeployingPage from '@/components/pageComponents/DeployingPage/DeployingPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeployingPage />
    </Suspense>
  );
}