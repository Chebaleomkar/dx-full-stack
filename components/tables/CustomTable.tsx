import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface CustomTableProps<T> {
  columns: { header: string; accessor: keyof T | string }[];
  data: T[];
}

const CustomTable = <T extends object>({ columns, data }: CustomTableProps<T>) => {
  return (
    <div className="border rounded-lg overflow-y-auto mb-2">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className="font-bold">
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.accessor === 'issuedAt' && item[column.accessor as keyof T]
                    ? new Date(item[column.accessor as keyof T] as string).toLocaleDateString()
                    : item[column.accessor as keyof T]?.toString()}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
