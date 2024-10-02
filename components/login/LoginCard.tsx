"use client";
import React , { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {RefreshCcw } from "lucide-react";
import { AdminAuthForm } from "@/components/forms/AdminAuthForm";
import { StudentAuthForm } from "@/components/forms/StudentAuthForm";
import { TermsAndPrivacy } from "@/components/login/TermsAndPrivacy";
import { Credits } from "@/components/login/Credits";

const LoginCard = () => {
  const [userType, setUserType] = useState<null | "Student" | "Teacher">(null);
  return (
    <div className="min-h-screen flex items-center justify-center rounded-sm w-full p-4  bg-gradient-to-r from-gray-700  via-gray-800 to-gray-900 ">
      <Card className="max-w-md w-full dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-4xl text-center font-manrope font-black leading-snug text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">
            {userType && <>{userType} Login</>}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {userType && (
            <Button
              variant="ghost"
              className="border mb-2 text-[11px]"
              onClick={() => setUserType(userType === 'Student' ? 'Teacher' : 'Student')}>
              <RefreshCcw className="mr-2" size={15} /> Switch to {userType === 'Student' ? 'Teacher' : 'Student'}
            </Button>
          )}
          {!userType ? (
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-3xl font-semibold">Who are you?</h3>
              <Button className={`w-full py-2 bg-green-500 hover:bg-orange-600`} onClick={()=>{setUserType('Student')}}  >
                Student
              </Button>
              <Button className={`w-full py-2 bg-blue-500 hover:bg-orange-600`} onClick={()=>{setUserType('Teacher')}}  >
                Teacher
              </Button>
            </div>
          ) : (
            <>
              {userType === "Teacher" ? <AdminAuthForm /> : <StudentAuthForm />}
              <TermsAndPrivacy />
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
            <Credits />
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginCard;




