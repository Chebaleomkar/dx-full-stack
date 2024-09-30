"use client";

import ProtectedRoute from '@/components/ProtectedRoute';

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CreditCard, Receipt } from "lucide-react";
import useGetData from '@/hooks/useGetData';
import Loader from '@/components/Loader';
import { Fine } from '@/types/Fine';
import OfflineReceipt from "@/components/Student/OfflineReceipt";
interface PaymentPageProps {
  params: {
    paymentId: string;
  };
}
const PaymentPage: React.FC<PaymentPageProps> = ({ params }) => {
  const { paymentId } = params;
  const { data:fineData , loading, error } = useGetData<Fine>(`/fine/${paymentId}`);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <span>{error}</span>;
  }
  return (
    <ProtectedRoute allowedRoles={['Student']}>
      {fineData && <div className="flex min-h-screen items-center justify-center p-4"> 
        <Card className="w-full shadow-xl mt-6"> 
          <CardHeader className="bg-sky-500">
            <CardTitle className="text-2xl font-semibold  ">Fine Payment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 mt-3">
            <div className="text-center">
              <span className="text-5xl font-bold text-indigo-600">₹{fineData?.amount}</span>
            </div>
            <p className="text-lg text-center ">{fineData?.reason}</p>
            <div className="flex justify-center">
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  fineData?.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {fineData?.status.charAt(0).toUpperCase() + fineData?.status.slice(1)}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Tabs defaultValue="offline" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="online" className="flex items-center justify-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay Online
                </TabsTrigger>
                <TabsTrigger value="offline" className="flex items-center justify-center">
                  <Receipt className="w-4 h-4 mr-2" />
                  Pay Offline
                </TabsTrigger>
              </TabsList>
              <TabsContent value="online" className="mt-4">
                  <Badge variant="outline" className=" justify-center py-2 border border-orange-500 ">
                    Coming soon! We're working on this feature.
                  </Badge>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 mt-3 text-white">
                  Proceed to Online Payment
                </Button>
              </TabsContent>
              <TabsContent value="offline" className="mt-4">
                <OfflineReceipt fineData={fineData} />
              </TabsContent>
            </Tabs>
          </CardFooter>
        </Card>
      </div>}
    </ProtectedRoute>
)}
export default PaymentPage;
