
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { maturityQuestions, getMaturityLevel, getRecommendations } from "@/data/assessmentQuestions";
import { MaturityCategory, MaturityResult } from "@/models/assessment";
import MaturityResultsDisplay from "./MaturityResultsDisplay";
import { InfoIcon } from "lucide-react";

const MaturityAssessmentForm = () => {
  const [result, setResult] = useState<MaturityResult | null>(null);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: maturityQuestions.reduce((acc, question) => {
      acc[question.id] = "";
      return acc;
    }, {} as Record<string, string>)
  });

  const onSubmit = (data: Record<string, string>) => {
    try {
      // Calculate scores by category
      const categoryScores = maturityQuestions.reduce((acc, question) => {
        const category = question.category;
        const answer = data[question.id];
        
        if (!answer) return acc;
        
        const value = parseInt(answer);
        
        if (!acc[category]) {
          acc[category] = { total: 0, count: 0 };
        }
        
        acc[category].total += value;
        acc[category].count += 1;
        
        return acc;
      }, {} as Record<MaturityCategory, { total: number, count: number }>);
      
      // Calculate average score for each category
      const normalizedCategoryScores = Object.entries(categoryScores).reduce((acc, [category, data]) => {
        acc[category as MaturityCategory] = data.total / data.count;
        return acc;
      }, {} as Record<MaturityCategory, number>);
      
      // Calculate overall score
      const totalScore = Object.values(normalizedCategoryScores).reduce((sum, score) => sum + score, 0);
      const overallScore = totalScore / Object.keys(normalizedCategoryScores).length;
      
      // Determine maturity level
      const { level } = getMaturityLevel(overallScore);
      
      // Get recommendations
      const recommendations = getRecommendations(normalizedCategoryScores);
      
      // Set the result
      setResult({
        overallScore,
        categoryScores: normalizedCategoryScores,
        maturityLevel: level,
        recommendations
      });
      
      toast({
        title: "Assessment Complete",
        description: "Your AI maturity assessment has been completed successfully.",
      });
    } catch (error) {
      console.error("Error calculating assessment results:", error);
      toast({
        title: "Error",
        description: "There was a problem processing your assessment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const resetAssessment = () => {
    form.reset();
    setResult(null);
  };

  if (result) {
    return (
      <div className="space-y-8">
        <MaturityResultsDisplay result={result} />
        <div className="flex justify-center">
          <Button onClick={resetAssessment}>Take Assessment Again</Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {maturityQuestions.map((question) => (
          <Card key={question.id} className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-medium">
                {question.text}
              </CardTitle>
              <CardDescription>
                Category: {question.category}
              </CardDescription>
              <div className="mt-2 p-3 bg-muted/50 rounded-md">
                <div className="flex gap-2">
                  <InfoIcon className="h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name={question.id}
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-3"
                      >
                        {question.options.map((option, index) => (
                          <div key={index} className="flex items-start space-x-2 p-3 border rounded-md hover:bg-muted/30 transition-colors">
                            <RadioGroupItem value={option.value.toString()} id={`${question.id}-${index}`} className="mt-1" />
                            <div className="grid gap-1.5">
                              <FormLabel htmlFor={`${question.id}-${index}`} className="font-medium">
                                {option.text}
                              </FormLabel>
                              <p className="text-sm text-muted-foreground">{option.description}</p>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        ))}
        <div className="flex justify-center">
          <Button type="submit" size="lg">
            Submit Assessment
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default MaturityAssessmentForm;
