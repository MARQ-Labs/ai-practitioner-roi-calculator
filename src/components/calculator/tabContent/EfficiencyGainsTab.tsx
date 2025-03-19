
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Department, Industry } from "@/models/calculator";
import { calculateDepartmentImpact } from "@/services/calculatorService";

interface EfficiencyGainsTabProps {
  departments: Department[];
  adoptionRate: number;
  timeHorizon: number;
  industryId: string;
  industryName: string;
  industry?: Industry; // Added to match what's being passed from TabNavigation
}

const EfficiencyGainsTab: React.FC<EfficiencyGainsTabProps> = ({
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
          <CardTitle>AI Efficiency Gains by Department</CardTitle>
          <CardDescription>
            Potential time savings across various {industryName} departments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency Gain</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly Hours Saved</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Annual Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departments.map((dept) => {
                  const impact = calculateDepartmentImpact(dept, adoptionRate, timeHorizon, industryId);
                  const weeklyHoursSaved = impact.hoursSaved / 52;
                  
                  return (
                    <tr key={dept.id} className="transition-all duration-300 hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{dept.name}</div>
                        <div className="text-xs text-gray-500">{dept.headcount} team members</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{dept.efficiencyGain}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {!isNaN(weeklyHoursSaved) ? weeklyHoursSaved.toFixed(2) : "0.00"} hours
                        </div>
                        <div className="text-xs text-gray-500">
                          {!isNaN(weeklyHoursSaved) ? (weeklyHoursSaved / dept.headcount).toFixed(2) : "0.00"} hrs/person
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-teal-600 font-medium">
                          ${!isNaN(impact.financialImpact) ? Math.round(impact.financialImpact).toLocaleString() : "0"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">Methodology Note</h3>
            <p className="text-sm text-gray-600">
              These calculations are based on industry benchmarks and research on AI productivity gains.
              Actual results may vary based on implementation quality, team skills, and specific use cases.
              The model considers adoption rate, time horizon, and department-specific efficiency factors.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EfficiencyGainsTab;
