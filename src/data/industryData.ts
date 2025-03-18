import { IndustryData, DepartmentROI, ROIData } from "@/models/calculator";

export const WORK_DAYS_PER_YEAR = 230;
export const WORK_HOURS_PER_DAY = 7.5;
export const WORK_HOURS_PER_YEAR = WORK_DAYS_PER_YEAR * WORK_HOURS_PER_DAY;

export const TIME_ADOPTION_CURVE: Record<number, number> = {
  3: 0.4,   // 40% of full benefits at 3 months
  6: 0.6,   // 60% of full benefits at 6 months
  12: 0.9,  // 90% of full benefits at 12 months
  24: 1.0   // 100% of full benefits at 24 months
};

// Department ROI data across industries
export const DEPARTMENT_ROI: Record<string, DepartmentROI[]> = {
  technology: [
    { name: "IT Operations", roi: 69 },
    { name: "Product Development", roi: 42 },
    { name: "Marketing", roi: 41 },
    { name: "Customer Service", roi: 74 },
    { name: "Finance", roi: 35 },
    { name: "Human Resources", roi: 30 },
    { name: "Executive", roi: 38 }
  ],
  manufacturing: [
    { name: "Operations", roi: 39 },
    { name: "Supply Chain", roi: 64 },
    { name: "Quality Control", roi: 45 },
    { name: "R&D", roi: 42 },
    { name: "Marketing", roi: 30 },
    { name: "Finance", roi: 32 },
    { name: "Human Resources", roi: 28 },
    { name: "Executive", roi: 35 }
  ],
  finance: [
    { name: "Risk Management", roi: 55 },
    { name: "Financial Reporting", roi: 62 },
    { name: "Treasury Management", roi: 48 },
    { name: "Client Services", roi: 74 },
    { name: "Marketing", roi: 41 },
    { name: "Compliance", roi: 45 },
    { name: "Human Resources", roi: 28 },
    { name: "Executive Leadership", roi: 38 }
  ],
  healthcare: [
    { name: "Document Assessment", roi: 57 },
    { name: "Clinical Staff", roi: 50 },
    { name: "Medical Research", roi: 45 },
    { name: "Administrative", roi: 36 },
    { name: "Marketing", roi: 30 },
    { name: "Billing & Coding", roi: 28 },
    { name: "Human Resources", roi: 25 },
    { name: "Leadership", roi: 32 }
  ],
  retail: [
    { name: "Marketing", roi: 41 },
    { name: "Customer Service", roi: 74 },
    { name: "Supply Chain", roi: 55 },
    { name: "Operations", roi: 39 },
    { name: "Finance", roi: 30 },
    { name: "Human Resources", roi: 25 },
    { name: "Executive", roi: 30 }
  ],
  media: [
    { name: "Workflow Automation", roi: 43 },
    { name: "Content Creation", roi: 50 },
    { name: "Customer Service", roi: 74 },
    { name: "Marketing", roi: 41 },
    { name: "Operations", roi: 35 },
    { name: "Finance", roi: 28 },
    { name: "Human Resources", roi: 25 },
    { name: "Executive", roi: 32 }
  ],
  professional: [
    { name: "Document Analysis", roi: 48 },
    { name: "Research and Analysis", roi: 52 },
    { name: "Client Service", roi: 74 },
    { name: "Marketing", roi: 41 },
    { name: "Finance", roi: 35 },
    { name: "Human Resources", roi: 28 },
    { name: "Executive", roi: 36 }
  ],
  energy: [
    { name: "Operations", roi: 45 },
    { name: "Maintenance", roi: 50 },
    { name: "Customer Service", roi: 65 },
    { name: "Planning", roi: 66 },
    { name: "Finance", roi: 30 },
    { name: "Human Resources", roi: 25 },
    { name: "Executive", roi: 32 }
  ],
  logistics: [
    { name: "Supply Chain", roi: 64 },
    { name: "Route Optimization", roi: 55 },
    { name: "Customer Service", roi: 65 },
    { name: "Operations", roi: 39 },
    { name: "Finance", roi: 28 },
    { name: "Human Resources", roi: 25 },
    { name: "Executive", roi: 30 }
  ],
  insurance: [
    { name: "Claims Processing", roi: 60 },
    { name: "Risk Assessment", roi: 55 },
    { name: "Customer Service", roi: 74 },
    { name: "Fraud Detection", roi: 65 },
    { name: "Marketing", roi: 41 },
    { name: "Finance", roi: 32 },
    { name: "Human Resources", roi: 25 },
    { name: "Executive", roi: 34 }
  ],
  tourism: [
    { name: "Customer Service", roi: 74 },
    { name: "Marketing & Digital", roi: 41 },
    { name: "Operations", roi: 39 },
    { name: "Business Development", roi: 35 },
    { name: "Executive Team", roi: 32 }
  ]
};

export const industryData: IndustryData = {
  industries: {
    technology: {
      name: "Information & Communication Technology",
      description: "Software companies, IT services, and tech startups",
      overallROI: 45,
      departmentROI: DEPARTMENT_ROI.technology,
      efficiencyGains: {
        executive: 20,
        engineering: 40,
        product: 35,
        design: 45,
        marketing: 40
      },
      challenges: [
        "Code generation and review",
        "Product documentation",
        "Customer support automation",
        "Development workflow optimization"
      ],
      maturityTimeline: "13 months"
    },
    manufacturing: {
      name: "Manufacturing",
      description: "Manufacturing companies, industrial production, and factory operations",
      overallROI: 40,
      departmentROI: DEPARTMENT_ROI.manufacturing,
      efficiencyGains: {
        operations: 39,
        supplyChain: 64,
        qualityControl: 45,
        productDev: 42,
        marketing: 30
      },
      challenges: [
        "Supply chain optimization",
        "Quality control automation",
        "Predictive maintenance",
        "Production scheduling"
      ],
      maturityTimeline: "16 months"
    },
    finance: {
      name: "Financial Services",
      description: "Banks, investment firms, and financial advisories",
      overallROI: 42,
      departmentROI: DEPARTMENT_ROI.finance,
      efficiencyGains: {
        executive: 15,
        compliance: 30,
        customerService: 35,
        marketing: 40,
        investment: 50
      },
      challenges: [
        "Regulatory compliance demands",
        "Risk assessment accuracy",
        "Customer data security",
        "Market volatility response"
      ],
      maturityTimeline: "14 months"
    },
    healthcare: {
      name: "Healthcare",
      description: "Hospitals, clinics, care facilities, and healthcare providers",
      overallROI: 38,
      departmentROI: DEPARTMENT_ROI.healthcare,
      efficiencyGains: {
        executive: 15,
        clinical: 20,
        administrative: 35,
        billing: 45,
        patientServices: 30
      },
      challenges: [
        "Patient care optimization",
        "Medical records management",
        "Insurance processing",
        "Healthcare compliance"
      ],
      maturityTimeline: "18 months"
    },
    retail: {
      name: "Retail & Consumer Goods",
      description: "Retailers, e-commerce, and consumer goods businesses",
      overallROI: 36,
      departmentROI: DEPARTMENT_ROI.retail,
      efficiencyGains: {
        executive: 15,
        sales: 30,
        marketing: 45,
        supplyChain: 35,
        customerService: 40
      },
      challenges: [
        "Inventory management",
        "Omnichannel experience",
        "Product recommendations",
        "Demand forecasting"
      ],
      maturityTimeline: "15 months"
    },
    media: {
      name: "Media & Telecommunications",
      description: "Media companies, publishers, telecoms, and broadcasting",
      overallROI: 37,
      departmentROI: DEPARTMENT_ROI.media,
      efficiencyGains: {
        executive: 32,
        content: 50,
        marketing: 41,
        customerService: 74,
        operations: 35
      },
      challenges: [
        "Content creation and curation",
        "Audience targeting",
        "Customer engagement",
        "Network optimization"
      ],
      maturityTimeline: "14 months"
    },
    professional: {
      name: "Professional Services",
      description: "Consulting firms, legal services, and professional advisories",
      overallROI: 34,
      departmentROI: DEPARTMENT_ROI.professional,
      efficiencyGains: {
        executive: 36,
        research: 52,
        clientService: 74,
        marketing: 41,
        operations: 35
      },
      challenges: [
        "Knowledge management",
        "Client service optimization",
        "Research automation",
        "Document analysis"
      ],
      maturityTimeline: "16 months"
    },
    energy: {
      name: "Energy & Utilities",
      description: "Energy companies, utilities, and resource management",
      overallROI: 33,
      departmentROI: DEPARTMENT_ROI.energy,
      efficiencyGains: {
        executive: 32,
        operations: 45,
        maintenance: 50,
        customerService: 65,
        planning: 66
      },
      challenges: [
        "Resource optimization",
        "Predictive maintenance",
        "Grid management",
        "Consumption forecasting"
      ],
      maturityTimeline: "19 months"
    },
    logistics: {
      name: "Transportation & Logistics",
      description: "Shipping, transportation, and logistics services",
      overallROI: 35,
      departmentROI: DEPARTMENT_ROI.logistics,
      efficiencyGains: {
        executive: 30,
        supplyChain: 64,
        routeOptimization: 55,
        customerService: 65,
        operations: 39
      },
      challenges: [
        "Route optimization",
        "Fleet management",
        "Delivery prediction",
        "Warehouse automation"
      ],
      maturityTimeline: "15 months"
    },
    insurance: {
      name: "Insurance",
      description: "Insurance providers, brokers, and risk management",
      overallROI: 36,
      departmentROI: DEPARTMENT_ROI.insurance,
      efficiencyGains: {
        executive: 34,
        claims: 60,
        riskAssessment: 55,
        customerService: 74,
        fraudDetection: 65
      },
      challenges: [
        "Risk assessment",
        "Claims processing",
        "Fraud detection",
        "Customer service automation"
      ],
      maturityTimeline: "16 months"
    },
    tourism: {
      name: "Tourism & Hospitality",
      description: "Tourism organizations, hotels, tour operators, and destination management",
      overallROI: 30,
      departmentROI: DEPARTMENT_ROI.tourism,
      efficiencyGains: {
        executive: 15,
        marketing: 40,
        businessDev: 30,
        operations: 20,
        customerService: 45
      },
      challenges: [
        "Seasonal demand fluctuations",
        "Guest experience personalization",
        "Destination marketing competition",
        "Sustainability initiatives"
      ],
      maturityTimeline: "18 months"
    }
  },
  industryDepartments: {
    tourism: [
      { id: "dept1", name: "Executive Team", avgSalary: 180000, headcount: 2, efficiencyGain: 15 },
      { id: "dept2", name: "Marketing & Digital", avgSalary: 75000, headcount: 8, efficiencyGain: 40 },
      { id: "dept3", name: "Business Development", avgSalary: 72000, headcount: 6, efficiencyGain: 30 },
      { id: "dept4", name: "Operations", avgSalary: 65000, headcount: 9, efficiencyGain: 20 },
      { id: "dept5", name: "Customer Service", avgSalary: 55000, headcount: 12, efficiencyGain: 45 }
    ],
    finance: [
      { id: "dept1", name: "Executive Leadership", avgSalary: 200000, headcount: 3, efficiencyGain: 15 },
      { id: "dept2", name: "Compliance & Risk", avgSalary: 85000, headcount: 5, efficiencyGain: 30 },
      { id: "dept3", name: "Client Services", avgSalary: 65000, headcount: 10, efficiencyGain: 35 },
      { id: "dept4", name: "Marketing", avgSalary: 80000, headcount: 6, efficiencyGain: 40 },
      { id: "dept5", name: "Investment Analysis", avgSalary: 95000, headcount: 8, efficiencyGain: 50 }
    ],
    healthcare: [
      { id: "dept1", name: "Leadership", avgSalary: 190000, headcount: 2, efficiencyGain: 15 },
      { id: "dept2", name: "Clinical Staff", avgSalary: 90000, headcount: 15, efficiencyGain: 20 },
      { id: "dept3", name: "Administrative", avgSalary: 60000, headcount: 8, efficiencyGain: 35 },
      { id: "dept4", name: "Billing & Coding", avgSalary: 55000, headcount: 6, efficiencyGain: 45 },
      { id: "dept5", name: "Patient Services", avgSalary: 50000, headcount: 10, efficiencyGain: 30 }
    ],
    retail: [
      { id: "dept1", name: "Executive Team", avgSalary: 170000, headcount: 2, efficiencyGain: 15 },
      { id: "dept2", name: "Sales Operations", avgSalary: 65000, headcount: 10, efficiencyGain: 30 },
      { id: "dept3", name: "Marketing", avgSalary: 75000, headcount: 7, efficiencyGain: 45 },
      { id: "dept4", name: "Supply Chain", avgSalary: 70000, headcount: 8, efficiencyGain: 35 },
      { id: "dept5", name: "Customer Service", avgSalary: 50000, headcount: 15, efficiencyGain: 40 }
    ],
    technology: [
      { id: "dept1", name: "Executive", avgSalary: 210000, headcount: 3, efficiencyGain: 20 },
      { id: "dept2", name: "Engineering", avgSalary: 130000, headcount: 15, efficiencyGain: 40 },
      { id: "dept3", name: "Product Management", avgSalary: 140000, headcount: 5, efficiencyGain: 35 },
      { id: "dept4", name: "Design", avgSalary: 110000, headcount: 6, efficiencyGain: 45 },
      { id: "dept5", name: "Marketing", avgSalary: 95000, headcount: 8, efficiencyGain: 40 }
    ],
    media: [
      { id: "dept1", name: "Executive", avgSalary: 190000, headcount: 3, efficiencyGain: 32 },
      { id: "dept2", name: "Content Creation", avgSalary: 110000, headcount: 10, efficiencyGain: 50 },
      { id: "dept3", name: "Marketing", avgSalary: 95000, headcount: 7, efficiencyGain: 41 },
      { id: "dept4", name: "Customer Service", avgSalary: 60000, headcount: 12, efficiencyGain: 74 },
      { id: "dept5", name: "Operations", avgSalary: 80000, headcount: 9, efficiencyGain: 35 }
    ],
    professional: [
      { id: "dept1", name: "Executive", avgSalary: 180000, headcount: 3, efficiencyGain: 36 },
      { id: "dept2", name: "Research and Analysis", avgSalary: 120000, headcount: 8, efficiencyGain: 52 },
      { id: "dept3", name: "Client Service", avgSalary: 75000, headcount: 15, efficiencyGain: 74 },
      { id: "dept4", name: "Marketing", avgSalary: 90000, headcount: 6, efficiencyGain: 41 },
      { id: "dept5", name: "Operations", avgSalary: 70000, headcount: 10, efficiencyGain: 35 }
    ],
    energy: [
      { id: "dept1", name: "Executive", avgSalary: 200000, headcount: 3, efficiencyGain: 32 },
      { id: "dept2", name: "Operations", avgSalary: 85000, headcount: 12, efficiencyGain: 45 },
      { id: "dept3", name: "Maintenance", avgSalary: 70000, headcount: 10, efficiencyGain: 50 },
      { id: "dept4", name: "Customer Service", avgSalary: 60000, headcount: 15, efficiencyGain: 65 },
      { id: "dept5", name: "Planning", avgSalary: 100000, headcount: 5, efficiencyGain: 66 }
    ],
    logistics: [
      { id: "dept1", name: "Executive", avgSalary: 170000, headcount: 3, efficiencyGain: 30 },
      { id: "dept2", name: "Supply Chain", avgSalary: 90000, headcount: 10, efficiencyGain: 64 },
      { id: "dept3", name: "Route Optimization", avgSalary: 80000, headcount: 7, efficiencyGain: 55 },
      { id: "dept4", name: "Customer Service", avgSalary: 65000, headcount: 12, efficiencyGain: 65 },
      { id: "dept5", name: "Operations", avgSalary: 75000, headcount: 9, efficiencyGain: 39 }
    ],
    insurance: [
      { id: "dept1", name: "Executive", avgSalary: 190000, headcount: 3, efficiencyGain: 34 },
      { id: "dept2", name: "Claims Processing", avgSalary: 70000, headcount: 10, efficiencyGain: 60 },
      { id: "dept3", name: "Risk Assessment", avgSalary: 95000, headcount: 8, efficiencyGain: 55 },
      { id: "dept4", name: "Customer Service", avgSalary: 60000, headcount: 15, efficiencyGain: 74 },
      { id: "dept5", name: "Fraud Detection", avgSalary: 85000, headcount: 6, efficiencyGain: 65 }
    ],
    manufacturing: [
      { id: "dept1", name: "Executive", avgSalary: 180000, headcount: 3, efficiencyGain: 15 },
      { id: "dept2", name: "Operations", avgSalary: 75000, headcount: 15, efficiencyGain: 39 },
      { id: "dept3", name: "Supply Chain", avgSalary: 85000, headcount: 10, efficiencyGain: 64 },
      { id: "dept4", name: "Quality Control", avgSalary: 80000, headcount: 8, efficiencyGain: 45 },
      { id: "dept5", name: "R&D", avgSalary: 110000, headcount: 6, efficiencyGain: 42 }
    ]
  }
};

// Helper function to get department ROI
export const getDepartmentROI = (industryId: string, departmentName: string): number | undefined => {
  const industry = industryData.industries[industryId];
  if (!industry || !industry.departmentROI) return undefined;
  
  // Try to find an exact match
  const deptROI = industry.departmentROI.find(d => 
    d.name.toLowerCase() === departmentName.toLowerCase()
  );
  
  if (deptROI) return deptROI.roi;
  
  // Try to find a partial match
  const partialMatch = industry.departmentROI.find(d => 
    departmentName.toLowerCase().includes(d.name.toLowerCase()) || 
    d.name.toLowerCase().includes(departmentName.toLowerCase())
  );
  
  return partialMatch?.roi;
};

export const getIndustryUseCases = (industryId: string): string[] => {
  switch (industryId) {
    case "technology":
      return [
        "Code generation and review",
        "Bug detection and fixing",
        "Documentation automation",
        "Customer support optimization"
      ];
    case "manufacturing":
      return [
        "Predictive maintenance",
        "Quality control automation",
        "Supply chain optimization",
        "Production scheduling"
      ];
    case "finance":
      return [
        "Fraud detection and prevention",
        "Automated risk assessment",
        "Personalized financial advice",
        "Regulatory compliance monitoring"
      ];
    case "healthcare":
      return [
        "Clinical documentation assistance",
        "Patient scheduling optimization",
        "Insurance coding automation",
        "Clinical research support"
      ];
    case "retail":
      return [
        "Inventory forecasting",
        "Customer behavior analysis",
        "Personalized recommendations",
        "Visual search capabilities"
      ];
    case "media":
      return [
        "Content creation and curation",
        "Audience targeting",
        "Personalized advertising",
        "Workflow automation"
      ];
    case "professional":
      return [
        "Document analysis",
        "Research automation",
        "Client service optimization",
        "Knowledge management"
      ];
    case "energy":
      return [
        "Resource optimization",
        "Predictive maintenance",
        "Grid management",
        "Consumption forecasting"
      ];
    case "logistics":
      return [
        "Route optimization",
        "Fleet management",
        "Delivery prediction",
        "Warehouse automation"
      ];
    case "insurance":
      return [
        "Risk assessment",
        "Claims processing",
        "Fraud detection",
        "Customer service automation"
      ];
    case "tourism":
      return [
        "Personalized itinerary creation",
        "Dynamic pricing optimization",
        "Multilingual customer service",
        "Visitor flow management"
      ];
    default:
      return [];
  }
};

export const getIndustryROIData = (industryId: string): ROIData => {
  const industry = industryData.industries[industryId];
  
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
