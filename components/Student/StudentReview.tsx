import { Student } from '@/types/student';
import Image from 'next/image';
import React from 'react'

interface StudentReviewInterface {
    studentDetails : Student;
}

const StudentReview = ( { studentDetails} : StudentReviewInterface ) => {
  return (
    <div className="container dark:text-white text-black  mx-auto p-6  rounded-lg shadow-lg max-w-4xl">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-32 h-32 md:w-40 md:h-40">
          <img
            src={studentDetails?.imageUrl}
            alt="Student Image"
            width={160}
            height={160}
            className="rounded-full border-4 border-blue-500"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4 ">
            {studentDetails?.name}
          </h2>
          <p className="text-lg  mb-2">
            <strong className="font-semibold">Student ID:</strong>{" "}
            {studentDetails?.studentId}
          </p>
          <p className="text-lg  mb-2">
            <strong className="font-semibold">Course:</strong>{" "}
            {studentDetails?.course}
          </p>
          <p className="text-lg  mb-2">
            <strong className="font-semibold">Age:</strong>{" "}
            {studentDetails?.age}
          </p>
          <p className="text-lg  mb-2">
            <strong className="font-semibold">Date of Birth:</strong>{" "}
            {new Date(studentDetails?.dateOfBirth).toLocaleDateString()}
          </p>
          <p className="text-lg  mb-2">
            <strong className="font-semibold">Gender:</strong>{" "}
            {studentDetails?.gender}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StudentReview
