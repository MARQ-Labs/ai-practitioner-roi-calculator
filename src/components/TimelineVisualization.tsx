
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
  ComposedChart,
  Bar
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TimelinePoint } from "@/models/calculator";
import { formatCurrency } from "@/lib/utils";

interface TimelineVisualizationProps {
  timelineData: TimelinePoint[];
  customCost?: number;
  className?: string;
}

const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({
  timelineData,
  customCost,
  className
}) => {
  // Find the break-even point (where cumulative return becomes positive)
  const breakEvenPoint = useMemo(() => {
    const breakEvenMonth = timelineData.findIndex(point => point.cumulativeReturn >= 0);
    return breakEvenMonth !== -1 ? timelineData[breakEvenMonth] : null;
  }, [timelineData]);
  
  // Format data for better display and handle NaN values
  const formattedData = useMemo(() => {
    return timelineData.map(point => ({
      ...point,
      // Format labels for better display
      formattedLabel: point.month === 0 ? "Start" : `M${point.month}`,
      // Format currency values
      formattedInvestment: formatCurrency(point.investment),
      formattedReturn: formatCurrency(point.cumulativeReturn),
      formattedROI: isNaN(point.roi) ? "N/A" : `${point.roi.toFixed(2)}%`,
      // Ensure numeric values are valid for charts
      roi: isNaN(point.roi) ? 0 : point.roi
    }));
  }, [timelineData]);
  
  // Calculate the maximum absolute value for setting chart domain
  const maxValue = Math.max(
    ...timelineData.map(p => Math.max(
      Math.abs(isNaN(p.cumulativeReturn) ? 0 : p.cumulativeReturn),
      isNaN(p.investment) ? 0 : p.investment
    ))
  );
  
  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Financial Impact Timeline</CardTitle>
          <CardDescription>
            Projected financial impact over time, showing the path to positive ROI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={formattedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="formattedLabel" 
                  label={{ 
                    value: 'Timeline (Months)', 
                    position: 'insideBottom', 
                    offset: -15 
                  }} 
                />
                <YAxis 
                  tickFormatter={(value) => formatCurrency(value)}
                  domain={[Math.floor(-maxValue * 1.1), Math.ceil(maxValue * 1.1)]}
                  label={{ 
                    value: 'Financial Impact', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === "Investment") return [formatCurrency(value as number), name];
                    if (name === "Cumulative Return") return [formatCurrency(value as number), name];
                    return [value, name];
                  }}
                  labelFormatter={(label) => `Timeline: ${label}`}
                />
                <Legend />
                
                {/* Initial investment shown as a bar */}
                <Bar 
                  dataKey="investment" 
                  name="Investment" 
                  fill="#f59e0b" 
                  barSize={30}
                />
                
                {/* Cumulative return shown as a line with area */}
                <Area
                  type="monotone"
                  dataKey="cumulativeReturn"
                  name="Cumulative Return"
                  stroke="#0ea5e9"
                  fill="rgba(14, 165, 233, 0.2)"
                  activeDot={{ r: 8 }}
                />
                
                {/* Reference line at y=0 to show break-even point */}
                <ReferenceLine 
                  y={0} 
                  stroke="#6b7280" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: 'Break-even', 
                    position: 'right', 
                    fill: '#6b7280',
                    fontSize: 12
                  }} 
                />
                
                {/* Mark break-even point if it exists */}
                {breakEvenPoint && (
                  <ReferenceLine 
                    x={breakEvenPoint.formattedLabel} 
                    stroke="#10b981" 
                    strokeWidth={2}
                    label={{ 
                      value: 'Break-even', 
                      position: 'top', 
                      fill: '#10b981',
                      fontSize: 12
                    }} 
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          {/* Timeline insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-medium text-blue-800">Initial Investment</h3>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(timelineData[0]?.investment || 0)}</p>
              <p className="text-sm text-blue-700 mt-1">One-time implementation cost</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-medium text-green-800">Projected Return</h3>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(
                  (timelineData[timelineData.length - 1]?.cumulativeReturn || 0) + 
                  (timelineData[0]?.investment || 0)
                )}
              </p>
              <p className="text-sm text-green-700 mt-1">Total return after {timelineData.length - 1} months</p>
            </div>
            
            <div className={`${breakEvenPoint ? 'bg-emerald-50' : 'bg-amber-50'} p-4 rounded-lg`}>
              <h3 className={`font-medium ${breakEvenPoint ? 'text-emerald-800' : 'text-amber-800'}`}>
                Break-even Point
              </h3>
              <p className={`text-2xl font-bold ${breakEvenPoint ? 'text-emerald-900' : 'text-amber-900'}`}>
                {breakEvenPoint 
                  ? `Month ${breakEvenPoint.month}`
                  : 'Beyond current timeline'}
              </p>
              <p className={`text-sm ${breakEvenPoint ? 'text-emerald-700' : 'text-amber-700'} mt-1`}>
                {breakEvenPoint 
                  ? `ROI becomes positive after ${breakEvenPoint.month} months`
                  : `Extend timeline to see break-even point`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">ROI Progression</CardTitle>
          <CardDescription>
            How your return on investment changes over the selected time horizon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={formattedData.filter(d => d.month > 0)} // Skip initial point for ROI chart
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="formattedLabel" 
                  label={{ 
                    value: 'Timeline (Months)', 
                    position: 'insideBottom', 
                    offset: -15 
                  }} 
                />
                <YAxis 
                  tickFormatter={(value) => `${value.toFixed(2)}%`}
                  domain={['dataMin', 'dataMax']}
                  label={{ 
                    value: 'ROI (%)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle' }
                  }}
                />
                <Tooltip 
                  formatter={(value) => [`${Number(value).toFixed(2)}%`, 'ROI']}
                  labelFormatter={(label) => `Timeline: ${label}`}
                />
                <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="3 3" />
                <Line
                  type="monotone"
                  dataKey="roi"
                  name="ROI %"
                  stroke="#0d9488"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimelineVisualization;
