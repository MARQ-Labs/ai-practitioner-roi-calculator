
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { calculateROI } from "@/services/calculatorService";
import Icon from "@/components/Icon";

interface CostItem {
  id: string;
  name: string;
  amount: number;
}

interface CustomCostCalculatorProps {
  totalBenefit: number;
}

const CustomCostCalculator: React.FC<CustomCostCalculatorProps> = ({ totalBenefit }) => {
  const [costItems, setCostItems] = useState<CostItem[]>([
    { id: '1', name: 'Software Licenses', amount: 10000 },
    { id: '2', name: 'Implementation Services', amount: 15000 },
    { id: '3', name: 'Training', amount: 5000 },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const totalCost = costItems.reduce((sum, item) => sum + item.amount, 0);
  const calculatedROI = calculateROI(totalCost, totalBenefit);
  const paybackPeriodMonths = totalCost > 0 ? (totalCost / (totalBenefit / 12)) : 0;

  const handleAddItem = () => {
    if (newItemName.trim() === '') return;
    
    setCostItems([
      ...costItems,
      {
        id: Date.now().toString(),
        name: newItemName,
        amount: newItemAmount || 0
      }
    ]);
    setNewItemName('');
    setNewItemAmount(0);
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

  const handleRemoveItem = (id: string) => {
    setCostItems(costItems.filter(item => item.id !== id));
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
                <div className="w-28">
                  <Label htmlFor="new-cost-amount" className="text-xs text-gray-500">Amount ($)</Label>
                  <Input 
                    id="new-cost-amount"
                    type="number"
                    value={newItemAmount || ''}
                    onChange={(e) => setNewItemAmount(Number(e.target.value))}
                    className="text-right"
                  />
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
                  <span className="text-gray-600">Projected AI Benefits:</span>
                  <span className="font-bold text-teal-600">${totalBenefit.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Return on Investment (ROI):</span>
                  <span className={`font-bold ${calculatedROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {calculatedROI.toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Payback Period:</span>
                  <span className="font-bold text-indigo-600">
                    {paybackPeriodMonths < 1 
                      ? 'Less than 1 month'
                      : `${Math.ceil(paybackPeriodMonths)} months`}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
                <p className="text-sm text-gray-600">
                  {calculatedROI > 100 
                    ? "Strong ROI potential. Consider accelerating implementation."
                    : calculatedROI > 50
                    ? "Good ROI potential. Proceed with planned implementation."
                    : calculatedROI > 0
                    ? "Moderate ROI. Consider phased implementation to spread costs."
                    : "ROI below threshold. Review cost structure or increase adoption rate."}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default CustomCostCalculator;
