"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarArrowDown } from "lucide-react";
import { format } from "date-fns";

// Define the form schema using zod
const studentAddFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  studentId: z.string().min(1, { message: "Student ID is required" }),
  course: z.string().min(1, { message: "Course is required" }),
  mobileNumber: z.string().min(10, { message: "Mobile Number is required" }),
  imageUrl: z.string().url({ message: "Invalid URL" }).optional(),
  reputation: z.string(),
  streak: z.string().max(30, { message: "You cannot increase streak beyond 30 days" }),
  dateOfBirth : z.date().optional(), // Optional date field for DOB
});

type FormData = z.infer<typeof studentAddFormSchema>;

interface StudentFormProps {
  defaultValues?: Partial<FormData>;
  onSubmit: (data: FormData) => Promise<void>;
  onClose: () => void;
  isAdd?: boolean;
}

const StudentForm: React.FC<StudentFormProps> = ({
  defaultValues,
  onSubmit,
  onClose,
  isAdd,
}) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(defaultValues?.dateOfBirth);

  const form = useForm<FormData>({
    resolver: zodResolver(studentAddFormSchema),
    defaultValues: {
      name: "",
      email: "",
      studentId: "",
      course: "",
      mobileNumber: "",
      imageUrl: "",
      reputation: "0",
      streak: "0",
      dateOfBirth: date || undefined,
      ...defaultValues,
    },
  });

  useEffect(() => {
    form.reset(defaultValues);
    setDate(defaultValues?.dateOfBirth);
  }, [defaultValues, form]);

  const handleSubmit: SubmitHandler<FormData> = async (values) => {
    try {
      await onSubmit({ ...values, dateOfBirth: date });
      toast({
        title: `Student ${isAdd ? "added" : "updated"} successfully`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: `Failed to ${isAdd ? "add" : "update"} student`,
        description: "Please try again later",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex gap-2 items-center justify-between">
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Student ID"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Course"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mobile Number"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reputation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reputation (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Reputation"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="streak"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Streak (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Streak"
                      {...field}
                      className="focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Date of Birth Field */}
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={`w-[240px] pl-3 text-left font-normal ${
                        !field.value ? "text-muted-foreground" : ""
                      }`}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarArrowDown className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      setDate(date);
                      field.onChange(date);
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-4">
          <Button type="submit" className="w-full">
            {isAdd ? "Add" : "Update"}
          </Button>
          <Button type="button" onClick={onClose} className="w-full">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StudentForm;
