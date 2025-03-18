
import React, { useState } from "react";
import Icon from "@/components/Icon";
import { Input } from "@/components/ui/input";
import { Department } from "@/models/calculator";

interface DepartmentListProps {
  departments: Department[];
  onEdit: (dept: Department) => void;
  onDelete: (id: string) => void;
  editingDepartmentId: string | null;
  editValues: Partial<Department>;
  handleEditChange: (field: keyof Department, value: string) => void;
  saveEditing: () => void;
  cancelEditing: () => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({
  departments,
  onEdit,
  onDelete,
  editingDepartmentId,
  editValues,
  handleEditChange,
  saveEditing,
  cancelEditing,
}) => {
  if (departments.length === 0) {
    return (
      <div className="py-6 text-center bg-gray-50 rounded">
        <div className="text-gray-500 mb-3">No departments defined</div>
        {/* We'll handle the auto-populate button in the parent component */}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center border-b pb-2 text-sm font-medium text-gray-500">
        <div className="w-1/3">Department</div>
        <div className="w-1/5 text-center">Team Size</div>
        <div className="w-1/5 text-center">Avg. Salary</div>
        <div className="w-1/5 text-center">Efficiency</div>
        <div className="w-10"></div>
      </div>
      
      {departments.map((dept) => (
        <div key={dept.id} className="flex justify-between items-center py-2 border-b border-gray-100 hover:bg-gray-50 rounded transition-colors">
          {editingDepartmentId === dept.id ? (
            // Editing mode
            <>
              <div className="w-1/3">
                <Input 
                  value={editValues.name || ''} 
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="h-8 py-1"
                />
              </div>
              <div className="w-1/5 text-center">
                <Input 
                  type="number" 
                  value={editValues.headcount || ''} 
                  onChange={(e) => handleEditChange('headcount', e.target.value)}
                  className="h-8 py-1 text-center"
                  min="1"
                />
              </div>
              <div className="w-1/5 text-center">
                <Input 
                  type="number" 
                  value={editValues.avgSalary || ''} 
                  onChange={(e) => handleEditChange('avgSalary', e.target.value)}
                  className="h-8 py-1 text-center"
                  min="10000"
                  step="1000"
                />
              </div>
              <div className="w-1/5 text-center">
                <Input 
                  type="number" 
                  value={editValues.efficiencyGain || ''} 
                  onChange={(e) => handleEditChange('efficiencyGain', e.target.value)}
                  className="h-8 py-1 text-center"
                  min="1"
                  max="80"
                />
              </div>
              <div className="w-10 flex gap-1">
                <button 
                  className="text-gray-400 hover:text-green-500 transition-colors"
                  onClick={saveEditing}
                  title="Save"
                >
                  <Icon name="check" />
                </button>
                <button 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  onClick={cancelEditing}
                  title="Cancel"
                >
                  <Icon name="x" />
                </button>
              </div>
            </>
          ) : (
            // Display mode
            <>
              <div className="w-1/3 font-medium">{dept.name}</div>
              <div className="w-1/5 text-center">{dept.headcount}</div>
              <div className="w-1/5 text-center">${dept.avgSalary.toLocaleString()}</div>
              <div className="w-1/5 text-center">{dept.efficiencyGain}%</div>
              <div className="w-10 flex gap-1">
                <button 
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  onClick={() => onEdit(dept)}
                  title="Edit"
                >
                  <Icon name="edit" />
                </button>
                <button 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => onDelete(dept.id)}
                  title="Delete"
                >
                  <Icon name="trash" />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DepartmentList;
