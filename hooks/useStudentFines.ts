"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { getToken } from "@/utils/getToken";
import useDecodeToken from "@/hooks/useDecodeToken";
import { encryptData, decryptData } from "@/utils/encrypt-decrypt";
import { Fine } from "@/types/Fine";

const useStudentFines = () => {
    const { userId } = useDecodeToken();
    const [fines, setFines] = useState<Fine[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const token = getToken();
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    useEffect(() => {
        const fetchFines = async () => {
            setLoading(true);
            if (userId) {
                try {

                    const cachedFinesData = sessionStorage.getItem("sft");
                    if (cachedFinesData) {
                        try {

                            const decryptedFinesData: Fine[] = decryptData(cachedFinesData);
                            setFines(decryptedFinesData.reverse());
                        } catch (error: any) {
                            console.error("Error decrypting fines data:", error.message);
                            setError("Failed to decrypt fines data.");
                        }
                        setLoading(true);
                        return;
                    }

                    const response = await axios.get<Fine[]>(`${BASE_URL}/fine/student/${userId}`, { headers });

                    if (response.data.length === 0) {
                        setError("No fines found for this student");
                    } else {
                        setFines(response.data.reverse());
                        const encryptFinesData = encryptData(response.data);
                        sessionStorage.setItem("sft", encryptFinesData);
                    }
                } catch (error: any) {
                    if (error.response?.status === 403) {
                        setError("Session expired. Please log in again.");
                    } else {
                        console.error("Error fetching fines:", error);
                        setError("Error fetching fines. Please try again.");
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchFines();
    }, [userId]);

    return { fines, error, loading };
};

export default useStudentFines;
