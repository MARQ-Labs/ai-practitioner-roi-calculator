
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface ROITimelineChartProps {
  timelineData: {
    month: number;
    roi: number;
    netBenefit: number;
    cumulativeCost: number;
    cumulativeBenefit: number;
  }[];
  maxMonths: number;
  costStructure: {
    isRecurring: boolean;
    initialCost: number;
  };
}

const ROITimelineChart: React.FC<ROITimelineChartProps> = ({
  timelineData,
  maxMonths,
  costStructure
}) => {
  // Find break-even point (month where netBenefit becomes positive)
  const breakEvenPoint = timelineData.find(data => data.netBenefit >= 0)?.month || 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Return on Investment Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="month" 
                  label={{ 
                    value: 'Months', 
                    position: 'insideBottom', 
                    offset: -5 
                  }} 
                />
                <YAxis 
                  label={{ 
                    value: 'ROI (%)', 
                    angle: -90, 
                    position: 'insideLeft' 
                  }}
                  tickFormatter={(value) => `${value.toFixed(0)}%`}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}%`, 'ROI']}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
                {breakEvenPoint > 0 && (
                  <ReferenceLine
                    x={breakEvenPoint}
                    stroke="#2e7d32"
                    strokeDasharray="5 5"
                    label={{ value: 'Break Even', position: 'top', fill: '#2e7d32' }}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="roi"
                  name="ROI"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 8 }}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Costs vs. Benefits Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={timelineData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  dataKey="month"
                  label={{ 
                    value: 'Months', 
                    position: 'insideBottom', 
                    offset: -5 
                  }}
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                  label={{ 
                    value: 'Amount', 
                    angle: -90, 
                    position: 'insideLeft' 
                  }}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), '']}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Legend />
                {breakEvenPoint > 0 && (
                  <ReferenceLine
                    x={breakEvenPoint}
                    stroke="#2e7d32"
                    strokeDasharray="5 5"
                    label={{ value: 'Break Even', position: 'top', fill: '#2e7d32' }}
                  />
                )}
                <Line
                  type="monotone"
                  dataKey="cumulativeCost"
                  name="Total Cost"
                  stroke="#ff7300"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="cumulativeBenefit"
                  name="Total Benefit"
                  stroke="#4caf50"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="netBenefit"
                  name="Net Benefit"
                  fill="#82ca9d"
                  stroke="#82ca9d"
                  fillOpacity={0.3}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROITimelineChart;
