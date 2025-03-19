
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart4, BookOpen } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIPotentialCalculator from "../components/AIPotentialCalculator";

export default function Index() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="text-center my-4">
        <h1 className="text-3xl font-bold tracking-tight">AI ROI Calculator</h1>
        <p className="text-gray-500 mt-2">
          Calculate the potential return on investment for implementing AI in your organization
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tools & Resources</CardTitle>
            <CardDescription>
              Explore our suite of tools for AI implementation planning
            </CardDescription>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all">
              <div className="mb-2 text-primary">
                <BarChart4 size={24} />
              </div>
              <h3 className="font-medium">Benchmark Comparison</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Compare your potential ROI with industry benchmarks
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/benchmark" className="flex items-center gap-1">
                  <span>Compare</span>
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all">
              <div className="mb-2 text-primary">
                <BookOpen size={24} />
              </div>
              <h3 className="font-medium">Case Study Library</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Browse 40 real-world AI implementation success stories
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/case-studies" className="flex items-center gap-1">
                  <span>Explore</span>
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
            
            {/* Placeholder cards for upcoming features */}
            <div className="p-4 border rounded-lg bg-muted/30">
              <h3 className="font-medium text-muted-foreground">AI Maturity Assessment</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Coming soon
              </p>
              <Button variant="outline" size="sm" disabled>
                Start
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AIPotentialCalculator />
    </div>
  );
}
