import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateROI } from "@/services/calculatorService";
import Icon from "@/components/Icon";

interface CostItem {
  id: string;
  name: string;
  amount: number;
  frequency: "one-time" | "yearly";
}

interface CustomCostCalculatorProps {
  totalBenefit: number;
  timeHorizon?: number;
  adoptionRate?: number;
}

const CustomCostCalculator: React.FC<CustomCostCalculatorProps> = ({ 
  totalBenefit,
  timeHorizon = 12,
  adoptionRate = 70
}) => {
  const [costItems, setCostItems] = useState<CostItem[]>([
    { id: '1', name: 'Software Licenses', amount: 10000, frequency: "yearly" },
    { id: '2', name: 'Implementation Services', amount: 15000, frequency: "one-time" },
    { id: '3', name: 'Training', amount: 5000, frequency: "one-time" },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState<number>(0);
  const [newItemFrequency, setNewItemFrequency] = useState<"one-time" | "yearly">("one-time");
  const [isExpanded, setIsExpanded] = useState(false);

  // Calculate total cost considering one-time and recurring costs over the specified time horizon
  const calculateTotalCost = () => {
    let oneTimeCost = 0;
    let yearlyCost = 0;
    
    costItems.forEach(item => {
      if (item.frequency === "one-time") {
        oneTimeCost += item.amount;
      } else {
        yearlyCost += item.amount;
      }
    });
    
    // For yearly costs, calculate based on time horizon (prorated for partial years)
    const timeHorizonYears = timeHorizon / 12;
    const yearlyAdjusted = yearlyCost * timeHorizonYears;
    
    return oneTimeCost + yearlyAdjusted;
  };
  
  const totalCost = calculateTotalCost();
  
  // Apply time horizon and adoption rate adjustments consistent with the rest of the app
  const breakEvenThreshold = 4; // months below which ROI starts becoming negative
  const adoptionFactor = adoptionRate / 100;
  
  // Calculate benefit with time and adoption adjustments
  let adjustedBenefit = totalBenefit;
  if (timeHorizon <= breakEvenThreshold) {
    // For very short time horizons, reduce the benefit significantly
    const timeProgress = timeHorizon / breakEvenThreshold;
    adjustedBenefit = totalBenefit * timeProgress * adoptionFactor * 0.5; // More aggressive reduction
  } else {
    // Normal benefit adjustment based on time horizon and adoption
    adjustedBenefit = totalBenefit * (timeHorizon / 12) * adoptionFactor;
  }
  
  const calculatedROI = calculateROI(totalCost, adjustedBenefit);
  
  // Calculate payback period in months, accounting for one-time and recurring costs
  const calculatePaybackPeriod = () => {
    if (totalCost <= 0 || adjustedBenefit <= 0) return 0;
    
    const oneTimeCost = costItems.reduce((sum, item) => 
      sum + (item.frequency === "one-time" ? item.amount : 0), 0);
    
    const monthlyCost = costItems.reduce((sum, item) => 
      sum + (item.frequency === "yearly" ? item.amount / 12 : 0), 0);
    
    const monthlyBenefit = (adjustedBenefit / timeHorizon);
    
    // If monthly costs exceed benefits, payback is impossible
    if (monthlyCost >= monthlyBenefit) return Infinity;
    
    // Otherwise, calculate how many months of net benefit are needed to cover one-time costs
    return oneTimeCost / (monthlyBenefit - monthlyCost);
  };
  
  const paybackPeriodMonths = calculatePaybackPeriod();

  const handleAddItem = () => {
    if (newItemName.trim() === '') return;
    
    setCostItems([
      ...costItems,
      {
        id: Date.now().toString(),
        name: newItemName,
        amount: newItemAmount || 0,
        frequency: newItemFrequency
      }
    ]);
    setNewItemName('');
    setNewItemAmount(0);
    setNewItemFrequency("one-time");
  };

  const handleUpdateCost = (id: string, amount: number) => {
    setCostItems(
      costItems.map(item => 
        item.id === id ? { ...item, amount } : item
      )
    );
  };

  const handleUpdateName = (id: string, name: string) => {
    setCostItems(
      costItems.map(item => 
        item.id === id ? { ...item, name } : item
      )
    );
  };
  
  const handleUpdateFrequency = (id: string, frequency: "one-time" | "yearly") => {
    setCostItems(
      costItems.map(item => 
        item.id === id ? { ...item, frequency } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCostItems(costItems.filter(item => item.id !== id));
  };

  const getRecommendationText = (roi: number) => {
    if (timeHorizon <= breakEvenThreshold)
      return "Initial investment phase. Consider extending time horizon to 6+ months for positive ROI.";
    
    // Check if recurring costs are high relative to benefits
    const yearlyRecurringCosts = costItems.reduce((sum, item) => 
      sum + (item.frequency === "yearly" ? item.amount : 0), 0);
    const yearlyBenefits = totalBenefit * adoptionFactor;
    
    if (yearlyRecurringCosts > yearlyBenefits * 0.7) 
      return "High recurring costs. Consider reducing yearly costs to improve long-term ROI.";
    
    if (roi > 100) 
      return "Strong ROI potential. Consider accelerating implementation.";
    if (roi > 50)
      return "Good ROI potential. Proceed with planned implementation.";
    if (roi > 0)
      return "Moderate ROI. Consider phased implementation to spread costs.";
    if (roi > -20)
      return "Near break-even. Extend the time horizon or increase adoption rate.";
    return "ROI below threshold. Review cost structure or increase time horizon significantly.";
  };

  return (
    <Card className="mt-6 shadow-sm animate-fade-in">
      <CardHeader className="cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-medium">Custom Cost Calculator</CardTitle>
            <CardDescription>Calculate ROI based on your implementation costs</CardDescription>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Icon name={isExpanded ? "chevron-up" : "chevron-down"} />
          </Button>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-800 mb-4">Implementation Costs</h3>
              
              <div className="space-y-3">
                {costItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <div className="flex-grow">
                      <Input 
                        value={item.name} 
                        onChange={(e) => handleUpdateName(item.id, e.target.value)}
                        className="mb-1"
                      />
                    </div>
                    <div className="w-28">
                      <Input 
                        type="number"
                        value={item.amount}
                        onChange={(e) => handleUpdateCost(item.id, Number(e.target.value))}
                        className="text-right"
                      />
                    </div>
                    <div className="w-28">
                      <Select 
                        value={item.frequency} 
                        onValueChange={(value: "one-time" | "yearly") => handleUpdateFrequency(item.id, value)}
                      >
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="one-time">One-time</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Icon name="trash-2" size={16} />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex items-end space-x-2">
                <div className="flex-grow">
                  <Label htmlFor="new-cost-name" className="text-xs text-gray-500">Item Name</Label>
                  <Input 
                    id="new-cost-name"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    placeholder="New cost item"
                  />
                </div>
                <div className="w-24">
                  <Label htmlFor="new-cost-amount" className="text-xs text-gray-500">Amount ($)</Label>
                  <Input 
                    id="new-cost-amount"
                    type="number"
                    value={newItemAmount || ''}
                    onChange={(e) => setNewItemAmount(Number(e.target.value))}
                    className="text-right"
                  />
                </div>
                <div className="w-28">
                  <Label htmlFor="new-cost-frequency" className="text-xs text-gray-500">Frequency</Label>
                  <Select 
                    value={newItemFrequency} 
                    onValueChange={(value: "one-time" | "yearly") => setNewItemFrequency(value)}
                  >
                    <SelectTrigger id="new-cost-frequency" className="h-9">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  onClick={handleAddItem}
                  size="sm"
                  variant="outline"
                  className="text-teal-600 border-teal-200 hover:bg-teal-50"
                >
                  <Icon name="plus" size={16} className="mr-1" />
                  Add
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-4">ROI Analysis</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Total Implementation Cost:</span>
                  <span className="font-bold text-gray-800">${totalCost.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Projected AI Benefits ({timeHorizon} months):</span>
                  <span className="font-bold text-teal-600">${Math.round(adjustedBenefit).toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Return on Investment (ROI):</span>
                  <span className={`font-bold ${calculatedROI >= 0 ? 'text-green-600' : 'text-amber-600'}`}>
                    {calculatedROI.toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Payback Period:</span>
                  <span className="font-bold text-indigo-600">
                    {timeHorizon <= breakEvenThreshold 
                      ? 'Beyond time horizon'
                      : calculatedROI < 0
                      ? 'Beyond time horizon'
                      : !isFinite(paybackPeriodMonths)
                      ? 'Not achievable with current costs'
                      : paybackPeriodMonths < 1 
                      ? 'Less than 1 month'
                      : `${Math.ceil(paybackPeriodMonths)} months`}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">One-time costs:</span>
                    <span className="font-medium text-gray-800">
                      ${costItems.reduce((sum, item) => sum + (item.frequency === "one-time" ? item.amount : 0), 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Yearly recurring costs:</span>
                    <span className="font-medium text-gray-800">
                      ${costItems.reduce((sum, item) => sum + (item.frequency === "yearly" ? item.amount : 0), 0).toLocaleString()}/year
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Monthly cost breakdown:</span>
                    <span className="font-medium text-gray-800">
                      ${((costItems.reduce((sum, item) => sum + (item.frequency === "yearly" ? item.amount : 0), 0) / 12) + 
                         (costItems.reduce((sum, item) => sum + (item.frequency === "one-time" ? item.amount : 0), 0) / timeHorizon)).toLocaleString()}/month
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                <p className="text-sm text-gray-600">
                  {getRecommendationText(calculatedROI)}
                </p>
                {timeHorizon <= breakEvenThreshold && (
                  <p className="text-xs text-amber-600 mt-2">
                    Note: ROI is typically negative in the first {breakEvenThreshold} months during initial implementation and training phase.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CustomCostCalculator;
