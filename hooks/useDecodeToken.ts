import { useState, useEffect } from "react";
import { getToken } from "@/utils/getToken";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  id: number;
  role: string;
}

const useDecodeToken = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(token);
        setUserId(decodedToken.id);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return { userId, role };
};

export default useDecodeToken;
