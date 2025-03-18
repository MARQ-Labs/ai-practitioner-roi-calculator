
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { industryData, getIndustryROIData } from "@/data/industryData";
import { calculateTotalImpact } from "@/services/calculatorService";
import { Department } from "@/models/calculator";

// Import refactored components
import Header from "./calculator/Header";
import CalculatorControls from "./calculator/CalculatorControls";
import ImpactCards from "./calculator/ImpactCards";
import TabNavigation from "./calculator/TabNavigation";
import PageFooter from "./calculator/PageFooter";
import DepartmentEditor from "./DepartmentEditor";

const AIPotentialCalculator: React.FC = () => {
  // Basic state
  const [adoptionRate, setAdoptionRate] = useState(70);
  const [timeHorizon, setTimeHorizon] = useState(12);
  const [activeTab, setActiveTab] = useState("capacity");
  const [selectedIndustry, setSelectedIndustry] = useState("technology");
  const [customDepartments, setCustomDepartments] = useState<Department[]>([]);
  const { toast } = useToast();
  
  // Get current industry data
  const currentIndustry = industryData.industries[selectedIndustry] || industryData.industries.technology;
  const industryDepartments = industryData.industryDepartments[selectedIndustry] || industryData.industryDepartments.technology;
  
  // Use custom departments if they exist, otherwise use industry defaults
  const currentDepartments = customDepartments.length > 0 
    ? customDepartments 
    : industryDepartments;
  
  // Get ROI data
  const roiData = getIndustryROIData(selectedIndustry);
  
  // Calculate total impact
  const totalImpact = calculateTotalImpact(currentDepartments, adoptionRate, timeHorizon, selectedIndustry);

  // Reset custom departments when industry changes
  useEffect(() => {
    setCustomDepartments([]);
  }, [selectedIndustry]);

  // Notify on industry change
  useEffect(() => {
    toast({
      title: `Industry changed to ${currentIndustry.name}`,
      description: "Calculator has been updated with industry-specific data",
      duration: 3000,
    });
  }, [selectedIndustry, currentIndustry.name, toast]);

  // Handle industry change
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
  };

  // Handle departments change
  const handleDepartmentsChange = (departments: Department[]) => {
    setCustomDepartments(departments);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <Header 
        selectedIndustry={selectedIndustry} 
        currentIndustry={currentIndustry}
        handleIndustryChange={handleIndustryChange}
        roiData={roiData}
      />
      
      {/* Department Editor */}
      <div className="mb-8 animate-fade-in">
        <DepartmentEditor 
          departments={customDepartments} 
          onDepartmentsChange={handleDepartmentsChange}
          industryId={selectedIndustry}
        />
      </div>
      
      {/* Controls */}
      <CalculatorControls
        adoptionRate={adoptionRate}
        setAdoptionRate={setAdoptionRate}
        timeHorizon={timeHorizon}
        setTimeHorizon={setTimeHorizon}
      />
      
      {/* Impact Cards */}
      <ImpactCards 
        totalImpact={totalImpact} 
        industryROI={currentIndustry.overallROI}
        leaderROI={roiData.leadersROI}
      />

      {/* Tab Navigation */}
      <TabNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        departments={currentDepartments}
        adoptionRate={adoptionRate}
        timeHorizon={timeHorizon}
        industryId={selectedIndustry}
        industry={currentIndustry}
        roiData={roiData}
      />
      
      {/* Footer */}
      <PageFooter />
    </div>
  );
};

export default AIPotentialCalculator;
