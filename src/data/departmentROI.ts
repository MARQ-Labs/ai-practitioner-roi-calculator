
import { DepartmentROI } from "@/models/calculator";

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
