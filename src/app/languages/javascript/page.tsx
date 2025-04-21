import { Suspense } from 'react';
import JavaScriptPage from '../../../../components/pageComponents/javaScript/JavaScriptPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JavaScriptPage />
    </Suspense>
  );
}
