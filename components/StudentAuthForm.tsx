"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import z from "zod";
import { toast } from "./ui/use-toast";
import useAuthStore from "@/store/useAuthStore";
import { useForm } from "react-hook-form";
import { BASE_URL } from "@/constant";

const formSchema = z.object({
  studentId: z
    .string()
    .regex(/^\d+$/, { message: "Student ID must be a numeric value only." })
    .min(1, { message: "Student ID is required." })
    .max(10, { message: "Student ID not greater than 10 digits" }),
});

export const StudentAuthForm = () => {
  const router = useRouter();
  const {login} = useAuthStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentId: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await axios.post(
        `${BASE_URL}/student/login`,
        values
      );
      localStorage.setItem("dxToken", res.data.token);
      login('Student');
      toast({
        title: "Successfully logged in Superstar",
      });
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed to login",
        description: "Please check your credentials once again",
      });
      form.reset();
      setTimeout(() => {
        form.setFocus("studentId");
      }, 10);
    }
  }
   useEffect(()=>{
    form.setFocus('studentId');
  },[form])

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* email */}
          <FormField
            control={form.control}
            name="studentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>StudentID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your studentId"
                    {...field}
                    className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                </FormControl>
                <FormDescription>Enter your studentId</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <Button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Log in
          </Button>
        </form>
      </Form>
    </div>
  );
};
