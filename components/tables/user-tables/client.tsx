'use client';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { columns } from './columns';
import AlertForm from '@/components/forms/AlertForm';
import {useState} from 'react'
import { User } from '@/components/superadmin/UserList';
import Loader from "@/components/Loader";
import useGetData from "@/hooks/useGetData";
import { Student } from "@/types/student";
import { getInstitutionId } from '@/utils/getInstitutionId';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { BASE_URL } from '@/constant';
import { getToken } from "@/utils/getToken";

interface ProductsClientProps {
  data: User[];
}

export const UserClient: React.FC<ProductsClientProps> = () => {
  const [showAlertForm, setShowAlertForm] = useState(false);
  const institutionId = getInstitutionId();
  const { data, loading, error } = useGetData<Student | null>(`/student/institution/${institutionId}`);
  const router = useRouter();
  const {toast} = useToast();
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const handleAddNewClick = () => {
    setShowAlertForm(true);
  };

  const handleCloseAlert = () => {
    setShowAlertForm(false);
  };

  const handleUpdateStudent = async(formData: any) => {
    try{
      const newStudent = { ...formData, institution : institutionId };
      await axios.post(`${BASE_URL}/student`, newStudent , {headers});
      console.log("Form submitted:", newStudent);
      setShowAlertForm(false);
    }catch(error:any){
      const errorMessage =error.response?.data?.message ||"Server is not accepting the request";
      console.error("Error adding fine:", errorMessage);
      toast({
        title: "Error in taking Action",
        description: errorMessage,
      });
    }
  };
  const studentData = {
    course: "BCA-III",
    email: "janvisude@gmail.com",
    imageUrl:
      "https://cdn.pixabay.com/photo/2016/04/04/15/30/girl-1307428_640.jpg",
    institution: "669fdf26a41b78eeab0d003f",
    mobileNumber: "0123456789",
    name: "janvi sude",
    reputation: "0",
    streak: "0",
    studentId: "2200060",
    dateOfBirth: new Date("2002-05-15"),
  };


  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>; 

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Students (${data.length})`}
          description="Manage students here"
        />
        <Button className="text-xs md:text-sm" onClick={handleAddNewClick}>
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />

      {showAlertForm && (
        <AlertForm
          defaultData={studentData}
          isAdd={true}
          onClose={handleCloseAlert}
          onSubmit={handleUpdateStudent}
          formType="Student"
        />
      )}
    </>
  );
};
