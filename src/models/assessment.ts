
export interface MaturityQuestion {
  id: string;
  text: string;
  explanation: string;
  category: MaturityCategory;
  options: MaturityOption[];
}

export interface MaturityOption {
  text: string;
  value: number;
  description: string;
}

export type MaturityCategory = 
  | 'Strategy & Roadmap'
  | 'Data Readiness'
  | 'Technology Infrastructure'
  | 'Talent & Skills'
  | 'Governance & Ethics';

export interface MaturityResult {
  overallScore: number;
  categoryScores: Record<MaturityCategory, number>;
  maturityLevel: MaturityLevel;
  recommendations: string[];
}

export type MaturityLevel = 
  | 'Exploratory'
  | 'Developing'
  | 'Advancing'
  | 'Leading';
