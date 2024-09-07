
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { getToken } from "@/utils/getToken";

// Define the types for the data and error state
interface UseGetDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useGetData = <T>(url: string): UseGetDataResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<T>(BASE_URL+url  , 
          // {headers}
        );
        setData(response.data);
        setError(null);
      } catch (error) {
        setData(null);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useGetData;
