import React, { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface LoanTrend {
  date: string;
  booksLoaned: number;
  booksReturned: number;
  overdueBooks: number;
}

const dummyData: LoanTrend[] = [
  { date: "2024-06-01", booksLoaned: 15, booksReturned: 10, overdueBooks: 2 },
  { date: "2024-06-02", booksLoaned: 20, booksReturned: 12, overdueBooks: 3 },
  { date: "2024-06-03", booksLoaned: 18, booksReturned: 15, overdueBooks: 1 },
  { date: "2024-06-04", booksLoaned: 25, booksReturned: 20, overdueBooks: 5 },
  { date: "2024-06-05", booksLoaned: 22, booksReturned: 18, overdueBooks: 4 },
  { date: "2024-06-06", booksLoaned: 30, booksReturned: 25, overdueBooks: 6 },
  { date: "2024-06-07", booksLoaned: 28, booksReturned: 23, overdueBooks: 5 },
  { date: "2024-06-08", booksLoaned: 35, booksReturned: 30, overdueBooks: 7 },
  { date: "2024-06-09", booksLoaned: 40, booksReturned: 33, overdueBooks: 6 },
  { date: "2024-06-10", booksLoaned: 38, booksReturned: 35, overdueBooks: 8 },
];

export function LoanTrends_table() {
  const [chartData, setChartData] = useState<LoanTrend[]>([]);
  //update this later but if the returning array is empty, it will not show the graph so just here it shows a dummy data
  useEffect(() => {
    fetch('http://localhost:3000/books/loan-trends')
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          setChartData(dummyData);
        } else {
          setChartData(data);
        }
      })
      .catch(error => {
        console.error('Error fetching loan trends:', error);
        setChartData(dummyData); // only returns dummy data in case of error or empty response []
      });
  }, []);

  return (
    <Card className="w-[650px] h-[400px]">
      <CardHeader>
        <CardTitle>Loan Trends</CardTitle>
        <CardDescription>June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <LineChart
          width={600}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="booksLoaned" stroke="#8884d8" />
          <Line type="monotone" dataKey="booksReturned" stroke="#82ca9d" />
          <Line type="monotone" dataKey="overdueBooks" stroke="#ff7300" />
        </LineChart>
      </CardContent>
    </Card>
  );
}