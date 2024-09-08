
import React from "react";
import FinesTable from "../FinesTable";
import ProtectedRoute from "../ProtectedRoute";
import Profile from "../shared/Profile";

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
      <ProtectedRoute allowedRoles={["Admin"]}>
        {userData && (
          <Profile
            userData={userData}
            institutionData={institutionData}
            handleLogout={handleLogout}
          />
        )}
      <FinesTable />
      </ProtectedRoute>
    </>
  );
};

export default AdminProfile;
