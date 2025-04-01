
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Download, Plus, Minus, Upload, Image, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
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
  TableFooter,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  // Branding information
  companyLogo?: string;
  companyName?: string;
  companyTagline?: string;
  brandColor?: string;
  // Content fields
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
  estimatedPayments: {
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

const defaultEstimatedPayments = [
  { item: "", quantity: 1, price: 0 },
  { item: "", quantity: 1, price: 0 },
  { item: "", quantity: 1, price: 0 },
];

const defaultRisks = [
  { name: "", likelihood: "Medium", impact: "Medium", mitigation: "" },
  { name: "", likelihood: "Medium", impact: "Medium", mitigation: "" },
  { name: "", likelihood: "Medium", impact: "Medium", mitigation: "" },
];

const StatementOfWorkTemplate = () => {
  const { toast } = useToast();
  const [uploadedLogo, setUploadedLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm<SowFormData>({
    defaultValues: {
      projectTitle: "",
      clientName: "",
      preparedBy: "",
      date: new Date().toLocaleDateString(),
      version: "1.0",
      projectId: "",
      // Branding defaults
      companyName: "",
      companyTagline: "",
      brandColor: "#0ea5e9", // Default teal color
      // Content fields
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
      estimatedPayments: defaultEstimatedPayments,
      risks: defaultRisks,
      communicationPlan: "",
      assumptions: "",
    },
  });

  const onSubmit = (data: SowFormData) => {
    // If a logo was uploaded, add it to the form data
    if (uploadedLogo) {
      data.companyLogo = uploadedLogo;
    }
    
    toast({
      title: "Form submitted",
      description: "Your Statement of Work is ready to export",
    });
    // The data is passed to the SowExportButton component
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Logo file should be less than 2MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const logoDataUrl = e.target?.result as string;
      setUploadedLogo(logoDataUrl);
      form.setValue("companyLogo", logoDataUrl);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeLogo = () => {
    setUploadedLogo(null);
    form.setValue("companyLogo", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  const addPaymentItem = () => {
    const currentValues = form.getValues("estimatedPayments");
    const newItem = { item: "", quantity: 1, price: 0 };
    form.setValue("estimatedPayments", [...currentValues, newItem]);
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

  const removePaymentItem = (index: number) => {
    const currentValues = form.getValues("estimatedPayments");
    if (currentValues.length <= 1) {
      toast({
        title: "Cannot remove item",
        description: "You must have at least one payment item in the list",
        variant: "destructive",
      });
      return;
    }
    
    const updatedValues = currentValues.filter((_, i) => i !== index);
    form.setValue("estimatedPayments", updatedValues);
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

  // Calculate estimated payment total
  const calculateTotal = () => {
    const payments = form.watch("estimatedPayments");
    return payments.reduce((total, item) => {
      return total + (Number(item.quantity) * Number(item.price));
    }, 0);
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
          
          {/* New Card for Branding */}
          <Card>
            <CardHeader>
              <CardTitle>Document Branding</CardTitle>
              <CardDescription>Customize the document with your branding elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Logo Upload */}
              <div className="mb-4">
                <FormLabel>Company Logo</FormLabel>
                <div className="mt-2 flex items-center gap-4">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center w-40 h-24 cursor-pointer hover:bg-gray-50 transition-colors ${uploadedLogo ? 'border-teal-300' : 'border-gray-300'}`}
                    onClick={triggerFileInput}
                  >
                    {uploadedLogo ? (
                      <img 
                        src={uploadedLogo} 
                        alt="Uploaded logo" 
                        className="max-h-16 max-w-32 object-contain"
                      />
                    ) : (
                      <>
                        <Upload className="h-8 w-8 text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">Upload logo</span>
                      </>
                    )}
                    <input 
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  
                  {uploadedLogo && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={removeLogo}
                      className="h-8 flex items-center gap-1 text-red-500"
                    >
                      <X className="h-4 w-4" />
                      Remove
                    </Button>
                  )}
                  
                  <FormDescription className="text-xs text-gray-500">
                    Upload a logo (max 2MB). This will appear at the top of your Statement of Work.
                  </FormDescription>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="companyTagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Tagline</FormLabel>
                      <FormControl>
                        <Input placeholder="Your company slogan or tagline" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="brandColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Color</FormLabel>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        {...field}
                        className="w-10 h-10 rounded border overflow-hidden cursor-pointer"
                      />
                      <Input
                        value={field.value}
                        onChange={field.onChange}
                        className="font-mono"
                      />
                    </div>
                    <FormDescription>
                      Select a brand color to be used for headings in the document
                    </FormDescription>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          
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
                    <TableHead>Deliverable Name</TableHead>
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
              <p className="text-sm text-muted-foreground mt-2">
                Note: In the generated document, Deliverable Name, Description, and Format will be merged into a single column.
              </p>
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
              <p className="text-sm text-muted-foreground mt-2">
                Note: In the generated document, Milestone and Description will be merged into a single column.
              </p>
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
              <CardTitle>7. Requirements</CardTitle>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Performance Criteria</CardTitle>
              <CardDescription>Metrics for evaluating success</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="performanceCriteria"
                render={({ field }) => (
                  <FormItem>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Testing and Acceptance</CardTitle>
              <CardDescription>Validation procedures</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="testingAcceptance"
                render={({ field }) => (
                  <FormItem>
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
              <CardTitle>10. Project Management</CardTitle>
              <CardDescription>How the project will be managed and controlled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>10.1 Budget and Payment Terms</FormLabel>
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

              <div>
                <FormLabel>10.2 Estimated Payments</FormLabel>
                <Table className="mt-2">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price ($)</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="w-[80px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {form.watch("estimatedPayments").map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input
                            placeholder="Item name"
                            {...form.register(`estimatedPayments.${index}.item`)}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="1"
                            placeholder="1"
                            {...form.register(`estimatedPayments.${index}.quantity`, {
                              valueAsNumber: true,
                            })}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            {...form.register(`estimatedPayments.${index}.price`, {
                              valueAsNumber: true,
                            })}
                          />
                        </TableCell>
                        <TableCell>
                          ${((form.watch(`estimatedPayments.${index}.quantity`) || 0) * 
                            (form.watch(`estimatedPayments.${index}.price`) || 0)).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            type="button"
                            onClick={() => removePaymentItem(index)}
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-semibold">Total:</TableCell>
                      <TableCell className="font-semibold">${calculateTotal().toFixed(2)}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
                <div className="mt-2 flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPaymentItem}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Payment Item
                  </Button>
                </div>
              </div>

              <FormField
                control={form.control}
                name="changeManagement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>10.3 Change Management Process</FormLabel>
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

          {/* Risk Management Section */}
          <Card>
            <CardHeader>
              <CardTitle>11. Risk Management</CardTitle>
              <CardDescription>Identify and mitigate potential project risks</CardDescription>
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
                          placeholder="Risk description"
                          {...form.register(`risks.${index}.name`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Low/Medium/High"
                          {...form.register(`risks.${index}.likelihood`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Low/Medium/High"
                          {...form.register(`risks.${index}.impact`)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="How will this risk be mitigated?"
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

          {/* Communication Plan */}
          <Card>
            <CardHeader>
              <CardTitle>12. Communication Plan</CardTitle>
              <CardDescription>How project information will be shared with stakeholders</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="communicationPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the communication channels, frequency of updates, reporting structure, and documentation procedures." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Assumptions */}
          <Card>
            <CardHeader>
              <CardTitle>13. Assumptions</CardTitle>
              <CardDescription>Baseline factors affecting project success</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="assumptions"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="List assumptions about the project environment, resources, and constraints that are presumed to be true for planning purposes." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Export Button */}
          <div className="flex justify-end mt-8">
            <SowExportButton formData={form.getValues()} />
            <Button type="submit" className="ml-4 bg-blue-600 hover:bg-blue-700">
              Submit Form
            </Button>
          </div>
        </form>
      </Form>

      <PageFooter />
    </div>
  );
};

export default StatementOfWorkTemplate;
