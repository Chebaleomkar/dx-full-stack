import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useInstitution from "@/hooks/useInstitution";
import { FineItem } from "@/types/Institution";

export default function FineInformation() {
  const { institutionData, loading: institutionLoading  , error:institutionError} = useInstitution();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Fine Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Reason</TableHead>
              <TableHead className="text-right">Amount (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {institutionData?.fineItems?.map((item:FineItem) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item?.label}</TableCell>
                <TableCell className="text-right">{item?.value}</TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
        
      </CardContent>
    </Card>
  )
}