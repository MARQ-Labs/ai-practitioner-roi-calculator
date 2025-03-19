import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { industryData, getIndustryROIData } from "@/data/industryData";
import { calculateTotalImpact } from "@/services/calculatorService";
import { Department } from "@/models/calculator";
import { formatReportData } from "@/utils/pdfExport";

// Import refactored components
import Header from "./calculator/Header";
import CalculatorControls from "./calculator/CalculatorControls";
import ImpactCards from "./calculator/ImpactCards";
import TabNavigation from "./calculator/TabNavigation";
import PageFooter from "./calculator/PageFooter";
import DepartmentEditor from "./DepartmentEditor";
import CustomCostCalculator from "./calculator/CustomCostCalculator";
import PdfExportButton from "./pdf/PdfExportButton";

const AIPotentialCalculator: React.FC = () => {
  // Basic state
  const [adoptionRate, setAdoptionRate] = useState(70);
  const [timeHorizon, setTimeHorizon] = useState(12);
  const [activeTab, setActiveTab] = useState("capacity");
  const [selectedIndustry, setSelectedIndustry] = useState("technology");
  const [customDepartments, setCustomDepartments] = useState<Department[]>([]);
  const [customCost, setCustomCost] = useState<number>(50000);
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

  // Prepare report data for PDF export
  const reportData = formatReportData(
    currentIndustry,
    currentDepartments,
    timeHorizon,
    adoptionRate,
    totalImpact,
    customCost
  );

  useEffect(() => {
    setCustomDepartments([]);
  }, [selectedIndustry]);

  useEffect(() => {
    toast({
      title: `Industry changed to ${currentIndustry.name}`,
      description: "Calculator has been updated with industry-specific data",
      duration: 3000,
    });
  }, [selectedIndustry, currentIndustry.name, toast]);

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
  };

  const handleDepartmentsChange = (departments: Department[]) => {
    setCustomDepartments(departments);
  };
  
  const handleCustomCostChange = (cost: number) => {
    setCustomCost(cost);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8 animate-fade-in">
      {/* Header with PDF Export Button */}
      <div className="flex justify-between items-start mb-8">
        <Header 
          selectedIndustry={selectedIndustry} 
          currentIndustry={currentIndustry}
          handleIndustryChange={handleIndustryChange}
          roiData={roiData}
        />
        <PdfExportButton reportData={reportData} />
      </div>
      
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
      
      {/* Custom Cost Calculator - Moved above Impact Cards with spacing */}
      <div className="mb-8">
        <CustomCostCalculator 
          totalBenefit={totalImpact.financialImpact} 
          timeHorizon={timeHorizon}
          adoptionRate={adoptionRate}
          onCostChange={handleCustomCostChange}
        />
      </div>
      
      {/* Impact Cards */}
      <ImpactCards 
        totalImpact={totalImpact} 
        industryROI={currentIndustry.overallROI?.toString() || "0"}
        leaderROI={roiData.leadersROI}
        customCost={customCost}
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
