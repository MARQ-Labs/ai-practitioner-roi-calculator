import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/Card";
import Slider from "@/components/Slider";
import { Tabs } from "@/components/Tabs";
import Icon from "@/components/Icon";
import DepartmentEditor from "@/components/DepartmentEditor";
import { industryData, getIndustryUseCases, getIndustryROIData } from "@/data/industryData";
import { calculateTotalImpact, calculateDepartmentImpact } from "@/services/calculatorService";
import { useToast } from "@/hooks/use-toast";
import { Department } from "@/models/calculator";

const AIPotentialCalculator: React.FC = () => {
  // Basic state
  const [adoptionRate, setAdoptionRate] = useState(70);
  const [timeHorizon, setTimeHorizon] = useState(12);
  const [activeTab, setActiveTab] = useState("capacity");
  const [selectedIndustry, setSelectedIndustry] = useState("tourism");
  const [customDepartments, setCustomDepartments] = useState<Department[]>([]);
  const { toast } = useToast();
  
  // Get current industry data
  const currentIndustry = industryData.industries[selectedIndustry] || industryData.industries.tourism;
  const industryDepartments = industryData.industryDepartments[selectedIndustry] || industryData.industryDepartments.tourism;
  
  // Use custom departments if they exist, otherwise use industry defaults
  const currentDepartments = customDepartments.length > 0 
    ? customDepartments 
    : industryDepartments;
  
  // Calculate total impact
  const totalImpact = calculateTotalImpact(currentDepartments, adoptionRate, timeHorizon);

  // Tabs configuration
  const tabs = [
    { id: "capacity", label: "Department Impact", icon: "users" as const },
    { id: "insights", label: "Industry Insights", icon: "lightbulb" as const },
    { id: "efficiency", label: "Efficiency Gains", icon: "layers" as const }
  ];

  // Reset custom departments when industry changes
  useEffect(() => {
    setCustomDepartments([]);
  }, [selectedIndustry]);

  // Notify on industry change
  useEffect(() => {
    toast({
      title: `Industry changed to ${currentIndustry.name}`,
      description: "Calculator has been updated with industry-specific data",
      duration: 3000,
    });
  }, [selectedIndustry, currentIndustry.name, toast]);

  // Handle industry change
  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
  };

  // Handle departments change
  const handleDepartmentsChange = (departments: Department[]) => {
    setCustomDepartments(departments);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-8 animate-fade-in">
      {/* Header */}
      <div className="mb-6 animate-fade-in-up">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-teal-800 mb-2">AI Capacity Calculator</h1>
            <p className="text-gray-600">
              See how strategic AI adoption creates additional team capacity for your organization
            </p>
          </div>
          <div className="md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
              value={selectedIndustry}
              onChange={(e) => handleIndustryChange(e.target.value)}
            >
              <option value="tourism">Tourism & Hospitality</option>
              <option value="finance">Financial Services</option>
              <option value="healthcare">Healthcare</option>
              <option value="retail">Retail</option>
              <option value="technology">Technology</option>
            </select>
          </div>
        </div>
        
        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-md mb-4 animate-blur-in">
          <div className="flex">
            <div className="flex-1">
              <h2 className="font-semibold text-teal-800">{currentIndustry.name}</h2>
              <p className="text-sm text-teal-600">{currentIndustry.description}</p>
            </div>
          </div>
        </div>
        
        {/* Department Editor - Moved here from tab content */}
        <div className="mb-8 animate-fade-in">
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl">
                <div className="flex items-center gap-2">
                  <Icon name="users" className="text-teal-700" />
                  Customize Your Organization's Departments
                </div>
              </CardTitle>
              <CardDescription>
                Define your actual departments and team structure for a more accurate calculation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md">
                <h3 className="font-medium text-amber-800 mb-1">Department Customization Guide</h3>
                <p className="text-sm text-amber-700">
                  Start by using the industry template, then modify departments to match your organization. 
                  Your custom departments will be used for all calculations.
                </p>
              </div>
              
              <div className="mb-6">
                <button
                  onClick={() => setCustomDepartments(industryDepartments)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm font-medium transition-colors"
                >
                  Load {currentIndustry.name} Template
                </button>
                <button
                  onClick={() => setCustomDepartments([])}
                  className="ml-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 text-sm font-medium transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              <DepartmentEditor 
                departments={customDepartments} 
                onDepartmentsChange={handleDepartmentsChange}
                industryId={selectedIndustry}
              />
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="transition-all duration-300 hover:shadow-md p-4 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="users" className="text-teal-700" />
            <h3 className="text-lg font-semibold">Organisation-wide Adoption Rate</h3>
          </div>
          <Slider
            min={30}
            max={100}
            step={5}
            value={adoptionRate}
            onChange={setAdoptionRate}
            valueDisplay={`${adoptionRate}%`}
            description="What percentage of your team adopts AI tools effectively"
          />
        </div>
        
        <div className="transition-all duration-300 hover:shadow-md p-4 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="clock" className="text-teal-700" />
            <h3 className="text-lg font-semibold">Time Horizon</h3>
          </div>
          <Slider
            min={3}
            max={24}
            step={3}
            value={timeHorizon}
            onChange={setTimeHorizon}
            valueDisplay={`${timeHorizon} mo`}
            description="Benefits accumulate as your team becomes more proficient with AI"
          />
        </div>
      </div>
      
      {/* Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 card-hover-effect animate-scale-in" style={{ animationDelay: "0.15s" }}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-teal-800 font-medium">Additional Team Capacity</h3>
              <Icon name="users" className="text-teal-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-teal-800 mb-1">
              {totalImpact.fteEquivalent.toFixed(1)} FTEs
            </div>
            <p className="text-sm text-teal-700">
              Equivalent to adding {totalImpact.fteEquivalent.toFixed(1)} full-time team members
            </p>
            <div className="text-xs text-teal-600 mt-4 flex items-center">
              <span className="font-medium">Current team size:</span>
              <span className="ml-1">{totalImpact.headcount} staff members</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 card-hover-effect animate-scale-in" style={{ animationDelay: "0.25s" }}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-amber-800 font-medium">Hours Reclaimed Annually</h3>
              <Icon name="clock" className="text-amber-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-amber-800 mb-1">
              {Math.round(totalImpact.hoursSaved).toLocaleString()} hours
            </div>
            <p className="text-sm text-amber-700">
              Time redirected to strategic priorities and high-value work
            </p>
            <div className="text-xs text-amber-600 mt-4 flex items-center">
              <span className="font-medium">Per team member:</span>
              <span className="ml-1">{totalImpact.headcount ? Math.round(totalImpact.hoursSaved / totalImpact.headcount) : 0} hours/year</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 card-hover-effect animate-scale-in" style={{ animationDelay: "0.35s" }}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-indigo-800 font-medium">Estimated Value</h3>
              <Icon name="chart" className="text-indigo-600" size={28} />
            </div>
            <div className="text-3xl font-bold text-indigo-800 mb-1">
              ${Math.round(totalImpact.financialImpact).toLocaleString()}
            </div>
            <p className="text-sm text-indigo-700">
              Financial equivalent of reclaimed capacity
            </p>
            <div className="text-xs text-indigo-600 mt-4 flex items-center">
              <span className="font-medium">Calculation method:</span>
              <span className="ml-1">Role-specific hourly rates × time saved</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Explore Different Perspectives</h2>
          <p className="text-gray-600">Click the tabs below to see different views of AI's impact</p>
        </div>
        
        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
        
        {/* Department Impact Tab Content */}
        {activeTab === "capacity" && (
          <div className="mt-4 animate-slide-in-right">
            <Card>
              <CardHeader>
                <CardTitle>Industry-Specific Department Impact</CardTitle>
                <CardDescription>
                  How AI affects different departments in {currentIndustry.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentDepartments.map((dept) => {
                  const impact = calculateDepartmentImpact(dept, adoptionRate, timeHorizon);
                  
                  return (
                    <div key={dept.id} className="border-l-4 border-blue-400 pl-4 py-2 transition-all duration-300 hover:bg-blue-50 rounded-r-md">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{dept.name}</h3>
                        <span className="font-bold text-teal-700">{impact.fteEquivalent.toFixed(1)} FTEs</span>
                      </div>
                      <p className="text-sm text-gray-600">Department details:</p>
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
        )}

        {/* Industry Insights Tab Content */}
        {activeTab === "insights" && (
          <div className="mt-4 animate-slide-in-right">
            <Card>
              <CardHeader>
                <CardTitle>Industry Insights: {currentIndustry.name}</CardTitle>
                <CardDescription>
                  Key AI opportunities and challenges in this sector
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Key Challenges in {currentIndustry.name}</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    {currentIndustry.challenges && currentIndustry.challenges.map((challenge, index) => (
                      <li key={index} className="transition-all duration-300 hover:text-indigo-700">{challenge}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200 transition-all duration-300 hover:shadow-md">
                    <div className="font-medium text-teal-800 mb-1">Key AI Use Cases</div>
                    <ul className="list-disc pl-5 text-sm text-teal-700">
                      {getIndustryUseCases(selectedIndustry).map((useCase, index) => (
                        <li key={index} className="transition-all duration-300 hover:text-teal-900">{useCase}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 transition-all duration-300 hover:shadow-md">
                    <div className="font-medium text-indigo-800 mb-1">Industry ROI Benchmarks</div>
                    <p className="text-sm text-indigo-700 mb-2">
                      Based on industry research, organizations in {currentIndustry.name} typically see:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-indigo-700">
                      {(() => {
                        const roiData = getIndustryROIData(selectedIndustry);
                        return (
                          <>
                            <li><strong>Time-to-value:</strong> {roiData.timeToValue}</li>
                            <li><strong>First-year ROI:</strong> {roiData.firstYearROI}</li>
                            <li><strong>Headcount equivalent:</strong> {roiData.headcountEquivalent} of workforce</li>
                          </>
                        );
                      })()}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg mt-6 border border-amber-200 transition-all duration-300 hover:shadow-md">
                  <h3 className="font-semibold text-amber-800 mb-2">Why Benefits Compound Over Time in {currentIndustry.name}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-amber-700">
                    <li>Initial learning curve as team adapts to new tools</li>
                    <li>Knowledge-sharing creates efficient workflows</li>
                    <li>Team discovers novel applications over time</li>
                    <li>Custom AI solutions become more refined</li>
                    {selectedIndustry === "healthcare" && <li>Clinical process optimization evolves</li>}
                    {selectedIndustry === "retail" && <li>Customer recommendation systems improve with data</li>}
                    {selectedIndustry === "finance" && <li>Risk assessment models gain precision</li>}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Efficiency Gains Tab Content */}
        {activeTab === "efficiency" && (
          <div className="mt-4 animate-slide-in-right">
            <Card>
              <CardHeader>
                <CardTitle>AI Efficiency Gains by Department</CardTitle>
                <CardDescription>
                  Potential time savings across various {currentIndustry.name} departments
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
                      {currentDepartments.map((dept) => {
                        const impact = calculateDepartmentImpact(dept, adoptionRate, timeHorizon);
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
                              <div className="text-sm text-gray-900">{weeklyHoursSaved.toFixed(1)} hours</div>
                              <div className="text-xs text-gray-500">{(weeklyHoursSaved / dept.headcount).toFixed(1)} hrs/person</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-teal-600 font-medium">${Math.round(impact.financialImpact).toLocaleString()}</div>
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
        )}
      </div>
      
      <footer className="text-center text-sm text-gray-500 mt-8 pt-4 border-t">
        <p>AI Capacity Calculator — Data based on industry research and implementation benchmarks</p>
      </footer>
    </div>
  );
};

export default AIPotentialCalculator;
