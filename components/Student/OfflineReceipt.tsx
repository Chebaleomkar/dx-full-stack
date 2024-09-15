import React, { useRef , useState } from "react";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";
import { Fine } from "@/types/Fine";
import useUser from "@/hooks/useUser";
import DxIcon from "../Icons/DxIcon";
import converter from 'number-to-words'
import { formatDate } from "@/utils/formatDate";
import { FiFileText, FiLoader } from "react-icons/fi";



const OfflineReceipt = ({ fineData }: { fineData: Fine }) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  const receiptRef = useRef<HTMLDivElement | null>(null);
  const { userData } = useUser();
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
  });

  const handlePrintReceipt = () => {
    setLoading(true);
    setShowReceipt(true);
    setTimeout(() =>{
      setLoading(false)
        handlePrint()
      // setShowReceipt(false)
    }, 1000); 
  };

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="outline"
        onClick={handlePrintReceipt}
        className="w-full border-indigo-600 text-white font-bold bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center gap-2 shadow-lg"
      >
        {loading ? (
          <FiLoader className="animate-spin" /> 
        ) : (
          <FiFileText /> 
        )}
        {loading ? "Generating..." : "Generate Receipt"}
      </Button>
      
      {/* Part that will be printed */}
      {showReceipt &&( <div ref={receiptRef} className="border p-4 ">
        {/* Header logo */}
        <div className="flex flex-row items-center justify-between flex-wrap space-y-4 md:space-y-0 md:flex-nowrap mb-4">
          {/* Left section with DxIcon and DisciplineX */}

          <div className="flex items-center space-x-2 ml-10">
            <div className="dark:bg-white rounded-full p-2">
              <DxIcon className="h-52 w-52" />
            </div>
          </div>
          
          {/* Right section with college details */}
          <div className="text-center md:text-right">
            <p className="text-sm md:text-base">Shiv Chhatrapati Shikshan Sanstha's</p>
            <p className="text-base md:text-lg font-bold">RAJARSHI SHAHU MAHAVIDYALAYA, LATUR</p>
            <p className="text-xs md:text-sm">AUTONOMOUS</p>
            <p className="text-xs md:text-sm">Opp. Central Bus Stand, Kaku Seth</p>
            <p className="text-xs md:text-sm">Ullka Marg, Chandra Nagar, Latur, Maharashtra</p>
          </div>
        </div>

        {/* Title of the receipt */}
        <div className="text-center">
          <p className="font-bold">SENIOR COLLEGE NON GRANT</p>
        </div>

        {/* User details */}
        {userData && (
          <div className="border p-4 mt-4">
            <p>
              Name: <span className="font-bold">{userData?.name}</span>
            </p>
            <p>
              Student Id: <span className="font-bold">{userData?.studentId}</span>
            </p>
            <p>
              Date: <span className="font-bold">{formatDate(new Date())}</span>
            </p>
            <p>
              Class: <span className="font-bold">{userData?.course}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col h-[400px] justify-between " >
          <div className="border-t border-b my-4">
              <div className="flex justify-between p-2">
                <p>Received the Following</p>
                <p>(₹) Amount</p>
              </div>
              <div className="flex justify-between p-2">
                <p>{fineData?.reason}</p>
                <p>₹ {fineData?.amount}</p>
              </div>
          </div>

          <div  className="flex justify-between p-2">
                <p>Total :</p>
                
                <span>In words : <strong className="font-bold" > {converter.toWords(fineData?.amount)} only </strong></span>
                <strong>₹ {fineData?.amount}</strong>
          </div>
        </div>

        <hr />
        <div className="p-2">
          <p>This document is digital copy and does not require the RECEIVER's signature</p>
        </div>     
      </div>)}
    </div>
  );
};

export default OfflineReceipt;