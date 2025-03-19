
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Department, 
  Industry, 
  ROIData 
} from "@/models/calculator";
import DepartmentImpactTab from "./tabContent/DepartmentImpactTab";
import EfficiencyGainsTab from "./tabContent/EfficiencyGainsTab";
import IndustryInsightsTab from "./tabContent/IndustryInsightsTab";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  departments: Department[];
  adoptionRate: number;
  timeHorizon: number;
  industryId: string;
  industry: Industry;
  roiData: ROIData;
  customCost?: number;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
  departments,
  adoptionRate,
  timeHorizon,
  industryId,
  industry,
  roiData,
  customCost
}) => {
  return (
    <div className="mb-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white rounded-lg shadow-sm flex justify-between p-1">
          <TabsTrigger value="capacity" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-900 transition-all duration-200 rounded-lg px-4 py-2 text-sm font-medium">
            Capacity
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-900 transition-all duration-200 rounded-lg px-4 py-2 text-sm font-medium">
            Efficiency
          </TabsTrigger>
          <TabsTrigger value="industry" className="data-[state=active]:bg-teal-50 data-[state=active]:text-teal-900 transition-all duration-200 rounded-lg px-4 py-2 text-sm font-medium">
            Industry Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="capacity" className="animate-slide-in-right">
          <DepartmentImpactTab 
            departments={departments} 
            adoptionRate={adoptionRate} 
            timeHorizon={timeHorizon}
            industryId={industryId}
            industryName={industry.name}
          />
        </TabsContent>
        
        <TabsContent value="efficiency" className="animate-slide-in-right">
          <EfficiencyGainsTab 
            departments={departments}
            adoptionRate={adoptionRate}
            timeHorizon={timeHorizon}
            industryId={industryId}
            industryName={industry.name}
          />
        </TabsContent>
        
        <TabsContent value="industry" className="animate-slide-in-right">
          <IndustryInsightsTab industryId={industryId} industry={industry} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabNavigation;
