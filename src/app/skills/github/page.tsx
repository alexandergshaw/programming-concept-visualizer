import { Suspense } from 'react';
import GitHubPage from '@/components/pageComponents/GitHub/GitHubPage';
import Loader from '@/components/common/Loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <GitHubPage />
    </Suspense>
  );
}