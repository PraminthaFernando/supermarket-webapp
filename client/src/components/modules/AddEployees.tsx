import React, { useEffect, useState } from "react";
import SuccessModel from "./SuccessModel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "./ErrorModel";

const AddEployees: React.FC = () => {
  const [EmpID, setEmpID] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Address, setAddress] = useState("");
  const [Joindate, setJoindate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [msg, setMsg] = useState("");
  const [emps, setEmps] = useState<any[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isErrorModelOpen, setIsErrorModelOpen] = useState(false);
  const [validContact, setValidContact] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllEmps = async () => {
      try {
        const res = await axios.get("http://localhost:8000/employees");
        setEmps(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllEmps();
  }, []);

  const handleChange = (event: any) => {
    const selectedValue = event.target.value.toUpperCase();
    setId(selectedValue);

    // Check if the selected value exists in the array of customer IDs
    const customerIDs = emps.map((emp) => emp.ID);

    if (customerIDs.includes(selectedValue)) {
      setValidationMessage("This employee ID already exists."); // Log validation message if needed
    } else {
      setValidationMessage("");
      setEmpID(selectedValue); // Set the customer ID if not found
    }
  };

  const handleisSuccessModelOpen = () => {
    setIsSuccessModalOpen(false);
  };

  const handleCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (validationMessage) {
      setErrorMessage("Invalid employee ID");
      setIsErrorModelOpen(true);
    } else if (!validContact) {
      setErrorMessage("Invalid contact number");
      setIsErrorModelOpen(true);
    } else {
      try {
        await axios.put("http://localhost:8000/employee/create", {
          ID: EmpID,
          Name: name,
          Contact: ContactNo,
          Address: Address,
          date: Joindate,
        });
        setIsSuccessModalOpen(true);
        setMsg(`employee ${name}`);
        {
          setId(""),
            setName(""),
            setContactNo(""),
            setAddress(""),
            setValidContact(false),
            setValidationMessage("");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleCancel = () => {
    navigate("/UserDashboard");
  };

  const handleContactNoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setContactNo(inputValue);

    if (inputValue.length === 10) {
      setValidContact(true);
    } else {
      setValidContact(false);
    }
  };

  return (
    <section className="bg-white rounded-2xl">
      <div className="lg:grid">
        <main className="flex items-center justify-center px-8 py-10 sm:px-10 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="#">
              <span className="sr-only">Home</span>
              <svg
                className="h-8 sm:h-10"
                viewBox="0 0 28 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
              Add Employee
            </h1>

            <form
              action="#"
              className="mt-8 grid grid-cols-6 gap-6 shadow-xl p-3 rounded-xl"
            >
              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-left mx-1 text-sm font-medium text-gray-700"
                >
                  {" "}
                  Customer Short name{" "}
                </label>

                <input
                  type="text"
                  id="Short"
                  name="short"
                  value={id}
                  className="mt-1 p-1 h-8 border-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="enter employee ID"
                  onChange={(e) => handleChange(e)}
                  autoFocus
                  required
                />
                {validationMessage && (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {validationMessage}
                  </p>
                )}
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-left mx-1 text-sm font-medium text-gray-700"
                >
                  {" "}
                  Customer Full name{" "}
                </label>

                <input
                  type="text"
                  id="Full"
                  name="full"
                  value={name}
                  className="mt-1 p-1 h-8 border-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="enter employee name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-left mx-1 text-sm font-medium text-gray-700"
                >
                  {" "}
                  Employee address{" "}
                </label>

                <input
                  type="text"
                  id="Full"
                  name="full"
                  value={Address}
                  className="mt-1 p-1 h-8 border-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="enter employee address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block mx-1 text-left text-sm font-medium text-gray-700"
                >
                  Contact number
                </label>

                <input
                  type="text"
                  id="4nNo"
                  name="Phone"
                  value={ContactNo}
                  className="mt-1 h-8 border-2 p-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="employee contact number"
                  onChange={(e) => handleContactNoChange(e)}
                  required
                />
                {validContact ? (
                  <p
                    style={{
                      color: "green",
                      marginTop: "5px",
                      fontSize: "12.5px",
                    }}
                  >
                    Valid contact number
                  </p>
                ) : ContactNo.length !== 0 ? (
                  <p
                    style={{
                      color: "red",
                      marginTop: "5px",
                      fontSize: "12.5px",
                    }}
                  >
                    Invalid contact number
                  </p>
                ) : (
                  <p></p>
                )}
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-left mx-1 text-sm font-medium text-gray-700"
                >
                  Join date
                </label>

                <div className="relative">
                  <input
                    type="date"
                    id="LastName"
                    value={Joindate}
                    name="last_name"
                    className="mt-1 p-1 w-full h-8 border-2 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm pr-10 cursor-pointer"
                    onChange={(e) => setJoindate(e.target.value)}
                  />
                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleCreate}
                >
                  Create an account
                </button>
                <button
                  className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
      <SuccessModel
        isOpen={isSuccessModalOpen}
        onClose={handleisSuccessModelOpen}
        msg={msg}
      />
      <ErrorModal
        isOpen={isErrorModelOpen}
        onClose={() => setIsErrorModelOpen(false)}
        errorMessage={errorMessage}
      />
    </section>
  );
};

export default AddEployees;
