
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
import { useReactToPdf } from 'react-to-pdf';
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

  const { toPdf } = useReactToPdf({
    targetRef: contentRef,
    filename: `${reportData.industry.name.toLowerCase().replace(/\s+/g, '-')}-ai-roi-report.pdf`,
    options: {
      orientation: 'portrait',
      format: 'a4',
      margin: {
        top: '20mm',
        bottom: '20mm',
        left: '15mm',
        right: '15mm'
      },
    },
  });

  const handleExport = async () => {
    setIsGenerating(true);
    
    try {
      await toPdf();
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
