"use client"
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import useDecodeToken from "./useDecodeToken";
import { getToken } from "@/utils/getToken";

const useAuthCheck = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const { role } = useDecodeToken();
  
  useEffect(() => { 
    const token = getToken();
    if (token) {
      if (role) {
        login(role);
      } 
    } else {
      logout();
    }
  }, [login, logout, role]);
};

export default useAuthCheck;
