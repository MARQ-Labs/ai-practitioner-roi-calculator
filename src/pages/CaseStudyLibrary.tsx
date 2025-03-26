
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { caseStudies } from "@/data/caseStudies";
import { CaseStudy, Industry } from "@/models/caseStudy";
import { CaseStudyCard } from "@/components/caseStudy/CaseStudyCard";
import { IndustryFilter } from "@/components/caseStudy/IndustryFilter";
import { SearchInput } from "@/components/caseStudy/SearchInput";
import { Book, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CaseStudyLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<Industry[]>([]);
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>(caseStudies);
  
  // Get unique industries from case studies
  const uniqueIndustries = Array.from(new Set(caseStudies.map(cs => cs.industry))) as Industry[];

  // Filter case studies based on search term and selected industries
  useEffect(() => {
    let filtered = [...caseStudies];
    
    // Apply search filter
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        cs => 
          cs.title.toLowerCase().includes(lowerCaseSearch) || 
          cs.description.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply industry filter
    if (selectedIndustries.length > 0) {
      filtered = filtered.filter(cs => selectedIndustries.includes(cs.industry));
    }
    
    setFilteredCaseStudies(filtered);
  }, [searchTerm, selectedIndustries]);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-7xl">
      {/* Back navigation */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="flex items-center gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </Button>
      </div>
      
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
          <Book className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Implementation Case Study Library</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse 40 real-world examples of AI implementations with impressive ROI and business impact across various industries.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <IndustryFilter 
          industries={uniqueIndustries} 
          selectedIndustries={selectedIndustries} 
          setSelectedIndustries={setSelectedIndustries} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCaseStudies.length > 0 ? (
          filteredCaseStudies.map(caseStudy => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-lg font-medium mb-2">No case studies found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Note: All case studies include links to the original sources for further investigation.
        </p>
      </div>
    </div>
  );
};

export default CaseStudyLibrary;
