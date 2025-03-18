
import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";
import { Industry, DepartmentROI } from "@/models/calculator";

interface ROIChartProps {
  industry: Industry;
  className?: string;
  timeHorizon?: number; // Add timeHorizon as an optional prop
}

const ROIChart: React.FC<ROIChartProps> = ({ industry, className, timeHorizon = 12 }) => {
  if (!industry.departmentROI || industry.departmentROI.length === 0) {
    return (
      <div className={`p-4 bg-gray-100 rounded-lg text-center ${className}`}>
        <p className="text-gray-500">No ROI data available for this industry</p>
      </div>
    );
  }

  // Sort departments by ROI for better visualization
  const sortedDepartments = [...industry.departmentROI].sort((a, b) => b.roi - a.roi);
  
  // Prepare data for chart and adjust ROI based on time horizon
  const timeHorizonAdjustment = timeHorizon / 12;
  
  // For very short horizons, adjust ROI to potentially show negative values
  const baseThreshold = 3; // months below which ROI starts becoming negative
  const getTimeAdjustedROI = (roi: number) => {
    if (timeHorizon < baseThreshold) {
      // Calculate negative adjustment for very short time periods
      return roi * timeHorizonAdjustment - (20 / timeHorizon);
    }
    return roi * timeHorizonAdjustment;
  };
  
  const chartData = sortedDepartments.map(dept => ({
    name: dept.name,
    roi: Math.round(getTimeAdjustedROI(dept.roi) * 10) / 10, // Adjust ROI based on time horizon
  }));

  const config = {
    roi: {
      label: "ROI %",
      color: "#0f766e" // teal-700
    }
  };

  const getBarColor = (roi: number) => {
    if (roi < 0) return "#f59e0b"; // amber-500
    if (roi >= 70) return "#059669"; // emerald-600
    if (roi >= 50) return "#0d9488"; // teal-600
    if (roi >= 30) return "#0891b2"; // cyan-600
    return "#0284c7"; // sky-600
  };

  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-center">
        Department-Specific ROI in {industry.name} ({timeHorizon}-Month Projection)
      </h3>
      <ChartContainer config={config} className="h-80 w-full">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name"
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            tick={{ fontSize: 10 }}
          />
          <YAxis
            label={{ value: 'ROI %', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
            tick={{ fontSize: 10 }}
          />
          <ChartTooltip
            content={<ChartTooltipContent />}
          />
          <Bar dataKey="roi" name="ROI %">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.roi)} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
      <div className="mt-4 text-xs text-gray-500 text-center">
        {timeHorizon}-Month Industry Average ROI: {
          timeHorizon < baseThreshold 
            ? ((industry.overallROI || 0) * timeHorizonAdjustment - (20 / timeHorizon)).toFixed(1) 
            : (industry.overallROI ? (industry.overallROI * timeHorizonAdjustment).toFixed(1) : "0")
        }%
      </div>
    </div>
  );
};

export default ROIChart;
