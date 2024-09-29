"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { MoveLeft, RefreshCcw } from "lucide-react";
import { AuthForm } from "../AuthForm";
import { StudentAuthForm } from "../StudentAuthForm";
import React from "react";


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
            onClick={() => setUserType(userType === 'Student' ? 'Teacher' : 'Student')}
          >
            <RefreshCcw className="mr-2" size={15} /> Switch to {userType === 'Student' ? 'Teacher' : 'Student'}
          </Button>
        )}


          {!userType ? (
            <div className="flex flex-col items-center space-y-4">
              <h3 className="text-3xl font-semibold">Who are you?</h3>
              <SetUserTypeButton userType="Student" onClick={() => setUserType("Student")} bg="bg-green-500" />

              <SetUserTypeButton userType="Teacher" onClick={() => setUserType("Teacher")} bg="bg-blue-500"  />
            </div>
          ) : (
            <>
              {userType === "Teacher" ? <AuthForm /> : <StudentAuthForm />}
              <TermsAndPrivacy />
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-center">
            <CreditCard />
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginCard;

const SetUserTypeButton = ({bg,userType,onClick,}: {bg?: string;userType: "Student" | "Teacher";onClick: ()=>void;}) => (
  <Button className={`w-full py-2 ${bg}`} onClick={onClick}  >
    {userType}
  </Button>
);


const TermsAndPrivacy = () => (
  <p className="mt-6 text-gray-500 text-center text-sm">
    By clicking continue, you agree to our{" "}
    <Link href="/terms" className="underline text-blue-500 hover:text-blue-700">
      Terms of Service
    </Link>{" "}
    and{" "}
    <Link href="/privacy" className="underline text-blue-500 hover:text-blue-700">
      Privacy Policy
    </Link>
    .
  </p>
);

const CreditCard =()=>(
  <blockquote className="space-y-2">
  <footer className="text-[15px] font-semibold">
    Engineered By -{" "}
    <a
      href="https://www.google.com/search?q=omkar+chebale"
      target="_blank"
      rel="noopener noreferrer"
      className="underline text-blue-500 hover:text-blue-700"
    >
      Omkar Chebale and Team
    </a>
  </footer>
</blockquote>
)

