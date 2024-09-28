"use client"
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../ui/button";
import { AuthForm } from './../AuthForm';
import { StudentAuthForm } from './../StudentAuthForm';

const LoginCard = () => {
 const [userType, setUserType] = useState<null | "Student" | "Teacher">(null);
return (
    <div className="min-h-screen flex items-center justify-center rounded-sm w-full p-4 bg-gradient-to-r from-sky-500 via-orange-500 to--500">
        <Card className="max-w-md w-full dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-4xl font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">{userType && (<>{userType} Login</>)}  </CardTitle>
      </CardHeader>
      <CardContent>
        {!userType ? (
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-xl font-semibold">Who are you?</h3>
            <Button
              className="w-full py-3 bg-green-600 hover:bg-green-700 transition duration-300"
              onClick={() => setUserType("Student")}
            >
              Student
            </Button>
            <Button
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 transition duration-300"
              onClick={() => setUserType("Teacher")}
            >
              Teacher
            </Button>
          </div>
        ) : (
          <>
            {userType === "Teacher" ? <AuthForm /> : <StudentAuthForm />}
            <p className="mt-6 text-center text-sm ">
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
      </CardContent>
      <CardFooter className="flex justify-center">
        <blockquote className="space-y-2">
          <footer className="text-[15px] font-semibold">
            Engineered By -{" "}
            <a  
              href="https://www.google.com/search?q=who+is+omkar+chebale"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 hover:text-blue-700"
            >
              Omkar Chebale and Team
            </a>
          </footer>
        </blockquote>
      </CardFooter>
    </Card>
        </div>
)}

export default LoginCard
