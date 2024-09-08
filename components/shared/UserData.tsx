import { User } from '@/types/User';
import React from 'react'

const UserData = ({userData}: {userData : User}) => {
  return (
    <>
    { userData && <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
      <div className="w-24 h-24">
        <img
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
      <div className="ml-0 sm:ml-4 mt-4 sm:mt-0">
        <h2 className="text-xl sm:text-2xl font-semibold mb-1">
          {userData.name}
        </h2>
        <p className="text-sm sm:text-base">Email: {userData?.email}</p>
        {userData.role && (
          <p className="text-sm sm:text-base">Role: {userData?.role}</p>
        )}
      </div>
    </div>}
    </>
  );
}

export default UserData
