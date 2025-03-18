
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import ROIChart from "@/components/ROIChart";
import { Industry } from "@/models/calculator";

interface ROIAnalysisTabProps {
  industry: Industry;
  roiData: any;
}

const ROIAnalysisTab: React.FC<ROIAnalysisTabProps> = ({ industry, roiData }) => {
  return (
    <div className="mt-4 animate-slide-in-right">
      <Card>
        <CardHeader>
          <CardTitle>ROI Analysis for {industry.name}</CardTitle>
          <CardDescription>
            Industry-specific return on investment data from AI implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">ROI Key Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Industry Average ROI:</span>
                  <span className="font-bold text-teal-700">{industry.overallROI}%</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">AI Leaders ROI:</span>
                  <span className="font-bold text-teal-700">{roiData.leadersROI}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Generative AI Multiplier:</span>
                  <span className="font-bold text-teal-700">3.7x</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Time to Value:</span>
                  <span className="font-bold text-teal-700">{roiData.timeToValue}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Maturity Timeline:</span>
                  <span className="font-bold text-teal-700">{roiData.maturityTimeline}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Implementation Success Factors</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Allocate at least 5% of total budget to AI initiatives</li>
                <li>Ensure high data quality (accuracy currently at 54.6%)</li>
                <li>Implement across multiple departments simultaneously</li>
                <li>Secure executive leadership involvement in governance</li>
                <li>Plan for {roiData.maturityTimeline} to reach full maturity</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <ROIChart industry={industry} />
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">ROI Calculation Methodology</h3>
            <p className="text-sm text-gray-600">
              The ROI data is based on industry research from 2023-2024 across multiple sectors.
              The calculations include direct cost savings, productivity improvements, and new 
              revenue opportunities enabled by AI. The maturity timeline considers implementation, 
              training, and adoption phases.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ROIAnalysisTab;
