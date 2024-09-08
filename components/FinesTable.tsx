import React, { useEffect, useState } from "react";
import axios from "axios";
import useDecodeToken from "@/hooks/useDecodeToken";
import Loader from "./Loader";
import { useToast } from "./ui/use-toast";
import { getToken } from "@/utils/getToken";
import ReLoginPrompt from "./messages/ReLoginPrompt";
import { useMediaQuery } from "react-responsive";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button"; // Make sure Button component is imported
import { Ellipsis, X } from "lucide-react";
import { Fine } from "@/types/Fine";
import { isWithin48Hours } from "@/utils/isWithin48Hours";
import { BASE_URL } from "@/constant";
import NoFinesMessage from "./NoFineMessage";

const FinesTable = () => {
  const [fines, setFines] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingFineId, setEditingFineId] = useState<string | null>(null); // holds the ID of the fine being edited
  const [newAmount, setNewAmount] = useState<number>(0);
  const [newReason, setNewReason] = useState<string>("");
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [currentFine, setCurrentFine] = useState<any>(null);

  const { userId, role } = useDecodeToken();
  const { toast } = useToast();
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  useEffect(() => {
    const fetchFines = async () => {
      if (role === "Admin" || role === "HeadAdmin" || role === "SuperAdmin") {
        if (userId) {
          // Check if fines are already in session storage
          const storedFines = sessionStorage.getItem("fines");
          if (storedFines) {
            setFines(JSON.parse(storedFines));
            setLoading(false);
          } else {
            try {
              const response = await axios.get(
                `${BASE_URL}/fine/user/${userId}`
                // { headers }
              );

              const fetchedFines = response.data;
              setFines(fetchedFines);

              sessionStorage.setItem("fines", JSON.stringify(fetchedFines));
              setLoading(false);
            } catch (error: any) {
              console.error("Error fetching fines:", error);
              setLoading(false);
              toast({
                title: `${error.response.data.message} to access the fines | please ReLogin`,
              });
            }
          }
        }
      }
    };

    fetchFines();
  }, [userId]);

  const handleEditClick = (fine: any) => {
    setEditingFineId(fine._id);
    setNewAmount(fine.amount);
    setNewReason(fine.reason);
    setCurrentFine(fine);
    if (!isDesktop) {
      setShowDrawer(true);
    }
  };

  const handleUpdateFine = async () => {
    if (!editingFineId) return;
    setShowDrawer(false);
    handleCancel();
    try {
      const response = await axios.put(
        `${BASE_URL}/fine/${editingFineId}`,
        { amount: newAmount, reason: newReason },
        // { headers }
      );
      // const response = await axios.put(
      //   `/api/fine/${editingFineId}`,
      //   { amount: newAmount, reason: newReason },
      //   { headers }
      // );
      sessionStorage.removeItem("fines");
      toast({
        title: "Fine updated successfully!",
      });

      // Find the original fine data to retain the full student details
      const originalFine = fines.find((fine) => fine._id === editingFineId);

      if (originalFine) {
        // Merge the original fine's student data with the updated fine data
        const updatedFine = {
          ...response.data,
          student: originalFine.student, // Retain the full student details
        };

        setFines(
          fines.map((fine) =>
            fine._id === updatedFine._id ? updatedFine : fine
          )
        );
      }

      setEditingFineId(null); // Clear the editing fine state
      if (!isDesktop) {
        setShowDrawer(false); // Close the drawer on mobile
      }
    } catch (error: any) {
      console.error("Error updating fine:", error);
      const errorMessage =
        error.response?.data?.message || "Server is not accepting the request";
      toast({
        title: "Failed to update the fine.",
        description: errorMessage,
      });
    }
  };

  const handleCancel = () => {
    setEditingFineId(null);
  };

  if (!userId) return <Loader />;

  return (
    <div className="container mx-auto p-6 rounded-xl shadow-md border dark:border-white border-black">
      {fines.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-6 text-center">Recent Fines</h1>
          {loading ? (
            <Loader />
          ) : (
            <div className={`overflow-x-auto rounded-xl `}>
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                    <th className="py-2 px-4 border-b text-left">
                      Student Name
                    </th>
                    <th className="py-2 px-4 border-b text-left">Student ID</th>
                    <th className="py-2 px-4 border-b text-left">Amount</th>
                    <th className="py-2 px-4 border-b text-left">Reason</th>
                    <th className="py-2 px-4 border-b text-left">Issued At</th>
                  </tr>
                </thead>
                <tbody>
                  {[...fines].reverse().map((fine) => (
                    <tr
                      key={fine._id}
                      className={`hover:bg-gray-100 dark:hover:bg-gray-800 ${
                        fine.status === "updated"
                          ? "border border-green-300 bg-green-50 dark:bg-green-900"
                          : ""
                      }`}
                    >
                      {editingFineId === fine._id ? (
                        <>
                          <td className="py-2 px-4 border-b">
                            {fine.student.name}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {fine.student.studentId}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <input
                              type="number"
                              value={newAmount}
                              onChange={(e) =>
                                setNewAmount(Number(e.target.value))
                              }
                              className="border p-2 rounded"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">
                            <input
                              type="text"
                              value={newReason}
                              onChange={(e) => setNewReason(e.target.value)}
                              className="border p-2 rounded"
                            />
                          </td>
                          <td className="py-2 px-4 border-b">
                            {new Date(fine.issuedAt).toLocaleDateString()}
                          </td>
                          <td className="py-2 px-4 border-b">
                            <button
                              onClick={handleUpdateFine}
                              className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="py-2 px-4 border-b">
                            {isWithin48Hours(fine.issuedAt) && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <Ellipsis className="h-6 w-6" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleEditClick(fine)}
                                  >
                                    Update
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    View Details
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {fine.student.name}
                          </td>
                          <td className="py-2 px-4 border-b">
                            {fine.student.studentId}
                          </td>
                          <td className="py-2 px-4 border-b">{fine.amount}</td>
                          <td className="py-2 px-4 border-b">{fine.reason}</td>
                          <td className="py-2 px-4 border-b">
                            {new Date(fine.issuedAt).toLocaleDateString()}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {editingFineId && !isDesktop && (
            <Drawer open={showDrawer} onOpenChange={setShowDrawer}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit Fine</DrawerTitle>
                  <DrawerClose onClick={handleCancel}>
                    <X />
                  </DrawerClose>
                </DrawerHeader>
                <DrawerDescription>
                  {currentFine && (
                    <div>
                      <div className="py-2 px-4 my-10">
                        <label className="block mb-1">Amount:</label>
                        <input
                          type="number"
                          value={newAmount}
                          onChange={(e) => setNewAmount(Number(e.target.value))}
                          className="border p-2 rounded w-full"
                        />
                      </div>
                      <div className="py-2 px-4">
                        <label className="block mb-1">Reason:</label>
                        <input
                          type="text"
                          value={newReason}
                          onChange={(e) => setNewReason(e.target.value)}
                          className="border p-2 rounded w-full"
                        />
                      </div>
                      <div className="py-2 px-4">
                        Issued At:{" "}
                        {new Date(currentFine.issuedAt).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </DrawerDescription>
                <DrawerFooter>
                  <Button
                    onClick={() => {
                      setShowDrawer(false);
                      handleCancel();
                    }}
                  >
                    Close
                  </Button>
                  <Button onClick={handleUpdateFine}>Update</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </>
      ) : (
        <NoFinesMessage />
      )}
    </div>
  );
};

export default FinesTable;
