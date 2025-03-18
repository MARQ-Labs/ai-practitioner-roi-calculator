
import React from "react";
import { Tabs } from "@/components/Tabs";
import { IconName } from "@/components/Icon";
import DepartmentImpactTab from "./tabContent/DepartmentImpactTab";
import IndustryInsightsTab from "./tabContent/IndustryInsightsTab";
import EfficiencyGainsTab from "./tabContent/EfficiencyGainsTab";
import ROIAnalysisTab from "./tabContent/ROIAnalysisTab";
import { Department, Industry } from "@/models/calculator";

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  departments: Department[];
  adoptionRate: number;
  timeHorizon: number;
  industryId: string;
  industry: Industry;
  roiData: any;
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
}) => {
  const tabs = [
    { id: "capacity", label: "Department Impact", icon: "users" as IconName },
    { id: "insights", label: "Industry Insights", icon: "lightbulb" as IconName },
    { id: "efficiency", label: "Efficiency Gains", icon: "layers" as IconName },
    { id: "roi", label: "ROI Analysis", icon: "trendingUp" as IconName }
  ];

  return (
    <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Explore Different Perspectives</h2>
        <p className="text-gray-600">Click the tabs below to see different views of AI's impact</p>
      </div>
      
      <Tabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />
      
      {/* Department Impact Tab Content */}
      {activeTab === "capacity" && (
        <DepartmentImpactTab
          departments={departments}
          adoptionRate={adoptionRate}
          timeHorizon={timeHorizon}
          industryId={industryId}
          industryName={industry.name}
        />
      )}

      {/* Industry Insights Tab Content */}
      {activeTab === "insights" && (
        <IndustryInsightsTab
          industry={industry}
          industryId={industryId}
        />
      )}
      
      {/* Efficiency Gains Tab Content */}
      {activeTab === "efficiency" && (
        <EfficiencyGainsTab
          departments={departments}
          adoptionRate={adoptionRate}
          timeHorizon={timeHorizon}
          industryId={industryId}
          industryName={industry.name}
        />
      )}
      
      {/* ROI Analysis Tab Content */}
      {activeTab === "roi" && (
        <ROIAnalysisTab
          industry={industry}
          roiData={roiData}
        />
      )}
    </div>
  );
};

export default TabNavigation;
