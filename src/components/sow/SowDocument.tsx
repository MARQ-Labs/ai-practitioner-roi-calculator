import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";

interface SowFormData {
  projectTitle: string;
  clientName: string;
  preparedBy: string;
  date: string;
  version: string;
  projectId: string;
  overview: string;
  inScope: string;
  outOfScope: string;
  methodology: string;
  // Branding information
  companyLogo?: string;
  companyName?: string;
  companyTagline?: string;
  brandColor?: string;
  // Other fields
  deliverables: {
    name: string;
    description: string;
    format: string;
    dueDate: string;
  }[];
  milestones: {
    name: string;
    description: string;
    date: string;
  }[];
  teamStructure: {
    role: string;
    responsibilities: string;
    personAssigned: string;
  }[];
  technicalRequirements: string;
  dataRequirements: string;
  performanceCriteria: string;
  testingAcceptance: string;
  budget: string;
  changeManagement: string;
  estimatedPayments?: {
    item: string;
    quantity: number;
    price: number;
  }[];
  risks: {
    name: string;
    likelihood: string;
    impact: string;
    mitigation: string;
  }[];
  communicationPlan: string;
  assumptions: string;
}

interface SowDocumentProps {
  data: SowFormData;
}

const SowDocument: React.FC<SowDocumentProps> = ({ data }) => {
  // Define a default or brand color based on the data
  const brandColor = data.brandColor || "#0ea5e9"; // Default to a blue color if not provided
  
  // Calculate total for estimated payments
  const calculateTotal = () => {
    if (!data.estimatedPayments || data.estimatedPayments.length === 0) return 0;
    
    return data.estimatedPayments.reduce((total, item) => {
      return total + (Number(item.quantity) * Number(item.price));
    }, 0);
  };
  
  return (
    <div className="bg-white p-8 font-sans" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="text-center mb-8">
        {data.companyLogo && (
          <div className="flex justify-center mb-2">
            <img 
              src={data.companyLogo} 
              alt={`${data.companyName || 'Company'} Logo`} 
              className="max-h-28 max-w-[240px] object-contain"
            />
          </div>
        )}
        
        {data.companyName && (
          <p className="text-lg font-semibold mb-1" style={{ color: brandColor }}>
            {data.companyName}
          </p>
        )}
        
        {data.companyTagline && (
          <p className="text-sm text-gray-600 mb-4 italic">
            {data.companyTagline}
          </p>
        )}
        
        <h1 className="text-2xl font-bold mb-2">
          AI Project Statement of Work
        </h1>
        <p className="text-gray-600 mb-4">
          A comprehensive agreement defining the scope, deliverables, and terms for an artificial intelligence project
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <p className="font-semibold">Project Title:</p>
          <p>{data.projectTitle || "[Project Name]"}</p>
        </div>
        <div>
          <p className="font-semibold">Client:</p>
          <p>{data.clientName || "[Client Name]"}</p>
        </div>
        <div>
          <p className="font-semibold">Prepared By:</p>
          <p>{data.preparedBy || "[Your Name/Company]"}</p>
        </div>
        <div>
          <p className="font-semibold">Date:</p>
          <p>{data.date || "[Preparation Date]"}</p>
        </div>
        <div>
          <p className="font-semibold">Version:</p>
          <p>{data.version || "[Document Version]"}</p>
        </div>
        <div>
          <p className="font-semibold">Project ID:</p>
          <p>{data.projectId || "[Internal Reference Number]"}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">1. Project Overview</h2>
        <p className="whitespace-pre-line">{data.overview || "[Provide a concise description of the project, its business context, and the main objectives. Clearly articulate the problem being solved and how AI will address it.]"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">2. Scope of Work</h2>
        
        <h3 className="text-lg font-semibold mb-2">2.1 In-Scope</h3>
        <p className="whitespace-pre-line">{data.inScope || "[List specific deliverables, components, and services that will be provided]"}</p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">2.2 Out-of-Scope</h3>
        <p className="whitespace-pre-line">{data.outOfScope || "[Clearly define what is NOT included in this project]"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">3. Approach and Methodology</h2>
        <p className="whitespace-pre-line">{data.methodology || "[Describe the AI development methodology (e.g., agile, waterfall)]"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">4. Deliverables</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[75%]">Deliverable</TableHead>
              <TableHead className="w-[25%]">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.deliverables.map((deliverable, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    <strong>{deliverable.name || "[Deliverable]"}</strong>
                    {deliverable.description && (
                      <>
                        <br />
                        <span>{deliverable.description}</span>
                      </>
                    )}
                    {deliverable.format && (
                      <>
                        <br />
                        <span className="text-sm text-gray-600">Format: {deliverable.format}</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{deliverable.dueDate || "[Date]"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">5. Timeline and Milestones</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[75%]">Milestone</TableHead>
              <TableHead className="w-[25%]">Completion Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.milestones.map((milestone, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div>
                    <strong>{milestone.name || "[Milestone]"}</strong>
                    {milestone.description && (
                      <>
                        <br />
                        <span>{milestone.description}</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>{milestone.date || "[Date]"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">6. Team Structure and Responsibilities</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Responsibilities</TableHead>
              <TableHead>Person Assigned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.teamStructure.map((team, index) => (
              <TableRow key={index}>
                <TableCell>{team.role || "[Role]"}</TableCell>
                <TableCell>{team.responsibilities || "[Responsibilities]"}</TableCell>
                <TableCell>{team.personAssigned || "[Name]"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">7. Requirements</h2>
        <h3 className="text-lg font-semibold mb-2">7.1 Technical Requirements</h3>
        <p className="whitespace-pre-line">{data.technicalRequirements || "[List hardware, software, infrastructure needs]"}</p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">7.2 Data Requirements</h3>
        <p className="whitespace-pre-line">{data.dataRequirements || "[Specify data sources, formats, and volumes]"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">8. Performance Criteria</h2>
        <p className="whitespace-pre-line">{data.performanceCriteria || "[Define specific metrics for evaluating model performance]"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">9. Testing and Acceptance</h2>
        <p className="whitespace-pre-line">{data.testingAcceptance || "[Outline the testing methodology]"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">10. Project Management</h2>
        <h3 className="text-lg font-semibold mb-2">10.1 Budget and Payment Terms</h3>
        <p className="whitespace-pre-line">{data.budget || "[Provide detailed cost breakdown]"}</p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">10.2 Estimated Payments</h3>
        {data.estimatedPayments && data.estimatedPayments.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.estimatedPayments.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.item || "[Item]"}</TableCell>
                  <TableCell>{item.quantity || 0}</TableCell>
                  <TableCell>${item.price?.toFixed(2) || "0.00"}</TableCell>
                  <TableCell>${((Number(item.quantity) || 0) * (Number(item.price) || 0)).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="text-right font-semibold">Total:</TableCell>
                <TableCell className="font-semibold">${calculateTotal().toFixed(2)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        ) : (
          <p className="text-gray-500 italic">[No estimated payments provided]</p>
        )}
        
        <h3 className="text-lg font-semibold mt-4 mb-2">10.3 Change Management Process</h3>
        <p className="whitespace-pre-line">{data.changeManagement || "[Define the process for requesting changes]"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">11. Risk Management</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Risk</TableHead>
              <TableHead>Likelihood</TableHead>
              <TableHead>Impact</TableHead>
              <TableHead>Mitigation Strategy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.risks.map((risk, index) => (
              <TableRow key={index}>
                <TableCell>{risk.name || "[Risk]"}</TableCell>
                <TableCell>{risk.likelihood || "[High/Medium/Low]"}</TableCell>
                <TableCell>{risk.impact || "[High/Medium/Low]"}</TableCell>
                <TableCell>{risk.mitigation || "[Strategy]"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">12. Communication Plan</h2>
        <p className="whitespace-pre-line">{data.communicationPlan || "[Specify regular meeting cadence]"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">13. Assumptions and Dependencies</h2>
        <p className="whitespace-pre-line">{data.assumptions || "[List all assumptions made in preparing this SOW]"}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">14. Signatures</h2>
        <div className="grid grid-cols-2 gap-8 mt-4">
          <div>
            <p className="font-semibold mb-4">For {data.preparedBy || "[Service Provider]"}:</p>
            <p className="mb-2">Name: _____________________</p>
            <p className="mb-2">Title: _____________________</p>
            <p className="mb-2">Signature: _________________</p>
            <p className="mb-2">Date: _____________________</p>
          </div>
          <div>
            <p className="font-semibold mb-4">For {data.clientName || "[Client]"}:</p>
            <p className="mb-2">Name: _____________________</p>
            <p className="mb-2">Title: _____________________</p>
            <p className="mb-2">Signature: _________________</p>
            <p className="mb-2">Date: _____________________</p>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t">
        <p>This Statement of Work template is designed for AI project management | © {data.companyName || data.preparedBy || "Your Company"} {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default SowDocument;
