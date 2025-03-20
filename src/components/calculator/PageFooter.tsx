
import React from "react";

const PageFooter: React.FC = () => {
  return (
    <footer className="text-center text-sm text-gray-500 mt-8 pt-4 border-t">
      <p>AI Practitioner Toolkit — Data based on industry research and implementation benchmarks 2023-2024</p>
      <p className="mt-1">Created by Didac at <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-600 hover:text-teal-700 transition-colors">AutoSolutions.ai</a></p>
      <div className="mt-2">
        <a href="https://autosolutions-ai.vercel.app/" target="_blank" rel="noopener noreferrer">
          <img 
            src="/lovable-uploads/1dc9a095-be8c-4502-8830-e14de43a9b69.png" 
            alt="AutoSolutions.ai Logo" 
            className="h-16 mx-auto hover:opacity-80 transition-opacity"
          />
        </a>
      </div>
    </footer>
  );
};

export default PageFooter;
