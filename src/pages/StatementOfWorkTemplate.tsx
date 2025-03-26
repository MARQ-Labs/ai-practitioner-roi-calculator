
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { formatReportData } from "@/utils/pdfExport";
import PageFooter from "@/components/calculator/PageFooter";
import SowExportButton from "@/components/sow/SowExportButton";

type SowFormData = {
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
  risks: {
    name: string;
    likelihood: string;
    impact: string;
    mitigation: string;
  }[];
  communicationPlan: string;
  assumptions: string;
};

const defaultDeliverables = [
  { name: "", description: "", format: "", dueDate: "" },
  { name: "", description: "", format: "", dueDate: "" },
  { name: "", description: "", format: "", dueDate: "" },
];

const defaultMilestones = [
  { name: "", description: "", date: "" },
  { name: "", description: "", date: "" },
  { name: "", description: "", date: "" },
];

const defaultTeamStructure = [
  { role: "", responsibilities: "", personAssigned: "" },
  { role: "", responsibilities: "", personAssigned: "" },
  { role: "", responsibilities: "", personAssigned: "" },
];

const defaultRisks = [
  { name: "", likelihood: "Medium", impact: "Medium", mitigation: "" },
  { name: "", likelihood: "Medium", impact: "Medium", mitigation: "" },
  { name: "", likelihood: "Medium", impact: "Medium", mitigation: "" },
];

const StatementOfWorkTemplate = () => {
  const { toast } = useToast();
  const form = useForm<SowFormData>({
    defaultValues: {
      projectTitle: "",
      clientName: "",
      preparedBy: "",
      date: new Date().toLocaleDateString(),
      version: "1.0",
      projectId: "",
      overview: "",
      inScope: "",
      outOfScope: "",
      methodology: "",
      deliverables: defaultDeliverables,
      milestones: defaultMilestones,
      teamStructure: defaultTeamStructure,
      technicalRequirements: "",
      dataRequirements: "",
      performanceCriteria: "",
      testingAcceptance: "",
      budget: "",
      changeManagement: "",
      risks: defaultRisks,
      communicationPlan: "",
      assumptions: "",
    },
  });

  const onSubmit = (data: SowFormData) => {
    toast({
      title: "Form submitted",
      description: "Your Statement of Work is ready to export",
    });
    // The data is passed to the SowExportButton component
  };

  // Type-safe functions to add items to specific lists
  const addDeliverable = () => {
    const currentValues = form.getValues("deliverables");
    const newItem = { name: "", description: "", format: "", dueDate: "" };
    form.setValue("deliverables", [...currentValues, newItem]);
  };

  const addMilestone = () => {
    const currentValues = form.getValues("milestones");
    const newItem = { name: "", description: "", date: "" };
    form.setValue("milestones", [...currentValues, newItem]);
  };

  const addTeamMember = () => {
    const currentValues = form.getValues("teamStructure");
    const newItem = { role: "", responsibilities: "", personAssigned: "" };
    form.setValue("teamStructure", [...currentValues, newItem]);
  };

  const addRisk = () => {
    const currentValues = form.getValues("risks");
    const newItem = { name: "", likelihood: "Medium", impact: "Medium", mitigation: "" };
    form.setValue("risks", [...currentValues, newItem]);
  };

  // Type-safe functions to remove items from specific lists
  const removeDeliverable = (index: number) => {
    const currentValues = form.getValues("deliverables");
    if (currentValues.length <= 1) {
      toast({
        title: "Cannot remove item",
        description: "You must have at least one deliverable in the list",
        variant: "destructive",
      });
      return;
    }
    
    const updatedValues = currentValues.filter((_, i) => i !== index);
    form.setValue("deliverables", updatedValues);
  };

  const removeMilestone = (index: number) => {
    const currentValues = form.getValues("milestones");
    if (currentValues.length <= 1) {
      toast({
        title: "Cannot remove item",
        description: "You must have at least one milestone in the list",
        variant: "destructive",
      });
      return;
    }
    
    const updatedValues = currentValues.filter((_, i) => i !== index);
    form.setValue("milestones", updatedValues);
  };

  const removeTeamMember = (index: number) => {
    const currentValues = form.getValues("teamStructure");
    if (currentValues.length <= 1) {
      toast({
        title: "Cannot remove item",
        description: "You must have at least one team member in the list",
        variant: "destructive",
      });
      return;
    }
    
    const updatedValues = currentValues.filter((_, i) => i !== index);
    form.setValue("teamStructure", updatedValues);
  };

  const removeRisk = (index: number) => {
    const currentValues = form.getValues("risks");
    if (currentValues.length <= 1) {
      toast({
        title: "Cannot remove item",
        description: "You must have at least one risk in the list",
        variant: "destructive",
      });
      return;
    }
    
    const updatedValues = currentValues.filter((_, i) => i !== index);
    form.setValue("risks", updatedValues);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="mb-8 relative">
        <div className="absolute left-0 top-0">
          <Button variant="outline" size="sm" asChild className="flex items-center gap-1">
            <Link to="/templates">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Templates</span>
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col items-center text-center pt-4">
          <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/5a85bb3c-33d0-4ee5-9030-1eea5c4027b7.png" 
              alt="Autosolutions.ai Logo" 
              className="w-32 mb-4 hover:opacity-80 transition-opacity"
            />
          </a>
          <h1 className="text-3xl font-bold tracking-tight">AI Statement of Work Template</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Fill out the form below to create a comprehensive Statement of Work for your AI project.
            You can export the document as a PDF when complete.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
              <CardDescription>Basic information about the project and stakeholders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="projectTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="preparedBy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prepared By</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name/company" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="version"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Document Version</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 1.0" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="projectId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Internal reference number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>Project Scope</CardTitle>
              <CardDescription>Define the boundaries and details of the project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <FormField
                control={form.control}
                name="overview"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>1. Project Overview</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide a concise description of the project, its business context, and the main objectives." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inScope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2.1 In-Scope</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List specific deliverables, components, and services that will be provided." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="outOfScope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>2.2 Out-of-Scope</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Clearly define what is NOT included in this project." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="methodology"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>3. Approach and Methodology</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the AI development methodology, technical approaches, and data handling procedures." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>4. Deliverables</CardTitle>
              <CardDescription>List the specific outputs of the project</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deliverable</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.watch("deliverables").map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          placeholder="Deliverable name"
                          {...form.register(`deliverables.${index}.name`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Description"
                          {...form.register(`deliverables.${index}.description`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Format"
                          {...form.register(`deliverables.${index}.format`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="date"
                          {...form.register(`deliverables.${index}.dueDate`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          type="button"
                          onClick={() => removeDeliverable(index)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addDeliverable}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Deliverable
                </Button>
              </div>
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>5. Timeline and Milestones</CardTitle>
              <CardDescription>Key points in the project schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Milestone</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.watch("milestones").map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          placeholder="Milestone name"
                          {...form.register(`milestones.${index}.name`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Description"
                          {...form.register(`milestones.${index}.description`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="date"
                          {...form.register(`milestones.${index}.date`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          type="button"
                          onClick={() => removeMilestone(index)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addMilestone}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Milestone
                </Button>
              </div>
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>6. Team Structure and Responsibilities</CardTitle>
              <CardDescription>Project team organization</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Responsibilities</TableHead>
                    <TableHead>Person Assigned</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.watch("teamStructure").map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          placeholder="Role"
                          {...form.register(`teamStructure.${index}.role`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="List responsibilities"
                          {...form.register(`teamStructure.${index}.responsibilities`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Name"
                          {...form.register(`teamStructure.${index}.personAssigned`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addTeamMember}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Team Member
                </Button>
              </div>
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>Project Requirements</CardTitle>
              <CardDescription>Technical specifications and resources needed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <FormField
                control={form.control}
                name="technicalRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>7.1 Technical Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List hardware, software, infrastructure needs, compatibility requirements, etc." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>7.2 Data Requirements</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Specify data sources, formats, volumes, quality requirements, and governance considerations." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="performanceCriteria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>8. Performance Criteria</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Define specific metrics for evaluating model performance, benchmarks, and thresholds for success." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="testingAcceptance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>9. Testing and Acceptance</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Outline the testing methodology, acceptance criteria, and validation procedures." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>Project Management</CardTitle>
              <CardDescription>How the project will be managed and controlled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>10. Budget and Payment Terms</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide detailed cost breakdown, payment schedule, and contingency provisions." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="changeManagement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>11. Change Management Process</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Define the process for requesting changes, approval procedures, and impact assessment requirements." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>12. Risk Management</CardTitle>
              <CardDescription>Identified risks and mitigation strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Risk</TableHead>
                    <TableHead>Likelihood</TableHead>
                    <TableHead>Impact</TableHead>
                    <TableHead>Mitigation Strategy</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {form.watch("risks").map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Input
                          placeholder="Risk name"
                          {...form.register(`risks.${index}.name`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="High/Medium/Low"
                          {...form.register(`risks.${index}.likelihood`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="High/Medium/Low"
                          {...form.register(`risks.${index}.impact`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Mitigation strategy"
                          {...form.register(`risks.${index}.mitigation`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          type="button"
                          onClick={() => removeRisk(index)}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRisk}
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Risk
                </Button>
              </div>
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>Final Details</CardTitle>
              <CardDescription>Additional information and closure details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <FormField
                control={form.control}
                name="communicationPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>13. Communication Plan</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Specify regular meeting cadence, reporting requirements, and key stakeholders." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assumptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>14. Assumptions and Dependencies</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="List all assumptions made in preparing this SOW and dependencies on client resources or other projects." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Generate Statement of Work
            </Button>
            <SowExportButton formData={form.watch()} />
          </div>
        </form>
      </Form>

      <PageFooter />
    </div>
  );
};

export default StatementOfWorkTemplate;
