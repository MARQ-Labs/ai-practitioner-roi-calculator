
import React from "react";
import { Card, CardContent } from "@/components/Card";
import Icon from "@/components/Icon";
import { TotalImpact } from "@/models/calculator";
import { calculateROI } from "@/services/calculatorService";

interface ImpactCardsProps {
  totalImpact: TotalImpact;
  industryROI: string;
  leaderROI: string;
  customCost?: number;
}

const ImpactCards: React.FC<ImpactCardsProps> = ({ 
  totalImpact, 
  industryROI, 
  leaderROI,
  customCost = 0 
}) => {
  // Calculate ROI using the same method as CustomCostCalculator 
  // Use custom cost if provided, otherwise use a default calculation
  const investment = customCost > 0 ? customCost : totalImpact.financialImpact * 0.3;
  const calculatedROI = calculateROI(investment, totalImpact.financialImpact);
  
  // Get status message based on ROI
  const getRoiStatusMessage = (roi: number) => {
    if (isNaN(roi) || roi === Infinity || roi === -Infinity) return "Awaiting data";
    if (roi <= -10) return "Initial investment phase, ROI negative";
    if (roi < 0) return "Early adoption phase, approaching break-even";
    if (roi < 15) return "Break-even point reached, early returns";
    if (roi < 50) return "Positive ROI, good investment";
    return "Strong ROI, excellent investment";
  };
  
  // Format ROI value safely
  const formatROI = (roi: number) => {
    if (isNaN(roi) || roi === Infinity || roi === -Infinity) {
      return "N/A";
    }
    return roi.toFixed(2) + "%";
  };
  
  console.log("Impact Cards Data:", {
    totalImpact,
    industryROI,
    leaderROI,
    customCost,
    calculatedROI: formatROI(calculatedROI)
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 card-hover-effect animate-scale-in" style={{ animationDelay: "0.15s" }}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-teal-800 font-medium">Additional Team Capacity</h3>
            <Icon name="users" className="text-teal-600" size={28} />
          </div>
          <div className="text-3xl font-bold text-teal-800 mb-1">
            {!isNaN(totalImpact.fteEquivalent) ? totalImpact.fteEquivalent.toFixed(2) : "0.00"} FTEs
          </div>
          <p className="text-sm text-teal-700">
            Equivalent to adding {!isNaN(totalImpact.fteEquivalent) ? totalImpact.fteEquivalent.toFixed(2) : "0.00"} full-time team members
          </p>
          <div className="text-xs text-teal-600 mt-4 flex items-center">
            <span className="font-medium">Current team size:</span>
            <span className="ml-1">{totalImpact.headcount} staff members</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 card-hover-effect animate-scale-in" style={{ animationDelay: "0.25s" }}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-amber-800 font-medium">Hours Reclaimed Annually</h3>
            <Icon name="clock" className="text-amber-600" size={28} />
          </div>
          <div className="text-3xl font-bold text-amber-800 mb-1">
            {!isNaN(totalImpact.hoursSaved) ? Math.round(totalImpact.hoursSaved).toLocaleString() : "0"} hours
          </div>
          <p className="text-sm text-amber-700">
            Time redirected to strategic priorities and high-value work
          </p>
          <div className="text-xs text-amber-600 mt-4 flex items-center">
            <span className="font-medium">Per team member:</span>
            <span className="ml-1">
              {totalImpact.headcount && !isNaN(totalImpact.hoursSaved) 
                ? Math.round(totalImpact.hoursSaved / totalImpact.headcount) 
                : 0} hours/year
            </span>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 card-hover-effect animate-scale-in" style={{ animationDelay: "0.35s" }}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-indigo-800 font-medium">Estimated Value</h3>
            <Icon name="chart" className="text-indigo-600" size={28} />
          </div>
          <div className="text-3xl font-bold text-indigo-800 mb-1">
            ${!isNaN(totalImpact.financialImpact) ? Math.round(totalImpact.financialImpact).toLocaleString() : "0"}
          </div>
          <p className="text-sm text-indigo-700">
            Financial equivalent of reclaimed capacity
          </p>
          <div className="text-xs text-indigo-600 mt-4 flex items-center">
            <span className="font-medium">Calculation method:</span>
            <span className="ml-1">Role-specific hourly rates × time saved</span>
          </div>
        </CardContent>
      </Card>
      
      <Card className={`bg-gradient-to-br ${!isNaN(calculatedROI) && calculatedROI >= 0 ? 'from-green-50 to-green-100 border-green-200' : 'from-amber-50 to-amber-100 border-amber-200'} card-hover-effect animate-scale-in`} style={{ animationDelay: "0.45s" }}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`${!isNaN(calculatedROI) && calculatedROI >= 0 ? 'text-green-800' : 'text-amber-800'} font-medium`}>Return on Investment</h3>
            <Icon name={!isNaN(calculatedROI) && calculatedROI >= 0 ? "trendingUp" : "trendingDown"} className={!isNaN(calculatedROI) && calculatedROI >= 0 ? "text-green-600" : "text-amber-600"} size={28} />
          </div>
          <div className={`text-3xl font-bold ${!isNaN(calculatedROI) && calculatedROI >= 0 ? 'text-green-800' : 'text-amber-800'} mb-1`}>
            {formatROI(calculatedROI)}
          </div>
          <p className={`text-sm ${!isNaN(calculatedROI) && calculatedROI >= 0 ? 'text-green-700' : 'text-amber-700'}`}>
            {getRoiStatusMessage(calculatedROI)}
          </p>
          <div className={`text-xs ${!isNaN(calculatedROI) && calculatedROI >= 0 ? 'text-green-600' : 'text-amber-600'} mt-4 flex items-center`}>
            <span className="font-medium">Investment amount:</span>
            <span className="ml-1">${Math.round(investment).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactCards;
