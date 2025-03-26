
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
import DpaDocument from './DpaDocument';

interface DpaFormData {
  controllerName: string;
  controllerJurisdiction: string;
  controllerAddress: string;
  processorName: string;
  processorJurisdiction: string;
  processorAddress: string;
  effectiveDate: string;
  region: string;
  breachNotificationHours: string;
  governingLaw: string;
  subjectMatter: string;
  purpose: string;
  personalDataTypes: string;
  specialCategories: string;
  dataSubjects: string;
  processingOperations: string;
  securityMeasures: string;
}

interface DpaExportButtonProps {
  formData: DpaFormData;
}

const DpaExportButton: React.FC<DpaExportButtonProps> = ({ formData }) => {
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

      // Use controller name for filename if available
      const companyName = formData.controllerName ? `-${formData.controllerName.toLowerCase().replace(/\s+/g, '-')}` : '';
      const filename = `data-processing-agreement${companyName}.pdf`;
      
      const opt = {
        margin: [15, 15, 15, 15],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().from(contentRef.current).set(opt).save();
      
      toast({
        title: "Data Processing Agreement generated successfully",
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
          <DialogTitle>Data Processing Agreement Preview</DialogTitle>
        </DialogHeader>
        
        <div className="border rounded-lg p-1 bg-gray-50 overflow-hidden">
          <div ref={contentRef}>
            <DpaDocument data={formData} />
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

export default DpaExportButton;
