
import React from "react";
import { 
  Users, 
  BarChart3, 
  Clock, 
  Lightbulb, 
  Layers, 
  Edit, 
  Trash2, 
  Plus,
  TrendingUp,
  TrendingDown,
  LineChart,
  RefreshCw,
  Check,
  X,
  ChevronUp,
  ChevronDown
} from "lucide-react";

export type IconName = "users" | "chart" | "clock" | "lightbulb" | "layers" | "edit" | "trash" | "trash-2" | "plus" | "trendingUp" | "trendingDown" | "lineChart" | "refresh-cw" | "check" | "x" | "chevron-up" | "chevron-down";

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ name, className = "", size = 24 }) => {
  const iconMap = {
    users: <Users size={size} className={className} />,
    chart: <BarChart3 size={size} className={className} />,
    clock: <Clock size={size} className={className} />,
    lightbulb: <Lightbulb size={size} className={className} />,
    layers: <Layers size={size} className={className} />,
    edit: <Edit size={size} className={className} />,
    trash: <Trash2 size={size} className={className} />,
    "trash-2": <Trash2 size={size} className={className} />,
    plus: <Plus size={size} className={className} />,
    trendingUp: <TrendingUp size={size} className={className} />,
    trendingDown: <TrendingDown size={size} className={className} />,
    lineChart: <LineChart size={size} className={className} />,
    "refresh-cw": <RefreshCw size={size} className={className} />,
    check: <Check size={size} className={className} />,
    x: <X size={size} className={className} />,
    "chevron-up": <ChevronUp size={size} className={className} />,
    "chevron-down": <ChevronDown size={size} className={className} />
  };
  
  return iconMap[name] || <span className={className}>{name}</span>;
};

export default Icon;
