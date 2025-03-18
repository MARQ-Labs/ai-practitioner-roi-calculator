
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
