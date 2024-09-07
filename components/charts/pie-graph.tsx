"use client";

import * as React from "react";
import axios from "axios";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToken } from "@/utils/getToken";

interface Fine {
  status: "paid" | "unpaid";
  amount: number;
}

export function PieGraph() {
  const [data, setData] = React.useState<Fine[]>([]);
  const [totalFines, setTotalFines] = React.useState<number>(0);
  const [paidFines, setPaidFines] = React.useState<number>(0);
  const [unpaidFines, setUnpaidFines] = React.useState<number>(0);
  const [percentageChange, setPercentageChange] = React.useState<number>(0);
  const [isTrendingUp, setIsTrendingUp] = React.useState<boolean>(true);
  const token = getToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  React.useEffect(() => {
    // Fetch data from the API using axios
    axios
      .get("http://localhost:3001/fine", { headers })
      .then((response) => {
        const fines = response.data as Fine[];
        setData(fines);

        // Calculate total fines, paid fines, and unpaid fines
        const total = fines.length;
        const paid = fines.filter((fine) => fine.status === "paid").length;
        const unpaid = total - paid;

        setTotalFines(total);
        setPaidFines(paid);
        setUnpaidFines(unpaid);

        // Calculate percentage change
        if (total > 0) {
          const change = (paid / total) * 100;
          setPercentageChange(change);
          setIsTrendingUp(change >= 50); // assuming a baseline of 50% paid as "trending up"
        }
      })
      .catch((error) => {
        console.error("Error fetching fines data:", error);
      });
  }, []); // Removed headers from dependency array

  const chartData = [
    { name: "Paid", value: paidFines, fill: "#4CAF50" }, // Green color for Paid
    { name: "Unpaid", value: unpaidFines, fill: "#F44336" }, // Red color for Unpaid
  ];

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Fine Payment Status</CardTitle>
        <CardDescription>Distribution of Paid vs Unpaid Fines</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {totalFines > 0 ? (
          <PieChart className="mx-auto aspect-square max-h-[360px]">
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalFines}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Fines
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        ) : (
          <div className="text-center text-muted-foreground">
            No data available
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {isTrendingUp ? (
            <>
              Trending up by {percentageChange.toFixed(2)}% this month
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Trending down by {Math.abs(percentageChange).toFixed(2)}% this month
              <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the percentage of fines paid vs unpaid
        </div>
      </CardFooter>
    </Card>
  );
}
