
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/Card";
import { Department } from "@/models/calculator";
import { useToast } from "@/hooks/use-toast";
import { industryData } from "@/data/industryData";

// Import the new component modules
import AddDepartmentForm, { DepartmentInput } from "./departmentEditor/AddDepartmentForm";
import DepartmentList from "./departmentEditor/DepartmentList";
import DepartmentCardHeader from "./departmentEditor/DepartmentCardHeader";
import EmptyDepartmentState from "./departmentEditor/EmptyDepartmentState";

interface DepartmentEditorProps {
  departments: Department[];
  onDepartmentsChange: (departments: Department[]) => void;
  industryId: string;
}

const DepartmentEditor: React.FC<DepartmentEditorProps> = ({
  departments,
  onDepartmentsChange,
  industryId,
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editingDepartmentId, setEditingDepartmentId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<Department>>({});

  // Handler for editing a department
  const startEditing = (dept: Department) => {
    setEditingDepartmentId(dept.id);
    setEditValues({
      name: dept.name,
      headcount: dept.headcount,
      avgSalary: dept.avgSalary,
      efficiencyGain: dept.efficiencyGain,
    });
  };

  const cancelEditing = () => {
    setEditingDepartmentId(null);
    setEditValues({});
  };

  const saveEditing = () => {
    if (!editingDepartmentId || !editValues.name) return;
    
    const updatedDepartments = departments.map(dept => 
      dept.id === editingDepartmentId 
        ? { 
            ...dept, 
            name: editValues.name || dept.name,
            headcount: Number(editValues.headcount) || dept.headcount,
            avgSalary: Number(editValues.avgSalary) || dept.avgSalary,
            efficiencyGain: Number(editValues.efficiencyGain) || dept.efficiencyGain,
          } 
        : dept
    );
    
    onDepartmentsChange(updatedDepartments);
    setEditingDepartmentId(null);
    setEditValues({});
    
    toast({
      title: "Department updated",
      description: `${editValues.name} has been updated`,
    });
  };

  const handleEditChange = (field: keyof Department, value: string) => {
    setEditValues(prev => ({ ...prev, [field]: value }));
  };

  const addDepartment = (data: DepartmentInput) => {
    const newDepartment: Department = {
      id: `custom-${Date.now()}`,
      name: data.name,
      headcount: data.headcount,
      avgSalary: data.avgSalary,
      efficiencyGain: data.efficiencyGain,
    };

    const updatedDepartments = [...departments, newDepartment];
    onDepartmentsChange(updatedDepartments);
    
    toast({
      title: "Department added",
      description: `${data.name} has been added to your organization`,
    });
    
    setIsEditing(false);
  };

  const removeDepartment = (id: string) => {
    const updatedDepartments = departments.filter(dept => dept.id !== id);
    onDepartmentsChange(updatedDepartments);
    
    toast({
      title: "Department removed",
      description: "The department has been removed from your organization",
    });
  };

  const autoPopulateDepartments = () => {
    // Get the standard departments for this industry
    const standardDepartments = industryData.industryDepartments[industryId] || [];
    
    // If there are already custom departments, ask user to confirm replacement
    if (departments.length > 0) {
      const confirmed = window.confirm(
        "This will replace your current departments with industry standard ones. Continue?"
      );
      if (!confirmed) return;
    }

    onDepartmentsChange(standardDepartments);
    
    toast({
      title: "Departments auto-populated",
      description: `Added ${standardDepartments.length} standard departments for ${industryData.industries[industryId]?.name || industryId}`,
    });
  };

  const clearAllDepartments = () => {
    if (departments.length === 0) return;
    
    const confirmed = window.confirm(
      "Are you sure you want to remove all departments?"
    );
    if (!confirmed) return;
    
    onDepartmentsChange([]);
    
    toast({
      title: "All departments removed",
      description: "Your department list has been cleared",
    });
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  return (
    <Card className="mt-6 animate-fade-in">
      <CardHeader>
        <DepartmentCardHeader 
          hasCustomDepartments={departments.length > 0}
          isEditing={isEditing}
          toggleEditing={toggleEditing}
          onAutoPopulate={autoPopulateDepartments}
          onClearAll={clearAllDepartments}
        />
      </CardHeader>

      <CardContent>
        {isEditing && (
          <AddDepartmentForm onAddDepartment={addDepartment} />
        )}
        
        {departments.length > 0 ? (
          <DepartmentList 
            departments={departments}
            onEdit={startEditing}
            onDelete={removeDepartment}
            editingDepartmentId={editingDepartmentId}
            editValues={editValues}
            handleEditChange={handleEditChange}
            saveEditing={saveEditing}
            cancelEditing={cancelEditing}
          />
        ) : (
          <EmptyDepartmentState onAutoPopulate={autoPopulateDepartments} />
        )}
      </CardContent>
    </Card>
  );
};

export default DepartmentEditor;
