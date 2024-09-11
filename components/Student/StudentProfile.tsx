import React from "react";
import { Button } from "../ui/button";
import RewardBadge from "../RewardBadge";
import { Separator } from "../ui/separator";
import Image from "next/image";
import Link from "next/link";
import StudentFinesTable from "@/components/StudentFinesTable";
import ProtectedRoute from "../ProtectedRoute";
import { ScrollArea } from "../ui/scroll-area";
import { User } from "@/types/User";
import { Institution } from "@/types/Institution";




const StudentProfile = ({userData,institutionData,handleLogout}:{userData:User , institutionData:Institution |null, handleLogout : ()=>void }) => {
  return (
    <ProtectedRoute allowedRoles={["Student"]}>
      {userData && (
        <div className="p-6 rounded-lg shadow-lg dark:border-white dark:bg-gray-800">
          {/* Profile Section */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="w-24 h-24 mb-4 md:mb-0">
                {userData.imageUrl ? (
                  <img
                    height={100}
                    width={100}
                    className="rounded-full border-2 border-slate-100"
                    src={userData.imageUrl}
                    alt="User Image"
                  />
                ) : (
                  <img
                    height={100}
                    width={100}
                    className="rounded-full border-2 border-slate-100"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                    alt="Default User Image"
                  />
                )}
              </div>

              <div className="ml-0 md:ml-6  md:text-left">
                <h2 className="text-2xl font-semibold mb-1">{userData.name}</h2>
                <strong>Email: {userData.email}</strong>

                <div className="flex items-center gap-3 justify-between font-bold mt-3">
                  <RewardBadge
                    label="Reputation"
                    icon="Trophy"
                    iconColor="yellow"
                    Number={userData.reputation}
                    tooltipText="Maintain reputation to become DisciplineX SuperStar"
                  />

                  <Separator
                    orientation="vertical"
                    className="bg-white h-7 w-[2px]"
                  />

                  <RewardBadge
                    label="Streak"
                    icon="Flame"
                    iconColor="orange"
                    Number={userData.streak}
                    tooltipText="Increase streak to get dxPoints and redeem them at stores"
                  />

                  <Button
                    className="bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded"
                    onClick={handleLogout} >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
            
          </div>

          {/* Institution Section */}
          {institutionData && (
            <div className="mt-4 flex max-sm:flex-col items-center justify-between gap-2">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Institution Details
                </h3>
                <p>
                  Institution Name:{" "}
                  <Link href={institutionData.website}>
                    <span className="font-semibold underline">
                      {institutionData.name}
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fines Table */}
      <ScrollArea className="h-screen p-4 border mt-5">
        <StudentFinesTable />
      </ScrollArea>
    </ProtectedRoute>
  );
};

export default StudentProfile;
