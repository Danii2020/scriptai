import React from "react";

interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  error ? <div className="text-red-400 text-center mt-2">{error}</div> : null
);

export default ErrorMessage; 