import { Suspense } from 'react';
import HtmlPage from '../../../../components/languages/HtmlPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HtmlPage />
    </Suspense>
  );
}
