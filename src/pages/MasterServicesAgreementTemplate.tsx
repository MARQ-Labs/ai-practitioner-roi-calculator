
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MsaDocument from '@/components/msa/MsaDocument';
import MsaExportButton from '@/components/msa/MsaExportButton';
import PageFooter from '@/components/calculator/PageFooter';

const MasterServicesAgreementTemplate = () => {
  const [formData, setFormData] = useState({
    serviceProviderName: "",
    serviceProviderJurisdiction: "",
    serviceProviderAddress: "",
    clientName: "",
    clientJurisdiction: "",
    clientAddress: "",
    effectiveDate: "",
    paymentTermDays: "30",
    terminationNoticeDays: "30",
    breachCureDays: "15",
    confidentialityYears: "5",
    liabilityCap: "$1,000,000",
    governingLaw: "",
    arbitrationBody: "",
    survivingSections: "5, 6, 7, 9, 10, and 11",
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
          <MsaExportButton formData={formData} />
        </div>
        
        <div className="flex flex-col items-center">
          <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/5a85bb3c-33d0-4ee5-9030-1eea5c4027b7.png" 
              alt="Autosolutions.ai Logo" 
              className="w-32 mb-4 hover:opacity-80 transition-opacity"
            />
          </a>
          <h1 className="text-3xl font-bold tracking-tight">Master Services Agreement Template</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Create a customized Master Services Agreement for your AI services business
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
                  Customize Your Agreement
                </CardTitle>
                <CardDescription>
                  Fill out the form to generate your personalized MSA template
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="parties" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="parties">Parties</TabsTrigger>
                    <TabsTrigger value="terms">Terms</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="parties" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceProviderName">Service Provider Name</Label>
                      <Input 
                        id="serviceProviderName" 
                        name="serviceProviderName"
                        value={formData.serviceProviderName} 
                        onChange={handleInputChange}
                        placeholder="Your Company, Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="serviceProviderJurisdiction">Service Provider Jurisdiction</Label>
                      <Input 
                        id="serviceProviderJurisdiction"
                        name="serviceProviderJurisdiction" 
                        value={formData.serviceProviderJurisdiction} 
                        onChange={handleInputChange}
                        placeholder="State/Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="serviceProviderAddress">Service Provider Address</Label>
                      <Input 
                        id="serviceProviderAddress"
                        name="serviceProviderAddress" 
                        value={formData.serviceProviderAddress} 
                        onChange={handleInputChange}
                        placeholder="123 Main St, City, State ZIP"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name</Label>
                      <Input 
                        id="clientName"
                        name="clientName" 
                        value={formData.clientName} 
                        onChange={handleInputChange}
                        placeholder="Client Company, Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="clientJurisdiction">Client Jurisdiction</Label>
                      <Input 
                        id="clientJurisdiction"
                        name="clientJurisdiction" 
                        value={formData.clientJurisdiction} 
                        onChange={handleInputChange}
                        placeholder="State/Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="clientAddress">Client Address</Label>
                      <Input 
                        id="clientAddress"
                        name="clientAddress" 
                        value={formData.clientAddress} 
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
                      <Label htmlFor="paymentTermDays">Payment Terms (days)</Label>
                      <Input 
                        id="paymentTermDays"
                        name="paymentTermDays" 
                        value={formData.paymentTermDays} 
                        onChange={handleInputChange}
                        placeholder="30"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="terminationNoticeDays">Termination Notice (days)</Label>
                      <Input 
                        id="terminationNoticeDays"
                        name="terminationNoticeDays" 
                        value={formData.terminationNoticeDays} 
                        onChange={handleInputChange}
                        placeholder="30"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="breachCureDays">Breach Cure Period (days)</Label>
                      <Input 
                        id="breachCureDays"
                        name="breachCureDays" 
                        value={formData.breachCureDays} 
                        onChange={handleInputChange}
                        placeholder="15"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confidentialityYears">Confidentiality Term (years)</Label>
                      <Input 
                        id="confidentialityYears"
                        name="confidentialityYears" 
                        value={formData.confidentialityYears} 
                        onChange={handleInputChange}
                        placeholder="5"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="liabilityCap">Liability Cap</Label>
                      <Input 
                        id="liabilityCap"
                        name="liabilityCap" 
                        value={formData.liabilityCap} 
                        onChange={handleInputChange}
                        placeholder="$1,000,000"
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
                    
                    <div className="space-y-2">
                      <Label htmlFor="arbitrationBody">Arbitration Body</Label>
                      <Input 
                        id="arbitrationBody"
                        name="arbitrationBody" 
                        value={formData.arbitrationBody} 
                        onChange={handleInputChange}
                        placeholder="American Arbitration Association"
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
            <MsaDocument data={formData} />
          </div>
        </div>
      </div>
      
      <PageFooter />
    </div>
  );
};

export default MasterServicesAgreementTemplate;
