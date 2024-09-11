"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import useDecodeToken from "@/hooks/useDecodeToken";
import Loader from "@/components/Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const router = useRouter();
  const { isAuthenticated, login, role } = useAuthStore();
  const { role: decodedRole } = useDecodeToken();

  useEffect(() => {
    if (decodedRole) {
      login(decodedRole); // Automatically log the user in with decoded token role
    }
  }, [decodedRole, login]);

  useEffect(() => {
    // Redirect to login if user is not authenticated or role is not allowed
    if (!isAuthenticated || (role && !allowedRoles.includes(role))) {
      router.replace("/login");
    }
  }, [isAuthenticated, role, allowedRoles, router]);

  if (!isAuthenticated || (role && !allowedRoles.includes(role))) {
    return <Loader />; 
  }

  return children;
};

export default ProtectedRoute;
