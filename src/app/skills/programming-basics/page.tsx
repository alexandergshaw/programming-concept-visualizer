import ProgrammingBasicsPage from '@/components/pageComponents/ProgrammingBasics/ProgrammingBasicsPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProgrammingBasicsPage />
    </Suspense>
  );
}