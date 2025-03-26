
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DpaDocument from '@/components/dpa/DpaDocument';
import DpaExportButton from '@/components/dpa/DpaExportButton';
import PageFooter from '@/components/calculator/PageFooter';

const DataProcessingAgreementTemplate = () => {
  const [formData, setFormData] = useState({
    controllerName: "",
    controllerJurisdiction: "",
    controllerAddress: "",
    processorName: "",
    processorJurisdiction: "",
    processorAddress: "",
    effectiveDate: "",
    region: "European Economic Area",
    breachNotificationHours: "48",
    governingLaw: "",
    subjectMatter: "Processing of Personal Data for the purpose of providing AI-powered services",
    purpose: "Collection, storage, analysis, and use of Personal Data to train, validate, and operate AI models",
    personalDataTypes: "Name, email address, customer service inquiries, purchase history, behavioral data",
    specialCategories: "None",
    dataSubjects: "Customers, employees, website visitors",
    processingOperations: "Collection, storage, analysis, use, erasure",
    securityMeasures: "Encryption of Personal Data, access controls, regular security testing, backups",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="text-center my-4 relative">
        <div className="absolute left-0 top-0">
          <Button variant="outline" size="sm" asChild className="flex items-center gap-1">
            <Link to="/templates">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Templates</span>
            </Link>
          </Button>
        </div>
        
        <div className="absolute right-0 top-0">
          <DpaExportButton formData={formData} />
        </div>
        
        <div className="flex flex-col items-center">
          <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/5a85bb3c-33d0-4ee5-9030-1eea5c4027b7.png" 
              alt="Autosolutions.ai Logo" 
              className="w-32 mb-4 hover:opacity-80 transition-opacity"
            />
          </a>
          <h1 className="text-3xl font-bold tracking-tight">Data Processing Agreement Template</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Create a customized DPA for AI-related data processing activities
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="sticky top-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Customize Your DPA
                </CardTitle>
                <CardDescription>
                  Fill out the form to generate your personalized Data Processing Agreement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="parties" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="parties">Parties</TabsTrigger>
                    <TabsTrigger value="terms">Terms</TabsTrigger>
                    <TabsTrigger value="details">Annex</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="parties" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="controllerName">Controller Name</Label>
                      <Input 
                        id="controllerName" 
                        name="controllerName"
                        value={formData.controllerName} 
                        onChange={handleInputChange}
                        placeholder="Your Company, Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="controllerJurisdiction">Controller Jurisdiction</Label>
                      <Input 
                        id="controllerJurisdiction"
                        name="controllerJurisdiction" 
                        value={formData.controllerJurisdiction} 
                        onChange={handleInputChange}
                        placeholder="State/Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="controllerAddress">Controller Address</Label>
                      <Input 
                        id="controllerAddress"
                        name="controllerAddress" 
                        value={formData.controllerAddress} 
                        onChange={handleInputChange}
                        placeholder="123 Main St, City, State ZIP"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="processorName">Processor Name</Label>
                      <Input 
                        id="processorName"
                        name="processorName" 
                        value={formData.processorName} 
                        onChange={handleInputChange}
                        placeholder="Service Provider Company, Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="processorJurisdiction">Processor Jurisdiction</Label>
                      <Input 
                        id="processorJurisdiction"
                        name="processorJurisdiction" 
                        value={formData.processorJurisdiction} 
                        onChange={handleInputChange}
                        placeholder="State/Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="processorAddress">Processor Address</Label>
                      <Input 
                        id="processorAddress"
                        name="processorAddress" 
                        value={formData.processorAddress} 
                        onChange={handleInputChange}
                        placeholder="456 Business Ave, City, State ZIP"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="terms" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="effectiveDate">Effective Date</Label>
                      <Input 
                        id="effectiveDate"
                        name="effectiveDate" 
                        value={formData.effectiveDate} 
                        onChange={handleInputChange}
                        placeholder="January 1, 2024"
                        type="text"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="region">Restricted Transfer Region</Label>
                      <Input 
                        id="region"
                        name="region" 
                        value={formData.region} 
                        onChange={handleInputChange}
                        placeholder="European Economic Area"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="breachNotificationHours">Breach Notification Hours</Label>
                      <Input 
                        id="breachNotificationHours"
                        name="breachNotificationHours" 
                        value={formData.breachNotificationHours} 
                        onChange={handleInputChange}
                        placeholder="48"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="governingLaw">Governing Law</Label>
                      <Input 
                        id="governingLaw"
                        name="governingLaw" 
                        value={formData.governingLaw} 
                        onChange={handleInputChange}
                        placeholder="State/Country"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subjectMatter">Subject Matter of Processing</Label>
                      <Textarea 
                        id="subjectMatter"
                        name="subjectMatter" 
                        value={formData.subjectMatter} 
                        onChange={handleInputChange}
                        placeholder="Processing of Personal Data for the purpose of providing AI-powered services"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="purpose">Nature and Purpose</Label>
                      <Textarea 
                        id="purpose"
                        name="purpose" 
                        value={formData.purpose} 
                        onChange={handleInputChange}
                        placeholder="Collection, storage, analysis, and use of Personal Data to train, validate, and operate AI models"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="personalDataTypes">Types of Personal Data</Label>
                      <Textarea 
                        id="personalDataTypes"
                        name="personalDataTypes" 
                        value={formData.personalDataTypes} 
                        onChange={handleInputChange}
                        placeholder="Name, email address, customer service inquiries, purchase history, behavioral data"
                        rows={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="specialCategories">Special Categories (if any)</Label>
                      <Input 
                        id="specialCategories"
                        name="specialCategories" 
                        value={formData.specialCategories} 
                        onChange={handleInputChange}
                        placeholder="None"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dataSubjects">Categories of Data Subjects</Label>
                      <Input 
                        id="dataSubjects"
                        name="dataSubjects" 
                        value={formData.dataSubjects} 
                        onChange={handleInputChange}
                        placeholder="Customers, employees, website visitors"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="processingOperations">Processing Operations</Label>
                      <Input 
                        id="processingOperations"
                        name="processingOperations" 
                        value={formData.processingOperations} 
                        onChange={handleInputChange}
                        placeholder="Collection, storage, analysis, use, erasure"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="securityMeasures">Security Measures</Label>
                      <Textarea 
                        id="securityMeasures"
                        name="securityMeasures" 
                        value={formData.securityMeasures} 
                        onChange={handleInputChange}
                        placeholder="Encryption of Personal Data, access controls, regular security testing, backups"
                        rows={2}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-1">
            <DpaDocument data={formData} />
          </div>
        </div>
      </div>
      
      <PageFooter />
    </div>
  );
};

export default DataProcessingAgreementTemplate;
