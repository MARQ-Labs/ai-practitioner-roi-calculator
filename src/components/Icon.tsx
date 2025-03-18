
import React from "react";
import { Users, BarChart, Clock, Lightbulb, Layers } from "lucide-react";

type IconProps = {
  name: string;
  className?: string;
  size?: number;
};

const Icon: React.FC<IconProps> = ({ name, className = "", size = 24 }) => {
  const iconMap: Record<string, React.ReactNode> = {
    users: <Users size={size} className={className} />,
    chart: <BarChart size={size} className={className} />,
    clock: <Clock size={size} className={className} />,
    lightbulb: <Lightbulb size={size} className={className} />,
    layers: <Layers size={size} className={className} />
  };

  return <span className="inline-flex items-center justify-center">{iconMap[name] || name}</span>;
};

export default Icon;
