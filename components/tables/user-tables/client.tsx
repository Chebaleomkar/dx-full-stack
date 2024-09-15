// 'use client';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { columns } from './columns';
import Loader from "@/components/Loader";
import useGetData from "@/hooks/useGetData";
import { Student } from "@/types/student";
import { getInstitutionId } from '@/utils/getInstitutionId';
import { getToken } from "@/utils/getToken";


export const UserClient = () => {
  const institutionId = getInstitutionId();
  const { data, loading, error } = useGetData<Student[] | null>(`/student/institution/${institutionId}`);

  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>; 

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Students (${data?.length || 0})`}
          description="Manage Students Here"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data || []} />
    </>
  );
};
