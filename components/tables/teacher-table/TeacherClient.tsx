// 'use client';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { TeacherColumns } from './Teacher-columns';
import Loader from "@/components/Loader";
import useGetData from "@/hooks/useGetData";
import { getInstitutionId } from '@/utils/getInstitutionId';
import { getToken } from "@/utils/getToken";
import { User } from '@/types/User';


export const TeacherClient = () => {
  const institutionId = getInstitutionId();
  const { data, loading, error } = useGetData<User[] | null>(`/user/institution/${institutionId}`);

  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};


  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>; 

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Teachers (${data?.length || 0})`}
          description="Manage Teachers Here"
        />
      </div>
      <Separator />
      <DataTable searchKey="name" columns={TeacherColumns} data={data || []} />
    </>
  );
};
