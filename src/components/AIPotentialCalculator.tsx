
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { industryData, getIndustryROIData } from "@/data/industryData";
import { calculateTotalImpact } from "@/services/calculatorService";
import { Department, CostItem } from "@/models/calculator";
import { formatReportData } from "@/utils/pdfExport";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart4 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Import refactored components
import Header from "./calculator/Header";
import CalculatorControls from "./calculator/CalculatorControls";
import ImpactCards from "./calculator/ImpactCards";
import TabNavigation from "./calculator/TabNavigation";
import PageFooter from "./calculator/PageFooter";
import DepartmentEditor from "./DepartmentEditor";
import CustomCostCalculator from "./calculator/CustomCostCalculator";

interface AIPotentialCalculatorProps {
  onReportDataChange?: (reportData: any) => void;
}

const AIPotentialCalculator: React.FC<AIPotentialCalculatorProps> = ({ onReportDataChange }) => {
  // Basic state
  const [adoptionRate, setAdoptionRate] = useState(70);
  const [timeHorizon, setTimeHorizon] = useState(12);
  const [activeTab, setActiveTab] = useState("capacity");
  const [selectedIndustry, setSelectedIndustry] = useState("technology");
  const [customDepartments, setCustomDepartments] = useState<Department[]>([]);
  const [customCost, setCustomCost] = useState<number>(50000);
  const [costItems, setCostItems] = useState<CostItem[]>([]);
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

  // Pass reportData to parent component
  useEffect(() => {
    if (onReportDataChange) {
      onReportDataChange(reportData);
    }
  }, [reportData, onReportDataChange]);

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
  
  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8 animate-fade-in">
      {/* Header section with action buttons */}
      <div className="relative mb-8">
        <Header 
          selectedIndustry={selectedIndustry} 
          currentIndustry={currentIndustry}
          handleIndustryChange={handleIndustryChange}
          roiData={roiData}
        />
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
      
      {/* Benchmark Comparison Card */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart4 size={20} className="text-primary" />
              <span>ROI Benchmark Comparison</span>
            </CardTitle>
            <CardDescription>
              Compare your calculated ROI with industry benchmarks and see how your organization stacks up
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Our benchmark tool provides detailed comparisons of your ROI metrics against industry averages and top performers.
              It also offers insights on implementation timelines and success rates.
            </p>
            <Button variant="outline" asChild>
              <Link to="/benchmark" className="flex items-center gap-1">
                <span>View Detailed Benchmarks</span>
                <ArrowRight size={16} />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
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
