
import React from "react";
import AIPotentialCalculator from "@/components/AIPotentialCalculator";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="px-4 py-8">
        <AIPotentialCalculator />
      </main>
    </div>
  );
};

export default Index;
