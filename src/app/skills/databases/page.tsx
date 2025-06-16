import { Suspense } from 'react';
import Loader from '@/components/common/Loader';
import DatabasesPage from '@/components/pageComponents/Databases/DatabasesPage';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <DatabasesPage />
    </Suspense>
  );
}