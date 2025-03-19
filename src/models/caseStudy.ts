
export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  url: string;
  industry: Industry;
}

export type Industry = 
  | 'Healthcare & Life Sciences'
  | 'Financial Services'
  | 'Manufacturing & Industrial'
  | 'Technology & Telecommunications'
  | 'Retail & Consumer Goods'
  | 'Energy & Utilities'
  | 'Professional Services'
  | 'Transportation & Hospitality'
  | 'Education & Government'
  | 'Software & Development'
  | 'Cross-Industry Solutions';
