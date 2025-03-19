
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Bot, LineChart, Brain, Users } from "lucide-react";
import { Label } from "@/components/ui/label";

export type AITypeOption = "general" | "analytics" | "cognitive" | "conversational";

interface AITypeSelectorProps {
  selectedType: AITypeOption;
  onTypeChange: (type: AITypeOption) => void;
}

const aiTypeOptions = [
  {
    id: "general",
    label: "General AI",
    icon: <Bot size={18} />,
    description: "All-purpose AI systems for various business needs"
  },
  {
    id: "analytics",
    label: "Analytics AI",
    icon: <LineChart size={18} />,
    description: "AI focused on data analysis and insights"
  },
  {
    id: "cognitive",
    label: "Cognitive AI",
    icon: <Brain size={18} />,
    description: "AI that mimics human thinking and decision-making"
  },
  {
    id: "conversational",
    label: "Conversational AI",
    icon: <Users size={18} />,
    description: "AI chatbots and virtual assistants for communication"
  }
];

const AITypeSelector: React.FC<AITypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all mb-8">
      <div className="mb-3">
        <Label className="text-base font-medium text-gray-800">AI Implementation Type</Label>
        <p className="text-sm text-gray-600">Select the primary type of AI your organization plans to implement</p>
      </div>
      
      <ToggleGroup 
        type="single" 
        value={selectedType}
        onValueChange={(value) => {
          if (value) onTypeChange(value as AITypeOption);
        }}
        className="grid grid-cols-2 md:grid-cols-4 gap-2"
      >
        {aiTypeOptions.map((option) => (
          <ToggleGroupItem 
            key={option.id} 
            value={option.id} 
            className="flex flex-col items-center justify-center p-3 h-auto border border-gray-200 data-[state=on]:border-teal-600 data-[state=on]:bg-teal-50"
            aria-label={option.label}
          >
            <div className="mb-1 text-teal-700">{option.icon}</div>
            <span className="text-sm font-medium">{option.label}</span>
            <span className="text-xs text-gray-600 text-center mt-1 hidden md:block">{option.description}</span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default AITypeSelector;
