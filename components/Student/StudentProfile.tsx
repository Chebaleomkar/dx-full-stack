import React from "react";
import StudentFinesTable from "@/components/StudentFinesTable";
import ProtectedRoute from "../ProtectedRoute";
import { ScrollArea } from "../ui/scroll-area";
import { User } from "@/types/User";
import { Institution } from "@/types/Institution";
import Profile from "../shared/Profile";




const StudentProfile = ({userData,institutionData,handleLogout}:{userData:User , institutionData:Institution |null, handleLogout : ()=>void }) => {
  return (
    <ProtectedRoute allowedRoles={["Student"]}>
      {userData && (
        <Profile userData={userData} institutionData={institutionData} handleLogout={handleLogout} />
      )}

      {/* Fines Table */}
      <ScrollArea className="h-screen p-4 border mt-5">
        <StudentFinesTable />
      </ScrollArea>
    </ProtectedRoute>
  );
};

export default StudentProfile;
