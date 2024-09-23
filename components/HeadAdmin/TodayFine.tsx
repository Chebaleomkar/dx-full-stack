"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { getToken } from "@/utils/getToken";
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
} from "react-icons/fa"; 
import Loader from "../Loader";
import { getInstitutionId } from "@/utils/getInstitutionId";


export type FineType = {
  _id: string;
  student: string;
  amount: number;
  reason: string;
  issuedBy: string;
  issuedAt: Date;
  paidAt?: Date; 
  status: "processing" | "updated" | "confirmed" | "unpaid" | "paid";
};

const TodayFine = () => {
  const [data, setData] = useState<FineType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const institutionId = getInstitutionId();

  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const response = await axios.get<{ todayFines: FineType[] }>(
          `${BASE_URL}/fine/today/${institutionId}`, 
          {headers} 
        );
        setData(response.data.todayFines); 
        
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (institutionId) {
      fetchFines();
    }
  }, [institutionId]);


  const getStatusStyle = (status: FineType["status"]) => {
    switch (status) {
      case "processing":
        return {
          icon: <FaHourglassHalf className="text-yellow-500" />,
          bgColor: "bg-yellow-100 dark:bg-yellow-100",
        };
      case "confirmed":
        return {
          icon: <FaCheckCircle className="text-blue-500" />,
          bgColor: "bg-blue-100 dark:bg-blue-100",
        };
      case "unpaid":
        return {
          icon: <FaTimesCircle className="text-red-500" />,
          bgColor: "bg-red-100 dark:bg-red-100",
        };
      case "paid":
        return {
          icon: <FaDollarSign className="text-green-500" />,
          bgColor: "bg-green-100 dark:bg-green-100",
        };
      default:
        return {
          icon: null,
          bgColor: "bg-gray-100",
        };
    }
  };

  if (loading) {
    return (
      <div>
        <p>Loading today fines...</p>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {data?.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <div className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg p-6 max-w-md text-center shadow-md">
            <p className="text-lg font-semibold">No fines created today.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              No fines have been created by any admin today. Check back later
              for updates.
            </p>
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {data?.map((fine: FineType) => {
            const { icon, bgColor } = getStatusStyle(fine.status);
            return (
              <li
                key={fine._id}
                className={`p-4  text-black border rounded shadow ${bgColor}`}
              >
                <div>
                  <p className="mb-2 text-lg font-bold">
                    <strong>Reason:</strong> {fine.reason}
                  </p>
                  <p className="mb-2">
                    <strong>Amount:</strong> ${fine.amount}
                  </p>
                  <p className="mb-2">
                    <strong>Date Issued:</strong>{" "}
                    {new Date(fine.issuedAt).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    <strong>Status:</strong> {icon}{" "}
                    <span className="ml-2">{fine.status}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TodayFine;
