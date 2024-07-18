import React, { useEffect } from "react";

interface SuccessModelProps {
  isOpen: boolean;
  onClose: () => void;
  msg: string;
}

const SuccessModel: React.FC<SuccessModelProps> = ({
  isOpen,
  onClose,
  msg,
}) => {
  useEffect(() => {
    let timeout: any;
    if (isOpen) {
      timeout = setTimeout(() => {
        onClose();
      }, 6000); // Hide the content after 5 seconds
    }
    return () => clearTimeout(timeout);
  }, [isOpen]);

  return (
    <div
      role="alert"
      className={`fixed z-50 inset-0 flex items-start justify-center overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-start p-1 gap-4 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-0 sm:align-middle sm:max-w-lg sm:w-fit">
        <span className="text-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>

        <div className="flex-1">
          <strong className="block font-medium text-gray-900">
            {" "}
            Changes saved{" "}
          </strong>

          <p className="mt-1 text-sm text-gray-700">
            {msg} created successfuly.
          </p>
        </div>

        <button
          className="text-gray-500 transition hover:text-gray-600"
          onClick={onClose}
        >
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SuccessModel;
