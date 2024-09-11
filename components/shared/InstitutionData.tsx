import { Institution } from '@/types/Institution';
import React from 'react'

const InstitutionData = ({institutionData} : {institutionData : Institution}) => {
  return (
    <>
     {institutionData &&  <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            Institution Details
          </h3>
          <p className="text-sm sm:text-base">
            Institution Name:{" "}
            <span className="font-semibold">{institutionData?.name}</span>
          </p>
        </div>
      </div>}
    </>
  );
}

export default InstitutionData
