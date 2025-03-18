
import { 
  Department, 
  DepartmentImpact, 
  TotalImpact,
  TimelinePoint
} from "@/models/calculator";
import { 
  WORK_HOURS_PER_YEAR, 
  TIME_ADOPTION_CURVE,
  getDepartmentROI
} from "@/data/industryData";

export const calculateDepartmentImpact = (
  dept: Department,
  adoptionRate: number,
  timeHorizon: number,
  industryId: string = ""
): DepartmentImpact => {
  // Calculate the hours saved per person
  const efficiencyRate = dept.efficiencyGain / 100;
  const hoursPerPerson = WORK_HOURS_PER_YEAR * efficiencyRate;
  const totalHoursSaved = hoursPerPerson * dept.headcount;
  
  // Calculate financial value
  const hourlyRate = dept.avgSalary / WORK_HOURS_PER_YEAR;
  const fullImpact = totalHoursSaved * hourlyRate;
  
  // Apply adoption rate - lower adoption rates should have stronger negative effect on ROI
  const adoptionImpact = fullImpact * (adoptionRate / 100);
  const adoptionFactor = adoptionRate / 100; // will be used for ROI calculation
  
  // Find the closest time period in our curve
  const timeKeys = Object.keys(TIME_ADOPTION_CURVE).map(Number);
  let closestTime = 12;
  for (const key of timeKeys) {
    if (Math.abs(key - timeHorizon) < Math.abs(closestTime - timeHorizon)) {
      closestTime = key;
    }
  }
  
  // Apply the time-based adoption factor
  const timeFactor = TIME_ADOPTION_CURVE[closestTime] || 0.9;
  
  // Get department-specific ROI if available
  const baseRoi = getDepartmentROI(industryId, dept.name);
  
  // More aggressive ROI adjustment for short time horizons
  // Should start negative at 3 months and gradually become positive
  const breakEvenThreshold = 4; // months below which ROI is negative
  
  let timeBasedRoi;
  if (timeHorizon <= breakEvenThreshold) {
    // Stronger negative ROI for very short time periods
    timeBasedRoi = -25 + ((timeHorizon / breakEvenThreshold) * 25);
    // Apply adoption rate impact - lower adoption makes ROI more negative
    timeBasedRoi = timeBasedRoi * adoptionFactor;
  } else {
    // For longer timeframes, ROI gradually improves
    timeBasedRoi = baseRoi * (timeHorizon / 12) * adoptionFactor;
  }
  
  return {
    financialImpact: adoptionImpact * timeFactor,
    hoursSaved: totalHoursSaved * (adoptionRate / 100) * timeFactor,
    fteEquivalent: (totalHoursSaved * (adoptionRate / 100) * timeFactor) / WORK_HOURS_PER_YEAR,
    headcount: dept.headcount,
    roi: timeBasedRoi
  };
};

export const calculateTotalImpact = (
  departments: Department[],
  adoptionRate: number,
  timeHorizon: number,
  industryId: string = ""
): TotalImpact => {
  const initialValue = { 
    financialImpact: 0, 
    hoursSaved: 0, 
    fteEquivalent: 0, 
    headcount: 0,
    roi: 0
  };

  // If there are no departments, return zeros
  if (departments.length === 0) {
    return initialValue;
  }

  const result = departments.reduce((acc, dept) => {
    const impact = calculateDepartmentImpact(dept, adoptionRate, timeHorizon, industryId);
    return {
      financialImpact: acc.financialImpact + impact.financialImpact,
      hoursSaved: acc.hoursSaved + impact.hoursSaved,
      fteEquivalent: acc.fteEquivalent + impact.fteEquivalent,
      headcount: acc.headcount + dept.headcount,
      roi: acc.roi + (impact.roi || 0)
    };
  }, initialValue);

  // Calculate the average ROI across all departments
  result.roi = result.roi / departments.length;
  
  // Further adjust the total ROI based on adoption rate and time horizon
  const breakEvenThreshold = 4; // consistent with departmentImpact
  
  if (timeHorizon <= breakEvenThreshold) {
    // At 3 months with low adoption, ROI should be strongly negative
    const adoptionImpact = (adoptionRate - 100) / 100; // negative impact for less than 100% adoption
    const baseNegativeRoi = -30; // starting point for very short horizons
    
    // Adjust base negative ROI based on time progression toward break-even
    const timeProgress = timeHorizon / breakEvenThreshold;
    result.roi = baseNegativeRoi + (timeProgress * 30);
    
    // Apply adoption impact - lower adoption makes negative ROI worse
    result.roi = result.roi * (1 + (adoptionImpact * 0.5));
  } else {
    // For longer timeframes, ROI improves gradually with time and adoption
    const adoptionFactor = adoptionRate / 100;
    result.roi = result.roi * adoptionFactor * (timeHorizon / 12);
  }

  return result;
};

export const calculateROI = (investment: number, returnValue: number): number => {
  return (returnValue - investment) / investment * 100;
};

/**
 * Generates timeline data points for the specified time horizon
 */
export const generateTimelineData = (
  departments: Department[],
  adoptionRate: number,
  timeHorizon: number,
  customCost: number = 0,
  industryId: string = ""
): TimelinePoint[] => {
  // Create timeline points for each month up to the time horizon
  const timeline: TimelinePoint[] = [];
  
  // Initial investment point (month 0)
  timeline.push({
    month: 0,
    label: "Initial",
    financialImpact: 0,
    investment: customCost > 0 ? customCost : calculateEstimatedInvestment(departments),
    cumulativeReturn: -1 * (customCost > 0 ? customCost : calculateEstimatedInvestment(departments)),
    roi: -100 // Initial ROI is always -100% as there are only costs, no returns yet
  });
  
  // For each month, calculate the estimated return
  for (let month = 1; month <= timeHorizon; month++) {
    // For shorter time horizons, adoption accelerates faster
    const adjustedAdoptionRate = adoptionRate * (timeHorizon <= 6 ? (month / timeHorizon) * 1.5 : month / timeHorizon);
    const cappedAdoptionRate = Math.min(adjustedAdoptionRate, adoptionRate);
    
    // Calculate impact for this specific month
    const impact = calculateTotalImpact(departments, cappedAdoptionRate, month, industryId);
    
    // Monthly return scales with time - early months have lower returns
    const monthlyReturn = impact.financialImpact * (month / timeHorizon);
    
    // Get the initial investment from the first point
    const initialInvestment = timeline[0].investment;
    
    // Calculate cumulative return (subtract initial investment)
    const prevCumulative = timeline[month - 1].cumulativeReturn;
    const cumulativeReturn = prevCumulative + (monthlyReturn / timeHorizon);
    
    // Calculate ROI at this point in time
    const currentRoi = calculateROI(initialInvestment, initialInvestment + cumulativeReturn);
    
    timeline.push({
      month,
      label: `Month ${month}`,
      financialImpact: monthlyReturn,
      investment: 0, // No additional investment after initial
      cumulativeReturn,
      roi: currentRoi
    });
  }
  
  return timeline;
};

/**
 * Estimates initial investment based on department size and industry averages
 */
const calculateEstimatedInvestment = (departments: Department[]): number => {
  // Simple estimate: $2000 per employee for implementation costs
  const totalHeadcount = departments.reduce((total, dept) => total + dept.headcount, 0);
  const baseInvestment = Math.max(15000, totalHeadcount * 2000);
  
  // Scale down for very large organizations (economies of scale)
  if (totalHeadcount > 100) {
    return baseInvestment * 0.8;
  }
  
  return baseInvestment;
};
