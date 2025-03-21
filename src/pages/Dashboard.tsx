
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, LineChart, BookOpen, BarChart4 } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import PageFooter from "@/components/calculator/PageFooter";

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center my-8 relative">
        <div className="flex flex-col items-center">
          <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/5a85bb3c-33d0-4ee5-9030-1eea5c4027b7.png" 
              alt="Autosolutions.ai Logo" 
              className="w-32 mb-4 hover:opacity-80 transition-opacity"
            />
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
        <Card className="hover:shadow-md transition-all border-2 hover:border-primary/20">
          <CardHeader>
            <div className="mb-2 text-primary">
              <Calculator size={28} />
            </div>
            <CardTitle>AI ROI Calculator</CardTitle>
            <CardDescription>
              Calculate the potential return on investment for implementing AI in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Generate detailed forecasts of financial impact, time savings, and increased team capacity for your AI initiatives.
            </p>
            <Link 
              to="/calculator" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Open Calculator
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Maturity Assessment Card */}
        <Card className="hover:shadow-md transition-all border">
          <CardHeader>
            <div className="mb-2 text-primary">
              <LineChart size={28} />
            </div>
            <CardTitle>AI Maturity Assessment</CardTitle>
            <CardDescription>
              Evaluate your organization's readiness for AI implementation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Assess your current capabilities across key dimensions and receive tailored recommendations for improvement.
            </p>
            <Link 
              to="/maturity-assessment" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Take Assessment
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Case Studies Card */}
        <Card className="hover:shadow-md transition-all border">
          <CardHeader>
            <div className="mb-2 text-primary">
              <BookOpen size={28} />
            </div>
            <CardTitle>Case Study Library</CardTitle>
            <CardDescription>
              Browse real-world AI implementation success stories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Explore 40+ detailed case studies across industries to inform your AI strategy and implementation.
            </p>
            <Link 
              to="/case-studies" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Browse Studies
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Benchmark Comparison Card */}
        <Card className="hover:shadow-md transition-all border">
          <CardHeader>
            <div className="mb-2 text-primary">
              <BarChart4 size={28} />
            </div>
            <CardTitle>Benchmark Comparison</CardTitle>
            <CardDescription>
              Compare your AI metrics against industry benchmarks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              See how your organization's AI initiatives stack up against industry leaders and peers.
            </p>
            <Link 
              to="/benchmark" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Compare Metrics
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <PageFooter />
    </div>
  );
};

export default Dashboard;
