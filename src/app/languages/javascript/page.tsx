import JavaScriptPage from '@/components/pageComponents/JavaScript/JavaScriptPage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JavaScriptPage />
    </Suspense>
  );
}
