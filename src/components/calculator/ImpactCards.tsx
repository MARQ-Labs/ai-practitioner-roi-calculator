
import React from "react";
import { Card, CardContent } from "@/components/Card";
import Icon from "@/components/Icon";
import { TotalImpact } from "@/models/calculator";

interface ImpactCardsProps {
  totalImpact: TotalImpact;
  industryROI: string;
  leaderROI: string;
}

const ImpactCards: React.FC<ImpactCardsProps> = ({ totalImpact, industryROI, leaderROI }) => {
  // Use the time-adjusted ROI from totalImpact, fallback to industry average if needed
  const calculatedROI = totalImpact.roi || parseFloat(industryROI);
  
  // Get status message based on ROI
  const getRoiStatusMessage = (roi: number) => {
    if (roi <= -10) return "Initial investment phase, ROI negative";
    if (roi < 0) return "Early adoption phase, approaching break-even";
    if (roi < 15) return "Break-even point reached, early returns";
    if (roi < 50) return "Positive ROI, good investment";
    return "Strong ROI, excellent investment";
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 card-hover-effect animate-scale-in" style={{ animationDelay: "0.15s" }}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-teal-800 font-medium">Additional Team Capacity</h3>
            <Icon name="users" className="text-teal-600" size={28} />
          </div>
          <div className="text-3xl font-bold text-teal-800 mb-1">
            {totalImpact.fteEquivalent.toFixed(1)} FTEs
          </div>
          <p className="text-sm text-teal-700">
            Equivalent to adding {totalImpact.fteEquivalent.toFixed(1)} full-time team members
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
            {Math.round(totalImpact.hoursSaved).toLocaleString()} hours
          </div>
          <p className="text-sm text-amber-700">
            Time redirected to strategic priorities and high-value work
          </p>
          <div className="text-xs text-amber-600 mt-4 flex items-center">
            <span className="font-medium">Per team member:</span>
            <span className="ml-1">{totalImpact.headcount ? Math.round(totalImpact.hoursSaved / totalImpact.headcount) : 0} hours/year</span>
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
            ${Math.round(totalImpact.financialImpact).toLocaleString()}
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
      
      <Card className={`bg-gradient-to-br ${calculatedROI >= 0 ? 'from-green-50 to-green-100 border-green-200' : 'from-amber-50 to-amber-100 border-amber-200'} card-hover-effect animate-scale-in`} style={{ animationDelay: "0.45s" }}>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className={`${calculatedROI >= 0 ? 'text-green-800' : 'text-amber-800'} font-medium`}>Return on Investment</h3>
            <Icon name={calculatedROI >= 0 ? "trendingUp" : "trendingDown"} className={calculatedROI >= 0 ? "text-green-600" : "text-amber-600"} size={28} />
          </div>
          <div className={`text-3xl font-bold ${calculatedROI >= 0 ? 'text-green-800' : 'text-amber-800'} mb-1`}>
            {calculatedROI.toFixed(1)}%
          </div>
          <p className={`text-sm ${calculatedROI >= 0 ? 'text-green-700' : 'text-amber-700'}`}>
            {getRoiStatusMessage(calculatedROI)}
          </p>
          <div className={`text-xs ${calculatedROI >= 0 ? 'text-green-600' : 'text-amber-600'} mt-4 flex items-center`}>
            <span className="font-medium">Industry benchmark:</span>
            <span className="ml-1">{leaderROI} for mature implementations</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactCards;
