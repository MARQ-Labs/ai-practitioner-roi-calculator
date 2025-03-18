export interface Department {
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
  overallROI?: number;
  departmentROI?: DepartmentROI[];
}

export interface DepartmentROI {
  name: string;
  roi: number;
}

export interface ROIData {
  leadersROI: string;
  timeToValue: string;
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
