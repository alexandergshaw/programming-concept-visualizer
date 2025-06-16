import ProgrammingBasicsPage from '@/components/pageComponents/ProgrammingBasics/ProgrammingBasicsPage';
import { Suspense } from 'react';
import Loader from '@/components/common/Loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <ProgrammingBasicsPage />
    </Suspense>
  );
}