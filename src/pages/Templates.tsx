
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileText, Download } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageFooter from "@/components/calculator/PageFooter";

const templateItems = [
  {
    title: "Statement of Work (SoW) Template",
    description: "A comprehensive template for AI implementations defining project scope, deliverables, and timelines",
    type: "Word",
    category: "Project Documentation",
    popularity: "New",
    path: "/statement-of-work-template"
  },
  {
    title: "Master Services Agreement (MSA)",
    description: "A detailed legal contract template for AI services defining terms of engagement between service provider and client",
    type: "Word",
    category: "Legal Documentation",
    popularity: "New",
    path: "/master-services-agreement-template"
  },
  {
    title: "Non-Disclosure Agreement (NDA)",
    description: "A customizable NDA template specifically designed for protecting AI-related intellectual property and confidential information",
    type: "Word",
    category: "Legal Documentation",
    popularity: "New",
    path: "/non-disclosure-agreement-template"
  },
  {
    title: "Data Processing Agreement (DPA)",
    description: "A comprehensive data processing agreement template for companies working with AI vendors handling personal data",
    type: "Word",
    category: "Legal Documentation",
    popularity: "New",
    path: "/data-processing-agreement-template"
  },
  {
    title: "Service Level Agreement (SLA)",
    description: "A detailed agreement template establishing performance standards, support expectations, and quality metrics for AI systems",
    type: "Word",
    category: "Legal Documentation",
    popularity: "New",
    path: "/service-level-agreement-template"
  }
];

const Templates = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="text-center my-4 relative">
        <div className="absolute left-0 top-0">
          <Button variant="outline" size="sm" asChild className="flex items-center gap-1">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col items-center">
          <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/5a85bb3c-33d0-4ee5-9030-1eea5c4027b7.png" 
              alt="Autosolutions.ai Logo" 
              className="w-32 mb-4 hover:opacity-80 transition-opacity"
            />
          </a>
          <h1 className="text-3xl font-bold tracking-tight">AI Implementation Templates</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Access standardized templates to streamline your AI implementation process. 
            These templates cover various aspects of AI project planning, execution, and governance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {templateItems.map((template, index) => (
          <Card key={index} className="hover:shadow-md transition-all border flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="mb-2 text-primary">
                  <FileText size={24} />
                </div>
                {template.popularity && (
                  <Badge variant={template.popularity === "New" ? "secondary" : "default"} className="ml-2">
                    {template.popularity}
                  </Badge>
                )}
              </div>
              <CardTitle>{template.title}</CardTitle>
              <div className="flex gap-2 mt-1">
                <Badge variant="outline">{template.type}</Badge>
                <Badge variant="outline" className="bg-gray-50">{template.category}</Badge>
              </div>
              <CardDescription className="mt-2">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              {template.path ? (
                <Button variant="outline" size="sm" asChild className="w-full flex items-center justify-center gap-2">
                  <Link to={template.path}>
                    <FileText className="h-4 w-4" />
                    <span>Use Template</span>
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download Template</span>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h2 className="text-xl font-semibold mb-4">Need a Custom Template?</h2>
        <p className="mb-4">
          Don't see what you're looking for? Our AI experts can create custom templates 
          tailored to your specific industry and use case requirements.
        </p>
        <Button asChild>
          <a 
            href="https://autosolutions-ai.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            <span>Request Custom Template</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <PageFooter />
    </div>
  );
};

export default Templates;
