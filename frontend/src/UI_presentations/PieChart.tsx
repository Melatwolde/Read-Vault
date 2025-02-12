"use client";

import * as React from "react";
import { PieChart, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart as RechartsPieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { country: "USA", visitors: 275, fill: "var(--color-usa)" },
  { country: "Canada", visitors: 200, fill: "var(--color-canada)" },
  { country: "UK", visitors: 287, fill: "var(--color-uk)" },
  { country: "Germany", visitors: 173, fill: "var(--color-germany)" },
  { country: "Australia", visitors: 190, fill: "var(--color-australia)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  usa: {
    label: "USA",
    color: "hsl(var(--chart-1))",
  },
  canada: {
    label: "Canada",
    color: "hsl(var(--chart-2))",
  },
  uk: {
    label: "UK",
    color: "hsl(var(--chart-3))",
  },
  germany: {
    label: "Germany",
    color: "hsl(var(--chart-4))",
  },
  australia: {
    label: "Australia",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function CustomPieChart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col w-[400px] h-[400px]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Visitors acrross the globe</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RechartsPieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="country"
              innerRadius={60}
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </RechartsPieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}