
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateROI } from "@/services/calculatorService";
import { PlusCircle, MinusCircle, AlertCircle, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/Icon";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CostItem } from "@/models/calculator";
import { formatCurrency, generateUuid } from "@/lib/utils";

interface CustomCostCalculatorProps {
  totalBenefit: number;
  timeHorizon: number;
  adoptionRate: number;
  onCostChange?: (cost: number, items?: CostItem[]) => void;
}

const CustomCostCalculator: React.FC<CustomCostCalculatorProps> = ({ 
  totalBenefit, 
  timeHorizon,
  adoptionRate,
  onCostChange
}) => {
  const [costItems, setCostItems] = useState<CostItem[]>([
    { id: generateUuid(), name: "Implementation Cost", cost: 50000, type: "one-time" }
  ]);
  
  // Calculate total cost based on all items
  const calculateTotalCost = () => {
    return costItems.reduce((total, item) => {
      if (item.type === "one-time") {
        return total + item.cost;
      } else {
        // For recurring costs, multiply by timeHorizon
        return total + (item.cost * timeHorizon);
      }
    }, 0);
  };
  
  const totalCustomCost = calculateTotalCost();
  
  // Calculate ROI based on total cost
  const roi = calculateROI(totalCustomCost, totalBenefit);
  
  // Calculate months to break even (simplified for multiple items)
  const monthlyBenefit = totalBenefit / timeHorizon;
  const oneTimeCostsTotal = costItems
    .filter(item => item.type === "one-time")
    .reduce((total, item) => total + item.cost, 0);
  const recurringCostsMonthly = costItems
    .filter(item => item.type === "recurring")
    .reduce((total, item) => total + item.cost, 0);
    
  // We have break-even when monthly benefit exceeds recurring costs AND covers one-time costs
  const netMonthlyBenefit = monthlyBenefit - recurringCostsMonthly;
  const paybackPeriod = netMonthlyBenefit > 0 
    ? oneTimeCostsTotal / netMonthlyBenefit 
    : Number.POSITIVE_INFINITY;
  
  // Determine recommendation
  const isRecommended = roi > 0;
  
  // Get recommendation text based on ROI and payback period
  const getRecommendationText = () => {
    if (roi > 100) return "Strongly Recommended";
    if (roi > 20) return "Recommended";
    if (roi > 0) return "Marginally Beneficial";
    if (paybackPeriod <= timeHorizon) return "Consider Carefully";
    return "Not Recommended";
  };

  const recommendation = getRecommendationText();
  
  // Notify parent component when costs change
  useEffect(() => {
    if (onCostChange) {
      onCostChange(totalCustomCost, costItems);
    }
  }, [totalCustomCost, costItems, onCostChange]);

  // Handle adding a new cost item
  const addCostItem = () => {
    setCostItems([
      ...costItems,
      { id: generateUuid(), name: "New Cost Item", cost: 10000, type: "one-time" }
    ]);
  };
  
  // Handle removing a cost item
  const removeCostItem = (id: string) => {
    setCostItems(costItems.filter(item => item.id !== id));
  };
  
  // Handle cost item changes
  const updateCostItem = (id: string, field: keyof CostItem, value: any) => {
    setCostItems(costItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
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
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Implementation Costs</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addCostItem}
                className="flex items-center gap-1 text-teal-600 border-teal-200 hover:bg-teal-50"
              >
                <PlusCircle size={14} />
                Add Cost Item
              </Button>
            </div>
            
            {costItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-md p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Input 
                      value={item.name}
                      onChange={(e) => updateCostItem(item.id, 'name', e.target.value)}
                      className="font-medium border-none p-0 h-7 focus-visible:ring-0"
                    />
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeCostItem(item.id)}
                    className="text-gray-400 hover:text-red-500 p-1 h-auto"
                    disabled={costItems.length === 1}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`cost-${item.id}`} className="text-xs text-gray-500">Cost Amount</Label>
                    <div className="flex items-center mt-1">
                      <button 
                        onClick={() => updateCostItem(item.id, 'cost', Math.max(0, item.cost - 10000))}
                        className="p-1 text-gray-500 hover:text-teal-600 transition-colors"
                        aria-label="Decrease cost"
                      >
                        <MinusCircle size={16} />
                      </button>
                      <Input
                        id={`cost-${item.id}`}
                        type="number"
                        value={item.cost}
                        onChange={(e) => updateCostItem(item.id, 'cost', parseFloat(e.target.value) || 0)}
                        className="mx-1 text-center h-8"
                      />
                      <button 
                        onClick={() => updateCostItem(item.id, 'cost', item.cost + 10000)}
                        className="p-1 text-gray-500 hover:text-teal-600 transition-colors"
                        aria-label="Increase cost"
                      >
                        <PlusCircle size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`type-${item.id}`} className="text-xs text-gray-500">Payment Type</Label>
                    <Select 
                      value={item.type}
                      onValueChange={(value) => updateCostItem(item.id, 'type', value as "one-time" | "recurring")}
                    >
                      <SelectTrigger id={`type-${item.id}`} className="mt-1 h-8">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time</SelectItem>
                        <SelectItem value="recurring">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
            
            {costItems.length > 1 && (
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="font-medium">Total Implementation Cost:</span>
                <span className="font-bold text-lg">
                  ${totalCustomCost.toLocaleString()}
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Projected ROI</div>
                <div className={`text-xl font-bold ${roi > 0 ? 'text-teal-600' : 'text-amber-600'}`}>
                  {roi.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">
                  {costItems.some(item => item.type === "recurring") 
                    ? "Includes recurring monthly costs" 
                    : "Based on one-time payments"}
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-gray-500 text-sm mb-1">Payback Period</div>
                <div className="text-xl font-bold text-blue-600">
                  {recurringCostsMonthly >= monthlyBenefit 
                    ? "Never" 
                    : paybackPeriod > timeHorizon 
                      ? `>${timeHorizon} months`
                      : `${Math.round(paybackPeriod)} months`}
                </div>
                <div className="text-xs text-gray-500">
                  {recurringCostsMonthly >= monthlyBenefit 
                    ? "Monthly costs exceed benefits" 
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
                      ${recommendation === "Not Recommended" ? "bg-red-100 text-red-800 hover:bg-red-200" : ""}
                    `}
                  >
                    {recommendation}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {isRecommended
                    ? "Investment projected to deliver returns"
                    : "Consider adjusting your investment"}
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
                  {isRecommended
                    ? `Investment of $${totalCustomCost.toLocaleString()} provides a positive ROI of ${roi.toFixed(1)}%.`
                    : `Current investment structure doesn't provide a positive return within the ${timeHorizon}-month projection.`
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
