"use client";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import useDecodeToken from "@/hooks/useDecodeToken";
import Loader from "@/components/Loader";
import { getToken } from "@/utils/getToken";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Institution } from "../../../types/Institution";

// Lazy-load role-based profile components
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
  const { userId, role } = useDecodeToken();
  const [userData, setUserData] = useState<any>(null);
  const [institutionData, setInstitutionData] = useState<Institution | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const { logout } = useAuthStore();
  const router = useRouter();

  // Fetch user data and institution data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // First check if user data is already cached
        const cachedUserData = localStorage.getItem("userData");
        if (cachedUserData) {
          const parsedUserData = JSON.parse(cachedUserData);
          setUserData(parsedUserData);

          // Fetch institution data if user data has institution id
          if (parsedUserData.institution) {
            await fetchInstitutionData(parsedUserData.institution);
          }
        }

        // Fetch user data if not cached
        if (!cachedUserData && userId) {
          const userResponse = await axios.get(
            `${BASE_URL}/${role === "Student" ? "student" : "user"}/${userId}`,
            { headers }
          );
          const fetchedUserData = userResponse.data;
          setUserData(fetchedUserData);
          localStorage.setItem("userData", JSON.stringify(fetchedUserData));

          // Fetch institution data if user has institution id
          if (fetchedUserData.institution) {
            await fetchInstitutionData(fetchedUserData.institution);
          }
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch institution data
    const fetchInstitutionData = async (institutionId: string) => {
      try {
        const institutionResponse = await axios.get(
          `${BASE_URL}/institution/${institutionId}`
        );
        const fetchedInstitutionData = institutionResponse.data;
        setInstitutionData(fetchedInstitutionData);
        localStorage.setItem(
          "institutionData",
          JSON.stringify(fetchedInstitutionData)
        );
      } catch (error: any) {
        console.log("Error fetching institution data:", error.message);
      }
    };

    fetchUserData();
  }, [userId, role]);

  const handleLogout = () => {
    localStorage.removeItem("dxToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("institutionData");
    sessionStorage.clear();
    logout();
    router.push("/");
  };

  // If loading or no user data is available, show a loading state
  if (loading || !userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-6">
        <Loader />
        <Button
          onClick={() => router.push("/login")}
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
          <StudentProfile
            userData={userData}
            institutionData={institutionData}
            handleLogout={handleLogout}
          />
        );
      case "Admin":
        return (
          <AdminProfile
            userData={userData}
            institutionData={institutionData}
            handleLogout={handleLogout}
          />
        );
      case "HeadAdmin":
        return (
          <HeadAdminProfile
            userData={userData}
            institutionData={institutionData}
            handleLogout={handleLogout}
          />
        );
      case "SuperAdmin":
        return (
          <SuperAdminProfile userData={userData} handleLogout={handleLogout} />
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute
      allowedRoles={["Student", "Admin", "HeadAdmin", "SuperAdmin"]}
    >
      <div className="container mx-auto p-6 rounded-xl shadow-md dark:border-white border border-black">
        {loading ? <Loader /> : renderProfileComponent()}
      </div>
    </ProtectedRoute>
  );
}
