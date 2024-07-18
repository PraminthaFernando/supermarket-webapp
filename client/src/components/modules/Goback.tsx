import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface GoBackProps {
  label?: string;
  className?: string;
}

const GoBack: React.FC<GoBackProps> = ({
  label = "Go Back",
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(-1);
      setIsLoading(false);
    }, 500);
  };

  return (
    <button
      className={`bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded hover:bg-black hover:text-white ${className} ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={handleGoBack}
      disabled={isLoading}
    >
      {isLoading ? "Loading..." : label}
    </button>
  );
};

export default GoBack;
