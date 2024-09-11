"use client";


import { Button } from "../ui/button";
import ProtectedRoute from "../ProtectedRoute";
import Link from "next/link";
import Profile from "../shared/Profile";

const HeadAdminProfile = () => {
  return (
    <ProtectedRoute allowedRoles={["HeadAdmin"]}>
      <Profile  />
      
      <div className="mt-8 flex flex-col items-center space-y-4">
        <div className="w-full max-w-xs md:max-w-md">
          <Link href={`/dashboard`}>
            <Button className="w-full p-4 text-lg font-medium text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md">
              View Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default HeadAdminProfile;
