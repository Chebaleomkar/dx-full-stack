"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {BASE_URL} from '@/constant'
import { getInstitutionId } from "@/utils/getInstitutionId";
// Chart configuration
const chartConfig = {
  views: {
    label: "Fines",
  },
  paid: {
    label: "Paid",
    color: "hsl(var(--chart-1))",
  },
  unpaid: {
    label: "Unpaid",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarGraph() {
  const [activeTab, setActiveTab] =
    React.useState<keyof typeof chartConfig>("unpaid");
  const [chartData, setChartData] = React.useState<any[]>([]);

  const institutionId = getInstitutionId();
  React.useEffect(() => {
    const fetchChartData = async () => {
      try {
        const cachedData = sessionStorage.getItem("fineData");
        if (cachedData) {
          setChartData(JSON.parse(cachedData));
        } else {
          const response = await fetch(
            `${BASE_URL}/fine/last-7-days/${institutionId}`
          );
          
          const data = await response.json();

          // Process data
          const filteredData = data.recentFines.reduce(
            (acc: any, fine: any) => {
              const date = new Date(fine.issuedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });

              if (!acc[date]) {
                acc[date] = { date, paid: 0, unpaid: 0 };
              }

              if (fine.status === "paid") {
                acc[date].paid += fine.amount;
              } else {
                acc[date].unpaid += fine.amount;
              }

              return acc;
            },
            {}
          );

          const processedData = Object.values(filteredData);

          // Cache the data in sessionStorage
          sessionStorage.setItem("fineData", JSON.stringify(processedData));
          setChartData(processedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchChartData();
  }, []);

  // Calculate totals for the current tab
  const total = React.useMemo(
    () => ({
      paid: chartData.reduce((acc, curr) => acc + curr.paid, 0),
      unpaid: chartData.reduce((acc, curr) => acc + curr.unpaid, 0),
    }),
    [chartData]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Fines</CardTitle>
          <CardDescription>
            Showing total fines for the last 7 days
          </CardDescription>
        </div>
        <div className="flex">
          {["paid", "unpaid"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeTab === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveTab(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[chart as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="amount"
                  labelFormatter={(value) => {
                    return value;
                  }}
                />
              }
            />
            <Bar dataKey={activeTab} fill={`var(--color-${activeTab})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
