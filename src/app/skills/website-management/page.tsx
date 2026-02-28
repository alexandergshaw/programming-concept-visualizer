import { Suspense } from 'react';
import Loader from '@/components/common/Loader';
import WebsiteManagementPage from '@/components/pageComponents/WebsiteManagement/WebsiteManagementPage';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <WebsiteManagementPage />
    </Suspense>
  );
}
