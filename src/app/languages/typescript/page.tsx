import { Suspense } from 'react';
import TypeScriptPage from '../../../../components/pageComponents/TypeScriptPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TypeScriptPage />
    </Suspense>
  );
}
