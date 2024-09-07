"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL, FineItems } from "@/constant";
import { X } from "lucide-react";
import { Student } from "@/types/student";
import { useMediaQuery } from "react-responsive";
import StudentReview from "@/components/Student/StudentReview";
import useDecodeToken from "@/hooks/useDecodeToken";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";
import { getToken } from "@/utils/getToken";
import { getInstitutionId } from "@/utils/getInstitutionId";
import CustomDrawer from "@/components/CustomDrawer";
import CustomAlert from "@/components/CustomAlert";
import { fineFormSchema } from "@/lib/form-schemas/FineFormSchema";


type FormSchema = z.infer<typeof fineFormSchema>;

const Sheild = () => {
  const [loading, setLoading] = useState(false);
  const [isOr, setIsOr] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const isDesktop = useMediaQuery({
    query: "(min-width: 768px)",
  });

  const { userId } = useDecodeToken();
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const form = useForm<FormSchema>({
    resolver: zodResolver(fineFormSchema),
    defaultValues: {
      studentId: "",
      amount: "",
      reason: "",
      items: [],
    },
  });

  useEffect(() => {
    const storedData = localStorage.getItem("fineData");
    if (storedData) {
      form.reset(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const selectedItem = FineItems.find((item) =>
      form.getValues("items")?.includes(item.id)
    );
    if (selectedItem) {
      form.setValue("amount", selectedItem.value);
      form.setValue("reason", selectedItem.label);
    } else {
      form.setValue("amount", "");
      form.setValue("reason", "");
    }
  }, [form.watch("items")]);

  async function onSubmit(values: z.infer<typeof fineFormSchema>) {
    try {
      setShowModal(false);
      setLoading(true);
      const storedFines = localStorage.getItem("finesList");
      const fines = storedFines ? JSON.parse(storedFines) : [];

      // Ensure that the `userId` is included when storing the fine
      const finePayload = { ...values, issuedBy: userId };

      if (navigator.onLine) {
        // Send each fine individually
        for (const fine of [...fines, finePayload]) {
          try {
            const { items, ...fineData } = fine;
            await axios.post(`${BASE_URL}/fine/add`, fineData,
              //  { headers }
              );
            sessionStorage.removeItem("fines");
            toast({
              title: `Fine created on studentID : ${fineData.studentId}`,
              description: `Reason : ${fineData.reason}`,
            });
          } catch (error: any) {
            const errorMessage =
              error.response?.data?.message ||
              "Server is not accepting the request";
            console.error("Error adding fine:", errorMessage);
            toast({
              title: "Error in taking Action",
              description: errorMessage,
            });
          }
        }
        localStorage.removeItem("finesList"); 
        sessionStorage.removeItem("fines");
        form.reset();
      } else {
        // Add new fine to local storage
        const { items, ...fineDataWithoutItems } = finePayload; // Exclude 'items' if necessary
        localStorage.setItem(
          "finesList",
          JSON.stringify([...fines, fineDataWithoutItems])
        );
        toast({
          variant: "destructive",
          title: `You are offline. The fine has been saved locally.`,
          description: `Fine created on studentID : ${fineDataWithoutItems.studentId}`,
        });
        form.reset();
      }
    } catch (error) {
      console.error("Error adding fine:", error);
    } finally {
      setLoading(false);
    }
  }

  //  synchronization of fines
  useEffect(() => {
    const syncData = async () => {
      const storedFines = localStorage.getItem("finesList");
      if (storedFines) {
        try {
          const finesArray = JSON.parse(storedFines);
          if (finesArray.length > 0) {
            for (const fine of finesArray) {
              try {
                await axios.post(`${BASE_URL}/fine/add`, fine, 
                  // { headers }
                );
                // await axios.post("/api/fine/add", fine, { headers });
                toast({
                  title: `locally saved data Sync with server`,
                  description: `StudentID : ${fine.student} | Reason : ${fine.reason}`,
                });
              } catch (error) {
                console.error("Error syncing fine:", error);
              }
            }
            localStorage.removeItem("finesList"); // Clear local storage after successful sync
          }
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Server is busy";
          console.error("Error adding fine:", errorMessage);
          toast({
            title: "Error in taking Action",
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

  const institutionId = getInstitutionId();

  const handleReview = async () => {
    const studentId = form.getValues("studentId");
    if (studentId) {
      try {
        const response = await axios.get(
          `${BASE_URL}/student/c/${studentId}`,
          // { headers }
        );
        const studentData = response?.data;

        if (studentData) {
          setStudentDetails(studentData);
          setShowModal(true);
        } else {
          toast({
            variant: "destructive",
            title: "Student ID Not Found",
            description:
              " student details not found . Please check studentID and try again.",
          });
        }
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message ||
          "Could not fetch student details. Please try again later.";
        toast({
          variant: "destructive",
          title: "Error Fetching Student Details",
          description: errorMessage,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Student ID",
        description: "Please enter a valid student ID.",
      });
    }
  };

  return (
    <ProtectedRoute allowedRoles={["Admin", "HeadAdmin", "SuperAdmin"]}>
      <Card className="max-w-md mx-auto mt-6 shadow-lg">
        <CardHeader className="bg-blue-600 text-white p-3 rounded-t-lg">
          <CardTitle className="text-xl font-bold">Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* studentId */}
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Student ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter student ID"
                        {...field}
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        autoComplete="off"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the unique student ID.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* checkboxes with reason and amount */}
              <FormField
                control={form.control}
                name="items"
                render={() => (
                  <FormItem>
                    <div className="mb-2">
                      <FormLabel className="text-sm">Reasons</FormLabel>
                      <FormDescription>
                        Select the reason for the fine.
                      </FormDescription>
                    </div>
                    {FineItems.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex items-center space-x-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    if (checked) {
                                      field.onChange([item.id]);
                                    } else {
                                      field.onChange([]);
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-xs">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className={`flex items-center text-sm font-semibold ${
                  isOr ? "justify-end" : "flex-col"
                } `}
              >
                {isOr ? (
                  <span
                    onClick={() => setIsOr(false)}
                    className="cursor-pointer justify-end"
                  >
                    {" "}
                    <X size={35} className="border" />
                  </span>
                ) : (
                  <span
                    onClick={() => setIsOr(true)}
                    className="underline cursor-pointer "
                  >
                    Or Enter amount and reason
                  </span>
                )}
              </div>

              {isOr && (
                <>
                  {/* amount */}
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter amount"
                            {...field}
                            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the reasonable amount.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* reason */}
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">Reason</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter reason"
                            {...field}
                            className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the reason for the fine.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              <div className="flex items-center justify-center gap-5">
                  <Button
                    type="button"
                    className="w-full py-2 px-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                    onClick={handleReview}> Review</Button>

                <Button
                  type="submit"
                  className="w-full py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Take Action
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

        <CustomDrawer
          open={showModal}
          onOpenChange={setShowModal}
          title="Student Details"
          description="Review the details of the student."
          body={
            studentDetails ? (
              <StudentReview studentDetails={studentDetails} />
            ) : (
              <Loader />
            )
          }
          primaryButtonName="Take Action"
          secondaryButtonName="Close"
          onPrimaryClick={() => {
            form.handleSubmit(onSubmit)();
            setShowModal(false);
          }}
          onSecondaryClick={() => setShowModal(false)}
        />
    </ProtectedRoute>
  );
};

export default Sheild;
