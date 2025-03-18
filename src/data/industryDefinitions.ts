
import { Industry } from "@/models/calculator";
import { DEPARTMENT_ROI } from "./departmentROI";

export const industryDefinitions: Record<string, Industry> = {
  technology: {
    id: "technology",
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
    id: "manufacturing",
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
    id: "finance",
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
    id: "healthcare",
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
    id: "retail",
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
    id: "media",
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
    id: "professional",
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
    id: "energy",
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
    id: "logistics",
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
    id: "insurance",
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
    id: "tourism",
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
};
