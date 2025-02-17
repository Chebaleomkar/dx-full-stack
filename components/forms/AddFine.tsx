"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "../ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL, FineItems } from "@/constant";
import { X } from "lucide-react";
import { Student } from "@/types/student";
import StudentReview from "@/components/Student/StudentReview";
import useDecodeToken from "@/hooks/useDecodeToken";
import Loader from "@/components/Loader";
import { getToken } from "@/utils/getToken";
import CustomDrawer from "@/components/CustomDrawer";
import { fineFormSchema } from "@/lib/form-schemas/FineFormSchema";
import useInstitution from "@/hooks/useInstitution";
import LoadingIcon from "@/components/Icons/LoadingIcon";
import { fineReasons } from "@/constant";
import React from "react";

type FormSchema = z.infer<typeof fineFormSchema>;

const AddFine = () => {
  const [loading, setLoading] = useState(false);
  const [isOr, setIsOr] = useState(false);
  const [studentDetails, setStudentDetails] = useState<Student | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { institutionData } = useInstitution();
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [reasonSuggestions, setReasonSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const { userId } = useDecodeToken();
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const form = useForm<FormSchema>({
    resolver: zodResolver(fineFormSchema),
    defaultValues: {
      studentId: "",
      value: "",
      label: "",
      items: [],
    },
  });

  useEffect(() => {
    const storedData = localStorage.getItem("fineData");
    if (storedData) {
      form.reset(JSON.parse(storedData));
    }
  }, [form]);

  const selectedItems = form.watch("items");
  useEffect(() => {
    const fineItems = institutionData?.fineItems;
    const selectedItemId = selectedItems?.[0] ?? null;
    const selectedItem = fineItems?.find((item) => item._id === selectedItemId);

    if (selectedItem) {
      form.setValue("value", selectedItem.value);
      form.setValue('label', selectedItem.label)
      setIsReadOnly(true);
    } else {
      form.setValue("value", "");
      form.setValue('label', "");
      setIsReadOnly(false);
    }
  }, [form, selectedItems, institutionData]);



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
            await axios.post(
              `${BASE_URL}/fine/add`,
              fineData,
              { headers }
            );
            sessionStorage.removeItem("fines");
            toast({
              title: `Fine created on studentID : ${fineData.studentId}`,
              description: `Reason : ${fineData.label}`,
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


  const handleReview = async () => {
    const studentId = form.getValues("studentId");
    if (studentId) {
      try {
        const response = await axios.get(
          `${BASE_URL}/student/c/${studentId}`,
          { headers }
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



  const handleReasonInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputReasonValue = event.target.value;
    form.setValue("label", inputReasonValue);

    if (inputReasonValue) {
      const filteredSuggestions = fineReasons.filter(reason =>
        reason.toLowerCase().includes(inputReasonValue.toLowerCase())
      );
      setReasonSuggestions(filteredSuggestions);
    } else {
      setReasonSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    form.setValue("label", suggestion);
    setReasonSuggestions([]);
  };


  const FineForm = () => (
    <>
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
          {/* checkboxes with label and value */}
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
                {institutionData?.fineItems?.map((item: any) => (
                  <FormField
                    key={item._id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item._id}
                          className="flex items-center space-x-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item._id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([item._id]);
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
            className={`flex items-center text-sm font-semibold ${isOr ? "justify-end" : "flex-col"} `}
          >
            {isOr ? (
              <span
                onClick={() => setIsOr(false)}
                className="cursor-pointer justify-end"
              >
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
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Amount</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter amount"
                        readOnly={isReadOnly}
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
              {/* Reason input with suggestions */}
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Reason</FormLabel>
                    <FormControl>
                      <Input
                        readOnly={isReadOnly}
                        placeholder="Enter reason"
                        {...field}
                        onChange={handleReasonInputChange}
                        className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the reason for the fine.
                    </FormDescription>
                    <FormMessage />

                    {reasonSuggestions?.length > 0 && (
                      <ScrollArea className="h-52 p-4 border mt-5">
                        {reasonSuggestions.map((suggestion, i: number) => (
                          <p
                            key={i}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="suggestion-item text- rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white p-2 transition-colors"
                          >
                            {suggestion}
                          </p>
                        ))}
                      </ScrollArea>
                    )}
                  </FormItem>
                )}
              />
            </>
          )}

          <div className="flex items-center justify-center gap-5">
            <Button
              type="button"
              className="w-full py-2 px-3 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              onClick={handleReview}
            >
              {" "}
              Review
            </Button>

            <Button
              type="submit"
              className="w-full py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? <LoadingIcon className="animate-spin w-10 h-10 dark:fill-white" /> : `Take Action`}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )

  return (
    <>
      <Card className="max-w-md mx-auto mt-6 shadow-lg">
        <CardHeader className="bg-blue-600 text-white p-3 rounded-t-lg">
          <CardTitle className="text-xl font-bold">Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <FineForm />
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
    </>
  );
};

export default AddFine;
