
export interface Department {
  id: string;
  name: string;
  headcount: number;
  avgSalary: number;
  efficiencyGain: number;
}

export interface DepartmentImpact {
  financialImpact: number;
  hoursSaved: number;
  fteEquivalent: number;
  headcount: number;
  roi: number;
}

export interface TotalImpact {
  financialImpact: number;
  hoursSaved: number;
  fteEquivalent: number;
  headcount: number;
  roi: number;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  overallROI?: number;
  departmentROI?: DepartmentROI[];
  challenges?: string[];
  maturityTimeline?: string;
  efficiencyGains?: Record<string, number>;
}

export interface DepartmentROI {
  name: string;
  roi: number;
}

export interface ROIData {
  timeToValue: string;
  firstYearROI: string;
  headcountEquivalent: string;
  averageROI?: string;
  leadersROI: string;
  maturityTimeline: string;
}

export interface TimelinePoint {
  month: number;
  label: string;
  financialImpact: number;
  investment: number;
  cumulativeReturn: number;
  roi: number;
  formattedLabel?: string; // For chart display
}

export interface IndustryData {
  industries: Record<string, Industry>;
  industryDepartments: Record<string, Department[]>;
}

export interface CostItem {
  id: string;
  name: string;
  cost: number;
  type: "one-time" | "recurring";
}
