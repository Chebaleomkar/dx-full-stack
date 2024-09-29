"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { getToken } from "@/utils/getToken";
import UseDecodeToken from "./useDecodeToken";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { decryptData, encryptData } from "@/utils/encrypt-decrypt";

const useUser = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error , setError] = useState<any>();
  const {userId , role} = UseDecodeToken();
  const {logout} = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    logout();
    router.push("/login");
    location.reload();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
        const cachedUserData = sessionStorage.getItem("u");
        if (cachedUserData) {
          try {
            const decryptedUserData = decryptData(cachedUserData);
            setUserData(decryptedUserData);
          } catch (error:any) {
            console.error("Error decrypting user data:", error.message);
            setError("Failed to decrypt user data.");
          }
        }
  
        if (!cachedUserData && userId) {
          const userResponse = await axios.get(`${BASE_URL}/auth/me`, { headers });
          const fetchedUserData = userResponse.data.user;
          setUserData(fetchedUserData);
          const encryptUserData = encryptData(fetchedUserData);
          sessionStorage.setItem("u", encryptUserData);
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId && role) {
      fetchUserData();
    }
  }, [userId, role]);
  
  return { userData, loading,error, handleLogout };
};

export default useUser;
