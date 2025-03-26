
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
import SlaDocument from '@/components/sla/SlaDocument';
import SlaExportButton from '@/components/sla/SlaExportButton';
import PageFooter from '@/components/calculator/PageFooter';

const ServiceLevelAgreementTemplate = () => {
  const [formData, setFormData] = useState({
    providerName: "",
    providerJurisdiction: "",
    providerAddress: "",
    customerName: "",
    customerJurisdiction: "",
    customerAddress: "",
    effectiveDate: "",
    uptime: "99.9",
    inferenceLatency: "200",
    requestThroughput: "1000 per minute",
    concurrentUsers: "500",
    modelAccuracy: "95",
    qualityScore: "4.5 out of 5",
    contentSafety: "99",
    securityAssessment: "quarterly",
    securityPatchTime: "24 hours",
    incidentNotificationTime: "4 hours",
    systemUpdateFrequency: "monthly",
    updateNotificationTime: "7 days",
    maintenanceHours: "4",
    supportEmail: "",
    supportPhone: "",
    supportWebPortal: "",
    supportChat: "",
    timezone: "Eastern Time (ET)",
    governingLaw: ""
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
          <SlaExportButton formData={formData} />
        </div>
        
        <div className="flex flex-col items-center">
          <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/lovable-uploads/5a85bb3c-33d0-4ee5-9030-1eea5c4027b7.png" 
              alt="Autosolutions.ai Logo" 
              className="w-32 mb-4 hover:opacity-80 transition-opacity"
            />
          </a>
          <h1 className="text-3xl font-bold tracking-tight">Service Level Agreement Template</h1>
          <p className="text-gray-500 mt-2 max-w-2xl">
            Create a customized SLA for AI Systems to establish clear performance standards
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
                  Customize Your SLA
                </CardTitle>
                <CardDescription>
                  Fill out the form to generate your personalized Service Level Agreement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="parties" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="parties">Parties</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="support">Support</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="parties" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="providerName">Service Provider Name</Label>
                      <Input 
                        id="providerName" 
                        name="providerName"
                        value={formData.providerName} 
                        onChange={handleInputChange}
                        placeholder="AI Solutions, Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="providerJurisdiction">Provider Jurisdiction</Label>
                      <Input 
                        id="providerJurisdiction"
                        name="providerJurisdiction" 
                        value={formData.providerJurisdiction} 
                        onChange={handleInputChange}
                        placeholder="State/Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="providerAddress">Provider Address</Label>
                      <Input 
                        id="providerAddress"
                        name="providerAddress" 
                        value={formData.providerAddress} 
                        onChange={handleInputChange}
                        placeholder="123 Tech St, City, State ZIP"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Customer Name</Label>
                      <Input 
                        id="customerName"
                        name="customerName" 
                        value={formData.customerName} 
                        onChange={handleInputChange}
                        placeholder="Client Company, Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customerJurisdiction">Customer Jurisdiction</Label>
                      <Input 
                        id="customerJurisdiction"
                        name="customerJurisdiction" 
                        value={formData.customerJurisdiction} 
                        onChange={handleInputChange}
                        placeholder="State/Country"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customerAddress">Customer Address</Label>
                      <Input 
                        id="customerAddress"
                        name="customerAddress" 
                        value={formData.customerAddress} 
                        onChange={handleInputChange}
                        placeholder="456 Business Ave, City, State ZIP"
                      />
                    </div>
                    
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
                  
                  <TabsContent value="performance" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="uptime">Uptime Percentage (%)</Label>
                      <Input 
                        id="uptime"
                        name="uptime" 
                        value={formData.uptime} 
                        onChange={handleInputChange}
                        placeholder="99.9"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inferenceLatency">Inference Latency (ms)</Label>
                      <Input 
                        id="inferenceLatency"
                        name="inferenceLatency" 
                        value={formData.inferenceLatency} 
                        onChange={handleInputChange}
                        placeholder="200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="requestThroughput">Request Throughput</Label>
                      <Input 
                        id="requestThroughput"
                        name="requestThroughput" 
                        value={formData.requestThroughput} 
                        onChange={handleInputChange}
                        placeholder="1000 per minute"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="concurrentUsers">Concurrent Users</Label>
                      <Input 
                        id="concurrentUsers"
                        name="concurrentUsers" 
                        value={formData.concurrentUsers} 
                        onChange={handleInputChange}
                        placeholder="500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="modelAccuracy">Model Accuracy (%)</Label>
                      <Input 
                        id="modelAccuracy"
                        name="modelAccuracy" 
                        value={formData.modelAccuracy} 
                        onChange={handleInputChange}
                        placeholder="95"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="qualityScore">Quality Score</Label>
                      <Input 
                        id="qualityScore"
                        name="qualityScore" 
                        value={formData.qualityScore} 
                        onChange={handleInputChange}
                        placeholder="4.5 out of 5"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contentSafety">Content Safety (%)</Label>
                      <Input 
                        id="contentSafety"
                        name="contentSafety" 
                        value={formData.contentSafety} 
                        onChange={handleInputChange}
                        placeholder="99"
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="support" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="securityAssessment">Security Assessment Frequency</Label>
                      <Input 
                        id="securityAssessment"
                        name="securityAssessment" 
                        value={formData.securityAssessment} 
                        onChange={handleInputChange}
                        placeholder="quarterly"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="securityPatchTime">Security Patch Time</Label>
                      <Input 
                        id="securityPatchTime"
                        name="securityPatchTime" 
                        value={formData.securityPatchTime} 
                        onChange={handleInputChange}
                        placeholder="24 hours"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="incidentNotificationTime">Incident Notification Time</Label>
                      <Input 
                        id="incidentNotificationTime"
                        name="incidentNotificationTime" 
                        value={formData.incidentNotificationTime} 
                        onChange={handleInputChange}
                        placeholder="4 hours"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="systemUpdateFrequency">System Update Frequency</Label>
                      <Input 
                        id="systemUpdateFrequency"
                        name="systemUpdateFrequency" 
                        value={formData.systemUpdateFrequency} 
                        onChange={handleInputChange}
                        placeholder="monthly"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="updateNotificationTime">Update Notification Time</Label>
                      <Input 
                        id="updateNotificationTime"
                        name="updateNotificationTime" 
                        value={formData.updateNotificationTime} 
                        onChange={handleInputChange}
                        placeholder="7 days"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceHours">Monthly Maintenance Hours</Label>
                      <Input 
                        id="maintenanceHours"
                        name="maintenanceHours" 
                        value={formData.maintenanceHours} 
                        onChange={handleInputChange}
                        placeholder="4"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input 
                        id="supportEmail"
                        name="supportEmail" 
                        value={formData.supportEmail} 
                        onChange={handleInputChange}
                        placeholder="support@example.com"
                        type="email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supportPhone">Support Phone</Label>
                      <Input 
                        id="supportPhone"
                        name="supportPhone" 
                        value={formData.supportPhone} 
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supportWebPortal">Support Web Portal</Label>
                      <Input 
                        id="supportWebPortal"
                        name="supportWebPortal" 
                        value={formData.supportWebPortal} 
                        onChange={handleInputChange}
                        placeholder="https://support.example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supportChat">Support Chat</Label>
                      <Input 
                        id="supportChat"
                        name="supportChat" 
                        value={formData.supportChat} 
                        onChange={handleInputChange}
                        placeholder="https://chat.example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input 
                        id="timezone"
                        name="timezone" 
                        value={formData.timezone} 
                        onChange={handleInputChange}
                        placeholder="Eastern Time (ET)"
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
            <SlaDocument data={formData} />
          </div>
        </div>
      </div>
      
      <PageFooter />
    </div>
  );
};

export default ServiceLevelAgreementTemplate;
