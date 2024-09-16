import React, { useRef } from 'react';
import { FineReport } from './ReportMetric';
import { useReactToPrint } from 'react-to-print';
import { Button } from '../ui/button';
import DxIcon from '../Icons/DxIcon';
import CustomTable from '@/components/tables/CustomTable';
import VerifiedBadge from '../VerifiedBadge';

const UnPaidFineReport = ({ data, reportName }: { data: FineReport[]; reportName: string }) => {
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
        <div>
          <p className="text-lg font-semibold mb-4">No UnPaid Fines</p>
        </div>
      )}
    </>
  );
};

export default UnPaidFineReport;
