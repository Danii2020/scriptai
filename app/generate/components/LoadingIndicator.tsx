import React from "react";

interface LoadingIndicatorProps {
  message: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message }) => (
  <div className="mt-6 text-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00c3ff] mx-auto mb-4"></div>
    <p className="text-lg font-medium text-[#00c3ff]">{message}</p>
  </div>
);

export default LoadingIndicator; 