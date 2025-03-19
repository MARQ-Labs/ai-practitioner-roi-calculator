
import React from "react";
import { ReportData, getSummaryText } from "@/utils/pdfExport";
import { formatCurrency } from "@/lib/utils";
import { WORK_HOURS_PER_YEAR } from "@/data/industryData";

interface ReportContentProps {
  data: ReportData;
}

const ReportContent: React.FC<ReportContentProps> = ({ data }) => {
  const { industry, totalImpact, departments, timeHorizon, adoptionRate, customCost, date } = data;
  
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white" id="pdf-content">
      {/* Header */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-teal-800 mb-2">{data.title}</h1>
        <p className="text-gray-600">Generated on {date}</p>
      </div>
      
      {/* Summary Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Executive Summary</h2>
        <div className="bg-teal-50 p-4 rounded-lg">
          <p className="whitespace-pre-line text-gray-800">{getSummaryText(data)}</p>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Key Impact Metrics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-amber-50">
            <h3 className="font-medium text-amber-800">Time Saved</h3>
            <p className="text-2xl font-bold text-amber-900">{Math.round(totalImpact.hoursSaved).toLocaleString()} hours</p>
            <p className="text-sm text-amber-700">Over {timeHorizon} months</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-indigo-50">
            <h3 className="font-medium text-indigo-800">Financial Impact</h3>
            <p className="text-2xl font-bold text-indigo-900">{formatCurrency(totalImpact.financialImpact)}</p>
            <p className="text-sm text-indigo-700">Value of reclaimed capacity</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-teal-50">
            <h3 className="font-medium text-teal-800">Team Capacity</h3>
            <p className="text-2xl font-bold text-teal-900">{totalImpact.fteEquivalent.toFixed(2)} FTEs</p>
            <p className="text-sm text-teal-700">Equivalent additional staff</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-green-50">
            <h3 className="font-medium text-green-800">ROI</h3>
            <p className="text-2xl font-bold text-green-900">
              {customCost 
                ? `${((totalImpact.financialImpact / customCost) * 100 - 100).toFixed(2)}%`
                : `${((totalImpact.financialImpact / (totalImpact.financialImpact * 0.3)) * 100 - 100).toFixed(2)}%`
              }
            </p>
            <p className="text-sm text-green-700">Return on investment</p>
          </div>
        </div>
      </div>
      
      {/* Department Breakdown */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Department Impact</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Department</th>
              <th className="border p-2 text-right">Headcount</th>
              <th className="border p-2 text-right">Hours Saved</th>
              <th className="border p-2 text-right">FTE Equivalent</th>
              <th className="border p-2 text-right">Financial Impact</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => {
              // Calculate hourly rate from annual salary
              const hourlyRate = dept.avgSalary / WORK_HOURS_PER_YEAR;
              
              // Calculate hours saved based on efficiency gain percentage
              const efficiencyRate = dept.efficiencyGain / 100;
              const hoursPerEmployee = WORK_HOURS_PER_YEAR * efficiencyRate;
              const hoursSaved = dept.headcount * hoursPerEmployee * (adoptionRate / 100);
              
              const fteEquivalent = hoursSaved / WORK_HOURS_PER_YEAR;
              const financialImpact = hoursSaved * hourlyRate;
              
              return (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="border p-2">{dept.name}</td>
                  <td className="border p-2 text-right">{dept.headcount}</td>
                  <td className="border p-2 text-right">{Math.round(hoursSaved).toLocaleString()}</td>
                  <td className="border p-2 text-right">{fteEquivalent.toFixed(2)}</td>
                  <td className="border p-2 text-right">{formatCurrency(financialImpact)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold">
              <td className="border p-2">Total</td>
              <td className="border p-2 text-right">{totalImpact.headcount}</td>
              <td className="border p-2 text-right">{Math.round(totalImpact.hoursSaved).toLocaleString()}</td>
              <td className="border p-2 text-right">{totalImpact.fteEquivalent.toFixed(2)}</td>
              <td className="border p-2 text-right">{formatCurrency(totalImpact.financialImpact)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      {/* Implementation Parameters */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Implementation Parameters</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800">Industry</h3>
            <p className="text-lg">{industry.name}</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800">Time Horizon</h3>
            <p className="text-lg">{timeHorizon} months</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800">Adoption Rate</h3>
            <p className="text-lg">{adoptionRate}%</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800">Investment</h3>
            <p className="text-lg">{formatCurrency(customCost || totalImpact.financialImpact * 0.3)}</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-12 pt-6 border-t">
        <p>Generated using AI ROI Calculator</p>
        <p>© {new Date().getFullYear()} - All metrics are projections based on industry data</p>
      </div>
    </div>
  );
};

export default ReportContent;
