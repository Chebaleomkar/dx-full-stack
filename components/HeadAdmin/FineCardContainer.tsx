"use client"
import React, { useEffect, useState } from "react";
import FineInfoCard from "./FineInfoCard";
import { getToken } from "@/utils/getToken";
import { BASE_URL } from "@/constant";
import axios from 'axios';
import { getInstitutionId } from "@/utils/getInstitutionId";

const FineCardContainer = () => {
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [paidAmount, setPaidAmount] = useState<number | null>(null);
  const [unpaidAmount, setUnpaidAmount] = useState<number | null>(null);
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const institutionId = getInstitutionId();

  useEffect(() => {
if (institutionId) {
const fetchFineData = async () => {
try {
    // Check if data is already in sessionStorage
    const storedTotalAmount = sessionStorage.getItem("totalAmount");
    const storedPaidAmount = sessionStorage.getItem("paidAmount");
    const storedUnpaidAmount = sessionStorage.getItem("unpaidAmount");

    if (storedTotalAmount && storedPaidAmount && storedUnpaidAmount ) {
    // Use cached data if available
    setTotalAmount(JSON.parse(storedTotalAmount));
    setPaidAmount(JSON.parse(storedPaidAmount));
    setUnpaidAmount(JSON.parse(storedUnpaidAmount));
    } else {
    // Fetch data from API if not available in sessionStorage
    const [totalResponse, paidResponse] =
        await Promise.all([
        axios.get(
            `${BASE_URL}/fine/total-amount/${institutionId}`,
            // { headers }
        ),
        axios.get(
            `${BASE_URL}/fine/paid-amount/${institutionId}`,
            // { headers }
        ),
        
        ]);

            const totalAmount = totalResponse.data.totalAmount || 0;
            const paidAmount = paidResponse.data.totalAmount || 0;
            const unpaidAmount = totalAmount-paidAmount;
            // Update state
            setTotalAmount(totalAmount);
            setPaidAmount(paidAmount);
            setUnpaidAmount(unpaidAmount);

            // Cache the data in sessionStorage
            sessionStorage.setItem("totalAmount", JSON.stringify(totalAmount));
            sessionStorage.setItem("paidAmount", JSON.stringify(paidAmount));
            sessionStorage.setItem(
              "unpaidAmount",
              JSON.stringify(unpaidAmount)
            );
          }
        } catch (error) {
          console.error("Error fetching fine data:", error);
        }
      };

      fetchFineData();
    }
  }, [institutionId]);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <FineInfoCard
        title={"Recent Fine"}
      />
      <FineInfoCard
        title={`Total Amount : ${
          totalAmount !== null ? totalAmount : "Loading..."
        }`}
      />
      <FineInfoCard
        title={`Paid Amount : ${
          paidAmount !== null ? paidAmount : "Loading..."
        }`}
      />
      <FineInfoCard
        title={`Unpaid Amount : ${
          unpaidAmount !== null ? unpaidAmount : "Loading..."
        }`}
      />
    </div>
  );
};

export default FineCardContainer;
