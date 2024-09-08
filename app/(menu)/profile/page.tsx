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

const metadata = {
  title: "DisciplineX : Profile",
  description: "Profile of DisciplineX users",
};

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
  const [institutionId, setInstitutionId] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [institutionData, setInstitutionData] = useState<Institution | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const cachedUserData = localStorage.getItem("userData");
        const cachedInstitutionData = localStorage.getItem("institutionData");

        if (cachedUserData) {
          setUserData(JSON.parse(cachedUserData));
        }

        if (cachedInstitutionData) {
          setInstitutionData(JSON.parse(cachedInstitutionData));
        }

        if (!cachedUserData && userId) {
          let userResponse;
          if (role === "Student") {
            userResponse = await axios.get(
              `${BASE_URL}/student/${userId}`
              // {headers,}
            );
          } else {
            userResponse = await axios.get(
              `${BASE_URL}/user/${userId}`
              // {headers,}
            );
          }

          const user = userResponse.data;
          setUserData(user);
          localStorage.setItem("userData", JSON.stringify(user));

          if (user.institution) {
            setInstitutionId(user.institution);
          }
        }

        if (!cachedInstitutionData && institutionId) {
          const institutionResponse = await axios.get(
            `${BASE_URL}/institution/${institutionId}`
            // { headers }
          );
          const institution = institutionResponse.data;
          setInstitutionData(institution);

          localStorage.setItem("institutionData", JSON.stringify(institution));
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, institutionId, role]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("dxToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("institutionData");
      sessionStorage.clear();
      logout();
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen  p-6">
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
  return (
    <ProtectedRoute
      allowedRoles={["Student", "Admin", "HeadAdmin", "SuperAdmin"]}
    >
      {role === "Student" && (
        <div className="container mx-auto p-6 rounded-xl shadow-md dark:border-white border border-black">
          {loading ? (
            <Loader />
          ) : (
            <StudentProfile
              userData={userData}
              institutionData={institutionData}
              handleLogout={handleLogout}
            />
          )}
        </div>
      )}

      {role === "Admin" && (
        <div className="container mx-auto p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {role} Profile
          </h1>
          {loading ? (
            <Loader />
          ) : (
            <AdminProfile
              userData={userData}
              institutionData={institutionData}
              handleLogout={handleLogout}
            />
          )}
        </div>
      )}
      {role === "HeadAdmin" && (
        <div className="container mx-auto p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {role} Profile
          </h1>
          {loading ? (
            <Loader />
          ) : (
            <HeadAdminProfile
              userData={userData}
              institutionData={institutionData}
              handleLogout={handleLogout}
            />
          )}
        </div>
      )}
      {role === "SuperAdmin" && (
        <div className="container mx-auto p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            {role} Profile
          </h1>
          {loading ? (
            <Loader />
          ) : (
            <>
              <SuperAdminProfile
                userData={userData}
                handleLogout={handleLogout}
              />
            </>
          )}
        </div>
      )}
    </ProtectedRoute>
  );
}
