"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios'
import { Button } from "@/components/ui/button";
import {  Form,  FormControl, FormField,  FormItem,  FormLabel,  FormMessage,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { useToast } from "@/components/ui/use-toast";
import { TeacherLoginFormSchema } from "@/constants/formSchemas";
import { BASE_URL } from "@/constant";
import useDecodeToken from "@/hooks/useDecodeToken";
import { useEffect } from "react";
import { storeToken } from "@/utils/token";

export const AdminAuthForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {  login } = useAuthStore();
  const {role} = useDecodeToken();

  const form = useForm<z.infer<typeof TeacherLoginFormSchema>>({
    resolver: zodResolver(TeacherLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(()=>{
    form.setFocus('email');
  },[form])

  async function onSubmit(values: z.infer<typeof TeacherLoginFormSchema>) {
    try {
      const res = await axios.post(`${BASE_URL}/user/login`, values);
      const token = res?.data?.token;
      storeToken(token);
      if(role){
        login(role);
      }
      toast({
        title: "Successfully logged in professor :) ",
        description: "your credentials are correct . keep them secure",
      });
      router.push("/profile");
    } catch (error: any) {
      const errorMessage =error?.response?.data?.message ||"Server is not accepting the request";
      toast({
        title: errorMessage,
        description: "Please check your credentials once again",
      });
      form.reset();
      setTimeout(() => {
        form.setFocus("email");
      }, 10);
    }
  }

  
  return (
    <>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Teacher@gmail.com"
                      {...field}
                      className=" focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className=" focus:ring-blue-500 focus:border-blue-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Log in
            </Button>
          </form>
        </Form>
      </div>
    </>
)};
