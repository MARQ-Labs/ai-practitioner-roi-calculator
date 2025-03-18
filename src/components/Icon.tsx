
import React from "react";
import { 
  Users, 
  BarChart3, 
  Clock, 
  Lightbulb, 
  Layers, 
  Edit, 
  Trash2, 
  Plus 
} from "lucide-react";

export type IconName = "users" | "chart" | "clock" | "lightbulb" | "layers" | "edit" | "trash" | "plus";

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
    plus: <Plus size={size} className={className} />
  };
  
  return iconMap[name] || <span className={className}>{name}</span>;
};

export default Icon;
