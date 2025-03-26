
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
import NdaDocument from '@/components/nda/NdaDocument';
import NdaExportButton from '@/components/nda/NdaExportButton';
import PageFooter from '@/components/calculator/PageFooter';

const NonDisclosureAgreementTemplate = () => {
  const [formData, setFormData] = useState({
    partyAName: "",
    partyAJurisdiction: "",
    partyAAddress: "",
    partyBName: "",
    partyBJurisdiction: "",
    partyBAddress: "",
    effectiveDate: "",
    purpose: "the development and implementation of artificial intelligence solutions for customer service automation",
    term: "5 (five)",
    survivalPeriod: "3 (three)",
    governingLaw: "",
    disputeResolution: "by arbitration in accordance with the rules of the American Arbitration Association"
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
          <NdaExportButton formData={formData} />
        </div>
        
        <div className="flex flex-col items-center">
          <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/5a85bb3c-33d0-4ee5-9030-1eea5c4027b7.png" 
              alt="Autosolutions.ai Logo" 
              className="w-32 mb-4 hover:opacity-80 transition-opacity"
            />
          </a>
          <h1 className="text-3xl font-bold tracking-tight">Non-Disclosure Agreement Template</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Create a customized NDA for AI-related business relationships
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
                  Customize Your NDA
                </CardTitle>
                <CardDescription>
                  Fill out the form to generate your personalized Non-Disclosure Agreement
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
                      <Label htmlFor="partyAName">Party A Name</Label>
                      <Input 
                        id="partyAName" 
                        name="partyAName"
                        value={formData.partyAName} 
                        onChange={handleInputChange}
                        placeholder="Your Company, Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partyAJurisdiction">Party A Jurisdiction</Label>
                      <Input 
                        id="partyAJurisdiction"
                        name="partyAJurisdiction" 
                        value={formData.partyAJurisdiction} 
                        onChange={handleInputChange}
                        placeholder="State/Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partyAAddress">Party A Address</Label>
                      <Input 
                        id="partyAAddress"
                        name="partyAAddress" 
                        value={formData.partyAAddress} 
                        onChange={handleInputChange}
                        placeholder="123 Main St, City, State ZIP"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partyBName">Party B Name</Label>
                      <Input 
                        id="partyBName"
                        name="partyBName" 
                        value={formData.partyBName} 
                        onChange={handleInputChange}
                        placeholder="Client Company, Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partyBJurisdiction">Party B Jurisdiction</Label>
                      <Input 
                        id="partyBJurisdiction"
                        name="partyBJurisdiction" 
                        value={formData.partyBJurisdiction} 
                        onChange={handleInputChange}
                        placeholder="State/Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="partyBAddress">Party B Address</Label>
                      <Input 
                        id="partyBAddress"
                        name="partyBAddress" 
                        value={formData.partyBAddress} 
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
                      <Label htmlFor="purpose">Purpose of Disclosure</Label>
                      <Textarea 
                        id="purpose"
                        name="purpose" 
                        value={formData.purpose} 
                        onChange={handleInputChange}
                        placeholder="the development and implementation of artificial intelligence solutions"
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="term">Term (years)</Label>
                      <Input 
                        id="term"
                        name="term" 
                        value={formData.term} 
                        onChange={handleInputChange}
                        placeholder="5 (five)"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="survivalPeriod">Survival Period (years)</Label>
                      <Input 
                        id="survivalPeriod"
                        name="survivalPeriod" 
                        value={formData.survivalPeriod} 
                        onChange={handleInputChange}
                        placeholder="3 (three)"
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
                      <Label htmlFor="disputeResolution">Dispute Resolution</Label>
                      <Textarea 
                        id="disputeResolution"
                        name="disputeResolution" 
                        value={formData.disputeResolution} 
                        onChange={handleInputChange}
                        placeholder="by arbitration in accordance with the rules of the American Arbitration Association"
                        rows={3}
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
            <NdaDocument data={formData} />
          </div>
        </div>
      </div>
      
      <PageFooter />
    </div>
  );
};

export default NonDisclosureAgreementTemplate;
