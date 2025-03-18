
export interface Department {
  id: string;
  name: string;
  avgSalary: number;
  headcount: number;
  efficiencyGain: number;
}

export interface Industry {
  name: string;
  description: string;
  efficiencyGains: Record<string, number>;
  challenges: string[];
}

export interface DepartmentImpact {
  financialImpact: number;
  hoursSaved: number;
  fteEquivalent: number;
  headcount: number;
}

export interface TotalImpact {
  financialImpact: number;
  hoursSaved: number;
  fteEquivalent: number;
  headcount: number;
}

export interface IndustryData {
  industries: Record<string, Industry>;
  industryDepartments: Record<string, Department[]>;
}
