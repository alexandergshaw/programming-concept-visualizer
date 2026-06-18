import { Suspense } from 'react';
import Loader from '@/components/common/Loader';
import ProjectManagementPage from '@/components/pageComponents/ProjectManagement/ProjectManagementPage';

export default function Page() {
  return (
    <Suspense fallback={<Loader/>}>
      <ProjectManagementPage />
    </Suspense>
  );
}
