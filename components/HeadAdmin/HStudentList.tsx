import React from 'react'
import StudentList from '../superadmin/StudentList';

const HStudentList = ({ institutionId }: { institutionId: string }) => {
  return <StudentList api={`/student/institution/${institutionId}`} />;
};

export default HStudentList
