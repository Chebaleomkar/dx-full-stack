"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { Institution } from "@/types/Institution";
import useUser from "./useUser";
import { getToken } from "@/utils/getToken";

const useInstitution = () => {
  const { userData, loading: userLoading,  error: userError,  handleLogout} = useUser();
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
        const cachedInstitutionData = sessionStorage.getItem("institutionData");
        if (cachedInstitutionData) {
          const parsedInstitutionData = JSON.parse(cachedInstitutionData);
          setInstitutionData(parsedInstitutionData);
        }
        if (!cachedInstitutionData && institutionId) {
          const institutionResponse = await axios.get(
            `${BASE_URL}/institution/${institutionId}`,
            {headers}
          );
          const fetchedInstitutionData = institutionResponse.data;
          setInstitutionData(fetchedInstitutionData);
          sessionStorage.setItem("institutionData",  JSON.stringify(fetchedInstitutionData));
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
  }, [institutionId ]);

  return { institutionData, loading , error };
};

export default useInstitution;
