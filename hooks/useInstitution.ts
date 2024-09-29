"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { Institution } from "@/types/Institution";
import useUser from "./useUser";
import { getToken } from "@/utils/getToken";
import { encryptData, decryptData } from "@/utils/encrypt-decrypt";

const useInstitution = () => {
  const { userData, loading: userLoading, error: userError, handleLogout } = useUser();
  const [institutionData, setInstitutionData] = useState<Institution | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const institutionId = userData?.institution;
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchInstitutionData = async () => {
      setLoading(true);
      try {
        const cachedInstitutionData = sessionStorage.getItem("i");
        
        // Decrypting cached institution data
        if (cachedInstitutionData) {
          try {
            const decryptedInstitutionData = decryptData(cachedInstitutionData);
            setInstitutionData(decryptedInstitutionData);
          } catch (error:any) {
            console.error("Error decrypting institution data:", error.message);
            setError("Failed to decrypt institution data.");
          }
        }

        // Fetching data if not cached and institutionId is available
        if (!cachedInstitutionData && institutionId) {
          const institutionResponse = await axios.get(
            `${BASE_URL}/institution/${institutionId}`,
            { headers }
          );
          const fetchedInstitutionData = institutionResponse.data;

          // Encrypting fetched institution data
          const encryptInstitutionData = encryptData(fetchedInstitutionData);
          sessionStorage.setItem("i", encryptInstitutionData);
          setInstitutionData(fetchedInstitutionData);
        }
      } catch (error: any) {
        console.error("Error fetching institution data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (institutionId) {
      fetchInstitutionData();
    }
  }, [institutionId]);

  return { institutionData, loading, error };
};

export default useInstitution;
