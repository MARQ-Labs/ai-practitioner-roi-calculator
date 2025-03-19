
import { TotalImpact, Department, Industry, ROIData, CostItem } from "@/models/calculator";
import { formatCurrency } from "@/lib/utils";

export interface ReportData {
  title: string;
  industry: Industry;
  departments: Department[];
  timeHorizon: number;
  adoptionRate: number;
  totalImpact: TotalImpact;
  customCost?: number;
  costItems?: CostItem[];
  date: string;
}

export function formatReportData(
  industry: Industry,
  departments: Department[],
  timeHorizon: number,
  adoptionRate: number,
  totalImpact: TotalImpact,
  customCost?: number,
  costItems?: CostItem[]
): ReportData {
  return {
    title: `${industry.name} AI ROI Report`,
    industry,
    departments,
    timeHorizon,
    adoptionRate,
    totalImpact,
    customCost,
    costItems,
    date: new Date().toLocaleDateString()
  };
}

export function getSummaryText(reportData: ReportData): string {
  const { industry, totalImpact, timeHorizon, adoptionRate, customCost } = reportData;
  
  const investment = customCost || totalImpact.financialImpact * 0.3;
  const roi = ((totalImpact.financialImpact / investment) * 100 - 100).toFixed(1);
  
  // Calculate months to break-even (simplified)
  const monthlyBenefit = totalImpact.financialImpact / timeHorizon;
  const breakEvenMonths = investment / monthlyBenefit;
  const breakEvenText = breakEvenMonths > timeHorizon 
    ? "beyond the current projection window" 
    : `approximately month ${Math.ceil(breakEvenMonths)}`;
  
  return `
    Based on our analysis of ${industry.name} industry metrics with a ${adoptionRate}% adoption rate over ${timeHorizon} months, 
    implementing AI solutions is projected to deliver significant value:

    • ${formatCurrency(totalImpact.financialImpact)} in financial impact
    • ${Math.round(totalImpact.hoursSaved).toLocaleString()} hours reclaimed across your organization
    • Equivalent to adding ${totalImpact.fteEquivalent.toFixed(2)} full-time employees
    • Projected investment of ${formatCurrency(investment)}
    • Return on Investment (ROI) of ${roi}%
    • Break-even point reached at ${breakEvenText}
    
    This comprehensive AI implementation strategy is tailored to your organization's specific needs, with an optimized approach 
    for the ${industry.name} industry. The phased implementation plan ensures maximum adoption and value realization.
    
    Key success metrics will be tracked throughout the implementation to ensure your organization achieves 
    the projected benefits while mitigating common adoption risks.
  `;
}
