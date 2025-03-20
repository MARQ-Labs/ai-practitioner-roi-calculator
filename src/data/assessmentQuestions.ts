
import { MaturityCategory, MaturityQuestion, MaturityLevel } from "@/models/assessment";

export const maturityQuestions: MaturityQuestion[] = [
  {
    id: "strategy1",
    text: "How well-defined is your organization's AI strategy?",
    explanation: "This question asks about whether you have a formal plan for how your organization will use AI. A well-defined strategy means having clear goals, timelines, and resources allocated for AI initiatives, rather than pursuing AI projects on an ad-hoc basis.",
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
    explanation: "This question is about how you decide which AI projects to pursue first. Organizations with mature approaches have a systematic way to evaluate potential AI projects based on factors like business value, feasibility, and strategic alignment, rather than just starting projects based on enthusiasm or trends.",
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
    explanation: "This question asks about how good your data is and how easy it is to access. AI systems rely on data to learn and make predictions. High-quality data is accurate, complete, and consistent. Accessible data means authorized people can easily find and use the data they need when they need it.",
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
    explanation: "This question is about the rules and processes you have for managing data. Data governance includes policies about who can access data, how data quality is maintained, who is responsible for different datasets, and how data privacy and security are ensured.",
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
    explanation: "This question asks about the technical foundation you have for AI work. This includes the hardware (like servers or cloud resources), software tools, and development environments your team uses to build and deploy AI solutions.",
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
    explanation: "This question is about how well your AI solutions connect with your other business software and processes. Fully integrated AI works seamlessly with your existing tools, rather than functioning as separate, stand-alone applications that require manual data transfers.",
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
    explanation: "This question asks about your team's expertise in AI. This includes specialist roles like data scientists and machine learning engineers, as well as general AI knowledge among other employees who might work with AI systems or their outputs.",
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
    explanation: "This question is about how you build AI knowledge within your organization. This could include formal training programs, workshops, on-the-job learning opportunities, and resources to help staff at all levels understand AI concepts relevant to their roles.",
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
    explanation: "This question asks about your approach to ensuring AI is used responsibly. This includes policies about fairness, transparency, privacy, and safety in AI systems, as well as processes to enforce these policies and address ethical issues that arise.",
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
    explanation: "This question is about identifying and addressing potential problems with AI systems. Risks might include errors in AI outputs, security vulnerabilities, compliance issues, or unintended consequences of AI use. Mature organizations have systematic ways to identify, assess, and mitigate these risks.",
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
