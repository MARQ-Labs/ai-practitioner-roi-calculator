
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Download, FileText, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import SlaDocument from './SlaDocument';

interface SlaFormData {
  providerName: string;
  providerJurisdiction: string;
  providerAddress: string;
  customerName: string;
  customerJurisdiction: string;
  customerAddress: string;
  effectiveDate: string;
  uptime: string;
  inferenceLatency: string;
  requestThroughput: string;
  concurrentUsers: string;
  modelAccuracy: string;
  qualityScore: string;
  contentSafety: string;
  securityAssessment: string;
  securityPatchTime: string;
  incidentNotificationTime: string;
  systemUpdateFrequency: string;
  updateNotificationTime: string;
  maintenanceHours: string;
  supportEmail: string;
  supportPhone: string;
  supportWebPortal: string;
  supportChat: string;
  timezone: string;
  governingLaw: string;
}

interface SlaExportButtonProps {
  formData: SlaFormData;
}

const SlaExportButton: React.FC<SlaExportButtonProps> = ({ formData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsGenerating(true);
    
    try {
      if (!contentRef.current) {
        throw new Error("Content reference is not available");
      }

      // Use provider name for filename if available
      const companyName = formData.providerName ? `-${formData.providerName.toLowerCase().replace(/\s+/g, '-')}` : '';
      const filename = `service-level-agreement${companyName}.pdf`;
      
      const opt = {
        margin: [15, 15, 15, 15],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().from(contentRef.current).set(opt).save();
      
      toast({
        title: "Service Level Agreement generated successfully",
        description: "Your PDF document has been downloaded",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating document",
        description: "There was an issue creating your PDF",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          type="button"
          className="flex items-center gap-2 bg-white hover:bg-gray-50"
        >
          <FileText size={16} />
          Preview & Export
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Service Level Agreement Preview</DialogTitle>
        </DialogHeader>
        
        <div className="border rounded-lg p-1 bg-gray-50 overflow-hidden">
          <div ref={contentRef}>
            <SlaDocument data={formData} />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleExport} 
            disabled={isGenerating}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SlaExportButton;
