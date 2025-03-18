
import { IndustryData } from "@/models/calculator";

export const WORK_DAYS_PER_YEAR = 230;
export const WORK_HOURS_PER_DAY = 7.5;
export const WORK_HOURS_PER_YEAR = WORK_DAYS_PER_YEAR * WORK_HOURS_PER_DAY;

export const TIME_ADOPTION_CURVE: Record<number, number> = {
  3: 0.4,   // 40% of full benefits at 3 months
  6: 0.6,   // 60% of full benefits at 6 months
  12: 0.9,  // 90% of full benefits at 12 months
  24: 1.0   // 100% of full benefits at 24 months
};

export const industryData: IndustryData = {
  industries: {
    tourism: {
      name: "Tourism & Hospitality",
      description: "Tourism organizations, hotels, tour operators, and destination management",
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
      ]
    },
    finance: {
      name: "Financial Services",
      description: "Banks, insurance companies, investment firms, and financial advisories",
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
      ]
    },
    healthcare: {
      name: "Healthcare",
      description: "Hospitals, clinics, care facilities, and healthcare providers",
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
      ]
    },
    retail: {
      name: "Retail",
      description: "Retailers, e-commerce, and consumer goods businesses",
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
      ]
    },
    technology: {
      name: "Technology",
      description: "Software companies, IT services, and tech startups",
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
      ]
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
    ]
  }
};

export const getIndustryUseCases = (industryId: string): string[] => {
  switch (industryId) {
    case "tourism":
      return [
        "Personalized itinerary creation",
        "Dynamic pricing optimization",
        "Multilingual customer service",
        "Visitor flow management"
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
    case "technology":
      return [
        "Code generation and review",
        "Bug detection and fixing",
        "Documentation automation",
        "Customer support optimization"
      ];
    default:
      return [];
  }
};

export const getIndustryROIData = (industryId: string): { timeToValue: string; firstYearROI: string; headcountEquivalent: string } => {
  switch (industryId) {
    case "technology":
      return {
        timeToValue: "2-4 months",
        firstYearROI: "250-400%",
        headcountEquivalent: "10-20%"
      };
    case "healthcare":
      return {
        timeToValue: "6-12 months",
        firstYearROI: "150-200%",
        headcountEquivalent: "10-20%"
      };
    case "retail":
      return {
        timeToValue: "3-6 months",
        firstYearROI: "200-300%",
        headcountEquivalent: "15-25%"
      };
    default:
      return {
        timeToValue: "3-6 months",
        firstYearROI: "200-300%",
        headcountEquivalent: "10-20%"
      };
  }
};
