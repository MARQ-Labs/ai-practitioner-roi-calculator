
import { TotalImpact, Department, Industry, ROIData } from "@/models/calculator";
import { formatCurrency } from "@/lib/utils";

export interface ReportData {
  title: string;
  industry: Industry;
  departments: Department[];
  timeHorizon: number;
  adoptionRate: number;
  totalImpact: TotalImpact;
  customCost?: number;
  date: string;
}

export function formatReportData(
  industry: Industry,
  departments: Department[],
  timeHorizon: number,
  adoptionRate: number,
  totalImpact: TotalImpact,
  customCost?: number
): ReportData {
  return {
    title: `${industry.name} AI ROI Report`,
    industry,
    departments,
    timeHorizon,
    adoptionRate,
    totalImpact,
    customCost,
    date: new Date().toLocaleDateString()
  };
}

export function getSummaryText(reportData: ReportData): string {
  const { industry, totalImpact, timeHorizon, adoptionRate, customCost } = reportData;
  
  const investment = customCost || totalImpact.financialImpact * 0.3;
  
  return `
    Based on our analysis of ${industry.name} industry metrics with a ${adoptionRate}% adoption rate over ${timeHorizon} months, 
    implementing AI solutions is projected to deliver significant value:

    • ${formatCurrency(totalImpact.financialImpact)} in financial impact
    • ${Math.round(totalImpact.hoursSaved).toLocaleString()} hours reclaimed across your organization
    • Equivalent to adding ${totalImpact.fteEquivalent.toFixed(2)} full-time employees
    • Projected investment of ${formatCurrency(investment)}
    
    This represents a comprehensive analysis of AI's potential impact across your organization.
  `;
}
