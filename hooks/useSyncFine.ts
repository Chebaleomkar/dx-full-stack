"use client"
import { useEffect } from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "@/utils/getToken";
import { BASE_URL } from "@/constant";

const useSyncFines = () => {
  const { toast } = useToast();

  useEffect(() => {
    const syncData = async () => {
      const storedFines = localStorage.getItem("finesList");
      if (storedFines) {
        try {
          const finesArray = JSON.parse(storedFines);
          const token = getToken();
          const headers = token ? { Authorization: `Bearer ${token}` } : {};

          if (finesArray.length > 0) {
            for (const fine of finesArray) {
              try {
                await axios.post(`${BASE_URL}/fine/add`, fine, { headers });
                sessionStorage.removeItem("fines")
                toast({
                  title: "Locally saved data synced with server",
                  description: `Student ID: ${fine.studentId} | Reason: ${fine.label}`,
                });
              } catch (error) {
                console.error("Error syncing fine:", error);
              }
            }
            localStorage.removeItem("finesList");
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Server is busy";
          console.error("Error adding fine:", errorMessage);
          toast({
            title: "Error in taking action",
            description: errorMessage,
          });
        }
      }
    };

    if (navigator.onLine) {
      syncData();
    }

    const handleOnline = () => {
      if (navigator.onLine) {
        syncData();
      }
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);
};

export default useSyncFines;
