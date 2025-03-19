
import React from "react";
import { ReportData, getSummaryText } from "@/utils/pdfExport";
import { formatCurrency } from "@/lib/utils";
import { WORK_HOURS_PER_YEAR } from "@/data/industryData";

interface ReportContentProps {
  data: ReportData;
}

const ReportContent: React.FC<ReportContentProps> = ({ data }) => {
  const { industry, totalImpact, departments, timeHorizon, adoptionRate, customCost, date, costItems } = data;
  
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white" id="pdf-content">
      {/* Header */}
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-teal-800 mb-2">{data.title}</h1>
        <p className="text-gray-600">Generated on {date}</p>
      </div>
      
      {/* Summary Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Executive Summary</h2>
        <div className="bg-teal-50 p-4 rounded-lg">
          <p className="whitespace-pre-line text-gray-800">{getSummaryText(data)}</p>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Key Impact Metrics</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-amber-50">
            <h3 className="font-medium text-amber-800">Time Saved</h3>
            <p className="text-2xl font-bold text-amber-900">{Math.round(totalImpact.hoursSaved).toLocaleString()} hours</p>
            <p className="text-sm text-amber-700">Over {timeHorizon} months</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-indigo-50">
            <h3 className="font-medium text-indigo-800">Financial Impact</h3>
            <p className="text-2xl font-bold text-indigo-900">{formatCurrency(totalImpact.financialImpact)}</p>
            <p className="text-sm text-indigo-700">Value of reclaimed capacity</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-teal-50">
            <h3 className="font-medium text-teal-800">Team Capacity</h3>
            <p className="text-2xl font-bold text-teal-900">{totalImpact.fteEquivalent.toFixed(2)} FTEs</p>
            <p className="text-sm text-teal-700">Equivalent additional staff</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-green-50">
            <h3 className="font-medium text-green-800">ROI</h3>
            <p className="text-2xl font-bold text-green-900">
              {customCost 
                ? `${((totalImpact.financialImpact / customCost) * 100 - 100).toFixed(2)}%`
                : `${((totalImpact.financialImpact / (totalImpact.financialImpact * 0.3)) * 100 - 100).toFixed(2)}%`
              }
            </p>
            <p className="text-sm text-green-700">Return on investment</p>
          </div>
        </div>
      </div>

      {/* Investment Cost Breakdown */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Investment Cost Breakdown</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-3">
            The total investment required for implementing AI solutions in your organization is <span className="font-semibold">{formatCurrency(customCost || (totalImpact.financialImpact * 0.3))}</span>.
            This investment is broken down as follows:
          </p>
          
          {costItems && costItems.length > 0 ? (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Cost Item</th>
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-right">Amount</th>
                  <th className="border p-2 text-right">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {costItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="border p-2">{item.name}</td>
                    <td className="border p-2">{item.type === "one-time" ? "One-time" : "Monthly"}</td>
                    <td className="border p-2 text-right">{formatCurrency(item.cost)}</td>
                    <td className="border p-2 text-right">
                      {item.type === "one-time" 
                        ? formatCurrency(item.cost)
                        : formatCurrency(item.cost * timeHorizon)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-100 font-semibold">
                  <td className="border p-2" colSpan={3}>Total Investment</td>
                  <td className="border p-2 text-right">{formatCurrency(customCost || (totalImpact.financialImpact * 0.3))}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="bg-amber-50 p-3 rounded-lg">
              <p className="text-amber-800">
                Default investment calculation: 30% of projected financial impact ({formatCurrency(totalImpact.financialImpact * 0.3)})
              </p>
              <p className="text-xs text-amber-700 mt-1">
                This is an industry-standard estimate for AI implementation costs.
                Use the custom cost calculator for a more detailed breakdown.
              </p>
            </div>
          )}
          
          <div className="mt-3 bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-1">Investment Returns</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
              <li>Projected ROI: {customCost 
                ? `${((totalImpact.financialImpact / customCost) * 100 - 100).toFixed(2)}%`
                : `${((totalImpact.financialImpact / (totalImpact.financialImpact * 0.3)) * 100 - 100).toFixed(2)}%`}
              </li>
              <li>Net financial benefit: {formatCurrency(totalImpact.financialImpact - (customCost || (totalImpact.financialImpact * 0.3)))}</li>
              <li>Total value generated: {formatCurrency(totalImpact.financialImpact)}</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Timeline Projection - NEW SECTION */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">ROI Timeline Projection</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="border rounded-lg p-3 bg-blue-50">
              <h3 className="font-medium text-blue-800 mb-1">Initial Phase (1-3 months)</h3>
              <p className="text-sm text-blue-700">
                Implementation costs are highest during this phase. Expect limited returns as teams adapt to new AI tools. 
                Focus on training and integration with existing workflows.
              </p>
            </div>
            
            <div className="border rounded-lg p-3 bg-amber-50">
              <h3 className="font-medium text-amber-800 mb-1">Growth Phase (4-9 months)</h3>
              <p className="text-sm text-amber-700">
                ROI begins to improve as adoption increases. Staff become more proficient with AI tools, 
                efficiency gains start to materialize across departments.
              </p>
            </div>
            
            <div className="border rounded-lg p-3 bg-green-50">
              <h3 className="font-medium text-green-800 mb-1">Maturity Phase (10+ months)</h3>
              <p className="text-sm text-green-700">
                Maximum ROI achieved as AI becomes fully integrated into operations. 
                Organizations typically see {industry.name} industry-specific benefits fully realized.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="font-medium text-gray-800 mb-2">Break-even Analysis</h4>
            <p className="text-sm text-gray-700 mb-2">
              Based on your current parameters, the break-even point is estimated to occur around month 
              {customCost && totalImpact.financialImpact > 0
                ? ` ${Math.ceil((customCost / totalImpact.financialImpact) * timeHorizon)}`
                : ' 6-8'} 
              of implementation.
            </p>
            
            <div className="flex flex-col space-y-1 text-sm">
              <div className="flex items-center">
                <div className="w-1/3 md:w-1/4 font-medium">Month 1-3:</div>
                <div className="w-2/3 md:w-3/4 text-amber-700">Initial investment phase, negative ROI</div>
              </div>
              <div className="flex items-center">
                <div className="w-1/3 md:w-1/4 font-medium">Month 4-6:</div>
                <div className="w-2/3 md:w-3/4 text-amber-700">Approaching break-even, minimal positive returns</div>
              </div>
              <div className="flex items-center">
                <div className="w-1/3 md:w-1/4 font-medium">Month 7-9:</div>
                <div className="w-2/3 md:w-3/4 text-green-700">Positive ROI phase, steady returns</div>
              </div>
              <div className="flex items-center">
                <div className="w-1/3 md:w-1/4 font-medium">Month 10+:</div>
                <div className="w-2/3 md:w-3/4 text-green-700">Maturity phase, maximum ROI realized</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Department Breakdown */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Department Impact</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Department</th>
              <th className="border p-2 text-right">Headcount</th>
              <th className="border p-2 text-right">Hours Saved</th>
              <th className="border p-2 text-right">FTE Equivalent</th>
              <th className="border p-2 text-right">Financial Impact</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => {
              // Calculate hourly rate from annual salary
              const hourlyRate = dept.avgSalary / WORK_HOURS_PER_YEAR;
              
              // Calculate hours saved based on efficiency gain percentage
              const efficiencyRate = dept.efficiencyGain / 100;
              const hoursPerEmployee = WORK_HOURS_PER_YEAR * efficiencyRate;
              const hoursSaved = dept.headcount * hoursPerEmployee * (adoptionRate / 100);
              
              const fteEquivalent = hoursSaved / WORK_HOURS_PER_YEAR;
              const financialImpact = hoursSaved * hourlyRate;
              
              return (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="border p-2">{dept.name}</td>
                  <td className="border p-2 text-right">{dept.headcount}</td>
                  <td className="border p-2 text-right">{Math.round(hoursSaved).toLocaleString()}</td>
                  <td className="border p-2 text-right">{fteEquivalent.toFixed(2)}</td>
                  <td className="border p-2 text-right">{formatCurrency(financialImpact)}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-semibold">
              <td className="border p-2">Total</td>
              <td className="border p-2 text-right">{totalImpact.headcount}</td>
              <td className="border p-2 text-right">{Math.round(totalImpact.hoursSaved).toLocaleString()}</td>
              <td className="border p-2 text-right">{totalImpact.fteEquivalent.toFixed(2)}</td>
              <td className="border p-2 text-right">{formatCurrency(totalImpact.financialImpact)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      {/* Department-Specific Insights - NEW SECTION */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Department-Specific AI Value</h2>
        <div className="space-y-4">
          {departments.map((dept) => {
            // Calculate hourly rate and impact metrics
            const hourlyRate = dept.avgSalary / WORK_HOURS_PER_YEAR;
            const efficiencyRate = dept.efficiencyGain / 100;
            const hoursPerEmployee = WORK_HOURS_PER_YEAR * efficiencyRate;
            const hoursSaved = dept.headcount * hoursPerEmployee * (adoptionRate / 100);
            const financialImpact = hoursSaved * hourlyRate;
            
            // Determine value category based on financial impact percentage of total
            const impactPercentage = (financialImpact / totalImpact.financialImpact) * 100;
            let valueCategory = "Moderate";
            let bgColor = "bg-amber-50";
            let textColor = "text-amber-800";
            
            if (impactPercentage > 25) {
              valueCategory = "Very High";
              bgColor = "bg-green-50";
              textColor = "text-green-800";
            } else if (impactPercentage > 15) {
              valueCategory = "High";
              bgColor = "bg-emerald-50";
              textColor = "text-emerald-800";
            } else if (impactPercentage < 5) {
              valueCategory = "Limited";
              bgColor = "bg-gray-50";
              textColor = "text-gray-800";
            }
            
            return (
              <div key={`insights-${dept.id}`} className={`p-3 rounded-lg border ${bgColor}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className={`font-medium ${textColor}`}>{dept.name}</h3>
                  <div className="flex items-center mt-1 md:mt-0">
                    <span className="text-xs bg-white rounded-full px-2 py-1 border">
                      Value Potential: <span className="font-semibold">{valueCategory}</span>
                    </span>
                    <span className="ml-2 text-xs bg-white rounded-full px-2 py-1 border">
                      Impact: <span className="font-semibold">{impactPercentage.toFixed(1)}% of total</span>
                    </span>
                  </div>
                </div>
                
                <div className="text-sm space-y-1">
                  <p className={textColor}>
                    <span className="font-medium">Primary AI Benefits:</span> {dept.headcount > 25 ? 'Scale automation across large team' : 'Enhance individual productivity'}
                  </p>
                  <p className={textColor}>
                    <span className="font-medium">Efficiency Gain:</span> {dept.efficiencyGain}% time savings per employee
                  </p>
                  <p className={textColor}>
                    <span className="font-medium">Time Reclaimed:</span> {Math.round(hoursSaved).toLocaleString()} hours ({(hoursSaved / dept.headcount).toFixed(0)} hours per team member)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Calculation Methodology */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Calculation Methodology</h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h3 className="font-medium text-gray-800 mb-2">How These Numbers Are Calculated</h3>
          <p className="text-sm text-gray-700 mb-2">This report uses the following methodology to calculate the potential impact of AI adoption:</p>
          
          <div className="space-y-3">
            <div className="border-l-4 border-teal-500 pl-3 py-1">
              <h4 className="font-medium">Hours Saved</h4>
              <p className="text-xs text-gray-600">
                Hours Saved = Headcount × Annual Working Hours × Efficiency Gain % × Adoption Rate %
              </p>
              <p className="text-xs text-gray-600">
                Annual Working Hours = {WORK_HOURS_PER_YEAR} hours
              </p>
            </div>
            
            <div className="border-l-4 border-teal-500 pl-3 py-1">
              <h4 className="font-medium">Financial Impact</h4>
              <p className="text-xs text-gray-600">
                Financial Impact = Hours Saved × Hourly Rate
              </p>
              <p className="text-xs text-gray-600">
                Hourly Rate = Annual Salary ÷ {WORK_HOURS_PER_YEAR} hours
              </p>
            </div>
            
            <div className="border-l-4 border-teal-500 pl-3 py-1">
              <h4 className="font-medium">FTE Equivalent</h4>
              <p className="text-xs text-gray-600">
                FTE Equivalent = Hours Saved ÷ {WORK_HOURS_PER_YEAR} hours
              </p>
              <p className="text-xs text-gray-600">
                (Full-Time Equivalent represents the equivalent number of full-time employees)
              </p>
            </div>
            
            <div className="border-l-4 border-teal-500 pl-3 py-1">
              <h4 className="font-medium">Return on Investment (ROI)</h4>
              <p className="text-xs text-gray-600">
                ROI = ((Financial Impact ÷ Investment Cost) × 100) - 100
              </p>
              <p className="text-xs text-gray-600">
                Investment Cost: {customCost ? formatCurrency(customCost) : "30% of Financial Impact"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="font-medium text-amber-800 mb-2">Industry Efficiency Benchmark Data</h3>
          <p className="text-sm text-amber-700 mb-2">
            AI efficiency gains are derived from {industry.name} industry benchmarks:
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-amber-100">
                <th className="p-2 text-left">Department</th>
                <th className="p-2 text-right">Avg. Efficiency Gain</th>
                <th className="p-2 text-right">Avg. Salary</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={`benchmark-${dept.id}`} className="border-b border-amber-200">
                  <td className="p-2">{dept.name}</td>
                  <td className="p-2 text-right">{dept.efficiencyGain}%</td>
                  <td className="p-2 text-right">{formatCurrency(dept.avgSalary)}/year</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Implementation Strategy - NEW SECTION */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Implementation Strategy Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 bg-blue-50">
            <h3 className="font-medium text-blue-800 mb-2">Phase 1: Preparation (1-2 months)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
              <li>Conduct AI readiness assessment</li>
              <li>Identify high-impact use cases in {departments[0]?.name || 'key departments'}</li>
              <li>Establish baseline metrics and KPIs</li>
              <li>Develop staff training plan</li>
              <li>Allocate implementation budget</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4 bg-green-50">
            <h3 className="font-medium text-green-800 mb-2">Phase 2: Pilot Implementation (2-3 months)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
              <li>Deploy AI solutions in selected departments</li>
              <li>Train pilot team members ({adoptionRate}% adoption target)</li>
              <li>Measure initial efficiency improvements</li>
              <li>Gather user feedback and refine approach</li>
              <li>Document early wins and challenges</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4 bg-amber-50">
            <h3 className="font-medium text-amber-800 mb-2">Phase 3: Expansion (3-6 months)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-amber-700">
              <li>Scale successful AI implementations organization-wide</li>
              <li>Extend training to all departments</li>
              <li>Integrate AI tools with existing workflows</li>
              <li>Address any adoption barriers</li>
              <li>Track and report on ROI progress</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4 bg-indigo-50">
            <h3 className="font-medium text-indigo-800 mb-2">Phase 4: Optimization (6+ months)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-indigo-700">
              <li>Continuous improvement of AI implementations</li>
              <li>Identify additional use cases</li>
              <li>Maximize staff adoption rates</li>
              <li>Advanced training for power users</li>
              <li>Regular reporting on ROI achievement</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Key Success Factors</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div>
              <h4 className="font-medium text-teal-700">Leadership Support</h4>
              <p className="text-gray-700">Executive sponsorship is crucial for successful AI adoption across departments.</p>
            </div>
            <div>
              <h4 className="font-medium text-teal-700">User Training</h4>
              <p className="text-gray-700">Comprehensive training programs ensure staff can effectively leverage AI tools.</p>
            </div>
            <div>
              <h4 className="font-medium text-teal-700">Data Readiness</h4>
              <p className="text-gray-700">Clean, organized data is essential for AI to deliver accurate results.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Implementation Parameters */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Implementation Parameters</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800">Industry</h3>
            <p className="text-lg">{industry.name}</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800">Time Horizon</h3>
            <p className="text-lg">{timeHorizon} months</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800">Adoption Rate</h3>
            <p className="text-lg">{adoptionRate}%</p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-gray-800">Investment</h3>
            <p className="text-lg">{formatCurrency(customCost || totalImpact.financialImpact * 0.3)}</p>
          </div>
        </div>
      </div>
      
      {/* Time Adjustment Factors */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Time & Adoption Factors</h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-700 mb-2">
            Impact calculations are adjusted based on time horizon and adoption rate factors:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
            <li>Short implementation periods (&lt;6 months) typically achieve 40-60% of potential gains</li>
            <li>Medium implementation periods (6-12 months) typically achieve 70-90% of potential gains</li>
            <li>Long implementation periods (&gt;12 months) can achieve 90-100% of potential gains</li>
            <li>Lower adoption rates (&lt;50%) significantly reduce overall impact</li>
            <li>{industry.name} industry typically reaches maturity in {industry.maturityTimeline || "12-18 months"}</li>
          </ul>
        </div>
      </div>
      
      {/* Risk Factors and Mitigation - NEW SECTION */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-teal-700 mb-4">Risk Assessment & Mitigation</h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Risk Factor</th>
              <th className="border p-2 text-left">Potential Impact</th>
              <th className="border p-2 text-left">Mitigation Strategy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">Low user adoption</td>
              <td className="border p-2">Reduced ROI, underutilized investment</td>
              <td className="border p-2">Comprehensive training, ongoing support, clear communication of benefits</td>
            </tr>
            <tr>
              <td className="border p-2">Data quality issues</td>
              <td className="border p-2">Poor AI performance, inaccurate results</td>
              <td className="border p-2">Data cleansing, standardization, and governance processes</td>
            </tr>
            <tr>
              <td className="border p-2">Integration challenges</td>
              <td className="border p-2">Workflow disruption, technical barriers</td>
              <td className="border p-2">Phased implementation, compatibility testing, IT support resources</td>
            </tr>
            <tr>
              <td className="border p-2">Skill gaps</td>
              <td className="border p-2">Ineffective use of AI tools</td>
              <td className="border p-2">Tailored training programs, identifying champions in each department</td>
            </tr>
            <tr>
              <td className="border p-2">Scope creep</td>
              <td className="border p-2">Budget overruns, delayed implementation</td>
              <td className="border p-2">Clear project boundaries, phased approach, regular progress reviews</td>
            </tr>
          </tbody>
        </table>
        
        <div className="mt-4 bg-amber-50 p-3 rounded-lg">
          <h3 className="font-medium text-amber-800 mb-1">Risk Impact on ROI</h3>
          <p className="text-sm text-amber-700">
            The ROI calculations in this report assume successful mitigation of these risks. 
            Actual results may vary based on implementation effectiveness and risk management.
            We recommend building in a 15-20% contingency in both time and budget allocations.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center text-gray-500 text-sm mt-12 pt-6 border-t">
        <p>Generated using AI ROI Calculator</p>
        <p>© {new Date().getFullYear()} - All metrics are projections based on industry data</p>
        <p className="mt-1 text-xs">Methodology based on industry benchmarks and adoption research</p>
      </div>
    </div>
  );
};

export default ReportContent;
