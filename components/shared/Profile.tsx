
import { Institution } from '@/types/Institution';
import React from 'react'
import { Button } from "../ui/button";
import UserData from './UserData';
import InstitutionData from './InstitutionData';
import { User } from '@/types/User';

type ProfileType ={
    userData : User;
    institutionData : Institution | null;
    handleLogout : () =>void;
}

const Profile = ({userData , institutionData , handleLogout}:ProfileType) => {
  return (
    <div className="p-6 rounded-lg shadow-lg border dark:border-white border-white mb-3 dark:bg-gray-800">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        
        <UserData userData={userData} />
      
        <Button
          className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 font-semibold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      {institutionData && (
        <InstitutionData institutionData={institutionData} />
      )}
    </div>
  );
}

export default Profile
