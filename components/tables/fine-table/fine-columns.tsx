'use client';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/types/User';

export const TeacherColumns: ColumnDef<User> [] = [
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'role',
    header: 'ROLE'
  },
  {
    accessorKey: 'points',
    header: 'POINTS',
    
  },
];
