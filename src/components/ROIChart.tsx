
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
}

const ROIChart: React.FC<ROIChartProps> = ({ industry, className }) => {
  if (!industry.departmentROI || industry.departmentROI.length === 0) {
    return (
      <div className={`p-4 bg-gray-100 rounded-lg text-center ${className}`}>
        <p className="text-gray-500">No ROI data available for this industry</p>
      </div>
    );
  }

  // Sort departments by ROI for better visualization
  const sortedDepartments = [...industry.departmentROI].sort((a, b) => b.roi - a.roi);
  
  // Prepare data for chart
  const chartData = sortedDepartments.map(dept => ({
    name: dept.name,
    roi: dept.roi,
  }));

  const config = {
    roi: {
      label: "ROI %",
      color: "#0f766e" // teal-700
    }
  };

  const getBarColor = (roi: number) => {
    if (roi >= 70) return "#059669"; // emerald-600
    if (roi >= 50) return "#0d9488"; // teal-600
    if (roi >= 30) return "#0891b2"; // cyan-600
    return "#0284c7"; // sky-600
  };

  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-center">
        Department-Specific ROI in {industry.name}
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
        Average industry ROI: {industry.overallROI}%
      </div>
    </div>
  );
};

export default ROIChart;
