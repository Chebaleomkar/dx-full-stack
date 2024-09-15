import React , {useRef} from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useReactToPrint } from "react-to-print";
import { FineReport } from './ReportMetric'
import { Button } from '../ui/button';
import DxIcon from '../Icons/DxIcon';

const UnPaidFineReport = ({data , reportName}:{data : FineReport[] , reportName : string}) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  const handleReportPrint = () =>{
    handlePrint();
  }
  return (
    <>
    {data.length > 0 ? (
      <>
        <div className="flex item-center justify-end mt-4" >
        <Button  onClick={handleReportPrint} > Print </Button>
        </div> 
        <div ref={tableRef}  className="m-2">
          <h2 className="text-2xl font-bold mb-4">Fine Report Data : {reportName}</h2>
          <div className="border rounded-lg overflow-y-auto mb-2">
            <Table>
              <TableHeader>
                <TableRow >
                  <TableHead className="font-bold">Student ID</TableHead>
                  <TableHead className="font-bold">Student Name</TableHead>
                  <TableHead className="font-bold">Reason</TableHead>
                  <TableHead className="font-bold">Amount(₹) </TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="font-bold">Issued By</TableHead>
                  <TableHead className="font-bold">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((fine:FineReport, index:number) => (
                  <TableRow key={index} >
                    <TableCell>{fine.student?.studentId}</TableCell>
                    <TableCell>{fine.student?.name}</TableCell>
                    <TableCell>{fine.reason}</TableCell>
                    <TableCell>{fine.amount.toFixed(2)}</TableCell>
                    <TableCell>{fine?.status}</TableCell>
                    <TableCell>{fine.issuedBy?.name}</TableCell>
                    <TableCell>{new Date(fine.issuedAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DxIcon />
        </div>
      </>
      ):(
        <div>
         <p className="text-lg font-semibold mb-4">No UnPaid Fines</p>
        </div>
      )}
      
    </>
  )
}

export default UnPaidFineReport
