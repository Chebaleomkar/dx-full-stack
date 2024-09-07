import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

const useAuthCheck = () => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const { isAuthenticated } = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem("dxToken");
    if (token) {
      login();
    } else {
      logout();
    }
  }, [login, logout]);
};

export default useAuthCheck;
