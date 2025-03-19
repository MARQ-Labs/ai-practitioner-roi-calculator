
import { industryDefinitions } from "./industryDefinitions";
import { ROIData } from "@/models/calculator";

export const getIndustryROIData = (industryId: string): ROIData => {
  const industry = industryDefinitions[industryId];
  
  // Default ROI data with explicit formatting for consistency
  const defaultROI: ROIData = {
    timeToValue: "3-6 months",
    firstYearROI: "200-300%",
    headcountEquivalent: "10-20%",
    averageROI: "5.90%", // Ensure consistent decimal places
    leadersROI: "13.00%", // Ensure consistent decimal places
    maturityTimeline: "17 months"
  };
  
  // If no industry is found, return the default values
  if (!industry || !industryId) {
    console.log("No industry found, returning default ROI data:", defaultROI);
    return defaultROI;
  }

  try {
    // Ensure we have a valid base ROI value (with fallback)
    const overallROI = industry.overallROI || 30;
    
    // Format all numeric values with proper percentage formatting
    const monthsMin = Math.max(1, Math.round(overallROI/10));
    const monthsMax = Math.max(2, Math.round(overallROI/6));
    const headcountMin = Math.max(1, Math.round(overallROI/3));
    const headcountMax = Math.max(2, Math.round(overallROI/2));
    const firstYearMin = Math.max(10, overallROI*2);
    const firstYearMax = Math.max(20, overallROI*3);
    
    // Always ensure values have .00 precision for consistency
    const averageROIValue = `${overallROI.toFixed(2)}%`;
    const leadersROIValue = `${(overallROI * 2.5).toFixed(2)}%`;
    const maturityTimeline = industry.maturityTimeline || "17 months";
    
    const result = {
      timeToValue: `${monthsMin}-${monthsMax} months`,
      firstYearROI: `${firstYearMin}-${firstYearMax}%`,
      headcountEquivalent: `${headcountMin}-${headcountMax}%`,
      averageROI: averageROIValue,
      leadersROI: leadersROIValue,
      maturityTimeline: maturityTimeline
    };
    
    console.log(`Generated ROI data for industry ${industryId}:`, result);
    return result;
  } catch (error) {
    console.error("Error generating industry ROI data:", error);
    return defaultROI;
  }
};
