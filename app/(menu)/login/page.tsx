"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AuthForm } from "@/components/AuthForm";
import { Button } from "@/components/ui/button";
import { StudentAuthForm } from "@/components/StudentAuthForm";
import PublicRoute from "@/components/PublicRoute";

const metadata: Metadata = {
  title: "DisciplineX Login",
  description: "Authentication forms for DisciplineX.",
};

export default function Login() {
  const [userType, setUserType] = useState<null | "student" | "teacher">(null);

  return (
    <PublicRoute>
      <div className="relative h-screen flex flex-col items-center justify-center lg:grid lg:grid-cols-2">
        <div className="hidden h-full flex-col lg:flex rounded-xl lg:flex-col lg:items-center lg:justify-center lg:p-10 relative">
          <Image
            src="/images/logo.jpeg"
            layout="fill"
            objectFit="cover"
            alt="logo"
            className="absolute inset-0 w-full h-full object-cover  rounded-xl "
          />
          <div className="relative z-20 mb-20 text-center mt-auto">
            <blockquote className="space-y-2">
              <footer className="text-[15px] font-semibold">
                Engineered By -{" "}
                <a href="#" className="underline">
                  Omkar Chebale
                </a>
              </footer>
            </blockquote>
          </div>
        </div>

        <div className="min-h-screen flex items-center justify-center rounded-xl w-full bg-gradient-to-r from-blue-500 to-orange-600 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 lg:p-8">
              <h1 className="text-4xl font-bold mb-6 text-center ">Login</h1>
              {!userType ? (
                <div className="flex flex-col items-center space-y-4">
                  <h3 className="text-xl font-semibold ">Who are you?</h3>
                  <Button
                    className="w-full py-3 bg-green-600 rounded-lg hover:bg-green-700 transition duration-300"
                    onClick={() => setUserType("student")}
                  >
                    Student
                  </Button>
                  <Button
                    className="w-full py-3 bg-blue-700 rounded-lg hover:bg-blue-800 transition duration-300"
                    onClick={() => setUserType("teacher")}
                  >
                    Teacher
                  </Button>
                </div>
              ) : (
                <>
                  {userType === "teacher" ? <AuthForm /> : <StudentAuthForm />}

                  <p className="mt-6  text-center text-sm ">
                    By clicking continue, you agree to our{" "}
                    <Link
                      href="/terms"
                      className="underline text-blue-500 hover:text-blue-700"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="underline text-blue-500 hover:text-blue-700"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
}
  