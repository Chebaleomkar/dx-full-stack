
import React from "react";
import FinesTable from "../FinesTable";
import ProtectedRoute from "../ProtectedRoute";
import Profile from "../shared/Profile";

const AdminProfile = () => {
  return (
    <>
      <ProtectedRoute allowedRoles={["Admin"]}>
        <Profile  />
        {/* Admin fine table */}
        <FinesTable />
      </ProtectedRoute>
    </>
  );
};

export default AdminProfile;
