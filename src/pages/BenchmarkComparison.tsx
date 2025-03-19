import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { industryData, getIndustryROIData } from "@/data/industryData";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample benchmark data
const benchmarkData = [
  { name: "Your Company", roi: 45, efficiencyGain: 40, timeToValue: 4, implementation: 85 },
  { name: "Industry Average", roi: 35, efficiencyGain: 30, timeToValue: 6, implementation: 70 },
  { name: "Industry Leaders", roi: 65, efficiencyGain: 55, timeToValue: 3, implementation: 90 },
];

// Chart data generators
const roiChartData = Object.keys(industryData.industries).map(industryId => {
  const industry = industryData.industries[industryId];
  const roiData = getIndustryROIData(industryId);
  return {
    name: industry.name,
    industryAverage: parseFloat(roiData.averageROI.replace('%', '')),
    industryLeaders: parseFloat(roiData.leadersROI.replace('%', ''))
  };
});

const efficiencyChartData = Object.keys(industryData.industries).map(industryId => {
  const industry = industryData.industries[industryId];
  const efficiencyValues = Object.values(industry.efficiencyGains || {});
  const avgEfficiency = efficiencyValues.length > 0 
    ? efficiencyValues.reduce((sum, val) => sum + val, 0) / efficiencyValues.length
    : 0;
  
  return {
    name: industry.name,
    averageEfficiency: Math.round(avgEfficiency),
    topPerformerEfficiency: Math.round(avgEfficiency * 1.5)
  };
});

// Chart configuration for industry ROI
const roiChartConfig = {
  industryAverage: {
    label: "Industry Average",
    color: "#8884d8"
  },
  industryLeaders: {
    label: "Industry Leaders",
    color: "#82ca9d"
  }
};

// Chart configuration for efficiency
const efficiencyChartConfig = {
  averageEfficiency: {
    label: "Average Efficiency Gain",
    color: "#8884d8"
  },
  topPerformerEfficiency: {
    label: "Top Performer Efficiency",
    color: "#82ca9d"
  }
};

const BenchmarkComparison: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("roi");
  const [industryFilter, setIndustryFilter] = useState("all");
  const isMobile = useIsMobile();

  // Filter data based on industry selection
  const filteredRoiData = industryFilter === "all" 
    ? roiChartData 
    : roiChartData.filter(item => item.name.toLowerCase().includes(industryFilter.toLowerCase()));

  const filteredEfficiencyData = industryFilter === "all"
    ? efficiencyChartData
    : efficiencyChartData.filter(item => item.name.toLowerCase().includes(industryFilter.toLowerCase()));

  // Truncate long industry names for mobile
  const processChartData = (data) => {
    if (isMobile) {
      return data.map(item => ({
        ...item,
        name: item.name.length > 10 ? `${item.name.substring(0, 10)}...` : item.name
      }));
    }
    return data;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="px-4 py-8 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Benchmark Comparison</h1>
            <p className="text-gray-600 mt-2">
              Compare your AI implementation against industry benchmarks and leaders
            </p>
          </div>
          <Link to="/">
            <Button variant="outline">Back to Calculator</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">ROI Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-teal-600">
                +28.5%
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Your ROI vs. Industry Average
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Efficiency Gains</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-600">
                +33.3%
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Your Efficiency vs. Industry Average
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Implementation Speed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                -33.3%
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Your Time to Value vs. Industry Average
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="roi">ROI Benchmarks</TabsTrigger>
            <TabsTrigger value="efficiency">Efficiency Benchmarks</TabsTrigger>
            <TabsTrigger value="implementation">Implementation Benchmarks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roi" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">ROI by Industry</h2>
              <div className="h-[500px]">
                <ChartContainer config={roiChartConfig}>
                  <BarChart 
                    data={processChartData(filteredRoiData)} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 150 }}
                    layout={isMobile ? "vertical" : "horizontal"}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={150} 
                      interval={0}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ 
                        value: 'ROI (%)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                      }} 
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />
                    <Bar dataKey="industryAverage" name="Industry Average" fill="#8884d8" />
                    <Bar dataKey="industryLeaders" name="Industry Leaders" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="efficiency" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Efficiency Gains by Industry</h2>
              <div className="h-[500px]">
                <ChartContainer config={efficiencyChartConfig}>
                  <BarChart 
                    data={processChartData(filteredEfficiencyData)} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 150 }}
                    layout={isMobile ? "vertical" : "horizontal"}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45} 
                      textAnchor="end" 
                      height={150} 
                      interval={0}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      label={{ 
                        value: 'Efficiency Gain (%)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                      }} 
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ paddingTop: 20 }} />
                    <Bar dataKey="averageEfficiency" name="Average Efficiency Gain" fill="#8884d8" />
                    <Bar dataKey="topPerformerEfficiency" name="Top Performer Efficiency" fill="#82ca9d" />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="implementation" className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4">Implementation Timeline Comparison</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Time to Value (Months)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer>
                        <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="timeToValue" name="Months" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Implementation Success Rate (%)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer>
                        <BarChart data={benchmarkData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="implementation" name="Success Rate" fill="#10b981" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Benchmark Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                <span className="font-semibold">ROI Performance:</span> Your organization is outperforming the industry average by 28.5% in terms of ROI, placing you in the top 30% of companies implementing AI.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Efficiency Gains:</span> Your efficiency improvements are 33.3% higher than the industry average, suggesting your AI implementation strategy is more effective than most competitors.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Implementation Speed:</span> Your organization achieves results 33.3% faster than the industry average, reducing time to value significantly.
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Key Advantage:</span> Your implementation success rate of 85% is well above the industry average of 70%, indicating strong execution capabilities.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BenchmarkComparison;
