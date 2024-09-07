"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios'
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
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { useToast } from "./ui/use-toast";
import { TeacherLoginFormSchema } from "@/constants/formSchemas";
import { BASE_URL } from "@/constant";
import useDecodeToken from "@/hooks/useDecodeToken";


export const AuthForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  
  const { isAuthenticated, login, logout } = useAuthStore();

  const form = useForm<z.infer<typeof TeacherLoginFormSchema>>({
    resolver: zodResolver(TeacherLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof TeacherLoginFormSchema>) {
    try {
     const res = await axios.post(`${BASE_URL}/user/login`, values);
      localStorage.setItem("dxToken", res.data.token);
      toast({
        title: "Successfully logged in professor :) ",
        description: "your credentials are correct . keep them secure",
      });
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Failed to login",
        description: "Please check your credentials once again",
      });
    }
  }
  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@gmail.com"
                      {...field}
                      className=" focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your email/username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                      className=" focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your password.
                  </FormDescription>
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
    </>
  );
};
