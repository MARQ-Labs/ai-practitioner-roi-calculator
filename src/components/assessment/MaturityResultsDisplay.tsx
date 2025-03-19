
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MaturityResult, MaturityCategory } from "@/models/assessment";
import { BarChart } from "recharts";
import { 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { getMaturityLevel } from "@/data/assessmentQuestions";

interface MaturityResultsDisplayProps {
  result: MaturityResult;
}

const MaturityResultsDisplay: React.FC<MaturityResultsDisplayProps> = ({ result }) => {
  const { overallScore, categoryScores, maturityLevel, recommendations } = result;
  const { description } = getMaturityLevel(overallScore);
  
  // Format data for the chart
  const chartData = Object.entries(categoryScores).map(([category, score]) => ({
    name: getCategoryShortName(category as MaturityCategory),
    fullName: category,
    score: score,
  }));
  
  // Get colors based on score
  const getScoreColor = (score: number) => {
    if (score < 1.75) return "bg-red-500";
    if (score < 2.5) return "bg-amber-500";
    if (score < 3.25) return "bg-blue-500";
    return "bg-green-500";
  };
  
  const getScoreBarColor = (score: number) => {
    if (score < 1.75) return "#ef4444";
    if (score < 2.5) return "#f59e0b";
    if (score < 3.25) return "#3b82f6";
    return "#22c55e";
  };

  // Format score as percentage
  const formatScoreAsPercentage = (score: number) => {
    return `${Math.round((score / 4) * 100)}%`;
  };
  
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-3 w-full mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>AI Maturity Assessment Results</CardTitle>
            <CardDescription>
              Your organization is at the {maturityLevel} level
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Overall Maturity Score</span>
                <span className="text-sm font-medium">{overallScore.toFixed(1)} / 4.0</span>
              </div>
              <Progress 
                value={(overallScore / 4) * 100} 
                className={`h-2 ${getScoreColor(overallScore)}`} 
              />
              <p className="text-sm text-muted-foreground mt-2">
                {description}
              </p>
            </div>
            
            <div className="h-72 mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end" 
                    height={60} 
                    interval={0}
                  />
                  <YAxis domain={[0, 4]} />
                  <Tooltip 
                    formatter={(value: number) => [value.toFixed(1), "Score"]}
                    labelFormatter={(label) => {
                      const item = chartData.find(item => item.name === label);
                      return item ? item.fullName : label;
                    }}
                  />
                  <Bar dataKey="score" name="Maturity Score">
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getScoreBarColor(entry.score)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="categories" className="space-y-4">
        {Object.entries(categoryScores).map(([category, score]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
              <CardDescription>
                Score: {score.toFixed(1)} / 4.0 ({formatScoreAsPercentage(score)})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(score / 4) * 100} 
                className={`h-2 ${getScoreColor(score)}`} 
              />
              <p className="text-sm mt-2">
                {getCategoryDescription(category as MaturityCategory, score)}
              </p>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
      
      <TabsContent value="recommendations" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recommendations for Improvement</CardTitle>
            <CardDescription>
              Based on your assessment results, we recommend the following actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="flex">
                  <span className="mr-2 mt-1 flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

// Helper functions
const getCategoryShortName = (category: MaturityCategory): string => {
  switch (category) {
    case 'Strategy & Roadmap':
      return 'Strategy';
    case 'Data Readiness':
      return 'Data';
    case 'Technology Infrastructure':
      return 'Technology';
    case 'Talent & Skills':
      return 'Talent';
    case 'Governance & Ethics':
      return 'Governance';
    default:
      return category;
  }
};

const getCategoryDescription = (category: MaturityCategory, score: number): string => {
  if (score < 1.75) {
    switch (category) {
      case 'Strategy & Roadmap':
        return 'Your organization has minimal AI strategy in place with significant room for development.';
      case 'Data Readiness':
        return 'Your data infrastructure requires substantial improvement to support AI initiatives.';
      case 'Technology Infrastructure':
        return 'Your technology foundation for AI is at an early stage and needs significant investment.';
      case 'Talent & Skills':
        return 'Your organization has limited AI expertise and would benefit from talent development.';
      case 'Governance & Ethics':
        return 'Your AI governance and ethics frameworks need substantial development.';
      default:
        return 'This area needs significant improvement to support AI initiatives.';
    }
  } else if (score < 2.5) {
    switch (category) {
      case 'Strategy & Roadmap':
        return 'Your organization has a basic AI strategy but needs a more structured approach.';
      case 'Data Readiness':
        return 'Your data capabilities are developing but require more consistent quality and accessibility.';
      case 'Technology Infrastructure':
        return 'Your technology infrastructure supports basic AI initiatives but needs enhancement for scale.';
      case 'Talent & Skills':
        return 'Your organization has some AI talent but would benefit from expanded expertise.';
      case 'Governance & Ethics':
        return 'Your AI governance practices are emerging but need more formal structure.';
      default:
        return 'This area shows developing capabilities but requires further structure and investment.';
    }
  } else if (score < 3.25) {
    switch (category) {
      case 'Strategy & Roadmap':
        return 'Your organization has a well-defined AI strategy with opportunities for further integration.';
      case 'Data Readiness':
        return 'Your data capabilities are strong with room for optimization in specific areas.';
      case 'Technology Infrastructure':
        return 'Your technology infrastructure effectively supports AI initiatives with potential for enhancement.';
      case 'Talent & Skills':
        return 'Your organization has strong AI talent with opportunities for specialized expertise.';
      case 'Governance & Ethics':
        return 'Your AI governance framework is robust with potential for further refinement.';
      default:
        return 'This area demonstrates advanced capabilities with specific opportunities for optimization.';
    }
  } else {
    switch (category) {
      case 'Strategy & Roadmap':
        return 'Your organization has an exemplary AI strategy fully integrated with business objectives.';
      case 'Data Readiness':
        return 'Your data capabilities are exceptional, providing a strong foundation for advanced AI.';
      case 'Technology Infrastructure':
        return 'Your technology infrastructure represents leading practice in supporting AI initiatives.';
      case 'Talent & Skills':
        return 'Your organization has exceptional AI talent and a strong development pipeline.';
      case 'Governance & Ethics':
        return 'Your AI governance and ethics framework represents industry-leading practice.';
      default:
        return 'This area demonstrates exceptional capabilities that can serve as a model for others.';
    }
  }
};

export default MaturityResultsDisplay;
