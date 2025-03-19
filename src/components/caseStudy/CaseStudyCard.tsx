
import React from "react";
import { CaseStudy } from "@/models/caseStudy";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy }) => {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md hover:border-primary/50">
      <CardHeader className="flex-none">
        <div className="text-xs text-muted-foreground font-medium mb-1">{caseStudy.industry}</div>
        <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-gray-700 leading-relaxed">
          {caseStudy.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex-none pt-2">
        <Button variant="outline" size="sm" asChild className="w-full">
          <a 
            href={caseStudy.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <span>View Source</span>
            <ExternalLink size={14} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
