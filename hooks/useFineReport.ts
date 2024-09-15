import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant";
import useUser from "./useUser";

const useFineReport =({param}:{param:any}) => {
  const {userData} = useUser();
  const [fineData, setFineData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const institutionId = userData?.institution;

  useEffect(() => {
    const fetchFineReportData = async () => {
      setLoading(true);
      try {
        const cachedFineReportData = sessionStorage.getItem("fineReports");
        if (cachedFineReportData) {
          const parsedFineReportData = JSON.parse(cachedFineReportData);
          setFineData(parsedFineReportData);
        }
        if (!cachedFineReportData && institutionId) {
          const fineReportResponse = await axios.get(
            `${BASE_URL}/fine/last-days/${institutionId}`, {params : param}
          );
          const fetchedFineReportData = fineReportResponse.data;
          setFineData(fetchedFineReportData);
          sessionStorage.setItem("fineReports",  JSON.stringify(fetchedFineReportData));
        }
      } catch (error: any) {
        console.error("Error fetching institution data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (institutionId && param) {
      fetchFineReportData();
    }
  }, [param , institutionId]);

  return { fineData, loading , error };
};

export default useFineReport;
