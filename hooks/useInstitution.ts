import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { Institution } from "@/types/Institution";

const useInstitution = (institutionId: string | null) => {
  const [institutionData, setInstitutionData] = useState<Institution | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();

  useEffect(() => {
    const fetchInstitutionData = async () => {
      setLoading(true);
      try {
        // Check if institution data is cached in localStorage
        const cachedInstitutionData = localStorage.getItem("institutionData2");
        if (cachedInstitutionData) {
          const parsedInstitutionData = JSON.parse(cachedInstitutionData);
          setInstitutionData(parsedInstitutionData);
        }

        // If not cached, fetch from API
        if (!cachedInstitutionData && institutionId) {
          const institutionResponse = await axios.get(
            `${BASE_URL}/institution/${institutionId}`
          );
          const fetchedInstitutionData = institutionResponse.data;
          setInstitutionData(fetchedInstitutionData);
          localStorage.setItem(
            "institutionData",
            JSON.stringify(fetchedInstitutionData)
          );
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

  return { institutionData, loading , error };
};

export default useInstitution;
