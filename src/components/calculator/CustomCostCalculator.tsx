
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateROI } from "@/services/calculatorService";
import { PlusCircle, MinusCircle, AlertCircle } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/Icon";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface CustomCostCalculatorProps {
  totalBenefit: number;
  timeHorizon: number;
  adoptionRate: number;
  onCostChange?: (cost: number) => void;
}

const CustomCostCalculator: React.FC<CustomCostCalculatorProps> = ({ 
  totalBenefit, 
  timeHorizon,
  adoptionRate,
  onCostChange
}) => {
  const [customCost, setCustomCost] = useState<number>(50000);
  const [paymentType, setPaymentType] = useState<"one-time" | "recurring">("one-time");
  
  // Calculate ROI and payback period based on cost
  const roi = calculateROI(customCost, totalBenefit);
  
  // For recurring costs, calculate different ROI
  const effectiveROI = paymentType === "recurring" 
    ? calculateROI(customCost * timeHorizon / 12, totalBenefit) 
    : roi;
  
  // Calculate months to break even
  const monthlyBenefit = totalBenefit / timeHorizon;
  const paybackPeriod = paymentType === "one-time" 
    ? customCost / monthlyBenefit
    : Number.POSITIVE_INFINITY; // For recurring costs, there's no true payback

  // Determine recommendation
  const isRecommended = effectiveROI > 0;
  
  // Get recommendation text based on ROI and payback period
  const getRecommendationText = () => {
    if (paymentType === "recurring") {
      if (effectiveROI > 100) return "Strongly Recommended";
      if (effectiveROI > 20) return "Recommended";
      if (effectiveROI > 0) return "Marginally Beneficial";
      return "Not Recommended";
    } else {
      if (paybackPeriod < timeHorizon / 3) return "Strongly Recommended";
      if (paybackPeriod < timeHorizon / 2) return "Recommended";
      if (paybackPeriod < timeHorizon) return "Consider Carefully";
      return "Long-term Investment";
    }
  };

  const recommendation = getRecommendationText();
  
  // Notify parent component when custom cost changes
  useEffect(() => {
    if (onCostChange) {
      onCostChange(customCost);
    }
  }, [customCost, onCostChange]);

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setCustomCost(value);
  };

  const decreaseCost = () => {
    setCustomCost(Math.max(0, customCost - 10000));
  };

  const increaseCost = () => {
    setCustomCost(customCost + 10000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="lineChart" className="text-teal-600" size={20} />
          Custom ROI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Label htmlFor="customCost" className="flex items-center gap-1">
              Implementation Cost
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AlertCircle size={14} className="text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">The estimated cost to implement AI across your organization</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center">
              <button 
                onClick={decreaseCost}
                className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
                aria-label="Decrease cost"
              >
                <MinusCircle size={20} />
              </button>
              <Input
                id="customCost"
                type="number"
                value={customCost}
                onChange={handleCostChange}
                className="mx-2 text-center"
              />
              <button 
                onClick={increaseCost}
                className="p-2 text-gray-500 hover:text-teal-600 transition-colors"
                aria-label="Increase cost"
              >
                <PlusCircle size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentType">Payment Type</Label>
              <Select 
                value={paymentType}
                onValueChange={(value) => setPaymentType(value as "one-time" | "recurring")}
              >
                <SelectTrigger id="paymentType">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time payment</SelectItem>
                  <SelectItem value="recurring">Recurring (monthly)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Projected ROI</div>
                <div className={`text-xl font-bold ${effectiveROI > 0 ? 'text-teal-600' : 'text-amber-600'}`}>
                  {effectiveROI.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">
                  {paymentType === "recurring" ? "Monthly recurring cost" : "Based on one-time payment"}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Payback Period</div>
                <div className="text-xl font-bold text-blue-600">
                  {paymentType === "recurring" 
                    ? "N/A" 
                    : paybackPeriod > timeHorizon 
                      ? `>${timeHorizon} months`
                      : `${Math.round(paybackPeriod)} months`}
                </div>
                <div className="text-xs text-gray-500">
                  {paymentType === "recurring" 
                    ? "Continuous expense" 
                    : paybackPeriod > timeHorizon 
                      ? "Beyond projection window"
                      : "Time to break even"}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Recommendation</div>
                <div className="flex items-center gap-1">
                  <Badge 
                    className={`
                      ${recommendation === "Strongly Recommended" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : ""}
                      ${recommendation === "Recommended" ? "bg-green-100 text-green-800 hover:bg-green-200" : ""}
                      ${recommendation === "Marginally Beneficial" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : ""}
                      ${recommendation === "Consider Carefully" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : ""}
                      ${recommendation === "Long-term Investment" ? "bg-orange-100 text-orange-800 hover:bg-orange-200" : ""}
                      ${recommendation === "Not Recommended" ? "bg-red-100 text-red-800 hover:bg-red-200" : ""}
                    `}
                  >
                    {recommendation}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {paymentType === "recurring"
                    ? effectiveROI > 0 
                      ? "Monthly benefit exceeds cost" 
                      : "Cost exceeds monthly benefit"
                    : paybackPeriod < timeHorizon 
                      ? "Will break even within projection" 
                      : "Long-term investment"
                  }
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                {isRecommended 
                  ? "Your investment is projected to deliver positive returns within the selected timeframe."
                  : "Consider adjusting your investment or extending the time horizon to improve ROI."}
              </p>
              
              <div className="flex items-start gap-1">
                <Icon name={isRecommended ? "check" : "x"} 
                  className={isRecommended ? "text-green-600" : "text-amber-600"} 
                  size={16} 
                />
                <p className="flex-1">
                  {paymentType === "recurring"
                    ? isRecommended
                      ? `Monthly cost of $${(customCost).toLocaleString()} is justified by the monthly return.`
                      : `Monthly cost exceeds the expected monthly return. Consider reducing recurring costs.`
                    : paybackPeriod < timeHorizon
                      ? `One-time investment of $${customCost.toLocaleString()} will be recouped in approximately ${Math.round(paybackPeriod)} months.`
                      : `One-time investment of $${customCost.toLocaleString()} has a payback period extending beyond the current ${timeHorizon}-month projection.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCostCalculator;
