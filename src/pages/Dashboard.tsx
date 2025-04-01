
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, LineChart, BookOpen, FileText } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageFooter from "@/components/calculator/PageFooter";

const Dashboard = () => {
  return <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center my-8 relative">
        <div className="flex flex-col items-center">
          <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
            <img src="/lovable-uploads/5a85bb3c-33d0-4ee5-9030-1eea5c4027b7.png" alt="Autosolutions.ai Logo" className="w-32 mb-4 hover:opacity-80 transition-opacity" />
          </a>
          <h1 className="text-4xl font-bold tracking-tight">AI Practitioner Toolkit</h1>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            A comprehensive suite of tools designed to help AI practitioners implement, 
            measure, and optimize artificial intelligence solutions in organizations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/* ROI Calculator Card */}
        <Card className="hover:shadow-md transition-all border-2 hover:border-primary/20 flex flex-col">
          <CardHeader>
            <div className="mb-2 text-primary">
              <Calculator size={28} />
            </div>
            <CardTitle>AI ROI Calculator</CardTitle>
            <CardDescription>
              Calculate the potential return on investment for implementing AI in your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-4">
              Generate detailed forecasts of financial impact, time savings, and increased team capacity for your AI initiatives.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild className="w-full rounded-md">
              <Link to="/calculator">
                Access
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Maturity Assessment Card */}
        <Card className="hover:shadow-md transition-all border flex flex-col">
          <CardHeader>
            <div className="mb-2 text-primary">
              <LineChart size={28} />
            </div>
            <CardTitle>AI Maturity Assessment</CardTitle>
            <CardDescription>
              Evaluate your organization's readiness for AI implementation
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-4">
              Assess your current capabilities across key dimensions and receive tailored recommendations for improvement.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild className="w-full rounded-md">
              <Link to="/maturity-assessment">
                Access
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Case Studies Card */}
        <Card className="hover:shadow-md transition-all border flex flex-col">
          <CardHeader>
            <div className="mb-2 text-primary">
              <BookOpen size={28} />
            </div>
            <CardTitle>Case Study Library</CardTitle>
            <CardDescription>
              Browse real-world AI implementation success stories
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-4">
              Explore 40+ detailed case studies across industries to inform your AI strategy and implementation.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild className="w-full rounded-md">
              <Link to="/case-studies">
                Access
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Templates Card */}
        <Card className="hover:shadow-md transition-all border flex flex-col">
          <CardHeader>
            <div className="mb-2 text-primary">
              <FileText size={28} />
            </div>
            <CardTitle className="">Document Templates</CardTitle>
            <CardDescription>
              Access ready-to-use templates for AI implementation planning
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-4">
              Download standardized templates for AI project charters, data requirements, and implementation roadmaps.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button asChild className="w-full rounded-md">
              <Link to="/templates">
                Access
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <PageFooter />
    </div>;
};

export default Dashboard;
