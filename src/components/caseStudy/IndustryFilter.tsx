
import React from "react";
import { Check, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Industry } from "@/models/caseStudy";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface IndustryFilterProps {
  industries: Industry[];
  selectedIndustries: Industry[];
  setSelectedIndustries: (industries: Industry[]) => void;
}

export const IndustryFilter: React.FC<IndustryFilterProps> = ({
  industries,
  selectedIndustries,
  setSelectedIndustries,
}) => {
  const toggleIndustry = (industry: Industry) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const clearFilters = () => {
    setSelectedIndustries([]);
  };

  const selectAllFilters = () => {
    setSelectedIndustries([...industries]);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          <span>Filter by Industry</span>
          {selectedIndustries.length > 0 && (
            <span className="ml-1 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs">
              {selectedIndustries.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>Industries</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {industries.map((industry) => (
            <DropdownMenuCheckboxItem
              key={industry}
              checked={selectedIndustries.includes(industry)}
              onCheckedChange={() => toggleIndustry(industry)}
            >
              {industry}
            </DropdownMenuCheckboxItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <div className="p-2 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={clearFilters}>
            Clear
          </Button>
          <Button variant="secondary" size="sm" className="flex-1" onClick={selectAllFilters}>
            Select All
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
