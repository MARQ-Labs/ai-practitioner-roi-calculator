
import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/Icon";

interface EmptyDepartmentStateProps {
  onAutoPopulate: () => void;
}

const EmptyDepartmentState: React.FC<EmptyDepartmentStateProps> = ({ onAutoPopulate }) => {
  return (
    <div className="py-6 text-center bg-gray-50 rounded">
      <div className="text-gray-500 mb-3">No departments defined</div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onAutoPopulate}
        className="bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100"
      >
        <Icon name="refresh-cw" className="mr-1 h-4 w-4" /> 
        Auto-populate with industry standards
      </Button>
    </div>
  );
};

export default EmptyDepartmentState;
