
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, LineChart, BarChart4, ArrowLeft } from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIPotentialCalculator from "../components/AIPotentialCalculator";
import PdfExportButton from "../components/pdf/PdfExportButton";

export default function Index() {
  // Get reportData from AIPotentialCalculator to pass to PDF button
  const [reportData, setReportData] = useState(null);

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
        
        <div className="absolute right-0 top-0">
          {reportData && <PdfExportButton reportData={reportData} />}
        </div>
        
        <div className="flex flex-col items-center">
          <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/5a85bb3c-33d0-4ee5-9030-1eea5c4027b7.png" 
              alt="Autosolutions.ai Logo" 
              className="w-32 mb-4 hover:opacity-80 transition-opacity"
            />
          </a>
          <h1 className="text-3xl font-bold tracking-tight">AI ROI Calculator</h1>
          <p className="text-gray-500 mt-2">
            Calculate the potential return on investment for implementing AI in your organization
          </p>
        </div>
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
            
            <div className="p-4 border rounded-lg hover:border-primary/50 hover:shadow-sm transition-all">
              <div className="mb-2 text-primary">
                <LineChart size={24} />
              </div>
              <h3 className="font-medium">AI Maturity Assessment</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Evaluate your organization's readiness for AI implementation
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/maturity-assessment" className="flex items-center gap-1">
                  <span>Assess</span>
                  <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <AIPotentialCalculator onReportDataChange={setReportData} />
    </div>
  );
}
