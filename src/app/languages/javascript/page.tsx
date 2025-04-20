// app/languages/javascript/page.tsx or .jsx

import { Suspense } from 'react';
import JavaScriptPage from '../../../../components/languages/JavaScriptPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JavaScriptPage />
    </Suspense>
  );
}
