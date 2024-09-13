"use client";

import { Button } from "../ui/button";
import ProtectedRoute from "../ProtectedRoute";
import Link from "next/link";
import Profile from "../shared/Profile";
import FinesTable from "../FinesTable";

const HeadAdminProfile = () => {
  return (
    <ProtectedRoute allowedRoles={["HeadAdmin"]}>
      <Profile />

      <div className="mt-10 flex flex-col items-center space-y-4">
        <div className="w-full max-w-xs md:max-w-md">
          <Link href={`/dashboard`}>
            <Button className="w-full p-4 text-xl font-medium text-center text-blue-700  rounded-md shadow-md">
              View Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <FinesTable />
    </ProtectedRoute>
  );
};

export default HeadAdminProfile;
