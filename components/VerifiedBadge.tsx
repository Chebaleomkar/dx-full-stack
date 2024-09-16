import React from 'react';
import DxIcon from '@/components/Icons/DxIcon'; 
import { MdOutlineVerifiedUser } from "react-icons/md";

const VerifiedBadge = () => {
  return (
    <div className="flex items-center justify-end ">
      <MdOutlineVerifiedUser size={55} fill='blue'  /> <DxIcon className="h-[20rem] w-[20rem] " /> 
    </div>
  );
};

export default VerifiedBadge;
