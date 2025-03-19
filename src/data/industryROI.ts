
import { industryDefinitions } from "./industryDefinitions";
import { ROIData } from "@/models/calculator";

export const getIndustryROIData = (industryId: string): ROIData => {
  const industry = industryDefinitions[industryId];
  
  if (!industry) {
    return {
      timeToValue: "3-6 months",
      firstYearROI: "200-300%",
      headcountEquivalent: "10-20%",
      averageROI: "5.9%",
      leadersROI: "13.00%", // Ensuring proper format
      maturityTimeline: "17 months"
    };
  }

  // Ensure we have a valid base ROI value
  const overallROI = industry.overallROI || 30;
  
  // Format all numeric values as strings with fixed decimal places
  const gptROIValue = (overallROI * 3.7).toFixed(2);
  const leadersROIValue = (overallROI * 2.5).toFixed(2);
  const maturityTimeline = industry.maturityTimeline || "17 months";
  
  return {
    timeToValue: `${Math.round(overallROI/10)}-${Math.round(overallROI/6)} months`,
    firstYearROI: `${overallROI*2}-${overallROI*3}%`,
    headcountEquivalent: `${Math.round(overallROI/3)}-${Math.round(overallROI/2)}%`,
    averageROI: `${overallROI.toFixed(2)}%`,
    leadersROI: `${leadersROIValue}%`, // Always use the formatted value
    maturityTimeline: maturityTimeline
  };
};
