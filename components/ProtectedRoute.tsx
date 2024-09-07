"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useDecodeToken from "../hooks/useDecodeToken";
import Loader from "./Loader";

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
      login(decodedRole);
    }
  }, [decodedRole, login]);

  useEffect(() => {
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
