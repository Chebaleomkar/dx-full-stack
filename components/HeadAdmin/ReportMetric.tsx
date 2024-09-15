'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getInstitutionId } from "@/utils/getInstitutionId";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { BadgeInfo } from 'lucide-react';
import { Heading } from '@/components/ui/heading';
import { ChevronDownIcon, CalendarIcon } from "lucide-react";
import PaidFineReport from "./PaidFineReport";
import UnPaidFineReport from "./UnPaidFineReport";
import useInstitution from "@/hooks/useInstitution";

const getAvailableMonths = (createdAt: string) => {
  const availableMonths: string[] = [];
  const institutionCreatedDate = new Date(createdAt);
  const currentDate = new Date();

  for (let month = institutionCreatedDate.getMonth(); month <= currentDate.getMonth(); month++) {
    const monthName = new Date(currentDate.getFullYear(), month).toLocaleString('default', { month: 'long' });
    availableMonths.push(monthName);
  }

  return availableMonths;
};

export type FineReport = {
  studentId: string;
  student: { name: string; studentId: string; };
  reason: string;
  amount: number;
  issuedBy: { name: string; };
  issuedAt: string;
  status: string;
};

export const ReportMetric = () => {
  const [fineData, setFineData] = useState<FineReport[]>([]);
  const [availableMonths, setAvailableMonths] = useState<string[]>([]);
  const [showYearOption, setShowYearOption] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("today");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const infoMessage  = 'Select the filter type and then click on "Generate Report" button to see the data.'
  const institutionId = getInstitutionId();
  const {institutionData} = useInstitution();

  useEffect(()=>{
    if(institutionData){
      const institutionCreatedDate :any = institutionData?.createdAt;
      const sixMonthsLater = new Date(institutionCreatedDate);
        sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
        setShowYearOption(new Date() >= sixMonthsLater);
  
        setAvailableMonths(getAvailableMonths(institutionCreatedDate));
    }

  },[institutionData])

  const handleGenerateReport = async () => {
    setIsLoading(true);
    let queryParams: { filterType: string; selectedMonth?: string } = { filterType: selectedFilter };

    if (selectedFilter === "month" && selectedMonth) {
      queryParams.selectedMonth = selectedMonth;
    }

    try {
      const response = await axios.get(`/api/fine/last-days/${institutionId}/`, { params: queryParams });
      setFineData(response.data);
    } catch (error) {
      console.error("Error generating fine report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    if (value !== "month") {
      setSelectedMonth("");
    }
  };

  const getReportTitle = () => {
    if (selectedFilter === "month" && selectedMonth) {
      return `${selectedMonth} ${new Date().getFullYear()}`;
    }
    return selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1);
  };

  return (
    <div className="space-y-6 p-6 rounded-lg shadow-md">
      <div className="flex items-start justify-between">
        <Heading title={`Report Metrics`} description="Get Reports Here" />
      </div>

      <div className="flex flex-row " >
          <BadgeInfo size={15} />
          <p className="text-xs"> {infoMessage} </p>
        </div>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[200px] justify-between">
              {selectedFilter === "month" && selectedMonth
                ? `${selectedMonth}`
                : selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1) || "Select filter"}
              <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuRadioGroup value={selectedFilter} onValueChange={handleFilterChange}>
              {showYearOption && <DropdownMenuRadioItem value="year">Year</DropdownMenuRadioItem>}
              <DropdownMenuRadioItem value="fortnight">Fortnight <sub>(15 days)</sub></DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="week">Week</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="today">Today</DropdownMenuRadioItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>Month</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="p-0">
                  <div className="max-h-[200px] overflow-y-auto">
                    {availableMonths.map((month) => (
                      <DropdownMenuItem key={month} onSelect={() => {
                        setSelectedFilter("month");
                        setSelectedMonth(month);
                      }}>
                        {month}
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={handleGenerateReport} disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Report"}
        </Button>
        
      </div>

      <h3 className="text-2xl font-bold mt-4">
        Generate Fine Report: {getReportTitle()}
      </h3>

      {fineData.length > 0 ? (
        <Tabs defaultValue="unpaid" className="mt-3">
          <TabsList>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
          </TabsList>
          <TabsContent value="paid">
            <PaidFineReport data={fineData.filter((fine) => fine.status === "paid")} reportName={getReportTitle()} />
          </TabsContent>
          <TabsContent value="unpaid">
            <UnPaidFineReport data={fineData.filter((fine) => fine.status === "unpaid")} reportName={getReportTitle()} />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex items-center justify-center p-4 bg-gray-100 border-2 rounded-lg shadow-md mt-4">
          <p className="text-center text-black">
            {infoMessage}
          </p>
        </div>
      )}
    </div>
  );
};
