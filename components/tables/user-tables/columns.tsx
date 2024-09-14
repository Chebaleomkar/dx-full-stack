'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Student } from '@/types/student';

export const columns: ColumnDef<Student> [] = [
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'studentId',
    header: 'STUDENTID'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'course',
    header: 'COURSE'
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
