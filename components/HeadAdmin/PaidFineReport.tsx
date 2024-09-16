import React, { useRef } from 'react';
import CustomTable from '@/components/tables/CustomTable';
import { FineReport } from './ReportMetric';
import { useReactToPrint } from 'react-to-print';
import { Button } from '../ui/button';
import VerifiedBadge from '../VerifiedBadge';

const PaidFineReport = ({ data, reportName }: { data: FineReport[]; reportName: string }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const handleReportPrint = () => {
    handlePrint();
  };

  const columns = [
    { header: 'Student ID', accessor: 'studentId' },
    { header: 'Student Name', accessor: 'student_name' },
    { header: 'Reason', accessor: 'reason' },
    { header: 'Amount(₹)', accessor: 'amount' },
    { header: 'Status', accessor: 'status' },
    { header: 'Issued By', accessor: 'issuedBy' },
    { header: 'Date', accessor: 'issuedAt' },
  ];

  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="flex item-center justify-end mt-4">
            <Button onClick={handleReportPrint}>Print</Button>
          </div>
          <div ref={tableRef} className="m-2">
            <h2 className="text-2xl font-bold mb-4">Fine Report Data: {reportName}</h2>
            <CustomTable columns={columns} data={data} />
            <VerifiedBadge />
          </div>
        </>
      ) : (
        <div className="mt-6">
          <p className="text-lg font-semibold mb-4">No Paid Fine</p>
        </div>
      )}
    </>
  );
};

export default PaidFineReport;
