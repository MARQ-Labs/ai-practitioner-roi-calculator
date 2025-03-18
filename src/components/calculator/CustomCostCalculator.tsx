
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { calculateROI } from "@/services/calculatorService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Icon from "@/components/Icon";

interface CustomCostCalculatorProps {
  totalBenefit: number;
  timeHorizon: number;
  adoptionRate: number;
  onCostChange?: (cost: { amount: number; isRecurring: boolean }) => void;
}

const CustomCostCalculator: React.FC<CustomCostCalculatorProps> = ({
  totalBenefit,
  timeHorizon,
  adoptionRate,
  onCostChange
}) => {
  const [implementationCost, setImplementationCost] = useState(100000);
  const [isRecurringCost, setIsRecurringCost] = useState(false);
  
  // Calculate total cost based on implementation cost and whether it's recurring
  const calculateTotalCost = () => {
    if (isRecurringCost) {
      // For recurring costs, we calculate the total over the time horizon
      return implementationCost * (timeHorizon / 12);
    }
    // For one-time costs, the total is just the implementation cost
    return implementationCost;
  };
  
  const totalCost = calculateTotalCost();
  
  // Calculate ROI %
  const roi = calculateROI(totalCost, totalBenefit);
  
  // Calculate payback period (in months)
  const monthlyBenefit = totalBenefit / timeHorizon;
  const paybackPeriod = monthlyBenefit > 0 ? (implementationCost / monthlyBenefit) : 0;

  // Determine ROI status
  const getRoiStatus = () => {
    if (roi > 100) return "excellent";
    if (roi > 50) return "good";
    if (roi > 0) return "moderate";
    return "poor";
  };
  
  const roiStatus = getRoiStatus();
  
  // Generate recommendation based on ROI and payback period
  const getRecommendation = () => {
    if (roiStatus === "excellent") {
      return "Strong investment opportunity with high returns.";
    } else if (roiStatus === "good") {
      return "Solid investment with good returns expected.";
    } else if (roiStatus === "moderate") {
      return "Consider adjusting adoption rate or reducing costs.";
    } else {
      if (paybackPeriod > timeHorizon) {
        return `Investment will not break even within the ${timeHorizon}-month time horizon.`;
      }
      return "Not financially viable with current assumptions.";
    }
  };

  // Notify parent component when cost changes
  useEffect(() => {
    if (onCostChange) {
      onCostChange({
        amount: implementationCost,
        isRecurring: isRecurringCost
      });
    }
  }, [implementationCost, isRecurringCost, onCostChange]);
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">Custom Cost Calculator</CardTitle>
        <CardDescription>
          Estimate your ROI based on your implementation costs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="implementation-cost">Implementation Cost ($)</Label>
            <Input
              id="implementation-cost"
              type="number"
              min="1000"
              step="1000"
              value={implementationCost}
              onChange={(e) => setImplementationCost(Number(e.target.value))}
              className="max-w-xs"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="recurring-cost"
              checked={isRecurringCost}
              onCheckedChange={setIsRecurringCost}
            />
            <Label htmlFor="recurring-cost">
              Recurring cost (yearly)
            </Label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Cost</p>
            <p className="text-2xl font-semibold">${totalCost.toLocaleString()}</p>
            <p className="text-xs text-gray-400">
              {isRecurringCost 
                ? `${implementationCost.toLocaleString()} per year × ${timeHorizon/12} years` 
                : "One-time cost"}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">ROI</p>
            <p className={`text-2xl font-semibold ${roi < 0 ? 'text-red-500' : 'text-green-600'}`}>
              {roi.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-400">
              Based on {adoptionRate}% adoption over {timeHorizon} months
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Payback Period</p>
            <p className="text-2xl font-semibold">
              {paybackPeriod > 0 && paybackPeriod < 100
                ? `${paybackPeriod.toFixed(1)} months`
                : "N/A"}
            </p>
            <p className="text-xs text-gray-400">
              {paybackPeriod > timeHorizon 
                ? "Exceeds time horizon" 
                : paybackPeriod <= 0 
                  ? "Insufficient data" 
                  : `Break even in ${Math.ceil(paybackPeriod)} months`}
            </p>
          </div>
        </div>
        
        <Alert className={`
          ${roiStatus === "excellent" ? "bg-green-50 border-green-200" : ""} 
          ${roiStatus === "good" ? "bg-blue-50 border-blue-200" : ""} 
          ${roiStatus === "moderate" ? "bg-yellow-50 border-yellow-200" : ""} 
          ${roiStatus === "poor" ? "bg-red-50 border-red-200" : ""}
        `}>
          <Icon 
            name={roiStatus === "poor" ? "trendingDown" : "trendingUp"} 
            className={`
              h-4 w-4 
              ${roiStatus === "excellent" ? "text-green-500" : ""} 
              ${roiStatus === "good" ? "text-blue-500" : ""} 
              ${roiStatus === "moderate" ? "text-yellow-500" : ""} 
              ${roiStatus === "poor" ? "text-red-500" : ""}
            `}
          />
          <AlertTitle>
            {roiStatus === "excellent" && "Excellent ROI"}
            {roiStatus === "good" && "Good ROI"}
            {roiStatus === "moderate" && "Moderate ROI"}
            {roiStatus === "poor" && "Poor ROI"}
          </AlertTitle>
          <AlertDescription>
            {getRecommendation()}
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

export default CustomCostCalculator;
