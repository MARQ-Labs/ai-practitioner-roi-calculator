
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
      leadersROI: "13%",
      maturityTimeline: "17 months"
    };
  }

  const overallROI = industry.overallROI || 30;
  const gptROI = overallROI * 3.7; // Based on 370% (3.7x) average for GenAI
  const leadersROI = overallROI * 2.5; // Based on industry leaders achieving 2.5x better results
  const maturityTimeline = industry.maturityTimeline || "17 months";
  
  return {
    timeToValue: `${Math.round(overallROI/10)}-${Math.round(overallROI/6)} months`,
    firstYearROI: `${overallROI*2}-${overallROI*3}%`,
    headcountEquivalent: `${Math.round(overallROI/3)}-${Math.round(overallROI/2)}%`,
    averageROI: `${overallROI}%`,
    leadersROI: `${leadersROI}%`,
    maturityTimeline: maturityTimeline
  };
};
