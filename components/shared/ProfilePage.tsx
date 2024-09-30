"use client"
import React from 'react';
import UseDecodeToken from '@/hooks/useDecodeToken';
const StudentProfile = React.lazy(() => import("@/components/Student/StudentProfile"));
const AdminProfile = React.lazy(() => import("@/components/Admin/AdminProfile"));
const HeadAdminProfile = React.lazy(() => import("@/components/HeadAdmin/HeadAdminProfile"));


const ProfilePage = () => {

const {role} = UseDecodeToken();

const renderProfileComponent = () => {
    switch (role) {
    case "Student":
        return (<StudentProfile />);
    case "Admin":
        return (<AdminProfile />);
    case "HeadAdmin":
        return (<HeadAdminProfile/>);
    default:
        return null;
    }
};

return (
    <div style={{borderTop : "none"}} className="container mx-auto p-6 rounded-sm shadow-md dark:border-white border border-black mt-1">
        {renderProfileComponent()}
    </div>
)}

export default ProfilePage
