
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
  timeHorizon?: number;
  adoptionRate?: number;
}

const ROIChart: React.FC<ROIChartProps> = ({ 
  industry, 
  className, 
  timeHorizon = 12,
  adoptionRate = 70
}) => {
  // Create default data if no industry data is available
  const fallbackData = [
    { name: "Marketing", roi: 41 },
    { name: "Operations", roi: 39 },
    { name: "Customer Service", roi: 74 },
    { name: "Executive", roi: 38 },
    { name: "Finance", roi: 35 }
  ];
  
  // Use industry data if available, otherwise use fallback data
  const departmentROI = (industry?.departmentROI && industry.departmentROI.length > 0)
    ? industry.departmentROI
    : fallbackData;
    
  console.log("ROI Chart rendering with data:", { 
    industryId: industry?.id || "unknown", 
    hasData: Boolean(industry?.departmentROI?.length),
    departmentCount: departmentROI.length,
    timeHorizon,
    adoptionRate,
    usingFallback: !(industry?.departmentROI && industry.departmentROI.length > 0)
  });

  // Sort departments by ROI for better visualization
  const sortedDepartments = [...departmentROI].sort((a, b) => b.roi - a.roi);
  
  // Prepare data for chart and adjust ROI based on time horizon and adoption rate
  const timeHorizonAdjustment = timeHorizon / 12;
  const adoptionFactor = adoptionRate / 100;
  
  // For very short horizons, adjust ROI to show negative values
  const breakEvenThreshold = 4; // months below which ROI starts becoming negative
  
  const getTimeAdjustedROI = (roi: number) => {
    if (timeHorizon <= breakEvenThreshold) {
      // Calculate negative ROI for very short time periods
      const baseNegativeRoi = -25; // starting point
      const timeProgress = timeHorizon / breakEvenThreshold;
      return baseNegativeRoi + (timeProgress * 25 * adoptionFactor);
    }
    return roi * timeHorizonAdjustment * adoptionFactor;
  };
  
  const chartData = sortedDepartments.map(dept => ({
    name: dept.name,
    roi: Math.round(getTimeAdjustedROI(dept.roi) * 10) / 10, // Adjust ROI based on time horizon and adoption
  }));

  const config = {
    roi: {
      label: "ROI %",
      color: "#0f766e" // teal-700
    }
  };

  const getBarColor = (roi: number) => {
    if (roi < -15) return "#ef4444"; // red-500 for very negative ROI
    if (roi < 0) return "#f59e0b"; // amber-500 for slightly negative ROI
    if (roi >= 70) return "#059669"; // emerald-600
    if (roi >= 50) return "#0d9488"; // teal-600
    if (roi >= 30) return "#0891b2"; // cyan-600
    return "#0284c7"; // sky-600
  };

  const industryName = industry?.name || "Your Industry";
  const industryAvgROI = industry?.overallROI 
    ? (industry.overallROI * timeHorizonAdjustment * adoptionFactor).toFixed(1) 
    : "30.0";

  return (
    <div className={`p-4 bg-white rounded-lg shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold mb-4 text-center">
        Department-Specific ROI in {industryName} ({timeHorizon}-Month Projection)
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
        {timeHorizon < breakEvenThreshold 
          ? `${timeHorizon}-Month Industry Average ROI: Negative (investment phase)` 
          : `${timeHorizon}-Month Industry Average ROI: ${industryAvgROI}%`
        }
      </div>
      {timeHorizon <= breakEvenThreshold && (
        <div className="mt-2 text-xs text-amber-600 text-center">
          Note: ROI is typically negative in the first {breakEvenThreshold} months during initial implementation and training
        </div>
      )}
    </div>
  );
};

export default ROIChart;
