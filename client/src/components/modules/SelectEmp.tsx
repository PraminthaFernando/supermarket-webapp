import axios from "axios";
import React, { useEffect, useState } from "react";
import GoBack from "./Goback";

interface SelectEmpProps {
  isOpen: boolean;
  onClose: (des: string) => void;
}

const SelectEmp: React.FC<SelectEmpProps> = ({ isOpen, onClose }) => {
  const [Employees, setEmployees] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [des, setDes] = useState("");

  useEffect(() => {
    const fetchAllEmps = async () => {
      try {
        const res = await axios.get("http://localhost:8000/employees");
        setEmployees(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmps;
  }, []);

  const handleClick = (event: any) => {
    event.preventDefault();
    if (des === "") {
      setError("Please select a employee");
    } else {
      onClose(des);
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center w-full sm:mt-0 sm:ml-4 sm:text-left">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="HeadlineAct"
                    className="block text-left text-sm font-medium text-gray-900"
                  >
                    {" "}
                    Employee{" "}
                  </label>
                  <select
                    name="HeadlineAct"
                    id="HeadlineAct"
                    required
                    className="mt-1.5 w-full rounded-lg bg-gray-200 border-2 h-8 border-gray-300 text-gray-700 sm:text-sm"
                    onChange={(e) => setDes(e.target.value)}
                    autoFocus
                  >
                    <option value="">select eployee</option>
                    {Employees.map((Employee) => (
                      <option value={Employee.Name}>{Employee.Name}</option>
                    ))}
                  </select>
                  {error && (
                    <p
                      style={{
                        color: "red",
                        marginTop: "5px",
                        fontSize: "12.5px",
                      }}
                    >
                      {error}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClick}
            >
              Close
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleClick}
            >
              Confirme
            </button>
          </div>
          <GoBack label="Back to Home" className="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default SelectEmp;
