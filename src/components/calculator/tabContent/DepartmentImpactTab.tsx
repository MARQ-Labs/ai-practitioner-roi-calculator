
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Department } from "@/models/calculator";
import { calculateDepartmentImpact } from "@/services/calculatorService";

interface DepartmentImpactTabProps {
  departments: Department[];
  adoptionRate: number;
  timeHorizon: number;
  industryId: string;
  industryName: string;
}

const DepartmentImpactTab: React.FC<DepartmentImpactTabProps> = ({
  departments,
  adoptionRate,
  timeHorizon,
  industryId,
  industryName,
}) => {
  return (
    <div className="mt-4 animate-slide-in-right">
      <Card>
        <CardHeader>
          <CardTitle>Industry-Specific Department Impact</CardTitle>
          <CardDescription>
            How AI affects different departments in {industryName}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {departments.map((dept) => {
            const impact = calculateDepartmentImpact(dept, adoptionRate, timeHorizon, industryId);
            
            return (
              <div key={dept.id} className="border-l-4 border-blue-400 pl-4 py-2 transition-all duration-300 hover:bg-blue-50 rounded-r-md">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{dept.name}</h3>
                  <span className="font-bold text-teal-700">{impact.fteEquivalent.toFixed(1)} FTEs</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-600">Department details:</p>
                  {impact.roi && <span className="text-sm font-medium text-green-600">ROI: {impact.roi.toFixed(2)}%</span>}
                </div>
                <ul className="text-sm list-disc pl-5 mt-1">
                  <li>Staff: {dept.headcount} team members</li>
                  <li>Avg. Salary: ${dept.avgSalary.toLocaleString()}</li>
                  <li>Efficiency Gain: {dept.efficiencyGain}%</li>
                </ul>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default DepartmentImpactTab;
