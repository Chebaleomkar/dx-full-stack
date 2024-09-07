import { useState, useEffect } from "react";
import axios from "axios";

// Define a custom hook for fetching and caching data
export function useCachedData<T>(
  url: string,
  cacheKey: string,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Check if data is already in cache
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        // Fetch data if not cached
        const response = await axios.get(url);
        setData(response.data);

        // Save data to cache
        localStorage.setItem(cacheKey, JSON.stringify(response.data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  // Function to invalidate cache
  const invalidateCache = () => {
    localStorage.removeItem(cacheKey);
  };

  return { data, loading, error, invalidateCache };
}
