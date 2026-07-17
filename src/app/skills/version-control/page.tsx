import { Suspense } from 'react';
import Loader from '@/components/common/Loader';
import VersionControlPage from '@/components/pageComponents/VersionControl/VersionControlPage';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <VersionControlPage />
    </Suspense>
  );
}
