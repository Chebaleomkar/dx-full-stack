"use client"
import React, {  useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/navigation";
import useDecodeToken from "@/hooks/useDecodeToken";
import useAuthStore from "@/store/useAuthStore";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { Institution } from "@/types/Institution";
import useUser from "@/hooks/useUser";
import useInstitution from "@/hooks/useInstitution";
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
  const { logout } = useAuthStore();
  const router = useRouter();
  const { userData, loading: userLoading } = useUser();


  if (userLoading || !userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <Loader />
        <Button
          onClick={() => {
            router.push("/login");
            localStorage.removeItem("dxToken");
            localStorage.removeItem("userData");
            localStorage.removeItem("institutionData");
          }}
          className="bg-orange-600 text-white hover:bg-orange-700 transition-colors py-2 px-6 rounded-lg shadow-md"
        >
          Go to Login
        </Button>
      </div>
    );
  }

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
      <div className="container mx-auto p-6 rounded-sm shadow-md dark:border-white border border-black">
        {userLoading ? <Loader /> : renderProfileComponent()}
      </div>
    </ProtectedRoute>
  );
}
