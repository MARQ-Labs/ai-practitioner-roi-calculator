
import React from "react";
import Icon from "@/components/Icon";
import Slider from "@/components/Slider";

interface CalculatorControlsProps {
  adoptionRate: number;
  setAdoptionRate: (value: number) => void;
  timeHorizon: number;
  setTimeHorizon: (value: number) => void;
}

const CalculatorControls: React.FC<CalculatorControlsProps> = ({
  adoptionRate,
  setAdoptionRate,
  timeHorizon,
  setTimeHorizon,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="transition-all duration-300 hover:shadow-md p-4 rounded-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="users" className="text-teal-700" />
          <h3 className="text-lg font-semibold">Organisation-wide Adoption Rate</h3>
        </div>
        <Slider
          min={30}
          max={100}
          step={5}
          value={adoptionRate}
          onChange={setAdoptionRate}
          valueDisplay={`${adoptionRate}%`}
          description="What percentage of your team adopts AI tools effectively"
        />
      </div>
      
      <div className="transition-all duration-300 hover:shadow-md p-4 rounded-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="clock" className="text-teal-700" />
          <h3 className="text-lg font-semibold">Time Horizon</h3>
        </div>
        <Slider
          min={3}
          max={24}
          step={3}
          value={timeHorizon}
          onChange={setTimeHorizon}
          valueDisplay={`${timeHorizon} mo`}
          description="Benefits accumulate as your team becomes more proficient with AI"
        />
      </div>
    </div>
  );
};

export default CalculatorControls;
