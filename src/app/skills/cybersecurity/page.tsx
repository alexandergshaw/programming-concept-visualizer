import { Suspense } from 'react';
import Loader from '@/components/common/Loader';
import CybersecurityPage from '@/components/pageComponents/Cybersecurity/CybersecurityPage';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <CybersecurityPage />
    </Suspense>
  );
}