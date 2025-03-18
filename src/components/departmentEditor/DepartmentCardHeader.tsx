
import React from "react";
import { CardTitle } from "@/components/Card";
import Icon from "@/components/Icon";
import DepartmentActionButtons from "./DepartmentActionButtons";

interface DepartmentCardHeaderProps {
  hasCustomDepartments: boolean;
  isEditing: boolean;
  toggleEditing: () => void;
  onAutoPopulate: () => void;
  onClearAll: () => void;
}

const DepartmentCardHeader: React.FC<DepartmentCardHeaderProps> = ({
  hasCustomDepartments,
  isEditing,
  toggleEditing,
  onAutoPopulate,
  onClearAll,
}) => {
  return (
    <div className="flex justify-between items-center">
      <CardTitle className="text-xl">
        <div className="flex items-center gap-2">
          <Icon name="users" className="text-teal-700" />
          Department Management
        </div>
      </CardTitle>
      <DepartmentActionButtons
        hasCustomDepartments={hasCustomDepartments}
        isEditing={isEditing}
        toggleEditing={toggleEditing}
        onAutoPopulate={onAutoPopulate}
        onClearAll={onClearAll}
      />
    </div>
  );
};

export default DepartmentCardHeader;
