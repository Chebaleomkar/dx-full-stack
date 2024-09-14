"use client"

import { Breadcrumbs } from '@/components/breadcrumbs';
import { TeacherClient } from '@/components/tables/teacher-table/TeacherClient';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Teachers', link: '/dashboard/teacher' }
];

export default function Page() {

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <TeacherClient />
      </div>
    </>
  );
}
