import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { getToken } from "@/utils/getToken";
import UseDecodeToken from "./useDecodeToken";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

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

        const cachedUserData = sessionStorage.getItem("userData");
        if (cachedUserData) {
          const parsedUserData = JSON.parse(cachedUserData);
          setUserData(parsedUserData);
        }

        if (!cachedUserData && userId) {
          const userResponse = await axios.get(
            `${BASE_URL}/${role === "Student" ? "student" : "user"}/${userId}`,
            { headers }
          );
          const fetchedUserData = userResponse.data;
          setUserData(fetchedUserData);
          sessionStorage.setItem("userData", JSON.stringify(fetchedUserData));
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error.message);
        setError(error.message)
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
