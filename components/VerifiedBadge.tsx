import React from 'react';
import DxIcon from '@/components/Icons/DxIcon'; 
import { MdOutlineVerifiedUser } from "react-icons/md";
const VerifiedBadge = () => {
  return (
    <div className="flex items-center justify-end space-x-2 p-2 ">
      <MdOutlineVerifiedUser size={75} fill='blue'  /> <DxIcon className="h-72 w-72 " /> 
    </div>
  );
};

export default VerifiedBadge;
