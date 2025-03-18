
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="text-center max-w-md mx-auto bg-white p-8 rounded-xl shadow-sm border animate-fade-in-up">
        <h1 className="text-6xl font-bold text-teal-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">This page doesn't exist</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for couldn't be found. It might have been moved or deleted.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-teal-600 rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-200"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
