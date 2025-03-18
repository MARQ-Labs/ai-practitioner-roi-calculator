
import React from "react";
import { cn } from "@/lib/utils";
import Icon from "./Icon";
import { type IconName } from "./Icon"; // Import the IconName type

interface TabProps {
  id: string;
  label: string;
  icon: IconName; // Using IconName type
  isActive: boolean;
  onClick: (id: string) => void;
}

interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    icon: IconName; // Using IconName type
  }>;
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tab: React.FC<TabProps> = ({ id, label, icon, isActive, onClick }) => {
  return (
    <button
      className={cn(
        "tab-button",
        isActive && "tab-button-active"
      )}
      onClick={() => onClick(id)}
      aria-selected={isActive}
      role="tab"
    >
      <Icon name={icon} size={18} className={isActive ? "text-teal-600" : "text-gray-600"} />
      <span className={isActive ? "font-medium" : ""}>{label}</span>
    </button>
  );
};

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn("grid grid-cols-4 bg-gray-100 p-1 rounded-lg", className)}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          id={tab.id}
          label={tab.label}
          icon={tab.icon}
          isActive={activeTab === tab.id}
          onClick={onChange}
        />
      ))}
    </div>
  );
};
