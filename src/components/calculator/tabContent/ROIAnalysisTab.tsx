
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import ROIChart from "@/components/ROIChart";
import { Industry, TimelinePoint } from "@/models/calculator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TimelineVisualization from "@/components/TimelineVisualization";
import { generateTimelineData, calculateROI } from "@/services/calculatorService";
import { industryData } from "@/data/industryData";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
  // Get the correct departments for this industry
  const industryDepartments = industryData.industryDepartments[industry.id] || [];
  
  // Generate timeline data - always ensure we have a valid cost
  const effectiveCost = customCost > 0 ? customCost : 50000; // Default to 50000 if customCost is 0
  
  // Check if we have departments before generating timeline data
  const hasValidDepartments = industryDepartments && industryDepartments.length > 0;
  
  // Generate timeline data only if we have departments
  const timelineData = hasValidDepartments
    ? generateTimelineData(
        industryDepartments,
        adoptionRate,
        timeHorizon,
        effectiveCost,
        industry.id
      )
    : [];
  
  // Calculate financial impact from the timeline data
  const finalImpact = timelineData.length > 0 
    ? timelineData[timelineData.length - 1].financialImpact 
    : 0;
    
  // Calculate total benefit - make sure we're using the last point of the timeline
  const totalBenefit = timelineData.length > 0 
    ? timelineData[timelineData.length - 1].cumulativeReturn + timelineData[0].investment
    : 0;
    
  // Make sure we have a valid investment value
  const investment = timelineData.length > 0 ? timelineData[0].investment : effectiveCost;
  
  // Calculate ROI consistently with other components
  const calculatedROI = calculateROI(investment, totalBenefit);
  
  // Format ROI values safely
  const formatROI = (roi: number) => {
    if (isNaN(roi) || roi === Infinity || roi === -Infinity) {
      return "0.00%";
    }
    return roi.toFixed(2) + "%";
  };
  
  // For leaders ROI calculation - ensure it's always properly formatted
  // Extract the numeric value from the leaders ROI string and ensure it's valid
  const leaderROIString = roiData?.leadersROI || "0.00%";
  const leaderROIValue = parseFloat(leaderROIString.replace('%', ''));
  
  // Calculate the adjusted leaders ROI based on time horizon and adoption rate
  const adjustedLeadersROI = !isNaN(leaderROIValue) && leaderROIValue > 0
    ? ((leaderROIValue * (timeHorizon / 12) * (adoptionRate / 100)).toFixed(2) + "%")
    : "0.00%";

  // Add debug to help identify problems
  console.log("ROI Analysis Tab Data:", {
    industryId: industry.id,
    departments: industryDepartments,
    timelineData,
    investment,
    totalBenefit,
    calculatedROI,
    hasValidDepartments,
    leadersROI: roiData?.leadersROI,
    leaderROIValue,
    adjustedLeadersROI
  });

  // Show toast when there's an issue with timeline data
  useEffect(() => {
    if (!hasValidDepartments) {
      toast({
        title: "No department data available",
        description: "Please add departments to see ROI analysis",
        variant: "destructive"
      });
    } else if (timelineData.length === 0) {
      toast({
        title: "Timeline generation failed",
        description: "Could not generate ROI timeline data",
        variant: "destructive"
      });
    }
  }, [hasValidDepartments, timelineData.length, toast]);

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
                    <span className="text-gray-600">{timeHorizon}-Month Projected ROI:</span>
                    <span className={`font-bold ${!isNaN(calculatedROI) && calculatedROI < 0 ? 'text-amber-600' : 'text-teal-700'}`}>
                      {formatROI(calculatedROI)}
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
                    <span className="font-bold text-teal-700">{roiData?.timeToValue || "3-6 months"}</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Maturity Timeline:</span>
                    <span className="font-bold text-teal-700">{roiData?.maturityTimeline || "17 months"}</span>
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
                  <li>Plan for {roiData?.maturityTimeline || "17 months"} to reach full maturity</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <ROIChart 
                industry={industry} 
                timeHorizon={timeHorizon} 
                adoptionRate={adoptionRate} 
              />
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
            {timelineData.length > 0 ? (
              <TimelineVisualization 
                timelineData={timelineData}
                customCost={effectiveCost}
              />
            ) : (
              <div className="p-6 text-center bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-500 mb-2">No timeline data available.</p>
                <p className="text-sm text-gray-400">Try adjusting your parameters or ensure departments are properly configured.</p>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROIAnalysisTab;
