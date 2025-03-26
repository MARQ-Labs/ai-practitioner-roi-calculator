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
import SowDocument from './SowDocument';

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
  risks: {
    name: string;
    likelihood: string;
    impact: string;
    mitigation: string;
  }[];
  communicationPlan: string;
  assumptions: string;
}

interface SowExportButtonProps {
  formData: SowFormData;
}

const SowExportButton: React.FC<SowExportButtonProps> = ({ formData }) => {
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

      // Use company name for filename if available
      const companyName = formData.companyName ? `-${formData.companyName.toLowerCase().replace(/\s+/g, '-')}` : '';
      const filename = `ai-statement-of-work${companyName}-${formData.projectTitle.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      
      const opt = {
        margin: [15, 15, 15, 15],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().from(contentRef.current).set(opt).save();
      
      toast({
        title: "Statement of Work generated successfully",
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
          <DialogTitle>Statement of Work Preview</DialogTitle>
        </DialogHeader>
        
        <div className="border rounded-lg p-1 bg-gray-50 overflow-hidden">
          <div ref={contentRef}>
            <SowDocument data={formData} />
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

export default SowExportButton;
