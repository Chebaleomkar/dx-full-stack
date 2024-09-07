'use client'
import { BASE_URL } from "@/constant";
import { Button } from "../ui/button";
import Image from "next/image";
import ProtectedRoute from "../ProtectedRoute";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import InstitutionList from "./InstitutionList";
import UserList from "./UserList";
import StudentList from "./StudentList";

const SuperAdminProfile = ({userData,handleLogout}: {userData: any;handleLogout: () => void}) => {

  const {toast} = useToast()
  const handleFineStatusConfirmed = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/fine/update-fine-status-confirmed`
      );
      toast({
        title: `fines updated successfully to confirmed `,
        description: `After 5 hours click on update unpaid status`,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Server is busy";
      console.error("Error adding fine:", errorMessage);
      toast({
        title: "Error in taking Action",
        description: errorMessage,
      });
    }
  };
  const handleFineStatusUnpaid = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/fine/update-fine-status-unpaid`
      );
      toast({
        title: `fines updated successfully to unpaid`,
        description: `come tomorrow to update`,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Server is busy";
      console.error("Error adding fine:", errorMessage);
      toast({
        title: "Error in taking Action",
        description: errorMessage,
      });
    }
  };

  return (
    <>
      <ProtectedRoute allowedRoles={["SuperAdmin"]}>
        {userData && (
          <div className="p-6 rounded-lg shadow-lg border dark:border-white border-white mb-3 dark:bg-gray-800">
            <div className="flex flex-col md:flex-row items-center mb-4">
              <div className="w-24 h-24 mb-4 md:mb-0">
                <Image
                  height={100}
                  width={100}
                  className="rounded-full border-2 border-blue-500"
                  src={
                    userData.imageUrl
                      ? userData.imageUrl
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt="User Image"
                />
              </div>
              <div className="ml-0 md:ml-6 text-center md:text-left">
                <h2 className="text-2xl font-semibold mb-1">{userData.name}</h2>
                <p>Email: {userData.email}</p>
                {userData.role && <p>Role: {userData.role}</p>}
              </div>
            </div>

            <div className="mt-4 flex max-sm:flex-col items-center justify-end gap-2">
              <Button
                className="mt-6 bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-center  flex-col space-y-4">
          <div className="w-full max-w-xs md:max-w-md gap-3">
            <Button
              onClick={handleFineStatusConfirmed}
              className="w-full p-4 text-lg font-medium text-center"
            >
              Status confirmed
            </Button>
            <Button
              onClick={handleFineStatusUnpaid}
              className="w-full p-4 text-lg font-medium text-center"
            >
              Status Unpaid
            </Button>
          </div>
        </div>

        <div>
          <Tabs defaultValue="account" className="w-full h-auto">
            <TabsList className="grid w-full grid-cols-3 bg-slate-300 text-black ">
              <TabsTrigger value="Institutions">Institutions</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>
            <TabsContent value="Institutions">
              <InstitutionList />
            </TabsContent>
            <TabsContent value="users">
              <UserList />
            </TabsContent>
            <TabsContent value="students">
              <StudentList />
            </TabsContent>
          </Tabs>
        </div>
      </ProtectedRoute>
    </>
  );
};

export default SuperAdminProfile
