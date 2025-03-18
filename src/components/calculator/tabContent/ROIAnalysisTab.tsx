
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import ROIChart from "@/components/ROIChart";
import { Industry, TimelinePoint } from "@/models/calculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimelineVisualization from "@/components/TimelineVisualization";
import { generateTimelineData } from "@/services/calculatorService";
import { industryData } from "@/data/industryData";

interface ROIAnalysisTabProps {
  industry: Industry;
  roiData: any;
  timeHorizon?: number;
  adoptionRate?: number;
  customCost?: number;
}

const ROIAnalysisTab: React.FC<ROIAnalysisTabProps> = ({ 
  industry, 
  roiData,
  timeHorizon = 12,
  adoptionRate = 70,
  customCost = 0
}) => {
  const [analysisView, setAnalysisView] = useState<"summary" | "timeline">("summary");
  
  // Generate timeline data
  const industryDepartments = industryData.industryDepartments[industry.id] || [];
  const timelineData = generateTimelineData(
    industryDepartments,
    adoptionRate,
    timeHorizon,
    customCost,
    industry.id
  );
  
  // Adjust ROI values based on time horizon and adoption rate
  const timeHorizonAdjustment = timeHorizon / 12;
  const adoptionFactor = adoptionRate / 100;
  const breakEvenThreshold = 4; // Consistent with other components
  
  // For very short horizons, adjust ROI to potentially show negative values
  const getTimeAdjustedROI = (roi: number) => {
    if (timeHorizon <= breakEvenThreshold) {
      // Calculate negative ROI for very short time periods
      return -25 + ((timeHorizon / breakEvenThreshold) * 25 * adoptionFactor);
    }
    return roi * timeHorizonAdjustment * adoptionFactor;
  };
  
  const adjustedIndustryROI = industry.overallROI 
    ? getTimeAdjustedROI(industry.overallROI).toFixed(1) 
    : "0";
    
  // For leaders ROI, still show potential even during negative periods
  const leaderROIValue = roiData.leadersROI 
    ? parseFloat(roiData.leadersROI.replace('%', '')) 
    : 0;
    
  const adjustedLeadersROI = timeHorizon <= breakEvenThreshold
    ? "Break-even at " + (breakEvenThreshold) + " months"
    : (leaderROIValue * timeHorizonAdjustment * adoptionFactor).toFixed(1) + "%";

  return (
    <div className="mt-4 animate-slide-in-right">
      <Card>
        <CardHeader>
          <CardTitle>ROI Analysis for {industry.name}</CardTitle>
          <CardDescription>
            {timeHorizon}-month return on investment projection for AI implementation
          </CardDescription>
          
          {/* Add tabs for switching between summary and timeline views */}
          <Tabs value={analysisView} onValueChange={(value) => setAnalysisView(value as "summary" | "timeline")}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="summary">ROI Summary</TabsTrigger>
              <TabsTrigger value="timeline">Timeline View</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <TabsContent value="summary" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">ROI Key Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">{timeHorizon}-Month Industry Avg ROI:</span>
                    <span className={`font-bold ${parseFloat(adjustedIndustryROI) < 0 ? 'text-amber-600' : 'text-teal-700'}`}>
                      {adjustedIndustryROI}%
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">{timeHorizon}-Month AI Leaders ROI:</span>
                    <span className="font-bold text-teal-700">{adjustedLeadersROI}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Generative AI Multiplier:</span>
                    <span className="font-bold text-teal-700">3.7x</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Time to Value:</span>
                    <span className="font-bold text-teal-700">{roiData.timeToValue}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Maturity Timeline:</span>
                    <span className="font-bold text-teal-700">{roiData.maturityTimeline}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Implementation Success Factors</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Allocate at least 5% of total budget to AI initiatives</li>
                  <li>Ensure high data quality (accuracy currently at 54.6%)</li>
                  <li>Implement across multiple departments simultaneously</li>
                  <li>Secure executive leadership involvement in governance</li>
                  <li>Plan for {roiData.maturityTimeline} to reach full maturity</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <ROIChart industry={industry} timeHorizon={timeHorizon} adoptionRate={adoptionRate} />
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-2">ROI Calculation Methodology</h3>
              <p className="text-sm text-gray-600">
                The ROI data is based on industry research from 2023-2024 across multiple sectors.
                The calculations include direct cost savings, productivity improvements, and new 
                revenue opportunities enabled by AI. All values are adjusted based on the selected 
                time horizon of {timeHorizon} months and organization-wide adoption rate of {adoptionRate}%
                to provide an accurate projection.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-0">
            <TimelineVisualization 
              timelineData={timelineData}
              customCost={customCost}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROIAnalysisTab;
