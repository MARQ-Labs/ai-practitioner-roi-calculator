
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BenchmarkComparison from "./pages/BenchmarkComparison";
import CaseStudyLibrary from "./pages/CaseStudyLibrary";
import AIMaturityAssessment from "./pages/AIMaturityAssessment";
import Dashboard from "./pages/Dashboard";
import Templates from "./pages/Templates";
import StatementOfWorkTemplate from "./pages/StatementOfWorkTemplate";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calculator" element={<Index />} />
          <Route path="/benchmark" element={<BenchmarkComparison />} />
          <Route path="/case-studies" element={<CaseStudyLibrary />} />
          <Route path="/maturity-assessment" element={<AIMaturityAssessment />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/statement-of-work-template" element={<StatementOfWorkTemplate />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
