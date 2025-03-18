
import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/Icon";

interface DepartmentActionButtonsProps {
  hasCustomDepartments: boolean;
  isEditing: boolean;
  toggleEditing: () => void;
  onAutoPopulate: () => void;
  onClearAll?: () => void;
}

const DepartmentActionButtons: React.FC<DepartmentActionButtonsProps> = ({
  hasCustomDepartments,
  isEditing,
  toggleEditing,
  onAutoPopulate,
  onClearAll,
}) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onAutoPopulate}
        className="bg-teal-50 border-teal-200 text-teal-700 hover:bg-teal-100"
      >
        <Icon name="refresh-cw" className="mr-1 h-4 w-4" /> 
        Auto-populate
      </Button>
      
      {hasCustomDepartments && onClearAll && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onClearAll}
          className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
        >
          <Icon name="trash-2" className="mr-1 h-4 w-4" /> 
          Clear All
        </Button>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleEditing}
      >
        {isEditing ? "Cancel" : "Add Department"}
      </Button>
    </div>
  );
};

export default DepartmentActionButtons;
