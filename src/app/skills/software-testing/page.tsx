import SoftwareTestingPage from '@/components/pageComponents/SoftwareTesting/SoftwareTestingPage';
import { Suspense } from 'react';
import Loader from '@/components/common/Loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <SoftwareTestingPage/>
    </Suspense>
  );
}
