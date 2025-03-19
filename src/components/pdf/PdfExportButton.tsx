
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
import { Download, FileDown, Loader2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import ReportContent from './ReportContent';
import { ReportData } from '@/utils/pdfExport';

interface PdfExportButtonProps {
  reportData: ReportData;
}

const PdfExportButton: React.FC<PdfExportButtonProps> = ({ reportData }) => {
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

      const filename = `${reportData.industry.name.toLowerCase().replace(/\s+/g, '-')}-ai-roi-report.pdf`;
      
      const opt = {
        margin: [15, 15, 15, 15],
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().from(contentRef.current).set(opt).save();
      
      toast({
        title: "Report generated successfully",
        description: "Your PDF report has been downloaded",
        duration: 3000,
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating report",
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
          className="flex items-center gap-2 bg-white hover:bg-gray-50"
        >
          <FileDown size={16} />
          Export PDF Report
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ROI Report Preview</DialogTitle>
        </DialogHeader>
        
        <div className="border rounded-lg p-1 bg-gray-50 overflow-hidden">
          <div ref={contentRef}>
            <ReportContent data={reportData} />
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

export default PdfExportButton;
