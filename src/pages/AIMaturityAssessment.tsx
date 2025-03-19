
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import MaturityAssessmentForm from "@/components/assessment/MaturityAssessmentForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const AIMaturityAssessment = () => {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" className="mr-2" asChild>
          <Link to="/" className="flex items-center gap-1">
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </Button>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">AI Maturity Assessment</h1>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Evaluate your organization's readiness for AI implementation across key dimensions 
          and receive tailored recommendations for improvement.
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>
            Complete this assessment to understand your organization's current AI maturity level
          </CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="mx-auto rounded-full bg-primary/10 p-2 h-12 w-12 flex items-center justify-center">
              <span className="font-bold text-lg text-primary">1</span>
            </div>
            <h3 className="font-medium">Answer the Questions</h3>
            <p className="text-sm text-muted-foreground">
              Respond to questions across five key dimensions of AI maturity
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="mx-auto rounded-full bg-primary/10 p-2 h-12 w-12 flex items-center justify-center">
              <span className="font-bold text-lg text-primary">2</span>
            </div>
            <h3 className="font-medium">Get Your Score</h3>
            <p className="text-sm text-muted-foreground">
              Receive an overall maturity score and breakdown by category
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="mx-auto rounded-full bg-primary/10 p-2 h-12 w-12 flex items-center justify-center">
              <span className="font-bold text-lg text-primary">3</span>
            </div>
            <h3 className="font-medium">Review Recommendations</h3>
            <p className="text-sm text-muted-foreground">
              Get tailored recommendations to improve your AI maturity
            </p>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Assessment Questionnaire</h2>
        <p className="text-muted-foreground mb-6">
          Please select the option that best describes your organization's current state for each question.
        </p>
        
        <MaturityAssessmentForm />
      </div>
    </div>
  );
};

export default AIMaturityAssessment;
