
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
import { Download, FileText, Loader2, Upload } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import MsaDocument from './MsaDocument';
import { Label } from '@/components/ui/label';

interface MsaFormData {
  serviceProviderName: string;
  serviceProviderJurisdiction: string;
  serviceProviderAddress: string;
  clientName: string;
  clientJurisdiction: string;
  clientAddress: string;
  effectiveDate: string;
  paymentTermDays: string;
  terminationNoticeDays: string;
  breachCureDays: string;
  confidentialityYears: string;
  liabilityCap: string;
  governingLaw: string;
  arbitrationBody: string;
  survivingSections: string;
  // Branding information
  companyLogo?: string;
  companyName?: string;
  companyTagline?: string;
  brandColor?: string;
}

interface MsaExportButtonProps {
  formData: MsaFormData;
  onLogoChange: (logoUrl: string) => void;
}

const MsaExportButton: React.FC<MsaExportButtonProps> = ({ formData, onLogoChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleExport = async () => {
    setIsGenerating(true);
    
    try {
      if (!contentRef.current) {
        throw new Error("Content reference is not available");
      }

      // Use company name for filename if available
      const companyName = formData.companyName ? `-${formData.companyName.toLowerCase().replace(/\s+/g, '-')}` : '';
      const filename = `ai-master-services-agreement${companyName}.pdf`;
      
      const opt = {
        margin: [15, 15, 15, 15],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().from(contentRef.current).set(opt).save();
      
      toast({
        title: "Master Services Agreement generated successfully",
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          onLogoChange(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
          <DialogTitle>Master Services Agreement Preview</DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={triggerFileInput}
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              Upload Logo
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            {formData.companyLogo && (
              <Label className="text-sm text-gray-500">
                Logo uploaded
              </Label>
            )}
          </div>
        </div>
        
        <div className="border rounded-lg p-1 bg-gray-50 overflow-hidden">
          <div ref={contentRef}>
            <MsaDocument data={formData} />
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

export default MsaExportButton;
