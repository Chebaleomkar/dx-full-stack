"use client"
import React from "react";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/ProtectedRoute";
import UseDecodeToken from "@/hooks/useDecodeToken";

const StudentProfile = React.lazy(
  () => import("@/components/Student/StudentProfile")
);
const AdminProfile = React.lazy(
  () => import("@/components/Admin/AdminProfile")
);
const HeadAdminProfile = React.lazy(
  () => import("@/components/HeadAdmin/HeadAdminProfile")
);
const SuperAdminProfile = React.lazy(
  () => import("@/components/superadmin/SuperAdminProfile")
);


export default function Profile() {
  const {role} = UseDecodeToken();
  // Render based on user role
  const renderProfileComponent = () => {
    switch (role) {
      case "Student":
        return (
          <StudentProfile />
        );
      case "Admin":
        return (
          <AdminProfile />
        );
      case "HeadAdmin":
        return (
          <HeadAdminProfile/>
        );
      case "SuperAdmin":
        return (
          <SuperAdminProfile />
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute
      allowedRoles={["Student", "Admin", "HeadAdmin", "SuperAdmin"]}
    >
      <div style={{borderTop : "none"}} className="container mx-auto p-6 rounded-sm shadow-md dark:border-white border border-black mt-1">
        {renderProfileComponent()}
      </div>
    </ProtectedRoute>
  );
}
