import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BASE_URL, LOGO } from "@/constant";
import Loader from "../Loader";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import AlertForm from "../forms/AlertForm";
import { Ellipsis } from "lucide-react";
import { getToken } from "@/utils/getToken";
import { string } from "zod";

// Define the Student type
export type Student = {
  _id?: string; // ID is optional because a new student won't have an ID yet
  name: string;
  email: string;
  studentId: string;
  course: string;
  mobileNumber: string;
  imageUrl?: string; // optional since it might not be uploaded yet
  reputation?: number;
  streak?: number;
  totalFine?: string;
};



const StudentList = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isAdding, setIsAdding] = useState(false); // New state for adding a student
  const [data, setData] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchData = async () => {
      const storedData = sessionStorage.getItem("studentData");

      if (storedData) {
        setData(JSON.parse(storedData));
        setLoading(false);
      } else {
        try {
          const response = await axios.get(`${BASE_URL}/student`, {
            headers,
          });
          const fetchedData: Student[] = response.data;
          setData(fetchedData);
          sessionStorage.setItem("studentData", JSON.stringify(fetchedData));
        } catch (error) {
          setError("Failed to fetch student data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  const handleAddStudent = () => {
    setIsAdding(true);
    setSelectedStudent(null); // Clear any selected student
    setShowAlert(true);
  };

  const handleUpdate = (student: Student) => {
    setSelectedStudent(student);
    setIsAdding(false); // Update mode, not add mode
    setShowAlert(true);
  };

  const handleDelete = async (student: Student) => {
    try {
      await axios.delete(`${BASE_URL}/student/${student._id}`, { headers });
      toast({ title: "Student deleted successfully" });
      sessionStorage.removeItem("studentData");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Failed to delete student",
        description: "Please try again later",
      });
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setSelectedStudent(null);
    setIsAdding(false); // Reset adding state
  };

  const handleUpdateStudent = async (updatedStudent: Student) => {
    try {
      if (isAdding) {
        await axios.post(`${BASE_URL}/student`, updatedStudent, { headers });
        toast({ title: "Student added successfully" });
      } else {
        await axios.put(
          `${BASE_URL}/student/${selectedStudent?._id}`,
          updatedStudent,
          { headers }
        );
        toast({
          title: "Student updated successfully",
          description: `Student ${selectedStudent?.name} updated`,
        });
      }
      sessionStorage.removeItem("studentData");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: `Failed to ${isAdding ? "add" : "update"} student`,
        description: "Please try again later",
      });
    }
    handleCloseAlert();
  };

  return (
    <div className="overflow-x-auto border dark:border-white border-black rounded-xl shadow-md">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-bold">Student List</h2>
        <Button onClick={handleAddStudent} >
          Add Student
        </Button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Student ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Course
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Mobile Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Total Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Reputation
            </th>
            <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data?.map((student: Student) => (
            <tr
              key={student._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <img
                  src={student.imageUrl || LOGO}
                  alt={student.name}
                  className="w-12 h-12 rounded-full"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                {student.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {student.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {student.studentId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {student.course}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {student.mobileNumber}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {student.totalFine}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                {student.reputation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Ellipsis className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleUpdate(student)}>
                      Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(student)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAlert && (
        <AlertForm
          defaultData={selectedStudent || ({} as Student)}
          isAdd={!selectedStudent}
          onClose={handleCloseAlert}
          onSubmit={handleUpdateStudent}
          formType="Student"
        />
      )}
    </div>
  );
};

export default StudentList;
