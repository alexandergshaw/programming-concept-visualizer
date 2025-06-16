import JavaScriptPage from '@/components/pageComponents/JavaScript/JavaScriptPage';
import { Suspense } from 'react';
import Loader from '@/components/common/Loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <JavaScriptPage />
    </Suspense>
  );
}
