
export interface Department {
  id: string;
  name: string;
  avgSalary: number;
  headcount: number;
  efficiencyGain: number;
}

export interface DepartmentROI {
  name: string;
  roi: number;
}

export interface Industry {
  name: string;
  description: string;
  efficiencyGains: Record<string, number>;
  challenges: string[];
  overallROI?: number;
  departmentROI?: DepartmentROI[];
  maturityTimeline?: string;
}

export interface DepartmentImpact {
  financialImpact: number;
  hoursSaved: number;
  fteEquivalent: number;
  headcount: number;
  roi?: number;
}

export interface TotalImpact {
  financialImpact: number;
  hoursSaved: number;
  fteEquivalent: number;
  headcount: number;
  roi?: number;
}

export interface IndustryData {
  industries: Record<string, Industry>;
  industryDepartments: Record<string, Department[]>;
}

export interface ROIData {
  timeToValue: string;
  firstYearROI: string;
  headcountEquivalent: string;
  averageROI?: string;
  leadersROI?: string;
  maturityTimeline?: string;
}
