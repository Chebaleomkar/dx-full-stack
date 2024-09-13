import React, { useEffect, useState } from "react";
import useDecodeToken from "@/hooks/useDecodeToken";
import axios from "axios";
import { BASE_URL } from "@/constant";
import { Button } from "./ui/button";
import { getToken } from "@/utils/getToken";
import { Flame , Trophy} from "lucide-react";
import ReLoginPrompt from "./messages/ReLoginPrompt";
import { useRouter } from "next/navigation";

// Define types for the fine data
interface Fine {
  _id: string;
  reason: string;
  amount: number;
  issuedBy: {
    name: string;
  };
  issuedAt: string; // ISO date string
}

const StudentFinesTable: React.FC = () => {
  const { userId } = useDecodeToken();
  const [fines, setFines] = useState<Fine[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    const fetchFines = async () => {
      try {
        if(userId){
          const response = await axios.get<Fine[]>(
            `${BASE_URL}/fine/student/${userId}`
            // { headers }
          );

          // Check if the response contains the "No fines found" message
          if (response.data.length === 0) {
            setErrorMessage("No fines found for this student");
          } else {
            setFines(response.data.reverse());
            const total = response.data.reduce(
              (acc, fine) => acc + fine.amount,
              0
            );
            setTotalAmount(total);
          }
        }
      } catch (error: any) {
        // Handle 403 error
        if (error.response?.status === 403) {
          setErrorMessage("Session expired. Please log in again.");
        } else {
          console.error("Error fetching fines:", error);
        }
      }
    };

    fetchFines();
  }, [userId]);

  // Handle payment function
  const handlePayment = (amount: number, fineId?: string) => {
    console.log(`Processing payment of ₹${amount} for fine ${fineId}`);
  };

  // If there's an error message, show it
  if (errorMessage) {
    return errorMessage === "Session expired. Please log in again." ? (
      <ReLoginPrompt />
    ) : (
      <div className="mt-4 text-red-500">{errorMessage}</div>
    );
  }


  return (
    <>
      {!fines ? (
        <div className="flex flex-col p-20  justify-center h-52 ">
          <div className="text-center p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              No Fines Found
            </h2>
            <p className="text-lg text-gray-600">
              Keep going, stay disciplined!
            </p>
            <p className="mt-4 text-gray-500">
              Good habits create a foundation for success. You're on the right
              path!
            </p>
          </div>
        </div>
      ) : (
        <>
        {fines && (<div className="mt-2">
          <h2 className="text-2xl font-semibold">Your Fines</h2>
          <div className="mt-4">
            {fines.map((fine) => (
              <div
                key={fine._id}
                className="flex items-center justify-between p-4 border mb-2 rounded dark:border dark:border-white"
              >
                <div>
                  <h3 className="text-lg font-semibold">{fine.reason}</h3>
                  <p className="text-sm">Amount: ₹{fine.amount}</p>
                  <p className="text-sm">Issued By: {fine.issuedBy.name}</p>
                  <p className="text-sm">
                    Issued At:{" "}
                    {new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }).format(new Date(fine.issuedAt))}
                  </p>
                </div>
                <Button
                  onClick={() =>{router.push(`/payment/${fine._id}`)} }
                  className="bg-blue-500 rounded-md"
                >
                  Pay
                </Button>
              </div>
            ))}
            <div className="mt-4">
              <h3 className="text-xl font-semibold">
                Total Amount: ₹{totalAmount}
              </h3>
              <Button
                onClick={() => handlePayment(totalAmount)}
                className="rounded-md"
              >
                Pay All Fines
              </Button>
            </div>
          </div>
        </div>)}
        </>
      )}
    </>
  );
};

export default StudentFinesTable;
