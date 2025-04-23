import SoftwareTestingPage from '@/components/pageComponents/SoftwareTesting/SoftwareTestingPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SoftwareTestingPage/>
    </Suspense>
  );
}
