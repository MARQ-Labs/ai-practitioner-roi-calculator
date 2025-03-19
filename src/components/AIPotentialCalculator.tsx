
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { industryData, getIndustryROIData } from "@/data/industryData";
import { calculateTotalImpact } from "@/services/calculatorService";
import { Department, CostItem } from "@/models/calculator";
import { formatReportData } from "@/utils/pdfExport";
import { Button } from "@/components/ui/button";

// Import refactored components
import Header from "./calculator/Header";
import CalculatorControls from "./calculator/CalculatorControls";
import ImpactCards from "./calculator/ImpactCards";
import TabNavigation from "./calculator/TabNavigation";
import PageFooter from "./calculator/PageFooter";
import DepartmentEditor from "./DepartmentEditor";
import CustomCostCalculator from "./calculator/CustomCostCalculator";
import PdfExportButton from "./pdf/PdfExportButton";
import AITypeSelector, { AITypeOption } from "./calculator/AITypeSelector";

const AIPotentialCalculator: React.FC = () => {
  // Basic state
  const [adoptionRate, setAdoptionRate] = useState(70);
  const [timeHorizon, setTimeHorizon] = useState(12);
  const [activeTab, setActiveTab] = useState("capacity");
  const [selectedIndustry, setSelectedIndustry] = useState("technology");
  const [customDepartments, setCustomDepartments] = useState<Department[]>([]);
  const [customCost, setCustomCost] = useState<number>(50000);
  const [costItems, setCostItems] = useState<CostItem[]>([]);
  const [aiType, setAIType] = useState<AITypeOption>("general");
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
    customCost,
    costItems
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
  
  const handleCustomCostChange = (cost: number, items?: CostItem[]) => {
    setCustomCost(cost);
    if (items) {
      setCostItems(items);
    }
  };

  const handleAITypeChange = (type: AITypeOption) => {
    setAIType(type);
    toast({
      title: `AI Type changed to ${type}`,
      description: "Your implementation focus has been updated",
      duration: 3000,
    });
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8 animate-fade-in">
      {/* Header section with action buttons */}
      <div className="relative mb-8">
        <div className="flex justify-end mb-4">
          <div className="flex flex-wrap gap-3">
            <Link to="/benchmark">
              <Button variant="outline" size="sm" className="whitespace-nowrap">
                Benchmark Comparison
              </Button>
            </Link>
            <PdfExportButton reportData={reportData} />
          </div>
        </div>
        
        <Header 
          selectedIndustry={selectedIndustry} 
          currentIndustry={currentIndustry}
          handleIndustryChange={handleIndustryChange}
          roiData={roiData}
        />
      </div>
      
      {/* AI Type Selector - New Component */}
      <AITypeSelector 
        selectedType={aiType}
        onTypeChange={handleAITypeChange}
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
