import React from "react";

const NoFinesMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-10 lg:p-20 bg-gray-50 min-h-screen">
      <div className="text-center p-6 sm:p-8 md:p-10 lg:p-12 bg-white shadow-lg rounded-lg w-full max-w-lg border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4">
          No Fines Created Yet
        </h2>
        <p className="text-base sm:text-lg  mb-4">
          Keep leading by example and inspiring students to follow the path of
          discipline.
        </p>
        <p className="text-sm sm:text-base text-yellow-300 mb-4">
          "True leadership lies in guiding others to success, and success is
          born from discipline and focus."
        </p>
        <p className="text-sm sm:text-base -500">
          Encourage positive habits and maintain the culture of discipline
          across your institution!
        </p>
      </div>
    </div>
  );
};

export default NoFinesMessage;
