
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Department } from "@/models/calculator";

const departmentSchema = z.object({
  name: z.string().min(2, { message: "Department name is required" }),
  headcount: z.coerce.number().min(1, { message: "Must have at least 1 team member" }),
  avgSalary: z.coerce.number().min(10000, { message: "Salary must be at least $10,000" }),
  efficiencyGain: z.coerce.number().min(1).max(80, { message: "Must be between 1-80%" }),
});

export type DepartmentInput = z.infer<typeof departmentSchema>;

interface AddDepartmentFormProps {
  onAddDepartment: (data: DepartmentInput) => void;
}

const AddDepartmentForm: React.FC<AddDepartmentFormProps> = ({ onAddDepartment }) => {
  const form = useForm<DepartmentInput>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: "",
      headcount: 1,
      avgSalary: 50000,
      efficiencyGain: 20,
    },
  });

  return (
    <div className="mb-6 bg-gray-50 p-4 rounded-md animate-fade-in-down">
      <h3 className="font-medium mb-3">Add New Department</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAddDepartment)} className="space-y-4">
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
  );
};

export default AddDepartmentForm;
