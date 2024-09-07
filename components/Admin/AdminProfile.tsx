import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';
import FinesTable from '../FinesTable';
import ProtectedRoute from '../ProtectedRoute';

const AdminProfile = ({
  userData,
  institutionData,
  handleLogout,
}: {
  userData: any;
  institutionData: any;
  handleLogout: () => void;
}) => {

  return (
    <>
    <ProtectedRoute allowedRoles={["Admin"]} >
      {userData && (
        <div className="p-6 rounded-lg shadow-lg border dark:border-white border-white mb-3 dark:bg-gray-800">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="w-24 h-24 mb-4 md:mb-0">
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
            <div className="ml-0 md:ml-6 text-center md:text-left">
              <h2 className="text-2xl font-semibold mb-1">{userData.name}</h2>
              <p>Email: {userData.email}</p>
              {userData.role && <p>Role: {userData.role}</p>}
            </div>
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
              <Button
                className="mt-6 bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
      <FinesTable />
    </ProtectedRoute>
    </>
  );
};

export default AdminProfile;
