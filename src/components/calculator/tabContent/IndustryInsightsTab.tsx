
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Industry } from "@/models/calculator";
import { getIndustryUseCases, getIndustryROIData } from "@/data/industryData";

interface IndustryInsightsTabProps {
  industry: Industry;
  industryId: string;
}

const IndustryInsightsTab: React.FC<IndustryInsightsTabProps> = ({ industry, industryId }) => {
  return (
    <div className="mt-4 animate-slide-in-right">
      <Card>
        <CardHeader>
          <CardTitle>Industry Insights: {industry.name}</CardTitle>
          <CardDescription>
            Key AI opportunities and challenges in this sector
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Key Challenges in {industry.name}</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {industry.challenges && industry.challenges.map((challenge, index) => (
                <li key={index} className="transition-all duration-300 hover:text-indigo-700">{challenge}</li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200 transition-all duration-300 hover:shadow-md">
              <div className="font-medium text-teal-800 mb-1">Key AI Use Cases</div>
              <ul className="list-disc pl-5 text-sm text-teal-700">
                {getIndustryUseCases(industryId).map((useCase, index) => (
                  <li key={index} className="transition-all duration-300 hover:text-teal-900">{useCase}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 transition-all duration-300 hover:shadow-md">
              <div className="font-medium text-indigo-800 mb-1">Industry ROI Benchmarks</div>
              <p className="text-sm text-indigo-700 mb-2">
                Based on industry research, organizations in {industry.name} typically see:
              </p>
              <ul className="list-disc pl-5 text-sm text-indigo-700">
                {(() => {
                  const roiData = getIndustryROIData(industryId);
                  return (
                    <>
                      <li><strong>Time-to-value:</strong> {roiData.timeToValue}</li>
                      <li><strong>First-year ROI:</strong> {roiData.firstYearROI}</li>
                      <li><strong>Headcount equivalent:</strong> {roiData.headcountEquivalent} of workforce</li>
                    </>
                  );
                })()}
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg mt-6 border border-amber-200 transition-all duration-300 hover:shadow-md">
            <h3 className="font-semibold text-amber-800 mb-2">Why Benefits Compound Over Time in {industry.name}</h3>
            <ul className="list-disc pl-5 space-y-1 text-amber-700">
              <li>Initial learning curve as team adapts to new tools</li>
              <li>Knowledge-sharing creates efficient workflows</li>
              <li>Team discovers novel applications over time</li>
              <li>Custom AI solutions become more refined</li>
              {industryId === "healthcare" && <li>Clinical process optimization evolves</li>}
              {industryId === "retail" && <li>Customer recommendation systems improve with data</li>}
              {industryId === "finance" && <li>Risk assessment models gain precision</li>}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryInsightsTab;
