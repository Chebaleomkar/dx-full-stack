"use client"

import { Breadcrumbs } from '@/components/breadcrumbs';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import TeacherList from "@/components/HeadAdmin/TeacherList";
import { useEffect, useState } from 'react';
import { getInstitutionId } from '@/utils/getInstitutionId';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Employee', link: '/dashboard/employee' }
];

export default function Page() {
  const [institutionId, setInstitutionId] = useState(null);

  useEffect(() => {
    const id = getInstitutionId();
    setInstitutionId(id);
    console.log(id); // Outputs: "669fdf26a41b78eeab0d003f"
  }, []);

  // Render the component only when institutionId is available
  if (!institutionId) return null;

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex items-start justify-between">
        <Heading title={`Teachers dashboard`} description="Manage Teachers" />

        <Link
          href={"/sheild"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Add teacher
        </Link>
      </div>
      <Separator />
      <TeacherList institutionId={institutionId} />
    </div>
  );
}
