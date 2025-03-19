
import { MaturityCategory, MaturityQuestion } from "@/models/assessment";

export const maturityQuestions: MaturityQuestion[] = [
  {
    id: "strategy1",
    text: "How well-defined is your organization's AI strategy?",
    category: "Strategy & Roadmap",
    options: [
      {
        text: "No formal AI strategy",
        value: 1,
        description: "We haven't developed a formal AI strategy yet"
      },
      {
        text: "Basic planning",
        value: 2,
        description: "We have some initial plans but not a comprehensive strategy"
      },
      {
        text: "Defined strategy",
        value: 3,
        description: "We have a defined AI strategy with clear goals"
      },
      {
        text: "Comprehensive strategy",
        value: 4,
        description: "We have a comprehensive strategy integrated with business objectives"
      }
    ]
  },
  {
    id: "strategy2",
    text: "How does your organization prioritize AI initiatives?",
    category: "Strategy & Roadmap",
    options: [
      {
        text: "Ad-hoc approach",
        value: 1,
        description: "We pursue AI projects as they arise without formal prioritization"
      },
      {
        text: "Basic prioritization",
        value: 2,
        description: "We have a basic process for selecting AI initiatives"
      },
      {
        text: "Structured framework",
        value: 3,
        description: "We use a structured framework to evaluate and prioritize AI projects"
      },
      {
        text: "Value-driven portfolio",
        value: 4,
        description: "We maintain a strategic portfolio of AI initiatives aligned with business value"
      }
    ]
  },
  {
    id: "data1",
    text: "How would you describe your organization's data quality and accessibility?",
    category: "Data Readiness",
    options: [
      {
        text: "Limited data access",
        value: 1,
        description: "Data is siloed and difficult to access"
      },
      {
        text: "Moderate data access",
        value: 2,
        description: "Some data is accessible but quality is inconsistent"
      },
      {
        text: "Good data foundation",
        value: 3,
        description: "Most data is accessible with consistent quality"
      },
      {
        text: "Advanced data platform",
        value: 4,
        description: "Comprehensive data platform with high-quality, accessible data"
      }
    ]
  },
  {
    id: "data2",
    text: "What level of data governance does your organization maintain?",
    category: "Data Readiness",
    options: [
      {
        text: "Minimal governance",
        value: 1,
        description: "Few to no formal data governance processes"
      },
      {
        text: "Basic governance",
        value: 2,
        description: "Some governance policies but limited enforcement"
      },
      {
        text: "Structured governance",
        value: 3,
        description: "Well-defined governance framework across most data"
      },
      {
        text: "Comprehensive governance",
        value: 4,
        description: "Robust governance framework with clear ownership and quality controls"
      }
    ]
  },
  {
    id: "tech1",
    text: "How mature is your AI infrastructure and tooling?",
    category: "Technology Infrastructure",
    options: [
      {
        text: "Experimental",
        value: 1,
        description: "Using basic tools or experimental setups"
      },
      {
        text: "Developing",
        value: 2,
        description: "Some dedicated AI infrastructure in place"
      },
      {
        text: "Established",
        value: 3,
        description: "Robust AI infrastructure supporting multiple projects"
      },
      {
        text: "Advanced",
        value: 4,
        description: "Enterprise-grade AI infrastructure with comprehensive tooling"
      }
    ]
  },
  {
    id: "tech2",
    text: "How integrated is AI with your existing systems?",
    category: "Technology Infrastructure",
    options: [
      {
        text: "Minimal integration",
        value: 1,
        description: "AI systems operate separately from core business systems"
      },
      {
        text: "Partial integration",
        value: 2,
        description: "Some AI capabilities integrated with select systems"
      },
      {
        text: "Significant integration",
        value: 3,
        description: "AI well-integrated across many key systems"
      },
      {
        text: "Full integration",
        value: 4,
        description: "AI seamlessly integrated across the technology ecosystem"
      }
    ]
  },
  {
    id: "talent1",
    text: "How would you describe your organization's AI talent and skills?",
    category: "Talent & Skills",
    options: [
      {
        text: "Limited expertise",
        value: 1,
        description: "Few or no dedicated AI specialists"
      },
      {
        text: "Growing capability",
        value: 2,
        description: "Small team with basic AI skills"
      },
      {
        text: "Strong capability",
        value: 3,
        description: "Dedicated team with specialized AI expertise"
      },
      {
        text: "Industry-leading",
        value: 4,
        description: "Deep AI expertise across multiple disciplines"
      }
    ]
  },
  {
    id: "talent2",
    text: "What level of AI training does your organization provide?",
    category: "Talent & Skills",
    options: [
      {
        text: "Minimal training",
        value: 1,
        description: "Little to no formal AI training"
      },
      {
        text: "Basic training",
        value: 2,
        description: "Some AI awareness training for select roles"
      },
      {
        text: "Structured program",
        value: 3,
        description: "Comprehensive AI training program for various roles"
      },
      {
        text: "Advanced ecosystem",
        value: 4,
        description: "Robust AI education ecosystem with continuous development"
      }
    ]
  },
  {
    id: "governance1",
    text: "How mature are your AI ethics and governance practices?",
    category: "Governance & Ethics",
    options: [
      {
        text: "Emergent",
        value: 1,
        description: "Limited consideration of AI ethics and governance"
      },
      {
        text: "Developing",
        value: 2,
        description: "Basic ethics guidelines being established"
      },
      {
        text: "Established",
        value: 3,
        description: "Formal ethics framework and governance processes"
      },
      {
        text: "Leading practice",
        value: 4,
        description: "Comprehensive ethics and governance integrated into all AI activities"
      }
    ]
  },
  {
    id: "governance2",
    text: "How does your organization monitor and manage AI risks?",
    category: "Governance & Ethics",
    options: [
      {
        text: "Reactive approach",
        value: 1,
        description: "Address risks as they emerge"
      },
      {
        text: "Basic monitoring",
        value: 2,
        description: "Some risk monitoring but limited formal processes"
      },
      {
        text: "Structured framework",
        value: 3,
        description: "Formal risk management framework for AI initiatives"
      },
      {
        text: "Comprehensive program",
        value: 4,
        description: "Robust risk management integrated with enterprise risk processes"
      }
    ]
  }
];

export const getMaturityLevel = (score: number): { level: MaturityLevel, description: string } => {
  if (score < 1.75) {
    return {
      level: 'Exploratory',
      description: 'Your organization is in the early stages of AI adoption with significant opportunities for growth.'
    };
  } else if (score < 2.5) {
    return {
      level: 'Developing',
      description: 'Your organization has established a foundation for AI but needs more structured approaches to scale.'
    };
  } else if (score < 3.25) {
    return {
      level: 'Advancing',
      description: 'Your organization has a mature AI practice with opportunities to further optimize and integrate.'
    };
  } else {
    return {
      level: 'Leading',
      description: 'Your organization demonstrates industry-leading AI practices with sophisticated implementation.'
    };
  }
};

export const getRecommendations = (categoryScores: Record<MaturityCategory, number>): string[] => {
  const recommendations: string[] = [];
  
  if (categoryScores['Strategy & Roadmap'] < 2.5) {
    recommendations.push('Develop a formal AI strategy aligned with business objectives');
    recommendations.push('Establish a structured approach to AI project prioritization');
  }
  
  if (categoryScores['Data Readiness'] < 2.5) {
    recommendations.push('Improve data quality, accessibility, and governance');
    recommendations.push('Create a comprehensive data management strategy');
  }
  
  if (categoryScores['Technology Infrastructure'] < 2.5) {
    recommendations.push('Invest in more robust AI infrastructure and tooling');
    recommendations.push('Develop a plan for integrating AI with core business systems');
  }
  
  if (categoryScores['Talent & Skills'] < 2.5) {
    recommendations.push('Build internal AI expertise through hiring and training');
    recommendations.push('Implement structured AI training programs across different roles');
  }
  
  if (categoryScores['Governance & Ethics'] < 2.5) {
    recommendations.push('Establish formal AI ethics guidelines and governance processes');
    recommendations.push('Develop a structured approach to AI risk management');
  }
  
  // Add general recommendations if doing well overall
  if (Object.values(categoryScores).every(score => score >= 3)) {
    recommendations.push('Share your AI expertise and best practices within your industry');
    recommendations.push('Explore cutting-edge AI applications to maintain competitive advantage');
  }
  
  return recommendations;
};
