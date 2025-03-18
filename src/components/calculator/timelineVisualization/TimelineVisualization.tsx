
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ROITimelineChart from "./ROITimelineChart";
import ImpactTimelineChart from "./ImpactTimelineChart";
import { Department, TotalImpact } from "@/models/calculator";
import { calculateTotalImpact } from "@/services/calculatorService";

interface TimelineVisualizationProps {
  departments: Department[];
  adoptionRate: number;
  maxTimeHorizon: number;
  industryId: string;
  costs: {
    amount: number;
    isRecurring: boolean;
  };
}

const TimelineVisualization: React.FC<TimelineVisualizationProps> = ({
  departments,
  adoptionRate,
  maxTimeHorizon,
  industryId,
  costs,
}) => {
  // Generate data points for the timeline (monthly intervals)
  const generateTimelineData = () => {
    const timelineData: {
      month: number;
      financialImpact: number;
      hoursSaved: number;
      fteEquivalent: number;
      roi: number;
      netBenefit: number;
      cumulativeCost: number;
      cumulativeBenefit: number;
    }[] = [];

    // Calculate the impact for each month
    for (let month = 1; month <= maxTimeHorizon; month++) {
      const impact = calculateTotalImpact(departments, adoptionRate, month, industryId);
      
      // Calculate monthly financial values
      const monthlyImpact = impact.financialImpact / 12 * month;
      
      // Calculate cumulative costs
      const initialCost = costs.amount;
      const recurringCost = costs.isRecurring ? (costs.amount * month / 12) : 0;
      const totalCost = initialCost + recurringCost;
      
      // Calculate ROI and net benefit
      const netBenefit = monthlyImpact - totalCost;
      
      // Add data point for this month
      timelineData.push({
        month,
        financialImpact: monthlyImpact,
        hoursSaved: impact.hoursSaved / 12 * month,
        fteEquivalent: impact.fteEquivalent / 12 * month,
        roi: netBenefit / totalCost * 100,
        netBenefit,
        cumulativeCost: totalCost,
        cumulativeBenefit: monthlyImpact
      });
    }

    return timelineData;
  };

  const timelineData = generateTimelineData();

  return (
    <Card className="w-full shadow-md animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-800">
          Timeline Visualization
        </CardTitle>
        <CardDescription>
          Visualize how your AI investment and returns evolve over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="roi" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="roi">ROI Timeline</TabsTrigger>
            <TabsTrigger value="impact">Impact Timeline</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roi" className="mt-4">
            <ROITimelineChart 
              timelineData={timelineData} 
              maxMonths={maxTimeHorizon}
              costStructure={{
                isRecurring: costs.isRecurring,
                initialCost: costs.amount
              }}
            />
          </TabsContent>
          
          <TabsContent value="impact" className="mt-4">
            <ImpactTimelineChart 
              timelineData={timelineData} 
              maxMonths={maxTimeHorizon}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TimelineVisualization;
