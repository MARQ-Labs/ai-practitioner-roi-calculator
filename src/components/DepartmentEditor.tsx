
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import Icon from "@/components/Icon";
import { Input } from "@/components/ui/input";
import { Department } from "@/models/calculator";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

interface DepartmentEditorProps {
  departments: Department[];
  onDepartmentsChange: (departments: Department[]) => void;
  industryId: string;
}

const departmentSchema = z.object({
  name: z.string().min(2, { message: "Department name is required" }),
  headcount: z.coerce.number().min(1, { message: "Must have at least 1 team member" }),
  avgSalary: z.coerce.number().min(10000, { message: "Salary must be at least $10,000" }),
  efficiencyGain: z.coerce.number().min(1).max(80, { message: "Must be between 1-80%" }),
});

type DepartmentInput = z.infer<typeof departmentSchema>;

const DepartmentEditor: React.FC<DepartmentEditorProps> = ({
  departments,
  onDepartmentsChange,
  industryId,
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      headcount: 1,
      avgSalary: 50000,
      efficiencyGain: 20,
    },
  });

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
    
    form.reset();
  };

  const removeDepartment = (id: string) => {
    const updatedDepartments = departments.filter(dept => dept.id !== id);
    onDepartmentsChange(updatedDepartments);
    
    toast({
      title: "Department removed",
      description: "The department has been removed from your organization",
    });
  };

  return (
    <Card className="mt-6 animate-fade-in">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            <div className="flex items-center gap-2">
              <Icon name="users" className="text-teal-700" />
              Department Management
            </div>
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Add Department"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {isEditing && (
          <div className="mb-6 bg-gray-50 p-4 rounded-md animate-fade-in-down">
            <h3 className="font-medium mb-3">Add New Department</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(addDepartment)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Marketing" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="headcount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team Size</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="avgSalary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Average Salary ($)</FormLabel>
                        <FormControl>
                          <Input type="number" min="10000" step="1000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="efficiencyGain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Efficiency Gain (%)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="1" 
                            max="80" 
                            placeholder="Expected efficiency improvement" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
                    Add Department
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
        
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
              <div className="w-1/3 font-medium">{dept.name}</div>
              <div className="w-1/5 text-center">{dept.headcount}</div>
              <div className="w-1/5 text-center">${dept.avgSalary.toLocaleString()}</div>
              <div className="w-1/5 text-center">{dept.efficiencyGain}%</div>
              <div className="w-10">
                <button 
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => removeDepartment(dept.id)}
                >
                  <Icon name="trash" />
                </button>
              </div>
            </div>
          ))}
          
          {departments.length === 0 && (
            <div className="py-4 text-center text-gray-500 bg-gray-50 rounded">
              No departments defined. Add your first department above.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentEditor;
