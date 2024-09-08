"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import ProtectedRoute from "../ProtectedRoute";
import Link from "next/link";

const HeadAdminProfile = ({
  userData,
  institutionData,
  handleLogout,
}: {
  userData: any;
  institutionData: any;
  handleLogout: () => void;
}) => {
  return (
    <ProtectedRoute allowedRoles={["HeadAdmin"]}>
      {userData && (
        <div className="p-6 rounded-lg shadow-lg border dark:border-white border-white mb-3 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            {/* Left side with profile image and info */}
            <div className="flex items-center">
              <div className="w-24 h-24">
                <Image
                  height={100}
                  width={100}
                  className="rounded-full border-2 border-blue-500"
                  src={
                    userData.imageUrl
                      ? userData.imageUrl
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt="User Image"
                />
              </div>
              <div className="ml-4">
                <h2 className="text-2xl font-semibold mb-1">{userData.name}</h2>
                <p>Email: {userData.email}</p>
                {userData.role && <p>Role: {userData.role}</p>}
              </div>
            </div>

            {/* Right side with logout button */}
            <Button
              className="bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>

          {institutionData && (
            <div className="mt-4 flex max-sm:flex-col items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Institution Details
                </h3>
                <p>
                  Institution Name:{" "}
                  <span className="font-semibold">{institutionData.name}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 flex flex-col items-center space-y-4">
        <div className="w-full max-w-xs md:max-w-md">
          <Link href={`/dashboard`}>
            <Button className="w-full p-4 text-lg font-medium text-center bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md">
              View Dashboard
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-xs md:max-w-md">
          <Link href={`/reports`}>
            <Button className="w-full p-4 text-lg font-medium text-center bg-green-600 hover:bg-green-700 text-white rounded-md shadow-md">
              Generate Reports
            </Button>
          </Link>
        </div>

        <div className="w-full max-w-xs md:max-w-md">
          <Link href={`/settings`}>
            <Button className="w-full p-4 text-lg font-medium text-center bg-yellow-600 hover:bg-yellow-700 text-white rounded-md shadow-md">
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default HeadAdminProfile;
