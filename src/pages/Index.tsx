
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

      <AIPotentialCalculator onReportDataChange={setReportData} />
    </div>
  );
}
