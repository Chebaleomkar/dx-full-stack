"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useDecodeToken from "../hooks/useDecodeToken";
import Loader from "./Loader";

const PublicRoute = ({ children } : {children : React.ReactNode}) => {
  const router = useRouter();
  const { isAuthenticated, login,  } = useAuthStore();
  const { role: decodedRole } = useDecodeToken();

  useEffect(() => {
    if (decodedRole) {
      login(decodedRole);
    }
  }, [decodedRole, login]);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(`/profile`);
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <Loader />;
  }

  return children;
};

export default PublicRoute;
