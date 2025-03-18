
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
  BarChart,
  Bar,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

interface ImpactTimelineChartProps {
  timelineData: {
    month: number;
    financialImpact: number;
    hoursSaved: number;
    fteEquivalent: number;
  }[];
  maxMonths: number;
}

const ImpactTimelineChart: React.FC<ImpactTimelineChartProps> = ({
  timelineData,
  maxMonths,
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Financial Impact Over Time</h3>
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
                  tickFormatter={(value) => formatCurrency(value)}
                  label={{ 
                    value: 'Financial Impact', 
                    angle: -90, 
                    position: 'insideLeft' 
                  }}
                />
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Financial Impact']}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="financialImpact"
                  name="Financial Impact"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 3 }}
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
          <h3 className="text-lg font-medium mb-4">Resources Saved Over Time</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
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
                  yAxisId="left"
                  label={{ 
                    value: 'Hours Saved', 
                    angle: -90, 
                    position: 'insideLeft' 
                  }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  label={{ 
                    value: 'FTE Equivalent', 
                    angle: 90, 
                    position: 'insideRight' 
                  }}
                />
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    if (name === "Hours Saved") {
                      return [`${value.toLocaleString()} hours`, name];
                    }
                    return [`${value.toFixed(2)} FTE`, name]; 
                  }}
                  labelFormatter={(label) => `Month ${label}`}
                />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="hoursSaved"
                  name="Hours Saved"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="fteEquivalent"
                  name="FTE Equivalent"
                  stroke="#ff7300"
                  strokeWidth={2}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactTimelineChart;
