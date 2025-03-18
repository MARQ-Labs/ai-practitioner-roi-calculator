
import { Department } from "@/models/calculator";

export const industryDepartments: Record<string, Department[]> = {
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
};
