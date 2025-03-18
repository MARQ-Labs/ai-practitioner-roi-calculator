
import React from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  valueDisplay?: React.ReactNode;
  label?: string;
  description?: string;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  className,
  valueDisplay,
  label,
  description
}) => {
  return (
    <div className={cn("w-full", className)}>
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="input-range slider-thumb w-full"
        />
        {valueDisplay && <span className="font-medium text-teal-700 w-16 text-center">{valueDisplay}</span>}
      </div>
      {description && <p className="text-sm text-gray-500 mt-1.5">{description}</p>}
    </div>
  );
};

export default Slider;
